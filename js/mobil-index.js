
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

function synkaProsjektSynlighet(aktivId) {
  document.querySelectorAll(".galleri-prosjekt").forEach((sektion) => {
    if (arMobil()) {
      sektion.hidden = sektion.dataset.prosjekt !== aktivId;
      return;
    }
    sektion.hidden = false;
  });
}

function markeraIndexVal(aktivId) {
  document.querySelectorAll(".mobil-index__val").forEach((knapp) => {
    const vald = knapp.dataset.prosjekt === aktivId;
    knapp.setAttribute("aria-current", vald ? "true" : "false");
  });
}

export function valjMobilProsjekt(id) {
  if (!id) return;
  document.body.dataset.aktivProsjekt = id;
  synkaProsjektSynlighet(id);
  markeraIndexVal(id);
  const flode = hamtaFlode();
  if (flode) flode.scrollTop = 0;
}

function sattIndexOppnad(oppnad) {
  const nav = hamtaNav();
  const knapp = hamtaKnapp();
  const lista = hamtaLista();
  if (!nav || !knapp || !lista) return;

  if (oppnad) {
    nav.dataset.tillstand = "oppnad";
    knapp.setAttribute("aria-expanded", "true");
    lista.removeAttribute("hidden");
    return;
  }

  nav.removeAttribute("data-tillstand");
  knapp.setAttribute("aria-expanded", "false");
  lista.setAttribute("hidden", "");
}

function stangIndex() {
  sattIndexOppnad(false);
}

function vaxlaIndex(_mal, handelse) {
  if (!arMobil()) return;
  handelse.preventDefault();
  const nav = hamtaNav();
  if (!nav) return;
  sattIndexOppnad(nav.dataset.tillstand !== "oppnad");
}

function valjFranIndex(_mal, handelse) {
  if (!arMobil()) return;
  handelse.preventDefault();
  const knapp = handelse.target.closest(".mobil-index__val");
  if (!knapp) return;
  valjMobilProsjekt(knapp.dataset.prosjekt);
  stangIndex();
}

function hanteraUtanforIndex(handelse) {
  const nav = hamtaNav();
  if (!arMobil() || !nav || nav.dataset.tillstand !== "oppnad") return;
  if (handelse.target.closest(".mobil-index")) return;
  stangIndex();
}

function synkaMobilLayout() {
  const nav = hamtaNav();
  const aktivId = document.body.dataset.aktivProsjekt || prosjekter[0]?.id || "01";

  if (arMobil()) {
    if (nav) nav.hidden = false;
    valjMobilProsjekt(aktivId);
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
  document.body.dataset.aktivProsjekt =
    document.body.dataset.aktivProsjekt || prosjekter[0]?.id || "01";

  document.addEventListener("pointerup", hanteraUtanforIndex);
  mobil.addEventListener("change", synkaMobilLayout);
  synkaMobilLayout();
}
