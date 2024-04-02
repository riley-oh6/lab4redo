<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";

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
    let xAxis; // Initialize xAxis and yAxis
    let yAxis; // Initialize xAxis and yAxis
    let yAxisGridlines;
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

        dateExtent = d3.extent(commits, commit => new Date(commit.datetime));
        yScale = d3.scaleLinear()
            .domain([0, 24])  
            .range([0, height]);  
        xScale = d3.scaleTime()
            .domain(dateExtent)
            .range([0, width])
            .nice();  
        yAxisGridlines = d3.scaleLinear()
            .domain([0, 24])  
            .range([0, height]);  

        d3.select('#xAxis').call(d3.axisBottom(xScale));
        d3.select('#yAxis').call(d3.axisLeft(yScale).tickFormat(d => String(d % 24).padStart(2, "0") + ":00"));
        d3.select('#yAxisGridlines').call(
		    d3.axisLeft(yScale)
            .tickFormat("")
            .tickSize(-usableArea.width)
	    );




    });

    let width = 1000, height = 600;

    let margin = {top: 10, right: 10, bottom: 30, left: 20};

    let usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left
    };
    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;





</script>

<svg viewBox="0 0 {width} {height}">
    <g transform="translate({usableArea.left}, {usableArea.bottom})" id="xAxis" />
    <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />
    <g transform="translate({usableArea.left}, 0)" id="yAxis" />
    

    <g class="dots">
        {#each commits as commit, index }
            <circle
                cx={ xScale(commit.datetime) }
                cy={ yScale(commit.hourFrac) }
                r="5"
                fill="steelblue"
            />
        {/each}
    </g>
</svg>




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
</style>
