import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { mockWeatherData, mockMandiRates, mockCrops } from '../data/mockData';
import { 
  generateSmartAgriResponse, 
  speakAgronomyText, 
  stopSpeaking 
} from '../services/aiKnowledgeEngine';
import { 
  Bot, 
  Sparkles, 
  Mic, 
  Paperclip, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  UserCheck, 
  MapPin, 
  Volume2, 
  VolumeX, 
  Search, 
  RotateCcw, 
  Globe, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers, 
  ShieldCheck,
  Trash2
} from 'lucide-react';

export const AIAssistantPage = () => {
  const { location, farmerProfile, setActiveTab, t, language, showToast } = useApp();

  const [queryInput, setQueryInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastFailedQuery, setLastFailedQuery] = useState(null);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [copiedMsgId, setCopiedMsgId] = useState(null);

  const messagesEndRef = useRef(null);

  const getInitialGreeting = (lang) => {
    const fName = farmerProfile.name || 'Farmer';
    const loc = location.formatted || 'Halol, Gujarat';
    const soil = farmerProfile.soilType || 'Black Cotton Soil';

    if (lang === 'hi') {
      return `नमस्ते ${fName} जी! 🌱\n\nमैं कृषि साथी एआई सहायक हूँ। आपके खेत (${loc}), मिट्टी (${soil}) और मौसम (${mockWeatherData.current.temp}°C, ${mockWeatherData.current.humidity}% नमी) की टेलीमेट्री सक्रिय है।\n\nआज आपकी फसल स्वास्थ्य, कीट नियंत्रण, मौसम या खाद के समय के लिए मैं क्या सहायता कर सकता हूँ?`;
    }
    if (lang === 'gu') {
      return `નમસ્તે ${fName} જી! 🌱\n\nહું કૃષિ સાથી એઆઈ સહાયક છું. તમારા ખેતર (${loc}), જમીન (${soil}) અને જીવંત હવામાન (${mockWeatherData.current.temp}°C) નું ટેલિમેટ્રી લોડ થઈ ગયું છે.\n\nઆજે તમારા પાકના રક્ષણ, રોગ નિયંત્રણ કે મંડી ભાવ માટે હું કેવી રીતે મદદ કરી શકું?`;
    }
    if (lang === 'ml') {
      return `നമസ്കാരം ${fName} ജി! 🌱\n\nഞാൻ കൃഷി സാഥി എഐ ആണ്. നിങ്ങളുടെ ഫാം ലൊക്കേഷൻ (${loc}), മണ്ണ് (${soil}), കാലാവസ്ഥ (${mockWeatherData.current.temp}°C) വിവരങ്ങൾ തയ്യാറാണ്.\n\nഇന്ന് നിങ്ങളുടെ വിള പരിപാലനത്തിൽ ഞാൻ എങ്ങനെ സഹായിക്കണം?`;
    }
    return `Namaste ${fName} Ji! 🌱\n\nI am AgriSaathi AI, your precision agronomy assistant. I have synthesized your live telemetry for ${loc}, Soil: ${soil}, registered crops: ${farmerProfile.primaryCrops?.join(', ') || 'Cotton, Wheat'}, and local weather (${mockWeatherData.current.temp}°C, ${mockWeatherData.current.humidity}% humidity).\n\nHow can I help optimize your crop yields and protect against pests today?`;
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: getInitialGreeting(language),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Update greeting if language changes and only initial message is present
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'ai') {
      setMessages([
        {
          id: 1,
          sender: 'ai',
          text: getInitialGreeting(language),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const getQuickChips = (lang) => {
    if (lang === 'hi') {
      return [
        { label: "🌱 कपास में पीली पत्तियां", query: "कपास की पत्तियां पीली पड़ रही हैं, क्या उपाय करें?" },
        { label: "🐛 गुलाबी सुंडी (पिंक बोलवर्म)", query: "कपास में पिंक बोलवर्म कीट नियंत्रण की दवा बताएं।" },
        { label: "🌾 गेहूं में पीला रतुआ", query: "गेहूं में पीला रतुआ (येलो रस्ट) की रोकथाम कैसे करें?" },
        { label: "🌧️ आज का मौसम व छिड़काव", query: "क्या आज बारिश होगी और क्या कीटनाशक छिड़कना सुरक्षित है?" },
        { label: "💰 आज का मंडी भाव", query: "आसपास की मंडी में आज का सबसे अच्छा कपास भाव क्या है?" },
        { label: "🏛️ सरकारी योजना व सब्सिडी", query: "मेरे खेत के लिए सरकारी सब्सिडी और पीएम किसान योजना की जानकारी दें।" }
      ];
    }
    if (lang === 'gu') {
      return [
        { label: "🌱 કપાસના પીળા પાંદડા", query: "કપાસના પાંદડા પીળા પડી રહ્યા છે, શું ઉપાય કરવો?" },
        { label: "🐛 ગુલાબી ઈયળ નિયંત્રણ", query: "કપાસમાં ગુલાબી ઈયળના નિયંત્રણ માટે કઈ દવા છાંટવી?" },
        { label: "🌾 ઘઉંમાં ગેરુ રોગ", query: "ઘઉંમાં પીળા ગેરુ રોગની રોકથામ કેવી રીતે કરવી?" },
        { label: "🌧️ વરસાદ અને દવાનો છંટકાવ", query: "શું આજે વરસાદ આવશે અને દવાનો છંટકાવ કરવો યોગ્ય છે?" },
        { label: "💰 આજનો કપાસ મંડી ભાવ", query: "નજીકની મંડીમાં આજનો સૌથી ઊંચો કપાસનો ભાવ શું છે?" },
        { label: "🏛️ સબસિડી અને સરકારી યોજના", query: "ડ્રિપ ઇરિગેશન અને ખેડૂત સબસિડી વિશે જણાવો." }
      ];
    }
    if (lang === 'ml') {
      return [
        { label: "🌱 പരുത്തി ഇല മഞ്ഞളിപ്പ്", query: "പരുത്തി ഇലകൾ മഞ്ഞളിക്കുന്നു, എന്ത് ചെയ്യണം?" },
        { label: "🐛 പിങ്ക് ബോൾവോം പുഴു", query: "പിങ്ക് ബോൾവോം പുഴുവിനെ എങ്ങനെ നിയന്ത്രിക്കാം?" },
        { label: "🌾 ഗോതമ്പ് തുരുമ്പ് രോഗം", query: "ഗോതമ്പിലെ മഞ്ഞ തുരുമ്പ് രോഗം എങ്ങനെ തടയാം?" },
        { label: "🌧️ മഴയും മരുന്ന് തളിക്കലും", query: "ഇന്ന് മഴ പെയ്യുമോ? കീടനാശിനി തളിക്കുന്നത് സുരക്ഷിതമാണോ?" },
        { label: "💰 ഇന്നത്തെ വിപണി വില", query: "ഇന്നത്തെ ഏറ്റവും ഉയർന്ന പരുത്തി വിപണി വില എത്രയാണ്?" },
        { label: "🏛️ കൃഷി സബ്സിഡികൾ", query: "എന്റെ ഫാമിനുള്ള സർക്കാർ സബ്സിഡികൾ പറയുക." }
      ];
    }
    return [
      { label: "🌱 Cotton leaf yellowing", query: "My cotton leaves are turning yellow after rain. What should I do?" },
      { label: "🐛 Pink Bollworm dosage", query: "How to identify and control Pink Bollworm in Cotton?" },
      { label: "🌾 Yellow Rust in Wheat", query: "How to prevent Stripe/Yellow rust in Wheat crop?" },
      { label: "🌧️ Rain & Spraying window", query: "Will it rain today and is it safe to spray pesticides?" },
      { label: "💰 Today's APMC Mandi prices", query: "What is today's highest cotton mandi price nearby?" },
      { label: "🏛️ Drip & Kisan Subsidies", query: "Tell me about government subsidy eligibility for my farm" }
    ];
  };

  const dynamicQuickChips = getQuickChips(language);

  const handleSuggestedClick = (questionText) => {
    setQueryInput(questionText);
    submitQuery(questionText);
  };

  const handleVoiceInput = () => {
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const fallbackQuery = language === 'hi' 
        ? "क्या आज बारिश होगी और क्या कीटनाशक छिड़कना सुरक्षित है?" 
        : language === 'gu'
          ? "શું આજે વરસાદ આવશે અને દવાનો છંટકાવ કરવો યોગ્ય છે?"
          : language === 'ml'
            ? "ഇന്ന് മഴ പെയ്യുമോ? കീടനാശിനി തളിക്കുന്നത് സുരക്ഷിതമാണോ?"
            : "Will it rain today and is it safe to spray pesticides?";
      setQueryInput(fallbackQuery);
      showToast(`Voice API simulated: "${fallbackQuery}"`, 'info');
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : language === 'ml' ? 'ml-IN' : 'en-IN';

      setIsRecording(true);
      showToast('Listening... Speak your query clearly', 'info');

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQueryInput(transcript);
        setIsRecording(false);
        showToast(`Captured: "${transcript}"`, 'success');
        submitQuery(transcript);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        showToast('Voice recognition ended. You can also type your query.', 'info');
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (e) {
      setIsRecording(false);
      showToast('Voice capture failed. Please type query.', 'error');
    }
  };

  const handleSpeakToggle = (msgId, textToSpeak) => {
    const voiceLang = language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : language === 'ml' ? 'ml-IN' : 'en-IN';
    if (speakingMsgId === msgId) {
      stopSpeaking();
      setSpeakingMsgId(null);
    } else {
      stopSpeaking();
      setSpeakingMsgId(msgId);
      speakAgronomyText(textToSpeak, voiceLang);
    }
  };

  const handleCopy = (msgId, text) => {
    const cleanText = (text || '').replace(/[*#`_]/g, '').trim();
    navigator.clipboard.writeText(cleanText);
    setCopiedMsgId(msgId);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: getInitialGreeting(language),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    stopSpeaking();
    setSpeakingMsgId(null);
    showToast('Chat history cleared', 'info');
  };

  const submitQuery = async (overrideText) => {
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

    try {
      // Synthesize response using our Grounded AI Knowledge Engine with strict language passing
      const aiResult = await generateSmartAgriResponse({
        userQuery: userMsgText,
        userImage: userMsg.image,
        farmerProfile,
        location,
        weatherData: mockWeatherData,
        mandiRates: mockMandiRates,
        conversationHistory: updatedHistory,
        language: language
      });

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResult.text || null,
        isStructured: aiResult.isStructured || false,
        data: aiResult.data || null,
        wikiCitation: aiResult.wikiCitation || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    } catch (err) {
      console.error("AI Generation error:", err);
      setIsThinking(false);
      setHasError(true);
      setLastFailedQuery(userMsgText);
    }
  };

  const handleRetry = () => {
    if (lastFailedQuery) {
      submitQuery(lastFailedQuery);
    }
  };

  // Helper to render clean formatted text without raw markdown asterisks
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5">
        {lines.map((line, lIdx) => {
          if (!line.trim()) return <div key={lIdx} className="h-1" />;
          const parts = line.split(/(\*\*.*?\*\*)/g);
          return (
            <div key={lIdx} className="leading-relaxed">
              {parts.map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong key={pIdx} className="font-black text-agri-dark">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return <span key={pIdx}>{part}</span>;
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-ai-plum via-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-ai border border-ai-mauve/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md text-purple-200 shadow-xs">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black font-sans tracking-tight">🌱 {t.ai?.title || "AgriSaathi AI Copilot"}</h1>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-purple-500/40 text-purple-200 rounded-full border border-purple-400/30 uppercase tracking-wider flex items-center gap-1">
                  <Globe className="w-3 h-3 text-emerald-300" /> {t.ai?.badge || "Wikipedia Grounded"}
                </span>
              </div>
              <p className="text-xs text-purple-200/90 font-medium mt-1">
                {farmerProfile.name} • {location.formatted} • {farmerProfile.soilType} • {farmerProfile.farmSizeAcres} {t.dashboard?.acresUnit || "Acres"}
              </p>
            </div>
          </div>

          <button
            onClick={clearChat}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-colors cursor-pointer"
            title="Reset Conversation"
          >
            <Trash2 className="w-3.5 h-3.5" /> {t.ai?.clearChat || "Clear Chat"}
          </button>
        </div>
      </div>

      {/* CHAT MESSAGES DISPLAY CONTAINER */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6 min-h-[460px] max-h-[640px] overflow-y-auto space-y-5">
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
          const textForTTS = msg.isStructured && msg.data
            ? `${msg.data.issue}. ${msg.data.whyHappening}. ${msg.data.recommendedAction}`
            : msg.text;

          return (
            <div key={msg.id} className="flex gap-3 max-w-3xl">
              <div className="w-10 h-10 rounded-2xl bg-ai-plum text-white flex items-center justify-center flex-shrink-0 shadow-xs border border-ai-mauve/30">
                <Bot className="w-5 h-5 text-purple-200" />
              </div>

              <div className="flex-1 space-y-3">
                {/* Text Response */}
                {msg.text && (
                  <div className="bg-ai-light/50 border border-ai-mauve/20 rounded-3xl rounded-tl-none p-4 sm:p-5 text-xs sm:text-sm text-gray-800 font-medium leading-relaxed shadow-xs space-y-3">
                    <div>{renderFormattedText(msg.text)}</div>
                    
                    {/* Live Wikipedia Citation Badge */}
                    {msg.wikiCitation && (
                      <div className="p-3 bg-white rounded-2xl border border-purple-200 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-ai-plum flex-shrink-0" />
                          <div>
                            <span className="font-bold text-gray-900 block">📚 {msg.wikiCitation.title}</span>
                            <span className="text-[11px] text-gray-500 line-clamp-1">{msg.wikiCitation.extract}</span>
                          </div>
                        </div>
                        <a 
                          href={msg.wikiCitation.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-ai-plum font-bold text-[10px] rounded-lg flex items-center gap-1 flex-shrink-0 border border-purple-200"
                        >
                          Source <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    {/* Audio & Copy Controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-purple-100 text-xs text-gray-400">
                      <span className="text-[10px] font-semibold">{msg.timestamp}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSpeakToggle(msg.id, textForTTS)}
                          className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                            speakingMsgId === msg.id 
                              ? 'bg-rose-50 text-rose-600' 
                              : 'hover:bg-purple-100 text-ai-plum'
                          }`}
                          title="Listen with Text-to-Speech"
                        >
                          {speakingMsgId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          <span className="text-[10px]">{speakingMsgId === msg.id ? (t.ai?.stopVoice || 'Stop Audio') : (t.ai?.listenVoice || 'Listen')}</span>
                        </button>

                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="p-1.5 hover:bg-purple-100 text-gray-500 hover:text-ai-plum rounded-lg text-xs transition-colors cursor-pointer"
                          title="Copy message"
                        >
                          {copiedMsgId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Structured Advisory Card Response */}
                {msg.isStructured && msg.data && (
                  <div className="bg-gradient-to-br from-white via-purple-50/50 to-ai-light/50 border border-ai-mauve/40 rounded-3xl p-5 sm:p-6 shadow-ai space-y-4">
                    
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ai-mauve/20 pb-3">
                      <div>
                        <span className="text-[10px] font-black text-ai-plum uppercase tracking-wider block">
                          ✨ {t.ai?.issue || "Identified Diagnosis"} • {msg.data.category || 'Agronomic Issue'}
                        </span>
                        <h4 className="text-base font-black text-agri-dark">{msg.data.issue}</h4>
                        <span className="text-[11px] text-gray-500 font-semibold">{msg.data.telemetryContext}</span>
                      </div>

                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-ai-mauve/30 shadow-xs">
                        <Sparkles className="w-4 h-4 text-ai-purple" />
                        <span className="text-xs font-black text-ai-plum">
                          {t.ai?.confidence || "Confidence"}: {msg.data.confidence}%
                        </span>
                      </div>
                    </div>

                    {/* CAUSE ANALYSIS */}
                    <div className="space-y-1">
                      <span className="text-xs font-black text-gray-700 flex items-center gap-1.5 uppercase tracking-wide">
                        <Search className="w-4 h-4 text-earth-terracotta" /> 🔍 {t.ai?.causes || "ANALYSIS & CAUSE"}
                      </span>
                      <p className="text-xs text-gray-700 leading-relaxed bg-white p-3.5 rounded-2xl border border-gray-100 font-medium">
                        {msg.data.whyHappening}
                      </p>
                    </div>

                    {/* RECOMMENDED PRESCRIPTION */}
                    <div className="space-y-1">
                      <span className="text-xs font-black text-agri-dark flex items-center gap-1.5 uppercase tracking-wide">
                        <CheckCircle2 className="w-4 h-4 text-agri-primary" /> 🌱 {t.ai?.recommendedAction || "ACTION PROTOCOL & DOSAGE"}
                      </span>
                      <div className="text-xs text-gray-800 leading-relaxed bg-emerald-50/80 p-4 rounded-2xl border border-agri-soft/50 whitespace-pre-line font-semibold">
                        {renderFormattedText(msg.data.recommendedAction)}
                      </div>
                    </div>

                    {/* CAUTION */}
                    <div className="space-y-1">
                      <span className="text-xs font-black text-rose-700 flex items-center gap-1.5 uppercase tracking-wide">
                        <AlertTriangle className="w-4 h-4 text-rose-600" /> ⚠️ {t.ai?.whatToAvoid || "PRECAUTIONS & WHAT TO AVOID"}
                      </span>
                      <p className="text-xs text-rose-950 leading-relaxed bg-rose-50/80 p-3.5 rounded-2xl border border-rose-200 font-medium">
                        {msg.data.whatToAvoid}
                      </p>
                    </div>

                    {/* Wikipedia Reference Card if available */}
                    {msg.data.wikiCitation && (
                      <div className="p-3 bg-white rounded-2xl border border-purple-200 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-ai-plum flex-shrink-0" />
                          <div>
                            <span className="font-bold text-gray-900 block">📚 {msg.data.wikiCitation.title}</span>
                            <span className="text-[11px] text-gray-500 line-clamp-1">{msg.data.wikiCitation.extract}</span>
                          </div>
                        </div>
                        <a 
                          href={msg.data.wikiCitation.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-ai-plum font-bold text-[10px] rounded-lg flex items-center gap-1 flex-shrink-0 border border-purple-200"
                        >
                          Source <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    {/* Timeline & Escalation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-3.5 bg-white rounded-2xl border border-gray-100 space-y-0.5">
                        <span className="font-bold text-gray-500 text-[10px] uppercase block">{t.ai?.whenToCheck || "Follow-Up Schedule"}</span>
                        <span className="text-gray-800 font-semibold">{msg.data.whenToCheck}</span>
                      </div>

                      <div className="p-3.5 bg-white rounded-2xl border border-gray-100 space-y-0.5">
                        <span className="font-bold text-earth-walnut text-[10px] uppercase block">{t.ai?.expertEscalation || "When to Contact Expert"}</span>
                        <span className="text-gray-800 font-semibold">{msg.data.whenToContactExpert}</span>
                      </div>
                    </div>

                    {/* Footer Controls */}
                    <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-ai-mauve/20">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSpeakToggle(msg.id, textForTTS)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            speakingMsgId === msg.id 
                              ? 'bg-rose-50 text-rose-600' 
                              : 'bg-white text-ai-plum hover:bg-purple-50 border border-purple-200'
                          }`}
                        >
                          {speakingMsgId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          <span>{speakingMsgId === msg.id ? (t.ai?.stopVoice || 'Stop Audio') : (t.ai?.listenVoice || 'Voice Readout')}</span>
                        </button>
                      </div>

                      <button
                        onClick={() => setActiveTab('expert')}
                        className="flex items-center gap-2 px-4 py-2 bg-ai-plum hover:bg-ai-purple text-white text-xs font-bold rounded-2xl transition-colors shadow-ai cursor-pointer"
                      >
                        <UserCheck className="w-4 h-4 text-purple-200" /> {t.ai?.escalateKVK || "Escalate to KVK Agronomist"}
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
            <span>
              {language === 'hi' 
                ? `आईसीएआर कृषि डाटाबेस व मौसम के आधार पर विश्लेषण किया जा रहा है...` 
                : language === 'gu'
                  ? `કૃષિ જ્ઞાનકોશ અને હવામાન ડેટાનું વિશ્લેષણ થઈ રહ્યું છે...`
                  : language === 'ml'
                    ? `വിള വിവരങ്ങളും കാലാവസ്ഥയും പരിശോധിക്കുന്നു...`
                    : `Consulting ICAR Agronomy Database & live knowledge for ${farmerProfile.name || 'you'}...`}
            </span>
          </div>
        )}

        {/* Connection Error State */}
        {hasError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-3xl flex items-center justify-between gap-3 text-xs text-rose-950 font-bold">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>Diagnostic reasoning timed out. Please try again.</span>
            </div>
            <button
              onClick={handleRetry}
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-black transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Try Again
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK SUGGESTION CHIPS */}
      <div className="space-y-2">
        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.ai?.suggestedQuestions || "Recommended Questions for Your Farm"}</span>
        <div className="flex flex-wrap gap-2">
          {dynamicQuickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestedClick(chip.query)}
              className="px-3.5 py-2 bg-white hover:bg-ai-light border border-ai-mauve/30 rounded-full text-xs font-bold text-ai-plum transition-colors shadow-xs cursor-pointer"
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
            <span className="font-bold text-agri-dark block">Leaf photo attached for AI inspection</span>
            <span className="text-gray-400 text-[10px]">Click Send to analyze with 87% computer vision model</span>
          </div>
          <button 
            onClick={() => setSelectedImage(null)}
            className="p-1.5 text-gray-400 hover:text-rose-600 rounded-full hover:bg-white cursor-pointer"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* INPUT BOX AREA */}
      <div className="bg-white rounded-3xl p-3 border border-gray-200 shadow-agri flex items-center gap-2">
        
        {/* Attachment Button */}
        <label className="p-3 text-gray-500 hover:text-agri-primary hover:bg-agri-bg rounded-2xl cursor-pointer transition-colors" title={t.ai?.attachImage || "Attach Leaf Photo"}>
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
          className={`p-3 rounded-2xl transition-all cursor-pointer ${
            isRecording 
              ? 'bg-rose-600 text-white animate-pulse' 
              : 'text-gray-500 hover:text-ai-plum hover:bg-ai-light'
          }`}
          title={t.ai?.voiceInput || "Voice Query Input (Speech to Text)"}
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
          placeholder={t.ai?.placeholder || `Ask anything about your ${farmerProfile.primaryCrops?.[0] || 'crops'}, soil (${farmerProfile.soilType}), pests, weather, or mandi prices...`}
          className="flex-1 px-3 py-2 text-xs sm:text-sm focus:outline-none text-gray-800 font-semibold resize-none max-h-24"
        />

        {/* Send Button */}
        <button
          onClick={() => submitQuery()}
          disabled={isThinking || (!queryInput.trim() && !selectedImage)}
          className="p-3.5 bg-ai-plum hover:bg-ai-purple text-white disabled:bg-gray-200 disabled:text-gray-400 rounded-2xl transition-all shadow-ai cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
