
<article>
    <svelte:element this={"h" + hLevel}>{ info.title }</svelte:element>
    <img src={info.image} alt="">
    <div>
        <p>{info.description}</p>
        <p class="year">c. {info.year}</p>
        {#if info.url}
            <a href=https://{info.url} target="_blank">Visit Project</a>
        {/if}
    </div>
    
    
</article>
<script>
    export let info = {};
    export let hLevel = 2;
    let p = info;
</script>
<style>
    .projects {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
        }
        .projects article {
            display: grid;
            grid-template-rows: subgrid; /* Use subgrid for horizontal alignment */
            grid-row: span 3;
            margin: 0;
        }

        /* Ensure each article spans three rows */
        .projects article h2 {
            margin: 0;
            
        }   
    .year {
        font-style: italic; /* Example style */
    }
</style>










