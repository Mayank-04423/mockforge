'use client';

import { useState } from 'react';
import { saveMockEndpoint } from '@/lib/endpointService';

interface EndpointFormProps {
  currentProjectId: string;
  onEndpointAdded: (newEndpoint: any) => void;
}

export default function EndpointForm({ currentProjectId, onEndpointAdded }: EndpointFormProps) {
  // 1. Reactive Input State Hooks
  const [path, setPath] = useState('');
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET');
  const [statusCode, setStatusCode] = useState(200);
  const [jsonInput, setJsonInput] = useState('{\n  "message": "Hello from Mockforge!"\n}');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Form Submission Action Pipeline
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate JSON input before dispatching over the wire
      const parsedBody = JSON.parse(jsonInput);

      const payload = {
        path,
        method,
        statusCode,
        responseBody: parsedBody,
        projectId: currentProjectId,
      };

      const response = await saveMockEndpoint(payload);

      if (response.success) {
        // IMMUTABLE DISPATCH: Prepend the newly created endpoint database row up to the global array view state
        onEndpointAdded(response.data);
        
        // Clear configuration interface input boxes
        setPath('');
        setJsonInput('{\n  "message": "Hello from Mockforge!"\n}');
      }
    } catch (error: any) {
      alert(error.message || 'Invalid JSON syntax detected. Please fix the formatting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 rounded-xl border max-w-2xl mx-auto shadow-sm" style={{ backgroundColor: '#F7F7F5', borderColor: '#2D3142' }}>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#2D3142' }}>Forge New Mock Target</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Method & Path Row Container */}
        <div className="flex gap-4">
          <div className="flex flex-col w-1/4">
            <label className="text-xs font-semibold mb-1" style={{ color: '#2D3142' }}>HTTP Verb</label>
            <select 
              value={method} 
              onChange={(e) => setMethod(e.target.value as any)}
              className="p-2 border rounded-md font-mono text-sm bg-white"
              style={{ borderColor: '#2D3142', color: '#2D3142' }}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-xs font-semibold mb-1" style={{ color: '#2D3142' }}>Target Endpoint Route Path</label>
            <input 
              type="text" 
              placeholder="/v1/users/:id" 
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="p-2 border rounded-md font-mono text-sm bg-white"
              style={{ borderColor: '#2D3142', color: '#2D3142' }}
              required
            />
          </div>
        </div>

        {/* HTTP Return Status Target Input Box */}
        <div className="flex flex-col w-1/3">
          <label className="text-xs font-semibold mb-1" style={{ color: '#2D3142' }}>Emulated Response Code</label>
          <input 
            type="number" 
            value={statusCode}
            onChange={(e) => setStatusCode(parseInt(e.target.value))}
            className="p-2 border rounded-md text-sm bg-white"
            style={{ borderColor: '#2D3142', color: '#2D3142' }}
            min="100" 
            max="599"
            required
          />
        </div>

        {/* Dynamic Target Payload Code Editor Canvas Area */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1" style={{ color: '#2D3142' }}>Mock JSON Response Payload Payload Template</label>
          <textarea 
            rows={6}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="p-3 border rounded-md font-mono text-sm bg-white whitespace-pre"
            style={{ borderColor: '#2D3142', color: '#2D3142' }}
            required
          />
        </div>

        {/* Interactive Processing Action Triggers */}
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 rounded-md font-semibold text-white transition-all shadow-sm active:scale-95 disabled:opacity-50"
          style={{ backgroundColor: '#9B729F' }}
        >
          {isSubmitting ? 'Deploying Rule Blueprint...' : 'Deploy Mock API Live'}
        </button>
      </form>
    </div>
  );
}