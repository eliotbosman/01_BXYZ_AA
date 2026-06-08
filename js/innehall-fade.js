
const ANIME_URL = "https://esm.sh/animejs@4";
const FADE_IN_MS = 220;
const FADE_UT_MS = 180;

let animateFn = null;

function reduceradRorelse() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

async function hamtaAnimate() {
  if (animateFn) return animateFn;
  const mod = await import(ANIME_URL);
  animateFn = mod.animate ?? mod.default?.animate ?? mod.default;
  if (typeof animateFn !== "function") {
    throw new Error("anime.js animate saknas");
  }
  return animateFn;
}

function korAnimation(animate, mal, props) {
  const utfall = animate(mal, props);
  if (utfall?.finished) return utfall.finished;
  if (typeof utfall?.then === "function") return utfall;
  return Promise.resolve();
}

export async function fadeIn(mal) {
  if (!mal) return;
  if (reduceradRorelse()) {
    mal.hidden = false;
    mal.style.opacity = "";
    return;
  }
  const animate = await hamtaAnimate();
  mal.hidden = false;
  mal.style.opacity = "0";
  await korAnimation(animate, mal, {
    opacity: [0, 1],
    duration: FADE_IN_MS,
    ease: "out(2)",
  });
  mal.style.opacity = "";
}

export async function fadeOut(mal) {
  if (!mal) return;
  if (reduceradRorelse()) {
    mal.hidden = true;
    mal.style.opacity = "";
    return;
  }
  const animate = await hamtaAnimate();
  await korAnimation(animate, mal, {
    opacity: [1, 0],
    duration: FADE_UT_MS,
    ease: "in(2)",
  });
  mal.hidden = true;
  mal.style.opacity = "";
}

export async function fadeInGrupp(malLista) {
  const lista = malLista.filter(Boolean);
  if (lista.length === 0) return;
  if (reduceradRorelse()) {
    lista.forEach((mal) => {
      mal.hidden = false;
      mal.style.opacity = "";
    });
    return;
  }
  const animate = await hamtaAnimate();
  lista.forEach((mal) => {
    mal.hidden = false;
    mal.style.opacity = "0";
  });
  await korAnimation(animate, lista, {
    opacity: [0, 1],
    duration: FADE_IN_MS,
    delay: (_el, i) => i * 28,
    ease: "out(2)",
  });
  lista.forEach((mal) => {
    mal.style.opacity = "";
  });
}

export async function fadeOutGrupp(malLista) {
  const lista = malLista.filter(Boolean);
  if (lista.length === 0) return;
  if (reduceradRorelse()) {
    lista.forEach((mal) => {
      mal.hidden = true;
      mal.style.opacity = "";
    });
    return;
  }
  const animate = await hamtaAnimate();
  await korAnimation(animate, lista, {
    opacity: [1, 0],
    duration: FADE_UT_MS,
    ease: "in(2)",
  });
  lista.forEach((mal) => {
    mal.hidden = true;
    mal.style.opacity = "";
  });
}
