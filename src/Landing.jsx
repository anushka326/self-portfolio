import React from 'react';
import { Link } from 'react-router-dom';
import CustomCursor from './CustomCursor';

export default function Landing() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.35),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.28),_transparent_22%),linear-gradient(135deg,_#020617_0%,_#091a36_45%,_#0e0821_100%)] text-white min-h-screen relative overflow-hidden font-sans flex flex-col justify-center items-center cursor-none">
      <CustomCursor />
      
      {/* Vibrant background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-[240px] h-[240px] rounded-full bg-cyan-500/20 blur-[140px] mix-blend-screen"></div>
        <div className="absolute top-1/3 right-0 w-[360px] h-[360px] rounded-full bg-fuchsia-500/20 blur-[180px] mix-blend-screen"></div>
        <div className="absolute bottom-10 left-1/4 w-[280px] h-[280px] rounded-full bg-amber-400/15 blur-[120px] mix-blend-screen"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 animate-fade-in-up w-full">
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-6 sm:mb-8">
          Welcome <span className="inline-block hover:animate-spin origin-bottom">👋</span>
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-4xl text-gray-300 font-light max-w-4xl leading-relaxed mb-10 sm:mb-14">
          Building AI-powered solutions for real-world impact 🤖
        </p>

        <Link 
          to="/home"
          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black py-4 px-10 sm:py-6 sm:px-16 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 flex items-center justify-center gap-4 sm:gap-5 group text-lg sm:text-2xl uppercase tracking-widest cursor-none min-h-[50px]"
        >
          <span>Explore My Work</span>
          <span className="group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:scale-110 transition-transform duration-300 text-2xl sm:text-3xl">🚀</span>
        </Link>
        
      </div>
    </div>
  );
}
