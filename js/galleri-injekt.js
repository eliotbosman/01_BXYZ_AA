
import { prosjekter, bildeUrl } from "./prosjekter.js";
import { kopplaBildModal } from "./bild-modal.js";
import { kopplaGalleriScroll } from "./galleri-scroll.js";
import { byggMobilIndex, kopplaMobilIndex } from "./mobil-index.js";
import { kopplaSidfotPanel } from "./sidfot-panel.js";
import { kopplaVerkIndex } from "./verk-index-panel.js";
import { verkIndexOrdning } from "./verk-index-layout.js";

function breddKlass(bredd) {
  if (!bredd || bredd === "full") return "galleri-bild--bredd-full";
  return `galleri-bild--bredd-${bredd}`;
}

function hojdKlass(hojd) {
  if (!hojd) return "";
  return `galleri-bild--hojd-${hojd}`;
}

const PORTAITT_INLINE_MAX_ASPEKT = 0.72;
const PORTAITT_INLINE_TVA_KOL_MIN = 0.48;

const desktopBildLayout = window.matchMedia("(min-width: 769px)");

function arDesktopBildLayout() {
  return desktopBildLayout.matches;
}

function uppdateraBildLane(fig, img) {
  const klasser = [
    "galleri-bild--lane-full",
    "galleri-bild--portratt-inline",
    "galleri-bild--portratt-span-2",
  ];
  fig.classList.remove(...klasser);

  if (!arDesktopBildLayout()) {
    fig.classList.add("galleri-bild--lane-full");
    return;
  }

  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (w < 1 || h < 1) {
    fig.classList.add("galleri-bild--lane-full");
    return;
  }

  const aspekt = w / h;
  if (aspekt >= 1 || aspekt >= PORTAITT_INLINE_MAX_ASPEKT) {
    fig.classList.add("galleri-bild--lane-full");
    return;
  }

  fig.classList.add("galleri-bild--portratt-inline");
  if (aspekt >= PORTAITT_INLINE_TVA_KOL_MIN) {
    fig.classList.add("galleri-bild--portratt-span-2");
  }
}

function kopplaBildLane(fig, img) {
  function mat() {
    uppdateraBildLane(fig, img);
  }

  mat();
  if (!img.complete) {
    img.addEventListener("load", mat, { once: true });
  }

  desktopBildLayout.addEventListener("change", mat);
}

function skapaBild(bilde) {
  const fig = document.createElement("figure");
  fig.className = [
    "galleri-bild",
    "galleri-bild--lane-full",
    breddKlass(bilde.bredd),
    hojdKlass(bilde.hojd),
  ]
    .filter(Boolean)
    .join(" ");

  const img = document.createElement("img");
  img.src = bildeUrl(bilde.sokvag);
  img.alt = bilde.alt;
  img.loading = bilde.loading ?? "lazy";
  img.decoding = "async";
  img.dataset.atgard = "bild/oppna";
  fig.append(img);
  kopplaBildLane(fig, img);
  return fig;
}

const LOREM_BROD =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

function skapaVerkInledning(prosjekt) {
  const block = document.createElement("div");
  block.className = "galleri-verk-inledning galleri-verk-inledning--kol-cd";
  block.dataset.kolumn = "kol-cd";

  const rubrik = document.createElement("h2");
  rubrik.className = "galleri-verk-inledning__rubrik";
  rubrik.textContent = prosjekt.titel;

  const brod = document.createElement("p");
  brod.className = "galleri-verk-inledning__brod";
  brod.textContent = LOREM_BROD;

  block.append(rubrik, brod);
  return block;
}

function skapaBildRad(bilder) {
  const rad = document.createElement("div");
  rad.className = "galleri-bild-rad";
  for (const bilde of bilder) {
    rad.append(skapaBild(bilde));
  }
  return rad;
}

function skapaProsjekt(prosjekt) {
  const sektion = document.createElement("section");
  sektion.id = `projekt-${prosjekt.id}`;
  sektion.className = "galleri-prosjekt";
  sektion.dataset.prosjekt = prosjekt.id;
  sektion.setAttribute("aria-label", prosjekt.titel);
  sektion.hidden = true;

  sektion.append(skapaVerkInledning(prosjekt));

  let i = 0;
  while (i < prosjekt.bilder.length) {
    const bilde = prosjekt.bilder[i];
    if (bilde.grupp) {
      const gruppId = bilde.grupp;
      const gruppBilder = [];
      while (i < prosjekt.bilder.length && prosjekt.bilder[i].grupp === gruppId) {
        gruppBilder.push(prosjekt.bilder[i]);
        i += 1;
      }
      sektion.append(skapaBildRad(gruppBilder));
      continue;
    }
    sektion.append(skapaBild(bilde));
    i += 1;
  }
  return sektion;
}

function skapaIndexLank(prosjekt, aktiv) {
  const li = document.createElement("li");
  const lank = document.createElement("a");
  lank.className = "verk-lank";
  lank.href = `#projekt-${prosjekt.id}`;
  lank.dataset.atgard = "prosjekt/scrolla";
  lank.dataset.prosjekt = prosjekt.id;
  lank.textContent = prosjekt.titel;
  if (aktiv) lank.setAttribute("aria-current", "true");
  li.append(lank);
  return li;
}

function byggGalleri(mal) {
  mal.replaceChildren(...prosjekter.map(skapaProsjekt));
}

function byggIndex(mal) {
  const ordning = verkIndexOrdning(prosjekter.length);
  mal.replaceChildren(
    ...ordning.map((i) => skapaIndexLank(prosjekter[i], false))
  );
}

function init() {
  const flode = document.querySelector(".galleri-flode");
  const lista = document.querySelector(".verk-index__lista");
  if (!flode || !lista) return;

  const mobilLista = document.getElementById("mobil-index-lista");

  byggGalleri(flode);
  byggIndex(lista);
  byggMobilIndex(mobilLista);
  kopplaGalleriScroll();
  kopplaBildModal();
  kopplaMobilIndex();
  kopplaVerkIndex();
  kopplaSidfotPanel();
}

init();
