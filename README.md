# deno_style

styled component for preact on deno.

## Usage

App.tsx

```typescript
import { css, styled } from "https://raw.githubusercontent.com/n-ari/deno_style/master/mod.ts";

import { Fragment, h } from "https://esm.sh/preact@10.5.12";
import htm from "https://esm.sh/htm@3.0.4";
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
```

main.ts

```typescript
import App from "./App.tsx";
import { default as render } from "https://esm.sh/preact-render-to-string?external=preact@5.1.12";
import { h } from "https://esm.sh/preact@10.5.12";
import { getSheet } from "https://raw.githubusercontent.com/n-ari/deno_style/master/mod.ts";

const body = render(h(App, {}));
const sheet = getSheet(); // can be called from server / client
const rendered = `
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>deno_style</title>
  <style>${sheet}</style>
</head>
<body>
  <div id="root">${body}</div>
</body>
</html>
`
```

## Inspired by

goober https://github.com/cristianbote/goober

## LICENSE

MIT

