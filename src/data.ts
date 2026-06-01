/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, QuizQuestion, QuizResult } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "day-care-revolution",
    name: "Day Care Revolution",
    category: "PROTECTIVE ESSENCE",
    tag: "NEW",
    price: 3410,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    description: "An advanced 3-in-1 daytime moisturizing emulsion that functions as a high-protection sunscreen, makeup base, and skin-elasticity booster. Enriched with our premium water-soluble collagen formula, it maintains skin moisture and resilience throughout the day, protecting skin from harsh UV rays and pollution while maintaining a luminous, dew-like radiance (Tsuyadama: Pearl Glow).",
    briefDescription: "High-protection SPF50+ facial emulsion that defends, primes, and boosts luminosity.",
    rating: 4.8,
    reviewsCount: 142,
    branch: "Elixir Superieur",
    stores: ["Tokyo Flagship (Ginza)", "Osaka Boutique (Shinsaibashi)"],
    ingredients: [
      "Water-Soluble Collagen",
      "Tranexamic Acid (Brightening)",
      "Yeast Extract (Firming)",
      "Rosemary Leaf Extract",
      "Glycerin (Deep Hydration)",
      "High UV Filters (SPF 50+ PA++++)"
    ],
    ritual: [
      "Apply in the morning after toning your skin.",
      "Take an almond-sized amount onto clean fingertips.",
      "Smooth gently over your entire face, focusing on high-exposure cheekbones.",
      "Follow with your standard makeup routine if desired."
    ],
    skinBenefits: [
      "Full-spectrum SPF 50+ UV and environmental pollutant protection",
      "Suppresses melanin production to actively prevent dark spots",
      "Sustains cheeks luster (Tsuyadama) for up to 12 hours",
      "Flawless makeup preparation, smoothing pores without chalky residue"
    ]
  },
  {
    id: "the-serum",
    name: "The Serum",
    category: "ADVANCED REPAIR",
    tag: "BEST SELLER",
    price: 8250,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    description: "Our flagship intensive treatment serum designed to penetrate deep into the skin's surface layers. Formulated with our proprietary Double Collagen Infusion and active Botanical Extracts, it triggers cellular revitalization, repairs microscopic moisture barrier micro-cracks, and reinforces scaffolding density. Experience bouncy, firm skin overflowing with inner light.",
    briefDescription: "Deep penetrative botanical collagen treatment for cellular repair and structural volume.",
    rating: 4.9,
    reviewsCount: 310,
    branch: "Elixir Advanced",
    stores: ["Tokyo Flagship (Ginza)", "Kyoto Boutique (Gion)"],
    ingredients: [
      "Marine Collagen Triple Complex",
      "Hydrolyzed Yeast Protein",
      "Iris Root Extract (Scaffolding Support)",
      "Hyaluronic Acid (Triple Mass)",
      "Squalane (Olive Derived)",
      "Tocopherol (Vitamin E antioxidant)"
    ],
    ritual: [
      "Use twice daily, both morning and night, immediately after cleansing or toning.",
      "Dispense two pumps of the serum into your palm.",
      "Gently smooth over face in sweeping upward and outward motions.",
      "Press your palms firmly into your cheeks and forehead to optimize absorption."
    ],
    skinBenefits: [
      "Restores deep dermal elastic rebound and structural support",
      "Accelerates cellular turnover and collagen barrier recovery",
      "Visibly plumps fine lines and smooths rough patches",
      "Unlocks natural translucent radiance with continued application"
    ]
  },
  {
    id: "total-v-cream",
    name: "Total V Cream",
    category: "SCULPTING NIGHT",
    price: 11000,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    description: "An ultra-rich, luxury sculpting night cream that leverages advanced collagen network science to defy gravity. Engineered with our exclusive V-Firm Peptide Tightener and deep-moisturizing Shea butter, it wraps the skin in a lifting microscopic mesh. Overnight, it re-anchors drooping contours, replenishes cellular volume, and locks in a rich, dewy Tsuyadama glow.",
    briefDescription: "Premium scientific lifting overnight cream to target structural density and gravity defiance.",
    rating: 5.0,
    reviewsCount: 94,
    branch: "Elixir Advanced",
    stores: ["Tokyo Flagship (Ginza)", "Osaka Boutique (Shinsaibashi)", "Kyoto Boutique (Gion)"],
    ingredients: [
      "V-Firm Peptide Complex (Lifting)",
      "Santalum Album (Sandalwood) Wood Extract",
      "Butyrospermum Parkii (Shea Butter)",
      "Lupine Seed Extract",
      "Water-Soluble Marine Collagen",
      "Ceramide NP (Barrier Repair)"
    ],
    ritual: [
      "Use at night as the vital ultimate step of your skincare routine.",
      "Warm a pearl-sized amount between clean fingertips.",
      "Dot onto chin, cheeks, nose, and forehead.",
      "Massage in slow, upward, sculpting motions from chin to ears for 30 seconds."
    ],
    skinBenefits: [
      "Directly combats sagging and gravity-induced facial fatigue",
      "Deeply nourishes dermal lipid layers with pure shea extract",
      "Restores structural density while the body is in repair mode",
      "Smooths skin matrix for dramatic firmness upon waking"
    ]
  },
  {
    id: "moisture-balancing-toner",
    name: "Moisture Balancing Toner",
    category: "DAILY RITUAL",
    price: 2950,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
    description: "A soothing, highly-absorbent hydrating toner that instantly balances skin pH and floods dry skin cells with immediate moisturizing nourishment. Prepares the skin matrix to optimally absorb subsequently applied serums and emulsions, ensuring zero wasted active ingredients.",
    briefDescription: "Instant prep hydration toner to balance and calm the skin barrier.",
    rating: 4.7,
    reviewsCount: 188,
    branch: "Elixir Superieur",
    stores: ["Kyoto Boutique (Gion)", "Osaka Boutique (Shinsaibashi)"],
    ingredients: [
      "Water-Soluble Collagen",
      "Dipotassium Glycyrrhizinate (Anti-inflammatory)",
      "Coix Lacryma-Jobi (Job's Tears) Seed Extract",
      "Hyaluronic Acid Duo"
    ],
    ritual: [
      "Use morning and evening immediately after cleansing.",
      "Pour a generous amount into the palms of your hand or saturate a soft cotton pad.",
      "Sweep outwards over the face and neck gently.",
      "Slightly press with warm fingers to locked-in hydration."
    ],
    skinBenefits: [
      "Saturates skin cells with instantaneous, balance-restoring moisture",
      "Soothes dry patches, redness, and inflammation",
      "Optimizes deeper penetration of subsequently applied serums"
    ]
  },
  {
    id: "pearl-radiance-mask",
    name: "Pearl Radiance Mask",
    category: "INTENSIVE TREATMENT",
    price: 4620,
    image: "https://images.unsplash.com/photo-1590156546746-c23702224744?q=80&w=600&auto=format&fit=crop",
    description: "A high-potency micro-sheet mask saturated with hydrolyzed pearls, high-grade vitamin C derivative, and rich water-soluble collagen. Offers immediate salvation to dull, exhausted skin before special moments or as a weekly luxury booster.",
    briefDescription: "Luxury micro-sheet mask drenched in marine collagen and pearl extract.",
    rating: 4.8,
    reviewsCount: 63,
    branch: "Elixir White",
    stores: ["Tokyo Flagship (Ginza)", "Osaka Boutique (Shinsaibashi)"],
    ingredients: [
      "Hydrolyzed Pearl Shell Protein (Nacre)",
      "Ascorbyl Glucoside (Stable Vit C)",
      "Chamomilla Recutita Flower Extract",
      "Squalane",
      "Concentrated Soluble Collagen"
    ],
    ritual: [
      "Take sheet mask out of pouch and align properly with eyes, nose, and mouth.",
      "Smooth down over contours to eliminate any air bubble pockets.",
      "Leave on for 15 minutes while relaxing.",
      "Remove mask and gently massage the leftover nutrient essence into the skin."
    ],
    skinBenefits: [
      "Dramatically brightens dark spots and sun fatigue on one use",
      "Unblocks brilliant, bouncy pearl-dew skin texture",
      "Deeply infuses lipids with soothing chamomile and squalane"
    ]
  }
];

export const REVIEWS: { [productId: string]: any[] } = {
  "day-care-revolution": [
    {
      id: "rev-1",
      userName: "Yoko S.",
      rating: 5,
      date: "May 12, 2026",
      comment: "This is hands-down the best daytime sunscreen emulsion. It keeps my face hydrated all day without any oily feeling, and my foundation clings to it beautifully! The Tsuyadama luster shines right through my foundation.",
      skinType: "Normal to Combination"
    },
    {
      id: "rev-2",
      userName: "Sora K.",
      rating: 4,
      date: "April 28, 2026",
      comment: "Absolutely love the light texture. It doesn't leave a white cast and feels like a luxurious cream instead of a heavy sunscreen. Giving it 4 starts only because I wish the bottle was slightly larger!",
      skinType: "Dehydrated"
    }
  ],
  "the-serum": [
    {
      id: "rev-3",
      userName: "Mia T.",
      rating: 5,
      date: "May 20, 2026",
      comment: "I have used dozens of luxury serums, but The Serum performs miracles. Within 2 weeks, my skin felt tighter, plumple, and had that beautiful glassy pearl reflection. It absorbs instantly without sticky residue.",
      skinType: "Dry, Loss of firmness"
    },
    {
      id: "rev-4",
      userName: "Hana O.",
      rating: 5,
      date: "May 15, 2026",
      comment: "Highly recommended for anti-aging. My fine smile lines are visibly filled and my moisture barrier has been completely restored after winter dryness.",
      skinType: "Sensitive"
    }
  ],
  "total-v-cream": [
    {
      id: "rev-5",
      userName: "Rei N.",
      rating: 5,
      date: "May 25, 2026",
      comment: "This cream is exceptionally rich and rich, like a spa treatment. I apply it using the upward facial contouring massage and wake up with skin that is dramatically firm, lifted, and soft. Worth every single yen.",
      skinType: "Very Dry, Mature"
    },
    {
      id: "rev-6",
      userName: "Chiyo H.",
      rating: 5,
      date: "May 02, 2026",
      comment: "It completely ironed out the dry texture lines on my neck and jawline. Truly a gravity-defying lifesaver. The fragrance is calming and elegant.",
      skinType: "Mature"
    }
  ]
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    key: "skinType",
    question: "How would you describe your skin's current state?",
    description: "This helps us identify your moisture barrier strength and hydration levels.",
    options: [
      {
        value: "dry",
        label: "Dry & Dehydrated",
        detail: "Feels tight, looks dull, flake patches, has fine lines on cheek area",
        icon: "Droplets"
      },
      {
        value: "combination",
        label: "Combination or Oil-Prone",
        detail: "Shiny T-Zone with dryness, visible pores on nose, prone to breakouts",
        icon: "Sparkles"
      },
      {
        value: "sensitive",
        label: "Sensitive or Rosacea-Prone",
        detail: "Prone to redness, easily irritated, reacts to climate changes",
        icon: "Heart"
      },
      {
        value: "normal",
        label: "Normal & Balanced",
        detail: "Relatively stable, even tone, generally healthy but wants longevity care",
        icon: "CheckCircle"
      }
    ]
  },
  {
    id: 2,
    key: "concern",
    question: "What is your primary skin target?",
    description: "Every skin goal has a custom collagen science solution.",
    options: [
      {
        value: "sagging",
        label: "Loss of Firmness & Wrinkles",
        detail: "Want to focus on lifting jawline, targeting deep laughter lines, and sagging cheeks",
        icon: "TrendingUp"
      },
      {
        value: "dullness",
        label: "Dullness & Uneven Glow",
        detail: "Skin appears tired, grey, lacking luminosity, or shadowed by fatigue and stress",
        icon: "Sun"
      },
      {
        value: "dehydration",
        label: "Intense Moisture & Barrier Repair",
        detail: "Want to deeply saturate the lipid levels, heal moisture gaps, and comfort windburn",
        icon: "Smile"
      },
      {
        value: "spots",
        label: "Youthful Anti-Dark Spots",
        detail: "Reduce sun-spot pigment visuality, freckles, and boost crystal clarity",
        icon: "Eye"
      }
    ]
  },
  {
    id: 3,
    key: "texture",
    question: "Which skin finish do you prefer most?",
    description: "The weight and aesthetic sensory experience of your tailored regimen.",
    options: [
      {
        value: "rich",
        label: "Ultra-Rich & Velvet Shield",
        detail: "Deeply enveloping, slow-absorbing decadent barrier comfort, ideal for nights",
        icon: "Layers"
      },
      {
        value: "light",
        label: "Light Hydrating Fluid",
        detail: "Quick-melting moisture that sinks in seconds, completely weightless feel",
        icon: "Feather"
      },
      {
        value: "dewy",
        label: "Aesthetic Dewy Luster Finish",
        detail: "Leaves a brilliant pearl-glow reflective base, incredible priming for cosmetics",
        icon: "Sparkles"
      }
    ]
  }
];

export const QUIZ_RESULTS: QuizResult[] = [
  {
    regimenName: "Tsuyadama Premium Sculpt Complex",
    tagline: "The Ultimate Collagen Lifting and Lifting Solution",
    recommendedProductIds: ["moisture-balancing-toner", "the-serum", "total-v-cream"],
    explanation: "Based on your focus on gravity defiance, lifting, and comforting ultra-rich texture, this full Japanese multi-layer ritual is specifically calibrated for you. It combines intense dermal replenishment with the lifting V-firm peptide network to re-anchor drooping lines and unleash maximum cheek jewel luster.",
    morningSteps: [
      "Sweep Moisture Balancing Toner over skin to calibrate dermal pH.",
      "Dispense 2 pumps of The Serum, massaging upwards from jawline to temple.",
      "Apply a microscopic sweep of Day Care Revolution for day-protection or light cream."
    ],
    eveningSteps: [
      "Prepare moisture levels using the Toner on clean skin.",
      "Drench skin cells in structural Marine Collagen with The Serum.",
      "Gently shape skin upwards with a pearl-sized dollop of Total V Cream in a massage motion."
    ]
  },
  {
    regimenName: "Cellular Radiance & Active Protection",
    tagline: "Unleash Dewy Translucency and Dynamic Sun Shielding",
    recommendedProductIds: ["moisture-balancing-toner", "the-serum", "day-care-revolution"],
    explanation: "For complex balancing, combating dull shadows, and enjoying featherlight dewy finishes, this regimen pairs daily anti-uv shielding with deepest hydration. The Day Care Revolution SPF protection acts as a high-density reflector of environmental exhaustion, while the deep botanical serum works from below.",
    morningSteps: [
      "Press Moisture Balancing Toner onto skin with warm palms.",
      "Apply The Serum to seal skin cells with moisture resilience.",
      "Smooth Day Care Revolution generously to guard, prime, and lock in the Tsuyadama glow."
    ],
    eveningSteps: [
      "Balance skin after double cleansing with Moisture Balancing Toner.",
      "Smooth on two pumps of The Serum, emphasizing delicate eye and mouth curves.",
      "Follow with a light nightly moisturizer of choice."
    ]
  },
  {
    regimenName: "Intense Moisture Infusion & Pearl Dew Cure",
    tagline: "High-Potency Moisture Barrier Reconstruction",
    recommendedProductIds: ["moisture-balancing-toner", "pearl-radiance-mask", "total-v-cream"],
    explanation: "Perfect for delicate barriers, intense dehydration, and rich comfort. This restorative regime integrates our weekly Hydrolyzed Pearl therapy mask with daily collagen locks to deeply quench extreme dehydration lines, pacify inflammation, and bring back comforting density.",
    morningSteps: [
      "Drench cotton pad with Toner and press onto red or dehydrated zones.",
      "Apply a gentle cream layer to lock in immediate flexibility."
    ],
    eveningSteps: [
      "Purify skin, then saturate tissues with Moisture Balancing Toner.",
      "Unfold the Pearl Radiance Mask. Lay flat for 15 minutes of luxurious recovery.",
      "Massage remaining serum in, then seal the moisture matrix securely with the Total V Cream."
    ]
  }
];

export const SCIENCE_TOPICS = [
  {
    id: "collagen",
    title: "Triple Matrix Collagen Science",
    subtitle: "Rebuilding Dermal Scaffold Structures from Within",
    description: "Skin firmness relies directly on collagen wire density. As time passes, the dermal network sags, causing skin layers to lose their reflective 'Tsuyadama' angle. Elixir has engineered a patented Water-Soluble Marine Collagen complex that mimics skin's native cell anchors, instantly interlocking with natural scaffolding structures. In doing so, it restores the elastic upward push that defines a youthful silhouette.",
    benefit: "Tightens loose pores and lifts sagging skin cells on a micro-structural scale."
  },
  {
    id: "tsuyadama",
    title: "Understanding 'Tsuyadama'—The Pearl Glow",
    subtitle: "A Three-Point Optic Reflection on Health and Elasticity",
    description: "In Japan, 'Tsuyadama' is the highly-coveted natural pearl-like glow at the highest peak of the cheeks. It only appears when the skin's surface and collagen layers are completely healthy, plump, and structurally smooth. This geometric smoothness acts like a high-density mineral reflector, scattering light evenly. Our research is dedicated to aligning skin layers perfectly so your face naturally captures and projects light from all visual borders.",
    benefit: "Guarantees a luminous, moist, filtered appearance even without cosmetics."
  },
  {
    id: "retinol",
    title: "Retinol & Light-Anchoring Peptides",
    subtitle: "Accelerated Matrix Turnover Without Irritation",
    description: "The seasonal sets integrate stabilized pure Retinol with our proprietary light-anchoring Peptide complexes. While retinol stimulates cells to quickly purge pigmented spots and dry cells, peptides lock onto sagging tissue, reinforcing the moisture barrier. This beautiful dual-action makes the formula extremely fast-acting yet deeply comforting on delicate, reactive, or dry skin types.",
    benefit: "Dramatically reduces deep visual wrinkles and evens uneven pigmented spots."
  }
];
