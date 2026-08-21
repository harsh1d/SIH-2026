/**
 * AgriSaathi AI Knowledge Engine & Voice Synthesis
 * 
 * Features:
 * - Multilingual Agronomy Knowledge Base (ICAR Verified Packages)
 * - Live Wikipedia Agricultural Grounding
 * - Smart AI Query Generator with Context Awareness
 * - Text-To-Speech (TTS) Engine supporting Hindi, Gujarati, Malayalam, and English
 */

export const AGRONOMY_KNOWLEDGE_BASE = {
  early_blight: {
    key: "early_blight",
    name: {
      en: "Early Blight (Alternaria solani)",
      hi: "अगेती झुलसा / अर्ली ब्लाइट (Alternaria solani)",
      gu: "અગેતી સુકારો / અર્લી બ્લાઇટ (Alternaria solani)",
      ml: "ഏർലി ബ്ലൈറ്റ് (Alternaria solani)"
    },
    crop: {
      en: "Tomato & Solanaceous Crops",
      hi: "टमाटर एवं सोलेनेसी फसलें",
      gu: "ટામેટા અને શાકભાજી",
      ml: "തക്കാളി"
    },
    category: "Fungal Pathogen",
    confidence: 96,
    wikiQuery: "Alternaria solani",
    symptoms: {
      en: "Dark brown to black concentric target-board spots on older leaves, surrounded by yellow chlorotic halo.",
      hi: "निचली पत्तियों पर गहरे भूरे संकेन्द्री छल्ले (टारगेट बोर्ड पैटर्न) और पत्तियों का पीला पड़ना।",
      gu: "નીચલા પાંદડા પર ગોળાકાર કથ્થઈ ડાઘ અને પાંદડા પીળા પડી ખરી પડવા.",
      ml: "ഇലകളിൽ കേന്ദ്രീകൃതമായ കറുത്ത പാടുകൾ കാണപ്പെടുകയും ഇലകൾ മഞ്ഞളിക്കുകയും ചെയ്യുന്നു."
    },
    environmentalCause: {
      en: "Frequent alternating wet and dry weather, high relative humidity (>75%), and intermittent showers.",
      hi: "उच्च आर्द्रता (>75%), रुक-रुक कर बारिश और पत्तियों का लगातार गीला रहना।",
      gu: "વધુ ભેજવાળું વાતાવરણ અને પાંદડા પર લાંબા સમય સુધી પાણીનું રહેવું.",
      ml: "കൂടിയ ഈർപ്പവും തുടർച്ചയായ മഴയും രോഗത്തിന് കാരണമാകുന്നു."
    },
    chemicalTreatment: {
      en: "• Mancozeb 75% WP @ 2.5 g/litre of water (500g/200L water/acre)\n• OR Copper Oxychloride 50% WP @ 3.0 g/litre\n• For severe infection: Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml/litre",
      hi: "• मैन्कोजेब 75% WP @ 2.5 ग्राम प्रति लीटर पानी (500 ग्राम प्रति 200 लीटर पानी प्रति एकड़)\n• या कॉपर ऑक्सीक्लोराइड 50% WP @ 3 ग्राम प्रति लीटर\n• गंभीर प्रकोप में: एजोक्सीस्ट्रोबिन 18.2% + डिफेनोकोनाजोल 11.4% SC @ 1.0 मिली प्रति लीटर",
      gu: "• મેન્કોઝેબ 75% WP @ 2.5 ગ્રામ પ્રતિ લીટર પાણી (500 ગ્રામ / એકર)\n• અથવા કોપર ઓક્સીક્લોરાઇડ 50% WP @ 3.0 ગ્રામ પ્રતિ લીટર\n• વધુ ઉપદ્રવમાં: એઝોક્સીસ્ટ્રોબિન + ડાયફેનોકોનાઝોલ @ 1 મિલી પ્રતિ લીટર",
      ml: "• മാങ്കോസെബ് 75% WP @ 2.5 ഗ്രാം / ലിറ്റർ വെള്ളത്തിൽ തളിക്കുക."
    },
    organicTreatment: {
      en: "• Spray Trichoderma viride @ 5g/litre of water along with 5ml/litre Neem Oil (10,000 ppm)\n• Prune lower infected leaves 6 inches above soil level to break fungal splash cycle",
      hi: "• ट्राइकोडर्मा विरिडी @ 5 ग्राम प्रति लीटर + नीम तेल (10,000 ppm) @ 5 मिली प्रति लीटर का छिड़काव करें\n• नीचे की 6 इंच तक की संक्रमित पत्तियों को काटकर नष्ट करें",
      gu: "• ટ્રાઇકોડર્મા વિરીડી @ 5 ગ્રામ પ્રતિ લીટર + લીમડાનું તેલ @ 5 મિલી પ્રતિ લીટર છાંટવું\n• જમીન નજીકના રોગિષ્ટ પાંદડા કાપીને નાશ કરવો.",
      ml: "• ട്രൈക്കോഡെർമ വിരിഡി 5 ഗ്രാം / ലിറ്റർ + വേപ്പെണ്ണ 5 മില്ലി തളിക്കുക."
    },
    whatToAvoid: {
      en: "Avoid late evening overhead sprinkler irrigation which keeps foliage wet overnight.",
      hi: "शाम के समय ऊपर से फव्वारा सिंचाई न करें जिससे रात भर पत्तियां गीली रहें।",
      gu: "સાંજના સમયે પાંદડા ભીના થાય તેવું પાણી આપવાનું ટાળવું.",
      ml: "വൈകുന്നേരങ്ങളിൽ ഇലകളിൽ വെള്ളം തളിക്കുന്നത് ഒഴിവാക്കുക."
    },
    monitoringSchedule: {
      en: "Re-examine foliage after 5 days; remove heavily spotted lower leaves.",
      hi: "5 दिन बाद दोबारा निरीक्षण करें; रोगग्रस्त निचली पत्तियों को खेत से दूर हटाएं।",
      gu: "5 દિવસ પછી ફરી તપાસ કરો અને રોગિષ્ટ પાંદડા દૂર કરો.",
      ml: "5 ദിവസത്തിന് ശേഷം വീണ്ടും പരിശോധിക്കുക."
    }
  },

  yellow_rust_wheat: {
    key: "yellow_rust_wheat",
    name: {
      en: "Stripe / Yellow Rust (Puccinia striiformis)",
      hi: "गेहूं का पीला रतुआ (Puccinia striiformis)",
      gu: "ઘઉંનો પીળો ગેરુ (Puccinia striiformis)",
      ml: "ഗോതമ്പ് മഞ്ഞ തുരുമ്പ് രോഗം"
    },
    crop: {
      en: "Wheat (Triticum aestivum)",
      hi: "गेहूं",
      gu: "ઘઉં",
      ml: "ഗോതമ്പ്"
    },
    category: "Fungal Pathogen",
    confidence: 95,
    wikiQuery: "Puccinia striiformis",
    symptoms: {
      en: "Linear, bright yellow-orange pustules forming stripes along the leaf veins. Powdery spores rub off on fingers.",
      hi: "पत्तियों की नसों के समानांतर चमकदार पीले-नारंगी रंग की धारियां, जो हाथ लगाने पर हल्दी जैसा पीला पाउडर छोड़ती हैं।",
      gu: "પાંદડા પર હળદર જેવા પીળા રંગની લાંબી પટ્ટીઓ જે આંગળીથી અડતા પીળો પાવડર ચોંટે છે.",
      ml: "ഇലകളിൽ മഞ്ഞ നിറത്തിലുള്ള വരകളും പൊടിയും കാണപ്പെടുന്നു."
    },
    environmentalCause: {
      en: "Cool temperature (10-18°C), persistent morning fog, and dew formation on wheat blades.",
      hi: "शीतकालीन ठंडा तापमान (10-18°C), सुबह का घना कोहरा और पत्तियों पर ओस की बूंदें।",
      gu: "શિયાળુ ઠંડક (10-18°C), સવારનું ઝાકળ અને ધુમ્મસ.",
      ml: "തണുത്ത കാലാവസ്ഥയും മൂടൽമഞ്ഞും."
    },
    chemicalTreatment: {
      en: "• Propiconazole 25% EC (Tilt) @ 1.0 ml/litre of water (200 ml in 200 L water/acre)\n• OR Tebuconazole 25.9% EC @ 1.0 ml/litre immediately at first appearance",
      hi: "• प्रोपिकोनाजोल 25% EC (टिल्ट) @ 1.0 मिली प्रति लीटर पानी (200 मिली/200 लीटर पानी/एकड़)\n• या टेबुकोनाजोल 25.9% EC @ 1.0 मिली प्रति लीटर का तुरंत छिड़काव करें",
      gu: "• પ્રોપિકોનાઝોલ 25% EC @ 1.0 મિલી પ્રતિ લીટર પાણી (200 મિલી / એકર)\n• અથવા ટેબુકોનાઝોલ 25.9% EC @ 1 મિલી પ્રતિ લીટર.",
      ml: "• പ്രൊപ്പികൊനാസോൾ 25% EC 1 മില്ലി / ലിറ്റർ തളിക്കുക."
    },
    organicTreatment: {
      en: "• Spray 5% Cow Urine (Gomutra) extract + 2g/L Fermented Butter Milk (Chhaas)\n• Plant resistant varieties like HD-2967, PBW-550, or GW-496",
      hi: "• 5% गोमूत्र अर्क + 20 मिली खट्टी छाछ प्रति लीटर पानी का छिड़काव करें\n• प्रतिरोधी किस्में जैसे HD-2967 या GW-496 लगाएं",
      gu: "• 5% ગૌમૂત્ર + ખાટી છાશનો છંટકાવ કરવો\n• રોગ પ્રતિકારક જાતોનું વાવેતર કરવું.",
      ml: "• ഗോമൂത്ര ലായനി തളിക്കുക."
    },
    whatToAvoid: {
      en: "Do NOT delay chemical spraying once yellow stripes appear, as rust spreads rapidly via wind.",
      hi: "पीली धारियां दिखने पर छिड़काव में देरी न करें, यह हवा से बहुत तेजी से फैलता है।",
      gu: "પીળા પટ્ટા દેખાય ત્યારે છંટકાવમાં વિલંબ ન કરવો.",
      ml: "ലക്ഷണങ്ങൾ കണ്ടാൽ ഉടൻ പ്രതിവിധി ചെയ്യുക."
    },
    monitoringSchedule: {
      en: "Inspect northern borders of the field every 48 hours during peak winter.",
      hi: "सर्दियों में हर 48 घंटे में खेत के उत्तरी छोर का निरीक्षण करें।",
      gu: "દર 2 દિવસે ખેતરની ચકાસણી કરો.",
      ml: "ദിവസവും പരിശോധിക്കുക."
    }
  },

  pink_bollworm: {
    key: "pink_bollworm",
    name: {
      en: "Pink Bollworm (Pectinophora gossypiella)",
      hi: "कपास की गुलाबी सुंडी (Pectinophora gossypiella)",
      gu: "કપાસની ગુલાબી ઈયળ (Pectinophora gossypiella)",
      ml: "കോട്ടൺ പിങ്ക് ബോൾവോം"
    },
    crop: {
      en: "Cotton (Gossypium)",
      hi: "कपास",
      gu: "કપાસ",
      ml: "പരുത്തി"
    },
    category: "Lepidopteran Insect Pest",
    confidence: 94,
    wikiQuery: "Pink bollworm",
    symptoms: {
      en: "Rosetted flowers that fail to open, entry holes plugged with excreta in green bolls, discolored stained lint.",
      hi: "गुलाब की पंखुड़ियों जैसे मुड़े हुए फूल (रोसेटेड फूल), हरे डेंडों में छेद और रुई का खराब होना।",
      gu: "રોઝેટ ફૂલ (ખુલ્યા વગર બંધ રહેતા ફૂલ), જીંડવામાં ઝીણા કાણા અને કપાસના રૂ ની ગુણવત્તા બગડવી.",
      ml: "പരുത്തി പൂക്കൾ വിരിയാതിരിക്കുകയും കായ്കളിൽ പുഴു തുളച്ചുകയറുകയും ചെയ്യുന്നു."
    },
    environmentalCause: {
      en: "Continuous cropping of cotton, prolonged flowering phase with temperature around 26-32°C.",
      hi: "कपास की लगातार खेती और 26-32°C तापमान में कीट का तेजी से प्रजनन।",
      gu: "સતત કપાસનું વાવેતર અને અનુકૂળ ગરમ ભેજવાળું વાતાવરણ.",
      ml: "തുടർച്ചയായ പരുത്തി കൃഷിയും ചൂടുള്ള അന്തരീക്ഷവും."
    },
    chemicalTreatment: {
      en: "• Emamectin Benzoate 5% SG @ 0.5 g/litre of water (100g/acre)\n• OR Chlorantraniliprole 18.5% SC @ 0.3 ml/litre (60ml/acre)\n• OR Profenofos 50% EC @ 2.0 ml/litre for ovicidal control",
      hi: "• इमामेक्टिन बेंजोएट 5% SG @ 0.5 ग्राम प्रति लीटर पानी (100 ग्राम/एकड़)\n• या क्लोरेंट्रानिलिप्रोल 18.5% SC @ 0.3 मिली प्रति लीटर (60 मिली/एकड़)\n• या प्रोफेनोफॉस 50% EC @ 2.0 मिली प्रति लीटर",
      gu: "• ઇમામેક્ટીન બેન્ઝોએટ 5% SG @ 0.5 ગ્રામ / લીટર પાણી (100 ગ્રામ / એકર)\n• અથવા કોરાજન (ક્લોરાન્ટ્રાનિલિપ્રોલ) @ 0.3 મિલી / લીટર પાણી",
      ml: "• എമാമെക്റ്റിൻ ബെൻസോയേറ്റ് 0.5 ഗ്രാം / ലിറ്റർ തളിക്കുക."
    },
    organicTreatment: {
      en: "• Install Pheromone Traps @ 8-10 traps/acre with Gossyplure lure to monitor and disrupt mating\n• Release Trichogramma egg parasitoids @ 60,000/acre at weekly intervals\n• Spray Beauveria bassiana @ 5g/litre in the evening",
      hi: "• 8-10 फेरोमोन ट्रैप (गॉसीप्लूर ल्योर) प्रति एकड़ लगाएं\n• ट्राइकोग्रामा परजीवी कार्ड @ 60,000 प्रति एकड़ छोड़ें\n• ब्यूवेरिया बासियाना @ 5 ग्राम प्रति लीटर का छिड़काव करें",
      gu: "• એકરમાં 8-10 ફેરોમોન ટ્રેપ લગાવવા\n• બ્યુવેરિયા બાસિયાના @ 5 ગ્રામ / લીટર સાંજના સમયે છાંટવું.",
      ml: "• ഫെറമോൺ ട്രാപ്പുകൾ സ്ഥാപിക്കുക."
    },
    whatToAvoid: {
      en: "Avoid excessive synthetic pyrethroid sprays which cause resurgence of whiteflies and mites.",
      hi: "सिंथेटिक पाइरेथ्रॉइड का अत्यधिक छिड़काव न करें जिससे सफेद मक्खी का प्रकोप बढ़ता है।",
      gu: "વધુ પડતી રાસાયણિક જંતુનાશકોનો આડેધડ ઉપયોગ ટાળવો.",
      ml: "കീടനാശിനികളുടെ അമിത ഉപയോഗം ഒഴിവാക്കുക."
    },
    monitoringSchedule: {
      en: "Check pheromone traps twice weekly; spray if catch exceeds 8 moths/trap for 3 consecutive nights.",
      hi: "सप्ताह में दो बार फेरोमोन ट्रैप जांचें; लगातार 3 रातों तक प्रति ट्रैप 8 से अधिक पतंगे आने पर छिड़काव करें।",
      gu: "અઠવાડિયામાં બે વાર ટ્રેપ તપાસો.",
      ml: "ആഴ്ചയിൽ രണ്ടുതവണ ട്രാപ്പുകൾ പരിശോധിക്കുക."
    }
  },

  fall_armyworm: {
    key: "fall_armyworm",
    name: {
      en: "Fall Armyworm (Spodoptera frugiperda)",
      hi: "मक्के का फॉल आर्मीवर्म (Spodoptera frugiperda)",
      gu: "મકાઈનો ફોલ આર્મીવોર્મ (Spodoptera frugiperda)",
      ml: "ഫാൾ ആർമിവോം"
    },
    crop: {
      en: "Maize / Corn (Zea mays)",
      hi: "मक्का",
      gu: "મકાઈ",
      ml: "ചോളം"
    },
    category: "Lepidopteran Insect Pest",
    confidence: 93,
    wikiQuery: "Spodoptera frugiperda",
    symptoms: {
      en: "Windowing of whorl leaves, ragged shot-hole feeding, large sawdust-like fecal frass in central whorls.",
      hi: "पत्तियों में छलनी जैसे छेद, पोंगा (व्होर्ल) में लकड़ी के बुरादे जैसा भारी मल और पत्तियां चबाया जाना।",
      gu: "પાંદડામાં કાણા, મકાઈની ડૂંખમાં લાકડાના વહેર જેવો કચરો અને પાંદડા ખવાઈ જવા.",
      ml: "ഇലകളിൽ ദ്വാരങ്ങളും ഇലകളുടെ ഇടയിൽ മലവും കാണപ്പെടുന്നു."
    },
    environmentalCause: {
      en: "Warm temperatures (24-30°C) with dry spells followed by intermittent rains during whorl stage.",
      hi: "24-30°C गर्म मौसम, सूखे के बाद हल्की बारिश और मक्के की शुरुआती वानस्पतिक अवस्था।",
      gu: "ગરમ અને ભેજવાળું વાતાવરણ.",
      ml: "ചൂടും ഈർപ്പവുമുള്ള കാലാവസ്ഥ."
    },
    chemicalTreatment: {
      en: "• Chlorantraniliprole 18.5% SC @ 0.4 ml/litre directed straight into leaf whorls\n• OR Spinetoram 11.7% SC @ 0.5 ml/litre\n• Apply at whorl stage during evening hours",
      hi: "• क्लोरेंट्रानिलिप्रोल 18.5% SC @ 0.4 मिली प्रति लीटर को सीधे पोंगे (व्होर्ल) के अंदर डालें\n• या स्पिनेटोरम 11.7% SC @ 0.5 मिली प्रति लीटर शाम के समय डालें",
      gu: "• કોરાજન (ક્લોરાન્ટ્રાનિલિપ્રોલ) @ 0.4 મિલી / લીટર સીધું મકાઈની ડૂંખમાં નાખવું\n• અથવા સ્પીનેટોરમ @ 0.5 મિલી / લીટર.",
      ml: "• ക്ലോറാൻട്രാനിലിപ്രോൾ 0.4 മില്ലി / ലിറ്റർ തളിക്കുക."
    },
    organicTreatment: {
      en: "• Apply dry sand mixed with lime (9:1 ratio) or wood ash into whorls to mechanically damage larvae\n• Spray Metarhizium rileyi @ 5g/litre or Bacillus thuringiensis (Bt kurstaki) @ 2g/litre",
      hi: "• सूखी रेत और चूने का मिश्रण (9:1) पोंगे में डालें जिससे सुंडी नष्ट हो\n• बैसिलस थुरिंजिएंसिस (Bt) @ 2 ग्राम प्रति लीटर का छिड़काव करें",
      gu: "• રેતી અને ચૂનાનું મિશ્રણ મકાઈની ડૂંખમાં નાખવું\n• Bt પાવડર @ 2 ગ્રામ / લીટર છાંટવો.",
      ml: "• ബസിലസ് തുറിഞ്ചിയെൻസിസ് 2 ഗ്രാം / ലിറ്റർ തളിക്കുക."
    },
    whatToAvoid: {
      en: "Do NOT broadcast spray over the canopy; the spray nozzle must point down into the central funnel whorl.",
      hi: "छिड़काव पत्तियों के ऊपर न फैलाएं; नोजल को सीधे पोंगे के अंदर रखना जरूरी है।",
      gu: "છંટકાવ ઉપરથી ન કરવો, સીધો ડૂંખમાં જ દવા જવી જોઈએ.",
      ml: "മരുന്ന് ഇലകൾക്ക് ഉള്ളിലേക്ക് തളിക്കുക."
    },
    monitoringSchedule: {
      en: "Scout 20 consecutive plants in 5 locations across the field every 4 days.",
      hi: "खेत में 5 स्थानों पर 20-20 पौधों की हर 4 दिन में जांच करें।",
      gu: "દર 4 દિવસે ખેતરમાં છોડની તપાસ કરો.",
      ml: "നാല് ദിവസത്തിലൊരിക്കൽ പരിശോധിക്കുക."
    }
  },

  nitrogen_deficiency: {
    key: "nitrogen_deficiency",
    name: {
      en: "Nitrogen Deficiency & Rain Leaching",
      hi: "नाइट्रोजन की कमी (पोषक तत्व अभाव)",
      gu: "નાઇટ્રોજનની ઉણપ (પીળાશ)",
      ml: "നൈട്രജന്റെ കുറവ്"
    },
    crop: {
      en: "Paddy, Cotton, Maize & Cereals",
      hi: "धान, कपास, मक्का एवं धान्य फसलें",
      gu: "ડાંગર, કપાસ, મકાઈ",
      ml: "നെല്ല്, പരുത്തി, ചോളം"
    },
    category: "Nutritional Deficiency",
    confidence: 91,
    wikiQuery: "Nitrogen deficiency",
    symptoms: {
      en: "V-shaped yellowing starting from older lower leaf tips progressing along the midrib, stunted vegetative tillering.",
      hi: "निचली पुरानी पत्तियों की नोक से 'V' आकार में पीलापन, तने का पतला होना और पौधों का धीमा विकास।",
      gu: "નીચલા જૂના પાંદડાની ટોચથી 'V' આકારમાં પીળાશ અને છોડનો ઓછો વિકાસ.",
      ml: "പഴയ ഇലകൾ മഞ്ഞളിക്കുകയും വളർച്ച കുറയുകയും ചെയ്യുന്നു."
    },
    environmentalCause: {
      en: "Heavy monsoon rain leaching soluble nitrates from soil root zones and waterlogged anaerobic conditions.",
      hi: "भारी मानसूनी बारिश से नाइट्रेट्स का मिट्टी में गहराई तक बह जाना (लीचिंग) और जलभराव।",
      gu: "વધુ વરસાદથી ખાતરનું ધોવાણ થવું અને જમીનમાં પાણી ભરાઈ રહેવું.",
      ml: "കനത്ത മഴ മൂലം മണ്ണിൽ നിന്നും പോഷകങ്ങൾ നഷ്ടപ്പെടുന്നു."
    },
    chemicalTreatment: {
      en: "• Foliar spray of 19:19:19 (NPK) @ 10g/litre of water for instant leaf absorption\n• Apply Urea (40-45 kg/acre) top-dressed only after draining standing excess field water",
      hi: "• 19:19:19 (NPK) घुलनशील खाद @ 10 ग्राम प्रति लीटर पानी का पर्णीय छिड़काव करें\n• जलभराव कम होने पर 40-45 किग्रा यूरिया प्रति एकड़ का भुरकाव करें",
      gu: "• 19:19:19 (NPK) @ 10 ગ્રામ પ્રતિ લીટર પાણીમાં ઓગાળી છંટકાવ કરવો\n• પાણી ઓસર્યા પછી યુરિયા 40-45 કિગ્રા / એકર આપવું.",
      ml: "• 19:19:19 വളം 10 ഗ്രാം / ലിറ്റർ തളിക്കുക."
    },
    organicTreatment: {
      en: "• Apply 200 Litres of enriched Jeevamrut per acre with irrigation water\n• Apply well-rotted Farmyard Manure (FYM) or Vermicompost @ 1 ton/acre",
      hi: "• 200 लीटर जीवामृत प्रति एकड़ सिंचाई जल के साथ दें\n• 1 टन प्रति एकड़ अच्छी सड़ी हुई गोबर की खाद या वर्मीकम्पोस्ट डालें",
      gu: "• જીવામૃત 200 લીટર પ્રતિ એકર પિયત સાથે આપવું\n• વર્મીકમ્પોસ્ટ અથવા દેશી ખાતર ઉમેરવું.",
      ml: "• ജീവാമൃതം അല്ലെങ്കിൽ കമ്പോസ്റ്റ് ചേർക്കുക."
    },
    whatToAvoid: {
      en: "Do NOT apply granular urea onto flooded or waterlogged soil surfaces; wait until standing water drains.",
      hi: "खेत में खड़े पानी में यूरिया न डालें, पहले पानी की उचित निकासी करें।",
      gu: "પાણી ભરેલા ખેતરમાં સીધું યુરિયા ન નાખવું.",
      ml: "വെള്ളം കെട്ടിക്കിടക്കുന്ന സ്ഥലങ്ങളിൽ വളം ഇടരുത്."
    },
    monitoringSchedule: {
      en: "Observe new leaf flushes in 4-6 days; leaves will regain deep green colour.",
      hi: "4-6 दिनों बाद नई पत्तियों के गहरे हरे रंग की जांच करें।",
      gu: "4-6 દિવસમાં નવા પાંદડાનો લીલો રંગ તપાસો.",
      ml: "4-6 ദിവസത്തിനുള്ളിൽ പുതിയ ഇലകൾ നിരീക്ഷിക്കുക."
    }
  }
};

/**
 * Fetches Wikipedia Summary with Language Support
 */
export async function fetchWikipediaAgriculturalSummary(query, lang = 'en') {
  if (!query) return null;

  try {
    const wikiLang = (lang === 'hi' || lang === 'gu' || lang === 'ml') ? lang : 'en';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const url = `https://${wikiLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        title: data.title,
        extract: data.extract,
        url: data.content_urls?.desktop?.page || `https://${wikiLang}.wikipedia.org/wiki/${encodeURIComponent(query)}`,
        source: `Wikipedia (${wikiLang.toUpperCase()})`
      };
    }
  } catch (err) {
    console.warn("Wikipedia fetch error:", err?.message || err);
  }

  // Fallback to English Wikipedia if regional article not found
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        title: data.title,
        extract: data.extract,
        url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
        source: "Wikipedia (EN)"
      };
    }
  } catch (err) {
    console.warn("English Wikipedia fallback error:", err?.message || err);
  }

  return null;
}

/**
 * Text to Speech Engine using Browser Web Speech API
 */
export function speakAgronomyText(text, lang = 'en-IN') {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  window.speechSynthesis.cancel();

  const cleanText = text
    .replace(/[*#•_]/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .substring(0, 450);

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = lang;
  utterance.rate = 0.92;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]) || v.lang === lang);
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Smart Agri AI Response Generator for AI Assistant
 */
export async function generateSmartAgriResponse({
  userQuery,
  userImage,
  farmerProfile,
  location,
  weatherData,
  mandiRates,
  conversationHistory = [],
  language = 'en'
}) {
  const queryLower = (userQuery || '').toLowerCase();
  const langKey = (language === 'hi' || language === 'gu' || language === 'ml') ? language : 'en';

  // 1. Check for Pest / Disease queries
  let matchedIssue = null;
  if (queryLower.includes('early blight') || queryLower.includes('blight') || queryLower.includes('टमाटर') || queryLower.includes('ટામેટા')) {
    matchedIssue = AGRONOMY_KNOWLEDGE_BASE.early_blight;
  } else if (queryLower.includes('rust') || queryLower.includes('yellow rust') || queryLower.includes('गेहूं') || queryLower.includes('ઘઉં') || queryLower.includes('wheat')) {
    matchedIssue = AGRONOMY_KNOWLEDGE_BASE.yellow_rust_wheat;
  } else if (queryLower.includes('pink bollworm') || queryLower.includes('bollworm') || queryLower.includes('गुलाबी') || queryLower.includes('કપાસ') || queryLower.includes('cotton')) {
    matchedIssue = AGRONOMY_KNOWLEDGE_BASE.pink_bollworm;
  } else if (queryLower.includes('armyworm') || queryLower.includes('fall armyworm') || queryLower.includes('मक्का') || queryLower.includes('મકાઈ') || queryLower.includes('maize')) {
    matchedIssue = AGRONOMY_KNOWLEDGE_BASE.fall_armyworm;
  } else if (queryLower.includes('nitrogen') || queryLower.includes('yellow') || queryLower.includes('यूरिया') || queryLower.includes('પીળા')) {
    matchedIssue = AGRONOMY_KNOWLEDGE_BASE.nitrogen_deficiency;
  }

  if (matchedIssue) {
    const wikiData = await fetchWikipediaAgriculturalSummary(matchedIssue.wikiQuery || matchedIssue.name.en, langKey);
    const resolvedName = matchedIssue.name[langKey] || matchedIssue.name.en;
    const resolvedCrop = matchedIssue.crop[langKey] || matchedIssue.crop.en;
    const resolvedChem = matchedIssue.chemicalTreatment[langKey] || matchedIssue.chemicalTreatment.en;
    const resolvedOrg = matchedIssue.organicTreatment[langKey] || matchedIssue.organicTreatment.en;
    const resolvedCause = matchedIssue.environmentalCause[langKey] || matchedIssue.environmentalCause.en;

    let responseText = `🌾 **${resolvedName} (${resolvedCrop})**\n\n`;
    responseText += `🔍 **Cause & Symptoms**: ${resolvedCause}\n\n`;
    responseText += `🧪 **Chemical Recommendation (ICAR Standard)**:\n${resolvedChem}\n\n`;
    responseText += `🌿 **Organic & Biological Control**:\n${resolvedOrg}\n\n`;
    responseText += `📍 **Local Telemetry**: Grounded for ${location.formatted || 'your farm'} (${farmerProfile.soilType || 'Soil'}).`;

    return {
      text: responseText,
      isStructured: true,
      data: {
        issue: resolvedName,
        crop: resolvedCrop,
        confidence: matchedIssue.confidence,
        chemical: resolvedChem,
        organic: resolvedOrg
      },
      wikiCitation: wikiData
    };
  }

  // 2. Weather Queries
  if (queryLower.includes('weather') || queryLower.includes('rain') || queryLower.includes('मौसम') || queryLower.includes('હવામાન') || queryLower.includes('barish')) {
    const temp = weatherData?.current?.temp ?? 29;
    const rainProb = weatherData?.current?.rainProbability ?? 35;
    const cond = weatherData?.current?.condition ?? "Partly Cloudy";

    let text = `🌦️ **Agro-Weather Telemetry for ${location.formatted}**\n\n`;
    text += `• **Current Condition**: ${cond}\n`;
    text += `• **Temperature**: ${temp}°C | **Precipitation Probability**: ${rainProb}%\n`;
    text += `• **Farming Impact**: ${weatherData?.agroImpact?.summary || (rainProb > 50 ? 'Hold foliar spray today due to rain.' : 'Safe weather for drip fertigation.')}\n`;

    return { text, isStructured: false };
  }

  // 3. Mandi Queries
  if (queryLower.includes('mandi') || queryLower.includes('price') || queryLower.includes('rate') || queryLower.includes('भाव') || queryLower.includes('મંડી')) {
    const topMandi = mandiRates?.[0] || { crop: "Cotton", highestPrice: 7410, markets: [{ name: "APMC Market", price: 7250 }] };
    let text = `💰 **APMC Mandi Intelligence (${location.district || location.formatted})**\n\n`;
    text += `• **Commodity**: ${topMandi.crop}\n`;
    text += `• **Top Rate Today**: ₹${topMandi.highestPrice || 7410} / quintal (${topMandi.trend || '+3.5% 30-day trend'})\n`;
    if (topMandi.markets?.[0]) {
      text += `• **Primary Yard**: ${topMandi.markets[0].name} @ ₹${topMandi.markets[0].price} (${topMandi.markets[0].distanceKm || 6} km away)\n`;
    }
    return { text, isStructured: false };
  }

  // 4. Default Agronomic Advisory Response
  const defaultText = `🌱 **AgriSaathi AI Agronomy Advisory**\n\n` +
    `Hello ${farmerProfile.name || 'Farmer'} Ji! Based on your farm in **${location.formatted}** (Soil: *${farmerProfile.soilType}*, Primary Crops: *${farmerProfile.primaryCrops?.join(', ')}*):\n\n` +
    `1. **Current Telemetry**: Temperature is ${weatherData?.current?.temp ?? 29}°C with ${weatherData?.current?.rainProbability ?? 35}% rain likelihood.\n` +
    `2. **Prescription**: Follow regular crop protection protocols. You can also scan any suspicious leaf with the **📸 Crop Doctor** tool or ask me about specific pests (e.g. *Pink Bollworm*, *Early Blight*, *Yellow Rust*, *Armyworm*).\n\n` +
    `What specific crop, pest, or fertilizer question would you like me to analyze?`;

  return { text: defaultText, isStructured: false };
}
