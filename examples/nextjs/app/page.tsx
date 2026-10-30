'use client';

import React, { useState } from 'react';

export default function Home() {
  const [chatMessage, setChatMessage] = useState('');
  const [chatList, setChatList] = useState([
    { user: 'GamerX', text: 'Welcome to Rival! Let’s go! 🔥' },
    { user: 'StreamQueen', text: 'Is the ultra-low latency enabled?' },
    { user: 'Mod_Pro', text: 'Keep it clean in chat guys.' }
  ]);

  // Authentication & Channel State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatList([...chatList, { user: currentUser || 'Anonymous', text: chatMessage }]);
    setChatMessage('');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (authMode === 'signup' && !username) return;

    // Simulate account creation & user session locally
    setCurrentUser(authMode === 'signup' ? username : email.split('@')[0]);
    setIsAuthOpen(false);
    
    // Clear input fields
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-white font-sans relative">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-6 h-16 border-b border-neutral-800 bg-neutral-900 z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black tracking-wider text-indigo-500">RIVAL</span>
          <span className="bg-red-600 text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-md font-semibold text-sm transition">Browse</button>
          
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-indigo-400">👑 {currentUser}</span>
              <button onClick={handleSignOut} className="bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-md font-semibold text-xs transition">Sign Out</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => { setAuthMode('signin'); setIsAuthOpen(true); }} className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-md font-semibold text-sm transition">Sign In</button>
              <button onClick={() => { setAuthMode('signup'); setIsAuthOpen(true); }} className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md font-semibold text-sm transition">Sign Up</button>
            </div>
          )}
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Streamers List */}
        <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-4 hidden md:block overflow-y-auto">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Recommended Channels</h2>
          <div className="space-y-3">
            {[
              { name: 'Shroud_Clone', game: 'Valorant', viewers: '1.2k' },
              { name: 'Ninja_V2', game: 'Just Chatting', viewers: '850' },
              { name: 'Speedy_Sims', game: 'F1 2026', viewers: '310' }
            ].map((streamer, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 hover:bg-neutral-800 rounded-md cursor-pointer transition">
                <div>
                  <div className="font-semibold text-sm">{streamer.name}</div>
                  <div className="text-xs text-neutral-400">{streamer.game}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-300">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  {streamer.viewers}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center - Main Live Video Player Area */}
        <main className="flex-1 bg-neutral-950 p-6 flex flex-col overflow-y-auto">
          {/* Mock Video Canvas Frame */}
          <div className="w-full aspect-video bg-neutral-900 rounded-xl border border-neutral-800 flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/30 to-purple-950/20 animate-pulse"></div>
            <div className="z-0 text-center p-6">
              <div className="w-16 h-16 mx-auto bg-neutral-800 rounded-full flex items-center justify-center mb-4 border border-neutral-700 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <svg className="w-6 h-6 text-indigo-400 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <h3 className="text-lg font-bold tracking-tight">Main Player Feed Stream Container</h3>
              <p className="text-sm text-neutral-400 max-w-sm mt-1 mx-auto">Ready to receive video feeds via streaming server configurations (RTMP/HLS sources).</p>
            </div>
            
            {/* Player Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-90 flex justify-between items-center text-xs z-10">
              <div className="flex items-center gap-4">
                <button className="hover:text-indigo-400">Play/Pause</button>
                <button className="hover:text-indigo-400">Volume</button>
              </div>
              <div className="text-neutral-400">1080p60 • Ultra-Low Latency Mode</div>
            </div>
          </div>

          {/* Stream Title & Creator Metadata info */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight">Building the future live platform from scratch! #Dev</h1>
              <p className="text-sm text-indigo-400 font-medium mt-0.5">RivalDevOfficial</p>
            </div>
            <div className="flex gap-2">
              <span className="bg-neutral-800 text-xs px-3 py-1.5 rounded-md border border-neutral-700 font-medium">Gaming</span>
              <span className="bg-neutral-800 text-xs px-3 py-1.5 rounded-md border border-neutral-700 font-medium">Software Development</span>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Chat Interface Container */}
        <section className="w-80 bg-neutral-900 border-l border-neutral-800 flex flex-col h-full">
          <div className="p-4 border-b border-neutral-800 bg-neutral-900/50 flex justify-between items-center">
            <h2 className="text-sm font-bold tracking-wide uppercase text-neutral-300">Live Stream Chat</h2>
          </div>
          
          {/* Chat Messages Feed List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            {chatList.map((msg, idx) => (
              <div key={idx} className="break-all leading-relaxed">
                <span className="font-bold text-indigo-400 mr-2 hover:underline cursor-pointer">{msg.user}:</span>
                <span className="text-neutral-200">{msg.text}</span>
              </div>
            ))}
          </div>

          {/* Interactive Chat Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-800 bg-neutral-950">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={currentUser ? "Send a message..." : "Sign in to chat"}
                disabled={!currentUser}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-neutral-800 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-neutral-700 disabled:opacity-50"
              />
              <button type="submit" disabled={!currentUser} className="bg-indigo-600 hover:bg-indigo-500 text-xs font-bold px-3 rounded-md transition shadow-md disabled:opacity-50">Chat</button>
            </div>
          </form>
        </section>
      </div>

      {/* POPUP ACCOUNTS MODAL */}
      {isAuthOpen && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <button type="button" onClick={() => setIsAuthOpen(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white font-bold text-lg">✕</button>
            
            <h2 className="text-2xl font-black mb-2 text-center text-indigo-400">
              {authMode === 'signin' ? 'Welcome Back' : 'Create Rival Account'}
            </h2>
            <p className="text-xs text-neutral-400 text-center mb-6">Connect with your community instantly</p>
            
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Username</label>
