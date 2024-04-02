

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/meta/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.CYglzS7v.js","_app/immutable/chunks/disclose-version.CO_dDP94.js","_app/immutable/chunks/runtime.ydBjxQlf.js"];
export const stylesheets = [];
export const fonts = [];
