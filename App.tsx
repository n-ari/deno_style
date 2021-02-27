import { Fragment, h } from "preact";
import htm from "htm";
import { css, styled } from "./css.ts";

// deno-lint-ignore no-explicit-any
function html(strings: TemplateStringsArray, ...values: any[]) {
  const root = htm.bind(h)(strings, ...values);
  return Array.isArray(root) ? h(Fragment, {}, root) : root;
}

const classes = {
  head: css({
    fontSize: "2rem",
  }),
  paragraph: css({
    fontSize: "1.2rem",
  }),
};

const Button = styled("a", {
  display: "inline-block",
  margin: "0.5rem",
  padding: "1rem",
  textDecoration: "none",
  color: "#fafafa",
  backgroundColor: "#757575",
  border: "solid 1px transparent",
  transition: "0.2s",
  "&:hover": {
    border: "solid 1px #212121",
    color: "#212121",
    backgroundColor: "#fafafa",
  },
});
const BlueButton = styled(Button, {
  backgroundColor: "#3f51b5",
  "&:hover": {
    backgroundColor: "#e8eaf6",
  },
});

export default function App() {
  return html`
    <h1 class="${classes.head}">Heading</h1>
    <p class="${classes.paragraph}">Hello, world</p>
    <${Button} href="#">styled button<//>
    <${BlueButton} href="#">more styled button<//>
  `;
}
