import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  CheckCircle2,
  FileText,
  CornerDownLeft,
  ChevronDown
} from 'lucide-react';

export const AeroAIChat: React.FC = () => {
  const { isChatOpen, setIsChatOpen, chatMessages, sendChatMessage } = useApp();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What is causing today's pollution?",
    "Where is the pollution coming from?",
    "Which areas may be affected next?",
    "Why did the risk increase?",
    "What should local authorities do?",
    "Explain hotspot #BRICS-042"
  ];

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  if (!isChatOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendChatMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-2xl brics-card border-2 border-cyan-500/60 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-[#0C1A38] to-[#071024] border-b border-[#1E2F56] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-heading font-bold text-white text-sm">
                AeroAI Assistant
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-cyan-300 font-mono">
              Ground-Truth Federated Climate Analyst
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsChatOpen(false)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
              {msg.sender === 'user' ? (
                <>
                  <span>You</span>
                  <User className="w-3 h-3 text-slate-300" />
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-300 font-semibold">AeroAI Engine</span>
                </>
              )}
              <span>• {msg.timestamp}</span>
            </div>

            <div
              className={`p-3 rounded-xl max-w-[88%] whitespace-pre-line leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-tr-none font-medium'
                  : 'bg-[#0D1730] border border-[#1E2F56] text-slate-200 rounded-tl-none'
              }`}
            >
              {msg.text}

              {/* Citations Box */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-2 border-t border-[#1E2F56]/70 text-[10px] font-mono text-cyan-300">
                  <div className="text-slate-400 font-bold mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-teal-400" />
                    Verified Evidence Signals Cited:
                  </div>
                  <ul className="space-y-0.5 text-slate-300">
                    {msg.citations.map((cite, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="text-cyan-400">›</span> {cite}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Pills */}
      <div className="px-3 py-2 bg-[#091124] border-t border-[#1E2F56] overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => sendChatMessage(prompt)}
            className="px-2.5 py-1 rounded-full bg-[#0D1730] border border-[#1E2F56] hover:border-cyan-500/50 hover:bg-cyan-950/40 text-[11px] text-cyan-300 whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="p-2.5 bg-[#070D1E] border-t border-[#1E2F56] flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask AeroAI about pollution vectors, origins, or mitigation..."
          className="flex-1 bg-[#0D1730] border border-[#1E2F56] focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
