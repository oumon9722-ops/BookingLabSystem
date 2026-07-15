import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Globe, Settings, Zap, Building2, Sprout } from 'lucide-react';
export default function ChooseLab() {
  const navigate = useNavigate();

 const labs = [
    {
      id: 'computer-lab-1',
      name: 'Computer Lab 1',
      description: 'Workstation Room',
      seats: 30,
      icon: Monitor, // Icon ចាស់
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'network-lab',
      name: 'Network Lab',
      description: 'Cisco Routing Rack',
      seats: 20,
      icon: Globe, // Icon ចាស់
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      id: 'software-lab',
      name: 'Software Lab',
      description: 'Development Environment',
      seats: 25,
      icon: Settings, // Icon ចាស់
      color: 'bg-purple-50 text-purple-600'
    },
    // ⚡ ថែមកាតបន្ទប់អគ្គិសនី
    {
      id: 'electrical-lab',
      name: 'Electrical Lab',
      description: 'Power & Electronics Station',
      seats: 15,
      icon: Zap, // រូបភាពរន្ទះតំណាងឱ្យអគ្គិសនី
      color: 'bg-amber-50 text-amber-600'
    },
    // 🏗️ ថែមកាតវិស្វកម្មសំណង់ស៊ីវិល
    {
      id: 'civil-lab',
      name: 'Civil Engineering Lab',
      description: 'Structural & Materials Testing',
      seats: 18,
      icon: Building2, // រូបភាពអគារតំណាងឱ្យសំណង់ស៊ីវិល
      color: 'bg-emerald-50 text-emerald-600'
    },
    // 🌱 ថែមកាតផ្នែកកសិកម្ម
    {
      id: 'agriculture-lab',
      name: 'Agriculture Lab',
      description: 'Soil & Plant Science Research',
      seats: 22,
      icon: Sprout, // រូបភាពកូនឈើតំណាងឱ្យកសិកម្ម
      color: 'bg-green-50 text-green-600'
    }
  ];

  const handleSelectLab = (labName) => {
    // Pass the chosen lab name in the route query state to use it inside the Form screen next
    navigate('/user/book', { state: { selectedLab: labName } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Choose Lab</h1>
        <p className="text-sm text-slate-500">Select an available lab facility to configure your scheduling window.</p>
      </div>

      {/* 🔑 ៣. រៀបចំ Grid ឱ្យចេញ ៣ ជួរ (នៅលើ Screen ធំ) ដើម្បីឱ្យវាធ្លាក់មកក្រោមស្អាត */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab) => {
          const IconComponent = lab.icon;
          return (
            <div key={lab.id} className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between">
              <div>
                {/* បង្ហាញរូបភាព Icon តាមផ្នែកនីមួយៗ */}
                <div className={`p-3 rounded-xl w-fit ${lab.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <h3 className="mt-4 text-lg font-bold text-slate-900">{lab.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{lab.description}</p>
                
                <span className="inline-block mt-4 text-[11px] font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                  {lab.seats} Seats Available
                </span>
              </div>

              <button 
                onClick={() => navigate('/user/book', { state: { selectedLab: lab.name } })}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors text-sm shadow-sm"
              >
                Select
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}