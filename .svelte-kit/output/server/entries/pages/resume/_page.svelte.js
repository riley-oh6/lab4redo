import { P as head, F as pop, z as push } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push(false);
  head($$payload, ($$payload2) => {
    $$payload2.title = "<title>";
    $$payload2.title += `Resume</title>`;
  });
  $$payload.out += `<article><h1>Riley Oh's Resume</h1> <section><h2>Education</h2> <article><p><strong>Massachusetts Institute of Technology</strong> - Computer Science and Engineering</p> <p><strong>Graduation Date:</strong> <time>May 2025</time></p> <p><strong>Relevant Coursework:</strong> Fundamentals of Programming in Python, Design and Analysis of Algorithms, Computation Structures, Software Construction, Optimization Methods in Business Analytics</p></article></section> <section><h2>Experience</h2> <article><h3>Undergraduate Researcher - MIT Sloan School of Management</h3> <time>January 2024 - Present</time> <p>Cambridge, MA</p> <ul><li>Partnering with the MIT Operations Research Center and Sloan School of Management to help create a multimodal machine learning model to predict natural disasters</li> <li>Utilized the Google Earth Engine to respond to queries of latitude, longitude, and date, outputting images depicting temperature, topographic, and climate data at that location</li> <li>Performing transfer learning from model trained on textual data to complete multimodal approach</li></ul> <p>Tools: Python, EarthEngine, Machine Learning</p></article> <article><h3>Backend Developer Intern - The Aerospace Corporation</h3> <time>May 2023 - August 2023</time> <p>El Segundo, CA</p> <ul><li>Developed automated service to scrape data from Modeling and Simulation Confluence and Bitbucket pages, storing page information in MongoDB</li> <li>Created API function for a space architecture modeling tool to programmatically retrieve modified files from different git branches and move the files to a running Docker container</li></ul> <p>Tools: Python, Flask, Kubernetes, Docker, MongoDB, Git</p></article> <article><h3>Summer Research Intern - MIT Lincoln Laboratory</h3> <time>May 2022 - August 2022</time> <p>Lexington, MA</p> <ul><li>Created Python script to interpolate geolocated temperature data to generate a pseudocolor plot on a world map, using Naval Research Laboratory colormap and colorbar to best visualize data.</li></ul> <p>Tools: Python (NumPy, Pandas, NetCDF), MATLAB, Git, TortoiseSVN</p></article></section> <section><h2>Personal</h2> <article><p><strong>Programming Languages:</strong> Python, TypeScript, HTML, JavaScript, C</p> <p><strong>Other Skills:</strong> Git, REST APIs</p> <p><strong>Interests:</strong> Soccer, Baseball, Star Wars, Game of Thrones, Formula 1</p></article></section></article>`;
  pop();
}
export {
  _page as default
};
