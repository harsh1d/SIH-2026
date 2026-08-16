import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockAIResponses } from '../data/mockData';
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
  Volume2
} from 'lucide-react';

export const AIAssistantPage = () => {
  const { location, farmerProfile, setActiveTab, t, showToast } = useApp();

  const [queryInput, setQueryInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Namaste Ramesh Ji! I am AgriSaathi AI. I have loaded your farm location (Halol, Gujarat), Cotton flowering stage, and local weather telemetry. How can I assist your crop today?",
      timestamp: "09:00 AM"
    }
  ]);

  const handleSuggestedClick = (textKey, questionText) => {
    setQueryInput(questionText);
    submitQuery(questionText, textKey);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      showToast('Voice recognition API simulated. Speaking: "Cotton leaves yellowing after rain"', 'info');
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

  const submitQuery = (overrideText, presetKey) => {
    const textToSend = overrideText || queryInput;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      image: selectedImage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setQueryInput('');
    setSelectedImage(null);
    setIsThinking(true);

    // Dynamic AI Structured Response
    setTimeout(() => {
      let aiResponseData = mockAIResponses.yellowLeaves;
      
      const lower = textToSend.toLowerCase();
      if (lower.includes('wheat') || lower.includes('irrigate')) {
        aiResponseData = mockAIResponses.irrigateWheat;
      } else if (lower.includes('pest') || lower.includes('bollworm')) {
        aiResponseData = mockAIResponses.cottonPest;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        isStructured: true,
        data: aiResponseData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-ai-plum via-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-ai border border-ai-mauve/40">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
            <Bot className="w-7 h-7 text-purple-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold font-sans">AgriSaathi AI Farmer Assistant</h1>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-purple-500/40 text-purple-200 rounded-full border border-purple-400/30">
                Context-Aware LLM
              </span>
            </div>
            <p className="text-xs text-purple-200/80">
              Powered by location intelligence ({location.formatted}), farm profile ({farmerProfile.soilType}), and weather forecast.
            </p>
          </div>
        </div>
      </div>

      {/* CHAT MESSAGES DISPLAY */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6 min-h-[420px] max-h-[600px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-md bg-agri-dark text-white rounded-2xl rounded-tr-none p-4 shadow-sm space-y-2">
                  {msg.image && (
                    <img src={msg.image} alt="User upload" className="w-full h-36 object-cover rounded-xl border border-white/20" />
                  )}
                  <p className="text-xs sm:text-sm font-medium">{msg.text}</p>
                  <span className="text-[10px] text-emerald-200 block text-right font-medium">{msg.timestamp}</span>
                </div>
              </div>
            );
          }

          // AI Sender
          return (
            <div key={msg.id} className="flex gap-3 max-w-3xl">
              <div className="w-9 h-9 rounded-2xl bg-ai-plum text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot className="w-5 h-5 text-purple-200" />
              </div>

              <div className="flex-1 space-y-3">
                {/* Standard Text or Intro */}
                {msg.text && (
                  <div className="bg-ai-light/50 border border-ai-mauve/20 rounded-2xl rounded-tl-none p-4 text-xs sm:text-sm text-gray-800 font-medium">
                    {msg.text}
                  </div>
                )}

                {/* Structured Advisory Card Response */}
                {msg.isStructured && msg.data && (
                  <div className="bg-gradient-to-br from-white via-purple-50/40 to-ai-light/40 border border-ai-mauve/30 rounded-3xl p-5 sm:p-6 shadow-ai space-y-4">
                    
                    {/* Header: Issue & Confidence */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ai-mauve/20 pb-3">
                      <div>
                        <span className="text-[10px] font-extrabold text-ai-plum uppercase tracking-wider block">
                          Likely Issue Identified
                        </span>
                        <h4 className="text-base font-bold text-agri-dark">{msg.data.issue}</h4>
                      </div>

                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-ai-mauve/30 shadow-xs">
                        <Sparkles className="w-4 h-4 text-ai-purple" />
                        <span className="text-xs font-extrabold text-ai-plum">
                          Confidence: {msg.data.confidence}%
                        </span>
                      </div>
                    </div>

                    {/* Why This May Be Happening */}
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-earth-terracotta" /> Why This May Be Happening
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed bg-white p-3 rounded-xl border border-gray-100">
                        {msg.data.whyHappening}
                      </p>
                    </div>

                    {/* Recommended Action */}
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-agri-dark flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-agri-primary" /> Recommended Action
                      </span>
                      <div className="text-xs text-gray-700 leading-relaxed bg-emerald-50/70 p-3.5 rounded-xl border border-agri-soft/40 whitespace-pre-line font-medium">
                        {msg.data.recommendedAction}
                      </div>
                    </div>

                    {/* What to Avoid */}
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-600" /> What to Avoid
                      </span>
                      <p className="text-xs text-rose-950 leading-relaxed bg-rose-50/70 p-3 rounded-xl border border-rose-200">
                        {msg.data.whatToAvoid}
                      </p>
                    </div>

                    {/* Timeline & Expert escalation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-3 bg-white rounded-xl border border-gray-100">
                        <span className="font-bold text-gray-700 block mb-0.5">When to Check Again:</span>
                        <span className="text-gray-500">{msg.data.whenToCheck}</span>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-gray-100">
                        <span className="font-bold text-earth-walnut block mb-0.5">When to Contact Expert:</span>
                        <span className="text-gray-500">{msg.data.whenToContactExpert}</span>
                      </div>
                    </div>

                    {/* Escalate button */}
                    <div className="pt-2 flex items-center justify-between border-t border-ai-mauve/20">
                      <span className="text-[11px] text-gray-400 italic">Advisory based on current weather & crop stage.</span>
                      <button
                        onClick={() => setActiveTab('expert')}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-ai-plum hover:bg-ai-purple text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                      >
                        <UserCheck className="w-3.5 h-3.5" /> Escalate to KVK Expert
                      </button>
                    </div>

                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* AI Thinking Indicator */}
        {isThinking && (
          <div className="flex gap-3 items-center text-xs font-semibold text-ai-purple animate-pulse py-2">
            <Bot className="w-5 h-5 text-ai-plum" />
            <span>Analyzing crop context, soil parameters & weather impact...</span>
          </div>
        )}
      </div>

      {/* QUICK SUGGESTION CHIPS */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Suggested Questions</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSuggestedClick('yellowLeaves', "My cotton leaves are turning yellow.")}
            className="px-3 py-1.5 bg-white hover:bg-ai-light border border-ai-mauve/30 rounded-full text-xs font-medium text-ai-plum transition-colors shadow-xs"
          >
            🌾 My cotton leaves are turning yellow
          </button>
          <button
            onClick={() => handleSuggestedClick('irrigateWheat', "When should I irrigate my wheat crop?")}
            className="px-3 py-1.5 bg-white hover:bg-agri-light border border-agri-soft/40 rounded-full text-xs font-medium text-agri-dark transition-colors shadow-xs"
          >
            💧 When should I irrigate my wheat?
          </button>
          <button
            onClick={() => handleSuggestedClick('cottonPest', "How to prevent Pink Bollworm in Cotton?")}
            className="px-3 py-1.5 bg-white hover:bg-earth-cream border border-earth-wheat/40 rounded-full text-xs font-medium text-earth-walnut transition-colors shadow-xs"
          >
            🐛 How to prevent Pink Bollworm?
          </button>
        </div>
      </div>

      {/* INPUT BOX AREA */}
      <div className="bg-white rounded-3xl p-3 border border-gray-200 shadow-agri flex items-center gap-2">
        
        {/* Attachment Button */}
        <label className="p-3 text-gray-500 hover:text-agri-primary hover:bg-agri-bg rounded-2xl cursor-pointer transition-colors">
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
              ? 'bg-rose-500 text-white animate-pulse' 
              : 'text-gray-500 hover:text-ai-plum hover:bg-ai-light'
          }`}
          title="Voice Query Input"
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submitQuery()}
          placeholder={t.ai.placeholder}
          className="flex-1 px-3 py-2 text-sm focus:outline-none text-gray-800 font-medium"
        />

        {/* Send Button */}
        <button
          onClick={() => submitQuery()}
          disabled={!queryInput.trim() && !selectedImage}
          className="p-3.5 bg-ai-plum hover:bg-ai-purple text-white disabled:bg-gray-200 disabled:text-gray-400 rounded-2xl transition-all shadow-ai"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
