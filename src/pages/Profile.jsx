import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  
  // 1. Initial State: Load from localStorage if it exists, otherwise use defaults
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('user');
    return savedProfile ? JSON.parse(savedProfile) : {
      fullName: 'Welcome, Student',
      email: 'student@university.edu',
      department: 'Department of Computer Science'
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 2. Save Action: Write the updated object into localStorage
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(profile));
    window.dispatchEvent(new Event('profileUpdated'));
    setIsEditing(false);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account Profile</h1>
          <p className="text-sm text-slate-500">Manage your university information and reservation options.</p>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition-colors"
          >
            ✏️ Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-600/10">
            {getInitials(profile.fullName) || 'ST'}
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">{profile.fullName}</h3>
            <p className="text-xs text-slate-400 font-medium">{profile.department}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none ${
                  isEditing
                    ? 'bg-white border-blue-500 text-slate-800 focus:ring-2 focus:ring-blue-500/10'
                    : 'bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed outline-none'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">University Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none ${
                  isEditing
                    ? 'bg-white border-blue-500 text-slate-800 focus:ring-2 focus:ring-blue-500/10'
                    : 'bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed outline-none'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={profile.department}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full border px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none ${
                isEditing
                  ? 'bg-white border-blue-500 text-slate-800 focus:ring-2 focus:ring-blue-500/10'
                  : 'bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed outline-none'
              }`}
            />
          </div>

          {isEditing && (
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  // Cancel restores the old profile saved state from storage
                  const saved = localStorage.getItem('university_user_profile');
                  if (saved) setProfile(JSON.parse(saved));
                  setIsEditing(false);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}