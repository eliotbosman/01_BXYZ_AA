
const desktop = window.matchMedia("(min-width: 769px)");

function arDesktop() {
  return desktop.matches;
}

function hamtaNav() {
  return document.querySelector(".verk-index");
}

function hamtaKnapp() {
  return document.querySelector(".verk-index__rubrik");
}

function hamtaLankar() {
  return document.querySelector(".verk-index__lankar");
}

function sattVerkIndexOppnad(oppnad) {
  const nav = hamtaNav();
  const knapp = hamtaKnapp();
  const lankar = hamtaLankar();
  if (!nav || !knapp || !lankar) return;

  if (oppnad) {
    nav.dataset.tillstand = "oppnad";
    knapp.dataset.tillstand = "oppnad";
    knapp.setAttribute("aria-expanded", "true");
    lankar.hidden = false;
    return;
  }

  nav.dataset.tillstand = "stangd";
  knapp.dataset.tillstand = "";
  knapp.setAttribute("aria-expanded", "false");
  lankar.hidden = true;
}

function vaxlaVerkIndex(_mal, handelse) {
  if (!arDesktop()) return;
  handelse.preventDefault();
  const nav = hamtaNav();
  if (!nav) return;
  sattVerkIndexOppnad(nav.dataset.tillstand !== "oppnad");
}

function synkaVerkIndexLayout() {
  if (!arDesktop()) return;
}

export const verkIndexAtgarder = {
  "verk-index/vaxla": vaxlaVerkIndex,
};

export function kopplaVerkIndex() {
  if (arDesktop()) sattVerkIndexOppnad(false);
  desktop.addEventListener("change", synkaVerkIndexLayout);
}
