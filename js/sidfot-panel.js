
import { fadeIn, fadeOut } from "./innehall-fade.js";

const PANEL = {
  info: {
    knappSel: ".sidfot-lank--info, .sidfot-lank--namn",
    panelSel: "#sidfot-info",
    atgard: "sidfot/vaxla-info",
  },
};

function panel(nyckel) {
  return document.querySelector(PANEL[nyckel].panelSel);
}

function knappar(nyckel) {
  return document.querySelectorAll(PANEL[nyckel].knappSel);
}

function arOppnad(nyckel) {
  const el = panel(nyckel);
  return el && !el.hidden && el.dataset.tillstand === "oppnad";
}

function stang(nyckel) {
  const el = panel(nyckel);
  const knappLista = knappar(nyckel);
  if (!el || knappLista.length === 0) return;
  knappLista.forEach((btn) => {
    btn.dataset.tillstand = "";
    btn.setAttribute("aria-expanded", "false");
  });
  fadeOut(el).then(() => {
    el.dataset.tillstand = "stangd";
  });
}

function oppna(nyckel) {
  const el = panel(nyckel);
  const knappLista = knappar(nyckel);
  if (!el || knappLista.length === 0) return;
  el.dataset.tillstand = "oppnad";
  knappLista.forEach((btn) => {
    btn.dataset.tillstand = "oppnad";
    btn.setAttribute("aria-expanded", "true");
  });
  fadeIn(el);
}

function vaxla(nyckel) {
  if (arOppnad(nyckel)) {
    stang(nyckel);
    return;
  }
  oppna(nyckel);
}

function vaxlaInfo(_mal, handelse) {
  handelse.preventDefault();
  vaxla("info");
}

function vidKlickUtanfor(handelse) {
  if (
    handelse.target.closest(
      ".sidfot-panel, .sidfot-lank--namn, .sidfot-lank--info, .verk-index, .mobil-index"
    )
  ) {
    return;
  }
  stang("info");
}

function vidTangent(handelse) {
  if (handelse.key !== "Escape") return;
  stang("info");
}

export const sidfotAtgarder = {
  "sidfot/vaxla-info": vaxlaInfo,
};

export function kopplaSidfotPanel() {
  document.addEventListener("keydown", vidTangent);
  document.addEventListener("click", vidKlickUtanfor);
}
