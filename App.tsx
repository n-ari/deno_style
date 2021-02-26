import { Fragment, h } from "preact";
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
  `;
}

const StyledComponent = styled("p", {
  fontSize: "2rem",
  fontStyle: "italic",
});
