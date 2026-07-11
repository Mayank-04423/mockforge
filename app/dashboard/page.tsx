'use client';

import React, { useState, useEffect } from 'react';

const INITIAL_ENDPOINTS = [
  { id: 1, route: '/api/v1/users', method: 'GET', type: 'JSON', status: 200, delay: '128ms', isActive: true },
  { id: 2, route: '/api/v1/products/create', method: 'POST', type: 'JSON', status: 200, delay: '238ms', isActive: true },
  { id: 3, route: '/api/v1/auth/session', method: 'GET', type: 'JWT', status: 200, delay: '88ms', isActive: false },
  { id: 4, route: '/api/v1/billing/invoice', method: 'DELETE', type: 'XML', status: 404, delay: '288ms', isActive: true },
];

const INITIAL_LOGS = [
  { id: 1, timestamp: '03:36:20', method: 'GET', route: '/api/v1/users', status: 200, ip: '172.24.48.161', time: '779ms' },
  { id: 2, timestamp: '03:36:20', method: 'DELETE', route: '/api/v1/users', status: 404, ip: '172.24.8.266', time: '167ms' },
  { id: 3, timestamp: '03:36:20', method: 'POST', route: '/api/v1/analytics', status: 201, ip: '172.24.348.223', time: '307ms' },
];

export default function DashboardPage() {
  const [endpoints, setEndpoints] = useState(INITIAL_ENDPOINTS);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newRoute, setNewRoute] = useState('');
  const [newMethod, setNewMethod] = useState('GET');
  const [newType, setNewType] = useState('JSON');
  const [newStatus, setNewStatus] = useState(200);
  const [newDelay, setNewDelay] = useState(120);

  useEffect(() => {
    const routesPool = ['/api/v1/users', '/api/v1/analytics', '/api/v1/products/create', '/api/v1/auth/session'];
    const methodsPool = ['GET', 'POST', 'DELETE'];
    const statusesPool = [200, 201, 404];

    const interval = setInterval(() => {
      const randomRoute = routesPool[Math.floor(Math.random() * routesPool.length)];
      const randomMethod = methodsPool[Math.floor(Math.random() * methodsPool.length)];
      const randomStatus = statusesPool[Math.floor(Math.random() * statusesPool.length)];
      
      const now = new Date();
      const timestamp = now.toTimeString().split(' ')[0];
      
      const newLog = {
        id: Date.now(),
        timestamp,
        method: randomMethod,
        route: randomRoute,
        status: randomStatus,
        ip: `172.24.${Math.floor(Math.random() * 240)}.${Math.floor(Math.random() * 240)}`,
        time: `${Math.floor(Math.random() * 500) + 100}ms`
      };

      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const toggleStatus = (id: number) => {
    setEndpoints(prev =>
      prev.map(ep => ep.id === id ? { ...ep, isActive: !ep.isActive } : ep)
    );
  };

  const handleCreateMock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoute.startsWith('/')) {
      alert('Route path must start with a forward slash (/)');
      return;
    }
    const newEndpoint = {
      id: Date.now(),
      route: newRoute,
      method: newMethod,
      type: newType,
      status: Number(newStatus),
      delay: `${newDelay}ms`,
      isActive: true,
    };
    setEndpoints(prev => [newEndpoint, ...prev]);
    setNewRoute('');
    setIsModalOpen(false);
  };

  // ⚡ CUSTOM BADGE ALGORITHM SPECIFICATIONS
  const getMethodBadge = (method: string) => {
    const base = "px-2.5 py-0.5 text-[10px] font-bold rounded tracking-wide text-center w-14 inline-block shadow-sm ";
    switch (method) {
      case 'GET': return base + "bg-[#4a7c59]/15 text-[#4a7c59] border border-[#4a7c59]/20";
      case 'POST': return base + "bg-[#b58a63]/15 text-[#b58a63] border border-[#b58a63]/20";
      case 'DELETE': return base + "bg-[#9a5a60]/15 text-[#9a5a60] border border-[#9a5a60]/20";
      default: return base + "bg-neutral-100 text-[#767B91]";
    }
  };

  return (
    <div className="space-y-8 pb-12 text-[#2D3142]">
      
      {/* 💎 MUTED JEWEL TONED BENTO ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Mocks (Slate Blue #9BB1C4) */}
        <div className="p-6 rounded-2xl border border-neutral-200/60 bg-[#9BB1C4]/20 shadow-sm flex flex-col justify-between h-28 relative overflow-hidden backdrop-blur-md">
          <div className="flex justify-between items-start text-[10px] font-bold uppercase tracking-widest text-[#767B91]">
            <span>Total Mocks</span>
            <span className="text-neutral-400 text-sm">💎</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold tracking-tight text-[#2D3142]">{endpoints.length}</span>
            <span className="text-[11px] text-[#767B91] font-medium">configured</span>
          </div>
        </div>

        {/* Card 2: Live Requests (Muted Sage/Teal #9CD3C4) */}
        <div className="p-6 rounded-2xl border border-neutral-200/60 bg-[#9CD3C4]/20 shadow-sm flex flex-col justify-between h-28 relative overflow-hidden backdrop-blur-md">
          <div className="flex justify-between items-start text-[10px] font-bold uppercase tracking-widest text-[#767B91]">
            <span>Live Requests</span>
            <span className="text-neutral-400 text-sm">⚡</span>
          </div>
          <div className="flex items-baseline justify-between w-full">
            <span className="text-3xl font-bold tracking-tight text-[#2D3142]">14,204</span>
            <span className="text-[10px] text-[#4a7c59] font-bold bg-white/80 px-1.5 py-0.5 rounded border border-[#4a7c59]/20 shadow-sm">+12%</span>
          </div>
        </div>

        {/* Card 3: Engine Speed (Warm Khaki #D8C3A5) */}
        <div className="p-6 rounded-2xl border border-neutral-200/60 bg-[#D8C3A5]/20 shadow-sm flex flex-col justify-between h-28 relative overflow-hidden backdrop-blur-md">
          <div className="flex justify-between items-start text-[10px] font-bold uppercase tracking-widest text-[#767B91]">
            <span>Engine Speed</span>
            <span className="text-neutral-400 text-sm">🔥</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold tracking-tight text-[#2D3142]">187ms</span>
            <span className="text-[11px] text-[#767B91] font-medium">avg delay</span>
          </div>
        </div>

        {/* Card 4: Engine Health (Dusty Rose #C9BBCF) */}
        <div className="p-6 rounded-2xl border border-neutral-200/60 bg-[#C9BBCF]/20 shadow-sm flex flex-col justify-between h-28 relative overflow-hidden backdrop-blur-md">
          <div className="flex justify-between items-start text-[10px] font-bold uppercase tracking-widest text-[#767B91]">
            <span>Engine Health</span>
            <span className="text-neutral-400 text-sm">🔮</span>
          </div>
          <div className="flex items-baseline justify-between w-full">
            <span className="text-3xl font-bold tracking-tight text-[#2D3142]">99.9%</span>
            <span className="text-[10px] text-emerald-700 font-semibold bg-white/80 px-2 py-0.5 rounded border border-emerald-200/60 shadow-sm">● online</span>
          </div>
        </div>
      </div>

      {/* ⚡ INTERACTIVE ROUTER CONTROL DATA PANELS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold tracking-tight text-[#2D3142]">Virtual API Router</h2>
            <p className="text-xs text-[#767B91]">Deploy real-time active routers and toggle endpoint state loops.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input 
              type="text" 
              placeholder="Filter paths..." 
              className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs text-[#2D3142] placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-all w-full sm:w-56 shadow-sm"
            />
            {/* Active Accent Switch button: #9B729F */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-1.5 bg-[#9B729F] hover:opacity-90 active:scale-95 text-white font-semibold rounded-lg text-xs transition-all shadow-sm whitespace-nowrap"
            >
              🚀 Launch Route
            </button>
          </div>
        </div>

        {/* TABLE COMPONENT SHELL */}
        <div className="w-full bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                {/* Header Background: #EAEAEA & Row Border: #E5E5E5 */}
                <tr className="border-b border-[#E5E5E5] bg-[#EAEAEA] text-[10px] font-bold uppercase tracking-widest text-[#767B91]">
                  <th className="py-3 px-6 text-center w-24">Method</th>
                  <th className="py-3 px-6">Route Path</th>
                  <th className="py-3 px-6">Format</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Latency</th>
                  <th className="py-3 px-6">State Switch</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              {/* Row Divider: #E5E5E5 & Secondary text #767B91 */}
              <tbody className="divide-y divide-[#E5E5E5] text-xs text-[#2D3142] font-semibold">
                {endpoints.map((ep) => (
                  <tr key={ep.id} className="hover:bg-neutral-50/60 transition-colors group">
                    <td className="py-3.5 px-6 text-center"><span className={getMethodBadge(ep.method)}>{ep.method}</span></td>
                    <td className="py-3.5 px-6 font-mono font-bold text-[#2D3142] tracking-wide">{ep.route}</td>
                    <td className="py-3.5 px-6"><span className="bg-neutral-100 text-[#767B91] text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">{ep.type}</span></td>
                    <td className="py-3.5 px-6">
                      <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] ${ep.status < 300 ? 'text-[#4a7c59] bg-[#4a7c59]/10' : 'text-[#b58a63] bg-[#b58a63]/10'}`}>
                        {ep.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-[#767B91] font-mono font-medium text-[11px]">{ep.delay}</td>
                    <td className="py-3.5 px-6">
                      {/* Active Toggle Switch Accent color: #9B729F */}
                      <button 
                        onClick={() => toggleStatus(ep.id)}
                        className={`relative inline-flex h-4.5 w-9 items-center rounded-full transition-all focus:outline-none ${
                          ep.isActive ? 'bg-[#9B729F]' : 'bg-neutral-200'
                        }`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                          ep.isActive ? 'translate-x-4.5' : 'translate-x-1'
                        }`} />
                      </button>
                    </td>
                    <td className="py-3.5 px-6 text-right text-[11px]">
                      <div className="flex justify-end gap-3 text-[#767B91] opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="hover:text-[#2D3142] transition-colors">Modify</button>
                        <button className="hover:text-rose-600 transition-colors">Purge</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 📟 TERMINAL STREAM LOG COMPONENT */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#2D3142] flex items-center gap-2 tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9B729F] animate-pulse" />
            Live Virtual Engine Pipeline
          </h2>
          <span className="text-[9px] font-mono uppercase bg-neutral-200/60 px-2 py-0.5 rounded text-[#767B91] font-bold">Live Intercept BUFFER</span>
        </div>
        
        <div className="w-full bg-white border border-neutral-200 rounded-xl p-5 font-mono text-[11px] space-y-2.5 shadow-sm overflow-hidden h-44">
          <div className="text-[#767B91] border-b border-neutral-100 pb-2 mb-1 flex justify-between items-center text-[9px] font-bold tracking-wider">
            <span>STOUT CHANNEL RECORDER CONNECTED // INCOMING PACKETS</span>
            <span className="text-[#2D3142] bg-[#EAEAEA] px-2 py-0.5 rounded font-bold text-[9px]">INTERCEPT STREAMING</span>
          </div>
          <div className="space-y-2 overflow-y-auto max-h-28">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between text-[#767B91] hover:bg-neutral-50 px-2 py-0.5 rounded-md transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-neutral-300">[{log.timestamp}]</span>
                  <span className={`font-bold text-[9px] px-1 rounded ${
                    log.method === 'GET' ? 'text-[#4a7c59] bg-[#4a7c59]/10' : 'text-[#b58a63] bg-[#b58a63]/10'
                  }`}>{log.method}</span>
                  <span className="text-[#2D3142] font-bold font-mono">{log.route}</span>
                </div>
                <div className="flex items-center gap-6 text-[#767B91]">
                  <span className="text-neutral-300 text-[10px]">{log.ip}</span>
                  <span className="text-[#767B91] font-mono text-[10px]">{log.time}</span>
                  <span className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                    log.status < 300 ? 'text-[#4a7c59] bg-[#4a7c59]/5' : 'text-[#9a5a60] bg-[#9a5a60]/10'
                  }`}>{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🗺️ CREATE POPUP OVERLAY INTERACTIVE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D3142]/10 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white border border-neutral-200 rounded-xl shadow-xl p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#2D3142]">Establish Virtual Channel</h3>
              <p className="text-xs text-[#767B91]">Configure path mapping arrays and latency pipelines.</p>
            </div>

            <form onSubmit={handleCreateMock} className="space-y-4">
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[9px] font-bold text-[#767B91] uppercase tracking-widest mb-1">Method</label>
                  <select 
                    value={newMethod} 
                    onChange={(e) => setNewMethod(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-[#2D3142] focus:outline-none"
                  >
                    <option>GET</option>
                    <option>POST</option>
                    <option>DELETE</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-bold text-[#767B91] uppercase tracking-widest mb-1">Route Path</label>
                  <input 
                    type="text" 
                    required
                    placeholder="/api/v1/resource"
                    value={newRoute}
                    onChange={(e) => setNewRoute(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-[#2D3142] font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-neutral-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1 text-[11px] font-bold uppercase text-[#767B91] hover:text-[#2D3142] transition-colors"
                >
                  Close
                </button>
                <button 
                  type="submit" 
                  className="px-3 py-1 bg-[#9B729F] text-white font-semibold rounded-lg text-[11px] uppercase tracking-wider shadow-sm"
                >
                  Deploy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}