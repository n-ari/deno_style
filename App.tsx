import { Fragment, h, JSX, VNode } from "preact";
import htm from "htm";
import { css, styled } from "./css.ts";

// deno-lint-ignore no-explicit-any
function html(strings: TemplateStringsArray, ...values: any[]) {
  const root = htm.bind(h)(strings, ...values);
  return Array.isArray(root) ? h(Fragment, {}, root) : root;
}

// --- app ---

const classes = {
  paragraph: css({
    backgroundColor: "red",
    fontWeight: "bold",
  }),
};

export default function App() {
  return html`
    <h1>deno_style</h1>
    <p class=${classes.paragraph}>styled paragraph</p>
    <${StyledComponent}>styled component<//>
    <${StyledLorem} />
  `;
}

const StyledComponent = styled("p", {
  fontSize: "2rem",
  fontStyle: "italic",
});

const Lorem = (
  props:
    & { children?: VNode | VNode[] }
    & JSX.SVGAttributes
    & JSX.HTMLAttributes,
) =>
  html
    `<p ...${props}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis bibendum augue in commodo. Vivamus scelerisque facilisis iaculis. Aenean non nisi nisl. Donec at massa fringilla, ultricies magna sit amet, sagittis velit. Nulla fringilla ut nulla nec pretium. Sed vitae molestie velit. Curabitur scelerisque bibendum dolor, et condimentum enim pharetra vitae.</p>`;

const StyledLorem = styled(Lorem, {
  fontSize: "0.5rem",
  fontWeight: 600,
});
