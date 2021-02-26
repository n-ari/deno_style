deno run \
  -c tsconfig.json \
  --allow-net --allow-read=. \
  --import-map=import_map.json \
  --unstable --watch \
  ./main.ts

