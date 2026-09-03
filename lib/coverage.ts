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
  /**
   * The name as it reads mid-sentence, article included — "the UAE" rather
   * than "United Arab Emirates". Page titles are built from this because the
   * full legal name pushes a title past the ~60 characters Google will show.
   */
  shortName: string;
  code: string;
  flag: string;
  directService: boolean;
  summary: string;
  seaPorts: string[];
  airports: string[];
  landBorders: string[];
  customsNote: string;
  /**
   * Meta description for this country's own page, written to 140–155
   * characters so a search result uses the whole snippet rather than
   * truncating it. Each one names the real gateways and the real declaration
   * system, because those are the terms an importer actually searches for.
   */
  metaDescription: string;
};

export const countries: Country[] = [
  {
    slug: "uae",
    name: "United Arab Emirates",
    shortName: "the UAE",
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
    metaDescription:
      "Freight forwarding and in-house customs clearance across all seven emirates, through Jebel Ali, Khalifa Port, DXB and DWC. Cleared in 24-36 hours.",
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    shortName: "Saudi Arabia",
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
    metaDescription:
      "Sea, air and road freight into Saudi Arabia with SABER and SASO conformity and FASAH filing prepared before departure, so trucks are not held.",
  },
  {
    slug: "oman",
    name: "Oman",
    shortName: "Oman",
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
    metaDescription:
      "Freight and customs clearance into Oman via Sohar, Salalah and Port Sultan Qaboos, with Bayan declarations and next-day road transit from the UAE.",
  },
  {
    slug: "qatar",
    name: "Qatar",
    shortName: "Qatar",
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
    metaDescription:
      "Freight into Qatar through Hamad Port and Doha, with Al-Nadeeb declarations and certificate of origin attestation arranged as part of your file.",
  },
  {
    slug: "kuwait",
    name: "Kuwait",
    shortName: "Kuwait",
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
    metaDescription:
      "Freight and customs clearance into Kuwait through our vetted partner network, via Shuwaikh and Shuaiba, with import licence checked at booking.",
  },
  {
    slug: "bahrain",
    name: "Bahrain",
    shortName: "Bahrain",
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
    metaDescription:
      "Freight into Bahrain via Khalifa Bin Salman Port and the King Fahd Causeway, with OFOQ single-window declarations handled through our partners.",
  },
];

export function getCountry(slug: string) {
  return countries.find((c) => c.slug === slug);
}
