

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/contact/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BQmd9ZtC.js","_app/immutable/chunks/disclose-version.CO_dDP94.js","_app/immutable/chunks/runtime.ydBjxQlf.js"];
export const stylesheets = [];
export const fonts = [];
