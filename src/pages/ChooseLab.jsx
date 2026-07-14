import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChooseLab() {
  const navigate = useNavigate();

  const labs = [
    { id: 'l1', name: 'Computer Lab 1', capacity: '30 Seats Available', type: 'Workstation Room', emoji: '💻' },
    { id: 'l2', name: 'Network Lab', capacity: '20 Seats Available', type: 'Cisco Routing Rack', emoji: '🌐' },
    { id: 'l3', name: 'Software Lab', capacity: '25 Seats Available', type: 'Development Environment', emoji: '⚙️' }
  ];

  const handleSelectLab = (labName) => {
    // Pass the chosen lab name in the route query state to use it inside the Form screen next
    navigate('/user/book', { state: { selectedLab: labName } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span className="cursor-pointer hover:text-slate-600" onClick={() => navigate('/user/dashboard')}>Dashboard</span>
        <span>/</span>
        <span className="text-slate-600 font-medium">Choose Lab</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Choose Lab</h1>
        <p className="text-sm text-slate-500">Select an available lab facility to configure your scheduling window.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {labs.map((lab) => (
          <div key={lab.id} className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl border border-slate-100 group-hover:scale-105 transition-transform">
                {lab.emoji}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-lg">{lab.name}</h3>
                <p className="text-xs text-slate-400 font-medium">{lab.type}</p>
              </div>
              <p className="text-xs font-semibold px-2.5 py-1 inline-block rounded-full bg-blue-50 text-blue-700">
                {lab.capacity}
              </p>
            </div>
            <button 
              onClick={() => handleSelectLab(lab.name)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}