import { F as pop, z as push } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push(false);
  $$payload.out += `<h1>Meta</h1> <p>this page includes stats about the code of this website.</p>`;
  pop();
}
export {
  _page as default
};
