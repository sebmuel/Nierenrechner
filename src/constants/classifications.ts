import type {Classification} from "../types";

export const classifications: Array<Classification> = [
  {
    name: "Stadium G1",
    description:
      "Die Niere befindet sich in gutem Zustand mit einer noch normalen Nierenfunktion.",
    min: 89,
    max: Number.MAX_SAFE_INTEGER,
    symptoms: "keine",
    mark: "keine Maßnahmen erforderlich",
    measure:
      "Bei Transplantierten wird das Stadium um das Kennzeichen “T” erweitert.",
    text: "[eGFR ≥ 90 ml/min/1.73 m²]",
    grade: "Grad 1",
  },
  {
    name: "Stadium G2",
    description: "Die Niere hat eine milde Nierenfunktionseinschränkung.",
    min: 60,
      max: 89.99,
    symptoms: "uncharakteristische Symptome, eventuell Blutarmut",
    mark: "Es sollte frühzeitig damit begonnen werden, die chronische Nierenerkrankung in ihrem Verlauf zu verzögern. Start einer Therapie.",
    measure:
      "Bei Transplantierten wird das Stadium um das Kennzeichen “T” erweitert.",
    text: "[eGFR 60–89 ml/min/1.73 m²]",
    grade: "Grad 2",
  },
  {
    name: "Stadium G3a",
    description:
      "Es handelt sich bereits um eine mittelgradige Niereninsuffizienz, mild bis moderat eingeschränkt.",
    min: 45,
      max: 59.99,
    symptoms: "bereits Nebenwirkungen der Erkrankung, z. B. Bluthochdruck",
    mark: "Diagnose und Therapie der Grunderkrankung",
    measure:
      "Bei Transplantierten wird das Stadium um das Kennzeichen “T” erweitert.",
    text: "[eGFR 45–59 ml/min/1.73 m²]",
    grade: "Grad 3a",
  },
  {
    name: "Stadium G3b",
    description:
      "Es handelt sich bereits um eine mittelgradige Niereninsuffizienz, moderat bis hochgradig eingeschränkt.",
    min: 30,
      max: 44.99,
    symptoms: "bereits Nebenwirkungen der Erkrankung, z. B. Bluthochdruck",
    mark: "Diagnose und Therapie der Grunderkrankung",
    measure:
      "Bei Transplantierten wird das Stadium um das Kennzeichen “T” erweitert.",
    text: "[eGFR 30–44 ml/min/1.73 m²]",
    grade: "Grad 3b",
  },
  {
    name: "Stadium G4",
    description: "Es handelt sich um eine hochgradige Niereninsuffizienz.",
    min: 15,
      max: 29.99,
    symptoms:
      "deutliche Zeichen. Oftmals nimmt in diesem Stadium die Leistungsfähigkeit bereits erheblich ab.",
    mark: "Proyhylaxe und Therapie von Folgeerkrankungen und Herz-Kreislauf-Komplikationen. Es müssen Vorbereitungen zur Nierenersatztherapie getroffen werden.",
    measure:
      "Bei Transplantierten wird das Stadium um das Kennzeichen “T” erweitert.",
    text: "[eGFR 15–29 ml/min/1.73 m²]",
    grade: "Grad 4",
  },
  {
    name: "Stadium G5",
    description: "Es handelt sich um ein terminales Nierenversagen.",
    symptoms: "klinische Zeichen der Harnvergiftung",
    mark: "Eine Nierenersatztherapie wie Dialyse oder Transplantation ist notwendig und sollte zwischen 7 und 15 ml/min/1.73 m² abhängig von weiteren Parametern gestartet werden.",
    min: 0,
      max: 15.99,
    measure:
      "Bei Transplantierten wird das Stadium um das Kennzeichen “T”, bei Dialysepatienten um das Kennzeichen “D” erweitert.",
    text: "[eGFR < 15 ml/min/1.73 m²]",
    grade: "Grad 5",
  },
];
