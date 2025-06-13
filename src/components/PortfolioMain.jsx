import React, { useEffect, useState } from "react";
import { Github, Linkedin, Star, Sun, Moon, Quote, Briefcase, GraduationCap, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import blogPosts from "../data/blogPosts";
import experiences from "../data/experiences";
import educationItems from "../data/education";
import lessons from "../data/lessons";
import exploreIdeasResources from "../data/exploreIdeas";

const GITHUB_USERNAME = "MohamedDiopGit";
const LINKEDIN_URL = "https://www.linkedin.com/in/mohamed-diop-info/";

export default function PortfolioMain() {
  const [theme, setTheme] = useState("light");
  const [tab, setTab] = useState("portfolio");
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className={`sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-gray-900/80 transition-shadow ${scrolled ? "shadow-lg" : "shadow"}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6 px-4 sm:px-6">
          <h1 className="text-2xl font-bold flex items-center gap-2"><BookOpen /> Mohamed Diop 🌱</h1>
          <nav className="flex items-center space-x-4">
            {["portfolio", "blog", "explore"].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setSelected(null); }}
                className={`px-3 py-1 rounded transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                  hover:scale-105 hover:bg-gray-300 dark:hover:bg-gray-600
                  ${tab === t ? "bg-gray-200 dark:bg-gray-700" : ""}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1).replace("portfolio", "Portfolio").replace("blog", "Blog").replace("explore", "Explore ideas")}
              </button>
            ))}
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer"><Github /></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><Linkedin /></a>
            <button onClick={toggleTheme}>{theme === "light" ? <Moon /> : <Sun />}</button>
          </nav>
        </div>
      </header>
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50"
          >
            <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></span>
          </motion.div>
        )}
        {tab === "portfolio" && (
          <motion.main
            key={tab}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="p-6 space-y-24 max-w-7xl mx-auto px-4 sm:px-6"
          >
            {/* Présentation */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center max-w-3xl mx-auto space-y-4 rounded-xl shadow-lg bg-white/80 dark:bg-gray-800/80 p-8"
            >
              <h2 className="text-3xl font-semibold">Software Engineer. Rooted in vision.</h2>
              <p className="opacity-80 text-base md:text-lg">I’m Mohamed — driven by purpose, depth, and clarity. I build clean systems, design thoughtful products, and believe in quiet strength. 🌱</p>
            </motion.section>
            {/* Expérience */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="max-w-4xl mx-auto rounded-xl shadow-lg bg-white/80 dark:bg-gray-800/80 p-8"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">Experience</h3>
              <div className="relative ml-4 border-l-2 border-gray-300 dark:border-gray-600">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
                    className="mb-8 pl-6 relative transition-all duration-300"
                  >
                    <span className="absolute -left-3 mt-1 w-4 h-4 bg-blue-500 rounded-full dark:bg-blue-400"></span>
                    <div className="flex items-center space-x-2 mb-1"><Briefcase /><h4 className="font-bold text-lg">{exp.role} @ {exp.company}</h4></div>
                    <p className="text-sm opacity-70 mb-2">{exp.period} · {exp.location}</p>
                    <ul className="list-disc list-inside space-y-1 text-sm opacity-80">
                      {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.section>
            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="max-w-4xl mx-auto rounded-xl shadow-lg bg-white/80 dark:bg-gray-800/80 p-8"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">Education</h3>
              <div className="relative ml-4 border-l-2 border-gray-300 dark:border-gray-600">
                {educationItems.map((edu, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
                    className="mb-8 pl-6 relative transition-all duration-300"
                  >
                    <span className="absolute -left-3 mt-1 w-4 h-4 bg-green-500 rounded-full dark:bg-green-400"></span>
                    <div className="flex items-center space-x-2 mb-1"><GraduationCap /><h4 className="font-bold text-lg">{edu.degree} @ {edu.institution}</h4></div>
                    <p className="text-sm opacity-70 mb-2">{edu.period} · {edu.location}</p>
                    <ul className="list-disc list-inside space-y-1 text-sm opacity-80">
                      {edu.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.section>
            {/* Naval Lessons */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="max-w-5xl mx-auto rounded-xl shadow-lg bg-white/80 dark:bg-gray-800/80 p-8"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">Naval Lessons</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {lessons.map((l, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
                    className="border rounded-lg p-6 bg-white dark:bg-gray-800 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-2 mb-2"><Quote /><h4 className="font-semibold truncate">{l.title}</h4></div>
                    <blockquote className="italic opacity-70 mb-2">“{l.quote}”</blockquote>
                    <p className="text-sm opacity-80">{l.note}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
            {/* Contact */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              className="max-w-lg mx-auto text-center space-y-4 rounded-xl shadow-lg bg-white/80 dark:bg-gray-800/80 p-8"
            >
              <h3 className="text-2xl font-semibold">Let's build something meaningful</h3>
              <p className="opacity-80">Whether a question, a challenge or a shared vision—I'm here.</p>
              <a href="mailto:mohamed@example.com" className="inline-block bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg hover:scale-105 transition">Say Hi</a>
            </motion.section>
          </motion.main>
        )}
        {/* Blog Tab */}
        {tab === "blog" && (
          <motion.main
            key="blog"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="p-6 max-w-3xl mx-auto px-4 sm:px-6"
          >
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-xl shadow-lg bg-white/80 dark:bg-gray-800/80 p-8"
            >
              {!selected ? (
                <article>
                  <h2 className="text-3xl font-bold mb-8">Blog & Articles</h2>
                  <div className="space-y-8">
                    {blogPosts.map(post => (
                      <motion.div
                        key={post.slug}
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
                        className="border-b pb-4 transition-all duration-300"
                      >
                        <button onClick={() => setSelected(post)} className="text-xl font-semibold text-blue-600 hover:underline">{post.title}</button>
                        <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                        <div className="mt-2 text-gray-700 dark:text-gray-300">
                          <div className="prose dark:prose-invert">
                            <ReactMarkdown>{post.content.slice(0, 200) + '...'}</ReactMarkdown>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </article>
              ) : (
                <article>
                  <button onClick={() => setSelected(null)} className="text-blue-600 hover:underline mb-4">← Back to articles</button>
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{selected.content}</ReactMarkdown>
                  </div>
                </article>
              )}
            </motion.section>
          </motion.main>
        )}
        {/* Explore Ideas Tab */}
        {tab === "explore" && (
          <motion.main
            key="explore"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="p-6 max-w-4xl mx-auto px-4 sm:px-6"
          >
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-xl shadow-lg bg-white/80 dark:bg-gray-800/80 p-8"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Explore Ideas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exploreIdeasResources.map((res, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
                    className="border rounded-lg p-6 bg-white dark:bg-gray-800 flex flex-col justify-between transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {res.type === "github" && <Github className="w-5 h-5" />} 
                        {res.type === "article" && <BookOpen className="w-5 h-5" />} 
                        {res.type === "webpage" && <BookOpen className="w-5 h-5" />} 
                        {res.type === "twitter" && <span className="font-bold text-lg">🐦</span>} 
                        <a href={res.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">{res.name}</a>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{res.author && `by ${res.author}`}</p>
                      <p className="text-sm opacity-80 mb-2">{res.description}</p>
                    </div>
                    {res.stars && (
                      <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                        <Star className="w-3 h-3" /> {res.stars.toLocaleString()} stars
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.main>
        )}
      </AnimatePresence>
      <footer className="text-center py-8 text-xs opacity-60">© {new Date().getFullYear()} Mohamed Diop</footer>
    </div>
  );
}