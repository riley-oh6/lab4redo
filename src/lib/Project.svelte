<article>
    <svelte:element this={"h" + hLevel}>{ p.title }</svelte:element>
    <!-- <h2>{p.title}</h2> -->
    <img src={p.image} alt="">
    <p>{p.description}</p>
    
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
</style>









