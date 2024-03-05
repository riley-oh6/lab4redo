<article>
    <h2>{p.title}</h2>
    <img src={p.image} alt="">
    <p>{p.description}</p>
</article>
<script>
    export let info = {};
    export let hLevel = 2;
    let p = info;
</script>

<svelte:element this={"h" + hLevel}>{ p.title }</svelte:element>







