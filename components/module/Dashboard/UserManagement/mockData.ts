export interface UserStatItem {
  title: string;
  value: string;
  type: "clients" | "creators" | "signups" | "applications";
}

export interface UserItem {
  id: string;
  name: string;
  userId: string;
  email: string;
  phone: string;
  status: "active" | "suspended";
  role: "Client" | "Creator";
  joinDate: string;
}

export interface ClientDetails {
  companyName: string;
  logoUrl?: string;
  bio: string;
  location: string;
  website: string;
  badges: string[];
  activeProjects: number;
  totalSpend: string;
  successRate: string;
  profileInformation: string;
  recentActivity: {
    id: string;
    title: string;
    date: string;
    status: string;
    amount?: string;
  }[];
}

export interface CreatorDetails {
  title: string;
  avatarUrl: string;
  location: string;
  jobsCompleted: number;
  averageRating: string;
  responseTime: string;
  completionRate: string;
  overview: string;
  verified: boolean;
  payoutSummary: {
    totalEarned: string;
    pendingPayout: string;
    platformFees: string;
    lastPayout: {
      date: string;
      amount: string;
    };
  };
  portfolio: string[];
  equipment: string[];
  serviceAreas: {
    region: string;
    places: string[];
    mapUrl: string;
  };
}

export const mockStats: UserStatItem[] = [
  {
    title: "Total Clients",
    value: "12,458",
    type: "clients",
  },
  {
    title: "Active Creators",
    value: "458",
    type: "creators",
  },
  {
    title: "New Signups",
    value: "92",
    type: "signups",
  },
  {
    title: "Pending Applications",
    value: "12,458",
    type: "applications",
  },
];

export const mockUsers: UserItem[] = [
  {
    id: "1",
    name: "John Smith",
    userId: "U001",
    email: "john@example.com",
    phone: "+1 234-567-8901",
    status: "active",
    role: "Client",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Emma Wilson",
    userId: "U002",
    email: "emma@example.com",
    phone: "+1 234-567-8902",
    status: "active",
    role: "Client",
    joinDate: "2024-02-10",
  },
  {
    id: "3",
    name: "Michael Brown",
    userId: "U003",
    email: "michael@example.com",
    phone: "+1 234-567-8903",
    status: "suspended",
    role: "Creator",
    joinDate: "2024-03-05",
  },
  {
    id: "4",
    name: "Sarah Davis",
    userId: "U004",
    email: "sarah@example.com",
    phone: "+1 234-567-8904",
    status: "active",
    role: "Creator",
    joinDate: "2024-01-20",
  },
  {
    id: "5",
    name: "James Miller",
    userId: "U005",
    email: "james@example.com",
    phone: "+1 234-567-8905",
    status: "active",
    role: "Creator",
    joinDate: "2024-04-01",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    userId: "U006",
    email: "lisa@example.com",
    phone: "+1 234-567-8906",
    status: "active",
    role: "Client",
    joinDate: "2023-12-10",
  },
  {
    id: "7",
    name: "David Taylor",
    userId: "U007",
    email: "david@example.com",
    phone: "+1 234-567-8907",
    status: "suspended",
    role: "Creator",
    joinDate: "2024-05-15",
  },
  {
    id: "8",
    name: "Jennifer White",
    userId: "U008",
    email: "jennifer@example.com",
    phone: "+1 234-567-8908",
    status: "active",
    role: "Creator",
    joinDate: "2024-02-28",
  },
];

// Rich detailed data for details pages
export const mockClientDetails: Record<string, ClientDetails> = {
  "1": {
    companyName: "Apex Logistics",
    bio: "Global logistics and supply chain optimization firm specializing in eco-friendly transport.",
    location: "Chicago, IL",
    website: "www.apexlogistics.io",
    badges: ["Enterprise", "Active"],
    activeProjects: 5,
    totalSpend: "$24.5k",
    successRate: "98%",
    profileInformation: "Apex Logistics is a tech-driven supply chain partner helping modern brands scale globally. Founded in 2016, we deploy state of the art warehousing systems, automated shipping lanes, and dynamic tracking dashboards. Our creator initiatives focus on highlighting logistics transparency, sustainability practices, and our carbon-neutral transport options through custom social content.",
    recentActivity: [
      { id: "act-1", title: "Campaign Launch: Green Logistics", date: "Jul 05, 2026", status: "In Progress" },
      { id: "act-2", title: "Invoice Paid - Milestones 1 & 2", date: "Jun 28, 2026", status: "Completed", amount: "$5,400.00" },
    ]
  },
  "2": {
    companyName: "ABC Coffee",
    bio: "A premium artisanal coffee roaster and cafe chain focusing on sustainable sourcing and creator collaborations.",
    location: "Downtown, NY",
    website: "www.abccoffee.co",
    badges: ["Partner", "Active"],
    activeProjects: 2,
    totalSpend: "$8.4k",
    successRate: "100%",
    profileInformation: "ABC Coffee was founded in 2018 with a singular mission: to bridge the gap between world-class roasting techniques and local community engagement. Based in the heart of Downtown New York, we operate three flagship cafes and a subscription service that reaches thousands of coffee enthusiasts nationwide. Our partnership with the Creator Marketplace aims to develop unique digital content and social campaigns that highlight our commitment to artisanal quality and ethical sourcing.",
    recentActivity: [
      { id: "act-3", title: "Video Deliverable Approved", date: "Jul 10, 2026", status: "Completed" },
      { id: "act-4", title: "Creator Contract Signed - Autumn Blend", date: "Jul 02, 2026", status: "Completed" },
      { id: "act-5", title: "Payment Disbursed - ABC Promo V1", date: "Jun 15, 2026", status: "Completed", amount: "$3,000.00" }
    ]
  },
  "6": {
    companyName: "Zenith Media",
    bio: "Digital storytelling agency helping startups stand out with visual identity and performance ads.",
    location: "San Francisco, CA",
    website: "www.zenithmedia.agency",
    badges: ["Starter", "Active"],
    activeProjects: 1,
    totalSpend: "$3.2k",
    successRate: "92%",
    profileInformation: "Zenith Media creates impactful design systems, short-form visual content, and growth advertising campaigns for early-stage SaaS ventures. We value rapid iteration and authenticity in brand representation, connecting creators with founders to build trust and authority in technical spaces.",
    recentActivity: [
      { id: "act-6", title: "Creative Brief Submitted", date: "Jul 08, 2026", status: "Under Review" }
    ]
  }
};

export const mockCreatorDetails: Record<string, CreatorDetails> = {
  "3": {
    title: "Editorial Photographer & Colorist",
    avatarUrl: "/images/elena_profile.png",
    location: "Los Angeles, CA",
    jobsCompleted: 48,
    averageRating: "4.9",
    responseTime: "2h",
    completionRate: "100%",
    overview: "Award-winning editorial photographer and colorist specializing in high-fashion and commercial lifestyle campaigns. Over 10 years of experience delivering premium visual narratives for global brands. Expert in advanced Davinci Resolve color grading and high-end retouching workflows.",
    verified: true,
    payoutSummary: {
      totalEarned: "$12,450.00",
      pendingPayout: "$1,820.00",
      platformFees: "$1,245.00",
      lastPayout: {
        date: "Aug 15, 2023",
        amount: "$2,400.00"
      }
    },
    portfolio: [
      "/images/portfolio_main.png",
      "/images/portfolio_forest.png",
      "/images/portfolio_warm.png",
      "/images/portfolio_abstract.png",
      "/images/portfolio_geometry.png",
      "/images/portfolio_mono.png"
    ],
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
    }
  },
  "4": {
    title: "Cinematographer & Visual Director",
    avatarUrl: "/images/elena_profile.png",
    location: "New York, NY",
    jobsCompleted: 35,
    averageRating: "4.8",
    responseTime: "4h",
    completionRate: "97%",
    overview: "Visual director and commercial cinematographer focusing on storytelling, high-fidelity lighting setups, and short form commercial video production for premium lifestyle and culinary brands.",
    verified: true,
    payoutSummary: {
      totalEarned: "$9,150.00",
      pendingPayout: "$950.00",
      platformFees: "$915.00",
      lastPayout: {
        date: "Jul 28, 2026",
        amount: "$1,800.00"
      }
    },
    portfolio: [
      "/images/portfolio_main.png",
      "/images/portfolio_abstract.png",
      "/images/portfolio_mono.png"
    ],
    equipment: [
      "RED Komodo 6K",
      "Canon RF 24-70mm f/2.8L IS USM",
      "Sennheiser MKH416 Shotgun Mic",
      "Aputure 600d Pro Light"
    ],
    serviceAreas: {
      region: "New York Metro & Brooklyn Area",
      places: ["Manhattan", "Brooklyn", "Queens", "Williamsburg"],
      mapUrl: "/images/la_map.png"
    }
  },
  "5": {
    title: "3D Motion Designer & Art Director",
    avatarUrl: "/images/elena_profile.png",
    location: "London, UK",
    jobsCompleted: 62,
    averageRating: "5.0",
    responseTime: "1h",
    completionRate: "100%",
    overview: "3D artist creating high-end loop animations, product visualisations, and futuristic concepts in Cinema4D, Octane, and Houdini for international technology and wearable brands.",
    verified: false,
    payoutSummary: {
      totalEarned: "$28,900.00",
      pendingPayout: "$4,500.00",
      platformFees: "$2,890.00",
      lastPayout: {
        date: "Jul 01, 2026",
        amount: "$5,000.00"
      }
    },
    portfolio: [
      "/images/portfolio_geometry.png",
      "/images/portfolio_abstract.png"
    ],
    equipment: [
      "Threadripper 3960X Dual RTX 4090 Workstation",
      "Wacom Cintiq Pro 24",
      "iPad Pro M2"
    ],
    serviceAreas: {
      region: "Greater London & Remote Worldwide",
      places: ["Soho", "Shoreditch", "Kensington", "City of London"],
      mapUrl: "/images/la_map.png"
    }
  },
  "7": {
    title: "Lifestyle Videographer & Drone Pilot",
    avatarUrl: "/images/elena_profile.png",
    location: "Miami, FL",
    jobsCompleted: 29,
    averageRating: "4.7",
    responseTime: "3h",
    completionRate: "95%",
    overview: "Licensed FAA Part 107 drone pilot and high-energy video editor capturing beautiful resort videos, outdoor events, and extreme sports content with dynamic sound design.",
    verified: true,
    payoutSummary: {
      totalEarned: "$8,320.00",
      pendingPayout: "$1,200.00",
      platformFees: "$832.00",
      lastPayout: {
        date: "Jun 20, 2026",
        amount: "$1,500.00"
      }
    },
    portfolio: [
      "/images/portfolio_forest.png",
      "/images/portfolio_warm.png"
    ],
    equipment: [
      "DJI Inspire 3 Drone",
      "Sony FX3 Cinema Camera",
      "DJI Mic 2 Set"
    ],
    serviceAreas: {
      region: "Miami Beach & Florida Keys",
      places: ["South Beach", "Key Biscayne", "Brickell", "Fort Lauderdale"],
      mapUrl: "/images/la_map.png"
    }
  },
  "8": {
    title: "Commercial Fashion Photographer",
    avatarUrl: "/images/elena_profile.png",
    location: "Paris, FR",
    jobsCompleted: 54,
    averageRating: "4.9",
    responseTime: "2h",
    completionRate: "100%",
    overview: "Freelance fashion photographer and art director collaborating with high-street fashion labels and boutique jewelry brands on seasonal catalog campaigns and lookbooks.",
    verified: true,
    payoutSummary: {
      totalEarned: "$19,650.00",
      pendingPayout: "$2,100.00",
      platformFees: "$1,965.00",
      lastPayout: {
        date: "Jul 11, 2026",
        amount: "$3,400.00"
      }
    },
    portfolio: [
      "/images/portfolio_mono.png",
      "/images/portfolio_main.png",
      "/images/portfolio_warm.png"
    ],
    equipment: [
      "Fujifilm GFX 100S Medium Format",
      "GF 80mm f/1.7 R WR Lens",
      "Broncolor Siros 800 S Studio Lights"
    ],
    serviceAreas: {
      region: "Paris Metro & European Travel",
      places: ["Le Marais", "Montmartre", "Saint-Germain", "Versailles"],
      mapUrl: "/images/la_map.png"
    }
  }
};
