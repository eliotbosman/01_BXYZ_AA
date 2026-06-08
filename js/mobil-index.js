
import { fadeIn, fadeInGrupp, fadeOut, fadeOutGrupp } from "./innehall-fade.js";
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

function hamtaLista() {
  return document.querySelector(".mobil-index__lista");
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

export function rensaAktivProsjekt() {
  document.body.dataset.aktivProsjekt = "";
  synkaProsjektSynlighet("");
  document.querySelectorAll(".verk-lank").forEach((lank) => {
    lank.removeAttribute("aria-current");
  });
  markeraIndexVal("");
}

let galleriSynlig = false;

function hamtaMobilIndexInnehall() {
  const nav = hamtaNav();
  if (!nav) return [];
  const bakgrund = nav.querySelector(".mobil-index__kol-bakgrund");
  const val = [...nav.querySelectorAll(".mobil-index__val")];
  return [bakgrund, ...val].filter(Boolean);
}

export function synkaGalleriZon() {
  const zon = hamtaGalleriZon();
  if (!zon) return;
  const aktivId = document.body.dataset.aktivProsjekt || "";
  const synlig = arIndexOppnad() || !!aktivId;
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
  const lista = hamtaLista();
  if (!nav || !knapp || !lista) return;

  const innehall = hamtaMobilIndexInnehall();

  if (oppnad) {
    nav.dataset.tillstand = "oppnad";
    knapp.setAttribute("aria-expanded", "true");
    lista.removeAttribute("hidden");
    fadeInGrupp(innehall);
    return;
  }

  fadeOutGrupp(innehall).then(() => {
    nav.removeAttribute("data-tillstand");
    knapp.setAttribute("aria-expanded", "false");
    lista.setAttribute("hidden", "");
  });
}

function stangIndex(opts = {}) {
  const { behallProsjekt = false } = opts;
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
    sattIndexOppnad(true);
    synkaGalleriZon();
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
  if (handelse.target.closest(".mobil-index")) return;
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

function synkaMobilIndexMatt() {
  const rot = document.querySelector('[data-grid="001"]');
  if (!rot) return;
  const antal = prosjekter.length;
  rot.style.setProperty("--mobil-index-antal", String(antal));
  rot.style.setProperty("--mobil-index-rad-start", "2");
  rot.style.setProperty("--mobil-index-rad-slut", String(antal + 2));
}

export function byggMobilIndex(lista) {
  if (!lista) return;
  lista.replaceChildren(
    ...prosjekter.map((prosjekt, i) => {
      const li = document.createElement("li");
      const knapp = document.createElement("button");
      const rad = i + 2;
      knapp.type = "button";
      knapp.className = "mobil-index__val";
      knapp.dataset.atgard = "mobil-index/valj";
      knapp.dataset.prosjekt = prosjekt.id;
      knapp.style.setProperty("--mobil-index-rad", String(rad));
      knapp.textContent = prosjekt.titel;
      li.append(knapp);
      return li;
    })
  );
  lista.setAttribute("hidden", "");
  synkaMobilIndexMatt();
}

export const mobilIndexAtgarder = {
  "mobil-index/vaxla": vaxlaIndex,
  "mobil-index/valj": valjFranIndex,
};

export function kopplaMobilIndex() {
  document.addEventListener("pointerup", hanteraUtanforIndex);
  mobil.addEventListener("change", synkaMobilLayout);
  synkaMobilLayout();
  synkaGalleriZon();
}
