/**
 * AgriSaathi Comprehensive Agro-Climatic Intelligence Data & Generators
 * 
 * Features:
 * - Nationwide coverage across 12+ Indian Agro-Ecological Zones
 * - Dynamic Crop Lifecycle Generator (varieties, stages, sowing/harvest dates, health scores)
 * - Dynamic Local APMC Mandi Generator with realistic prices & 30-day price trends
 * - Dynamic Weather Radar & Agro-Meteorological Impact Advisories
 * - Dynamic Regional Pest & Weather Alerts
 * - State & Central Subsidy Schemes
 */

import { calculateHaversineDistance } from '../services/geoService';

export const defaultFarmerProfile = {
  id: "FARMER-IND-8921",
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
  agricultureType: "Commercial Cash Crop & Kharif-Rabi Multi-Cropping",
  primaryCrops: ["Cotton", "Wheat", "Tomato"]
};

/**
 * Agro-Climatic Zones & Regional Knowledge Base for India
 */
export const AGRO_REGIONS_DATABASE = [
  // GUJARAT
  {
    id: "GUJ-CENTRAL",
    district: "Panchmahal",
    village: "Halol",
    state: "Gujarat",
    pincode: "389350",
    lat: 22.4988,
    lng: 73.4731,
    formatted: "Halol, Panchmahal, Gujarat",
    agroZone: "Gujarat Plains & Hills (Semi-Arid Central Belt)",
    soilType: "Black Cotton Soil (Regur)",
    soilOptions: ["Black Cotton Soil (Regur)", "Medium Black Loam", "Alluvial Sandy Loam"],
    irrigationType: "Drip Irrigation + Tube Well",
    agricultureType: "Intensive Cash Crop & Commercial Horticulture",
    avgRainfall: "850mm",
    primaryCrops: ["Cotton", "Wheat", "Tomato"],
    secondaryCrops: ["Maize", "Groundnut", "Castor"],
    mandiYardNames: [
      { name: "Bodeli APMC Yard", district: "Chhota Udepur", distanceKm: 24 },
      { name: "Halol Main Mandi", district: "Panchmahal", distanceKm: 4 },
      { name: "Vadodara APMC Market", district: "Vadodara", distanceKm: 42 },
      { name: "Anand Grain & Cotton Market", district: "Anand", distanceKm: 58 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-GUJ-GGRC",
        title: "Gujarat Green Revolution Micro-Irrigation Subsidy (GGRC)",
        dept: "Gujarat Green Revolution Company & Govt of Gujarat",
        category: "Subsidies & Equipment",
        benefitAmount: "70% to 85% Subsidy on Drip & Sprinkler Installation",
        eligibility: "Farmers in Gujarat cultivating Cotton, Vegetables, or Horticulture.",
        isEligibleForUser: true,
        documentsRequired: ["7/12 & 8-A Land Records", "Electricity Connection Copy", "Soil & Water Testing Report", "Bank Passbook"],
        applicationProcess: "Online through GGRC portal or through registered local drip dealer.",
        deadline: "September 30, 2026",
        officialLink: "https://ggrc.co.in"
      },
      {
        id: "SCHEME-GUJ-SOLAR",
        title: "Kisan Suryodaya Yojana Gujarat",
        dept: "Gujarat Urja Vikas Nigam Limited (GUVNL)",
        category: "Power & Infrastructure",
        benefitAmount: "Day-time agricultural electricity supply for irrigation (5 AM - 9 PM)",
        eligibility: "All farmers with active agricultural power connection in Gujarat.",
        isEligibleForUser: true,
        documentsRequired: ["Electricity Consumer Number", "7/12 Land Record", "Aadhaar Card"],
        applicationProcess: "Automated transition via local DISCOM sub-station.",
        deadline: "Open All Year",
        officialLink: "https://guvnl.com"
      }
    ]
  },
  {
    id: "GUJ-VADODARA",
    district: "Vadodara",
    village: "Padra",
    state: "Gujarat",
    pincode: "391440",
    lat: 22.3072,
    lng: 73.1812,
    formatted: "Vadodara, Gujarat",
    agroZone: "Middle Gujarat Alluvial Zone",
    soilType: "Deep Alluvial Loam & Medium Black Soil",
    soilOptions: ["Deep Alluvial Loam", "Medium Black Soil", "Sandy Loam (Goradu)"],
    irrigationType: "Narmada Canal Lift + Drip Irrigation",
    agricultureType: "Vegetable & Commercial Multi-Cropping",
    avgRainfall: "920mm",
    primaryCrops: ["Tomato", "Cotton", "Wheat"],
    secondaryCrops: ["Banana", "Papaya", "Pigeon Pea (Tur)"],
    mandiYardNames: [
      { name: "Vadodara APMC Sayajipura", district: "Vadodara", distanceKm: 6 },
      { name: "Padra Vegetable Market", district: "Vadodara", distanceKm: 14 },
      { name: "Karjan Cotton Yard", district: "Vadodara", distanceKm: 28 },
      { name: "Anand Market Yard", district: "Anand", distanceKm: 38 }
    ],
    stateSchemes: []
  },
  {
    id: "GUJ-SAURASHTRA",
    district: "Rajkot",
    village: "Gondal",
    state: "Gujarat",
    pincode: "360001",
    lat: 22.3039,
    lng: 70.8022,
    formatted: "Rajkot, Gujarat",
    agroZone: "North Saurashtra Agro-Climatic Zone",
    soilType: "Medium Black Calcareous Soil",
    soilOptions: ["Medium Black Calcareous Soil", "Shallow Black Soil", "Red Gravelly Soil"],
    irrigationType: "Drip Irrigation + Borewell & Farm Pond",
    agricultureType: "Cash Crops, Oilseeds & Spices",
    avgRainfall: "650mm",
    primaryCrops: ["Groundnut", "Cotton", "Cumin"],
    secondaryCrops: ["Sesame", "Wheat", "Castor"],
    mandiYardNames: [
      { name: "Gondal APMC (Asia's Top Groundnut Mandi)", district: "Rajkot", distanceKm: 12 },
      { name: "Rajkot Bedi APMC Market Yard", district: "Rajkot", distanceKm: 8 },
      { name: "Morbi Spices Mandi", district: "Morbi", distanceKm: 46 },
      { name: "Jasdan Grain Yard", district: "Rajkot", distanceKm: 52 }
    ],
    stateSchemes: []
  },

  // PUNJAB & HARYANA (TRANS-GANGETIC PLAINS)
  {
    id: "PUN-LUDHIANA",
    district: "Ludhiana",
    village: "Khanna",
    state: "Punjab",
    pincode: "141401",
    lat: 30.9010,
    lng: 75.8573,
    formatted: "Ludhiana, Punjab",
    agroZone: "Trans-Gangetic Plain (Central Alluvial Food-Grain Zone)",
    soilType: "Indo-Gangetic Fertile Alluvial Loam",
    soilOptions: ["Indo-Gangetic Fertile Alluvial Loam", "Sandy Loam Soil", "Clayey Silt Loam"],
    irrigationType: "Canal Gravity + Submersible Deep Tube Well",
    agricultureType: "High-Yield Intensive Cereal & Wheat-Paddy Rotation",
    avgRainfall: "680mm",
    primaryCrops: ["Wheat", "Paddy", "Mustard"],
    secondaryCrops: ["Maize", "Potato", "Sugarcane"],
    mandiYardNames: [
      { name: "Khanna Grain Market (Asia's Largest)", district: "Ludhiana", distanceKm: 15 },
      { name: "Ludhiana New APMC Yard", district: "Ludhiana", distanceKm: 6 },
      { name: "Jagraon Grain Mandi", district: "Ludhiana", distanceKm: 34 },
      { name: "Sirhind APMC", district: "Fatehgarh Sahib", distanceKm: 40 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-PUN-DSR",
        title: "Punjab Direct Seeded Rice (DSR) ₹1,500/Acre Incentive",
        dept: "Department of Agriculture & Farmers Welfare, Govt of Punjab",
        category: "Subsidies",
        benefitAmount: "₹1,500 per Acre direct bank transfer for water-saving direct seeded paddy",
        eligibility: "Farmers in Punjab adopting DSR technique instead of traditional puddling.",
        isEligibleForUser: true,
        documentsRequired: ["Aadhaar Card", "Land Jamabandi Copy", "Bank Passbook"],
        applicationProcess: "Register on Anaj Kharid Portal (AgriPunjab).",
        deadline: "July 31, 2026",
        officialLink: "https://agri.punjab.gov.in"
      },
      {
        id: "SCHEME-PUN-CRM",
        title: "Crop Residue Management (CRM) Machinery Subsidy",
        dept: "Punjab Agriculture Department",
        category: "Subsidies & Equipment",
        benefitAmount: "50% to 80% Subsidy on Happy Seeder, Super Seeder, and Straw Mulchers",
        eligibility: "Individual farmers and Custom Hiring Centers (CHCs) in Punjab.",
        isEligibleForUser: true,
        documentsRequired: ["Tractor Registration RC", "Aadhaar Card", "Land Records"],
        applicationProcess: "Apply on the CRM portal of Punjab Agriculture.",
        deadline: "October 15, 2026",
        officialLink: "https://agrimachinerypb.com"
      }
    ]
  },
  {
    id: "HAR-KARNAL",
    district: "Karnal",
    village: "Taraori",
    state: "Haryana",
    pincode: "132001",
    lat: 29.6857,
    lng: 76.9905,
    formatted: "Karnal, Haryana",
    agroZone: "Trans-Gangetic Eastern Agro-Climatic Zone",
    soilType: "Fine Indo-Gangetic Alluvial Silt Loam",
    soilOptions: ["Fine Indo-Gangetic Alluvial Silt Loam", "Loamy Sand", "Clayey Loam"],
    irrigationType: "Western Yamuna Canal + Solar Tube Well",
    agricultureType: "Basmati Rice & Golden Wheat Production Belt",
    avgRainfall: "700mm",
    primaryCrops: ["Wheat", "Paddy", "Mustard"],
    secondaryCrops: ["Sugarcane", "Potato", "Sunflower"],
    mandiYardNames: [
      { name: "Karnal New Grain Market", district: "Karnal", distanceKm: 4 },
      { name: "Taraori Basmati Rice Mandi", district: "Karnal", distanceKm: 14 },
      { name: "Gharaunda Vegetable Terminal", district: "Karnal", distanceKm: 18 },
      { name: "Panipat Grain Market Yard", district: "Panipat", distanceKm: 32 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-HAR-MKBK",
        title: "Mera Pani Meri Virasat Yojana Haryana",
        dept: "Department of Agriculture, Govt of Haryana",
        category: "Direct Income & Water Conservation",
        benefitAmount: "₹7,000 per Acre incentive for shifting from Paddy to Maize/Pulses/Cotton",
        eligibility: "Farmers in Haryana who replace paddy cultivation with alternate crops.",
        isEligibleForUser: true,
        documentsRequired: ["Meri Fasal Mera Byora (MFMB) Registration", "Aadhaar", "Bank Details"],
        applicationProcess: "Apply online at fasal.haryana.gov.in.",
        deadline: "August 15, 2026",
        officialLink: "https://fasal.haryana.gov.in"
      }
    ]
  },

  // MAHARASHTRA (WESTERN DECCAN PLATEAU)
  {
    id: "MAH-NASHIK",
    district: "Nashik",
    village: "Lasalgaon",
    state: "Maharashtra",
    pincode: "422001",
    lat: 19.9975,
    lng: 73.7898,
    formatted: "Nashik, Maharashtra",
    agroZone: "Western Deccan Plateau & Ghat Zone",
    soilType: "Black Basaltic Soil & Red Lateritic Loam",
    soilOptions: ["Black Basaltic Soil", "Red Lateritic Loam", "Medium Deep Black Soil"],
    irrigationType: "Drip Irrigation + Farm Pond (Shettale) + Well",
    agricultureType: "Horticulture, Grapes, Onions & Cash Crops",
    avgRainfall: "1050mm",
    primaryCrops: ["Soybean", "Tomato", "Sugarcane"],
    secondaryCrops: ["Cotton", "Wheat", "Maize"],
    mandiYardNames: [
      { name: "Lasalgaon APMC (Asia's Largest Onion Market)", district: "Nashik", distanceKm: 22 },
      { name: "Nashik Dindori Vegetable APMC", district: "Nashik", distanceKm: 8 },
      { name: "Pimpalgaon Baswant Tomato Market", district: "Nashik", distanceKm: 26 },
      { name: "Yeola Silk & Grain Mandi", district: "Nashik", distanceKm: 48 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-MAH-POCRA",
        title: "Maharashtra Nanaji Deshmukh Krishi Sanjivani Yojana (PoCRA)",
        dept: "Department of Agriculture, Govt of Maharashtra",
        category: "Subsidies & Climate Resilience",
        benefitAmount: "75% subsidy on Farm Ponds, Shade-Net Houses, and Drip Irrigation",
        eligibility: "Small and marginal farmers in climate-vulnerable drought/saline villages.",
        isEligibleForUser: true,
        documentsRequired: ["7/12 Extract", "8-A Extract", "Aadhaar Card", "Bank Passbook"],
        applicationProcess: "Apply via MahaDBT / PoCRA online portal.",
        deadline: "Open All Year",
        officialLink: "https://dbt.mahagov.in"
      },
      {
        id: "SCHEME-MAH-FARM-POND",
        title: "Magel Tyala Shettale Scheme Maharashtra",
        dept: "Govt of Maharashtra",
        category: "Subsidies & Water Storage",
        benefitAmount: "₹50,000 to ₹75,000 direct subsidy for farm pond construction and plastic lining",
        eligibility: "Farmers with minimum 0.50 Hectare land in Maharashtra.",
        isEligibleForUser: true,
        documentsRequired: ["7/12 Land Copy", "Aadhaar Card", "Bank Account Details"],
        applicationProcess: "Online application via MahaDBT portal.",
        deadline: "December 31, 2026",
        officialLink: "https://mahadbt.maharashtra.gov.in"
      }
    ]
  },
  {
    id: "MAH-NAGPUR",
    district: "Nagpur",
    village: "Katol",
    state: "Maharashtra",
    pincode: "440001",
    lat: 21.1458,
    lng: 79.0882,
    formatted: "Nagpur, Maharashtra",
    agroZone: "Vidarbha Eastern Plateau & Hills",
    soilType: "Deep Heavy Black Cotton Clay Soil",
    soilOptions: ["Deep Heavy Black Cotton Clay Soil", "Red & Yellow Loam", "Shallow Murrum Soil"],
    irrigationType: "Borewell + Micro-Drip Irrigation",
    agricultureType: "Cotton, Soybean & Citrus Production",
    avgRainfall: "1150mm",
    primaryCrops: ["Cotton", "Soybean", "Wheat"],
    secondaryCrops: ["Pigeon Pea (Tur)", "Gram", "Maize"],
    mandiYardNames: [
      { name: "Nagpur Kalamna APMC Market", district: "Nagpur", distanceKm: 7 },
      { name: "Katol Orange & Cotton Mandi", district: "Nagpur", distanceKm: 32 },
      { name: "Hinganghat Cotton Market Yard", district: "Wardha", distanceKm: 65 },
      { name: "Saoner Grain APMC", district: "Nagpur", distanceKm: 28 }
    ],
    stateSchemes: []
  },

  // MADHYA PRADESH (CENTRAL PLATEAU & MALWA)
  {
    id: "MP-DHAR",
    district: "Dhar",
    village: "Badnawar",
    state: "Madhya Pradesh",
    pincode: "454001",
    lat: 22.5979,
    lng: 75.3045,
    formatted: "Dhar, Madhya Pradesh",
    agroZone: "Malwa Plateau Black Soil Agro-Climatic Zone",
    soilType: "Rich Malwa Deep Black Soil (Vertisol)",
    soilOptions: ["Rich Malwa Deep Black Soil", "Medium Black Loam", "Clayey Silt"],
    irrigationType: "Tube Well + Sprinkler & Check Dam Lift",
    agricultureType: "Soybean, Sharbati Wheat & Gram Production",
    avgRainfall: "900mm",
    primaryCrops: ["Soybean", "Wheat", "Tomato"],
    secondaryCrops: ["Mustard", "Maize", "Cotton"],
    mandiYardNames: [
      { name: "Dhar Krishi Upaj Mandi", district: "Dhar", distanceKm: 5 },
      { name: "Badnawar Garlic & Grain APMC", district: "Dhar", distanceKm: 28 },
      { name: "Indore Laxmibai Nagar APMC", district: "Indore", distanceKm: 54 },
      { name: "Ujjain Grain Market Yard", district: "Ujjain", distanceKm: 72 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-MP-KALYAN",
        title: "Mukhyamantri Kisan Kalyan Yojana (MP)",
        dept: "Revenue & Agriculture Department, Govt of MP",
        category: "Direct Income",
        benefitAmount: "₹6,000 per year (3 installments of ₹2,000) over & above PM-KISAN (Total ₹12,000/yr)",
        eligibility: "All beneficiaries of PM-KISAN residing in Madhya Pradesh.",
        isEligibleForUser: true,
        documentsRequired: ["PM-KISAN ID", "Samagra ID", "Aadhaar Card", "Bank Account linked with NPCI"],
        applicationProcess: "Through local Patwari or MP SAARA portal.",
        deadline: "Open All Year",
        officialLink: "https://saara.mp.gov.in"
      }
    ]
  },
  {
    id: "MP-INDORE",
    district: "Indore",
    village: "Sanwer",
    state: "Madhya Pradesh",
    pincode: "452001",
    lat: 22.7196,
    lng: 75.8577,
    formatted: "Indore, Madhya Pradesh",
    agroZone: "Malwa Agro-Climatic Zone",
    soilType: "Deep Black Cotton Soil",
    soilOptions: ["Deep Black Cotton Soil", "Medium Black Loam"],
    irrigationType: "Sprinkler + Tube Well",
    agricultureType: "Commercial Oilseed & Sharbati Wheat",
    avgRainfall: "950mm",
    primaryCrops: ["Soybean", "Wheat", "Maize"],
    secondaryCrops: ["Mustard", "Tomato", "Cotton"],
    mandiYardNames: [
      { name: "Indore Laxmibai Nagar Krishi Upaj Mandi", district: "Indore", distanceKm: 6 },
      { name: "Sanwer APMC Yard", district: "Indore", distanceKm: 24 },
      { name: "Dewas Grain Mandi", district: "Dewas", distanceKm: 36 },
      { name: "Mhow APMC Yard", district: "Indore", distanceKm: 28 }
    ],
    stateSchemes: []
  },

  // UTTAR PRADESH & BIHAR (GANGETIC PLAINS)
  {
    id: "UP-MEERUT",
    district: "Meerut",
    village: "Daurala",
    state: "Uttar Pradesh",
    pincode: "250001",
    lat: 28.9845,
    lng: 77.7064,
    formatted: "Meerut, Uttar Pradesh",
    agroZone: "Upper Gangetic Plain (Sugarcane-Wheat Intensive Belt)",
    soilType: "Rich Indo-Gangetic Alluvial Silt Loam",
    soilOptions: ["Rich Indo-Gangetic Alluvial Silt Loam", "Clay Loam Soil", "Sandy Loam"],
    irrigationType: "Upper Ganga Canal Network + Electric Tube Well",
    agricultureType: "High-Density Sugarcane, Wheat & Potato Belt",
    avgRainfall: "820mm",
    primaryCrops: ["Sugarcane", "Wheat", "Mustard"],
    secondaryCrops: ["Paddy", "Maize", "Tomato"],
    mandiYardNames: [
      { name: "Meerut Naveen Mandi Sthal", district: "Meerut", distanceKm: 5 },
      { name: "Daurala Sugarcane Terminal", district: "Meerut", distanceKm: 16 },
      { name: "Muzaffarnagar Gur & Sugar APMC", district: "Muzaffarnagar", distanceKm: 45 },
      { name: "Hapur Grain & Jaggery Market", district: "Hapur", distanceKm: 32 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-UP-PARADARSHI",
        title: "UP Paradarshi Kisan Seva Yojana",
        dept: "Department of Agriculture, Govt of Uttar Pradesh",
        category: "Subsidies & Seeds",
        benefitAmount: "50% DBT subsidy on certified high-yield seeds, solar pumps, and farm equipment",
        eligibility: "Farmers in Uttar Pradesh registered on the UP Agriculture Portal.",
        isEligibleForUser: true,
        documentsRequired: ["Khasra/Khatauni Land Record", "Aadhaar Card", "Bank Passbook"],
        applicationProcess: "Register online on upagriculture.com.",
        deadline: "Open All Year",
        officialLink: "https://upagriculture.com"
      }
    ]
  },
  {
    id: "UP-VARANASI",
    district: "Varanasi",
    village: "Pindra",
    state: "Uttar Pradesh",
    pincode: "221001",
    lat: 25.3176,
    lng: 82.9739,
    formatted: "Varanasi, Uttar Pradesh",
    agroZone: "Middle Gangetic Plain Agro-Climatic Zone",
    soilType: "Fertile Alluvial Loam & Gangetic Clay",
    soilOptions: ["Fertile Alluvial Loam", "Gangetic Clay", "Sandy Alluvium (Khadar)"],
    irrigationType: "Borewell + Canal Lift",
    agricultureType: "Vegetable, Paddy & Mustard Multi-Cropping",
    avgRainfall: "1020mm",
    primaryCrops: ["Paddy", "Wheat", "Tomato"],
    secondaryCrops: ["Mustard", "Sugarcane", "Maize"],
    mandiYardNames: [
      { name: "Varanasi Chandpur APMC Mandi", district: "Varanasi", distanceKm: 6 },
      { name: "Pindra Vegetable Terminal", district: "Varanasi", distanceKm: 22 },
      { name: "Mirzapur Grain Market Yard", district: "Mirzapur", distanceKm: 42 },
      { name: "Jaunpur Grain APMC", district: "Jaunpur", distanceKm: 48 }
    ],
    stateSchemes: []
  },

  // RAJASTHAN (WESTERN DRY & SEMI-ARID ZONE)
  {
    id: "RAJ-KOTA",
    district: "Kota",
    village: "Ramganj Mandi",
    state: "Rajasthan",
    pincode: "324001",
    lat: 25.2138,
    lng: 75.8648,
    formatted: "Kota, Rajasthan",
    agroZone: "South-Eastern Humid Plain (Hadoti Belt)",
    soilType: "Deep Black Fertile Clayey Soil & Loamy Sand",
    soilOptions: ["Deep Black Fertile Clayey Soil", "Loamy Sand", "Alluvial Riverbed Soil"],
    irrigationType: "Chambal Left/Right Canal + Drip System",
    agricultureType: "Soybean, Mustard, Spices & Wheat Production",
    avgRainfall: "760mm",
    primaryCrops: ["Mustard", "Soybean", "Wheat"],
    secondaryCrops: ["Maize", "Cotton", "Paddy"],
    mandiYardNames: [
      { name: "Bhamashah Mandi Kota (Rajasthan's Largest)", district: "Kota", distanceKm: 6 },
      { name: "Ramganj Mandi (Coriander & Spices Capital)", district: "Kota", distanceKm: 38 },
      { name: "Baran Krishi Upaj Mandi", district: "Baran", distanceKm: 46 },
      { name: "Bundi Grain Market Yard", district: "Bundi", distanceKm: 34 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-RAJ-KTSY",
        title: "Rajasthan Kisan Seva Sathi Drip & Solar Grant",
        dept: "Department of Agriculture, Govt of Rajasthan",
        category: "Subsidies",
        benefitAmount: "70% to 75% subsidy on Drip/Sprinkler Systems and Solar Ag Pumps under PM-KUSUM",
        eligibility: "Farmers owning agricultural land with functional irrigation source in Rajasthan.",
        isEligibleForUser: true,
        documentsRequired: ["Jamabandi (Nakal)", "Jan Aadhaar Card", "Bank Account Details"],
        applicationProcess: "Apply via RajKisan Sathi Portal (rajkisan.rajasthan.gov.in).",
        deadline: "September 30, 2026",
        officialLink: "https://rajkisan.rajasthan.gov.in"
      }
    ]
  },

  // SOUTH INDIA (KERALA, TAMIL NADU, KARNATAKA, ANDHRA)
  {
    id: "KER-PALAKKAD",
    district: "Palakkad",
    village: "Chittur",
    state: "Kerala",
    pincode: "678001",
    lat: 10.7867,
    lng: 76.6548,
    formatted: "Palakkad, Kerala",
    agroZone: "West Coast & Palakkad Gap Tropical Humid Agro-Zone",
    soilType: "Laterite Clay Soil & Wetland Alluvial Loam",
    soilOptions: ["Laterite Clay Soil", "Wetland Alluvial Loam", "Forest Loam"],
    irrigationType: "Monsoon Rainfed + River Lift & Micro-Sprinkler",
    agricultureType: "Paddy Granary, Coconut, Spices & Agroforestry",
    avgRainfall: "2100mm",
    primaryCrops: ["Paddy", "Tomato", "Sugarcane"],
    secondaryCrops: ["Maize", "Cotton", "Soybean"],
    mandiYardNames: [
      { name: "Palakkad Wholesale Agricultural Market Yard", district: "Palakkad", distanceKm: 4 },
      { name: "Chittur Paddy APMC Centre", district: "Palakkad", distanceKm: 16 },
      { name: "Alathur Spice & Grain Yard", district: "Palakkad", distanceKm: 22 },
      { name: "Coimbatore APMC Terminal", district: "Coimbatore", distanceKm: 52 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-KER-SUBHIKSHA",
        title: "Subhiksha Keralam Food Security & Paddy Royalty Scheme",
        dept: "Department of Agriculture Development & Farmers' Welfare, Govt of Kerala",
        category: "Direct Income & Subsidies",
        benefitAmount: "₹3,000 per Hectare/season Paddy Royalty direct to farmer's account",
        eligibility: "Farmers engaged in active wetland paddy farming in Kerala.",
        isEligibleForUser: true,
        documentsRequired: ["AIMS Kerala Portal ID", "Tax Receipt", "Aadhaar Card", "Bank Passbook"],
        applicationProcess: "Register on AIMS portal (aims.kerala.gov.in) via Krishibhavan.",
        deadline: "Open All Year",
        officialLink: "https://aims.kerala.gov.in"
      }
    ]
  },
  {
    id: "TN-COIMBATORE",
    district: "Coimbatore",
    village: "Pollachi",
    state: "Tamil Nadu",
    pincode: "641001",
    lat: 11.0168,
    lng: 76.9558,
    formatted: "Coimbatore, Tamil Nadu",
    agroZone: "Western Agro-Climatic Zone of Tamil Nadu",
    soilType: "Red & Yellow Sandy Loam Soil & Clay",
    soilOptions: ["Red & Yellow Sandy Loam Soil", "Black Clay Soil", "Laterite Soil"],
    irrigationType: "Borewell Drip + Parambikulam Aliyar Canal",
    agricultureType: "Cash Crops, Sugarcane, Cotton & Commercial Vegetables",
    avgRainfall: "720mm",
    primaryCrops: ["Cotton", "Sugarcane", "Tomato"],
    secondaryCrops: ["Paddy", "Maize", "Groundnut"],
    mandiYardNames: [
      { name: "Coimbatore Regulated Market Yard", district: "Coimbatore", distanceKm: 5 },
      { name: "Pollachi Coconut & Veg Terminal", district: "Coimbatore", distanceKm: 36 },
      { name: "Tiruppur Cotton APMC", district: "Tiruppur", distanceKm: 48 },
      { name: "Erode Turmeric & Sugarcane Market", district: "Erode", distanceKm: 78 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-TN-UZHAVAN",
        title: "Kalaignarin All Village Integrated Agriculture Development Programme",
        dept: "Agriculture & Farmers Welfare Department, Govt of Tamil Nadu",
        category: "Subsidies & Farm Mechanisation",
        benefitAmount: "100% subsidy on micro-irrigation for small/marginal farmers (75% for other farmers)",
        eligibility: "All landowning farmers in Tamil Nadu registered on Uzhavan App.",
        isEligibleForUser: true,
        documentsRequired: ["Patta / Chitta", "Aadhaar Card", "Uzhavan App Registration"],
        applicationProcess: "Apply through Uzhavan Mobile App or local AEC office.",
        deadline: "Open All Year",
        officialLink: "https://tnhorticulture.tn.gov.in"
      }
    ]
  },
  {
    id: "AP-GUNTUR",
    district: "Guntur",
    village: "Tenali",
    state: "Andhra Pradesh",
    pincode: "522002",
    lat: 16.3067,
    lng: 80.4365,
    formatted: "Guntur, Andhra Pradesh",
    agroZone: "Krishna-Godavari Coastal Delta Zone",
    soilType: "Deep Heavy Black Clay & Coastal Alluvium",
    soilOptions: ["Deep Heavy Black Clay", "Coastal Alluvium", "Red Sandy Loam"],
    irrigationType: "Krishna Delta Canal + Drip Fertigation",
    agricultureType: "Commercial Cash Crops, Chilli, Cotton & High-Yield Rice",
    avgRainfall: "980mm",
    primaryCrops: ["Cotton", "Paddy", "Tomato"],
    secondaryCrops: ["Maize", "Sugarcane", "Soybean"],
    mandiYardNames: [
      { name: "Guntur Mirchi & Commercial Yard (Asia's Largest)", district: "Guntur", distanceKm: 6 },
      { name: "Tenali Paddy & Veg Market", district: "Guntur", distanceKm: 26 },
      { name: "Vijayawada Gollapudi APMC", district: "NTR Krishna", distanceKm: 34 },
      { name: "Narasaraopet Cotton Market", district: "Palnadu", distanceKm: 45 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-AP-RYTHU-BHAROSA",
        title: "YSR Rythu Bharosa - PM KISAN",
        dept: "Agriculture Department, Govt of Andhra Pradesh",
        category: "Direct Income",
        benefitAmount: "₹13,500 per year financial assistance to farmer families",
        eligibility: "All landholder farmer families including ROFR forest cultivators in AP.",
        isEligibleForUser: true,
        documentsRequired: ["Webland 1B Record", "Aadhaar Card", "Bank Account linked to Aadhaar"],
        applicationProcess: "Verification by Village Agriculture Assistant (Rythu Bharosa Kendra).",
        deadline: "Open All Year",
        officialLink: "https://ysrrythubharosa.ap.gov.in"
      }
    ]
  },

  // EAST & HIMALAYAS
  {
    id: "WB-BURDWAN",
    district: "Purba Bardhaman",
    village: "Burdwan",
    state: "West Bengal",
    pincode: "713101",
    lat: 23.2324,
    lng: 87.8615,
    formatted: "Burdwan, West Bengal",
    agroZone: "Lower Gangetic Plain (Rice Bowl of Bengal)",
    soilType: "Gangetic Deltaic Alluvial Loam",
    soilOptions: ["Gangetic Deltaic Alluvial Loam", "Clayey Silt Loam", "Laterite Soil"],
    irrigationType: "Damodar Valley Canal + Shallow Tube Well",
    agricultureType: "Multi-Season Rice (Aman/Boro), Potato & Mustard",
    avgRainfall: "1450mm",
    primaryCrops: ["Paddy", "Mustard", "Tomato"],
    secondaryCrops: ["Wheat", "Sugarcane", "Maize"],
    mandiYardNames: [
      { name: "Burdwan Central Rice APMC Yard", district: "Purba Bardhaman", distanceKm: 4 },
      { name: "Memari Potato & Grain Terminal", district: "Purba Bardhaman", distanceKm: 28 },
      { name: "Kalna Vegetable Market", district: "Purba Bardhaman", distanceKm: 36 },
      { name: "Hooghly Tarkeshwar Potato Mandi", district: "Hooghly", distanceKm: 58 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-WB-KRISHAK-BANDHU",
        title: "Krishak Bandhu (Natun) Scheme West Bengal",
        dept: "Department of Agriculture, Govt of West Bengal",
        category: "Direct Income & Social Security",
        benefitAmount: "₹10,000 per year (2 installments) + ₹2,00,000 Death Benefit Insurance",
        eligibility: "All farmers and recorded Bhagchasi (sharecroppers) in West Bengal.",
        isEligibleForUser: true,
        documentsRequired: ["RoR (Parcha) Copy", "Voter ID Card", "Aadhaar Card", "Bank Passbook"],
        applicationProcess: "Apply at local Block Development Office or matirkatha.gov.in.",
        deadline: "Open All Year",
        officialLink: "https://matirkatha.gov.in"
      }
    ]
  },
  {
    id: "HP-SHIMLA",
    district: "Shimla",
    village: "Theog",
    state: "Himachal Pradesh",
    pincode: "171001",
    lat: 31.1048,
    lng: 77.1734,
    formatted: "Shimla, Himachal Pradesh",
    agroZone: "Western Himalayan Temperate Horticulture Zone",
    soilType: "Brown Mountain Loamy Soil with High Organic Humus",
    soilOptions: ["Brown Mountain Loamy Soil", "Humus-Rich Forest Loam", "Gravelly Silt"],
    irrigationType: "Gravity Stream Kuhl + Micro-Drip Irrigation",
    agricultureType: "Temperate Horticulture & Off-Season Mountain Vegetables",
    avgRainfall: "1500mm",
    primaryCrops: ["Tomato", "Wheat", "Maize"],
    secondaryCrops: ["Mustard", "Soybean", "Paddy"],
    mandiYardNames: [
      { name: "Dhalli Fruit & Vegetable APMC Shimla", district: "Shimla", distanceKm: 6 },
      { name: "Theog Fruit Terminal", district: "Shimla", distanceKm: 28 },
      { name: "Solan Agriculture Market Yard", district: "Solan", distanceKm: 42 },
      { name: "Parwanoo Terminal Fruit Mandi", district: "Solan", distanceKm: 78 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-HP-MKSY",
        title: "Mukhya Mantri Kisaan Evam Khetihar Mazdoor Suraksha Yojana",
        dept: "Department of Agriculture, Himachal Pradesh",
        category: "Subsidies & Protection",
        benefitAmount: "85% subsidy on Anti-Hail Nets, Polyhouses, and Solar Fencing against wild animals",
        eligibility: "Farmers owning agricultural/horticultural land in Himachal Pradesh.",
        isEligibleForUser: true,
        documentsRequired: ["Land Nakal", "Bonafide Himachali Certificate", "Aadhaar Card"],
        applicationProcess: "Apply via Himachal Krishi Portal (hpagriculture.com).",
        deadline: "Open All Year",
        officialLink: "https://hpagriculture.com"
      }
    ]
  },

  // BIHAR
  {
    id: "BIH-PATNA",
    district: "Patna",
    village: "Danapur",
    state: "Bihar",
    pincode: "800001",
    lat: 25.5941,
    lng: 85.1376,
    formatted: "Patna, Bihar",
    agroZone: "South Bihar Alluvial Plain Zone",
    soilType: "Gangetic Heavy Clay & Sandy Loam",
    soilOptions: ["Gangetic Heavy Clay", "Sandy Loam", "Calcareous Alluvium"],
    irrigationType: "Sone Canal + Diesel/Electric Tube Well",
    agricultureType: "Paddy-Wheat Multi-Cropping & High-Yield Maize",
    avgRainfall: "1100mm",
    primaryCrops: ["Paddy", "Wheat", "Maize"],
    secondaryCrops: ["Mustard", "Tomato", "Sugarcane"],
    mandiYardNames: [
      { name: "Patna Bazar Samiti APMC", district: "Patna", distanceKm: 5 },
      { name: "Danapur Grain Mandi", district: "Patna", distanceKm: 14 },
      { name: "Muzaffarpur Agricultural Yard", district: "Muzaffarpur", distanceKm: 72 },
      { name: "Gaya Grain Market", district: "Gaya", distanceKm: 98 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-BIH-KRISHI-ROADMAP",
        title: "Bihar Rajya Fasal Sahayata Yojana (BRFSY)",
        dept: "Cooperative Department, Govt of Bihar",
        category: "Insurance & Assistance",
        benefitAmount: "₹7,500 to ₹10,000/Hectare direct compensation for crop loss without premium",
        eligibility: "All ryots and non-ryots cultivating notified crops in Bihar.",
        isEligibleForUser: true,
        documentsRequired: ["Land Possession Certificate (LPC) / Self Declaration", "Aadhaar Card", "Bank Passbook"],
        applicationProcess: "Online through pacsbihar.gov.in.",
        deadline: "August 31, 2026",
        officialLink: "https://pacsonline.bih.nic.in"
      }
    ]
  },

  // KARNATAKA
  {
    id: "KAR-BELAGAVI",
    district: "Belagavi",
    village: "Gokak",
    state: "Karnataka",
    pincode: "590001",
    lat: 15.8497,
    lng: 74.4977,
    formatted: "Belagavi, Karnataka",
    agroZone: "Northern Transition & Sugarcane Belt Zone",
    soilType: "Deep Black Clay & Red Sandy Loam",
    soilOptions: ["Deep Black Clay", "Red Sandy Loam", "Medium Black Soil"],
    irrigationType: "Ghataprabha Canal + Drip Fertigation",
    agricultureType: "Commercial Sugarcane, Cotton & Maize",
    avgRainfall: "880mm",
    primaryCrops: ["Sugarcane", "Cotton", "Maize"],
    secondaryCrops: ["Soybean", "Paddy", "Tomato"],
    mandiYardNames: [
      { name: "Belagavi APMC Central Yard", district: "Belagavi", distanceKm: 6 },
      { name: "Gokak Sugarcane & Grain Market", district: "Belagavi", distanceKm: 28 },
      { name: "Hubballi Amargol APMC (Karnataka's Largest)", district: "Dharwad", distanceKm: 94 },
      { name: "Bailhongal Cotton Mandi", district: "Belagavi", distanceKm: 42 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-KAR-RAITHA-SIRI",
        title: "Karnataka Raitha Siri & Krishi Bhagya Scheme",
        dept: "Department of Agriculture, Govt of Karnataka",
        category: "Direct Income & Subsidies",
        benefitAmount: "₹10,000/Hectare incentive for millets + 80% subsidy on Krishi Honda (Farm Ponds)",
        eligibility: "Farmers in Karnataka cultivating notified crops.",
        isEligibleForUser: true,
        documentsRequired: ["RTC (Pahani) Copy", "FID Number", "Aadhaar Card"],
        applicationProcess: "Apply via FRUITS portal (fruits.karnataka.gov.in) / Raitha Samparka Kendra.",
        deadline: "Open All Year",
        officialLink: "https://fruits.karnataka.gov.in"
      }
    ]
  },

  // TELANGANA
  {
    id: "TEL-WARANGAL",
    district: "Warangal",
    village: "Narsampet",
    state: "Telangana",
    pincode: "506002",
    lat: 17.9689,
    lng: 79.5941,
    formatted: "Warangal, Telangana",
    agroZone: "Central Telangana Red Chalkas & Black Soil Zone",
    soilType: "Red Sandy Loam (Chalka) & Deep Black Clay",
    soilOptions: ["Red Sandy Loam (Chalka)", "Deep Black Clay", "Gravelly Red Soil"],
    irrigationType: "Kaleshwaram Lift Canal + Drip Borewell",
    agricultureType: "Commercial Cotton, Red Chilli & Maize",
    avgRainfall: "1000mm",
    primaryCrops: ["Cotton", "Paddy", "Maize"],
    secondaryCrops: ["Tomato", "Soybean", "Sugarcane"],
    mandiYardNames: [
      { name: "Enumamula Agricultural Market Yard (Asia's 2nd Largest)", district: "Warangal", distanceKm: 6 },
      { name: "Narsampet Cotton Yard", district: "Warangal", distanceKm: 32 },
      { name: "Khammam Chilli & Grain APMC", district: "Khammam", distanceKm: 88 },
      { name: "Jangaon Grain Mandi", district: "Jangaon", distanceKm: 48 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-TEL-RYTHU-BANDHU",
        title: "Telangana Rythu Bandhu Direct Investment Scheme",
        dept: "Department of Agriculture, Govt of Telangana",
        category: "Direct Income",
        benefitAmount: "₹10,000 per Acre per year (₹5,000 for Kharif & ₹5,000 for Rabi)",
        eligibility: "All landowning farmers in Telangana registered on Dharani portal.",
        isEligibleForUser: true,
        documentsRequired: ["Dharani Passbook", "Aadhaar Card", "Bank Account Number"],
        applicationProcess: "Automatic credit through Dharani portal verification.",
        deadline: "Open All Year",
        officialLink: "https://rythubandhu.telangana.gov.in"
      }
    ]
  },

  // ODISHA
  {
    id: "ODI-CUTTACK",
    district: "Cuttack",
    village: "Athagarh",
    state: "Odisha",
    pincode: "753001",
    lat: 20.4625,
    lng: 85.8828,
    formatted: "Cuttack, Odisha",
    agroZone: "East & South Eastern Coastal Plain Zone",
    soilType: "Coastal Deltaic Alluvium & Red Clay Soil",
    soilOptions: ["Coastal Deltaic Alluvium", "Red Clay Soil", "Laterite Loam"],
    irrigationType: "Mahanadi Canal System + Lift Irrigation",
    agricultureType: "Paddy Granary, Pulses & Oilseed Multi-Cropping",
    avgRainfall: "1550mm",
    primaryCrops: ["Paddy", "Mustard", "Tomato"],
    secondaryCrops: ["Sugarcane", "Maize", "Wheat"],
    mandiYardNames: [
      { name: "Cuttack RMC Market Yard", district: "Cuttack", distanceKm: 5 },
      { name: "Athagarh Grain Mandi", district: "Cuttack", distanceKm: 28 },
      { name: "Bhubaneswar Mandi Terminal", district: "Khurda", distanceKm: 26 },
      { name: "Jagatsinghpur Paddy Centre", district: "Jagatsinghpur", distanceKm: 42 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-ODI-KALIA",
        title: "KALIA Scheme (Krushak Assistance for Livelihood and Income Augmentation)",
        dept: "Department of Agriculture & Farmers' Empowerment, Govt of Odisha",
        category: "Direct Income",
        benefitAmount: "₹10,000 per year per farm family + ₹12,500 for landless agricultural households",
        eligibility: "Small, marginal, and landless agricultural farmers in Odisha.",
        isEligibleForUser: true,
        documentsRequired: ["KALIA Token Number", "Aadhaar Card", "Bank Passbook"],
        applicationProcess: "Apply on kalia.odisha.gov.in.",
        deadline: "Open All Year",
        officialLink: "https://kalia.odisha.gov.in"
      }
    ]
  },

  // ASSAM & NORTHEAST
  {
    id: "ASM-GUWAHATI",
    district: "Kamrup",
    village: "Hajo",
    state: "Assam",
    pincode: "781001",
    lat: 26.1445,
    lng: 91.7362,
    formatted: "Guwahati, Assam",
    agroZone: "Lower Brahmaputra Valley Agro-Climatic Zone",
    soilType: "Rich Riverine Alluvial Silt Loam & Acidic Red Soil",
    soilOptions: ["Riverine Alluvial Silt Loam", "Acidic Red Soil", "Clay Loam"],
    irrigationType: "Brahmaputra Lift Irrigation + Shallow Tube Well",
    agricultureType: "Ahu/Sali Paddy, Mustard, Vegetables & Tea Cultivation",
    avgRainfall: "1850mm",
    primaryCrops: ["Paddy", "Mustard", "Tomato"],
    secondaryCrops: ["Maize", "Wheat", "Sugarcane"],
    mandiYardNames: [
      { name: "Guwahati Pamohi Wholesale Agricultural Market", district: "Kamrup", distanceKm: 8 },
      { name: "Hajo Vegetable & Grain Yard", district: "Kamrup", distanceKm: 26 },
      { name: "Nalbari Regulated Market", district: "Nalbari", distanceKm: 54 },
      { name: "Barpeta Road Mandi", district: "Barpeta", distanceKm: 88 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-ASM-CMSGUY",
        title: "Chief Minister Samagra Gramya Unnayan Yojana (Assam)",
        dept: "Department of Agriculture, Govt of Assam",
        category: "Subsidies & Mechanisation",
        benefitAmount: "70% subsidy on Tractors, Power Tillers, and Mini Rice Mills",
        eligibility: "Farmer groups and individual cultivators in Assam.",
        isEligibleForUser: true,
        documentsRequired: ["Farmer Certificate", "Aadhaar Card", "Bank Passbook"],
        applicationProcess: "Apply via Assam Agriculture portal (diragri.assam.gov.in).",
        deadline: "September 30, 2026",
        officialLink: "https://diragri.assam.gov.in"
      }
    ]
  },

  // JAMMU & KASHMIR
  {
    id: "JK-SRINAGAR",
    district: "Srinagar",
    village: "Pampore",
    state: "Jammu and Kashmir",
    pincode: "190001",
    lat: 34.0837,
    lng: 74.7973,
    formatted: "Srinagar, Jammu and Kashmir",
    agroZone: "Kashmir Valley Temperate & Saffron/Apple Plateau",
    soilType: "Karewa Lacustrine Silt & Mountain Loam",
    soilOptions: ["Karewa Lacustrine Silt", "Mountain Loam", "Alluvial Riverbed Soil"],
    irrigationType: "Gravity Stream Kuhl + Drip System",
    agricultureType: "High-Density Apple, Saffron, Walnut & Off-Season Vegetables",
    avgRainfall: "750mm",
    primaryCrops: ["Wheat", "Maize", "Tomato"],
    secondaryCrops: ["Mustard", "Paddy", "Soybean"],
    mandiYardNames: [
      { name: "Parimpora Fruit & Grain Terminal Mandi Srinagar", district: "Srinagar", distanceKm: 4 },
      { name: "Pampore Saffron & Spice Market", district: "Pulwama", distanceKm: 14 },
      { name: "Sopore Fruit Mandi (Asia's 2nd Largest Apple Yard)", district: "Baramulla", distanceKm: 48 },
      { name: "Shopian Apple APMC", district: "Shopian", distanceKm: 52 }
    ],
    stateSchemes: [
      {
        id: "SCHEME-JK-HADP",
        title: "Holistic Agriculture Development Programme (HADP J&K)",
        dept: "Agriculture Production Department, UT of J&K",
        category: "Subsidies & High-Density Plantations",
        benefitAmount: "50% to 80% subsidy for High-Density Orchards, Polyhouses, and Micro-Irrigation",
        eligibility: "Farmers residing and cultivating land in Jammu and Kashmir.",
        isEligibleForUser: true,
        documentsRequired: ["Revenue Land Record (Girdawari)", "Aadhaar Card", "Bank Passbook"],
        applicationProcess: "Apply via HADP portal (hadp.jk.gov.in).",
        deadline: "Open All Year",
        officialLink: "https://hadp.jk.gov.in"
      }
    ]
  }
];

/**
 * Flat list of locations for dropdown search & modal selector
 */
export const locationDatabase = AGRO_REGIONS_DATABASE.map(item => ({
  formatted: item.formatted,
  village: item.village,
  district: item.district,
  state: item.state,
  pincode: item.pincode,
  lat: item.lat,
  lng: item.lng,
  avgRainfall: item.avgRainfall,
  agroZone: item.agroZone,
  soilType: item.soilType,
  primaryCrops: item.primaryCrops
}));

/**
 * Intelligent Agro-Region Resolver for any location or GPS coordinates
 */
export function getAgroRegionForLocation(loc = {}) {
  if (!loc) return AGRO_REGIONS_DATABASE[0];

  // 1. Direct formatted string match
  if (loc.formatted) {
    const directMatch = AGRO_REGIONS_DATABASE.find(
      r => r.formatted.toLowerCase() === loc.formatted.toLowerCase()
    );
    if (directMatch) return directMatch;
  }

  // 2. District & State match
  if (loc.district || loc.state) {
    const distLower = (loc.district || '').toLowerCase().trim();
    const stateLower = (loc.state || '').toLowerCase().trim();

    const districtMatch = AGRO_REGIONS_DATABASE.find(r => {
      const matchDist = distLower && (r.district.toLowerCase().includes(distLower) || distLower.includes(r.district.toLowerCase()));
      const matchState = stateLower && (r.state.toLowerCase().includes(stateLower) || stateLower.includes(r.state.toLowerCase()));
      return matchDist && matchState;
    });
    if (districtMatch) return districtMatch;

    const districtOnly = AGRO_REGIONS_DATABASE.find(r => 
      distLower && (r.district.toLowerCase().includes(distLower) || distLower.includes(r.district.toLowerCase()))
    );
    if (districtOnly) return districtOnly;

    const stateOnly = AGRO_REGIONS_DATABASE.find(r => 
      stateLower && (r.state.toLowerCase().includes(stateLower) || stateLower.includes(r.state.toLowerCase()))
    );
    if (stateOnly) return stateOnly;
  }

  // 3. Coordinate distance nearest-neighbor (Haversine)
  if (typeof loc.lat === 'number' && typeof loc.lng === 'number' && !isNaN(loc.lat) && !isNaN(loc.lng)) {
    let closestRegion = AGRO_REGIONS_DATABASE[0];
    let minDistance = Infinity;

    for (const region of AGRO_REGIONS_DATABASE) {
      const dist = calculateHaversineDistance(loc.lat, loc.lng, region.lat, region.lng);
      if (dist < minDistance) {
        minDistance = dist;
        closestRegion = region;
      }
    }
    return closestRegion;
  }

  return AGRO_REGIONS_DATABASE[0];
}

/**
 * Standard Crop Catalog with Detailed 5-Stage Life Journeys
 */
const CROP_CATALOG = {
  Cotton: {
    id: "CROP-COTTON",
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
      { name: "Vegetative Growth", dates: "June 25 - July 28", status: "completed", description: "Healthy leaf expansion, first weeding & drip fertigation completed." },
      { name: "Flowering & Boll Formation", dates: "July 29 - Sept 25", status: "current", description: "Active square flowering stage. Monitor lower leaves for sucking pests." },
      { name: "Boll Maturation", dates: "Sept 26 - Oct 30", status: "upcoming", description: "Bolls opening phase. Irrigation should be reduced slightly." },
      { name: "Harvesting & Picking", dates: "Nov 01 - Nov 20", status: "upcoming", description: "First picking of seed cotton (Kapas)." }
    ],
    image: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=600&q=80"
  },
  Wheat: {
    id: "CROP-WHEAT",
    name: "Wheat",
    variety: "GW-496 / HD-2967 High-Yield Strain",
    areaAcres: 1.2,
    sowingDate: "2025-11-05",
    expectedHarvest: "2026-03-15",
    currentStage: "Vegetative Tillering",
    stageProgressPercent: 40,
    healthScore: 92,
    healthStatus: "Excellent",
    risks: {
      pest: "Low",
      disease: "Low (Stripe Rust Guarded)",
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
  Tomato: {
    id: "CROP-TOMATO",
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
  },
  Paddy: {
    id: "CROP-PADDY",
    name: "Paddy",
    variety: "Pusa Basmati 1121 / PR-126",
    areaAcres: 2.0,
    sowingDate: "2026-06-20",
    expectedHarvest: "2026-10-30",
    currentStage: "Vegetative Tillering",
    stageProgressPercent: 55,
    healthScore: 90,
    healthStatus: "Good",
    risks: {
      pest: "Low (Stem Borer Monitored)",
      disease: "Low (Blast Monitored)",
      weather: "Medium"
    },
    soilMoisture: "Standing Water (85%)",
    npkStatus: "Nitrogen: High | Phosphorus: Optimal | Potassium: Sufficient",
    stages: [
      { name: "Nursery Sowing", dates: "June 01 - June 20", status: "completed", description: "Raised nursery bed sprouted with 95% germination rate." },
      { name: "Transplanting & Puddling", dates: "June 21 - July 10", status: "completed", description: "Transplanted 2-3 seedlings per hill at 20x15cm spacing." },
      { name: "Active Tillering & Panicle", dates: "July 11 - Sept 15", status: "current", description: "Tillering stage. Maintain 3-5cm standing water depth." },
      { name: "Flowering & Grain Filling", dates: "Sept 16 - Oct 10", status: "upcoming", description: "Milk and dough stage of golden grain formation." },
      { name: "Maturity & Harvesting", dates: "Oct 11 - Oct 30", status: "upcoming", description: "Combine harvesting and grain moisture reduction." }
    ],
    image: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80"
  },
  Mustard: {
    id: "CROP-MUSTARD",
    name: "Mustard",
    variety: "Pusa Bold / Giriraj (DRMRI-150)",
    areaAcres: 1.5,
    sowingDate: "2025-10-15",
    expectedHarvest: "2026-02-25",
    currentStage: "Flowering & Pod Formation",
    stageProgressPercent: 70,
    healthScore: 88,
    healthStatus: "Good",
    risks: {
      pest: "Medium (Mustard Aphid Alert)",
      disease: "Low (White Rust)",
      weather: "Low"
    },
    soilMoisture: "Optimal (65%)",
    npkStatus: "Nitrogen: Optimal | Phosphorus: High | Sulphur: Essential",
    stages: [
      { name: "Land Prep & Sowing", dates: "Oct 15 - Oct 22", status: "completed", description: "Sown in conserved soil moisture with single super phosphate." },
      { name: "Vegetative Rosette", dates: "Oct 23 - Nov 30", status: "completed", description: "First thinning and weeding done." },
      { name: "Flowering & Siliqua Pods", dates: "Dec 01 - Jan 20", status: "current", description: "Golden flower bloom and active pod filling stage." },
      { name: "Pod Maturation", dates: "Jan 21 - Feb 15", status: "upcoming", description: "Pods turning golden brown. Stop irrigation." },
      { name: "Harvesting & Threshing", dates: "Feb 16 - Feb 25", status: "upcoming", description: "Manual harvesting early morning to prevent pod shattering." }
    ],
    image: "https://images.unsplash.com/photo-1508873696983-2df57046475a?auto=format&fit=crop&w=600&q=80"
  },
  Soybean: {
    id: "CROP-SOYBEAN",
    name: "Soybean",
    variety: "JS-335 / JS-9560 High Protein",
    areaAcres: 2.2,
    sowingDate: "2026-06-25",
    expectedHarvest: "2026-10-10",
    currentStage: "Flowering & Pod Development",
    stageProgressPercent: 65,
    healthScore: 86,
    healthStatus: "Good",
    risks: {
      pest: "Medium (Girdle Beetle)",
      disease: "Low (Yellow Mosaic Virus)",
      weather: "Low"
    },
    soilMoisture: "Good (70%)",
    npkStatus: "Nitrogen: Fixated | Phosphorus: High | Potassium: Sufficient",
    stages: [
      { name: "Sowing & Nodulation", dates: "June 25 - July 08", status: "completed", description: "Seeds treated with Rhizobium and Trichoderma." },
      { name: "Vegetative Branching", dates: "July 09 - Aug 15", status: "completed", description: "Vigorous canopy development. First inter-cultivation done." },
      { name: "Flowering & Pod Initiation", dates: "Aug 16 - Sept 18", status: "current", description: "Active flowering and pod filling. Keep field weed-free." },
      { name: "Pod Filling & Maturation", dates: "Sept 19 - Oct 02", status: "upcoming", description: "Leaves start yellowing naturally as pods mature." },
      { name: "Harvesting", dates: "Oct 03 - Oct 10", status: "upcoming", description: "Harvest at 14% seed moisture." }
    ],
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80"
  },
  Sugarcane: {
    id: "CROP-SUGARCANE",
    name: "Sugarcane",
    variety: "Co-86032 / Co-0238 Champion Strain",
    areaAcres: 3.0,
    sowingDate: "2025-10-10",
    expectedHarvest: "2026-11-30",
    currentStage: "Grand Growth & Cane Elongation",
    stageProgressPercent: 75,
    healthScore: 94,
    healthStatus: "Excellent",
    risks: {
      pest: "Low (Early Shoot Borer Controlled)",
      disease: "Low (Red Rot Free)",
      weather: "Low"
    },
    soilMoisture: "Moist (78%)",
    npkStatus: "Nitrogen: Sufficient | Phosphorus: Good | Potassium: High",
    stages: [
      { name: "Sett Planting", dates: "Oct 10 - Oct 25", status: "completed", description: "Two-budded setts planted in deep furrows." },
      { name: "Tillering Phase", dates: "Oct 26 - Jan 15", status: "completed", description: "Active tillering. Earth-up operation and fertilizer applied." },
      { name: "Grand Growth Phase", dates: "Jan 16 - Aug 30", status: "current", description: "Rapid internode elongation and sugar accumulation." },
      { name: "Ripening & Maturity", dates: "Sept 01 - Oct 31", status: "upcoming", description: "Brix reading touches 18-20%." },
      { name: "Harvesting & Milling", dates: "Nov 01 - Nov 30", status: "upcoming", description: "Cane cutting close to ground level for mill dispatch." }
    ],
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80"
  },
  Maize: {
    id: "CROP-MAIZE",
    name: "Maize",
    variety: "Hybrid HQPM-1 / Pioneer P3396",
    areaAcres: 1.8,
    sowingDate: "2026-06-18",
    expectedHarvest: "2026-09-28",
    currentStage: "Tasseling & Silking",
    stageProgressPercent: 68,
    healthScore: 89,
    healthStatus: "Good",
    risks: {
      pest: "Medium (Fall Armyworm Alert)",
      disease: "Low",
      weather: "Low"
    },
    soilMoisture: "Optimal (65%)",
    npkStatus: "Nitrogen: High | Phosphorus: Good | Zinc: Essential",
    stages: [
      { name: "Sowing & Emergence", dates: "June 18 - June 28", status: "completed", description: "Vigorous seedling emergence at 60x20cm spacing." },
      { name: "Knee-High Vegetative", dates: "June 29 - July 31", status: "completed", description: "Whorl leaf formation and side dressing of nitrogen." },
      { name: "Tasseling & Silking", dates: "Aug 01 - Aug 28", status: "current", description: "Pollen shedding and silk emergence. Critical water stage." },
      { name: "Grain Filling", dates: "Aug 29 - Sept 18", status: "upcoming", description: "Milky to dent stage of cob kernels." },
      { name: "Maturity & Harvest", dates: "Sept 19 - Sept 28", status: "upcoming", description: "Black layer formation at grain base indicating maturity." }
    ],
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80"
  }
};

/**
 * Generates dynamic Crop models tailored to the farmer's registered crops and region
 */
export function generateCropsForRegion(agroRegion, primaryCropNames = []) {
  const cropNamesToUse = (primaryCropNames && primaryCropNames.length > 0)
    ? primaryCropNames
    : (agroRegion?.primaryCrops || ["Cotton", "Wheat", "Tomato"]);

  return cropNamesToUse.map((cropName, index) => {
    const baseCrop = CROP_CATALOG[cropName] || CROP_CATALOG.Cotton;
    return {
      ...baseCrop,
      id: `${baseCrop.id}-${index + 1}`,
      name: cropName
    };
  });
}

/**
 * Generates dynamic APMC Mandi Market data tailored to the region and active crops
 */
export function generateMandiRatesForRegion(agroRegion, activeCrops = []) {
  const regionMandis = agroRegion?.mandiYardNames || [
    { name: "District Central APMC", district: agroRegion?.district || "Local", distanceKm: 8 },
    { name: "Regional Market Yard", district: agroRegion?.district || "Local", distanceKm: 22 },
    { name: "State Terminal APMC", district: agroRegion?.state || "State", distanceKm: 45 }
  ];

  const priceBases = {
    Cotton: { base: 7250, spread: 260, trend: "+4.2%", variety: "Hybrid BG-II Long Staple", unit: "Quintal" },
    Wheat: { base: 2620, spread: 90, trend: "+1.8%", variety: "Sharbati / High-Yield Grain", unit: "Quintal" },
    Tomato: { base: 1850, spread: 150, trend: "-3.5%", variety: "Hybrid Red Round", unit: "Quintal" },
    Paddy: { base: 3100, spread: 180, trend: "+3.1%", variety: "Basmati Grade-A / Sona Masoori", unit: "Quintal" },
    Mustard: { base: 5650, spread: 140, trend: "+2.4%", variety: "Pusa Bold 42% Oil Content", unit: "Quintal" },
    Soybean: { base: 4820, spread: 160, trend: "+1.5%", variety: "Yellow High-Protein", unit: "Quintal" },
    Sugarcane: { base: 380, spread: 25, trend: "+5.0%", variety: "Early Recovery Co-86032", unit: "Quintal" },
    Maize: { base: 2280, spread: 75, trend: "+2.0%", variety: "Yellow Feed Grade", unit: "Quintal" }
  };

  const cropsToRender = (activeCrops && activeCrops.length > 0)
    ? activeCrops
    : (agroRegion?.primaryCrops?.map(name => ({ name })) || [{ name: 'Cotton' }, { name: 'Wheat' }, { name: 'Tomato' }]);

  return cropsToRender.map(cropObj => {
    const cropName = cropObj.name || cropObj;
    const priceInfo = priceBases[cropName] || priceBases.Cotton;

    const markets = regionMandis.map((mkt, idx) => {
      const priceOffset = (idx === 0 ? priceInfo.spread : -Math.round(priceInfo.spread * 0.4 * idx));
      const marketPrice = priceInfo.base + priceOffset;
      const changeStr = priceOffset >= 0 ? `+₹${Math.abs(priceOffset)}` : `-₹${Math.abs(priceOffset)}`;

      return {
        name: mkt.name,
        district: mkt.district,
        price: marketPrice,
        change: changeStr,
        distanceKm: mkt.distanceKm,
        updated: idx === 0 ? "30 mins ago" : idx === 1 ? "1 hour ago" : "3 hours ago"
      };
    });

    const prices = markets.map(m => m.price);
    const highestPrice = Math.max(...prices);
    const lowestPrice = Math.min(...prices);

    const chartDates = ["Jul 18", "Jul 23", "Jul 28", "Aug 02", "Aug 07", "Aug 12", "Aug 16"];
    const chartData = chartDates.map((dateStr, i) => {
      const variation = Math.round((i - 3) * (priceInfo.spread / 4));
      return {
        date: dateStr,
        price: priceInfo.base - (priceInfo.spread / 2) + (i * (priceInfo.spread / 6))
      };
    });

    return {
      crop: cropName,
      variety: priceInfo.variety,
      unit: priceInfo.unit,
      trend: priceInfo.trend,
      isUp: !priceInfo.trend.startsWith('-'),
      highestPrice,
      lowestPrice,
      markets,
      chartData
    };
  });
}

/**
 * Generates dynamic localized weather telemetry
 */
export function generateWeatherDataForRegion(location = {}, agroRegion = {}, liveWeather = null) {
  const locFormatted = location.formatted || agroRegion.formatted || "Halol, Gujarat";
  const primaryCropName = agroRegion.primaryCrops?.[0] || "Cotton";

  if (liveWeather && liveWeather.current) {
    const isRainy = (liveWeather.current.rainProbability || 0) > 60;
    return {
      current: {
        ...liveWeather.current,
        location: locFormatted
      },
      agroImpact: {
        summary: isRainy
          ? `Rain forecasted for ${locFormatted}. Irrigation is NOT recommended today for ${primaryCropName} crops to prevent waterlogging.`
          : `Weather conditions in ${locFormatted} are stable with ${liveWeather.current.temp}°C. Optimal window for scheduled field fertigation.`,
        recommendations: isRainy
          ? [
              `🌧️ Precipitation probability ${liveWeather.current.rainProbability}%: Postpone foliar pesticide spraying to prevent chemical wash-off.`,
              `💨 Wind Speed at ${liveWeather.current.windSpeed} km/h: Safe spraying window is early morning (7:00 AM - 10:00 AM).`,
              `💧 Soil moisture optimal due to atmospheric humidity (${liveWeather.current.humidity}%). Save electricity and pause pump sets.`
            ]
          : [
              `☀️ Sunny & stable conditions (${liveWeather.current.temp}°C): Suitable for drip fertilizer application.`,
              `💨 Light breeze (${liveWeather.current.windSpeed} km/h): Favorable for foliar micronutrient spraying before 11:00 AM.`,
              `💧 Inspect soil moisture at 10cm depth before initiating evening drip cycle.`
            ]
      },
      hourly: liveWeather.hourly || defaultHourlyForecast,
      daily: liveWeather.daily || defaultDailyForecast
    };
  }

  // Fallback synthetic high-precision agro-weather
  return {
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
      location: locFormatted
    },
    agroImpact: {
      summary: `Heavy afternoon shower predicted for ${locFormatted}. Irrigation is NOT recommended today for ${primaryCropName} crops.`,
      recommendations: [
        `🌧️ Rain expected today (85% probability) - Postpone nitrogen fertilizer application to prevent runoff into subsoil.`,
        `💨 SW Winds at 14 km/h - Avoid pesticide spraying between 12:00 PM and 4:00 PM.`,
        `💧 Soil moisture currently optimal (68%) due to humidity. Save pump electricity today.`
      ]
    },
    hourly: defaultHourlyForecast,
    daily: defaultDailyForecast
  };
}

const defaultHourlyForecast = [
  { time: "09:00 AM", temp: 27, rainProb: 20, icon: "CloudSun" },
  { time: "12:00 PM", temp: 31, rainProb: 45, icon: "Cloud" },
  { time: "03:00 PM", temp: 30, rainProb: 85, icon: "CloudRain" },
  { time: "06:00 PM", temp: 28, rainProb: 60, icon: "CloudRain" },
  { time: "09:00 PM", temp: 26, rainProb: 30, icon: "Cloud" },
  { time: "12:00 AM", temp: 25, rainProb: 15, icon: "Moon" }
];

const defaultDailyForecast = [
  { day: "Today", date: "Aug 16", maxTemp: 31, minTemp: 24, rainProb: 85, condition: "Thunderstorms", icon: "CloudRain" },
  { day: "Sun", date: "Aug 17", maxTemp: 30, minTemp: 23, rainProb: 90, condition: "Heavy Rain", icon: "CloudRain" },
  { day: "Mon", date: "Aug 18", maxTemp: 32, minTemp: 25, rainProb: 40, condition: "Partly Cloudy", icon: "CloudSun" },
  { day: "Tue", date: "Aug 19", maxTemp: 33, minTemp: 25, rainProb: 20, condition: "Sunny / Clear", icon: "Sun" },
  { day: "Wed", date: "Aug 20", maxTemp: 32, minTemp: 24, rainProb: 30, condition: "Scattered Clouds", icon: "Cloud" },
  { day: "Thu", date: "Aug 21", maxTemp: 31, minTemp: 24, rainProb: 65, condition: "Moderate Rain", icon: "CloudRain" },
  { day: "Fri", date: "Aug 22", maxTemp: 30, minTemp: 23, rainProb: 50, condition: "Passing Showers", icon: "CloudRain" }
];

/**
 * Generates dynamic Alerts for the location
 */
export function generateAlertsForRegion(location = {}, agroRegion = {}, weather = {}) {
  const dist = location.district || agroRegion.district || "District";
  const st = location.state || agroRegion.state || "State";
  const primaryCrop = agroRegion.primaryCrops?.[0] || "Cotton";
  const rainProb = weather.current?.rainProbability ?? 85;

  return [
    {
      id: "ALERT-LOC-01",
      severity: "critical",
      type: "Weather Alert",
      title: `Precipitation Forecast (${rainProb}%) in ${dist}`,
      location: `${dist}, ${st}`,
      time: "Today, 02:30 PM",
      description: `IMD telemetry predicts rain showers across ${dist}. Postpone pesticide spraying and ensure field drainage channels are clear.`,
      actionText: "Check Weather Impact Advice"
    },
    {
      id: "ALERT-LOC-02",
      severity: "important",
      type: "Pest Warning",
      title: `${primaryCrop} Regional Pest Telemetry`,
      location: `${dist} Agriculture Belt`,
      time: "Yesterday, 06:15 PM",
      description: `Light traps installed at KVK ${dist} showed initial moth presence. Inspect lower ${primaryCrop} leaves and flowers for larvae.`,
      actionText: "Scan Leaf with Crop Doctor"
    },
    {
      id: "ALERT-LOC-03",
      severity: "advisory",
      type: "Market Alert",
      title: `${primaryCrop} Rate Movement at APMC`,
      location: `${dist} Mandi Yard`,
      time: "Today, 11:00 AM",
      description: `Arrivals of ${primaryCrop} picked up with competitive modal rates across ${dist} markets.`,
      actionText: "View Mandi Rates"
    }
  ];
}

/**
 * Generates dynamic Schemes tailored to the user's state & Central India schemes
 */
export function generateSchemesForLocation(location = {}, agroRegion = {}) {
  const stateSchemes = agroRegion?.stateSchemes || [];
  const stateName = location.state || agroRegion.state || "Gujarat";

  const centralSchemes = [
    {
      id: "SCHEME-PM-KISAN",
      title: "PM-KISAN Samman Nidhi Yojana",
      dept: "Ministry of Agriculture & Farmers Welfare, Govt of India",
      category: "Direct Income",
      benefitAmount: "₹6,000 / year (3 equal installments of ₹2,000 via DBT)",
      eligibility: "All landholding farmer families with cultivable land across all states.",
      isEligibleForUser: true,
      documentsRequired: ["Aadhaar Card", "Land Khatauni / Jamabandi Record", "Aadhaar-linked Bank Account"],
      applicationProcess: "Online through PM-KISAN portal or via nearest Common Service Centre (CSC).",
      deadline: "Open All Year",
      officialLink: "https://pmkisan.gov.in"
    },
    {
      id: "SCHEME-PMFBY",
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      dept: "Department of Agriculture, Cooperation & Farmers Welfare",
      category: "Insurance",
      benefitAmount: "Comprehensive risk insurance cover against drought, flood, pests & post-harvest losses",
      eligibility: "All farmers growing notified crops in notified insurance areas.",
      isEligibleForUser: true,
      documentsRequired: ["Sowing Certificate from Talati/Patwari", "Land Record Copy", "Aadhaar Card", "Bank Passbook"],
      applicationProcess: "Through National Crop Insurance Portal (NCIP) or local bank branch.",
      deadline: "August 31, 2026 (Kharif Season)",
      officialLink: "https://pmfby.gov.in"
    },
    {
      id: "SCHEME-KCC",
      title: "Kisan Credit Card (KCC) 4% Interest Subvention",
      dept: "Ministry of Finance & NABARD",
      category: "Credit",
      benefitAmount: "₹3,00,000 Collateral-Free Agri Credit @ 4% Effective Interest Rate",
      eligibility: "All landholder farmers, tenant farmers, and SHG oral lessees.",
      isEligibleForUser: true,
      documentsRequired: ["Land Revenue Record", "Aadhaar Card", "Bank Passbook Copy", "No-Dues Certificate"],
      applicationProcess: "Apply at local Primary Agricultural Credit Society (PACS) or bank branch.",
      deadline: "Open All Year",
      officialLink: "https://myscheme.gov.in"
    },
    {
      id: "SCHEME-SOLAR-KUSUM",
      title: "PM-KUSUM Solar Agricultural Pump Subsidy",
      dept: "Ministry of New and Renewable Energy",
      category: "Subsidies",
      benefitAmount: "Up to 60% Central/State Subsidy for standalone 3HP to 7.5HP Solar Water Pumps",
      eligibility: "Farmers with verified agricultural land holding and existing tube well or borewell.",
      isEligibleForUser: true,
      documentsRequired: ["Land Ownership Extract", "Electricity Certificate / Non-electrified declaration", "Aadhaar Card", "Bank Details"],
      applicationProcess: "Apply via State Renewable Energy Development Agency portal.",
      deadline: "September 30, 2026",
      officialLink: "https://pmkusum.mnre.gov.in"
    }
  ];

  return [...stateSchemes, ...centralSchemes];
}

// Pre-packaged defaults for backward compatibility
export const mockCrops = generateCropsForRegion(AGRO_REGIONS_DATABASE[0]);
export const mockWeatherData = generateWeatherDataForRegion(defaultFarmerProfile.location, AGRO_REGIONS_DATABASE[0]);
export const mockMandiRates = generateMandiRatesForRegion(AGRO_REGIONS_DATABASE[0], mockCrops);
export const mockAlerts = generateAlertsForRegion(defaultFarmerProfile.location, AGRO_REGIONS_DATABASE[0], mockWeatherData);
export const mockSchemes = generateSchemesForLocation(defaultFarmerProfile.location, AGRO_REGIONS_DATABASE[0]);

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

export const mockNews = [
  {
    id: "NEWS-01",
    title: "ICAR & KVK Issue Weather & Sowing Advisory for Kharif Crop Belts",
    category: "Regional Advisory",
    date: "Aug 15, 2026",
    source: "Krishi Vigyan Kendra (KVK) Agricultural Telemetry",
    summary: "High atmospheric humidity over central and western agricultural belts has created favorable conditions for vegetative growth. Farmers are advised to maintain optimal field drainage.",
    imageUrl: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "NEWS-02",
    title: "Govt Approves Additional Subsidy on Solar Water Pump Sets under PM-KUSUM",
    category: "Subsidies & Policy",
    date: "Aug 14, 2026",
    source: "Ministry of Agriculture & PIB",
    summary: "Farmers applying for off-grid solar agriculture pumps up to 7.5 HP will receive accelerated financial assistance through Direct Benefit Transfer.",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "NEWS-03",
    title: "Monsoon Telemetry: Widespread Agro-Meteorological Radar Active",
    category: "Weather Radar",
    date: "Aug 16, 2026",
    source: "India Meteorological Department (IMD)",
    summary: "Active monsoon trough systems are monitored across key agricultural zones, providing real-time precipitation alerts to digital farm portals.",
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80"
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
  }
};
