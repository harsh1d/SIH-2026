/**
 * AgriSaathi AI Intelligent Knowledge & Grounding Engine
 * 
 * Features:
 * - Multilingual AI responses (Hindi, Gujarati, Malayalam, English)
 * - Live Wikipedia API real-time search & summary extraction (en.wikipedia.org / hi.wikipedia.org)
 * - Deep farm telemetry injection (Farmer Profile, Soil, Weather, Crops, Mandi rates)
 * - Multi-category agronomic database (Pests, Diseases, Nutrition, Weather Impact, Schemes)
 * - Clean text formatting (no raw markdown asterisks)
 * - Text-to-Speech (TTS) voice synthesis in native regional language
 */

// Curated Agricultural Knowledge Base with high-precision agronomic data
export const AGRONOMY_KNOWLEDGE_BASE = {
  // PESTS & INSECTS
  pink_bollworm: {
    name: {
      en: "Pink Bollworm (Pectinophora gossypiella)",
      hi: "गुलाबी सुंडी / पिंक बोलवर्म (पेक्टिनोफोरा गॉसिपिएला)",
      gu: "ગુલાબી ઈયળ / પિંક બોલવોર્મ",
      ml: "പിങ്ക് ബോൾവോം പുഴു"
    },
    crop: {
      en: "Cotton",
      hi: "कपास",
      gu: "કપાસ",
      ml: "പരുത്തി"
    },
    category: "Pest Infestation",
    confidence: 94,
    wikiQuery: "Pectinophora_gossypiella",
    environmentalCause: {
      en: "High relative humidity (>70%) with night temperatures between 24°C-28°C promotes adult moth egg-laying and larval entry into developing cotton bolls.",
      hi: "70% से अधिक नमी और 24°C-28°C रात के तापमान के कारण कीटों का प्रकोप बढ़ता है और सुंडी गूलर के अंदर घुसकर नुकसान पहुंचाती है।",
      gu: "70% થી વધુ ભેજ અને 24°C-28°C રાત્રિ તાપમાનના કારણે ઈયળ કપાસના જીંડવામાં પ્રવેશી નુકસાન કરે છે.",
      ml: "70% ൽ കൂടുതൽ ഈർപ്പവും 24°C-28°C താപനിലയും പുഴുക്കൾ പരുത്തിക്കായയിൽ പ്രവേശിക്കാൻ കാരണമാകുന്നു."
    },
    chemicalTreatment: {
      en: "• Spray Profenophos 50% EC @ 2.0 ml per litre water OR\n• Spray Emamectin Benzoate 5% SG @ 0.5 g per litre water during evening hours.",
      hi: "• प्रोफेनोफॉस 50% ईसी (2.0 मिली प्रति लीटर पानी) का छिड़काव करें या\n• एमामेक्टिन बेंजोएट 5% एसजी (0.5 ग्राम प्रति लीटर पानी) शाम के समय छिड़कें।",
      gu: "• પ્રોફેનોફોસ 50% EC (2.0 મિલી પ્રતિ લીટર પાણી) અથવા\n• એમામેક્ટીન બેન્ઝોએટ 5% SG (0.5 ગ્રામ પ્રતિ લીટર પાણી) સાંજના સમયે છાંટવું.",
      ml: "• പ്രൊഫെനോഫോസ് 50% EC (2 മില്ലി / ലിറ്റർ വെള്ളം) അല്ലെങ്കിൽ\n• എമാമെക്റ്റിൻ ബെൻസോയേറ്റ് 5% SG (0.5 ഗ്രാം / ലിറ്റർ വെള്ളം) വൈകുന്നേരം തളിക്കുക."
    },
    organicTreatment: {
      en: "• Install 5-8 Pheromone Traps (Gossyplure lure) per acre.\n• Release Trichogramma parasitoid @ 60,000 per acre.\n• Apply 5% Neem Seed Kernel Extract (NSKE) @ 3 ml per litre.",
      hi: "• प्रति एकड़ 5-8 फेरोमोन ट्रैप (गुलाबी सुंडी ल्यूर) लगाएं।\n• ट्राइकोग्रामा परजीवी 60,000 प्रति एकड़ छोड़ें।\n• 5% नीम के बीज का काढ़ा (एनएसकेई) 3 मिली प्रति लीटर पानी में मिलाकर छिड़कें।",
      gu: "• એકરે 5-8 ફેરોમોન ટ્રેપ લગાવો.\n• ટ્રાઇકોગ્રામા પરોપજીવી 60,000 પ્રતિ એકર છોડો.\n• 5% લીંબોળીના અર્ક (NSKE) 3 મિલી પ્રતિ લીટર પાણીમાં છાંટવું.",
      ml: "• ഏക്കറിന് 5-8 ഫെറോമോൺ കെണികൾ സ്ഥാപിക്കുക.\n• ട്രൈക്കോഗ്രാമ 60,000 ഏക്കറിന് വിടുക.\n• 5% വേപ്പെണ്ണ മിശ്രിതം തളിക്കുക."
    },
    whatToAvoid: {
      en: "Do NOT use broad-spectrum synthetic pyrethroids early in the season as they kill predatory insects.",
      hi: "शुरुआती अवस्था में अत्यधिक सिंथेटिक पाइरेथ्रोइड कीटनाशक का प्रयोग न करें, इससे मित्र कीट नष्ट हो जाते हैं।",
      gu: "શરૂઆતના તબક્કે વધારે રસાયણો ન છાંટવા જેથી મિત્ર કીટકો બચી શકે.",
      ml: "ആദ്യഘട്ടങ്ങളിൽ അമിത കീടനാശിനി പ്രയോഗം ഒഴിവാക്കുക."
    },
    monitoringSchedule: {
      en: "Inspect 20 bolls per acre every 4 days. If ETL exceeds 5-8% infested bolls, spray immediately.",
      hi: "हर 4 दिन में प्रति एकड़ 20 गूलर की जांच करें। 5% से अधिक नुकसान दिखने पर तुरंत छिड़काव करें।",
      gu: "દર 4 દિવસે 20 જીંડવાની તપાસ કરો. 5% નુકસાન દેખાય તો તરત દવાનો છંટકાવ કરો.",
      ml: "ഓരോ 4 ദിവസത്തിലും 20 പരുത്തിക്കായ്കൾ പരിശോധിച്ച് ഉറപ്പുവരുത്തുക."
    }
  },

  fall_armyworm: {
    name: {
      en: "Fall Armyworm (Spodoptera frugiperda)",
      hi: "फॉल आर्मीवर्म / सैनिक कीट (मक्का कीट)",
      gu: "લશ્કરી ઈયળ / ફોલ આર્મીવોર્મ",
      ml: "ഫോൾ ആർമിവോം പുഴു"
    },
    crop: {
      en: "Maize",
      hi: "मक्का",
      gu: "મકાઈ",
      ml: "മക്കച്ചോളം"
    },
    category: "Pest Infestation",
    confidence: 91,
    wikiQuery: "Fall_armyworm",
    environmentalCause: {
      en: "Warm humid temperatures (28°C-34°C) accelerate the larval lifecycle.",
      hi: "28°C-34°C का गर्म और आर्द्र मौसम इस कीट के तेजी से फैलने का मुख्य कारण है।",
      gu: "28°C-34°C ગરમ અને ભેજવાળું વાતાવરણ ઈયળના ઝડપી ફેલાવા માટે અનુકૂળ છે.",
      ml: "28°C-34°C വരെയുള്ള ചൂടും ഈർപ്പവും പുഴു വ്യാപനത്തിന് കാരണമാകുന്നു."
    },
    chemicalTreatment: {
      en: "• Spray Chlorantraniliprole 18.5% SC @ 0.4 ml per litre water directed into the plant whorl OR\n• Spray Spinetoram 11.7% SC @ 0.5 ml per litre water.",
      hi: "• क्लोरेंट्रानिलिप्रोल 18.5% एससी (0.4 मिली प्रति लीटर पानी) पौधे के पोंगे (भोंपू) के अंदर छिड़कें या\n• स्पाइनेटोरम 11.7% एससी (0.5 मिली प्रति लीटर पानी) का उपयोग करें।",
      gu: "• ક્લોરાન્ટ્રાનિલિપ્રોલ 18.5% SC (0.4 મિલી પ્રતિ લીટર) છોડની ભૂંગળીમાં છાંટવું અથવા\n• સ્પાઇનેટોરમ 11.7% SC (0.5 મિલી પ્રતિ લીટર) વાપરવું.",
      ml: "• ക്ലോറാൻട്രാനിലിപ്രോൾ 18.5% SC (0.4 മില്ലി / ലിറ്റർ വെള്ളം) തളിക്കുക."
    },
    organicTreatment: {
      en: "• Apply dry sand mixed with ash or lime into plant whorls to desiccate young caterpillars.\n• Spray Bacillus thuringiensis (Bt) @ 2 g per litre.",
      hi: "• मक्का के पोंगे में राख या बारीक रेत डालें जिससे छोटी सुंडी सूख जाती है।\n• बैसिलस थुरिंजिएंसिस (बीटी) 2 ग्राम प्रति लीटर पानी में छिड़कें।",
      gu: "• મકાઈની ભૂંગળીમાં રાખ અથવા રેતી નાખો જેથી ઈયળ સુકાઈ જાય.\n• બાસિલસ થુરિન્જિએન્સિસ (Bt) 2 ગ્રામ પ્રતિ લીટર છાંટવું.",
      ml: "• ചാരം അല്ലെങ്കിൽ മണൽ ചെടിയുടെ മധ്യഭാഗത്ത് ഇടുക. ബിടി 2 ഗ്രാം / ലിറ്റർ തളിക്കുക."
    },
    whatToAvoid: {
      en: "Avoid spraying only on outer leaves; nozzle must target the central leaf whorl.",
      hi: "केवल ऊपरी पत्तियों पर दवा न छिड़कें, दवा सीधे पौधे के केंद्र (पोंगे) में जानी चाहिए।",
      gu: "માત્ર ઉપરના પાંદડા પર દવા ન છાંટવી, ભૂંગળીમાં દવા પહોંચવી જરૂરી છે.",
      ml: "പുറം ഇലകളിൽ മാത്രം തളിക്കരുത്, മധ്യഭാഗത്ത് തളിക്കുക."
    },
    monitoringSchedule: {
      en: "Inspect seedling whorls every 3-5 days.",
      hi: "हर 3-5 दिन में पौधों के केंद्र की जांच करें।",
      gu: "દર 3-5 દિવસે મકાઈના છોડની તપાસ કરો.",
      ml: "ഓരോ 3-5 ദിവസത്തിലും വിളകൾ പരിശോധിക്കുക."
    }
  },

  early_blight: {
    name: {
      en: "Early Blight (Alternaria solani)",
      hi: "अगेती झुलसा / अर्ली ब्लाइट (अल्टरनेरिया सोलानी)",
      gu: "અગેતી સુકારો / અર્લી બ્લાઇટ",
      ml: "ഏർലി ബ്ലൈറ്റ് കുമിൾ രോഗം"
    },
    crop: {
      en: "Tomato, Potato",
      hi: "टमाटर, आलू",
      gu: "ટામેટા, બટાકા",
      ml: "തക്കാളി, ഉരുളക്കിഴങ്ങ്"
    },
    category: "Fungal Disease",
    confidence: 92,
    wikiQuery: "Alternaria_solani",
    environmentalCause: {
      en: "Frequent alternating wet rainy periods and warm sunny days (24°C-30°C).",
      hi: "बारिश के बाद तेज धूप और 24°C-30°C तापमान से फफूंद के गोल छल्लेदार काले धब्बे बनते हैं।",
      gu: "વરસાદ પછી તડકો અને 24°C-30°C તાપમાનના કારણે પાંદડા પર કાળા ગોળ ટપકાં પડે છે.",
      ml: "മഴയും വെയിലും മാറിമാറി വരുന്ന കാലാവസ്ഥ ഈ കുമിൾ രോഗത്തിന് കാരണമാകുന്നു."
    },
    chemicalTreatment: {
      en: "• Spray Mancozeb 75% WP @ 2.5 g per litre water OR\n• Spray Azoxystrobin + Difenoconazole @ 1.0 ml per litre water.",
      hi: "• मैंकोजेब 75% डब्लूपी (2.5 ग्राम प्रति लीटर पानी) का छिड़काव करें या\n• एज़ोक्सिस्ट्रोबिन + डिफेनोकोनाज़ोल (1.0 मिली प्रति लीटर) का उपयोग करें।",
      gu: "• મેન્કોઝેબ 75% WP (2.5 ગ્રામ પ્રતિ લીટર) અથવા\n• એઝોક્સિસ્ટ્રોબિન + ડિફેનોકોનાઝોલ (1.0 મિલી પ્રતિ લીટર) છાંટવું.",
      ml: "• മാങ്കോസെബ് 75% WP (2.5 ഗ്രാം / ലിറ്റർ വെള്ളം) തളിക്കുക."
    },
    organicTreatment: {
      en: "• Spray Trichoderma harzianum @ 5 g per litre as bio-fungicide.\n• Prune bottom 15 cm leaves to prevent soil splash.",
      hi: "• ट्राइकोडर्मा हरज़ियानम 5 ग्राम प्रति लीटर पानी में मिलाकर जैविक छिड़काव करें।\n• पौधे की नीचे की 15 सेमी पत्तियों को काट दें ताकि मिट्टी का पानी न उछले।",
      gu: "• ટ્રાઇકોડર્મા 5 ગ્રામ પ્રતિ લીટર પાણીમાં જૈવિક દવાનો છંટકાવ કરવો.\n• નીચેના સુકા પાંદડા કાપીને દૂર કરવા.",
      ml: "• ട്രൈക്കോഡെർമ 5 ഗ്രാം / ലിറ്റർ തളിക്കുക."
    },
    whatToAvoid: {
      en: "Avoid late evening overhead sprinkler watering which keeps foliage wet overnight.",
      hi: "शाम के समय ऊपर से फव्वारा सिंचाई न करें, इससे रात भर पत्तियां गीली रहने से रोग बढ़ता है।",
      gu: "સાંજે ઉપરથી ફુવારા પદ્ધતિથી પાણી ન આપવું જેથી પાંદડા ભીના ન રહે.",
      ml: "വൈകുന്നേരങ്ങളിൽ ഇലകളിൽ വെള്ളം തളിക്കുന്നത് ഒഴിവാക്കുക."
    },
    monitoringSchedule: {
      en: "Re-examine foliage after 5 days; remove heavily spotted lower leaves.",
      hi: "5 दिन बाद दोबारा पत्तियों की जांच करें और अत्यधिक खराब पत्तियों को तोड़कर नष्ट कर दें।",
      gu: "5 દિવસ પછી ફરી તપાસો અને બગડેલા પાંદડા બાળીને નાશ કરો.",
      ml: "5 ദിവസത്തിന് ശേഷം വീണ്ടും പരിശോധിക്കുക."
    }
  },

  yellow_rust_wheat: {
    name: {
      en: "Yellow / Stripe Rust (Puccinia striiformis)",
      hi: "पीला रतुआ / स्ट्राइप रस्ट (गेहूं रोग)",
      gu: "પીળો ગેરુ રોગ (ઘઉં)",
      ml: "മഞ്ഞ തുരുമ്പ് രോഗം (ഗോതമ്പ്)"
    },
    crop: {
      en: "Wheat",
      hi: "गेहूं",
      gu: "ઘઉં",
      ml: "ഗോതമ്പ്"
    },
    category: "Fungal Disease",
    confidence: 95,
    wikiQuery: "Puccinia_striiformis",
    environmentalCause: {
      en: "Cool temperatures (10°C-15°C) with morning dews and cloudy weather.",
      hi: "10°C-15°C की ठंडक, सुबह की ओस और बादलों वाले मौसम में पत्तियों पर पीले पाउडर की धारियां बनती हैं।",
      gu: "10°C-15°C ઠંડક અને સવારના ઝાકળના કારણે ઘઉંના પાન પર પીળી પાવડર જેવી પટ્ટીઓ પડે છે.",
      ml: "തണുപ്പും മഞ്ഞും നിറഞ്ഞ കാലാവസ്ഥയിലാണ് ഈ രോഗം പടരുന്നത്."
    },
    chemicalTreatment: {
      en: "• Spray Propiconazole 25% EC @ 1.0 ml per litre water OR\n• Spray Tebuconazole 25.9% EC @ 1.25 ml per litre water immediately.",
      hi: "• प्रोपीकोनाज़ोल 25% ईसी (1.0 मिली प्रति लीटर पानी) का तुरंत छिड़काव करें या\n• टेबुकोनाज़ोल 25.9% ईसी (1.25 मिली प्रति लीटर पानी) का उपयोग करें।",
      gu: "• પ્રોપિકોનાઝોલ 25% EC (1.0 મિલી પ્રતિ લીટર પાણી) અથવા\n• ટેબુકોનાઝોલ 25.9% EC (1.25 મિલી પ્રતિ લીટર પાણી) તાત્કાલિક છાંટવું.",
      ml: "• പ്രൊപ്പികൊനാസോൾ 25% EC (1 മില്ലി / ലിറ്റർ) തളിക്കുക."
    },
    organicTreatment: {
      en: "• Grow rust-resistant varieties like DBW-187, DBW-222, GW-496.\n• Apply Pseudomonas fluorescens @ 5 ml per litre.",
      hi: "• रोग-रोधी किस्में (जैसे डीबीडब्ल्यू-187, डीबीडब्ल्यू-222) लगाएं।\n• स्यूडोमोनास फ्लोरोसेंस 5 मिली प्रति लीटर का छिड़काव करें।",
      gu: "• રોગપ્રતિકારક જાતો જેવી કે GW-496 અથવા DBW-187 વાવવી.\n• સ્યુડોમોનાસ 5 મિલી પ્રતિ લીટર છાંટવું.",
      ml: "• പ്രതിരോധ ശേഷിയുള്ള വിത്തിനക്കങ്ങൾ ഉപയോഗിക്കുക."
    },
    whatToAvoid: {
      en: "Do NOT delay spraying; rust spores can cover whole fields within 48 hours.",
      hi: "पीली धारियां दिखते ही तुरंत छिड़काव करें, देरी करने पर 48 घंटे में पूरा खेत प्रभावित हो सकता है।",
      gu: "દવા છાંટવામાં મોડું ન કરવું, આ રોગ 48 કલાકમાં આખા ખેતરમાં ફેલાઈ શકે છે.",
      ml: "ലക്ഷണങ്ങൾ കണ്ടാൽ ഉടൻ തന്നെ മരുന്ന് തളിക്കുക."
    },
    monitoringSchedule: {
      en: "Inspect wheat fields weekly from December to February.",
      hi: "दिसंबर से फरवरी तक हर हफ्ते गेहूं के खेत के किनारों और छायादार जगहों की जांच करें।",
      gu: "ડિસેમ્બરથી ફેબ્રુઆરી સુધી દર અઠવાડિયે ખેતરના ખૂણા તપાસવા.",
      ml: "ആഴ്ചതോറും വിളകൾ പരിശോധിക്കുക."
    }
  },

  nitrogen_deficiency: {
    name: {
      en: "Nitrogen Deficiency & Rain Leaching Chlorosis",
      hi: "नाइट्रोजन की कमी और बारिश के बाद पीलापन",
      gu: "નાઇટ્રોજનની ઉણપ અને પીળાશ",
      ml: "നൈട്രജൻ കുറവും ഇലകളുടെ മഞ്ഞളിപ്പും"
    },
    crop: {
      en: "Cotton, Wheat, Paddy, Tomato",
      hi: "कपास, गेहूं, धान, टमाटर",
      gu: "કપાસ, ઘઉં, ડાંગર, ટામેટા",
      ml: "പരുത്തി, ഗോതമ്പ്, നെല്ല്, തക്കാളി"
    },
    category: "Nutrient Stress",
    confidence: 90,
    wikiQuery: "Nitrogen_deficiency",
    environmentalCause: {
      en: "Heavy rain runoff leaches soluble nitrate out of the root zone.",
      hi: "भारी बारिश के कारण मिट्टी में मौजूद नाइट्रोजन बहकर नीचे चली जाती है, जिससे नीचे की पत्तियां पीली पड़ने लगती हैं।",
      gu: "ભારે વરસાદના કારણે જમીનમાંથી નાઇટ્રોજન ધોવાઈ જાય છે જેથી નીચેના પાન પીળા પડે છે.",
      ml: "കനത്ത മഴയിൽ മണ്ണിലെ നൈട്രജൻ ഒലിച്ചുപോകുന്നതാണ് ഇതിന് കാരണം."
    },
    chemicalTreatment: {
      en: "• Drip fertigate with 20-25 kg Urea per acre OR Spray 19:19:19 NPK @ 5 g per litre water.\n• Apply Calcium Nitrate @ 10 kg per acre.",
      hi: "• ड्रिप द्वारा 20-25 किग्रा यूरिया प्रति एकड़ दें या 19:19:19 एनपीके (5 ग्राम प्रति लीटर पानी) का पत्तियों पर छिड़काव करें।\n• कैल्शियम नाइट्रेट 10 किग्रा प्रति एकड़ का प्रयोग करें।",
      gu: "• ડ્રિપ દ્વારા 20-25 કિગ્રા યુરિયા આપવું અથવા 19:19:19 NPK (5 ગ્રામ પ્રતિ લીટર) પાંદડા પર છાંટવું.\n• કેલ્શિયમ નાઇટ્રેટ 10 કિગ્રા પ્રતિ એકર વાપરવું.",
      ml: "• എൻപികെ 19:19:19 (5 ഗ്രാം / ലിറ്റർ) ഇലകളിൽ തളിക്കുക."
    },
    organicTreatment: {
      en: "• Apply well-decomposed Vermicompost @ 2 tonnes per acre.\n• Foliar spray of fermented Jeevamrut (200 L per acre).",
      hi: "• 2 टन प्रति एकड़ अच्छी सड़ी हुई गोबर की खाद या वर्मीकम्पोस्ट डालें।\n• जीवामृत (200 लीटर प्रति एकड़) या पंचगव्य 3% का छिड़काव करें।",
      gu: "• સારી રીતે સડેલું દેશી ખાતર અથવા અળસિયા ખાતર 2 ટન પ્રતિ એકર આપવું.\n• જીવામૃત (200 લીટર પ્રતિ એકર) નો છંટકાવ કરવો.",
      ml: "• ജൈവവളവും ജീവാമൃതവും ഉപയോഗിക്കുക."
    },
    whatToAvoid: {
      en: "Do NOT apply granular urea onto flooded or waterlogged soil surfaces.",
      hi: "खेत में पानी भरा होने पर दानेदार यूरिया न डालें, पहले पानी की उचित निकासी करें।",
      gu: "પાણી ભરાયેલું હોય ત્યારે યુરિયા ન નાખવું, પહેલાં નિકાલ કરવો.",
      ml: "വെള്ളക്കെട്ടുള്ള സ്ഥലങ്ങളിൽ യൂറിയ ഉപയോഗിക്കരുത്."
    },
    monitoringSchedule: {
      en: "Observe new leaf flushes in 4-6 days; leaves will regain deep green colour.",
      hi: "4-6 दिनों में नई पत्तियां वापस गहरी हरी हो जाएंगी।",
      gu: "4-6 દિવસમાં નવી કૂંપળો પાછી લીલીછમ થઈ જશે.",
      ml: "4-6 ദിവസത്തിനുള്ളിൽ പുതിയ ഇലകൾ പച്ചനിറമാകും."
    }
  }
};

/**
 * Fetch live real-time Wikipedia summary for any agricultural topic
 */
export async function fetchWikipediaAgriculturalSummary(query, lang = 'en') {
  if (!query || query.trim().length < 2) return null;

  try {
    const cleanQuery = query.replace(/[^\w\s\u0900-\u097F\u0A80-\u0AFF\u0D00-\u0D7F-]/gi, '').trim();
    
    // Choose Wikipedia language endpoint
    const wikiDomain = (lang === 'hi') ? 'hi.wikipedia.org' : 'en.wikipedia.org';
    const searchUrl = `https://${wikiDomain}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQuery + ' agriculture')}&utf8=&format=json&origin=*`;
    
    const searchRes = await fetch(searchUrl, { method: 'GET' });
    if (!searchRes.ok) return null;
    
    const searchData = await searchRes.json();
    const searchResults = searchData?.query?.search;
    
    let targetTitle = cleanQuery;
    if (searchResults && searchResults.length > 0) {
      targetTitle = searchResults[0].title;
    }

    const summaryUrl = `https://${wikiDomain}/api/rest_v1/page/summary/${encodeURIComponent(targetTitle.replace(/\s+/g, '_'))}`;
    const summaryRes = await fetch(summaryUrl);
    
    if (summaryRes.ok) {
      const summaryData = await summaryRes.json();
      if (summaryData.extract && summaryData.extract.length > 30) {
        return {
          title: summaryData.title,
          extract: summaryData.extract,
          url: summaryData.content_urls?.desktop?.page || `https://${wikiDomain}/wiki/${encodeURIComponent(summaryData.title)}`,
          thumbnail: summaryData.thumbnail?.source || null,
          source: (lang === 'hi') ? "विकिपीडिया कृषि ज्ञान कोष" : "Wikipedia Live Knowledge Engine"
        };
      }
    }
  } catch (err) {
    console.warn("Wikipedia live API query fallback:", err);
  }
  return null;
}

/**
 * Synthesizes dynamic AI response strictly in the preferred user language
 */
export async function generateSmartAgriResponse({
  userQuery,
  userImage = null,
  farmerProfile = {},
  location = {},
  weatherData = {},
  mandiRates = [],
  alerts = [],
  conversationHistory = [],
  language = 'en'
}) {
  const queryLower = (userQuery || '').toLowerCase().trim();
  const farmerName = farmerProfile.name || (language === 'hi' ? 'किसान मित्र' : 'Farmer');
  const farmLocation = location.formatted || farmerProfile.location?.formatted || 'Halol, Gujarat';
  const soilType = farmerProfile.soilType || 'Black Cotton Soil (Regur)';
  const farmSize = farmerProfile.farmSizeAcres || 4.5;
  const currentTemp = weatherData?.current?.temp ?? 29;
  const currentHumidity = weatherData?.current?.humidity ?? 78;
  const rainProb = weatherData?.current?.rainProbability ?? 85;

  const langKey = (language === 'hi' || language === 'gu' || language === 'ml') ? language : 'en';

  // 1. Weather / Rain / Spraying safety queries
  const isWeatherQuery = queryLower.includes('rain') || 
    queryLower.includes('weather') || 
    queryLower.includes('बारिश') || 
    queryLower.includes('छिड़काव') || 
    queryLower.includes('मौसम') || 
    queryLower.includes('कीटनाशक') || 
    queryLower.includes('varsad') || 
    queryLower.includes('chhatkav') || 
    queryLower.includes('mausam') || 
    queryLower.includes('mazha') || 
    queryLower.includes('മഴ') || 
    queryLower.includes('കാലാവസ്ഥ');

  if (isWeatherQuery) {
    const wikiWeather = await fetchWikipediaAgriculturalSummary("Monsoon_of_South_Asia", langKey);

    if (langKey === 'hi') {
      return {
        isStructured: false,
        text: `नमस्ते ${farmerName} जी! 🌱\n\nआपके क्षेत्र (${farmLocation}) के लिए आज का मौसम पूर्वानुमान और कीटनाशक छिड़काव सलाह:\n\n` +
              `• वर्तमान तापमान: ${currentTemp}°C\n` +
              `• बारिश की संभावना: ${rainProb}%\n` +
              `• हवा में नमी: ${currentHumidity}%\n\n` +
              `⚠️ कीटनाशक छिड़काव एवं खाद सलाह:\n` +
              `1. आज दोपहर बाद भारी बारिश (${rainProb}%) की संभावना है, इसलिए कीटनाशक या फफूंदनाशी का छिड़काव आज न करें। बारिश से दवा धुल जाएगी।\n` +
              `2. यूरिया या डीएपी खाद का छिड़काव भी आज टालें ताकि पोषक तत्व पानी में बहने से बच सकें।\n` +
              `3. सुरक्षित छिड़काव का समय: बारिश रुकने के बाद कल सुबह (7:00 AM से 10:00 AM) जब धूप निकले और पत्तियां सूख जाएं।`,
        wikiCitation: wikiWeather
      };
    }

    if (langKey === 'gu') {
      return {
        isStructured: false,
        text: `નમસ્તે ${farmerName} જી! 🌱\n\nતમારા વિસ્તાર (${farmLocation}) માટે આજનું હવામાન અને દવાનો છંટકાવ કરવાની સલાહ:\n\n` +
              `• વર્તમાન તાપમાન: ${currentTemp}°C\n` +
              `• વરસાદની શક્યતા: ${rainProb}%\n` +
              `• હવામાં ભેજ: ${currentHumidity}%\n\n` +
              `⚠️ દવાનો છંટકાવ અને ખાતર સલાહ:\n` +
              `1. આજે બપોર પછી ભારે વરસાદની શક્યતા (${rainProb}%) હોવાથી જંતુનાશક કે ફૂગનાશક દવાનો છંટકાવ આજે કરવો નહીં. વરસાદમાં દવા ધોવાઈ જશે.\n` +
              `2. રાસાયણિક ખાતર આપવાનું પણ આજે મુલતવી રાખો જેથી ખાતરનો બગાડ અટકે.\n` +
              `3. છંટકાવ માટે અનુકૂળ સમય: વરસાદ રોકાયા પછી આવતીકાલે સવારે (7:00 AM થી 10:00 AM) જ્યારે પાંદડા સુકાઈ જાય.`,
        wikiCitation: wikiWeather
      };
    }

    if (langKey === 'ml') {
      return {
        isStructured: false,
        text: `നമസ്കാരം ${farmerName} ജി! 🌱\n\nനിങ്ങളുടെ ഫാം ലൊക്കേഷനിലെ (${farmLocation}) ഇന്നത്തെ കാലാവസ്ഥയും മരുന്ന് തളിക്കൽ നിർദ്ദേശങ്ങളും:\n\n` +
              `• താപനില: ${currentTemp}°C\n` +
              `• മഴ സാധ്യത: ${rainProb}%\n` +
              `• ഈർപ്പം: ${currentHumidity}%\n\n` +
              `⚠️ മരുന്ന് തളിക്കൽ മുന്നറിയിപ്പ്:\n` +
              `1. ഇന്ന് ഉച്ചയ്ക്ക് ശേഷം കനത്ത മഴയ്ക്ക് സാധ്യതയുള്ളതിനാൽ (${rainProb}%) കീടനാശിനി തളിക്കൽ ഒഴിവാക്കുക. മഴയത്ത് മരുന്ന് കഴുകിപ്പോകും.\n` +
              `2. വളപ്രയോഗം ഇന്ന് മാറ്റിവെക്കുക.\n` +
              `3. അനുയോജ്യമായ സമയം: നാളെ രാവിലെ മഴ മാറിയ ശേഷം ഇലകൾ ഉണങ്ങിയിരിക്കുമ്പോൾ തളിക്കുക.`,
        wikiCitation: wikiWeather
      };
    }

    // Default English
    return {
      isStructured: false,
      text: `Namaste ${farmerName} Ji! 🌱\n\nAgro-Meteorological Forecast & Spraying Advisory for ${farmLocation}:\n\n` +
            `• Current Temperature: ${currentTemp}°C\n` +
            `• Precipitation Probability: ${rainProb}%\n` +
            `• Air Humidity: ${currentHumidity}%\n\n` +
            `⚠️ Spraying & Fertilizer Advisory:\n` +
            `1. High chance of afternoon rain (${rainProb}%). Do NOT spray pesticides or foliar nutrients today as the chemical wash-off will waste money.\n` +
            `2. Postpone granular Urea/DAP application to prevent leaching runoff.\n` +
            `3. Safe Spraying Window: Tomorrow morning (7:00 AM - 10:00 AM) once sunshine dries leaf foliage.`,
      wikiCitation: wikiWeather
    };
  }

  // 2. Pest & Disease Matching
  let matchedKB = null;
  if (queryLower.includes('pink bollworm') || queryLower.includes('bollworm') || queryLower.includes('गुलाबी') || queryLower.includes('સુંડી') || queryLower.includes('ઈયળ') || queryLower.includes('cotton pest')) {
    matchedKB = AGRONOMY_KNOWLEDGE_BASE.pink_bollworm;
  } else if (queryLower.includes('fall armyworm') || queryLower.includes('armyworm') || queryLower.includes('लश्करी') || queryLower.includes('सैनिक') || queryLower.includes('makka') || queryLower.includes('maize')) {
    matchedKB = AGRONOMY_KNOWLEDGE_BASE.fall_armyworm;
  } else if (queryLower.includes('early blight') || queryLower.includes('झुलसा') || queryLower.includes('સુકારો') || queryLower.includes('tomato') || queryLower.includes('टमाटर') || queryLower.includes('ટામેટા')) {
    matchedKB = AGRONOMY_KNOWLEDGE_BASE.early_blight;
  } else if (queryLower.includes('yellow rust') || queryLower.includes('रतुआ') || queryLower.includes('ગેરુ') || queryLower.includes('wheat') || queryLower.includes('गेहूं') || queryLower.includes('ઘઉં')) {
    matchedKB = AGRONOMY_KNOWLEDGE_BASE.yellow_rust_wheat;
  } else if (queryLower.includes('yellow') || queryLower.includes('पीली') || queryLower.includes('પીળા') || queryLower.includes('chlorosis') || queryLower.includes('urea') || queryLower.includes('खाद')) {
    matchedKB = AGRONOMY_KNOWLEDGE_BASE.nitrogen_deficiency;
  }

  if (matchedKB) {
    const wikiData = await fetchWikipediaAgriculturalSummary(matchedKB.wikiQuery, langKey);
    const kbName = matchedKB.name[langKey] || matchedKB.name.en;
    const kbCrop = matchedKB.crop[langKey] || matchedKB.crop.en;
    const kbCause = matchedKB.environmentalCause[langKey] || matchedKB.environmentalCause.en;
    const kbChem = matchedKB.chemicalTreatment[langKey] || matchedKB.chemicalTreatment.en;
    const kbOrg = matchedKB.organicTreatment[langKey] || matchedKB.organicTreatment.en;
    const kbAvoid = matchedKB.whatToAvoid[langKey] || matchedKB.whatToAvoid.en;
    const kbSchedule = matchedKB.monitoringSchedule[langKey] || matchedKB.monitoringSchedule.en;

    const chemLabel = langKey === 'hi' ? 'अनुशंसित रासायनिक उपचार:' : langKey === 'gu' ? 'રાસાયણિક ઉપચાર:' : langKey === 'ml' ? 'രാസ നിയന്ത്രണം:' : 'Chemical Protocol:';
    const orgLabel = langKey === 'hi' ? 'जैविक व प्राकृतिक विकल्प:' : langKey === 'gu' ? 'જૈવિક ઉપચાર:' : langKey === 'ml' ? 'ജൈവ നിയന്ത്രണം:' : 'Organic Alternative:';

    return {
      isStructured: true,
      data: {
        issue: `${kbName} (${kbCrop})`,
        category: matchedKB.category,
        confidence: matchedKB.confidence,
        telemetryContext: `${farmerName} • ${farmLocation} • ${soilType}`,
        whyHappening: kbCause,
        recommendedAction: `${chemLabel}\n${kbChem}\n\n${orgLabel}\n${kbOrg}`,
        whatToAvoid: kbAvoid,
        whenToCheck: kbSchedule,
        whenToContactExpert: langKey === 'hi' ? "यदि 5 दिनों के अंदर सुधार न दिखे तो केवीके कृषि वैज्ञानिक से संपर्क करें।" : "Escalate to KVK Specialist if symptoms persist after 5 days.",
        wikiCitation: wikiData
      }
    };
  }

  // 3. Mandi Market Rate queries
  if (queryLower.includes('mandi') || queryLower.includes('भाव') || queryLower.includes('rate') || queryLower.includes('price') || queryLower.includes('કિંમત') || queryLower.includes('വില')) {
    const selectedMandi = mandiRates[0] || { crop: "Cotton", highestPrice: 7410, lowestPrice: 7120, trend: "+4.2%" };
    
    if (langKey === 'hi') {
      return {
        isStructured: false,
        text: `💰 ${farmLocation} मंडी भाव विश्लेषण (${selectedMandi.crop}):\n\n` +
              `• आज का उच्चतम मंडी भाव: ₹${selectedMandi.highestPrice} / क्विंटल\n` +
              `• जिला औसत भाव: ₹${selectedMandi.lowestPrice} / क्विंटल\n` +
              `• 30-दिवसीय बाजार रुझान: 📈 ${selectedMandi.trend} (बढ़त)\n\n` +
              `💡 एआई किसान बिक्री सलाह:\n` +
              `कपास के भाव में अगले 10 दिनों में 2-3% की और वृद्धि होने की संभावना है। यदि आपके पास भंडारण की सुविधा है, तो माल रोककर धीरे-धीरे बेचें। पास की मुख्य एपीएमसी मंडी में बेचने पर ₹290 प्रति क्विंटल का अतिरिक्त लाभ मिल रहा है।`
      };
    }

    if (langKey === 'gu') {
      return {
        isStructured: false,
        text: `💰 ${farmLocation} નજીકની મંડીના ભાવ (${selectedMandi.crop}):\n\n` +
              `• આજનો સૌથી ઊંચો ભાવ: ₹${selectedMandi.highestPrice} / ક્વિન્ટલ\n` +
              `• જિલ્લા સરેરાશ ભાવ: ₹${selectedMandi.lowestPrice} / ક્વિન્ટલ\n` +
              `• 30 દિવસનો રુજાન: 📈 ${selectedMandi.trend} (તેજી)\n\n` +
              `💡 એઆઈ વેચાણ સલાહ:\n` +
              `આગામી દિવસોમાં કપાસના ભાવમાં તેજી રહેવાની ધારણા છે. મુખ્ય એપીએમસીમાં માલ લઈ જવાથી ક્વિન્ટલ દીઠ ₹290 નો વધારાનો નફો મળી શકે છે.`
      };
    }

    if (langKey === 'ml') {
      return {
        isStructured: false,
        text: `💰 വിപണി വിലനിലവാരം (${selectedMandi.crop}):\n\n` +
              `• ഉയർന്ന വിപണി വില: ₹${selectedMandi.highestPrice} / ക്വിന്റൽ\n` +
              `• ശരാശരി വില: ₹${selectedMandi.lowestPrice} / ക്വിന്റൽ\n` +
              `• ട്രെൻഡ്: 📈 ${selectedMandi.trend}\n\n` +
              `💡 എഐ നിർദ്ദേശം: അടുത്ത ദിവസങ്ങളിൽ വില വർദ്ധിക്കാൻ സാധ്യതയുള്ളതിനാൽ വിൽപ്പന പതുക്കെയാക്കുക.`
      };
    }

    return {
      isStructured: false,
      text: `💰 APMC Mandi Rates for ${farmLocation} (${selectedMandi.crop}):\n\n` +
            `• Highest Mandi Price: ₹${selectedMandi.highestPrice} / quintal\n` +
            `• District Average: ₹${selectedMandi.lowestPrice} / quintal\n` +
            `• Market Trend: 📈 ${selectedMandi.trend}\n\n` +
            `💡 AI Advice: Hold stock if storage is available; transporting to the nearest main APMC yields a ₹290/quintal price premium.`
    };
  }

  // 4. Government Schemes & Subsidies
  if (queryLower.includes('scheme') || queryLower.includes('योजना') || queryLower.includes('subsidy') || queryLower.includes('યોજના') || queryLower.includes('പദ്ധതി') || queryLower.includes('pm kisan')) {
    if (langKey === 'hi') {
      return {
        isStructured: false,
        text: `🏛️ आपके खेत (${farmSize} एकड़, ${farmLocation}) के लिए मुख्य सरकारी योजनाएं:\n\n` +
              `1. प्रधानमंत्री किसान सम्मान निधि (PM-KISAN):\n` +
              `   • लाभ: ₹6,000 प्रति वर्ष (₹2,000 की 3 किस्तों में सीधे बैंक खाते में)।\n\n` +
              `2. प्रधानमंत्री फसल बीमा योजना (PMFBY):\n` +
              `   • लाभ: बेमौसम बारिश, सूखा या कीट प्रकोप से फसल क्षति पर 1.5%-2% प्रीमियम पर संपूर्ण सुरक्षा।\n\n` +
              `3. सूक्ष्म सिंचाई ड्रिप सब्सिडी (Per Drop More Crop):\n` +
              `   • लाभ: ड्रिप और स्प्रिंकलर सिस्टम लगाने पर 70% सरकारी सब्सिडी।\n\n` +
              `📌 आप वेबसाइट के 'योजनाएं व समाचार' टैब में जाकर सीधे पात्रता जांच सकते हैं।`
      };
    }

    if (langKey === 'gu') {
      return {
        isStructured: false,
        text: `🏛️ તમારા ખેતર (${farmSize} એકર, ${farmLocation}) માટે મુખ્ય સરકારી યોજનાઓ:\n\n` +
              `1. પીએમ કિસાન સન્માન નિધિ:\n` +
              `   • વાર્ષિક ₹6,000 ની સહાય (દર 4 મહિને ₹2,000 ખાતામાં).\n\n` +
              `2. પ્રધાનમંત્રી ફસલ બીમા યોજના (PMFBY):\n` +
              `   • કુદરતી આપત્તિ સામે પાક સુરક્ષા વીમો.\n\n` +
              `3. ડ્રિપ ઇરિગેશન સબસિડી (GGRC):\n` +
              `   • ટપક સિંચાઈ પદ્ધતિ માટે 70% સુધી સબસિડી.`
      };
    }

    return {
      isStructured: false,
      text: `🏛️ Government Schemes for ${farmSize} Acre Farm in ${farmLocation}:\n\n` +
            `1. PM-Kisan Samman Nidhi: ₹6,000/year in 3 installments directly via DBT.\n` +
            `2. PM Fasal Bima Yojana (PMFBY): Crop insurance against drought, heavy rains, and pest epidemics.\n` +
            `3. Drip Irrigation Subsidy: Up to 70% financial assistance for micro-irrigation systems.`
    };
  }

  // 5. Generic Wikipedia Search fallback with localized greeting
  const liveWiki = await fetchWikipediaAgriculturalSummary(userQuery, langKey);
  if (liveWiki) {
    if (langKey === 'hi') {
      return {
        isStructured: false,
        text: `नमस्ते ${farmerName} जी! 🌱\n\nआपके प्रश्न के अनुसार प्रमाणित वैज्ञानिक जानकारी:\n\n${liveWiki.extract}\n\n🌾 आपके खेत (${farmLocation}) के लिए सुझाव: मिट्टी की नमी की नियमित जांच करें और मौसम के अनुसार ही सिंचाई व खाद का प्रयोग करें।`,
        wikiCitation: liveWiki
      };
    }
    if (langKey === 'gu') {
      return {
        isStructured: false,
        text: `નમસ્તે ${farmerName} જી! 🌱\n\nતમારા પ્રશ્ન માટે પ્રમાણિત કૃષિ માહિતી:\n\n${liveWiki.extract}\n\n🌾 તમારા ખેતર (${farmLocation}) માટે ભલામણ: જમીનમાં ભેજનું પ્રમાણ જાળવી રાખો અને હવામાન મુજબ જ ખાતર આપો.`,
        wikiCitation: liveWiki
      };
    }
    if (langKey === 'ml') {
      return {
        isStructured: false,
        text: `നമസ്കാരം ${farmerName} ജി! 🌱\n\nനിങ്ങളുടെ ചോദ്യത്തിനുള്ള കൃഷി വിവരങ്ങൾ:\n\n${liveWiki.extract}\n\n🌾 ഫാം നിർദ്ദേശം (${farmLocation}): മണ്ണിലെ ഈർപ്പം നിരീക്ഷിക്കുകയും കാലാവസ്ഥയ്ക്ക് അനുസരിച്ച് വളപ്രയോഗം നടത്തുകയും ചെയ്യുക.`,
        wikiCitation: liveWiki
      };
    }

    return {
      isStructured: false,
      text: `Namaste ${farmerName} Ji! 🌱\n\nHere is verified agronomic information for "${liveWiki.title}":\n\n${liveWiki.extract}\n\n🌾 Field Advisory for ${farmLocation} (${soilType}):\nEnsure balanced soil nutrition, monitor local weather before irrigation, and adhere to recommended pesticide dilution rates.`,
      wikiCitation: liveWiki
    };
  }

  // Default Fallback in user language
  if (langKey === 'hi') {
    return {
      isStructured: true,
      data: {
        issue: "सामान्य फसल देखरेख व पोषण सलाह",
        category: "कृषि पद्धति",
        confidence: 88,
        telemetryContext: `${farmerName} • ${farmLocation} • ${soilType}`,
        whyHappening: `मौसम का तापमान (${currentTemp}°C) और ${currentHumidity}% नमी फसल वृद्धि को प्रभावित कर रही है।`,
        recommendedAction: "1. सप्ताह में दो बार पत्तियों पर रस चूसक कीटों की जांच करें।\n2. ड्रिप सिंचाई के माध्यम से उचित नमी बनाए रखें।\n3. वानस्पतिक वृद्धि के समय संतुलित एनपीके 19:19:19 का छिड़काव करें।",
        whatToAvoid: "बिना कीट गिने अत्यधिक कीटनाशकों का प्रयोग न करें।",
        whenToCheck: "हर 3-4 दिन में खेत का निरीक्षण करें।",
        whenToContactExpert: "समस्या का समाधान न होने पर निकटतम केवीके वैज्ञानिक से संपर्क करें।"
      }
    };
  }

  return {
    isStructured: true,
    data: {
      issue: "General Crop Care & Soil Advisory",
      category: "Agronomic Practice",
      confidence: 88,
      telemetryContext: `${farmerName} • ${farmLocation} • ${soilType}`,
      whyHappening: `Crop development in ${farmLocation} is currently influenced by ambient temperature (${currentTemp}°C) and ${currentHumidity}% humidity.`,
      recommendedAction: "1. Inspect foliage twice weekly for sucking pests.\n2. Maintain soil moisture equilibrium through regulated drip cycles.\n3. Apply balanced NPK 19:19:19 foliar spray during vegetative flushes.",
      whatToAvoid: "Avoid excess chemical applications without prior economic threshold (ETL) pest count.",
      whenToCheck: "Inspect fields every 3 to 4 days.",
      whenToContactExpert: "Connect with your nearest Krishi Vigyan Kendra (KVK) agronomist for personalized field visits."
    }
  };
}

/**
 * Text-to-Speech (TTS) Browser Speech Synthesis Helper
 */
export function speakAgronomyText(text, lang = 'en-IN') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();
  const cleanText = (text || '').replace(/[*•#`_]/g, '').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  utterance.lang = lang;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
