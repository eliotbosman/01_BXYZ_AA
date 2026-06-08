
const bildRot = "assets/img";
const bildRotBilder = "assets/bilder";

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
      {
        sokvag: `${bildRotBilder}/4_these words are to be read aloud /1.jpg`,
        alt: "Offset prints from These Words Are to Be Read Aloud.",
        bredd: "full",
      },
      {
        sokvag: `${bildRotBilder}/4_these words are to be read aloud /2.jpg`,
        alt: "Performance accompanying the installation.",
        bredd: "full",
      },
    ],
  },
  {
    id: "02",
    titel: "Loud Cows Choir",
    bilder: [
      {
        sokvag: "loud-cows-choir-1.jpg",
        alt: "Performers reading aloud during Loud Cows Choir.",
        bredd: "full",
      },
      {
        sokvag: `${bildRotBilder}/2_loud cows choir /loud_cows_choir copie.jpg`,
        alt: "Loud Cows Choir performance.",
        bredd: "full",
      },
    ],
  },
  {
    id: "03",
    titel: "Open Day",
    bilder: [
      {
        sokvag: "open-day-1.jpg",
        alt: "Open Day campaign poster, handwritten with the big pencil.",
        bredd: "full",
      },
      {
        sokvag: "open-day-2.jpg",
        alt: "Collaborative big pencil in use for Open Day.",
        bredd: "full",
      },
      {
        sokvag: `${bildRotBilder}/3_Open Day/1.jpg`,
        alt: "Open Day campaign materials across the academy.",
        bredd: "full",
      },
      {
        sokvag: `${bildRotBilder}/3_Open Day/2.jpg`,
        alt: "Open Day campaign installation view.",
        bredd: "full",
      },
    ],
  },
  {
    id: "04",
    titel: "One More Time",
    bilder: [
      {
        sokvag: "one-more-time-1.jpg",
        alt: "Temporary cinema in the Rietveld Pavilion.",
        bredd: "full",
      },
      {
        sokvag: "one-more-time-2.jpg",
        alt: "Screening at One More Time cinema.",
        bredd: "full",
      },
      {
        sokvag: `${bildRotBilder}/5_one more time/1.JPG`,
        alt: "One More Time — cinema in the Rietveld Pavilion.",
        bredd: "full",
      },
      {
        sokvag: `${bildRotBilder}/5_one more time/2.JPG`,
        alt: "One More Time — screening evening.",
        bredd: "full",
      },
    ],
  },
  {
    id: "05",
    titel: "Deep Spring Karaoke",
    bilder: [
      {
        sokvag: "karaoke-1.jpg",
        alt: "Deep Spring Karaoke Bar flyer, front.",
        bredd: "full",
        grupp: "flyer",
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
      {
        sokvag: `${bildRotBilder}/6_deep spring karaoke bar /2.jpg`,
        alt: "Deep Spring Karaoke Bar — installation view.",
        bredd: "full",
      },
      {
        sokvag: `${bildRotBilder}/6_deep spring karaoke bar /3.jpg`,
        alt: "Deep Spring Karaoke Bar — performance evening.",
        bredd: "full",
      },
    ],
  },
  {
    id: "06",
    titel: "Printed Matter",
    bilder: [
      {
        sokvag: "hero.jpg",
        alt: "Printed Matter — selected publication spread.",
        bredd: "full",
        loading: "eager",
      },
      {
        sokvag: `${bildRotBilder}/1_homepage_picture/scan-1.jpg`,
        alt: "Printed Matter — scan.",
        bredd: "full",
      },
    ],
  },
];
