export interface ApplicantItem {
  id: string;
  name: string;
  avatarUrl: string;
  appliedDate: string;
  photoCount: number;
  videoCount: number;
  title: string;
  location: string;
  jobsCompleted: number;
  averageRating: string;
  responseTime: string;
  completionRate: string;
  overview: string;
  equipment: string[];
  serviceAreas: {
    region: string;
    places: string[];
    mapUrl: string;
  };
  portfolio: string[];
  payoutSummary: {
    totalEarned: string;
    pendingPayout: string;
    platformFees: string;
    lastPayout: {
      date: string;
      amount: string;
    };
  };
}

export const mockApplicants: ApplicantItem[] = [
  {
    id: "1",
    name: "Elena Rodriguez",
    avatarUrl: "/images/elena_profile.png",
    appliedDate: "Oct 24, 2023",
    photoCount: 24,
    videoCount: 6,
    title: "Editorial Photographer & Colorist",
    location: "Los Angeles, CA",
    jobsCompleted: 48,
    averageRating: "4.9",
    responseTime: "2h",
    completionRate: "100%",
    overview: "Award-winning editorial photographer and colorist specializing in high-fashion and commercial lifestyle campaigns. Over 10 years of experience delivering premium visual narratives for global brands. Expert in advanced Davinci Resolve color grading and high-end retouching workflows.",
    equipment: [
      "Sony A7R V (Main Body)",
      "Sony A7 IV (Backup)",
      "24-70mm f/2.8 GM II",
      "DJI Ronin RS3 Pro",
      "Profoto B10X Duo Kit"
    ],
    serviceAreas: {
      region: "Greater Los Angeles & Orange County",
      places: ["Santa Monica", "Beverly Hills", "Malibu", "Pasadena"],
      mapUrl: "/images/la_map.png"
    },
    portfolio: [
      "/images/portfolio_main.png",
      "/images/portfolio_forest.png",
      "/images/portfolio_warm.png",
      "/images/portfolio_abstract.png",
      "/images/portfolio_geometry.png",
      "/images/portfolio_mono.png"
    ],
    payoutSummary: {
      totalEarned: "$12,450.00",
      pendingPayout: "$1,820.00",
      platformFees: "$1,245.00",
      lastPayout: {
        date: "Aug 15, 2023",
        amount: "$2,400.00"
      }
    }
  },
  {
    id: "2",
    name: "Marcus Lee",
    avatarUrl: "/images/marcus_profile.png",
    appliedDate: "Nov 2, 2023",
    photoCount: 18,
    videoCount: 4,
    title: "Artisanal Barista & Food Photographer",
    location: "San Francisco, CA",
    jobsCompleted: 32,
    averageRating: "4.8",
    responseTime: "1h",
    completionRate: "100%",
    overview: "Specialized food and cafe photographer focusing on capturing natural cafe light, rich textures of culinary dishes, and lifestyle barista storytelling campaigns.",
    equipment: [
      "Canon EOS R5",
      "RF 50mm f/1.2L USM",
      "RF 100mm f/2.8L Macro",
      "Profoto A10 Studio Light"
    ],
    serviceAreas: {
      region: "San Francisco Bay Area",
      places: ["SOMA", "Mission District", "Oakland", "Berkeley"],
      mapUrl: "/images/la_map.png"
    },
    portfolio: [
      "/images/portfolio_warm.png",
      "/images/portfolio_forest.png",
      "/images/portfolio_geometry.png",
      "/images/portfolio_abstract.png",
      "/images/portfolio_mono.png",
      "/images/portfolio_main.png"
    ],
    payoutSummary: {
      totalEarned: "$8,200.00",
      pendingPayout: "$1,100.00",
      platformFees: "$820.00",
      lastPayout: {
        date: "Jul 10, 2026",
        amount: "$1,200.00"
      }
    }
  },
  {
    id: "3",
    name: "Sofia Patel",
    avatarUrl: "/images/sofia_profile.png",
    appliedDate: "Oct 30, 2023",
    photoCount: 30,
    videoCount: 8,
    title: "Creative Director & Fashion Stylist",
    location: "New York, NY",
    jobsCompleted: 56,
    averageRating: "4.9",
    responseTime: "3h",
    completionRate: "98%",
    overview: "Creative director and fashion stylist creating vibrant editorial and commercial campaigns. Expert in set design, color coordination, and brand storytelling.",
    equipment: [
      "Nikon Z9",
      "Nikkor Z 85mm f/1.2 S",
      "Aputure Light Storm 600d Pro"
    ],
    serviceAreas: {
      region: "New York City & Brooklyn",
      places: ["Manhattan", "Brooklyn Heights", "Soho", "Astoria"],
      mapUrl: "/images/la_map.png"
    },
    portfolio: [
      "/images/portfolio_main.png",
      "/images/portfolio_mono.png",
      "/images/portfolio_abstract.png",
      "/images/portfolio_warm.png",
      "/images/portfolio_geometry.png",
      "/images/portfolio_forest.png"
    ],
    payoutSummary: {
      totalEarned: "$15,400.00",
      pendingPayout: "$2,200.00",
      platformFees: "$1,540.00",
      lastPayout: {
        date: "Jun 30, 2026",
        amount: "$3,000.00"
      }
    }
  },
  {
    id: "4",
    name: "David Kim",
    avatarUrl: "/images/david_profile.png",
    appliedDate: "Nov 5, 2023",
    photoCount: 22,
    videoCount: 7,
    title: "Commercial Videographer & Editor",
    location: "Seattle, WA",
    jobsCompleted: 27,
    averageRating: "4.7",
    responseTime: "2h",
    completionRate: "96%",
    overview: "Documentary-style filmmaker producing visual advertisements for tech startups and outdoor gear companies.",
    equipment: [
      "Sony FX3 Cinema",
      "Sony FE 16-35mm f/2.8 GM",
      "DJI Mic 2 Kit"
    ],
    serviceAreas: {
      region: "Greater Seattle Area",
      places: ["Capitol Hill", "Bellevue", "Fremont", "Ballard"],
      mapUrl: "/images/la_map.png"
    },
    portfolio: [
      "/images/portfolio_forest.png",
      "/images/portfolio_abstract.png",
      "/images/portfolio_mono.png",
      "/images/portfolio_main.png",
      "/images/portfolio_geometry.png",
      "/images/portfolio_warm.png"
    ],
    payoutSummary: {
      totalEarned: "$6,900.00",
      pendingPayout: "$850.00",
      platformFees: "$690.00",
      lastPayout: {
        date: "Jul 05, 2026",
        amount: "$1,400.00"
      }
    }
  },
  {
    id: "5",
    name: "Amina Hassan",
    avatarUrl: "/images/amina_profile.png",
    appliedDate: "Oct 27, 2023",
    photoCount: 15,
    videoCount: 5,
    title: "Product Photographer & Visual Artist",
    location: "Austin, TX",
    jobsCompleted: 19,
    averageRating: "4.9",
    responseTime: "4h",
    completionRate: "100%",
    overview: "Amina is a visual artist specializing in high-contrast product photography and clean commercial aesthetics for cosmetics and lifestyle items.",
    equipment: [
      "Sony A7 IV",
      "90mm f/2.8 Macro G OSS",
      "Godox AD400 Pro Strobe"
    ],
    serviceAreas: {
      region: "Austin Metro Area",
      places: ["Downtown", "South Congress", "East Austin", "West Lake Hills"],
      mapUrl: "/images/la_map.png"
    },
    portfolio: [
      "/images/portfolio_geometry.png",
      "/images/portfolio_abstract.png",
      "/images/portfolio_warm.png",
      "/images/portfolio_main.png",
      "/images/portfolio_mono.png",
      "/images/portfolio_forest.png"
    ],
    payoutSummary: {
      totalEarned: "$5,100.00",
      pendingPayout: "$400.00",
      platformFees: "$510.00",
      lastPayout: {
        date: "Jun 15, 2026",
        amount: "$1,000.00"
      }
    }
  },
  {
    id: "6",
    name: "Liam O'Connor",
    avatarUrl: "/images/liam_profile.png",
    appliedDate: "Nov 1, 2023",
    photoCount: 27,
    videoCount: 10,
    title: "Travel Filmmaker & Documentarian",
    location: "Boston, MA",
    jobsCompleted: 42,
    averageRating: "4.9",
    responseTime: "2h",
    completionRate: "100%",
    overview: "Travel documentarian working with tourism boards and eco-friendly hospitality brands to craft immersive video logs and documentary shorts.",
    equipment: [
      "LUMIX S5 IIX",
      "Sigma 24-70mm f/2.8 DG DN",
      "DJI Ronin-S Stabilizer"
    ],
    serviceAreas: {
      region: "New England & East Coast",
      places: ["Boston Common", "Cambridge", "Back Bay", "Cape Cod"],
      mapUrl: "/images/la_map.png"
    },
    portfolio: [
      "/images/portfolio_forest.png",
      "/images/portfolio_main.png",
      "/images/portfolio_abstract.png",
      "/images/portfolio_geometry.png",
      "/images/portfolio_mono.png",
      "/images/portfolio_warm.png"
    ],
    payoutSummary: {
      totalEarned: "$11,200.00",
      pendingPayout: "$1,500.00",
      platformFees: "$1,120.00",
      lastPayout: {
        date: "Jul 01, 2026",
        amount: "$2,200.00"
      }
    }
  },
  {
    id: "7",
    name: "Isabella Garcia",
    avatarUrl: "/images/isabella_profile.png",
    appliedDate: "Oct 29, 2023",
    photoCount: 20,
    videoCount: 6,
    title: "Architectural Photographer",
    location: "Chicago, IL",
    jobsCompleted: 31,
    averageRating: "4.8",
    responseTime: "1h",
    completionRate: "100%",
    overview: "Fine-art architectural photographer working with real estate developers and designer firms to capture interior space depth and geometry.",
    equipment: [
      "Fujifilm GFX 50S II",
      "GF 23mm f/4 R LM WR (Ultra-Wide)",
      "Tripod Gitzo Systematic"
    ],
    serviceAreas: {
      region: "Chicagoland Area",
      places: ["The Loop", "Lincoln Park", "Wicker Park", "Gold Coast"],
      mapUrl: "/images/la_map.png"
    },
    portfolio: [
      "/images/portfolio_geometry.png",
      "/images/portfolio_mono.png",
      "/images/portfolio_main.png",
      "/images/portfolio_forest.png",
      "/images/portfolio_warm.png",
      "/images/portfolio_abstract.png"
    ],
    payoutSummary: {
      totalEarned: "$9,500.00",
      pendingPayout: "$1,250.00",
      platformFees: "$950.00",
      lastPayout: {
        date: "Jul 04, 2026",
        amount: "$1,900.00"
      }
    }
  },
  {
    id: "8",
    name: "Ethan Nguyen",
    avatarUrl: "/images/ethan_profile.png",
    appliedDate: "Nov 3, 2023",
    photoCount: 25,
    videoCount: 9,
    title: "Street & Action Sports Videographer",
    location: "Los Angeles, CA",
    jobsCompleted: 38,
    averageRating: "4.7",
    responseTime: "3h",
    completionRate: "95%",
    overview: "Capturing the fast-paced energy of action sports, urban lifestyle, and street culture through high frame rate editing and immersive drone shots.",
    equipment: [
      "GoPro Hero 12 Black",
      "RED Komodo 6K",
      "DJI Avata FPV Drone"
    ],
    serviceAreas: {
      region: "Greater Los Angeles Area",
      places: ["Venice Beach", "Silver Lake", "Downtown LA", "Hollywood"],
      mapUrl: "/images/la_map.png"
    },
    portfolio: [
      "/images/portfolio_abstract.png",
      "/images/portfolio_main.png",
      "/images/portfolio_mono.png",
      "/images/portfolio_geometry.png",
      "/images/portfolio_forest.png",
      "/images/portfolio_warm.png"
    ],
    payoutSummary: {
      totalEarned: "$8,900.00",
      pendingPayout: "$950.00",
      platformFees: "$890.00",
      lastPayout: {
        date: "Jun 28, 2026",
        amount: "$1,800.00"
      }
    }
  },
  {
    id: "9",
    name: "Maya Singh",
    avatarUrl: "/images/maya_profile.png",
    appliedDate: "Oct 26, 2023",
    photoCount: 19,
    videoCount: 3,
    title: "Minimalist Portrait Photographer",
    location: "Denver, CO",
    jobsCompleted: 23,
    averageRating: "5.0",
    responseTime: "2h",
    completionRate: "100%",
    overview: "Maya specializes in raw, minimalist portrait photography using only natural light to capture the authentic personality of her subjects.",
    equipment: [
      "Sony A7 IV",
      "FE 50mm f/1.2 GM",
      "Reflector Kit 5-in-1"
    ],
    serviceAreas: {
      region: "Denver Metro & Boulder",
      places: ["LoDo", "Cherry Creek", "Boulder Flatirons", "Golden"],
      mapUrl: "/images/la_map.png"
    },
    portfolio: [
      "/images/portfolio_warm.png",
      "/images/portfolio_mono.png",
      "/images/portfolio_geometry.png",
      "/images/portfolio_main.png",
      "/images/portfolio_abstract.png",
      "/images/portfolio_forest.png"
    ],
    payoutSummary: {
      totalEarned: "$6,500.00",
      pendingPayout: "$800.00",
      platformFees: "$650.00",
      lastPayout: {
        date: "Jun 20, 2026",
        amount: "$1,100.00"
      }
    }
  }
];
