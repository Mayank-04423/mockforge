'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Radio, Terminal } from 'lucide-react';
// Import your fresh slide-over layout pane
import NewMockModal from './components/newMockModal';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // 🎨 MAIN BACKGROUND: #F7F7F5 & PRIMARY TEXT: #2D3142
    <div className="flex h-screen w-screen bg-[#F7F7F5] text-[#2D3142] overflow-hidden font-sans">
      
      {/* 🚀 SIDEBAR: #EFEFEF subtle structural separation */}
      <aside className="w-64 border-r border-neutral-200/60 bg-[#EFEFEF] p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="h-5 w-5 rounded-md bg-[#9BB1C4] shadow-sm" />
            <span className="font-bold text-md tracking-tight text-[#2D3142]">MockForge</span>
          </div>
          
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/80 text-[#2D3142] font-semibold text-sm shadow-sm transition-all">
              <LayoutDashboard size={16} className="text-[#9BB1C4]" />
              <span>Dashboard</span>
            </a>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#767B91] hover:bg-white/40 hover:text-[#2D3142] text-sm font-medium transition-all">
              <Radio size={16} className="text-[#767B91]" />
              <span>API Endpoints</span>
            </a>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#767B91] hover:bg-white/40 hover:text-[#2D3142] text-sm font-medium transition-all">
              <Terminal size={16} className="text-[#767B91]" />
              <span>Activity Logs</span>
            </a>
          </nav>
        </div>
        
        <div className="border-t border-neutral-200 pt-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center font-bold text-[#2D3142] text-xs shadow-sm">
            U
          </div>
          <div>
            <p className="text-xs font-bold text-[#2D3142]">Developer Account</p>
            <p className="text-[10px] text-[#767B91] font-medium">Free Tier</p>
          </div>
        </div>
      </aside>

      {/* 📥 MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-14 border-b border-neutral-200/40 flex items-center justify-between px-8 bg-white/40 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-xs font-bold tracking-widest text-[#767B91] uppercase">Workspace Dashboard</h1>
          {/* Accent Button hooked up to open state */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 bg-[#9B729F] hover:opacity-90 text-white font-semibold rounded-lg text-xs transition-all shadow-sm"
          >
            + New Mock
          </button>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </div>
      </main>

      {/* Slide-over component rendered globally within the layout context */}
      <NewMockModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}