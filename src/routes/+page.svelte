<svelte:head>
	<title>Home Page</title>
</svelte:head>


<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
</script>

<body>
    <h1>Riley Oh</h1>
    <img src="images/riley.jpeg" alt="Riley Oh">
    <p>
       I am a third-year double majoring in 6-3 (Computer Science and Engineering), and 15-2 (Business Analytics). He is a member of the Men's Volleyball team. He is from Irvine, California.
    </p>
</body>

<body>
    <h2>
        My most recent projects:
    </h2>
    <div>
        {#each projects.slice(0,3) as p}
            <Project info={p} hLevel=3/>
        {/each}
    </div>
</body>