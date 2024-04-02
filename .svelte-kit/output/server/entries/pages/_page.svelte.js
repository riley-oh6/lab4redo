import { B as create_anchor, G as ensure_array_like, P as head, Q as await_block, F as pop, K as escape, z as push } from "../../chunks/index.js";
import { P as Project, p as projects } from "../../chunks/Project.js";
function _page($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  const each_array = ensure_array_like(projects.slice(0, 3));
  const anchor_3 = create_anchor($$payload);
  head($$payload, ($$payload2) => {
    $$payload2.title = "<title>";
    $$payload2.title += `Home Page</title>`;
  });
  $$payload.out += `<h1>Riley Oh</h1> <img src="images/riley.jpeg" alt="Riley Oh"> <p>I am a third-year double majoring in 6-3 (Computer Science and Engineering), and 15-2 (Business Analytics). He is a member of the Men's Volleyball team. He is from Irvine, California.</p> <h2>My most recent projects:</h2> <div>${anchor}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const p = each_array[$$index];
    const anchor_1 = create_anchor($$payload);
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_1}${anchor_2}`;
    Project($$payload, { info: p, hLevel: "3" });
    $$payload.out += `${anchor_2}${anchor_1}`;
  }
  $$payload.out += `${anchor}</div> <section><h2>My Github Stats:</h2> ${anchor_3}`;
  await_block(
    fetch("https://api.github.com/users/riley-oh6"),
    () => {
      $$payload.out += `<p>Loading...</p>`;
    },
    (response) => {
      const anchor_4 = create_anchor($$payload);
      $$payload.out += `${anchor_4}`;
      await_block(
        response.json(),
        () => {
          $$payload.out += `<p>Decoding...</p>`;
        },
        (data) => {
          $$payload.out += `<dl class="svelte-7nc16r"><dt class="svelte-7nc16r">Public Repositories:</dt> <dd class="svelte-7nc16r">${escape(data.public_repos)}</dd> <dt class="svelte-7nc16r">Followers:</dt> <dd class="svelte-7nc16r">${escape(data.followers)}</dd> <dt class="svelte-7nc16r">Following:</dt> <dd class="svelte-7nc16r">${escape(data.following)}</dd> <dt class="svelte-7nc16r">Public Gists:</dt> <dd class="svelte-7nc16r">${escape(data.public_gists)}</dd></dl>`;
        },
        (error) => {
          $$payload.out += `<p class="error">Something went wrong: ${escape(error.message)}</p>`;
        }
      );
      $$payload.out += `${anchor_4}`;
    }
  );
  $$payload.out += `${anchor_3}</section>`;
  pop();
}
export {
  _page as default
};
