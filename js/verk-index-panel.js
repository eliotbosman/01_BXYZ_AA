import { fadeIn, fadeOut } from "./innehall-fade.js";
import { rensaAktivProsjekt, synkaGalleriZon } from "./mobil-index.js";

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
    fadeIn(lankar);
    synkaGalleriZon();
    return;
  }

  nav.dataset.tillstand = "stangd";
  knapp.dataset.tillstand = "";
  knapp.setAttribute("aria-expanded", "false");
  fadeOut(lankar).then(() => {
    rensaAktivProsjekt();
    synkaGalleriZon();
  });
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
  synkaGalleriZon();
}
