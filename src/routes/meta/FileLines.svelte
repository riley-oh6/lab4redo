<script>
    import * as d3 from "d3";
    import { scale } from "svelte/transition";
    import { flip as originalFlip } from "svelte/animate";
    function getFlip () {
	    return originalFlip;
    }
    $: flip = getFlip(files);



    export let lines = [];
    export let colors = d3.scaleOrdinal(d3.schemeTableau10);
    let files = [];
    
    $: {
        files = d3.groups(lines, d => d.file).map(([name, lines]) => {
            return {name, lines};
        });
        files = d3.sort(files, d => -d.lines.length);
    }

    // Function to set the --color CSS variable dynamically
    function getColor(type) {
        return colors(type);
    }
</script>

<dl class="files">
    {#each files as file (file.name) }
        <div animate:flip>
            <dt>
                <code>{file.name}</code>
                <small>{file.lines.length} lines</small>
            </dt>
            <dd>
                {#each file.lines as line (line.line) }
                    <div in:scale class="line" style="--color: {getColor(line.type)}"></div>
                {/each}
            </dd>
        </div>
    {/each}
</dl>

<style>
    .files {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    .files div {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: subgrid;
    }

    .files dt {
        grid-column: 1;
    }

    .files dd {
        grid-column: 2;
    }

    .line {
        display: flex;
        width: .5em;
        aspect-ratio: 1;
        background: var(--color, steelblue); /* Default color fallback */
        border-radius: 50%;
    }

    dd {
        grid-column: 2;
        display: flex;
        flex-wrap: wrap;
        align-items: start;
        align-content: start;
        gap: .15em;
        padding-top: .6em;
        margin-left: 0;
    }

    small {
        display: block;
    }
</style>
