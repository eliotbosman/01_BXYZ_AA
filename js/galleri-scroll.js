
import { bildAtgarder } from "./bild-modal.js";
import { mobilIndexAtgarder } from "./mobil-index.js";
import { sidfotAtgarder } from "./sidfot-panel.js";
import { verkIndexAtgarder } from "./verk-index-panel.js";

const atgarder = {
  "prosjekt/scrolla": scrollaTillProjekt,
  ...bildAtgarder,
  ...mobilIndexAtgarder,
  ...verkIndexAtgarder,
  ...sidfotAtgarder,
};

function scrollaTillProjekt(mal, handelse) {
  handelse.preventDefault();
  const flode = document.querySelector(".galleri-flode");
  if (!flode || !mal) return;

  const rorelse = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

  const flodeYta = flode.getBoundingClientRect();
  const malYta = mal.getBoundingClientRect();
  const topp = flode.scrollTop + (malYta.top - flodeYta.top);

  flode.scrollTo({ top: topp, behavior: rorelse });

  document.querySelectorAll(".verk-lank").forEach((lank) => {
    lank.removeAttribute("aria-current");
  });
  const triggare = handelse.target.closest(".verk-lank");
  if (triggare) triggare.setAttribute("aria-current", "true");
}

function hanteraAtgarder(handelse) {
  const utlösare = handelse.target.closest("[data-atgard]");
  if (!utlösare) return;

  const nyckel = utlösare.dataset.atgard;
  const atgard = atgarder[nyckel];
  if (!atgard) return;

  const href = utlösare.getAttribute("href");
  const mal = href?.startsWith("#") ? document.getElementById(href.slice(1)) : null;
  atgard(mal, handelse);
}

export function kopplaGalleriScroll() {
  document.addEventListener("click", hanteraAtgarder);
}
