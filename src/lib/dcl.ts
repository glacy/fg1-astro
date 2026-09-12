const files = import.meta.glob<string>("/src/assets/DCL*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

const instances = new Map<string, number>();

function scopeIds(svg: string, prefix: string): string {
  return svg
    .replace(/\bid="([^"]+)"/g, (_match, id: string) => `id="${prefix}${id}"`)
    .replace(/\burl\(#([^)]+)\)/g, (_match, id: string) => `url(#${prefix}${id})`)
    .replace(/\bhref="#([^"]+)"/g, (_match, id: string) => `href="#${prefix}${id}"`);
}

export function loadDclSvg(name: string): string | undefined {
  const raw = files[`/src/assets/${name}.svg`];
  if (!raw) return undefined;
  const count = (instances.get(name) ?? 0) + 1;
  instances.set(name, count);
  return scopeIds(raw, `dcl-${name}-${count}-`);
}
