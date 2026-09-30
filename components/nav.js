/* ===================================
   Nav — Trail de l'Estran
   Avec menu hamburger mobile
   =================================== */

function loadNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const page = document.body.dataset.page || "";

  nav.innerHTML = `
    <div class="nav-inner">
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
        <span class="hamburger"></span>
      </button>
      <ul>
        <li class="${page === "index" ? "nav-page-active" : ""}"><a href="./#header">Accueil</a></li>
        <li class="${page === "epreuves" ? "nav-page-active" : ""}"><a href="epreuves">Les épreuves</a></li>
        <li class="${page === "inscription" ? "nav-page-active" : ""}"><a href="inscription">Inscription</a></li>
        <li class="${page === "infos" ? "nav-page-active" : ""}"><a href="infos">Infos pratiques</a></li>
        <li class="${page === "archives" ? "nav-page-active" : ""}"><a href="archives">Archives</a></li>
        <li class="${page === "solidarite" ? "nav-page-active" : ""}"><a href="challenge">Le challenge de la solidarité</a></li>     
         </ul>
    </div>
  `;

  /* Toggle mobile menu */
  const toggle = nav.querySelector(".nav-toggle");
  const ul = nav.querySelector("ul");

  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open);
  });

  /* Fermer au clic sur un lien */
  ul.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", false);
    });
  });
}

document.addEventListener("DOMContentLoaded", loadNav);
