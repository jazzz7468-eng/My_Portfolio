const navLinks = [...document.querySelectorAll(".nav-links a")];
const contactToggle = document.querySelector(".contact-toggle");
const contactOptions = document.querySelector("#hero-contact-options");
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-30% 0px -55% 0px", threshold: [0.18, 0.4, 0.65] }
);

sections.forEach((section) => observer.observe(section));

if (contactToggle && contactOptions) {
  contactToggle.addEventListener("click", () => {
    const isOpen = contactToggle.getAttribute("aria-expanded") === "true";
    contactToggle.setAttribute("aria-expanded", String(!isOpen));
    contactOptions.hidden = isOpen;
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".contact-menu")) return;
    contactToggle.setAttribute("aria-expanded", "false");
    contactOptions.hidden = true;
  });
}
