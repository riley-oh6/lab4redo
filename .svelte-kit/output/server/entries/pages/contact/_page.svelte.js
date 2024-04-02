import { P as head, F as pop, z as push } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push(false);
  head($$payload, ($$payload2) => {
    $$payload2.title = "<title>";
    $$payload2.title += `Contact me</title>`;
  });
  $$payload.out += `<h1>Contact</h1> <form action="mailto:YOUR_EMAIL_ADDRESS" method="POST" enctype="text/plain"><label for="email">Email: <input type="email" id="email" name="email" required></label> <label for="subject">Subject: <input type="text" id="subject" name="subject" required></label> <label for="body">Body: <textarea id="body" name="body" required></textarea></label> <button>Submit</button></form>`;
  pop();
}
export {
  _page as default
};
