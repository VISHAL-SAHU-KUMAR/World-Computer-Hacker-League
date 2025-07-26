import React, { useState } from 'react';
import { Bot, User, Clock, CheckCircle, Copy, ThumbsUp, ThumbsDown, MoreHorizontal, Share, Bookmark } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status: 'sending' | 'sent' | 'processed';
  type?: 'text' | 'image' | 'file';
  reactions?: string[];
}

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [showActions, setShowActions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const isUser = message.sender === 'user';
  
  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-slate-400 animate-spin" />;
      case 'sent':
        return <CheckCircle className="w-3 h-3 text-blue-500" />;
      case 'processed':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      default:
        return null;
    }
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy message');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  return (
    <div 
      className={`flex gap-3 group hover:bg-white/30 rounded-xl p-2 transition-all duration-200 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
        isUser 
          ? 'bg-gradient-to-br from-slate-600 to-slate-700' 
          : 'bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-xs sm:max-w-md lg:max-w-2xl ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl p-4 shadow-lg border transition-all duration-200 relative ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 text-white rounded-tr-sm shadow-blue-200'
            : 'bg-white/90 backdrop-blur-sm border-slate-200 text-slate-800 rounded-tl-sm hover:shadow-xl hover:bg-white'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          
          {/* Message Actions */}
          {showActions && !isUser && (
            <div className="absolute -bottom-2 right-2 flex items-center gap-1 bg-white rounded-full shadow-lg border border-slate-200 p-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <button
                onClick={handleLike}
                className={`p-1.5 rounded-full transition-colors ${isLiked ? 'bg-green-100 text-green-600' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                <ThumbsUp className="w-3 h-3" />
              </button>
              <button
                onClick={handleDislike}
                className={`p-1.5 rounded-full transition-colors ${isDisliked ? 'bg-red-100 text-red-600' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                <ThumbsDown className="w-3 h-3" />
              </button>
              <button
                onClick={copyMessage}
                className={`p-1.5 rounded-full transition-colors ${isCopied ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                <Copy className="w-3 h-3" />
              </button>
              <button className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
                <Share className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
        
        {/* Message Info */}
        <div className={`flex items-center gap-2 mt-2 text-xs text-slate-500 ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}>
          <span className="font-medium">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          {isUser && getStatusIcon()}
          {!isUser && message.status === 'processed' && (
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-green-600 text-xs font-medium">On-chain Verified</span>
            </div>
          )}
          {isCopied && (
            <span className="text-blue-600 text-xs font-medium animate-fade-in">
              Copied!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;