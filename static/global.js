function $$ (selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}
console.log("IT’S ALIVE!");
let pages = {
    "./": "Home",
    "/projects": "Projects",
    "/resume": "Resume",
    "/contact": "Contact",
};

let nav = document.createElement("nav");
document.body.prepend(nav);


for (let url in pages) {
	const ARE_WE_HOME = document.documentElement.classList.contains("home");
	console.log(ARE_WE_HOME);
    let title = pages[url];
    url = ARE_WE_HOME && !url.startsWith("http") ? url : "../" + url;
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("active");
    }

    if (a.host !== location.host) {
        a.target = "_blank";
    }

    nav.append(a);
}
document.body.insertAdjacentHTML("afterbegin", `
	<label class="color-scheme" style="position: absolute; top: 40px; right: 0;">
		Theme:
		<select id = "themeSelect">
			<option value="light dark">Automatic</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</label>`
);
document.addEventListener('DOMContentLoaded', function() {
    const storedColorScheme = localStorage.getItem('colorScheme');
    const body = document.body;

    if (storedColorScheme) {
        document.documentElement.style.setProperty("color-scheme", storedColorScheme);
        select.value = storedColorScheme;

        // Add or remove dark-mode class based on the stored color scheme
        body.classList.toggle('dark-mode', storedColorScheme === 'dark');
    }
});

const select = document.querySelector('#themeSelect');
select.addEventListener("input", function (event) {
    const colorScheme = event.target.value;
    document.documentElement.style.setProperty("color-scheme", colorScheme);

    // Add or remove dark-mode class based on the selected color scheme
    document.body.classList.toggle('dark-mode', colorScheme === 'dark');
    
    localStorage.setItem('colorScheme', colorScheme);
});




