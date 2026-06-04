
const skrivbord = window.matchMedia("(min-width: 769px)");

let aktivIndex = 0;
let galleriBilder = [];

function hamtaModal() {
  return document.getElementById("bild-modal");
}

function hamtaModalBild() {
  return document.querySelector(".bild-modal__bild");
}

function hamtaIndexTal() {
  return document.querySelector(".bild-modal__index-tal");
}

export function arBildModalSkrivbord() {
  return skrivbord.matches;
}

function uppdateraGalleriLista() {
  galleriBilder = [...document.querySelectorAll(".galleri-flode .galleri-bild img")];
}

function uppdateraRaknare() {
  const tal = hamtaIndexTal();
  if (!tal || galleriBilder.length === 0) return;
  tal.textContent = `${aktivIndex + 1} / ${galleriBilder.length}`;
}

function hamtaIndexForBild(img) {
  return galleriBilder.indexOf(img);
}

function visaBildPaIndex(index) {
  const modal = hamtaModal();
  const modalBild = hamtaModalBild();
  if (!modal || !modalBild || galleriBilder.length === 0) return;

  aktivIndex = ((index % galleriBilder.length) + galleriBilder.length) % galleriBilder.length;
  const img = galleriBilder[aktivIndex];
  modalBild.src = img.currentSrc || img.src;
  modalBild.alt = img.alt || "";
  uppdateraRaknare();
}

function visaNastaBild() {
  visaBildPaIndex(aktivIndex + 1);
}

function visaForegaendeBild() {
  visaBildPaIndex(aktivIndex - 1);
}

export function stangBildModal() {
  const modal = hamtaModal();
  const modalBild = hamtaModalBild();
  if (!modal?.open) return;
  modal.close();
  if (modalBild) {
    modalBild.removeAttribute("src");
    modalBild.alt = "";
  }
}

export function oppnaBildModal(img) {
  const modal = hamtaModal();
  const modalBild = hamtaModalBild();
  if (!arBildModalSkrivbord() || !modal || !modalBild || !img) return;

  uppdateraGalleriLista();
  const index = hamtaIndexForBild(img);
  if (index < 0) return;

  aktivIndex = index;
  modalBild.src = img.currentSrc || img.src;
  modalBild.alt = img.alt || "";
  uppdateraRaknare();
  if (!modal.open) {
    modal.showModal();
    queueMicrotask(slapFokus);
  }
}

export function oppnaBild(_mal, handelse) {
  if (!arBildModalSkrivbord()) return;
  const img = handelse.target.closest(".galleri-bild img");
  if (!img) return;
  handelse.preventDefault();
  oppnaBildModal(img);
}

function arKlickNastaBild(mal) {
  return Boolean(mal.closest(".bild-modal__yta, .bild-modal__bild"));
}

function hanteraModalKlick(handelse) {
  const modal = hamtaModal();
  if (!modal?.open) return;

  if (arKlickNastaBild(handelse.target)) {
    handelse.preventDefault();
    visaNastaBild();
    return;
  }

  if (handelse.target.closest(".bild-modal__index")) return;

  stangBildModal();
}

function slapFokus() {
  const aktiv = document.activeElement;
  if (aktiv instanceof HTMLElement) aktiv.blur();
}

function hanteraModalTangent(handelse) {
  const modal = hamtaModal();
  if (!modal?.open || !arBildModalSkrivbord()) return;

  if (handelse.key === "ArrowRight" || handelse.key === "ArrowDown") {
    handelse.preventDefault();
    visaNastaBild();
    return;
  }

  if (handelse.key === "ArrowLeft" || handelse.key === "ArrowUp") {
    handelse.preventDefault();
    visaForegaendeBild();
  }
}

export const bildAtgarder = {
  "bild/oppna": oppnaBild,
};

export function kopplaBildModal() {
  const modal = hamtaModal();
  if (!modal) return;

  modal.addEventListener("cancel", () => {
    stangBildModal();
  });

  modal.addEventListener("pointerup", hanteraModalPeaker);
  document.addEventListener("keydown", hanteraModalTangent);
}

function hanteraModalPeaker(handelse) {
  if (handelse.button !== 0) return;
  hanteraModalKlick(handelse);
}
