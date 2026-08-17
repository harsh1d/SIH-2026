import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { mockAIResponses, mockWeatherData, mockMandiRates, mockSchemes, mockCrops } from '../data/mockData';
import { 
  Bot, 
  Sparkles, 
  Mic, 
  Paperclip, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  UserCheck, 
  MapPin, 
  Calendar,
  Volume2,
  Search,
  ShieldCheck,
  RotateCcw,
  Landmark,
  TrendingUp,
  CloudRain,
  Sprout,
  Image as ImageIcon
} from 'lucide-react';

export const AIAssistantPage = () => {
  const { location, farmerProfile, setActiveTab, t, showToast } = useApp();

  const [queryInput, setQueryInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastFailedQuery, setLastFailedQuery] = useState(null);

  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Namaste ${farmerProfile.name || 'Farmer'} Ji! I am AgriSaathi AI. I have loaded your farm telemetry for ${location.formatted || 'Halol, Gujarat'}, Cotton (${mockCrops[0]?.currentStage}), and live weather. How can I assist your crop today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const quickChips = [
    { label: "🌱 Cotton leaf yellowing", query: "My cotton leaves are turning yellow." },
    { label: "🐛 Pink Bollworm prevention", query: "How to prevent Pink Bollworm in Cotton?" },
    { label: "💧 Wheat irrigation schedule", query: "When should I water my wheat crop?" },
    { label: "🌦️ Will it rain in Halol tomorrow?", query: "Will it rain in Halol tomorrow?" },
    { label: "💰 Today's cotton mandi price", query: "What is today's cotton price in nearby mandi?" },
    { label: "🏛️ Government schemes for farmers", query: "Tell me about government schemes for small farmers" },
    { label: "🪨 Soil & crop advice", query: "Which crop is suitable for my soil and location?" }
  ];

  const handleSuggestedClick = (questionText) => {
    setQueryInput(questionText);
    submitQuery(questionText);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      showToast('Voice recognition API simulated: "My cotton leaves are turning yellow after rain"', 'info');
      const voiceQuery = "My cotton leaves are turning yellow after rain";
      setQueryInput(voiceQuery);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';

    setIsRecording(true);
    showToast('Listening... Speak your query clearly', 'info');

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQueryInput(transcript);
      setIsRecording(false);
      showToast(`Captured: "${transcript}"`, 'success');
    };

    recognition.onerror = () => {
      setIsRecording(false);
      showToast('Voice recognition timed out. Try typing.', 'error');
    };

    recognition.start();
  };

  // Helper to generate Context-Aware & Real Data Driven AI Responses
  const generateAIResponse = (userText, userImg, history) => {
    const rawLower = userText.toLowerCase().trim();

    // Look back at previous messages to maintain context
    const previousUserMsgs = history.filter(m => m.sender === 'user');
    const lastUserMsg = previousUserMsgs.length > 1 ? previousUserMsgs[previousUserMsgs.length - 2].text.toLowerCase() : '';

    // Check if query is out of scope (Non-Agriculture)
    const outOfScopeKeywords = ['capital of', 'who is president', 'write code', 'movie', 'actor', 'cricket score', 'python', 'recipe for pizza'];
    if (outOfScopeKeywords.some(kw => rawLower.includes(kw))) {
      return {
        isStructured: false,
        text: "I’m AgriSaathi, your AI Farmer Assistant 🌱. I’m designed specifically to assist with agriculture, crops, diseases, weather forecasts, mandi prices, and government schemes.\n\nPlease ask me something about your farm, crop health, or weather!"
      };
    }

    // Check for Image Upload / Photo Scan
    if (userImg) {
      return {
        isStructured: true,
        data: {
          issue: "Visual Leaf Tissue Scan Analysis",
          confidence: 87,
          whyHappening: `Image scan of plant leaf shows localized chlorosis (yellowing) and minor necrotic margins. Environmental humidity in ${location.formatted} (${mockWeatherData.current.humidity}%) accelerates spore germination.`,
          recommendedAction: "1. Isolate severely wilting leaves.\n2. Apply Copper Oxychloride 50% WP @ 2.5g/L water during early morning.\n3. Keep field drainage channels clear before expected rainfall.",
          whatToAvoid: "Do NOT spray chemical pesticides during high afternoon wind or heavy rain.",
          whenToCheck: "Re-scan leaf after 7 days using Crop Doctor 7-Day Follow-Up tab.",
          whenToContactExpert: "If yellowing spreads to >25% of farm plot, escalate ticket to KVK Agronomist."
        }
      };
    }

    // Check for Vague Query
    if (rawLower === 'my crop is sick' || rawLower === 'help me' || rawLower === 'crop issue' || rawLower === 'help') {
      return {
        isStructured: false,
        text: "I'd be glad to help! 🌱 What crop are you currently growing on your farm? (e.g. Cotton, Wheat, or Tomato)"
      };
    }

    // 🌦️ WEATHER QUERIES
    if (rawLower.includes('rain') || rawLower.includes('weather') || rawLower.includes('baarish') || rawLower.includes('forecast') || rawLower.includes('varsad') || rawLower.includes('vatsavaran')) {
      const currentLoc = location.formatted || "Halol, Panchmahal, Gujarat";
      const rainToday = mockWeatherData.current.rainProbability;
      const temp = mockWeatherData.current.temp;
      const cond = mockWeatherData.current.condition;

      return {
        isStructured: false,
        text: `🌦️ **Agro-Weather Forecast for ${currentLoc}**\n\n• **Today's Condition**: ${cond} (${temp}°C)\n• **Rain Probability**: ${rainToday}% at 3:00 PM\n• **Humidity**: ${mockWeatherData.current.humidity}% | Wind: ${mockWeatherData.current.windSpeed} km/h ${mockWeatherData.current.windDirection}\n\n🌾 **Farming Impact & Advisory**:\n${mockWeatherData.agroImpact.summary}\n\n• Postpone chemical nitrogen fertigation today to avoid fertilizer runoff.\n• Drip irrigation is NOT required today as soil moisture is optimal (68%).`
      };
    }

    // 💰 MARKET / MANDI QUERIES
    if (rawLower.includes('mandi') || rawLower.includes('price') || rawLower.includes('rate') || rawLower.includes('bhav') || rawLower.includes('daam') || rawLower.includes('apmc')) {
      const cottonMandi = mockMandiRates[0];
      const wheatMandi = mockMandiRates[1];
      const tomatoMandi = mockMandiRates[2];

      if (rawLower.includes('wheat')) {
        return {
          isStructured: false,
          text: `💰 **Wheat Mandi Prices (${location.formatted || 'Halol'})**\n\n• **Halol Main Mandi (4 km)**: ₹${wheatMandi.markets[0].price} / quintal (${wheatMandi.markets[0].change})\n• **Highest Nearby Price (Vadodara APMC)**: ₹${wheatMandi.markets[1].price} / quintal\n• **30-Day Trend**: Rising (+1.8%)`
        };
      }
      if (rawLower.includes('tomato')) {
        return {
          isStructured: false,
          text: `💰 **Tomato Mandi Prices (${location.formatted || 'Halol'})**\n\n• **Halol Vegetable Yard**: ₹${tomatoMandi.markets[0].price} / quintal (${tomatoMandi.markets[0].change})\n• **Vadodara Vegetable APMC**: ₹${tomatoMandi.markets[1].price} / quintal\n• **30-Day Trend**: Slight decline (-3.5%)`
        };
      }

      // Default Cotton Mandi
      return {
        isStructured: false,
        text: `💰 **Cotton (Kapas BG-II) Mandi Prices**\n\n📍 **Halol Main Mandi (4 km)**: ₹7,250 / quintal (+₹210)\n📍 **Bodeli APMC Yard (24 km - Highest Rate)**: ₹7,410 / quintal (+₹350)\n\n📈 **30-Day Trend**: Price is up +4.2% due to robust textile demand. Bodeli APMC offers the highest price in Panchmahal district today.`
      };
    }

    // 🏛️ GOVERNMENT SCHEMES QUERIES
    if (rawLower.includes('scheme') || rawLower.includes('yojana') || rawLower.includes('subsidy') || rawLower.includes('pm kisan') || rawLower.includes('fasal bima') || rawLower.includes('ggrc')) {
      const scm1 = mockSchemes[0];
      const scm2 = mockSchemes[1];

      return {
        isStructured: false,
        text: `🏛️ **Government Agricultural Schemes for Farmers**\n\n1. **${scm1.title}**\n   • 💰 Benefit: ${scm1.benefitAmount}\n   • 👨‍🌾 Eligibility: ${scm1.eligibility}\n   • 📄 Documents: ${scm1.documentsRequired.join(', ')}\n   • 🔗 Official Portal: ${scm1.officialLink}\n\n2. **${scm2.title}**\n   • 💰 Benefit: ${scm2.benefitAmount}\n   • 📅 Deadline: ${scm2.deadline}\n   • 🔗 Official Portal: ${scm2.officialLink}`
      };
    }

    // 🪨 SOIL & CROP SUITABILITY QUERIES
    if (rawLower.includes('soil') || rawLower.includes('suitable') || rawLower.includes('which crop') || rawLower.includes('land')) {
      return {
        isStructured: false,
        text: `🪨 **Soil & Crop Suitability for ${location.formatted}**\n\n• **Your Registered Soil**: ${farmerProfile.soilType || 'Black Cotton Soil (Regur)'}\n• **Farm Size**: ${farmerProfile.farmSizeAcres} Acres\n\n🌾 **Recommended Crops**:\n1. **Bt Cotton (Hybrid BG-II)**: Excellent retention in Black Cotton soil. Current market rate ₹7,250/qtnl.\n2. **Sharbati Wheat (GW-496)**: Ideal for Rabi season with drip irrigation.\n3. **Tomato (Pusa Ruby)**: High short-term yield under raised bed mulching.`
      };
    }

    // 💧 IRRIGATION QUERIES
    if (rawLower.includes('irrigate') || rawLower.includes('water') || rawLower.includes('paani') || rawLower.includes('sinchai') || rawLower.includes('drip')) {
      return {
        isStructured: true,
        data: {
          issue: "Irrigation Scheduling & Water Management",
          confidence: 92,
          whyHappening: `Soil moisture in ${location.formatted} is currently optimal (68%). High atmospheric humidity (${mockWeatherData.current.humidity}%) and afternoon rain forecast reduces soil evapotranspiration.`,
          recommendedAction: "1. Postpone irrigation for Cotton and Tomato today.\n2. For Wheat in Tillering stage, maintain light 4cm watering once rain passes.",
          whatToAvoid: "Do NOT over-irrigate during standing water conditions as root hypoxia can trigger leaf yellowing.",
          whenToCheck: "Check soil moisture at 10cm depth tomorrow morning.",
          whenToContactExpert: "If waterlogging persists for >24 hours, contact local drainage officer."
        }
      };
    }

    // 🐛 PEST & BOLLWORM QUERIES
    if (rawLower.includes('pest') || rawLower.includes('bollworm') || rawLower.includes('insect') || rawLower.includes('keeda') || rawLower.includes('bug')) {
      return {
        isStructured: true,
        data: mockAIResponses.cottonPest
      };
    }

    // 🌾 CROP DISEASE / YELLOW LEAVES QUERIES (Handling Context Memory!)
    if (rawLower.includes('yellow') || rawLower.includes('pili') || rawLower.includes('patti') || rawLower.includes('leaf') || rawLower.includes('spot') || rawLower.includes('disease') || rawLower.includes('wilting') || rawLower.includes('rain') && (lastUserMsg.includes('yellow') || lastUserMsg.includes('leaf') || lastUserMsg.includes('cotton'))) {
      
      const mentionsRain = rawLower.includes('rain') || lastUserMsg.includes('rain');

      return {
        isStructured: true,
        data: {
          issue: mentionsRain ? "Rain-Induced Nitrogen Leaching & Root Stress" : "Nitrogen Deficiency OR Early Fungal Infection",
          confidence: 89,
          whyHappening: mentionsRain 
            ? `Heavy monsoon rainfall in ${location.formatted} leaches mobile nitrate out of the root zone while saturated soil restricts root oxygen intake.` 
            : "High moisture coupled with heavy vegetative flowering draws nitrogen quickly from lower leaves.",
          recommendedAction: "1. Clear field drainage channels to allow standing water to drain.\n2. Apply 25kg Urea per acre via drip fertigation after soil surface dries.\n3. Spray 1% 19:19:19 NPK foliar fertilizer during early morning.",
          whatToAvoid: "Do NOT apply granular fertilizer immediately before rain as it will wash into groundwater.",
          whenToCheck: "Re-examine leaves in 5 to 7 days. New shoots should emerge bright green.",
          whenToContactExpert: "If yellowing spreads to >25% of plants with dark spots, escalate to KVK officer."
        }
      };
    }

    // Default Agriculture Multi-Context Response
    return {
      isStructured: true,
      data: mockAIResponses.yellowLeaves
    };
  };

  const submitQuery = (overrideText) => {
    const textToSend = overrideText || queryInput;
    if (!textToSend.trim() && !selectedImage) return;

    setHasError(false);
    const userMsgText = textToSend || (selectedImage ? "Inspecting attached leaf photo for crop diagnosis..." : "");

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userMsgText,
      image: selectedImage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setQueryInput('');
    setSelectedImage(null);
    setIsThinking(true);

    // Simulate AI LLM Response Processing
    setTimeout(() => {
      try {
        const responseObj = generateAIResponse(userMsgText, userMsg.image, updatedHistory);

        const aiMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: responseObj.text || null,
          isStructured: responseObj.isStructured || false,
          data: responseObj.data || null,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsThinking(false);
      } catch (err) {
        setIsThinking(false);
        setHasError(true);
        setLastFailedQuery(userMsgText);
      }
    }, 1100);
  };

  const handleRetry = () => {
    if (lastFailedQuery) {
      submitQuery(lastFailedQuery);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      
      {/* HEADER BANNER - PURPLE + GREEN AI THEME */}
      <div className="bg-gradient-to-r from-ai-plum via-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-ai border border-ai-mauve/40">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md text-purple-200 shadow-xs">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-sans tracking-tight">🌱 AgriSaathi AI Farmer Assistant</h1>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-purple-500/40 text-purple-200 rounded-full border border-purple-400/30 uppercase tracking-wider">
                Context-Aware LLM
              </span>
            </div>
            <p className="text-xs text-purple-200/90 font-medium mt-0.5">
              Connected to farm location ({location.formatted}), crop stage ({mockCrops[0]?.name}), soil ({farmerProfile.soilType}), and IMD weather telemetry.
            </p>
          </div>
        </div>
      </div>

      {/* CHAT MESSAGES DISPLAY */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6 min-h-[440px] max-h-[620px] overflow-y-auto space-y-5">
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-md bg-agri-dark text-white rounded-3xl rounded-tr-none p-4 shadow-sm space-y-2 border border-gov-gold/30">
                  {msg.image && (
                    <img src={msg.image} alt="User upload" className="w-full h-40 object-cover rounded-2xl border border-white/20 shadow-xs" />
                  )}
                  <p className="text-xs sm:text-sm font-semibold whitespace-pre-wrap">{msg.text}</p>
                  <span className="text-[10px] text-emerald-200 block text-right font-medium">{msg.timestamp}</span>
                </div>
              </div>
            );
          }

          // AI Sender
          return (
            <div key={msg.id} className="flex gap-3 max-w-3xl">
              <div className="w-10 h-10 rounded-2xl bg-ai-plum text-white flex items-center justify-center flex-shrink-0 shadow-xs border border-ai-mauve/30">
                <Bot className="w-5 h-5 text-purple-200" />
              </div>

              <div className="flex-1 space-y-3">
                {/* Standard Text Response */}
                {msg.text && (
                  <div className="bg-ai-light/50 border border-ai-mauve/20 rounded-3xl rounded-tl-none p-4 text-xs sm:text-sm text-gray-800 font-medium leading-relaxed shadow-xs whitespace-pre-wrap">
                    {msg.text}
                  </div>
                )}

                {/* Structured Advisory Card Response */}
                {msg.isStructured && msg.data && (
                  <div className="bg-gradient-to-br from-white via-purple-50/50 to-ai-light/50 border border-ai-mauve/40 rounded-3xl p-5 sm:p-6 shadow-ai space-y-4">
                    
                    {/* ✨ AI INSIGHT Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ai-mauve/20 pb-3">
                      <div>
                        <span className="text-[10px] font-black text-ai-plum uppercase tracking-wider block">
                          ✨ AI INSIGHT • Identified Issue
                        </span>
                        <h4 className="text-base font-black text-agri-dark">{msg.data.issue}</h4>
                      </div>

                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-ai-mauve/30 shadow-xs">
                        <Sparkles className="w-4 h-4 text-ai-purple" />
                        <span className="text-xs font-black text-ai-plum">
                          Confidence: {msg.data.confidence}%
                        </span>
                      </div>
                    </div>

                    {/* 🔍 ANALYSIS */}
                    <div className="space-y-1">
                      <span className="text-xs font-black text-gray-700 flex items-center gap-1.5 uppercase tracking-wide">
                        <Search className="w-4 h-4 text-earth-terracotta" /> 🔍 ANALYSIS & CAUSE
                      </span>
                      <p className="text-xs text-gray-700 leading-relaxed bg-white p-3.5 rounded-2xl border border-gray-100 font-medium">
                        {msg.data.whyHappening}
                      </p>
                    </div>

                    {/* 🌱 RECOMMENDATION */}
                    <div className="space-y-1">
                      <span className="text-xs font-black text-agri-dark flex items-center gap-1.5 uppercase tracking-wide">
                        <CheckCircle2 className="w-4 h-4 text-agri-primary" /> 🌱 RECOMMENDED ACTION
                      </span>
                      <div className="text-xs text-gray-800 leading-relaxed bg-emerald-50/80 p-4 rounded-2xl border border-agri-soft/50 whitespace-pre-line font-semibold">
                        {msg.data.recommendedAction}
                      </div>
                    </div>

                    {/* ⚠️ CAUTION */}
                    <div className="space-y-1">
                      <span className="text-xs font-black text-rose-700 flex items-center gap-1.5 uppercase tracking-wide">
                        <AlertTriangle className="w-4 h-4 text-rose-600" /> ⚠️ CAUTION & WHAT TO AVOID
                      </span>
                      <p className="text-xs text-rose-950 leading-relaxed bg-rose-50/80 p-3.5 rounded-2xl border border-rose-200 font-medium">
                        {msg.data.whatToAvoid}
                      </p>
                    </div>

                    {/* 👨‍🔬 EXPERT ADVICE Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-3.5 bg-white rounded-2xl border border-gray-100 space-y-0.5">
                        <span className="font-bold text-gray-500 text-[10px] uppercase block">When to Check Again</span>
                        <span className="text-gray-800 font-semibold">{msg.data.whenToCheck}</span>
                      </div>

                      <div className="p-3.5 bg-white rounded-2xl border border-gray-100 space-y-0.5">
                        <span className="font-bold text-earth-walnut text-[10px] uppercase block">When to Contact Expert</span>
                        <span className="text-gray-800 font-semibold">{msg.data.whenToContactExpert}</span>
                      </div>
                    </div>

                    {/* Escalate button */}
                    <div className="pt-3 flex items-center justify-between border-t border-ai-mauve/20">
                      <span className="text-[11px] text-gray-400 italic font-medium">Based on live farm telemetry & KVK guides.</span>
                      <button
                        onClick={() => setActiveTab('expert')}
                        className="flex items-center gap-2 px-4 py-2 bg-ai-plum hover:bg-ai-purple text-white text-xs font-bold rounded-2xl transition-colors shadow-ai"
                      >
                        <UserCheck className="w-4 h-4 text-purple-200" /> Escalate to KVK Expert
                      </button>
                    </div>

                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {isThinking && (
          <div className="flex gap-3 items-center text-xs font-bold text-ai-purple animate-pulse py-3 px-2">
            <Bot className="w-5 h-5 text-ai-plum animate-bounce" />
            <span>Preparing your farming advice for {location.formatted || 'Halol'}...</span>
          </div>
        )}

        {/* Connection Error State */}
        {hasError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-3xl flex items-center justify-between gap-3 text-xs text-rose-950 font-bold">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>I'm having trouble connecting right now.</span>
            </div>
            <button
              onClick={handleRetry}
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-black transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Try Again
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK SUGGESTION CHIPS */}
      <div className="space-y-2">
        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Suggested Quick Questions</span>
        <div className="flex flex-wrap gap-2">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestedClick(chip.query)}
              className="px-3.5 py-2 bg-white hover:bg-ai-light border border-ai-mauve/30 rounded-full text-xs font-bold text-ai-plum transition-colors shadow-xs"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* ATTACHMENT PREVIEW IF ANY */}
      {selectedImage && (
        <div className="flex items-center gap-3 p-3 bg-agri-bg rounded-2xl border border-agri-soft/40">
          <img src={selectedImage} alt="Attachment" className="w-12 h-12 rounded-xl object-cover border border-gray-200" />
          <div className="text-xs flex-1">
            <span className="font-bold text-agri-dark block">Leaf photo attached for AI scan</span>
            <span className="text-gray-400 text-[10px]">Click Send to analyze with 87% computer vision model</span>
          </div>
          <button 
            onClick={() => setSelectedImage(null)}
            className="p-1.5 text-gray-400 hover:text-rose-600 rounded-full hover:bg-white"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* INPUT BOX AREA */}
      <div className="bg-white rounded-3xl p-3 border border-gray-200 shadow-agri flex items-center gap-2">
        
        {/* Attachment Button */}
        <label className="p-3 text-gray-500 hover:text-agri-primary hover:bg-agri-bg rounded-2xl cursor-pointer transition-colors" title="Attach Leaf Photo">
          <Paperclip className="w-5 h-5" />
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                showToast('Leaf photo attached for AI inspection.', 'info');
              }
            }} 
          />
        </label>

        {/* Voice Input Button */}
        <button
          onClick={handleVoiceInput}
          className={`p-3 rounded-2xl transition-all ${
            isRecording 
              ? 'bg-rose-600 text-white animate-pulse' 
              : 'text-gray-500 hover:text-ai-plum hover:bg-ai-light'
          }`}
          title="Voice Query Input"
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <textarea
          rows={1}
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submitQuery();
            }
          }}
          placeholder={t.ai.placeholder || "Ask any query about your crop, disease, weather, or mandi prices... (Press Enter to send)"}
          className="flex-1 px-3 py-2 text-xs sm:text-sm focus:outline-none text-gray-800 font-semibold resize-none max-h-24"
        />

        {/* Send Button */}
        <button
          onClick={() => submitQuery()}
          disabled={isThinking || (!queryInput.trim() && !selectedImage)}
          className="p-3.5 bg-ai-plum hover:bg-ai-purple text-white disabled:bg-gray-200 disabled:text-gray-400 rounded-2xl transition-all shadow-ai"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
