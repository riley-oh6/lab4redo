import { K as escape, J as store_get, N as unsubscribe_stores, F as pop, z as push } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
function Error($$payload, $$props) {
  push(false);
  var $$store_subs;
  $$payload.out += `<h1>${escape(store_get($$store_subs ??= {}, "$page", page).status)}</h1> <p>${escape(store_get($$store_subs ??= {}, "$page", page).error?.message)}</p>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
export {
  Error as default
};
