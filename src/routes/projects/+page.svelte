<script>
    import projects from "$lib/projects.json";
    import Project from "$lib/Project.svelte";
    import Pie from "$lib/Pie.svelte";
    import * as d3 from "d3";

    let query = "";
    let filteredProjects;

    

    let selectedYearIndex = -1;
    let selectedYear;
    $: filteredProjects = projects.filter(project => {
        let values = Object.values(project).join("\n").toLowerCase();
        return values.includes(query.toLowerCase());
    });

    let pieData;
    $: {
        pieData = {};
        let rolledData = d3.rollups(
            filteredProjects,
            (v) => v.length,
            (d) => d.year,
        );
        pieData = rolledData.map(([year, count]) => {
            return { value: count, label: year };
        });

        selectedYear =
            selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;
    }

    // Filtering projects by selected year
    let filteredByYear;
    $: {
        filteredByYear = selectedYear
            ? filteredProjects.filter(
                  (project) => project.year === selectedYear,
              )
            : filteredProjects;
    }
</script>

<svelte:head>
    <title>Projects</title>
</svelte:head>

<h1>{filteredByYear.length} Projects</h1>

<Pie data={pieData} bind:selectedIndex={selectedYearIndex} />
<input
    type="search"
    bind:value={query}
    aria-label="Search projects"
    placeholder="🔍 Search projects…"
/>
<div class="projects">
    {#each filteredByYear as p}
        <Project info={p} />
    {/each}
</div>

<style>
    .projects {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
    }
    .projects article {
        display: grid;
        grid-template-rows: subgrid; /* Use subgrid for horizontal alignment */
        grid-row: span 3;
    }

    /* Ensure each article spans three rows */
    .projects article h2 {
        margin: 0;
    }

    input[type="search"] {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 10px;
    }
</style>
