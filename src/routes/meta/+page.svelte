<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import Pie from "$lib/Pie.svelte";



    let data = [];
    let commits = [];
    let numberOfFiles;
    let maxFileLength;
    let averageFileLength;
    let workByPeriod;
    let maxPeriod;
    let dateExtent;
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
            .domain(dateExtent)
            .range([usableArea.left, usableArea.right])
            .nice();  

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

        // Create brush and attach it to SVG

    });

    let hoveredIndex = -1;
    $: hoveredCommit = commits[hoveredIndex] ?? {};
    let cursor = {x: 0, y: 0};
    
    
    function brushed (evt) {
        brushSelection = evt.selection;
    }

    function isCommitSelected (commit) {
        if (!brushSelection) {
            return false;
        }
        let min = {x: brushSelection[0][0], y: brushSelection[0][1]};
        let max = {x: brushSelection[1][0], y: brushSelection[1][1]};
        let x = xScale(commit.date);
        let y = yScale(commit.hourFrac);
        return x >= min.x && x <= max.x && y >= min.y && y <= max.y;
    }
    $: {
	    d3.select(svg).call(d3.brush().on("start brush end", brushed));
        d3.select(svg).selectAll(".dots, .overlay ~ *").raise();

    }
    
    $: selectedCommits = brushSelection ? commits.filter(isCommitSelected) : [];
    $: hasSelection = brushSelection && selectedCommits.length > 0;

    $: selectedLines = (hasSelection ? selectedCommits : commits).flatMap(d => d.lines);

    $: totalLines = selectedLines.length;
    $: languageBreakdown = d3.rollup(selectedLines, D => D.length, d => d.type);
</script>


<svg viewBox="0 0 {width} {height}" bind:this={svg}>
    <g transform="translate(0, {usableArea.bottom})" id="xAxis" />
    <g class="gridlines" transform="translate({usableArea.left}, 0)" id="yAxisGridlines" bind:this={yAxisGridlines} />
    <g transform="translate({usableArea.left}, 0)" id="yAxis" />

    <g class="dots">
        {#each commits as commit, index}
        <circle
            fill="steelblue"
            class:selected={isCommitSelected(commit)}
            cx={xScale(commit.datetime)}
            cy={yScale(commit.hourFrac)}
            r="5"
            on:mouseenter={evt => hoveredIndex = index}
            on:mouseleave={evt => hoveredIndex = -1}
            on:mouseenter={evt => {
                hoveredIndex = index;
                cursor = { x: evt.x, y: evt.y };
            }}
        />
    
        {/each}
    </g>
</svg>

<p>{hasSelection ? selectedCommits.length : "No"} commits selected</p>


<dl>
    {#each languageBreakdown as [language, lines] }
        <dt> <strong>{language}</strong>: {lines} ({d3.format(".1~%")(lines / totalLines)}) </dt>
    {/each} 
</dl>

<Pie data={Array.from(languageBreakdown).map(([language, lines]) => ({label: language, value: lines}))} />



<h1>
    Meta
</h1>

<p>
    this page includes stats about the code of this website.
</p>

<dl class="stats">
    <dt>Total <abbr title="Lines of code">LOC</abbr></dt>
    <dd>{data.length}</dd>

    <dt>Total commits</dt>
    <dd>{commits.length}</dd>

    <dt>Total number of files</dt>
    <dd>{numberOfFiles}</dd>

    <dt>Max file length</dt>
    <dd>{maxFileLength}</dd>

    <dt>Average file length</dt>
    <dd>{parseInt(averageFileLength)}</dd>

    <dt>Most frequent time of work</dt>
    <dd>{maxPeriod}</dd>
</dl>

<dl id="commit-tooltip" class="info tooltip" hidden={hoveredIndex === -1 } style="top: {cursor.y}px; left: {cursor.x}px">
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
</style>
