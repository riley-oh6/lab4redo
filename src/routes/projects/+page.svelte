<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>


<body>
    
    <h1>{ projects.length } Projects</h1>
    <div class="projects">
        {#each projects as p}
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
             Avoid excessive spacing
        }   
    </style>
</body>