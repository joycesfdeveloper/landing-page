/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

const navList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
const selected = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
const scrollTo = (e) => {
  e.preventDefault();
  const target = e.target.getAttribute("data-scroll-to");
  const element = document.querySelector(target);

  element.scrollIntoView({ behavior: "smooth" });
};
//check if the element is in view or not
function inViewport(sec) {
  let distance = sec.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.bottom <=
      (window.innerHeight + 400 || document.documentElement.clientHeight)
  );
}

const showBackToTop = () =>
  window.addEventListener("scroll", () =>
    scrollBtn.classList.toggle("backToTop--active", window.scrollY > 500)
  );

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

// Build the navigation bar
// Use https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment
function buildNav(sectionsArray) {
  //create document fragment
  let docListFrag = document.createDocumentFragment();
  // Add li elements to fragment
  sections.forEach((s) => {
    let li = document.createElement("li");
    li.innerHTML = `
			<a href="#${s.id}" class="menu__link" data-nav="${s.dataset.nav}">${s.dataset.nav}</a>
		`;
    docListFrag.appendChild(li);
  });
  // append the fragment to the navbar
  navList.appendChild(docListFrag);
}
// add active classes to the viewed section and it's corresponding navbar link

function showViewed() {
  // loop through sections
  sections.forEach((s) => {
    //select nav link corresponding
    let selectedNav = document.querySelector(`[data-nav="${s.dataset.nav}"]`);
    // check which section is active and show it
    if (inViewport(s)) {
      selectedNav.classList.add("selected");
      s.classList.add("your-active-class");
    } else {
      selectedNav.classList.remove("selected");
      s.classList.remove("your-active-class");
    }
  });
}

// scroll to the top of the page
function moveToTop() {
  document.documentElement.scrollTop = 0;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
buildNav(sections);
document.addEventListener("scroll", showViewed);

/**
 * End Main Functions
 *
 *
 */
