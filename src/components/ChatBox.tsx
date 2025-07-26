import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Clock, CheckCircle, Mic, MicOff, Image, Paperclip, Smile, MoreVertical, Copy, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import Message from './Message';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status: 'sending' | 'sent' | 'processed';
  type?: 'text' | 'image' | 'file';
  reactions?: string[];
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'नमस्ते! मैं DecentraGPT हूं, आपका decentralized AI assistant जो Internet Computer Protocol पर चलता है। आज मैं आपकी कैसे मदद कर सकता हूं? 🚀',
      sender: 'ai',
      timestamp: new Date(),
      status: 'processed',
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('नमस्ते') || message.includes('हैलो')) {
      return 'नमस्ते! मैं पूरी तरह से on-chain Internet Computer पर चल रहा हूं। हर interaction decentralized और transparent है। आप क्या जानना चाहते हैं? 🌟';
    }
    
    if (message.includes('icp') || message.includes('internet computer')) {
      return 'Internet Computer Protocol (ICP) web speed पर unlimited capacity के साथ smart contracts चलाने में सक्षम बनाता है। मैं ICP canisters द्वारा powered हूं, जो हर conversation को securely on-chain store करता है बिना किसी intermediaries के। 🔗⚡';
    }
    
    if (message.includes('decentralized') || message.includes('blockchain') || message.includes('विकेंद्रीकृत')) {
      return 'Decentralization का मतलब है कोई single point of failure नहीं! Traditional AI assistants के विपरीत, मैं nodes के distributed network पर चलता हूं। आपका data secure, private रहता है और आपका पूरा control रहता है। 🛡️🌐';
    }
    
    if (message.includes('features') || message.includes('क्या कर सकते')) {
      return 'मैं कई advanced features प्रदान करता हूं:\n\n🎯 Real-time AI conversations\n🔊 Voice interactions\n📁 File sharing & analysis\n🎨 Image processing\n💾 On-chain data storage\n🔐 Complete privacy & security\n\nऔर भी बहुत कुछ! कोई specific feature के बारे में पूछना चाहते हैं?';
    }
    
    if (message.includes('agent') || message.includes('एजेंट')) {
      return 'हमारे live agents आपकी advanced queries के लिए उपलब्ध हैं! Right side में chat widget से आप directly human experts से बात कर सकते हैं। वे ICP, blockchain development, और decentralized AI के specialists हैं। 👨‍💻✨';
    }
    
    if (message.includes('future') || message.includes('ai') || message.includes('भविष्य')) {
      return 'AI का भविष्य decentralized है! ICP पर चलकर, हम intermediaries को eliminate करते हैं, data sovereignty ensure करते हैं, और truly trustless AI systems बनाते हैं। यह autonomous, on-chain intelligence की शुरुआत है। 🚀🤖';
    }
    
    return 'बहुत दिलचस्प सवाल! एक decentralized AI के रूप में, मैं on-chain interactions से लगातार सीख रहा हूं while privacy और security maintain करते हुए। हर response Internet Computer network के distributed computation के through generate होता है। कुछ और specific पूछना चाहते हैं? 💡🔮';
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate message processing
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' } 
            : msg
        )
      );
    }, 500);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(input),
        sender: 'ai',
        timestamp: new Date(),
        status: 'processed',
        type: 'text'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Update user message status
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'processed' } 
            : msg
        )
      );
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const addEmoji = (emoji: string) => {
    setInput(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const quickReplies = [
    "ICP के बारे में बताएं",
    "Decentralized AI क्या है?",
    "Live agent से बात करना चाहता हूं",
    "Features दिखाएं"
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Chat Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg">DecentraGPT</h2>
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online • Decentralized AI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-sm p-4 shadow-lg border border-slate-200/50 max-w-xs">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Replies */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 px-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => setInput(reply)}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-sm text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {reply}
              </button>
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className="p-4 bg-white/90 backdrop-blur-md border-t border-slate-200/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Smile className="w-5 h-5 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Image className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              
              {showEmojiPicker && (
                <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg border border-slate-200 p-3 grid grid-cols-8 gap-2 z-10">
                  {['😊', '👍', '❤️', '😂', '😮', '😢', '😡', '🤔', '🎉', '🚀', '💡', '🔥', '⭐', '✨', '🌟', '💯'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => addEmoji(emoji)}
                      className="text-xl hover:bg-slate-100 rounded p-1 transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="DecentraGPT से कुछ भी पूछें... (हिंदी/English दोनों supported)"
                className="w-full p-4 pr-12 border border-slate-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm"
                rows={1}
                style={{ minHeight: '56px', maxHeight: '120px' }}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={toggleRecording}
                className={`p-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white p-3 rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
            <p>
              🔗 Powered by Internet Computer Protocol • 🛡️ All conversations stored on-chain
            </p>
            <p className="hidden sm:block">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;