import ripemd160 from "https://deno.land/x/ripemd160@0.1.1/index.ts";
import {
  FunctionComponent,
  h,
  JSX,
  RenderableProps,
  VNode,
} from "https://esm.sh/preact@10.5.12";
import type {
  Properties as _Properties,
} from "https://raw.githubusercontent.com/frenic/csstype/master/index.d.ts";

export interface Properties extends _Properties {
  [key: string]: number | string | undefined | Properties;
}

function styleHash(str: string) {
  const hash = ripemd160(str);
  return "ds-" + hash.slice(0, 8);
}
function parse(props: Properties, selectors: string[]): string {
  let rootBlock = "";
  let outerBlocks = "";
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === "object") {
      const childSelectors: string[] = [];
      for (const selector of selectors) {
        const replaced = key.replace(/&/g, selector).split(",").map((s) =>
          s.trim()
        );
        Array.prototype.push.apply(childSelectors, replaced);
      }
      const childParsed = parse(value, childSelectors);
      outerBlocks += childParsed;
    } else {
      const parsedKey = key.replace(/[A-Z]/g, "-$&").toLowerCase();
      rootBlock += `${parsedKey}:${value};`;
    }
  }
  rootBlock = `${selectors.join(",")}{${rootBlock}}`;
  return rootBlock + outerBlocks;
}
const styleStore: Record<string, string> = {};
let customCallback:
  | undefined
  | ((id: string, style: string, store: typeof styleStore) => void) = undefined;

export function css(props: Properties) {
  const hash = styleHash(JSON.stringify(props));
  const styles = parse(props, [`.${hash}`]);
  if (customCallback) {
    customCallback(hash, styles, styleStore);
  } else {
    styleStore[hash] = styles;
  }
  return hash;
}
export function styled<P>(
  Tag: string | FunctionComponent<P>,
  style: Properties,
) {
  const id = css(style);
  if (typeof Tag === "string") {
    return (
      props:
        & { children?: VNode | VNode[] }
        & JSX.SVGAttributes
        & JSX.HTMLAttributes,
    ) => {
      const mergedClass = props.class ? `${props.class} ${id}` : id;
      return h(Tag, { ...props, class: mergedClass });
    };
  } else {
    return (
      props:
        & RenderableProps<P>
        & { children?: VNode | VNode[] }
        & JSX.SVGAttributes
        & JSX.HTMLAttributes,
    ) => {
      const mergedClass = props.class ? `${props.class} ${id}` : id;
      return h(Tag, { ...props, class: mergedClass });
    };
  }
}
export function resetSheet() {
  for (const id of Object.getOwnPropertyNames(styleStore)) {
    delete styleStore[id];
  }
}
export function getSheet() {
  let output = "";
  for (const [_id, style] of Object.entries(styleStore)) {
    output += style;
  }
  return output;
}
export function setCallback(cb: typeof customCallback) {
  customCallback = cb;
}
