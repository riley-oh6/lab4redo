<script>
    import * as d3 from "d3";

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    export let data = [];
    export let selectedIndex = -1;

    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcData;
    $: arcData = sliceGenerator(data);
    let arcs;
    $: arcs = arcData.map((d) => arcGenerator(d));
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
</script>

<div class="chart-legend-container">
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, index}
            <path
                d={arc}
                fill={colors(index)}
                class:selected={selectedIndex === index}
                on:click={(e) =>
                    (selectedIndex = selectedIndex === index ? -1 : index)}
            />
        {/each}
    </svg>
    <div class="legend-container">
        <ul class="legend">
            {#each data as d, index}
                <li
                    style="--color: {colors(index)}"
                    class:selected={selectedIndex === index}
                    on:click={(e) =>
                        (selectedIndex = selectedIndex === index ? -1 : index)}
                >
                    <span class="swatch"></span>
                    {d.label} <em>({d.value})</em>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    svg {
        max-width: 20em;
        margin-block: 2em;
        /* Do not clip shapes outside the viewBox */
        overflow: visible;
    }

    .legend {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
    }

    .legend li {
        display: flex;
        align-items: center;
        margin-right: 20px;
        margin-bottom: 10px;
        font-family: Arial, sans-serif;
    }

    .legend li em {
        font-style: normal;
    }

    .legend .swatch {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
        background-color: var(--color);
    }

    .legend span {
        display: inline-block;
        width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .legend em {
        font-size: 0.9em;
        color: #666;
    }

    .container {
        display: flex;
        justify-content: center; /* Align items horizontally */
        align-items: center; /* Align items vertically */
        flex: 1;
    }

    .legend-container {
        border: 1px solid #ccc; /* Add border style */
        border-radius: 5px;
        padding: 10px;
        width: fit-content;
        margin: 0 auto; /* Align center horizontally */
        flex: 1;
    }

    .chart-legend-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px; /* Adjust the gap value to increase or decrease the space between the chart and legend */
    }

    svg:has(path:hover) {
        path:not(:hover) {
            opacity: 50%;
        }
    }

    path {
        transition: 300ms;
        cursor: pointer;
    }

    .selected {
        --color: oklch(0% 0% 0) !important;

        &:is(path) {
            fill: var(--color);
        }
        &:is(li) .swatch {
            background-color: var(--color);
        }
    }
</style>
