import React, { useState, useEffect, useRef } from 'react';
import CustomCursor from './CustomCursor';

const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={isVisible ? 'reveal-visible' : 'reveal-hidden'}>
      {children}
    </div>
  );
};

const Separator = () => (
  <div className="max-w-7xl mx-auto px-6 my-6 md:my-10">
    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
  </div>
);

export default function Portfolio() {
  const phrases = [
    "AI & Data Science Student | Building AI Solutions 🤖",
    "Building intelligent solutions with AI 🤖",
    "Exploring ideas, turning them into reality 🚀",
    "Learning, creating, and improving every day 💡"
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Reset scroll on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Delay start of typing effect
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const handleTyping = () => {
      const fullPhrase = phrases[currentPhraseIndex];
      const fullPhraseChars = [...fullPhrase];
      const currentChars = [...currentText];

      if (!isDeleting) {
        // Typing
        setCurrentText(fullPhraseChars.slice(0, currentChars.length + 1).join(""));
        setTypingSpeed(80); // Smooth typing speed

        if (currentText === fullPhrase) {
          // Pause at the end
          setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullPhraseChars.slice(0, currentChars.length - 1).join(""));
        setTypingSpeed(40); // Faster deletion

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [hasStarted, currentText, isDeleting, currentPhraseIndex, typingSpeed, phrases]);

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-white min-h-screen relative font-sans selection:bg-cyan-500/30 selection:text-cyan-200 cursor-none">

      <CustomCursor />

      {/* Background Container - cleanly clips all decorative elements without breaking layout */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative background blobs - Refined for Depth */}
        <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] mix-blend-screen animate-blob animation-delay-2000"></div>
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full overflow-x-hidden">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 md:py-6 bg-slate-950/80 backdrop-blur-3xl fixed top-0 left-0 right-0 w-full z-[60] transition-all duration-700 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {/* Bottom gradient border matching the buttons */}
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 opacity-50"></div>

          <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 tracking-wider uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105 transition-transform duration-500 cursor-default shrink-0">
            ANUSHKA
          </h1>

          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-[70] transition-all duration-300 relative"
            aria-label="Toggle Menu"
          >
            <span className={`w-8 h-[2px] bg-cyan-400 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[10px]' : ''}`}></span>
            <span className={`w-8 h-[2px] bg-purple-400 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-8 h-[2px] bg-cyan-400 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`}></span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4 lg:space-x-8 text-sm font-bold items-center">
            {[
              { name: 'Profile', href: '#hero' },
              { name: 'About', href: '#about' },
              { name: 'What I Do', href: '#what-i-do' },
              { name: 'Skills', href: '#skills' },
              { name: 'Projects', href: '#projects' },
              { name: 'Certificates', href: '#certificates' },
              { name: 'Resume', href: '#resume' },
              { name: 'Contact', href: '#contact' }
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`group relative px-2 lg:px-4 py-2 transition-all duration-300 uppercase tracking-widest text-gray-300 hover:text-white ${link.hidden ? 'hidden lg:inline-block' : ''}`}
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full shadow-[0_0_15px_rgba(34,211,238,0.6)]"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Overlay & Drawer */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-[55] md:hidden">
              {/* Overlay */}
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={() => setIsMenuOpen(false)}
              ></div>
              
              {/* Drawer */}
              <div 
                className={`absolute top-0 right-0 h-screen w-3/4 max-w-sm bg-slate-950/95 border-l border-white/10 p-12 flex flex-col items-center justify-center gap-8 shadow-2xl transition-all duration-500 ease-out transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
              >
                {[
                  { name: 'Profile', href: '#hero' },
                  { name: 'About', href: '#about' },
                  { name: 'What I Do', href: '#what-i-do' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Certificates', href: '#certificates' },
                  { name: 'Resume', href: '#resume' },
                  { name: 'Contact', href: '#contact' }
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold uppercase tracking-widest text-gray-300 hover:text-cyan-400 transition-colors min-h-[44px] flex items-center"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero */}
        <section id="hero" className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto pt-40 pb-16 px-6 md:px-12 min-h-[85vh] md:min-h-[75vh] relative gap-10 md:gap-12">

          {/* Fun Emojis - Hidden on very small screens or adjusted */}
          <div className="absolute top-[10%] left-[5%] text-2xl md:text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🚀</div>
          <div className="absolute top-[80%] right-[10%] text-3xl md:text-5xl animate-pulse" style={{ animationDuration: '2s' }}>✨</div>
          <div className="absolute top-[15%] right-[15%] text-3xl md:text-5xl animate-bounce" style={{ animationDuration: '4s' }}>💡</div>

          {/* Left Text Content */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10 w-full">
            <h1 
              className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 group cursor-default leading-tight animate-fade-in-up opacity-0"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-sm group-hover:from-pink-400 group-hover:to-cyan-400 transition-all duration-700">Anushka</span>
              <span className="inline-block group-hover:animate-spin origin-bottom ml-2">👋</span>
            </h1>

            <h2 
              className="text-4xl sm:text-5xl md:text-[5rem] lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 sm:mb-8 leading-[1.1] md:leading-[1.05] tracking-tight animate-fade-in-up opacity-0"
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
            >
              AI Developer <br className="hidden md:block" /> & Problem Solver
            </h2>

            <div 
              className="inline-block w-full max-w-lg mb-8 sm:mb-10 animate-fade-in-up opacity-0"
              style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
            >
              <p className="text-base sm:text-lg md:text-xl text-white font-mono font-light leading-relaxed px-4 md:px-0">
                {currentText}
                <span className="inline-block w-[3px] h-[1.1em] bg-cyan-400 ml-1 animate-blink align-middle translate-y-[-1px]"></span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-6 animate-fade-in-up opacity-0"
              style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
            >
              <a 
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-bold text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>View Projects</span>
                <span className="group-hover:translate-x-1 transition-transform">🚀</span>
              </a>
              
              <a 
                href="/Resume.pdf"
                download="Anushka_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-lg uppercase tracking-wider transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:border-white/40 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Get Resume</span>
                <span className="group-hover:animate-bounce">📄</span>
              </a>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="flex-1 flex justify-center md:justify-end items-center z-10 w-full mb-10 md:mb-0">
            <div className="transform transition-all duration-700 hover:scale-[1.05] hover:-translate-y-2 relative group w-40 h-40 sm:w-56 sm:h-56 md:w-[26rem] md:h-[26rem] lg:w-[30rem] lg:h-[30rem] cursor-pointer">
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping opacity-20"></div>
              {/* Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000 group-hover:duration-300 animate-pulse"></div>
              <img
                src="/profile.png"
                alt="profile"
                className="relative w-full h-full rounded-full border-4 border-white/30 object-cover shadow-[0_0_40px_rgba(168,85,247,0.4)] bg-slate-800 z-10 hover:border-cyan-400 transition-colors duration-500"
              />
            </div>
          </div>

        </section>

        <Separator />

        {/* About */}
        <ScrollReveal>
          <section id="about" className="px-6 py-12 md:py-24 max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-10 md:mb-16 tracking-wide uppercase">About Me</h2>

            <div className="text-base sm:text-lg md:text-xl text-white leading-relaxed font-light text-justify bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl relative overflow-hidden transform transition-all duration-500 hover:scale-[1.01] hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:border-purple-500/30 hover:bg-white/10 group cursor-default">
              {/* Subtle glow inside the about card */}
              <div className="absolute -top-24 -right-24 w-32 h-32 md:w-48 md:h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-32 h-32 md:w-48 md:h-48 bg-cyan-500/20 rounded-full blur-3xl"></div>

              <p className="mb-6 relative z-10">
                AI & Data Science student with hands-on experience in building real-world applications such as an Image Captioning System for visually impaired users, SnapBudget (an OCR-based expense tracker), and SymptoGuard AI, an intelligent healthcare assistant for symptom analysis. I also developed an Android Language Learning App as part of my exploration in mobile development.
              </p>
              <p className="relative z-10">
                Skilled in Python, Machine Learning, and Computer Vision, I enjoy applying AI techniques to create practical solutions and continuously improve through projects and open source contributions.
              </p>
            </div>
          </section>
        </ScrollReveal>
        <Separator />

        {/* What I Do */}
        <ScrollReveal>
          <section id="what-i-do" className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-10 md:mb-16 tracking-wide uppercase">What I Do</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-left">
              {/* Card 1 */}
              <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-7 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:border-cyan-400/40 hover:bg-white/10 group cursor-default">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 flex items-center gap-3">
                  <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform origin-bottom">🧠</span>
                  <span className="group-hover:text-cyan-400 transition-colors">AI & ML Solutions</span>
                </h3>
                <p className="text-gray-300 font-light text-base md:text-xl leading-relaxed">
                  Designing and building AI-powered applications that solve real-world problems using machine learning and computer vision techniques.
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-7 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] hover:border-emerald-400/40 hover:bg-white/10 group cursor-default">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 flex items-center gap-3">
                  <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform origin-bottom">💻</span>
                  <span className="group-hover:text-emerald-400 transition-colors">Full-Stack Development</span>
                </h3>
                <p className="text-gray-300 font-light text-base md:text-xl leading-relaxed">
                  Developing interactive web applications with modern technologies, focusing on performance, usability, and clean user interfaces.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-7 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(250,204,21,0.4)] hover:border-yellow-400/40 hover:bg-white/10 group cursor-default">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 flex items-center gap-3">
                  <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform origin-bottom">📊</span>
                  <span className="group-hover:text-yellow-400 transition-colors">Data & Problem Solving</span>
                </h3>
                <p className="text-gray-300 font-light text-base md:text-xl leading-relaxed">
                  Analyzing data and building logical solutions to improve decision-making and create efficient, scalable systems.
                </p>
              </div>

              {/* Card 4 */}
              <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-7 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:border-pink-400/40 hover:bg-white/10 group cursor-default">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 flex items-center gap-3">
                  <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform origin-bottom">🚀</span>
                  <span className="group-hover:text-pink-400 transition-colors">Open Source & Learning</span>
                </h3>
                <p className="text-gray-300 font-light text-base md:text-xl leading-relaxed">
                  Actively learning, exploring new technologies, and contributing to projects to continuously grow as a developer.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>


        <Separator />

        {/* Skills */}
        <ScrollReveal>
          <section id="skills" className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-12 md:mb-20 tracking-wide uppercase">Skills & Tech Stack</h2>

            <div className="space-y-16">
              {[
                {
                  category: "Programming",
                  skills: [
                    { name: "Python", color: "#3776AB", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                    { name: "JavaScript", color: "#F7DF1E", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
                    { name: "TypeScript", color: "#3178C6", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
                    { name: "C++", color: "#00599C", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" }
                  ]
                },
                {
                  category: "AI & Machine Learning",
                  skills: [
                    { name: "TensorFlow", color: "#FF6F00", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
                    { name: "OpenCV", color: "#5C3EE8", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
                    { name: "Scikit-learn", color: "#F7931E", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" }
                  ]
                },
                {
                  category: "Web & Backend",
                  skills: [
                    { name: "React", color: "#61DAFB", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                    { name: "Tailwind CSS", color: "#06B6D4", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
                    { name: "Node.js", color: "#339933", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" }
                  ]
                },
                {
                  category: "Databases",
                  skills: [
                    { name: "MongoDB", color: "#47A248", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
                    { name: "MySQL", color: "#4479A1", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" }
                  ]
                },
                {
                  category: "Tools & Platforms",
                  skills: [
                    { name: "Git", color: "#F05032", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
                    { name: "Jupyter", color: "#F37626", imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg" },
                    { name: "Power BI", color: "#F2C811", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" }
                  ]
                }
              ].map((cat, idx) => (
                <div key={idx} className="space-y-6 md:space-y-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-400 uppercase tracking-widest pl-2 border-l-4 border-cyan-500/50">{cat.category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `0 0 40px ${skill.color}99`;
                          e.currentTarget.style.borderColor = `${skill.color}88`;
                          e.currentTarget.querySelector('.skill-name').style.color = skill.color;
                          e.currentTarget.style.color = skill.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.querySelector('.skill-name').style.color = '';
                          e.currentTarget.style.color = '';
                        }}
                        className="group flex flex-col items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 hover:scale-105 cursor-default"
                      >
                        <div className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300">
                          <img src={skill.imgUrl} alt={skill.name} className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_currentColor]" />
                        </div>
                        <span className="skill-name text-sm font-bold text-gray-300 transition-colors duration-300 tracking-wide">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <Separator />



        {/* Projects */}
        <ScrollReveal>
          <section id="projects" className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-10 md:mb-16 tracking-wide uppercase">Featured Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 0 */}
              <div className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:border-yellow-500/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-yellow-500/10 rounded-2xl">
                    <span className="text-3xl">✈️</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-bold rounded-full border border-yellow-500/20">C++</span>
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-bold rounded-full border border-yellow-500/20">Python</span>
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-bold rounded-full border border-yellow-500/20">AI</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">AeroSlot Scheduler</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  Advanced airport slot management system featuring a high-performance C++ scheduling engine, Python-based AI modules, and a modern frontend interface.
                </p>
                <div className="flex gap-4 mt-auto">
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-xl cursor-not-allowed group/btn overflow-hidden relative">
                    <span className="relative z-10 transition-colors">Demo Coming Soon</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <a href="https://github.com/anushka326/aeroslot-scheduler" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all active:scale-95">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Project 1 */}
              <div className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:border-cyan-500/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-cyan-500/10 rounded-2xl">
                    <span className="text-3xl">🖼️</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20">AI</span>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20">CV</span>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20">NLP</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Image Captioning System</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  AI-based system generating meaningful descriptions for images to assist visually impaired users. Features audio output and high-accuracy visual recognition.
                </p>
                <div className="flex gap-4 mt-auto">
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-xl cursor-not-allowed group/btn overflow-hidden relative">
                    <span className="relative z-10 transition-colors">Demo Coming Soon</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-xl cursor-not-allowed group/btn overflow-hidden relative">
                    <span className="relative z-10 transition-colors">GitHub Coming Soon</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:border-emerald-500/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl">
                    <span className="text-3xl text-emerald-400">🧾</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">OCR</span>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">React</span>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">ML</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">SnapBudget OCR</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  Optical Character Recognition based expense tracker. Automates receipt data extraction and categorizes finances with high precision.
                </p>
                <div className="flex gap-4 mt-auto">
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-xl cursor-not-allowed group/btn overflow-hidden relative">
                    <span className="relative z-10 transition-colors">Demo Coming Soon</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <a href="https://github.com/PratikshaDharne/hackarena26-CodeCrew" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all active:scale-95">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Project 3 */}
              <div className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:border-rose-500/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-rose-500/10 rounded-2xl">
                    <span className="text-3xl text-rose-400">🩺</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-bold rounded-full border border-rose-500/20">AI</span>
                    <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-bold rounded-full border border-rose-500/20">ML</span>
                    <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-bold rounded-full border border-rose-500/20">Health</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-rose-400 transition-colors">SymptoGuard AI</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  Intelligent healthcare assistant analyzing user-reported symptoms to suggest possible medical conditions with precautionary guidance.
                </p>
                <div className="flex gap-4 mt-auto">
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-xl cursor-not-allowed group/btn overflow-hidden relative">
                    <span className="relative z-10 transition-colors">Demo Coming Soon</span>
                    <div className="absolute inset-0 bg-gradient-to-v from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <a href="https://github.com/Anushka326/Symptoms_guard_agent" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all active:scale-95">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Project 4 */}
              <div className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:border-orange-500/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-orange-500/10 rounded-2xl">
                    <span className="text-3xl text-orange-400">💳</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-bold rounded-full border border-orange-500/20">TS</span>
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-bold rounded-full border border-orange-500/20">React</span>
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-bold rounded-full border border-orange-500/20">Fin</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">NovaExpense</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  Modern expense management app focusing on performance and clean UI. Features structured tracking and analytics for personal finances.
                </p>
                <div className="flex gap-4 mt-auto">
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-xl cursor-not-allowed group/btn overflow-hidden relative">
                    <span className="relative z-10 transition-colors">Demo Coming Soon</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <a href="https://github.com/Anushka326/NovaExpense" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all active:scale-95">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>


        <Separator />

        {/* Certificates */}
        <ScrollReveal>
          <section id="certificates" className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-10 md:mb-16 tracking-wide uppercase">Certifications</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Certificate 1 */}
              <div className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:border-yellow-500/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-yellow-500/10 rounded-2xl">
                    <span className="text-3xl">🏆</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-bold rounded-full border border-yellow-500/20">2025</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">ProgressionSchool Certified Agentic AI Workshop</h3>
                <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4">ProgressionSchool</p>
                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  Workshop on Agentic AI, building intelligent solutions and leveraging modern AI workflows.
                </p>
                <div className="mt-auto">
                  <a href="https://www.progressionschool.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-bold tracking-wide transition-colors group/link">
                    <span>View Credential</span>
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              </div>

              {/* Certificate 2 */}
              <div className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:border-sky-500/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-sky-500/10 rounded-2xl">
                    <span className="text-3xl">🎖️</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-sky-500/10 text-sky-400 text-xs font-bold rounded-full border border-sky-500/20">2025</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">Data Analytics Job Simulation</h3>
                <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4">Deloitte Australia / Forage</p>
                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  Completed practical task modules in data analytics, improving data quality, data visualization, and identifying business insights.
                </p>
                <div className="mt-auto">
                  <a href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_68b02ad9670d86f84c863690_1757013799155_completion_certificate.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-bold tracking-wide transition-colors group/link">
                    <span>View Credential</span>
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              </div>

              {/* Certificate 3 */}
              <div className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:border-rose-500/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-rose-500/10 rounded-2xl">
                    <span className="text-3xl">🎓</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-bold rounded-full border border-rose-500/20">2026</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">Learn Azure DevOps CI/CD Pipelines</h3>
                <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4">Udemy</p>
                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  Comprehensive course on building Continuous Integration and Continuous Deployment workflows using Azure DevOps.
                </p>
                <div className="mt-auto">
                  <a href="https://www.udemy.com/certificate/UC-c1a3ae3e-a4df-4429-bbe9-93adaa497b27/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-bold tracking-wide transition-colors group/link">
                    <span>View Credential</span>
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <Separator />

        {/* Resume Section */}
        <ScrollReveal>
          <section id="resume" className="px-6 py-12 md:py-20 max-w-5xl mx-auto flex justify-center items-center relative z-10">
            <a
              href="/Resume.pdf"
              download="Anushka_Resume.pdf"
              className="mt-6 md:mt-10 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black py-4 px-10 md:py-6 md:px-16 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 flex items-center justify-center gap-4 md:gap-5 group text-lg md:text-2xl uppercase tracking-widest min-h-[50px]"
            >
              <span>Download Resume</span>
              <span className="group-hover:animate-bounce text-2xl md:text-3xl">📄</span>
            </a>
          </section>
        </ScrollReveal>

        <Separator />

        {/* Contact */}
        <ScrollReveal>
          <section id="contact" className="text-center py-12 md:py-24 mb-10 w-full max-w-5xl mx-auto px-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>

              {/* Decorative Floating Symbols - hidden/reduced on mobile */}
              <div className="absolute top-10 right-10 text-5xl animate-bounce opacity-20 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block">📬</div>
              <div className="absolute bottom-10 left-10 text-5xl animate-bounce opacity-20 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block" style={{ animationDelay: "0.5s" }}>💌</div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-8 md:mb-12 uppercase tracking-widest leading-normal pb-2">Let's Connect</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 flex-wrap">
                  <a href="mailto:anushkanpise@gmail.com" className="bg-white/10 px-6 py-3 md:px-8 md:py-4 rounded-xl border border-white/20 hover:border-pink-400 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 font-semibold tracking-wide hover:-translate-y-1 group/btn shadow-[0_0_15px_rgba(236,72,153,0)] hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] min-h-[44px]">
                    <span className="group-hover/btn:animate-pulse text-xl">📧</span>
                    <span className="text-sm md:text-base">Email: anushkanpise@gmail.com</span>
                  </a>
                  <a href="https://github.com/Anushka326" target="_blank" rel="noopener noreferrer" className="bg-white/10 px-6 py-3 md:px-8 md:py-4 rounded-xl border border-white/20 hover:border-cyan-400 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 font-semibold tracking-wide hover:-translate-y-1 group/btn shadow-[0_0_15px_rgba(6,182,212,0)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] min-h-[44px]">
                    <span className="group-hover/btn:animate-bounce text-xl">💻</span>
                    <span className="text-sm md:text-base">GitHub: Anushka326</span>
                  </a>
                  <a href="https://www.linkedin.com/in/anushka-p-978a8b327/" target="_blank" rel="noopener noreferrer" className="bg-white/10 px-6 py-3 md:px-8 md:py-4 rounded-xl border border-white/20 hover:border-purple-400 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 font-semibold tracking-wide hover:-translate-y-1 group/btn shadow-[0_0_15px_rgba(168,85,247,0)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] min-h-[44px]">
                    <span className="group-hover/btn:animate-ping text-xl">🤝</span>
                    <span className="text-sm md:text-base">LinkedIn: Anushka Pise</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <footer className="py-12 px-6 border-t border-cyan-500/10 bg-[#1B3C53]/30 backdrop-blur-md">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Anushka Pise</h2>
              <p className="text-gray-400 font-light text-sm tracking-wide uppercase">AI & ML Enthusiast</p>
            </div>

            <div className="flex gap-6">
              <a 
                href="https://github.com/Anushka326" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/anushka-p-978a8b327/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
            </div>

            <div className="text-gray-500 text-xs font-light tracking-widest flex flex-col items-center gap-1">
              <p>&copy; {new Date().getFullYear()} Anushka Pise. All rights reserved.</p>
              <p>Built with <span className="text-cyan-400/60 font-medium">React</span> & <span className="text-purple-400/60 font-medium">Tailwind</span> + Deployed on <span className="text-white/60 font-medium tracking-normal">Vercel</span></p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}