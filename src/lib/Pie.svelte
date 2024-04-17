<script>
    // import { arc } from 'svelte/easing'; // Import the arc easing function

    import * as d3 from 'd3';

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    export let data = [];
    export let selectedIndex = -1;
    export let transitionDuration = 250;

    let sliceGenerator = d3.pie().value(d => d.value).sort(null);

    let oldData = [];
    let pieData;

    $: {
        oldData = pieData;
        pieData = data.map(d => ({ ...d }));
        pieData = d3.sort(data, d => d.label);
        let arcData = sliceGenerator(data);
        let arcs = arcData.map((d) => arcGenerator(d));
        pieData = pieData.map((d, i) => ({ ...d, ...arcData[i], arc: arcs[i] }));
        transitionArcs();
    }

    function getEmptyArc(label, data = pieData) {
        let labels = d3.sort(new Set([...oldData, ...pieData].map(d => d.label)));
        let labelIndex = labels.indexOf(label);
        let sibling;
        for (let i = labelIndex - 1; i >= 0; i--) {
            sibling = data.find(d => d.label === labels[i]);
            if (sibling) {
                break;
            }
        }

        let angle = sibling?.endAngle ?? 0;
        return { startAngle: angle, endAngle: angle };
    }

    export let colors = d3.scaleOrdinal(d3.schemeTableau10);

    let wedges = {};

    function transitionArcs() {
        let wedgeElements = Object.values(wedges);

        d3.selectAll(wedgeElements).transition("arc")
            .duration(transitionDuration)
            .ease(d3.easeLinear)
            .styleTween("d", function (_, index) {
                let wedge = this;
                let label = Object.keys(wedges)[index];
                let d = pieData.find(d => d.label === label);
                let d_old = oldData.find(d => d.label === label);
                if (sameArc(d_old, d)) {
	                return null;
                }
                if (!d || !d_old) {
                    return;
                }
                let from = d_old ? {...d_old} : getEmptyArc(label, oldData);;
                let to = { ...d };
                let angleInterpolator = d3.interpolate(from, to);
                let interpolator = t => `path("${arcGenerator(angleInterpolator(t))}")`;

                return interpolator;
            });
    }

    function sameArc(arc1, arc2) {
        if (!arc1 && !arc2) return true;
        if (!arc1 || !arc2) return false;
        return arc1.startAngle === arc2.startAngle && arc1.endAngle === arc2.endAngle;
    }

    function arc(wedge) {
        let label = Object.entries(wedges).find(([label, w]) => w === wedge)[0];
        let transition = transitionArc(wedge, label);
        if (!transition || !transition.d || !transition.d_old) return;

        let type = transition.d ? transition.d_old ? "update" : "in" : "out";

        return {
            duration: transitionDuration,
            css: (t, u) => {
                let progress = type === "out" ? u : t;
                let interpolatedArc = arcGenerator(transition.interpolator(progress));
                return `path("${interpolatedArc}")`;
            },
            easing: d3.easeCubic
        };
    }
</script>

<div class="chart-legend-container">
    <svg viewBox="-50 -50 100 100">
        {#each pieData as d, index (d.label)}
            <path
                d={d.arc} fill={ colors(d.id ?? d.label) }
                bind:this={ wedges[d.label] }
            />
        {/each}
    </svg>
    <div class="legend-container">
        <ul class="legend">
            {#each pieData as d, index (d.label)}
                <li
                    style="--color: {colors(d.label)}"
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
        transition-property: transform, opacity, fill;
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
