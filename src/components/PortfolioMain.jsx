import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import experiences from "../data/experiences";
import educationItems from "../data/education";
import projects from "../data/projects";
import lessons from "../data/lessons";


// Barre de navigation responsive avec menu burger
function HeaderBar() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/75 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <nav className="max-w-3xl mx-auto flex items-center justify-between px-4 py-2 md:py-3">
        <span className="font-bold text-lg md:text-xl tracking-tight">Mohamed Diop</span>
        {/* Desktop nav */}
        <div className="hidden sm:flex gap-4 text-sm md:text-base">
          <a href="#hero" className="hover:underline hover:text-black/90">Accueil</a>
          <a href="#experience" className="hover:underline hover:text-black/90">Expérience</a>
          <a href="#education" className="hover:underline hover:text-black/90">Éducation</a>
          <a href="#projects" className="hover:underline hover:text-black/90">Projets</a>
          <a href="#lessons" className="hover:underline hover:text-black/90">Leçons</a>
          <a href="#contact" className="hover:underline hover:text-black/90">Contact</a>
        </div>
        {/* Burger menu for mobile */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-0.5 w-6 bg-gray-900 mb-1 transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-gray-900 mb-1 transition-all ${open ? "opacity-0" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-gray-900 transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
        </button>
        {/* Mobile nav */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm flex flex-col items-center py-2 sm:hidden animate-fade-in z-50">
            <a href="#hero" className="py-2 w-full text-center hover:bg-gray-50" onClick={() => setOpen(false)}>Accueil</a>
            <a href="#experience" className="py-2 w-full text-center hover:bg-gray-50" onClick={() => setOpen(false)}>Expérience</a>
            <a href="#education" className="py-2 w-full text-center hover:bg-gray-50" onClick={() => setOpen(false)}>Éducation</a>
            <a href="#projects" className="py-2 w-full text-center hover:bg-gray-50" onClick={() => setOpen(false)}>Projets</a>
            <a href="#lessons" className="py-2 w-full text-center hover:bg-gray-50" onClick={() => setOpen(false)}>Leçons</a>
            <a href="#contact" className="py-2 w-full text-center hover:bg-gray-50" onClick={() => setOpen(false)}>Contact</a>
          </div>
        )}
      </nav>
    </header>
  );
}

// Section sticky responsive
function StickySection({ children, id = "", img, minHeight = "min-h-[300vh]" }) { // Augmenté de 200vh à 300vh
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end start"], // Modifié pour une plus longue durée sticky
  });
  
  // Points de transition plus espacés
  const scale = useTransform(scrollYProgress, 
    [0, 0.1, 0.4, 0.9, 1], 
    [0.8, 1, 1, 1, 0.8]
  );
  const opacity = useTransform(scrollYProgress, 
    [0, 0.1, 0.4, 0.9, 1], 
    [0.3, 1, 1, 1, 0.3]
  );
  const y = useTransform(scrollYProgress, 
    [0, 0.1, 0.4, 0.9, 1], 
    [100, 0, 0, 0, -100]
  );
  const bgOpacity = useTransform(scrollYProgress, 
    [0, 0.1, 0.4, 0.9, 1], 
    [0, 1, 1, 1, 0]
  );

  return (
    <section
      ref={ref}
      id={id}
      className={`relative ${minHeight} flex items-start justify-center py-[20vh]`}
      style={{ zIndex: 1 }}
    >
      <motion.div
        style={{
          opacity: bgOpacity,
          pointerEvents: "none",
          position: "fixed",
          inset: 0,
          background: "white",
          zIndex: 5,
        }}
        aria-hidden="true"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          scale,
          opacity,
          y,
          willChange: "transform, opacity",
          position: "sticky",
          top: "15vh", // Ajusté pour un meilleur positionnement initial
          zIndex: 10,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10)",
          transition: "box-shadow 0.3s cubic-bezier(.4,0,.2,1)",
        }}
        className="w-[94vw] sm:w-[90vw] md:w-[85vw] max-w-3xl mx-auto flex flex-col 
          rounded-2xl bg-white border-gray-200 shadow-lg"
      >
        <div className="px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 w-full">
          {img && (
            <img
              src={img}
              alt=""
              className="w-16 h-16 xs:w-20 xs:h-20 md:w-24 md:h-24 mb-3 md:mb-6 rounded-xl shadow-md mx-auto"
            />
          )}
          {children}
        </div>
      </motion.div>
    </section>
  );
}

export default function PortfolioStickyAppleStyle() {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      <HeaderBar />
      <div className="pt-16 md:pt-20">
        {/* HERO */}
        <StickySection id="hero" minHeight="min-h-[120vh]">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-extrabold mb-2 xs:mb-3 md:mb-6 text-center">Mohamed Diop</h1>
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-center">Software Engineer. Rooted in vision.</h2>
          <p className="opacity-80 text-base xs:text-lg md:text-xl max-w-2xl text-center mb-2">
            Driven by purpose, depth, and clarity. I build clean systems, design thoughtful products, and believe in quiet strength. 🌱
          </p>
        </StickySection>
        {/* EXPERIENCE */}
        <StickySection id="experience" minHeight="min-h-[200vh]">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-4">Experience</h2>
          <div className="flex flex-col gap-5 w-full">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 sm:px-6 py-4 sm:py-5 transition-all mx-auto w-full"
                style={{
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                  maxWidth: "600px",
                }}
              >
                <div className="font-bold text-sm sm:text-lg md:text-xl mb-1 text-left">
                  {exp.role} <span className="font-normal">@ {exp.company}</span>
                </div>
                <div className="text-xs sm:text-sm opacity-60 mb-2 text-left">
                  {exp.period} · {exp.location}
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm md:text-base opacity-85 text-left overflow-x-auto">
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </StickySection>
        {/* EDUCATION */}
        <StickySection id="education" minHeight="min-h-[200vh]">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-4">Education</h2>
          <div className="flex flex-col gap-5 w-full">
            {educationItems.map((edu, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 sm:px-6 py-4 sm:py-5 transition-all mx-auto w-full"
                style={{
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                  maxWidth: "600px",
                }}
              >
                <div className="font-bold text-sm sm:text-lg md:text-xl mb-1 text-left">
                  {edu.degree} <span className="font-normal">@ {edu.institution}</span>
                </div>
                <div className="text-xs sm:text-sm opacity-60 mb-2 text-left">
                  {edu.period} · {edu.location}
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm md:text-base opacity-85 text-left overflow-x-auto">
                  {edu.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </StickySection>
        {/* PROJECTS */}
        <StickySection id="projects" minHeight="min-h-[200vh]">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            {projects.map((proj, i) => (
              <a key={i} href={proj.url} target="_blank" rel="noopener noreferrer"
                className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 sm:px-6 py-4 sm:py-5 
                  transition-all hover:bg-gray-50 block text-left"
                style={{
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                }}
              >
                <div className="font-bold text-sm sm:text-lg md:text-xl mb-1">{proj.name}</div>
                <div className="text-xs sm:text-sm md:text-base opacity-80">{proj.description}</div>
              </a>
            ))}
          </div>
        </StickySection>
        {/* LESSONS */}
        <StickySection id="lessons" minHeight="min-h-[200vh]">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-4">Naval Lessons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            {lessons.map((l, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 sm:px-6 py-4 sm:py-5 transition-all"
                style={{
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                }}
              >
                <div className="font-bold text-sm sm:text-lg md:text-xl mb-1">{l.title}</div>
                <blockquote className="text-xs sm:text-sm md:text-base italic opacity-70 mb-2">"{l.quote}"</blockquote>
                <div className="text-xs sm:text-sm md:text-base opacity-85">{l.note}</div>
              </div>
            ))}
          </div>
        </StickySection>
        {/* CONTACT */}
        <StickySection id="contact" minHeight="min-h-[120vh]">
          <h2 className="text-lg xs:text-xl md:text-3xl font-bold mb-4">Let's Connect</h2>
          <p className="mb-4 opacity-75 max-w-md text-center text-sm xs:text-base md:text-lg">
            Whether you have a question, a challenge, or a shared vision—I'm here.
          </p>
          <a href="mailto:mohamed@example.com"
            className="inline-block bg-black text-white px-4 xs:px-6 md:px-8 py-2 md:py-3 rounded-full font-bold shadow-lg hover:bg-gray-900 transition">
            Say Hi
          </a>
        </StickySection>
        <footer className="text-center py-8 text-xs opacity-60 text-gray-500">
          © {new Date().getFullYear()} Mohamed Diop
        </footer>
      </div>
    </div>
  );
}
