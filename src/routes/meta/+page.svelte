<script>
    import * as d3 from "d3";
    import Pie from "$lib/Pie.svelte";
    import FileLines from "./FileLines.svelte";
    import { onMount } from "svelte";
    import {
        computePosition,
        autoPlacement,
        offset,
    } from '@floating-ui/dom';
    import Scrolly from "svelte-scrolly";



    let data = [];
    let commits = [];
    let commitTooltip;
    let tooltipPosition = {x: 0, y: 0};

    let colors = d3.scaleOrdinal(d3.schemeTableau10);



    let cursor = {x: 0, y: 0};  

    let xAxis, yAxis;
    let width = 1000, height = 600;
    let margin = {top: 10, right: 10, bottom: 30, left: 20};




    onMount(async () => {
        data = await d3.csv("loc2.csv", row => ({
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

        Object.defineProperty(ret, "lines", {
            value: lines,
            configurable: true,
            writable: true,
            enumerable: false,
        });

        return ret;
        });
        commits = d3.sort(commits, d => -d.totalLines);

    });

    let commitProgress = 100;
    $: timeScale = d3.scaleTime().domain(d3.extent(commits, commit => (commit.datetime))).range([0,100])
    $: commitMaxTime = timeScale.invert(commitProgress)



    let raceProgess = 100;
    $: racetimeScale = d3.scaleTime().domain(d3.extent(commits, commit => (commit.datetime))).range([0,100])
    $: raceMaxTime = racetimeScale.invert(raceProgess)
    
    $: racefilteredLines = data.filter((d) => d.datetime <= raceMaxTime )

    $: filteredCommits = commits.filter((commit) => commit.datetime <= commitMaxTime )
    $: filteredLines = data.filter((d) => d.datetime <= commitMaxTime )



    $: fileLengths = d3.rollups(data, v => d3.max(v, v => v.line), d => d.file);
    $: averageFileLength = d3.mean(fileLengths, d => d[1]);
    $: workByPeriod = d3.rollups(data, v => v.length, d => d.datetime.toLocaleString("en", {dayPeriod: "short"}))
    $: maxPeriod = d3.greatest(workByPeriod, (d) => d[1])?.[0];

    $: yScale = d3.scaleLinear([0,24], [usableArea.bottom, usableArea.top]);
    $: xScale = d3.scaleTime(d3.extent(filteredLines, d=>d.datetime), [usableArea.left, usableArea.right] ).nice()

    let hoveredIndex = -1;
    let hoveredCommit = {};



    async function dotInteraction(index, evt){
        let hoveredDot =  evt.target;
        if (evt.type === "mouseenter" || evt.type === "focus") {
            hoveredCommit = filteredCommits[index];
            tooltipPosition = await computePosition(hoveredDot, commitTooltip, {
                strategy: "fixed", 
                middleware: [
                    offset(5), 
                    autoPlacement() 
                    ],
                });
            }
        else if (evt.type === "mouseleave" || evt.type === "blur") {
            hoveredCommit = {};
            hoveredIndex = -1;
            }
        else if ((evt.type === "click") || (evt.type === "keyup" && evt.key === "Enter")) {
            selectedCommits = [filteredCommits[index]];
            }
    }



    let usableArea = {
	top: margin.top,
	right: width - margin.right,
	bottom: height - margin.bottom,
	left: margin.left
    };
    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;


    $: {d3.select(xAxis).call(d3.axisBottom(xScale));
        d3.select(yAxis).call(d3.axisLeft(yScale).tickFormat(d => String(d % 24).padStart(2, "0") + ":00"));
    }

    let yAxisGridlines;

    $: {
	d3.select(yAxisGridlines).call(
		d3.axisLeft(yScale)
		  .tickFormat("")
		  .tickSize(-usableArea.width)
        );
    }     


    let svg;
    $: {
        d3.select(svg).call(d3.brush().on("start brush end", brushed));
        d3.select(svg).selectAll(".dots, .overlay ~ *").raise();

    }

    $: rscale = d3.scaleSqrt(d3.extent(commits, d=>d.totalLines), [2,30])
    console.log("hello")
    console.log(filteredLines)

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


    function isCommitSelected (commit) {
        return selectedCommits.includes(commit);
    }



    $: {d3.select(svg).call(d3.brush().on("start brush end", brushed));
        d3.select(svg).selectAll(".dots, .overlay ~ *").raise();        }

    $: hasSelection = selectedCommits.length > 0;
    $: selectedLines = (hasSelection ? selectedCommits : filteredCommits).flatMap(d => d.lines);
    $: totalLines = selectedLines.length;
    $: languageBreakdown = d3.rollups(selectedLines, D=> D.length, d=> d.type)






</script>

<svelte:head>
	<title>Meta</title>
</svelte:head>
<h1>
    Meta
</h1>


<Scrolly  bind:progress={commitProgress}>
	{#each commits as commit, index }
        <p>
            As I delved into the codebase, each commit became a milestone, a testament to progress. The journey began with {commit.datetime.toLocaleString("en", {dateStyle: "full", timeStyle: "short"})}, crafting a foundation that would soon blossom. Over time, these commits grew in number and significance, shaping the evolution of our project.

With this commit, I forged {commit.totalLines} lines of code, weaving functionality and purpose into every file. The complexity unfolded across {d3.rollups(commit.lines, D => D.length, d => d.file).length} files, a testament to the depth of our work.

But it wasn’t just about lines of code; it was about the meticulous craftsmanship embedded in each commit. Every edit was a brushstroke, adding layers of functionality and refinement. As the codebase flourished, so did my understanding of its intricacies. After this, I had done {index + 1} commits.
        </p>
    {/each}


	<svelte:fragment slot="viz">
		
        <svg viewBox="0 0 {width} {height}" bind:this={svg}>

            <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
            <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
            <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />

            <g class="dots">
                {#each filteredCommits as commit, index (commit.id) }
                    <circle
                        cx={ xScale(commit.datetime) }
                        cy={ yScale(commit.hourFrac) }
                        r= {rscale(commit.totalLines)}
                        fill = "steelblue"
                        fill-opacity = "70%"
                        class:selected={isCommitSelected(commit)}
                        on:mouseenter= {evt => dotInteraction(index, evt)}
                        on:mouseenter={evt => {
                            hoveredIndex = index;
                            cursor = {x: evt.x, y: evt.y};
                        }}
                        on:mouseleave={evt => dotInteraction(index, evt)}
                        tabindex = "0"
                        aria-describedby="commit-tooltip"
                        role="tooltip"
                        aria-haspopup="true"
                        on:focus = {evt => dotInteraction(index, evt)}
                        on:blur = {evt => dotInteraction(index, evt)}             
                        on:click = {evt => dotInteraction(index, evt)}
                        on:keyup = {evt => dotInteraction(index, evt)}   
                    /> 
                {/each}
                </g>                
        </svg>

        <Pie data= {Array.from(languageBreakdown).map(([language,lines]) => ({label:language, value:lines}))}  colors = {colors}/>

	</svelte:fragment>
</Scrolly>


<Scrolly bounce= 50 throttle = 50 bind:progress={raceProgess} --scrolly-layout="viz-first">


    {#each commits as commit, index }
        <p>
            As I delved into the codebase, each commit became a milestone, a testament to progress. The journey began with {commit.datetime.toLocaleString("en", {dateStyle: "full", timeStyle: "short"})}, crafting a foundation that would soon blossom. Over time, these commits grew in number and significance, shaping the evolution of our project.

With this commit, I forged {commit.totalLines} lines of code, weaving functionality and purpose into every file. The complexity unfolded across {d3.rollups(commit.lines, D => D.length, d => d.file).length} files, a testament to the depth of our work.

But it wasn’t just about lines of code; it was about the meticulous craftsmanship embedded in each commit. Every edit was a brushstroke, adding layers of functionality and refinement. As the codebase flourished, so did my understanding of its intricacies. After this, I had done {index + 1} commits.
        </p>
    {/each}
    
	<svelte:fragment slot="viz">
		<FileLines lines={racefilteredLines} colors = {colors} />
	</svelte:fragment>

  
</Scrolly>



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




<dl class = "language">
    {#each languageBreakdown as [language, lines] }
        <dt><strong>{language}</strong></dt>
        <dd>{lines} lines ({d3.format(".1~%")(lines / totalLines)})</dd>
    {/each}
</dl>


<dl class="stats">
	<dt>Total <abbr title="Lines of code">LOC</abbr></dt>
	<dd>{filteredLines.length}</dd>

    <dt>Maximum depth</dt>
    <dd>{d3.max(filteredLines, d => d.depth)}</dd>

    <dt>Number of files</dt>
    <dd>{d3.group(filteredLines, d => d.file).size}</dd>

    <dt>Average file length</dt>
    <dd>{averageFileLength}</dd>

    <dt>Time of day when most work is completed</dt>
    <dd>{maxPeriod}</dd>

</dl>



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