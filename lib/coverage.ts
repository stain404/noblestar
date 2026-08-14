/**
 * GCC coverage data.
 *
 * `directService` controls how a country is presented: `true` renders as an own-operation
 * market, `false` renders as "served via our partner agent network". Confirm each value
 * with operations before launch — overstating coverage is a commercial and legal risk.
 */

export type Country = {
  slug: string;
  name: string;
  code: string;
  flag: string;
  directService: boolean;
  summary: string;
  seaPorts: string[];
  airports: string[];
  landBorders: string[];
  customsNote: string;
};

export const countries: Country[] = [
  {
    slug: "uae",
    name: "United Arab Emirates",
    code: "AE",
    flag: "🇦🇪",
    directService: true,
    summary:
      "Our home market and regional hub. Own-operation coverage across all seven emirates, with in-house customs brokerage and a trained driver fleet for first- and last-mile collection.",
    seaPorts: ["Jebel Ali (Dubai)", "Khalifa Port (Abu Dhabi)", "Port Rashid", "Sharjah — Khor Fakkan", "Hamriyah"],
    airports: ["Dubai International (DXB)", "Al Maktoum (DWC)", "Abu Dhabi (AUH)", "Sharjah (SHJ)"],
    landBorders: ["Ghuwaifat (to Saudi Arabia)", "Hatta / Wajajah (to Oman)"],
    customsNote:
      "Registered with Dubai Customs and Abu Dhabi Customs. Free zone, mainland and transit clearances handled in-house, typically within 24–36 business hours of document receipt.",
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    code: "SA",
    flag: "🇸🇦",
    directService: true,
    summary:
      "The GCC's largest consumer market and our busiest cross-border road lane. Regular consolidated and full-truck departures from Dubai to Riyadh, Jeddah and Dammam.",
    seaPorts: ["Jeddah Islamic Port", "King Abdulaziz Port (Dammam)", "King Abdullah Port"],
    airports: ["Riyadh (RUH)", "Jeddah (JED)", "Dammam (DMM)"],
    landBorders: ["Al Batha", "Ghuwaifat / Al Ratqa"],
    customsNote:
      "SABER and SASO conformity certificates plus FASAH manifest filing are mandatory. We prepare documentation before departure so trucks are not held at the border.",
  },
  {
    slug: "oman",
    name: "Oman",
    code: "OM",
    flag: "🇴🇲",
    directService: true,
    summary:
      "Strong road connectivity from the UAE with same-day and next-day transit, plus direct sea calls at Sohar and Salalah for transhipment cargo.",
    seaPorts: ["Port of Sohar", "Port of Salalah", "Port Sultan Qaboos"],
    airports: ["Muscat (MCT)", "Salalah (SLL)"],
    landBorders: ["Hatta / Wajajah", "Khatmat Malaha", "Mezyad"],
    customsNote:
      "Bayan declarations filed through the Royal Oman Police customs system. GCC common-customs treatment applies to goods already cleared into the UAE.",
  },
  {
    slug: "qatar",
    name: "Qatar",
    code: "QA",
    flag: "🇶🇦",
    directService: true,
    summary:
      "Served by direct short-sea sailings from Jebel Ali to Hamad Port and by air, with road movements routed via Saudi Arabia where transit permits allow.",
    seaPorts: ["Hamad Port", "Doha Port"],
    airports: ["Hamad International (DOH)"],
    landBorders: ["Abu Samra (via Saudi Arabia)"],
    customsNote:
      "Al-Nadeeb electronic declarations. Certificate of origin attestation is commonly required — we arrange it as part of the file.",
  },
  {
    slug: "kuwait",
    name: "Kuwait",
    code: "KW",
    flag: "🇰🇼",
    directService: false,
    summary:
      "Served through our vetted partner agent network for customs clearance and delivery, with Noble Star retaining single-point control of the file end to end.",
    seaPorts: ["Shuwaikh Port", "Shuaiba Port", "Doha Port (Kuwait)"],
    airports: ["Kuwait International (KWI)"],
    landBorders: ["Nuwaiseeb (via Saudi Arabia)"],
    customsNote:
      "Import licence held by the consignee is required before arrival. We confirm licence validity at booking to avoid demurrage.",
  },
  {
    slug: "bahrain",
    name: "Bahrain",
    code: "BH",
    flag: "🇧🇭",
    directService: false,
    summary:
      "Served through our partner agent network, with road movements crossing the King Fahd Causeway from Saudi Arabia and sea cargo via Khalifa Bin Salman Port.",
    seaPorts: ["Khalifa Bin Salman Port", "Mina Salman"],
    airports: ["Bahrain International (BAH)"],
    landBorders: ["King Fahd Causeway (via Saudi Arabia)"],
    customsNote:
      "OFOQ single-window declarations. Goods already cleared into the GCC customs union may move on a statistical declaration.",
  },
];

export function getCountry(slug: string) {
  return countries.find((c) => c.slug === slug);
}
