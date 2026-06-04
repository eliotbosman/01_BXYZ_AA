
function lasGridRader() {
  const rot = document.querySelector('[data-grid="001"]');
  if (!rot) return 30;
  const rader = Number.parseInt(
    getComputedStyle(rot).getPropertyValue("--grid-rows"),
    10
  );
  return Number.isFinite(rader) && rader > 0 ? rader : 30;
}

function beraknaVerkIndexRader(antal, rader = lasGridRader()) {
  const mitten = Math.round(rader / 2);
  const minRad = 2;
  const maxRad = rader;
  const raderOut = [];

  for (let i = 0; i < antal; i++) {
    let rad;
    if (i === 0) rad = mitten;
    else if (i % 2 === 1) rad = mitten - Math.ceil(i / 2);
    else rad = mitten + i / 2;
    raderOut.push(Math.min(maxRad, Math.max(minRad, rad)));
  }

  return raderOut;
}

export function verkIndexOrdning(antal, rader = lasGridRader()) {
  const raderPerIndex = beraknaVerkIndexRader(antal, rader);
  return raderPerIndex
    .map((rad, index) => ({ index, rad }))
    .sort((a, b) => a.rad - b.rad)
    .map(({ index }) => index);
}
