
const PANEL = {
  info: {
    knappSel: ".sidfot-lank--info",
    panelSel: "#sidfot-info",
    atgard: "sidfot/vaxla-info",
  },
  kontakt: {
    knappSel: ".sidfot-lank--kontakt",
    panelSel: "#sidfot-kontakt",
    atgard: "sidfot/vaxla-kontakt",
  },
};

function panel(nyckel) {
  return document.querySelector(PANEL[nyckel].panelSel);
}

function knapp(nyckel) {
  return document.querySelector(PANEL[nyckel].knappSel);
}

function arOppnad(nyckel) {
  const el = panel(nyckel);
  return el && !el.hidden && el.dataset.tillstand === "oppnad";
}

function stang(nyckel) {
  const el = panel(nyckel);
  const btn = knapp(nyckel);
  if (!el || !btn) return;
  el.hidden = true;
  el.dataset.tillstand = "stangd";
  btn.dataset.tillstand = "";
  btn.setAttribute("aria-expanded", "false");
}

function oppna(nyckel) {
  const el = panel(nyckel);
  const btn = knapp(nyckel);
  if (!el || !btn) return;
  el.hidden = false;
  el.dataset.tillstand = "oppnad";
  btn.dataset.tillstand = "oppnad";
  btn.setAttribute("aria-expanded", "true");
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

function vaxlaKontakt(_mal, handelse) {
  handelse.preventDefault();
  vaxla("kontakt");
}

function vidKlickUtanfor(handelse) {
  if (
    handelse.target.closest(
      ".sidfot-panel, .sidfot-lank--info, .sidfot-lank--kontakt, .verk-index"
    )
  ) {
    return;
  }
  stang("kontakt");
}

function vidTangent(handelse) {
  if (handelse.key !== "Escape") return;
  stang("kontakt");
}

export const sidfotAtgarder = {
  "sidfot/vaxla-info": vaxlaInfo,
  "sidfot/vaxla-kontakt": vaxlaKontakt,
};

export function kopplaSidfotPanel() {
  oppna("info");
  document.addEventListener("keydown", vidTangent);
  document.addEventListener("click", vidKlickUtanfor);
}
