/* ==========================================================================
   LIHINI SEAFOODS — CONTENT DATA
   --------------------------------------------------------------------------
   Everything in here is PLACEHOLDER content. Replace names, text and images
   whenever you are ready; the Fish Library, Dives range and Certifications
   pages are built automatically from these lists.

   To add a real photo to any item, add  image: "assets/img/fish/yellowfin.jpg"
   (any path inside the repo). Without an image the card shows an illustration.
   To add a new item, copy one line and change it. To remove one, delete the line.
   ========================================================================== */

/* ---------- FISH LIBRARY ----------
   cat:   tuna | reef | small | crustacean | cephalopod | dried
   shape: tuna | deep | long | prawn | crab | squid | shell | dried | flat
   forms: what it is sold as (free text list)
   Optional fields: local (Sinhala/Tamil name), season, origin, desc, cooking, image */
window.FISH_CATEGORIES = [
  { id: "tuna",        label: "Tuna & open sea" },
  { id: "reef",        label: "Reef & coastal" },
  { id: "small",       label: "Small fish" },
  { id: "crustacean",  label: "Prawns, crab & lobster" },
  { id: "cephalopod",  label: "Squid & cuttlefish" },
  { id: "dried",       label: "Dried & cured" }
];

window.FISH = [
  /* Tuna & open sea */
  { name: "Yellowfin Tuna",  cat: "tuna", shape: "tuna", forms: ["Whole", "Loins", "Steaks", "Frozen"] },
  { name: "Skipjack Tuna",   cat: "tuna", shape: "tuna", forms: ["Whole", "Steaks", "Frozen"] },
  { name: "Bigeye Tuna",     cat: "tuna", shape: "tuna", forms: ["Whole", "Loins", "Frozen"] },
  { name: "Frigate Tuna",    cat: "tuna", shape: "tuna", forms: ["Whole", "Steaks"] },
  { name: "Seer Fish",       cat: "tuna", shape: "long", forms: ["Whole", "Steaks", "Fillets"] },
  { name: "Swordfish",       cat: "tuna", shape: "long", forms: ["Steaks", "Loins", "Frozen"] },
  { name: "Mahi-Mahi",       cat: "tuna", shape: "deep", forms: ["Whole", "Fillets", "Frozen"] },

  /* Reef & coastal */
  { name: "Red Snapper",     cat: "reef", shape: "deep", forms: ["Whole", "Gutted", "Fillets"] },
  { name: "Grouper",         cat: "reef", shape: "deep", forms: ["Whole", "Steaks", "Fillets"] },
  { name: "Barramundi",      cat: "reef", shape: "deep", forms: ["Whole", "Fillets"] },
  { name: "Giant Trevally",  cat: "reef", shape: "deep", forms: ["Whole", "Steaks"] },
  { name: "Silver Pomfret",  cat: "reef", shape: "flat", forms: ["Whole", "Gutted"] },
  { name: "Grey Mullet",     cat: "reef", shape: "tuna", forms: ["Whole", "Gutted"] },
  { name: "Barracuda",       cat: "reef", shape: "long", forms: ["Whole", "Steaks"] },
  { name: "Threadfin Bream", cat: "reef", shape: "deep", forms: ["Whole", "Gutted"] },

  /* Small fish */
  { name: "Sardine",         cat: "small", shape: "tuna", forms: ["Whole", "Frozen"] },
  { name: "Indian Mackerel", cat: "small", shape: "tuna", forms: ["Whole", "Frozen"] },
  { name: "Anchovy",         cat: "small", shape: "tuna", forms: ["Whole", "Frozen"] },
  { name: "Ribbonfish",      cat: "small", shape: "long", forms: ["Whole", "Cut pieces"] },
  { name: "Sprats",          cat: "small", shape: "tuna", forms: ["Whole", "Frozen"] },

  /* Prawns, crab & lobster */
  { name: "Tiger Prawns",    cat: "crustacean", shape: "prawn", forms: ["Whole", "Headless", "Peeled", "Frozen"] },
  { name: "White Prawns",    cat: "crustacean", shape: "prawn", forms: ["Whole", "Peeled", "Frozen"] },
  { name: "Spiny Lobster",   cat: "crustacean", shape: "prawn", forms: ["Live", "Whole", "Frozen"] },
  { name: "Mud Crab",        cat: "crustacean", shape: "crab",  forms: ["Live", "Whole", "Frozen"] },
  { name: "Blue Swimmer Crab", cat: "crustacean", shape: "crab", forms: ["Whole", "Crab meat", "Frozen"] },
  { name: "Clams",           cat: "crustacean", shape: "shell", forms: ["Fresh", "Frozen"] },

  /* Squid & cuttlefish */
  { name: "Squid",           cat: "cephalopod", shape: "squid", forms: ["Whole", "Tubes & rings", "Frozen"] },
  { name: "Cuttlefish",      cat: "cephalopod", shape: "squid", forms: ["Whole", "Cleaned", "Frozen"] },
  { name: "Octopus",         cat: "cephalopod", shape: "squid", forms: ["Whole", "Tentacles", "Frozen"] },

  /* Dried & cured */
  { name: "Maldive Fish",    cat: "dried", shape: "dried", forms: ["Chips", "Powder"] },
  { name: "Dried Sprats",    cat: "dried", shape: "dried", forms: ["Pack"] },
  { name: "Dried Prawns",    cat: "dried", shape: "dried", forms: ["Pack"] },
  { name: "Salted Fish",     cat: "dried", shape: "dried", forms: ["Pack"] },
  { name: "Smoked Tuna",     cat: "dried", shape: "dried", forms: ["Slices", "Pack"] }
];

/* ---------- DIVES PRODUCT RANGE ----------
   shape: roll | cutlet | patty | ball | finger | samosa | prawn | burger */
window.DIVES = [
  { name: "Fish Rolls",     shape: "roll",    tag: "Crispy & golden",  desc: "Short description of the fish roll goes here — filling, coating and how to enjoy it.", pack: "Pack sizes to be added" },
  { name: "Fish Cutlets",   shape: "cutlet",  tag: "Bestseller",       desc: "Short description of the fish cutlet goes here — spice level, crumb coating, serving ideas.", pack: "Pack sizes to be added" },
  { name: "Fish Patties",   shape: "patty",   tag: "Ready to fry",     desc: "Short description of the fish patty goes here — what makes it special.", pack: "Pack sizes to be added" },
  { name: "Fish Balls",     shape: "ball",    tag: "Bite-sized",       desc: "Short description of the fish ball goes here — great for snacks and curries.", pack: "Pack sizes to be added" },
  { name: "Fish Fingers",   shape: "finger",  tag: "Kids' favourite",  desc: "Short description of the fish finger goes here.", pack: "Pack sizes to be added" },
  { name: "Fish Samosas",   shape: "samosa",  tag: "Tea-time treat",   desc: "Short description of the fish samosa goes here.", pack: "Pack sizes to be added" },
  { name: "Prawn Bites",    shape: "prawn",   tag: "New",              desc: "Short description of the prawn bite goes here.", pack: "Pack sizes to be added" },
  { name: "Fish Burgers",   shape: "burger",  tag: "Coming soon",      desc: "Short description of the fish burger goes here.", pack: "Pack sizes to be added" }
];

/* ---------- CERTIFICATIONS ----------
   PLACEHOLDERS ONLY — replace with the certificates you actually hold.
   file: path to a PDF/image inside the repo, e.g. "assets/certs/haccp.pdf"
         (leave "" to show a 'document coming soon' button). */
window.CERTS = [
  { title: "Certification name",  area: "Food safety",        issuer: "Issuing body",          valid: "Valid until — add date", scope: "Describe what this certificate covers.", file: "" },
  { title: "Certification name",  area: "Quality management", issuer: "Issuing body",          valid: "Valid until — add date", scope: "Describe what this certificate covers.", file: "" },
  { title: "Certification name",  area: "Export & health",    issuer: "Regulatory authority",  valid: "Valid until — add date", scope: "Describe what this certificate covers.", file: "" },
  { title: "Certification name",  area: "Sustainability",     issuer: "Issuing body",          valid: "Valid until — add date", scope: "Describe what this certificate covers.", file: "" },
  { title: "Licence / approval",  area: "Local authority",    issuer: "Authority name",        valid: "Valid until — add date", scope: "Describe what this approval covers.",    file: "" },
  { title: "Award / membership",  area: "Recognition",        issuer: "Organisation name",     valid: "Year — add",             scope: "Describe the award or membership.",      file: "" }
];

/* ---------- HOME PAGE NUMBERS ----------
   value: a number, or "fish" to count the Fish Library automatically.
   The last one is a PLACEHOLDER — put your real figure (or delete the line). */
window.STATS = [
  { value: 3,      suffix: "",  label: "Brands, one family" },
  { value: 2,      suffix: "",  label: "Aluth Maalu outlets" },
  { value: "fish", suffix: "+", label: "Varieties in our fish library" },
  { value: 25,     suffix: "+", label: "Years of experience (placeholder)" }
];
