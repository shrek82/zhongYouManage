
import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare } from 'lucide-react';
import { analyzeContract } from '../../../core/services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: '您好，我是众友健康 AI 助手。我可以帮您审核合同条款、分析 GSP 合规风险或提取核心摘要。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const result = await analyzeContract(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: result || '未能生成分析，请稍后再试。' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: '抱歉，AI 服务暂时不可用。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 group border-4 border-white"
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">众友智能合同专家</h3>
                <p className="text-[10px] text-emerald-600">已连接 Gemini 3.0 Pro</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="relative">
              <textarea 
                rows={3}
                placeholder="在此输入合同条款进行风险分析..."
                className="w-full p-3 pr-12 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {['审查合规性', '摘要分析', '修改建议'].map(tag => (
                <button 
                  key={tag}
                  className="px-2 py-1 bg-slate-100 text-[10px] text-slate-500 rounded hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap"
                  onClick={() => setInput(tag + ": ")}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
