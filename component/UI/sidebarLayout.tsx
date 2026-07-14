import React, { useState } from 'react';
import { LayoutDashboard, Radio, Settings, Terminal, Menu, X } from 'lucide-react';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', href: '#', icon: LayoutDashboard, current: true },
    { name: 'Mock Endpoints', href: '#', icon: Radio, current: false },
    { name: 'Request Logs', href: '#', icon: Terminal, current: false },
    { name: 'Settings', href: '#', icon: Settings, current: false },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar Navigation Panel */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Header Block / Brand Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
          <span className={`font-bold tracking-wider text-emerald-400 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
            MOCKFORGE
          </span>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Dynamic Navigation Action Links */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl font-medium transition-all group ${
                  item.current 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Icon size={22} className={item.current ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'} />
                <span className={`transition-opacity duration-200 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                  {item.name}
                </span>
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Main Dynamic Panel Canvas */}
      <main className={`flex-1 transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-20'}`}>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}