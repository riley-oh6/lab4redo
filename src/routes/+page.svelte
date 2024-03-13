<svelte:head>
	<title>Home Page</title>
</svelte:head>


<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
</script>


    <h1>Riley Oh</h1>
    <img src="images/riley.jpeg" alt="Riley Oh">
    <p>
       I am a third-year double majoring in 6-3 (Computer Science and Engineering), and 15-2 (Business Analytics). He is a member of the Men's Volleyball team. He is from Irvine, California.
    </p>



    <h2>
        My most recent projects:
    </h2>
    <div>
        {#each projects.slice(0,3) as p}
            <Project info={p} hLevel=3/>
        {/each}
    </div>
<style>
    dl {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Create 4 equal columns */
  grid-gap: 10px; /* Add some spacing between columns */
  background-color: #f5f5f5; /* Set a light background color */
  padding: 10px; /* Add some padding */
  border-radius: 5px; /* Add rounded corners */
}

/* Style the terms */
dt {
  font-weight: bold; /* Make the terms bold */
  color: #333; /* Set a dark color for terms */
  font: small-caps 12px/30px Arial, sans-serif;
}

/* Style the descriptions */
dd {
  color: #555; /* Set a slightly lighter color for descriptions */
  font: small-caps 12px/30px Arial, sans-serif;
}
</style>
<section>
    <h2>
        My Github Stats:
    </h2>

        {#await fetch("https://api.github.com/users/riley-oh6") }
        <p>Loading...</p>
        {:then response}
            {#await response.json()}
                <p>Decoding...</p>
            {:then data}
                
                <dl>
                    <dt>Public Repositories:</dt>
                    <dd>{data.public_repos}</dd>
    
                    <dt>Followers:</dt>
                    <dd>{data.followers}</dd>

                    <dt>Following:</dt>
                    <dd>{data.following}</dd>

                    <dt>Public Gists:</dt>
                    <dd>{data.public_gists}</dd>
                </dl>
            {:catch error}
                <p class="error">
                    Something went wrong: {error.message}
                </p>
            {/await}
        {:catch error}
            <p class="error">
                Something went wrong: {error.message}
            </p>
        {/await}

</section>
