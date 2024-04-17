<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import Pie from "$lib/Pie.svelte";
    import {
	computePosition,
	autoPlacement,
	offset,
    } from '@floating-ui/dom';
    import FileLines from './FileLines.svelte';
    import Scrolly from "svelte-scrolly";

    let myColors = d3.scaleOrdinal(d3.schemeTableau10);
    let data = [];
    let commitTooltip;
    let commits = [];
    let numberOfFiles;
    let maxFileLength;
    let averageFileLength;
    let workByPeriod;
    let maxPeriod;


    let yScale;
    let xScale;
    let yAxisGridlines;
    let width = 1000, height = 600;
    let margin = {top: 10, right: 10, bottom: 30, left: 20};
    let languageBreakdown;
    let totalLines;
    let usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left
    };
    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;


    let svg;
    let brushSelection; // Initialize brushSelection
    let tooltipPosition = {x: 0, y: 0};

    let commitProgress = 100;
    let raceProgress = 100;
    
    let dateExtent;
    let timeScale; 

    let filteredCommits = [];
    $: filteredCommits = commits.filter(commit => commit.datetime <= commitMaxTime);


    let filteredLines = [];
    $: filteredLines = data.filter(d => d.datetime <= commitMaxTime);
    
    onMount(async () => {
        data = await d3.csv("loc.csv", row => ({
            ...row,
            line: Number(row.line), // or just +row.line
            depth: Number(row.depth),
            length: Number(row.length),
            date: new Date(row.date + "T00:00" + row.timezone),
            datetime: new Date(row.datetime)
        }));
        
        commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
            let first = lines[0];
            let {author, date, time, timezone, datetime} = first;
            let ret = {
                id: commit,
                url: "https://github.com/riley-oh6/lab4redo/commit/" + commit,
                author, date, time, timezone, datetime,
                hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
                totalLines: lines.length
            };

            // Like ret.lines = lines
            // but non-enumerable so it doesn’t show up in JSON.stringify
            Object.defineProperty(ret, "lines", {
                value: lines,
                configurable: true,
                writable: true,
                enumerable: false,
            });
            return ret;
        });

        numberOfFiles = d3.group(data, d => d.file).size;
        maxFileLength = d3.max(data, d => d.line);
        averageFileLength = d3.mean(data, d => d.line);
        workByPeriod = d3.rollups(data, v => v.length, d => d.datetime.toLocaleString("en", {dayPeriod: "short"}));
        maxPeriod = d3.greatest(workByPeriod, (d) => d[1])?.[0];


        dateExtent = d3.extent(commits, commit => (commit.datetime));
        
        yScale = d3.scaleLinear()
            .domain([0, 24])  
            .range([usableArea.bottom, usableArea.top]);  
        xScale = d3.scaleTime()
            .domain(d3.extent(commits, commit => (commit.datetime)))
            .range([usableArea.left, usableArea.right])
            .nice();  

        timeScale = d3.scaleTime()
            .domain(dateExtent)
            .range([0,100]);
        
        yAxisGridlines = d3.scaleLinear()
            .domain([0, 24])  
            .range([usableArea.bottom, usableArea.top]);  

        d3.select('#xAxis').call(d3.axisBottom(xScale));
        d3.select('#yAxis').call(d3.axisLeft(yScale).tickFormat(d => String(d % 24).padStart(2, "0") + ":00"));
        d3.select('#yAxisGridlines').call(
            d3.axisLeft(yScale)
            .tickFormat("")
            .tickSize(-usableArea.width)
        ); 

    });

    let hoveredIndex = -1;
    $: hoveredCommit = filteredCommits[hoveredIndex] ?? {};
    let cursor = {x: 0, y: 0};
    let selectedCommits = [];
    function brushed (evt) {
        let brushSelection = evt.selection;
        selectedCommits = !brushSelection ? [] : filteredCommits.filter(commit => {
            let min = {x: brushSelection[0][0], y: brushSelection[0][1]};
            let max = {x: brushSelection[1][0], y: brushSelection[1][1]};
            let x = xScale(commit.date);
            let y = yScale(commit.hourFrac);
            return x >= min.x && x <= max.x && y >= min.y && y <= max.y;
        });
    }

    function isCommitSelected(commit) {
	    return selectedCommits.includes(commit);
    }
    $: {
	    d3.select(svg).call(d3.brush().on("start brush end", brushed));
        d3.select(svg).selectAll(".dots, .overlay ~ *").raise();

    }
    
    $: selectedCommits = brushSelection ? commits.filter(isCommitSelected) : [];
    $: hasSelection = selectedCommits.length > 0;

    $: selectedLines = (hasSelection ? selectedCommits : filteredCommits).flatMap(d => d.lines);

    $: totalLines = selectedLines.length;
    $: languageBreakdown = d3.rollup(selectedLines, D => D.length, d => d.type);

    let commitMaxTime;
    $: {
        if (timeScale) {
            commitMaxTime = timeScale.invert(commitProgress);
        }
    }

    let commitMaxTime2;
    $: {
        if (timeScale) {
            commitMaxTime2 = timeScale.invert(raceProgress);
        }
    }

    

    async function dotInteraction (index, evt) {
        let hoveredDot = evt.target;
        if (evt.type === "mouseenter" || evt.type === "focus") {
	        hoveredIndex = index;
            cursor = { x: evt.x, y: evt.y };
            tooltipPosition = await computePosition(hoveredDot, commitTooltip, {
                strategy: "fixed", // because we use position: fixed
                middleware: [
                    offset(5), // spacing from tooltip to dot
                    autoPlacement() // see https://floating-ui.com/docs/autoplacement
                ],
            });

        }
        else if (evt.type === "mouseleave" || evt.type === "blur") {
	       hoveredIndex = -1;
        } else if (evt.type === 'click' || (evt.type === 'keyup' && evt.type === 'Enter')){
            selectedCommits = [filteredCommits[index]];
        }
    }
    
    $: radiusScale = d3.scaleLinear()
	.domain(d3.extent(filteredCommits, commit => commit.totalLines))
	.range([5, 20]);
</script>

<h1>
    Meta
</h1>

<p>
    this page includes stats about the code of this website.
</p>

<dl class="stats">
    <dt>Total <abbr title="Lines of code">LOC</abbr></dt>
    <dd>{filteredLines.length}</dd>

    <dt>Total commits</dt>
    <dd>{filteredCommits.length}</dd>

    <dt>Total number of files</dt>
    <dd>{numberOfFiles}</dd>

    <dt>Max file length</dt>
    <dd>{maxFileLength}</dd>

    <dt>Average file length</dt>
    <dd>{parseInt(averageFileLength)}</dd>

    <dt>Most frequent time of work</dt>
    <dd>{maxPeriod}</dd>
</dl>

<dl id="commit-tooltip" bind:this={commitTooltip} class="info tooltip" hidden={hoveredIndex === -1 } style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px">
	<dt>Commit</dt>
	<dd><a href="{ hoveredCommit.url }" target="_blank">{ hoveredCommit.id }</a></dd>

	<dt>Date</dt>
	<dd>{ hoveredCommit.datetime?.toLocaleString("en", {date: "full"}) }</dd>

    <dt>Time</dt>
    <dd>{ hoveredCommit.time }</dd>

    <dt>Author</dt>
    <dd>{ hoveredCommit.author }</dd>

    <dt>Lines Edited</dt>
    <dd>{ hoveredCommit.totalLines }</dd>

</dl>



<Scrolly bind:progress={commitProgress}>
	{#each commits as commit, index }
        <p>
            As I delved into the codebase, each commit became a milestone, a testament to progress. The journey began with {commit.datetime.toLocaleString("en", {dateStyle: "full", timeStyle: "short"})}, crafting a foundation that would soon blossom. Over time, these commits grew in number and significance, shaping the evolution of our project.

With this commit, I forged {commit.totalLines} lines of code, weaving functionality and purpose into every file. The complexity unfolded across {d3.rollups(commit.lines, D => D.length, d => d.file).length} files, a testament to the depth of our work.

But it wasn’t just about lines of code; it was about the meticulous craftsmanship embedded in each commit. Every edit was a brushstroke, adding layers of functionality and refinement. As the codebase flourished, so did my understanding of its intricacies. After this, I had done {index + 1} commits.
        </p>
    {/each}
	<svelte:fragment slot="viz">
        <Pie data={Array.from(languageBreakdown).map(([language, lines]) => ({label: language, value: lines}))} />
        <svg viewBox="0 0 {width} {height}" bind:this={svg}>
            <g transform="translate(0, {usableArea.bottom})" id="xAxis" />
            <g class="gridlines" transform="translate({usableArea.left}, 0)" id="yAxisGridlines" bind:this={yAxisGridlines} />
            <g transform="translate({usableArea.left}, 0)" id="yAxis" />
        
            <g class="dots">
                {#each filteredCommits as commit, index (commit.id) }
                <circle
                    fill="steelblue"
                    class:selected={isCommitSelected(commit)}
                    cx={xScale(commit.datetime)}
                    cy={yScale(commit.hourFrac)}
                    r={radiusScale(commit.totalLines)}
                    on:mouseenter={evt => dotInteraction(index, evt)}
                    on:mouseleave={evt => dotInteraction(index, evt)}
                    tabindex="0"
                    aria-describedby="commit-tooltip"
                    role="tooltip"
                    aria-haspopup="true"
                    on:focus={evt => dotInteraction(index, evt)}
                    on:blur={evt => dotInteraction(index, evt)}
                    on:click={evt => dotInteraction(index, evt)}
                    on:keyup={evt => dotInteraction(index, evt)}
                    fill-opacity="75%"
                />
            
                {/each}
            </g>
        </svg>
		
            
	</svelte:fragment>
</Scrolly>


<Scrolly bind:progress={raceProgress} --scrolly-layout="viz-first" --scrolly-viz-width="1.5fr" throttle=500 debounce=20>
	{#each commits as commit, index }
        <p>
            As I delved into the codebase, each commit became a milestone, a testament to progress. The journey began with {commit.datetime.toLocaleString("en", {dateStyle: "full", timeStyle: "short"})}, crafting a foundation that would soon blossom. Over time, these commits grew in number and significance, shaping the evolution of our project.

With this commit, I forged {commit.totalLines} lines of code, weaving functionality and purpose into every file. The complexity unfolded across {d3.rollups(commit.lines, D => D.length, d => d.file).length} files, a testament to the depth of our work.

But it wasn’t just about lines of code; it was about the meticulous craftsmanship embedded in each commit. Every edit was a brushstroke, adding layers of functionality and refinement. As the codebase flourished, so did my understanding of its intricacies. After this, I had done {index + 1} commits.
        </p>
    {/each}
	<svelte:fragment slot="viz">
        <FileLines lines={filteredLines} colors={myColors}/>
	</svelte:fragment>
</Scrolly>

<style>
    .stats {
        margin-top: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        background-color: #f9f9f9;
    }

    .stats dt {
        font-weight: bold;
        margin-top: 10px;
        font-family:'Segoe UI', Tahoma, Verdana, sans-serif
        
    }

    .stats dd {
        margin-left: 20px;
        margin-top: 5px;
    }

    svg {
        overflow: visible;
    }
    .gridlines {
	    stroke-opacity: .2;
    }

    circle {
        transition: 200ms;
        &:hover {
            transform: scale(1.5);
        }
        transform-origin: center;
        transform-box: fill-box;
    }

    dl.info .tooltip{
        display: grid;
        grid-template-columns: auto 1fr; 
        grid-column-gap: 10px; 
        margin: 0; 

        transition-duration: 500ms;
        transition-property: opacity, visibility;

        &[hidden]:not(:hover, :focus-within) {
        opacity: 0;
        visibility: hidden;
        }
    }


    dl.info dt {
        font-weight: bold; 
        color: #666; 
    }

    
    @starting-style {
	    r: 0;
    }   

    .tooltip {
        position: fixed;
        top: 1em;
        left: 1em; 

        background-color: #fff;
        border: 1px solid #ccc;
        padding: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 9999; 
        
    }

    circle.selected {
        fill: red; 
        transform: scale(1.5);
    }


    dl {
        margin-top: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        background-color: #f9f9f9;
    }

    dl dt {
        margin-top: 10px;
        font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
        color: #333; /* Change the color of the term */
        text-transform: uppercase
    }

    dl dd {
        margin-left: 20px;
        margin-top: 5px;
        color: #666; /* Change the color of the description */
    }

    /* Optional: Style the percentage */
    dl dt span {
        font-weight: normal;
        color: #888;
    }

    label {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin-bottom: 10px;
    }

    input[type="range"] {
        width: 100%;
        flex: 1;
    }

    time {
        text-align: center;
    }

    :global(body){
        max-width: min(120ch, 80vw);
    }
</style>
