'use client';

import React, { useState } from 'react';
import { X, Globe, ShieldAlert, Sliders, Loader2 } from 'lucide-react';
// Import the server action we just made
import { createMockEndpoint } from '../action';

interface NewMockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewMockModal({ isOpen, onClose }: NewMockModalProps) {
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('');
  const [statusCode, setStatusCode] = useState(200);
  const [delay, setDelay] = useState(0);
  
  // ⚡ Add a loading tracker state
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!path.trim()) {
      setErrorMsg('Endpoint path route cannot be empty.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    const result = await createMockEndpoint({
  method,
  path,
  statusCode,
  delay,
  responseBody: "{}", // ⚡ Satisfies the new parameter requirements cleanly
});

   

    setIsSaving(false);

    if (result.success) {
      // Reset form variables upon clean entry
      setPath('');
      setMethod('GET');
      setStatusCode(200);
      setDelay(0);
      onClose(); // Dismiss the panel seamlessly
    } else {
      setErrorMsg(result.error || 'An error occurred.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-lg h-full bg-[#F7F7F5] border-l border-neutral-200 shadow-2xl flex flex-col justify-between p-6 z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div>
              <h2 className="text-sm font-bold text-[#2D3142] uppercase tracking-wider">Create New Mock Route</h2>
              <p className="text-[11px] text-[#767B91]">Configure an intercepted routing endpoint rule.</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[#EFEFEF] text-[#767B91]"><X size={16} /></button>
          </div>

          {/* Form Content Controls */}
          <div className="py-6 space-y-5">
            {errorMsg && <p className="text-xs text-red-500 font-semibold">{errorMsg}</p>}
            
            {/* Method Select */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-[#767B91] uppercase flex items-center gap-1"><ShieldAlert size={12} /> HTTP Method</label>
              <div className="grid grid-cols-5 gap-2">
                {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`py-1.5 text-xs font-bold rounded-md transition-all border ${method === m ? 'bg-[#2D3142] text-white border-[#2D3142]' : 'bg-white text-[#767B91] border-neutral-200 hover:bg-[#EFEFEF]'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Route Path Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-[#767B91] uppercase flex items-center gap-1"><Globe size={12} /> Route Endpoint Path</label>
              <div className="flex rounded-md border border-neutral-200 bg-white overflow-hidden shadow-sm">
                <span className="bg-[#EFEFEF] px-3 py-2 text-xs font-medium text-[#767B91] border-r border-neutral-200">/api/mock/</span>
                <input 
                  type="text" 
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  placeholder="v1/users"
                  className="flex-1 px-3 py-2 text-xs text-[#2D3142] focus:outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Select Menus */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-[#767B91] uppercase">Response Code</label>
                <select value={statusCode} onChange={(e) => setStatusCode(Number(e.target.value))} className="w-full px-3 py-2 text-xs text-[#2D3142] bg-white border border-neutral-200 rounded-md focus:outline-none">
                  <option value={200}>200 OK</option>
                  <option value={201}>201 Created</option>
                  <option value={404}>404 Not Found</option>
                  <option value={500}>500 Server Error</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-[#767B91] uppercase flex items-center gap-1"><Sliders size={12} /> Inject Latency</label>
                <select value={delay} onChange={(e) => setDelay(Number(e.target.value))} className="w-full px-3 py-2 text-xs text-[#2D3142] bg-white border border-neutral-200 rounded-md focus:outline-none">
                  <option value={0}>0 ms (Instant)</option>
                  <option value={500}>500 ms (Normal)</option>
                  <option value={2000}>2000 ms (Slow)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel Footer */}
        <div className="border-t border-neutral-200 pt-4 flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} disabled={isSaving} className="px-4 py-2 text-xs font-semibold text-[#767B91] hover:bg-[#EFEFEF] rounded-lg">
            Cancel
          </button>
          
          {/* Hooked up button with an elegant spinner conditional */}
          <button 
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-[#9B729F] hover:opacity-90 disabled:opacity-50 text-white font-semibold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5"
          >
            {isSaving && <Loader2 size={12} className="animate-spin" />}
            {isSaving ? 'Saving Route...' : 'Save Target Endpoint'}
          </button>
        </div>
      </div>
    </div>
  );
}