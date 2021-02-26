import { serve } from "http";
import App from "./App.tsx";
import { h } from "preact";
import { default as render } from "preact-render-to-string";

import { getSheet } from "./css.ts";

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  // SSR
  const body = render(h(App, {}));
  const sheet = getSheet();
  // respond
  req.respond({
    status: 200,
    headers: new Headers({
      "Content-Type": "text/html; charset=UTF-8",
    }),
    body: `
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
`,
  });
}
