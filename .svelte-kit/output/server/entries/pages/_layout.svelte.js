import { B as create_anchor, G as ensure_array_like, H as attr, I as stringify, J as store_get, K as escape, L as slot, N as unsubscribe_stores, F as pop, z as push } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
function _layout($$payload, $$props) {
  push(false);
  var $$store_subs;
  let pages = [
    { url: "./", title: "Home" },
    { url: "./projects", title: "Projects" },
    { url: "./resume", title: "Resume" },
    { url: "./contact", title: "Contact" },
    {
      url: "https://github.com/YourGitHubUsername",
      title: "GitHub",
      external: true
    },
    { url: "./meta", title: "Meta" }
  ];
  let root = globalThis?.document?.documentElement;
  let localStorage = globalThis.localStorage ?? {};
  console.log(localStorage);
  let colorScheme = localStorage.colorScheme ?? "light dark";
  localStorage.colorScheme = colorScheme;
  root?.style.setProperty("color-scheme", colorScheme);
  const anchor = create_anchor($$payload);
  const each_array = ensure_array_like(pages);
  const anchor_2 = create_anchor($$payload);
  $$payload.out += `<nav class="svelte-1ph2wmi">${anchor}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const p = each_array[$$index];
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}<a${attr("href", p.url, false)}${attr("target", p.url.startsWith("http") ? "_blank" : null, false)}${attr(
      "class",
      `svelte-1ph2wmi ${stringify([
        "." + store_get($$store_subs ??= {}, "$page", page).route.id === p.url ? "active" : ""
      ].filter(Boolean).join(" "))}`,
      false
    )}>${escape(p.title)}</a>${anchor_1}`;
  }
  $$payload.out += `${anchor}</nav> ${anchor_2}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor_2} <label class="color-scheme svelte-1ph2wmi">Theme: <select id="themeSelect"><option value="light dark">Automatic</option><option value="light">Light</option><option value="dark">Dark</option></select></label>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
