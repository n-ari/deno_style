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
  [key: string]: number | string | undefined;
}

function parse(props: Properties): string {
  let output = "";
  for (const [key, value] of Object.entries(props)) {
    const parsedKey = key.replace(/[A-Z]/g, "-$&").toLowerCase();
    output += `${parsedKey}:${value};`;
  }
  return output;
}
const styleStore: Record<string, string> = {};
let customCallback:
  | undefined
  | ((id: string, style: string, store: typeof styleStore) => void) = undefined;
const styleHash = (str: string) => {
  const hash = ripemd160(str);
  return "ds-" + hash.slice(0, 8);
};

export function css(props: Properties) {
  const styles = parse(props);
  const hash = styleHash(styles);
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
    ) => h(Tag, { class: id, ...props });
  } else {
    return (props: RenderableProps<P>) => h(Tag, { class: id, ...props });
  }
}

export function resetSheet() {
  for (const id of Object.getOwnPropertyNames(styleStore)) {
    delete styleStore[id];
  }
}
export function getSheet() {
  let output = "";
  for (const [id, style] of Object.entries(styleStore)) {
    output += `.${id}{${style}}`;
  }
  return output;
}
export function setCallback(cb: typeof customCallback) {
  customCallback = cb;
}
