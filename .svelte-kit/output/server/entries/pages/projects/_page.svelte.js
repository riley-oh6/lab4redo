import { T as value_or_fallback, B as create_anchor, G as ensure_array_like, H as attr, I as stringify, K as escape, E as bind_props, F as pop, z as push, V as copy_payload, W as assign_payload, P as head } from "../../../chunks/index.js";
import { p as projects, P as Project } from "../../../chunks/Project.js";
import * as d3 from "d3";
function Pie($$payload, $$props) {
  push(false);
  let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
  let data = value_or_fallback($$props["data"], []);
  let selectedIndex = value_or_fallback($$props["selectedIndex"], -1);
  let sliceGenerator = d3.pie().value((d) => d.value);
  let arcData;
  let arcs;
  let colors = d3.scaleOrdinal(d3.schemeTableau10);
  arcData = sliceGenerator(data);
  arcs = arcData.map((d) => arcGenerator(d));
  const anchor = create_anchor($$payload);
  const each_array = ensure_array_like(arcs);
  const anchor_2 = create_anchor($$payload);
  const each_array_1 = ensure_array_like(data);
  $$payload.out += `<div class="chart-legend-container svelte-68zbf1"><svg viewBox="-50 -50 100 100" class="svelte-68zbf1">${anchor}`;
  for (let index = 0; index < each_array.length; index++) {
    const arc = each_array[index];
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}<path${attr("d", arc, false)}${attr("fill", colors(index), false)}${attr("class", `svelte-68zbf1 ${stringify([selectedIndex === index ? "selected" : ""].filter(Boolean).join(" "))}`, false)}></path>${anchor_1}`;
  }
  $$payload.out += `${anchor}</svg> <div class="legend-container svelte-68zbf1"><ul class="legend svelte-68zbf1">${anchor_2}`;
  for (let index = 0; index < each_array_1.length; index++) {
    const d = each_array_1[index];
    const anchor_3 = create_anchor($$payload);
    $$payload.out += `${anchor_3}<li${attr("style", `--color: ${stringify(colors(index))}`, false)}${attr("class", `svelte-68zbf1 ${stringify([selectedIndex === index ? "selected" : ""].filter(Boolean).join(" "))}`, false)}><span class="swatch svelte-68zbf1"></span> ${escape(d.label)} <em class="svelte-68zbf1">(${escape(d.value)})</em></li>${anchor_3}`;
  }
  $$payload.out += `${anchor_2}</ul></div></div>`;
  bind_props($$props, { data, selectedIndex });
  pop();
}
function _page($$payload, $$props) {
  push(false);
  let query = "";
  let filteredProjects;
  let selectedYearIndex = -1;
  let selectedYear;
  let pieData;
  let filteredByYear;
  filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join("\n").toLowerCase();
    return values.includes(query.toLowerCase());
  });
  {
    pieData = {};
    let rolledData = d3.rollups(filteredProjects, (v) => v.length, (d) => d.year);
    pieData = rolledData.map(([year, count]) => {
      return { value: count, label: year };
    });
    selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;
  }
  {
    filteredByYear = selectedYear ? filteredProjects.filter((project) => project.year === selectedYear) : filteredProjects;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const anchor = create_anchor($$payload2);
    const anchor_1 = create_anchor($$payload2);
    const each_array = ensure_array_like(filteredByYear);
    head($$payload2, ($$payload3) => {
      $$payload3.title = "<title>";
      $$payload3.title += `Projects</title>`;
    });
    $$payload2.out += `<h1>${escape(filteredByYear.length)} Projects</h1> ${anchor}`;
    Pie($$payload2, {
      data: pieData,
      get selectedIndex() {
        return selectedYearIndex;
      },
      set selectedIndex($$value) {
        selectedYearIndex = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `${anchor} <input type="search"${attr("value", query, false)} aria-label="Search projects" placeholder="🔍 Search projects…" class="svelte-1rqfcuz"> <div class="projects svelte-1rqfcuz">${anchor_1}`;
    for (let $$index = 0; $$index < each_array.length; $$index++) {
      const p = each_array[$$index];
      const anchor_2 = create_anchor($$payload2);
      const anchor_3 = create_anchor($$payload2);
      $$payload2.out += `${anchor_2}${anchor_3}`;
      Project($$payload2, { info: p });
      $$payload2.out += `${anchor_3}${anchor_2}`;
    }
    $$payload2.out += `${anchor_1}</div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
export {
  _page as default
};
