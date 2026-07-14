import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigates directly to the student dashboard route
    navigate('/user/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FAFC] to-[#E2E8F0] flex items-center justify-center font-sans px-6 antialiased">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/60 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-slate-200/50 shadow-xl shadow-slate-200/40">
        
        {/* Left Side: Illustration Asset Wrapper */}
        <div className="flex justify-center items-center w-full">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/20 to-pink-200/20 rounded-full filter blur-3xl -z-10"></div>
            <img src="https://elements-resized.envatousercontent.com/elements-cover-images/fa95d8c0-9773-455e-9436-fea17d06ef0a?w=2038&cf_fit=scale-down&q=85&format=auto&s=8487d2478791aa3cf59b732595522e854403e4cf66cf97c5a7ea4ef35e9c746b" alt="Lab"    className="w-full h-auto object-contain drop-shadow-sm"/> 
          </div>
        </div>

        {/* Right Side: Professional Typography Content */}
        <div className="space-y-6 max-w-lg">
          <div className="space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 tracking-wide uppercase">
              Management Platform
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Welcome to <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                Lab Booking System
              </span>
            </h1>
          </div>
          
          <p className="text-slate-500 text-lg leading-relaxed">
            Book your lab easily and efficiently. Gain access to real-time resource schedules, instant reservation management, and confirmation protocols.
          </p>

          <div className="pt-2">
            <button 
              onClick={handleGetStarted}
              className="group inline-flex items-center justify-center bg-[#0F172A] hover:bg-slate-800 text-white font-medium px-8 py-3.5 rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 transition-all duration-200 transform active:scale-[0.98]"
            >
              Get Started
              <svg 
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}