<script>
    import { page } from '$app/stores';
    
    let pages = [
        { url: "./", title: "Home" },
        { url: "./projects", title: "Projects" },
        { url: "./resume", title: "Resume" },
        { url: "./contact", title: "Contact" },
        { url: "https://github.com/YourGitHubUsername", title: "GitHub", external: true },
    ];
    
    let root = globalThis?.document?.documentElement;

    let localStorage = globalThis.localStorage ?? {};
    console.log(localStorage);
    let colorScheme = localStorage.colorScheme ?? 'light dark';
    $: localStorage.colorScheme = colorScheme;
    $: root?.style.setProperty("color-scheme", colorScheme);

    
</script>

<nav>
    {#each pages as p }
        <a href={ p.url } target={ p.url.startsWith("http") ? "_blank" : null } class:active={ "." + $page.route.id === p.url }>
            { p.title }
        </a>
    {/each}
</nav> 



<slot />
<style>
    nav {
        display: flex;
        margin-bottom: 3ch;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: oklch(80% 3% 200);
    }

    nav a {
        flex: 1;
        text-decoration: none;
        color: inherit;
        text-align: center;
        padding: 0.5em;
    }

    nav a.active {
        border-bottom: 0.4em solid oklch(80% 3% 200);
        padding-bottom: 0em;
    }

    nav a:hover {
    border-bottom: 0.4em solid var(--color-accent); 
    padding-bottom: 0em;
    }

    label {
        position: absolute;
        top: 40px;
        right: 0;
    }
</style>

<label class="color-scheme">
    Theme:
    <select bind:value={colorScheme} id="themeSelect">
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
    </select>
</label>

