export const defaultFarmerProfile = {
  id: "FARMER-GUJ-8921",
  name: "Ramesh Patel",
  phone: "+91 98765 43210",
  experience: "14 Years",
  preferredLanguage: "en",
  location: {
    village: "Halol",
    district: "Panchmahal",
    state: "Gujarat",
    pincode: "389350",
    lat: 22.4988,
    lng: 73.4731,
    formatted: "Halol, Panchmahal, Gujarat"
  },
  farmSizeAcres: 4.5,
  soilType: "Black Cotton Soil (Regur)",
  irrigationType: "Drip Irrigation + Tube Well",
  primaryCrops: ["Cotton", "Wheat", "Tomato"]
};

export const locationDatabase = [
  { formatted: "Halol, Panchmahal, Gujarat", district: "Panchmahal", state: "Gujarat", lat: 22.4988, lng: 73.4731, avgRainfall: "850mm" },
  { formatted: "Vadodara, Gujarat", district: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812, avgRainfall: "920mm" },
  { formatted: "Anand, Gujarat", district: "Anand", state: "Gujarat", lat: 22.5645, lng: 72.9289, avgRainfall: "800mm" },
  { formatted: "Rajkot, Gujarat", district: "Rajkot", state: "Gujarat", lat: 22.3039, lng: 70.8022, avgRainfall: "650mm" },
  { formatted: "Bodeli, Chhota Udepur, Gujarat", district: "Chhota Udepur", state: "Gujarat", lat: 22.2592, lng: 73.7185, avgRainfall: "980mm" },
  { formatted: "Dhar, Madhya Pradesh", district: "Dhar", state: "Madhya Pradesh", lat: 22.5979, lng: 75.3045, avgRainfall: "900mm" },
  { formatted: "Nashik, Maharashtra", district: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898, avgRainfall: "1050mm" },
  { formatted: "Karnal, Haryana", district: "Karnal", state: "Haryana", lat: 29.6857, lng: 76.9905, avgRainfall: "700mm" }
];

export const mockCrops = [
  {
    id: "CROP-COTTON-01",
    name: "Cotton",
    variety: "Hybrid BG-II (Bt Cotton)",
    areaAcres: 2.5,
    sowingDate: "2026-06-12",
    expectedHarvest: "2026-11-20",
    currentStage: "Flowering & Boll Formation",
    stageProgressPercent: 62,
    healthScore: 84,
    healthStatus: "Good",
    risks: {
      pest: "Medium (Pink Bollworm Alert)",
      disease: "Low",
      weather: "Medium (Upcoming Heavy Rain)"
    },
    soilMoisture: "Optimal (68%)",
    npkStatus: "Nitrogen: Sufficient | Phosphorus: Good | Potassium: High",
    stages: [
      { name: "Sowing & Germination", dates: "June 12 - June 24", status: "completed", description: "Seeds germinated cleanly with 94% emergence rate." },
      { name: "Vegetative Growth", dates: "June 25 - July 28", status: "completed", description: "Healthy leaf expansion, first weeding & drip fertilisation done." },
      { name: "Flowering & Boll Formation", dates: "July 29 - Sept 25", status: "current", description: "Active square flowering stage. Monitor lower leaves for sucking pests." },
      { name: "Boll Maturation", dates: "Sept 26 - Oct 30", status: "upcoming", description: "Bolls opening phase. Irrigation should be reduced slightly." },
      { name: "Harvesting & Picking", dates: "Nov 01 - Nov 20", status: "upcoming", description: "First picking of seed cotton (Kapas)." }
    ],
    image: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CROP-WHEAT-02",
    name: "Wheat",
    variety: "GW-496 (High Yield Gujarat Strain)",
    areaAcres: 1.2,
    sowingDate: "2025-11-05",
    expectedHarvest: "2026-03-15",
    currentStage: "Vegetative Tillering",
    stageProgressPercent: 40,
    healthScore: 92,
    healthStatus: "Excellent",
    risks: {
      pest: "Low",
      disease: "Low",
      weather: "Low"
    },
    soilMoisture: "Good (72%)",
    npkStatus: "Nitrogen: Optimal | Phosphorus: Good | Potassium: Optimal",
    stages: [
      { name: "Sowing", dates: "Nov 05 - Nov 12", status: "completed", description: "Sown using seed drill with line spacing of 22.5cm." },
      { name: "Crown Root & Tillering", dates: "Nov 13 - Dec 20", status: "current", description: "Active tillering. First irrigation (CRI stage) completed." },
      { name: "Jointing & Booting", dates: "Dec 21 - Jan 25", status: "upcoming", description: "Stem elongation phase. Apply second dose of urea." },
      { name: "Heading & Flowering", dates: "Jan 26 - Feb 20", status: "upcoming", description: "Earhead emergence. Maintain uniform soil moisture." },
      { name: "Harvesting", dates: "Feb 21 - Mar 15", status: "upcoming", description: "Golden grain maturity and combine harvesting." }
    ],
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CROP-TOMATO-03",
    name: "Tomato",
    variety: "Pusa Ruby Hybrid",
    areaAcres: 0.8,
    sowingDate: "2026-01-15",
    expectedHarvest: "2026-05-10",
    currentStage: "Fruiting & Harvesting",
    stageProgressPercent: 88,
    healthScore: 78,
    healthStatus: "Moderate Risk",
    risks: {
      pest: "Medium (Whitefly)",
      disease: "High (Early Blight Spot)",
      weather: "Low"
    },
    soilMoisture: "Slightly Low (54%)",
    npkStatus: "Nitrogen: Low | Phosphorus: Good | Potassium: Medium",
    stages: [
      { name: "Nursery & Transplanting", dates: "Jan 15 - Feb 05", status: "completed", description: "Healthy sapling transplantation on raised beds." },
      { name: "Vegetative & Staking", dates: "Feb 06 - Mar 10", status: "completed", description: "Bamboos and GI wires installed for fruit support." },
      { name: "Flowering & Fruit Set", dates: "Mar 11 - Apr 15", status: "completed", description: "Good blossom retention with micro-nutrient spray." },
      { name: "Fruiting & Picking", dates: "Apr 16 - May 10", status: "current", description: "Active harvesting phase. Spray neem oil for whitefly control." }
    ],
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80"
  }
];

export const mockWeatherData = {
  current: {
    temp: 29,
    condition: "Partly Cloudy with Humidity",
    humidity: 78,
    windSpeed: 14,
    windDirection: "SW",
    rainProbability: 85,
    uvIndex: 6,
    dewPoint: "24°C",
    pressure: "1008 hPa",
    location: "Halol, Panchmahal, Gujarat"
  },
  agroImpact: {
    summary: "Heavy afternoon shower predicted. Irrigation is NOT recommended today for Cotton or Tomato crops.",
    recommendations: [
      "🌧️ Rain expected tomorrow (85% probability) - Postpone nitrogen fertilizer application to prevent runoff.",
      "💨 SW Winds at 14 km/h - Avoid pesticide spraying between 12:00 PM and 4:00 PM.",
      "💧 Soil moisture currently optimal (68%) due to humidity. Save pump electricity today."
    ]
  },
  hourly: [
    { time: "09:00 AM", temp: 27, rainProb: 20, icon: "CloudSun" },
    { time: "12:00 PM", temp: 31, rainProb: 45, icon: "Cloud" },
    { time: "03:00 PM", temp: 30, rainProb: 85, icon: "CloudRain" },
    { time: "06:00 PM", temp: 28, rainProb: 60, icon: "CloudRain" },
    { time: "09:00 PM", temp: 26, rainProb: 30, icon: "Cloud" },
    { time: "12:00 AM", temp: 25, rainProb: 15, icon: "Moon" }
  ],
  daily: [
    { day: "Today", date: "Aug 16", maxTemp: 31, minTemp: 24, rainProb: 85, condition: "Thunderstorms", icon: "CloudRain" },
    { day: "Sun", date: "Aug 17", maxTemp: 30, minTemp: 23, rainProb: 90, condition: "Heavy Rain", icon: "CloudRain" },
    { day: "Mon", date: "Aug 18", maxTemp: 32, minTemp: 25, rainProb: 40, condition: "Partly Cloudy", icon: "CloudSun" },
    { day: "Tue", date: "Aug 19", maxTemp: 33, minTemp: 25, rainProb: 20, condition: "Sunny / Clear", icon: "Sun" },
    { day: "Wed", date: "Aug 20", maxTemp: 32, minTemp: 24, rainProb: 30, condition: "Scattered Clouds", icon: "Cloud" },
    { day: "Thu", date: "Aug 21", maxTemp: 31, minTemp: 24, rainProb: 65, condition: "Moderate Rain", icon: "CloudRain" },
    { day: "Fri", date: "Aug 22", maxTemp: 30, minTemp: 23, rainProb: 50, condition: "Passing Showers", icon: "CloudRain" }
  ]
};

export const mockMandiRates = [
  {
    crop: "Cotton",
    variety: "Kapas BG-II Long Staple",
    unit: "Quintal",
    trend: "+4.2%",
    isUp: true,
    highestPrice: 7410,
    lowestPrice: 7150,
    markets: [
      { name: "Bodeli APMC Yard", district: "Chhota Udepur", price: 7410, change: "+₹350", distanceKm: 24, updated: "2 hours ago" },
      { name: "Halol Main Mandi", district: "Panchmahal", price: 7250, change: "+₹210", distanceKm: 4, updated: "30 mins ago" },
      { name: "Vadodara APMC Market", district: "Vadodara", price: 7380, change: "+₹180", distanceKm: 42, updated: "1 hour ago" },
      { name: "Anand Grain & Cotton Market", district: "Anand", price: 7190, change: "-₹60", distanceKm: 58, updated: "3 hours ago" }
    ],
    chartData: [
      { date: "Jul 18", price: 6850 },
      { date: "Jul 23", price: 6920 },
      { date: "Jul 28", price: 7010 },
      { date: "Aug 02", price: 7100 },
      { date: "Aug 07", price: 7080 },
      { date: "Aug 12", price: 7180 },
      { date: "Aug 16", price: 7250 }
    ]
  },
  {
    crop: "Wheat",
    variety: "GW-496 Sharbati Strain",
    unit: "Quintal",
    trend: "+1.8%",
    isUp: true,
    highestPrice: 2680,
    lowestPrice: 2490,
    markets: [
      { name: "Halol Main Mandi", district: "Panchmahal", price: 2620, change: "+₹40", distanceKm: 4, updated: "1 hour ago" },
      { name: "Vadodara APMC Market", district: "Vadodara", price: 2680, change: "+₹70", distanceKm: 42, updated: "2 hours ago" },
      { name: "Anand Market Yard", district: "Anand", price: 2580, change: "+₹20", distanceKm: 58, updated: "4 hours ago" }
    ],
    chartData: [
      { date: "Jul 18", price: 2510 },
      { date: "Jul 23", price: 2530 },
      { date: "Jul 28", price: 2550 },
      { date: "Aug 02", price: 2580 },
      { date: "Aug 07", price: 2600 },
      { date: "Aug 12", price: 2610 },
      { date: "Aug 16", price: 2620 }
    ]
  },
  {
    crop: "Tomato",
    variety: "Hybrid Red Round",
    unit: "Quintal",
    trend: "-3.5%",
    isUp: false,
    highestPrice: 1950,
    lowestPrice: 1650,
    markets: [
      { name: "Halol Vegetable Yard", district: "Panchmahal", price: 1750, change: "-₹75", distanceKm: 3, updated: "15 mins ago" },
      { name: "Vadodara Vegetable APMC", district: "Vadodara", price: 1950, change: "-₹40", distanceKm: 40, updated: "1 hour ago" },
      { name: "Padra Vegetable Market", district: "Vadodara", price: 1680, change: "-₹110", distanceKm: 54, updated: "2 hours ago" }
    ],
    chartData: [
      { date: "Jul 18", price: 2150 },
      { date: "Jul 23", price: 2100 },
      { date: "Jul 28", price: 2020 },
      { date: "Aug 02", price: 1950 },
      { date: "Aug 07", price: 1880 },
      { date: "Aug 12", price: 1810 },
      { date: "Aug 16", price: 1750 }
    ]
  }
];

export const mockFollowUpScans = [
  {
    id: "SCAN-COMPARE-8921",
    crop: "Tomato (Pusa Ruby)",
    issueName: "Early Blight (Alternaria solani)",
    day1Date: "2026-08-09 (7 Days Ago)",
    day1Image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80",
    day1HealthScore: 54,
    day1Symptoms: "Concentric brown spots with yellow halos on lower leaves",
    day7Date: "2026-08-16 (Today)",
    day7Image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80",
    day7HealthScore: 86,
    day7Symptoms: "New green leaf shoots emerging cleanly without dark fungal spots",
    status: "Improved",
    statusBadgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    recoveryPercent: 32,
    aiAnalysisNote: "Treatment with Copper Oxychloride 50% WP (2.5g/L) followed on Aug 10 proved effective. Fungal propagation halted. Soil moisture maintained optimally.",
    recommendedNextStep: "Apply one preventive organic neem oil spray (5ml/L) after tomorrow's expected rain."
  }
];

export const mockSchemes = [
  {
    id: "SCHEME-01",
    title: "PM-KISAN Samman Nidhi Yojana",
    dept: "Ministry of Agriculture & Farmers Welfare, Govt of India",
    category: "Financial Support",
    benefitAmount: "₹6,000 / year (3 installments of ₹2,000)",
    eligibility: "Small & Marginal Farmers owning cultivable land up to 2 Hectares.",
    isEligibleForUser: true,
    documentsRequired: ["Aadhaar Card", "Land Khatauni / Revenue Record", "Bank Account passbook linked with Aadhaar"],
    applicationProcess: "Online through PM-KISAN portal or via nearest CSC (Common Service Centre).",
    deadline: "Open All Year",
    officialLink: "https://pmkisan.gov.in"
  },
  {
    id: "SCHEME-02",
    title: "Gujarat Subsidized Drip & Micro Irrigation Scheme (GGRC)",
    dept: "Gujarat Green Revolution Company (GGRC) & Govt of Gujarat",
    category: "Subsidies & Equipment",
    benefitAmount: "70% to 85% Subsidy on Drip Irrigation System Installation",
    eligibility: "Farmers in Gujarat cultivating Cotton, Sugarcane, Vegetables, or Horticulture.",
    isEligibleForUser: true,
    documentsRequired: ["7/12 & 8-A Land Records", "Electricity Connection Copy", "Soil & Water Testing Report", "Bank Passbook"],
    applicationProcess: "Submit application at GGRC registered dealer or District Agriculture Officer.",
    deadline: "September 30, 2026",
    officialLink: "https://ggrc.co.in"
  },
  {
    id: "SCHEME-03",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    dept: "Department of Agriculture, Cooperation & Farmers Welfare",
    category: "Crop Insurance",
    benefitAmount: "Comprehensive risk insurance cover against drought, flood, pests & post-harvest losses",
    eligibility: "All farmers growing notified crops (Cotton, Wheat) in notified areas.",
    isEligibleForUser: true,
    documentsRequired: ["Sowing Certificate from Talati", "7/12 Land Copy", "Aadhaar Card", "Bank Passbook"],
    applicationProcess: "Through National Crop Insurance Portal (NCIP) or local bank branch.",
    deadline: "August 31, 2026 (Kharif Season)",
    officialLink: "https://pmfby.gov.in"
  }
];

export const mockNews = [
  {
    id: "NEWS-01",
    title: "KVK Panchmahal Issues Pink Bollworm Warning for Cotton Farmers in Halol & Kalol",
    category: "Local Advisory",
    date: "Aug 15, 2026",
    source: "Krishi Vigyan Kendra (KVK) Panchmahal",
    summary: "High atmospheric humidity over central Gujarat has created favorable conditions for Pink Bollworm moth emergence. Farmers are advised to install Pheromone traps @ 5 traps/acre.",
    imageUrl: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "NEWS-02",
    title: "Govt Approves 10% Additional Subsidy on Solar Water Pump Sets under PM-KUSUM",
    category: "Subsidies & Policy",
    date: "Aug 14, 2026",
    source: "PIB Gujarat",
    summary: "Farmers applying for off-grid solar agriculture pumps up to 7.5 HP will receive an extra 10% financial assistance from the state government, bringing total subsidy to 80%.",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "NEWS-03",
    title: "Monsoon Forecast: Widespread Rainfall Expected across Central & South Gujarat",
    category: "Weather Advisory",
    date: "Aug 16, 2026",
    source: "India Meteorological Department (IMD)",
    summary: "A low-pressure system over the Arabian Sea is moving towards the Saurashtra and Panchmahal regions, promising 60-90mm rainfall over the next 48 hours.",
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80"
  }
];

export const mockAlerts = [
  {
    id: "ALERT-01",
    severity: "critical",
    type: "Weather Alert",
    title: "Heavy Rainfall Forecast (85-95mm)",
    location: "Halol & Panchmahal Region",
    time: "Today, 02:30 PM",
    description: "IMD predicts heavy rain showers starting 3:00 PM today. Postpone all pesticide spraying and drain excess water from low-lying cotton fields.",
    actionText: "Check Weather Impact Advice"
  },
  {
    id: "ALERT-02",
    severity: "important",
    type: "Pest Warning",
    title: "Pink Bollworm Moth Emergence Detected",
    location: "Halol Cotton Belt",
    time: "Yesterday, 06:15 PM",
    description: "Light traps installed at KVK Halol showed 12 adult moths/trap. Inspect lower cotton bolls for rosette flowers or larval entry holes.",
    actionText: "Scan Leaf with Crop Doctor"
  },
  {
    id: "ALERT-03",
    severity: "advisory",
    type: "Market Alert",
    title: "Cotton Price Spike at Bodeli Mandi",
    location: "Bodeli APMC (24 km)",
    time: "Aug 16, 11:00 AM",
    description: "Cotton (Kapas BG-II) prices touched ₹7,410 / quintal (+₹350 rise). Best selling price in the district today.",
    actionText: "View Mandi Rates"
  }
];

export const mockExpertTickets = [
  {
    id: "TICKET-KVK-902",
    farmerName: "Ramesh Patel",
    farmerPhone: "+91 98765 43210",
    location: "Halol, Gujarat",
    crop: "Tomato (Pusa Ruby)",
    dateSubmitted: "2026-08-14 10:30 AM",
    issueSummary: "Severe dark brown spots spreading rapidly on lower leaves after rain",
    aiConfidence: "78% (Moderate)",
    aiInitialDiagnosis: "Early Blight (Alternaria solani)",
    status: "Resolved",
    statusColor: "emerald",
    expertName: "Dr. S. K. Sharma (Senior Agronomist, KVK Panchmahal)",
    expertResponse: "Diagnosis confirmed as Early Blight due to high humidity. Apply Copper Oxychloride 50% WP @ 2.5 g/liter of water. Avoid overhead sprinkler irrigation and prune infected lower leaves.",
    resolvedDate: "2026-08-14 02:45 PM",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TICKET-KVK-908",
    farmerName: "Ramesh Patel",
    farmerPhone: "+91 98765 43210",
    location: "Halol, Gujarat",
    crop: "Cotton (Hybrid BG-II)",
    dateSubmitted: "2026-08-16 08:15 AM",
    issueSummary: "Small pinkish larvae found inside opened flower buds",
    aiConfidence: "84% (High)",
    aiInitialDiagnosis: "Pink Bollworm (Pectinophora gossypiella)",
    status: "Under Review",
    statusColor: "amber",
    expertName: "Dr. Rekha Vyas (Entomologist, AAU Gujarat)",
    expertResponse: "Case currently assigned to field agronomist. Recommended installing 5 Pheromone traps immediately while sample is verified.",
    resolvedDate: "Pending",
    image: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=600&q=80"
  }
];

export const mockAIResponses = {
  yellowLeaves: {
    issue: "Nitrogen Deficiency OR Early Fungal Infection",
    confidence: 89,
    whyHappening: "High moisture coupled with heavy vegetative flowering draws nitrogen quickly from lower leaves. Heavy rains can also leach soil nitrate.",
    recommendedAction: "1. Apply 25kg Urea per acre via drip fertigation after rain stops.\n2. Spray 1% 19:19:19 NPK foliar solution on leaves early morning.",
    whatToAvoid: "Do NOT apply heavy chemical fertilizer directly before rain as it will wash into groundwater.",
    whenToCheck: "Re-examine leaves in 5 to 7 days. New leaves should emerge bright green.",
    whenToContactExpert: "If yellowing spreads to upper leaves with black concentric rings, contact KVK Agronomist immediately."
  },
  irrigateWheat: {
    issue: "Irrigation Scheduling Guidance (Crown Root Initiation)",
    confidence: 94,
    whyHappening: "Crown Root Initiation (CRI) stage occurs 20-25 days after sowing and is the most critical water sensitive stage for Wheat yield.",
    recommendedAction: "Irrigate lightly today with 4-5cm water depth. Ensure drainage channels are clear.",
    whatToAvoid: "Avoid waterlogging as young tillers cannot tolerate standing water for more than 12 hours.",
    whenToCheck: "Check soil moisture at 10cm depth 3 days after irrigation.",
    whenToContactExpert: "Contact expert if yellowing of leaf tips appears despite irrigation."
  },
  cottonPest: {
    issue: "Pink Bollworm (Pectinophora gossypiella) Risk",
    confidence: 86,
    whyHappening: "High atmospheric humidity (>75%) coupled with temperatures around 28-30°C encourages bollworm moth mating and egg laying.",
    recommendedAction: "1. Hang 5 Pheromone traps per acre at crop height.\n2. Spray Profenophos 50% EC @ 2ml/liter if trap catch exceeds 8 moths/night for 3 consecutive days.",
    whatToAvoid: "Do NOT use pyrethroid insecticides early in the season as they kill beneficial predator insects.",
    whenToCheck: "Inspect rosette flowers every morning.",
    whenToContactExpert: "If boll damage exceeds 10%, submit case to KVK officer for field inspection."
  }
};
