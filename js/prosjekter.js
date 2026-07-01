
const bildRot = "assets/img";

export function bildeUrl(sokvag) {
  const hel =
    sokvag.startsWith("assets/") || sokvag.startsWith("../")
      ? sokvag
      : `${bildRot}/${sokvag}`;
  return hel.split("/").map((del) => encodeURIComponent(del)).join("/");
}

export const prosjekter = [
  {
    id: "01",
    titel: "These Words Are to Be Read Aloud",
    beskrivning:
      "These Words Are to Be Read Aloud is an installation consisting of 3000 offset prints which visitors were invited to read aloud and take with them. The installation was accompanied by a performance, both shown at the Stedelijk Museum, Amsterdam, in March 2026. This work was made in collaboration with the visual artist and performer Maren Weertman.",
    bilder: [
      {
        sokvag: "read-aloud-1.jpg",
        alt: "3000 offset prints installed at the Stedelijk Museum.",
        bredd: "full",
        loading: "eager",
      },
      {
        sokvag: "read-aloud-2.jpg",
        alt: "Visitors reading prints aloud at the Stedelijk Museum.",
        bredd: "full",
      },
    ],
  },
  {
    id: "02",
    titel: "Loud Cows Choir",
    beskrivning:
      "Loud Cows Choir is a series of reading of Ursula K. Le Gouin's text about female voice, made with Ivo Blackwood. 2024",
    bilder: [
      {
        sokvag: "loud-cows-choir-1.jpg",
        alt: "Performers reading aloud during Loud Cows Choir.",
        bredd: "full",
        loading: "eager",
      },
    ],
  },
  {
    id: "03",
    titel: "Open Day",
    beskrivning:
      "Campaign for the Gerrit Rietveld Academie's and the Sandberg Instituut's open day. Designed together with Ivo Blackwood, Velko Kalchev, and Manu-Sophie Linder in 2026. The big pencil was used as a collaborative writing tool throughout the campaign to invite students and staff of both institutions to handwrite the campaign. Made with Velko Kalchev, 2024.",
    bilder: [
      {
        sokvag: "open-day-1.jpg",
        alt: "Open Day campaign poster, handwritten with the big pencil.",
        bredd: "full",
        loading: "eager",
      },
      {
        sokvag: "open-day-2.jpg",
        alt: "Collaborative big pencil in use for Open Day.",
        bredd: "full",
      },
    ],
  },
  {
    id: "04",
    titel: "One More Time",
    beskrivning:
      "One More Time was a temporary cinema holding place in the Rietveld Pavilion on the 7, 8, 9, 10 and 11 April 2025. Designed and organised together with Ivo Blackwood and Chloé Gourvennec.",
    bilder: [
      {
        sokvag: "one-more-time-1.jpg",
        alt: "Temporary cinema in the Rietveld Pavilion.",
        bredd: "full",
        loading: "eager",
      },
      {
        sokvag: "one-more-time-2.jpg",
        alt: "Screening at One More Time cinema.",
        bredd: "full",
      },
    ],
  },
  {
    id: "05",
    titel: "Deep Spring Karaoke",
    beskrivning:
      "Deep Spring Karaoke happened on November 23 2025 at Maison Félix Salut in Amsterdam. Designed and organised together with Ivo Blackwood, Malva Askerup and Jaehyun Kim.",
    bilder: [
      {
        sokvag: "karaoke-1.jpg",
        alt: "Deep Spring Karaoke Bar flyer, front.",
        bredd: "full",
        grupp: "flyer",
        loading: "eager",
      },
      {
        sokvag: "karaoke-2.jpg",
        alt: "Deep Spring Karaoke Bar flyer, back.",
        bredd: "full",
        grupp: "flyer",
      },
      {
        sokvag: "karaoke-3.jpg",
        alt: "Deep Spring Karaoke event.",
        bredd: "full",
      },
    ],
  },
  {
    id: "06",
    titel: "Printed Matter",
    beskrivning:
      "An ongoing exploration of printed matter — publications, spreads, and material experiments across graphic design practice.",
    bilder: [
      {
        sokvag: "hero.jpg",
        alt: "Printed Matter — selected publication spread.",
        bredd: "full",
        loading: "eager",
      },
    ],
  },
];
