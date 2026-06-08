
import { fadeIn, fadeOut } from "./innehall-fade.js";
import { prosjekter } from "./prosjekter.js";

const mobil = window.matchMedia("(max-width: 768px)");

function arMobil() {
  return mobil.matches;
}

function hamtaNav() {
  return document.querySelector(".mobil-index");
}

function hamtaKnapp() {
  return document.querySelector(".mobil-index-knapp");
}

function hamtaOverlay() {
  return document.querySelector("#mobil-index-overlay");
}

function hamtaFlode() {
  return document.querySelector(".galleri-flode");
}

function hamtaGalleriZon() {
  return document.querySelector(".galleri-zon");
}

function arVerkIndexOppnad() {
  const nav = document.querySelector(".verk-index");
  return nav?.dataset.tillstand === "oppnad";
}

function arMobilIndexOppnad() {
  const nav = hamtaNav();
  return nav?.dataset.tillstand === "oppnad";
}

function arIndexOppnad() {
  return arMobil() ? arMobilIndexOppnad() : arVerkIndexOppnad();
}

function arMobilOverlayOppen() {
  if (!arMobil()) return false;
  const info = document.getElementById("sidfot-info");
  const indexOverlay = hamtaOverlay();
  const infoOppen = info?.dataset.tillstand === "oppnad";
  const indexOppen =
    arMobilIndexOppnad() || indexOverlay?.dataset.tillstand === "oppnad";
  return infoOppen || indexOppen;
}

export function rensaAktivProsjekt() {
  document.body.dataset.aktivProsjekt = "";
  synkaProsjektSynlighet("");
  document.querySelectorAll(".verk-lank").forEach((lank) => {
    lank.removeAttribute("aria-current");
  });
  markeraIndexVal("");
}

let galleriSynlig = false;

export function synkaGalleriZon() {
  const zon = hamtaGalleriZon();
  if (!zon) return;
  const aktivId = document.body.dataset.aktivProsjekt || "";
  const synlig = arMobil()
    ? !!aktivId && !arMobilOverlayOppen()
    : arVerkIndexOppnad() || !!aktivId;
  if (synlig === galleriSynlig) return;
  galleriSynlig = synlig;
  if (synlig) fadeIn(zon);
  else fadeOut(zon);
}

function synkaProsjektSynlighet(aktivId) {
  document.querySelectorAll(".galleri-prosjekt").forEach((sektion) => {
    if (!aktivId) {
      sektion.hidden = true;
      return;
    }
    sektion.hidden = sektion.dataset.prosjekt !== aktivId;
  });
}

function markeraIndexVal(aktivId) {
  document.querySelectorAll(".mobil-index__val").forEach((knapp) => {
    const vald = knapp.dataset.prosjekt === aktivId;
    knapp.setAttribute("aria-current", vald ? "true" : "false");
  });
}

export function valjProsjekt(id) {
  if (!id) return;
  document.body.dataset.aktivProsjekt = id;
  synkaProsjektSynlighet(id);
  markeraIndexVal(id);
  document.querySelectorAll(".verk-lank").forEach((lank) => {
    lank.setAttribute(
      "aria-current",
      lank.dataset.prosjekt === id ? "true" : "false"
    );
  });
  const flode = hamtaFlode();
  if (flode) flode.scrollTop = 0;
  synkaGalleriZon();
}

export function valjMobilProsjekt(id) {
  valjProsjekt(id);
}

function sattIndexOppnad(oppnad) {
  const nav = hamtaNav();
  const knapp = hamtaKnapp();
  const overlay = hamtaOverlay();
  if (!nav || !knapp || !overlay) return;

  if (oppnad) {
    nav.dataset.tillstand = "oppnad";
    knapp.setAttribute("aria-expanded", "true");
    overlay.dataset.tillstand = "oppnad";
    synkaGalleriZon();
    fadeIn(overlay);
    return;
  }

  nav.removeAttribute("data-tillstand");
  knapp.setAttribute("aria-expanded", "false");
  overlay.dataset.tillstand = "stangd";
  fadeOut(overlay);
}

function stangIndex(opts = {}) {
  const { behallProsjekt = false } = opts;
  if (!arMobilIndexOppnad()) return;
  sattIndexOppnad(false);
  if (!behallProsjekt) {
    rensaAktivProsjekt();
  }
  synkaGalleriZon();
}

function vaxlaIndex(_mal, handelse) {
  if (!arMobil()) return;
  handelse.preventDefault();
  const nav = hamtaNav();
  if (!nav) return;
  const oppnas = nav.dataset.tillstand !== "oppnad";
  if (oppnas) {
    document.dispatchEvent(new CustomEvent("sidfot-info/stang"));
    synkaGalleriZon();
    sattIndexOppnad(true);
    return;
  }
  stangIndex();
}

function valjFranIndex(_mal, handelse) {
  if (!arMobil()) return;
  handelse.preventDefault();
  const knapp = handelse.target.closest(".mobil-index__val");
  if (!knapp) return;
  valjMobilProsjekt(knapp.dataset.prosjekt);
  stangIndex({ behallProsjekt: true });
}

function hanteraUtanforIndex(handelse) {
  const nav = hamtaNav();
  if (!arMobil() || !nav || nav.dataset.tillstand !== "oppnad") return;
  if (handelse.target.closest(".mobil-index, .mobil-index-knapp")) return;
  stangIndex();
}

function synkaMobilLayout() {
  const nav = hamtaNav();
  const aktivId = document.body.dataset.aktivProsjekt || "";

  if (arMobil()) {
    if (nav) nav.hidden = false;
    synkaProsjektSynlighet(aktivId);
    if (aktivId) markeraIndexVal(aktivId);
    stangIndex();
    return;
  }

  if (nav) nav.hidden = true;
  stangIndex();
  synkaProsjektSynlighet(aktivId);
}

export function byggMobilIndex(lista) {
  if (!lista) return;
  lista.replaceChildren(
    ...prosjekter.map((prosjekt) => {
      const li = document.createElement("li");
      const knapp = document.createElement("button");
      knapp.type = "button";
      knapp.className = "mobil-index__val";
      knapp.dataset.atgard = "mobil-index/valj";
      knapp.dataset.prosjekt = prosjekt.id;
      knapp.textContent = prosjekt.titel;
      li.append(knapp);
      return li;
    })
  );
}

export const mobilIndexAtgarder = {
  "mobil-index/vaxla": vaxlaIndex,
  "mobil-index/valj": valjFranIndex,
};

export function kopplaMobilIndex() {
  document.addEventListener("pointerup", hanteraUtanforIndex);
  document.addEventListener("mobil-index/stang", (handelse) => {
    stangIndex({
      behallProsjekt: handelse.detail?.behallProsjekt ?? false,
    });
  });
  mobil.addEventListener("change", synkaMobilLayout);
  synkaMobilLayout();
  synkaGalleriZon();
}
