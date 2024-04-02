import { T as value_or_fallback, B as create_anchor, X as element, H as attr, K as escape, E as bind_props, F as pop, z as push } from "./index.js";
const projects = [
  {
    title: "Flashcard System",
    image: "https://vis-society.github.io/labs/2/images/empty.svg",
    year: "2024",
    description: "Built a flashcard system in my 6.102 Software Construction Class. Features included choosing flashcards to study, generating hints, and computing study progress."
  },
  {
    title: "RISC-V Processor",
    image: "https://vis-society.github.io/labs/2/images/empty.svg",
    year: "2023",
    description: "Built a functioning RISC-V processor in my 6.190 Computation Structures course. Built a decoder, ALU, processor, and more. Heavily optimized it to run neural networks for number classification."
  },
  {
    title: "LISP Processor",
    image: "https://vis-society.github.io/labs/2/images/empty.svg",
    year: "2022",
    description: "Built a functioning LISP processor in Python in my 6.101 fundamentals of programming course. Able to run full LISP programs, including N-D minesweeper, a sudoku solver, and more. Created REPL functionality so that it is usable in the command line."
  },
  {
    title: "Sudoku Solver",
    image: "https://vis-society.github.io/labs/2/images/empty.svg",
    year: "2022",
    description: "Constructed a python script that when given a sudoku puzzle, uses a recursive SAT-solver algorithm solve the puzzle. Utilized recursive backtracking to produce the solution."
  },
  {
    title: "N-Dimensional Minesweeper",
    image: "https://vis-society.github.io/labs/2/images/empty.svg",
    year: "2022",
    description: "Built a minesweeper game that could be played in N-dimensions. Created a normal minesweeper in 2-dimensions, then abstracted it to work in an arbitrary number of dimensions."
  },
  {
    title: "Bike Tracking Algorithm",
    image: "https://vis-society.github.io/labs/2/images/empty.svg",
    year: "2024",
    description: "Created an algorithm that takes an input video of a BMX freestyle run and chunked the video into sections, cutting out the downtime between tricks."
  },
  {
    title: "Platformer Game",
    year: "2022",
    image: "https://vis-society.github.io/labs/2/images/empty.svg",
    description: "built a 2D platformer games with several different characters, each with their own behavior and interactions. Aspects of the game included victory, death, and achievements."
  },
  {
    title: "Nesciunt quibusdam assumenda similique.",
    image: "https://vis-society.github.io/labs/2/images/empty.svg",
    year: "2021",
    description: "Architecto accusamus voluptas, explicabo repellat mollitia maxime, est eveniet consequatur assumenda unde laborum odit illo debitis et adipisci deserunt excepturi laudantium provident laboriosam maiores nihil fugiat ratione fuga delectus. Voluptatibus?"
  },
  {
    title: "Snake Game",
    image: "https://vis-society.github.io/labs/2/images/empty.svg",
    year: "2023",
    description: "built the classic snake game in C, then displayed the game on an LED board. Did it in my 6.190 Intro to C and Assembly course."
  },
  {
    title: "Surgical PPE",
    image: "https://vis-society.github.io/labs/2/images/empty.svg",
    year: "2020",
    description: "Created a new surgical PPE that prevented the spread of particulates during rhinoplasty surgeries. Used solidworks to create a CAD model adn 3D printed each part."
  },
  {
    title: "Image Processing",
    image: "https://vis-society.github.io/labs/2/images/empty.svg",
    year: "2022",
    description: "Applied various image processing techniques, such as seam carving, sobel filters, sepia filters, and more in my fundamentals of programming in Python class."
  },
  {
    title: "Machine Learning for Flood Prediction",
    image: "https://vis-society.github.io/labs/2/images/empty.svg",
    year: "2024",
    description: "Currently helping to create a multimodal machine learning model for flood prediction."
  }
];
function Project($$payload, $$props) {
  push(false);
  let info = value_or_fallback($$props["info"], {});
  let hLevel = value_or_fallback($$props["hLevel"], 2);
  const $$tag = "h" + hLevel;
  const anchor = create_anchor($$payload);
  $$payload.out += `<article>${anchor}`;
  if ($$tag)
    element($$payload, $$tag, () => {
    }, () => {
      $$payload.out += `${escape(info.title)}`;
    });
  $$payload.out += `${anchor} <img${attr("src", info.image, false)} alt=""> <div><p>${escape(info.description)}</p> <p class="year svelte-hdc9ut">c. ${escape(info.year)}</p></div></article>`;
  bind_props($$props, { info, hLevel });
  pop();
}
export {
  Project as P,
  projects as p
};
