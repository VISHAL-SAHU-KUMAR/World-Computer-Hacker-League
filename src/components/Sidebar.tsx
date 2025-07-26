import React, { useState } from 'react';
import { MessageSquare, Settings, Info, Plus, Clock, Star, Trash2, Search, Filter, Zap, Brain, Users, TrendingUp } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const conversations = [
    { 
      id: '1', 
      title: 'ICP और Decentralized AI की शुरुआत', 
      time: '2m ago', 
      active: true, 
      starred: true,
      preview: 'Internet Computer Protocol के बारे में...',
      messageCount: 12
    },
    { 
      id: '2', 
      title: 'Blockchain Development Guide', 
      time: '1h ago', 
      active: false, 
      starred: false,
      preview: 'Smart contracts कैसे बनाएं...',
      messageCount: 8
    },
    { 
      id: '3', 
      title: 'AI Agent Integration', 
      time: '3h ago', 
      active: false, 
      starred: true,
      preview: 'Live agents से कैसे बात करें...',
      messageCount: 15
    },
    { 
      id: '4', 
      title: 'Decentralized Future Vision', 
      time: '1d ago', 
      active: false, 
      starred: false,
      preview: 'भविष्य में AI कैसा होगा...',
      messageCount: 6
    },
  ];

  const stats = [
    { label: 'Total Chats', value: '24', icon: MessageSquare, color: 'blue' },
    { label: 'AI Responses', value: '156', icon: Brain, color: 'purple' },
    { label: 'Agent Connects', value: '8', icon: Users, color: 'green' },
  ];

  const filteredConversations = conversations.filter(conv => 
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeFilter === 'all' || 
     (activeFilter === 'starred' && conv.starred) ||
     (activeFilter === 'recent' && conv.time.includes('m ago')))
  );

  return (
    <div className="w-80 bg-white/60 backdrop-blur-md border-r border-slate-200/50 flex flex-col h-full shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-slate-200/50">
        <button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white rounded-xl p-3 flex items-center justify-center gap-2 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
          <Plus className="w-5 h-5" />
          <span className="font-semibold">New Conversation</span>
        </button>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-slate-200/50">
        <div className="grid grid-cols-1 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                  <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="p-4 border-b border-slate-200/50 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div className="flex gap-2">
          {['all', 'starred', 'recent'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-white/80 text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Conversations ({filteredConversations.length})
          </h3>
          <div className="space-y-2">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-200 group relative ${
                  conv.active
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-md'
                    : 'hover:bg-white/80 border border-transparent hover:border-slate-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <MessageSquare className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      conv.active ? 'text-blue-500' : 'text-slate-400'
                    }`} />
                    {conv.starred && (
                      <Star className="absolute -top-1 -right-1 w-2.5 h-2.5 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-sm font-medium truncate ${
                        conv.active ? 'text-blue-900' : 'text-slate-700'
                      }`}>
                        {conv.title}
                      </p>
                      <span className="text-xs text-slate-500 ml-2">{conv.messageCount}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mb-1">{conv.preview}</p>
                    <p className="text-xs text-slate-400">{conv.time}</p>
                  </div>
                </div>
                
                {/* Hover Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200/50 space-y-2">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Live Agent Available</span>
          </div>
          <p className="text-xs text-green-600">
            Connect with human experts for advanced queries
          </p>
        </div>
        
        <button className="w-full flex items-center gap-3 p-3 text-slate-600 hover:bg-white/80 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-200">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings & Preferences</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 text-slate-600 hover:bg-white/80 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-200">
          <Info className="w-5 h-5" />
          <span className="text-sm font-medium">About DecentraGPT</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;