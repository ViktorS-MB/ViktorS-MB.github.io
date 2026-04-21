import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  ChevronRight, 
  ChevronDown, 
  BarChart3, 
  ScanSearch, 
  Cpu, 
  Users, 
  Box, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Globe, 
  ArrowRight,
  Database,
  Layers,
  Activity,
  History,
  Car
} from 'lucide-react';

// --- Types ---
interface Chapter {
  id: string;
  title: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'hero', title: 'Start' },
  { id: 'problem', title: 'Problem' },
  { id: 'foundation', title: 'Fundament' },
  { id: 'limit', title: 'Grenze' },
  { id: 'vision', title: 'Vision' },
  { id: 'demo', title: 'Demo' },
  { id: 'business-value', title: 'Wert' },
  { id: 'next-steps', title: 'Ausblick' },
];

// --- Components ---

// Navigation Bar with Live Agenda
const Navbar = ({ scrollTo, activeId }: { scrollTo: (id: string) => void, activeId: string }) => {
  const chapters = CHAPTERS;
  const activeIndex = chapters.findIndex(c => c.id === activeId);
  const progress = activeIndex >= 0 ? ((activeIndex + 1) / chapters.length) * 100 : 0;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-12 h-20 flex items-center backdrop-blur-xl bg-black/80 border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => scrollTo('hero')}>
          <div className="w-6 h-6 rounded-full border-2 border-brand-accent flex items-center justify-center">
            <div className="w-3 h-3 bg-brand-accent rounded-full"></div>
          </div>
          <span className="font-corporate font-light tracking-wider text-sm">MO360</span>
          <span className="text-xs font-medium text-brand-accent tracking-widest">CRAFT</span>
        </div>
        
        {/* Center Agenda Tracker */}
        <div className="ml-auto mr-auto hidden lg:flex items-center gap-2">
          {chapters.map((chapter, idx) => {
            const isActive = activeId === chapter.id;
            return (
              <motion.button
                key={chapter.id}
                onClick={() => scrollTo(chapter.id)}
                className={`px-4 py-2 rounded-md text-xs font-corporate font-medium tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-accent/25 text-brand-accent border border-brand-accent/50'
                    : 'text-brand-dim hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {chapter.title}
              </motion.button>
            );
          })}
        </div>
      
      </nav>

      {/* Minimal Progress Bar */}
      <motion.div
        className="fixed top-20 left-0 h-px bg-linear-to-r from-brand-accent via-brand-accent/40 to-transparent z-50 origin-left"
        style={{ scaleX: progress / 100, width: '100%' }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      />
    </>
  );
};

const Sidebar = ({ activeId, scrollTo }: { activeId: string, scrollTo: (id: string) => void }) => {
  const chapters = CHAPTERS;
  const activeIndex = chapters.findIndex(c => c.id === activeId);
  const progress = activeIndex >= 0 ? ((activeIndex + 1) / chapters.length) * 100 : 0;

  return (
    <nav className="fixed left-0 top-0 h-screen w-72 bg-brand-black border-r border-white/10 z-40 hidden lg:flex flex-col py-6">
      {/* Header */}
      <div className="px-8 pb-8 border-b border-white/10">
        <div className="font-corporate font-light tracking-wider text-sm mb-1">
          MO360 <span className="text-brand-accent font-medium">CRAFT</span>
        </div>
        <div className="text-[10px] text-brand-dim uppercase tracking-widest">Live Agenda</div>
      </div>
      
      {/* Progress Bar */}
      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest text-brand-dim">Fortschritt</span>
          <span className="text-xs font-medium text-brand-accent">{Math.round(progress)}%</span>
        </div>
        <div className="h-px bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-brand-accent to-brand-accent/60"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      {/* Chapter List */}
      <div className="flex-1 flex flex-col gap-1 px-4 overflow-y-auto">
        {chapters.map((chapter, idx) => (
          <motion.button
            key={chapter.id}
            onClick={() => scrollTo(chapter.id)}
            className={`relative px-6 py-4 text-left transition-all group text-sm font-corporate font-light tracking-wide rounded-lg ${
              activeId === chapter.id 
                ? 'bg-brand-accent/10 text-white' 
                : 'text-brand-dim hover:text-white hover:bg-white/5'
            }`}
            whileHover={{ x: 2 }}
          >
            {/* Active Indicator */}
            {activeId === chapter.id && (
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-accent rounded-r-full"
                layoutId="activeIndicator"
                transition={{ duration: 0.3 }}
              />
            )}

            <div className="flex items-start gap-4 ml-2">
              {/* Number */}
              <span className="text-[9px] font-medium text-brand-accent/60 group-hover:text-brand-accent min-w-fit mt-0.5">
                {String(idx + 1).padStart(2, '0')}
              </span>
              
              {/* Title with Progress Indicator */}
              <div className="flex-1">
                <div className="font-medium">{chapter.title}</div>
                {activeId === chapter.id && (
                  <motion.div
                    className="text-[8px] text-brand-accent/70 mt-1 uppercase tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ▸ Aktiv
                  </motion.div>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer Info */}
      <div className="px-8 py-6 border-t border-white/10 text-[9px] text-brand-dim/60 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-brand-accent animate-pulse" />
          Abschnitt {Math.min(activeIndex + 1, chapters.length)} von {chapters.length}
        </div>
      </div>
    </nav>
  );
};

const Section = ({ id, children, className = "", bgImage = false }: { id: string, children: ReactNode, className?: string, bgImage?: boolean }) => {
  return (
    <section id={id} className={`min-h-screen py-24 px-8 flex flex-col justify-center relative overflow-hidden ${className} ${bgImage ? 'before:absolute before:inset-0 before:grid-bg before:-z-10' : ''}`}>
      {children}
    </section>
  );
};

const Capsule = ({ text, color = "accent" }: { text: string, color?: string }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold mb-6 border ${
    color === "accent" ? "border-brand-accent/50 text-brand-accent bg-brand-accent/5" : "border-brand-silver/50 text-brand-silver bg-brand-silver/5"
  }`}>
    <div className={`w-1 h-1 rounded-full ${color === "accent" ? "bg-brand-accent" : "bg-brand-silver"}`}></div>
    {text}
  </div>
);

// --- HERO SECTION ---
const HeroSection = ({ scrollTo }: { scrollTo: (id: string) => void }) => (
  <section id="hero" className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden pt-28">
    <div className="absolute inset-0 bg-radial-gradient from-brand-accent/3 to-transparent"></div>
    <div className="hero-grid absolute inset-0"></div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-10"
    > 
      <h1 className="text-6xl lg:text-8xl font-light mb-6 leading-tight tracking-tighter">
        Von der Anomalie<br/>zur <em className="text-brand-accent font-normal">Entscheidung.</em>
      </h1>
      
      <p className="text-lg text-brand-dim max-w-2xl mx-auto mb-12 leading-relaxed font-light">
        MO360 CRAFT ist die nächste Stufe unserer Digitalstrategie — eine KI-gestützte Plattform die jedem Bereich seine individuelle Wahrheit zeigt, auf Basis einer einzigen verifizierten Datenquelle.
      </p>
      
      <div className="flex gap-4 justify-center mb-20">
        <button 
          onClick={() => scrollTo('problem')}
          className="btn-primary"
        >
          Die Reise beginnen
        </button>
        <button 
          onClick={() => scrollTo('demo')}
          className="btn-ghost"
        >
          Live Demo sehen
        </button>
      </div>
    </motion.div>
    
    <motion.div
      className="absolute bottom-10 flex flex-col items-center gap-3"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="w-px h-8 bg-linear-to-b from-transparent to-brand-accent scroll-line"></div>
      <span className="text-xs text-gray-500 tracking-widest uppercase">Scrollen</span>
    </motion.div>
  </section>
);

// --- PROBLEM SECTION ---
const ProblemSection = () => (
  <Section id="problem" className="bg-brand-black/50">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="section-label">Akt I — Die Realität heute</div>
        <h2 className="section-h2">Unser <em>Painpoint</em> </h2>
        <p className="section-p">PowerBI hat seine Grenze erreicht. Das System wächst schneller als das Tool.</p>
      </motion.div>
      
      <div className="chaos-cards">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="cc bad"
        >
          <div className="cc-label">Ladezeit</div>
          <div className="cc-val red">47s</div>
          <div className="cc-note red">Hoch</div>
        </motion.div>
    
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="cc bad"
        >
          <div className="cc-label">Skalierung</div>
          <div className="cc-val red">Limit</div>
          <div className="cc-note red">PowerBI erreicht</div>
        </motion.div>
      </div>
    </div>
  </Section>
);

// --- FOUNDATION SECTION ---
const FoundationSection = () => (
  <Section id="foundation" className="bg-brand-black">
    <div className="max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <div className="section-label">Akt II — Was wir bereits haben</div>
        <h2 className="section-h2">Der Beweis <span>existiert bereits.</span></h2>
        <p className="section-p">Wir haben nicht bei null angefangen. Wir haben gebaut, bewiesen, geliefert. Das Fundament ist stärker als gedacht.</p>
      </motion.div>
      
      <div className="stat-row">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="stat-box"
        >
          <div className="stat-num">11+</div>
          <div className="stat-lbl">Aktive Sensoren</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="stat-box"
        >
          <div className="stat-num">täglich</div>
          <div className="stat-lbl">Datenaktualisierung</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="stat-box"
        >
          <div className="stat-num">1000+</div>
          <div className="stat-lbl">Aktive Nutzer</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="stat-box"
        >
          <div className="stat-num">19</div>
          <div className="stat-lbl">Werke integriert</div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="pipeline"
      >
      </motion.div>
    </div>
  </Section>
);

// --- LIMIT SECTION ---
const LimitSection = () => (
  <Section id="limit" className="bg-brand-black/50">
    <div className="max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12"
      >
        <div className="section-label">Akt III — Die Grenze</div>
        <h2 className="section-h2">PowerBI war der Anfang.<br/><span>Nicht das Ziel.</span></h2>
      </motion.div>
      
      <div className="bar-list">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="bar-item"
        >
          <div className="bar-label">Datenkomplexität</div>
          <div className="bar-track"><div className="bar-fill" style={{ width: '80%', background: 'var(--color-brand-accent)' }}></div></div>
          <div className="text-xs text-brand-accent">80%</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="bar-item"
        >
          <div className="bar-label">PowerBI Kapazität</div>
          <div className="bar-track"><div className="bar-fill red" style={{ width: '100%' }}></div></div>
          <div className="text-xs text-red-400">100%</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="bar-item"
        >
          <div className="bar-label">Nutzerfreundlichkeit</div>
          <div className="bar-track"><div className="bar-fill" style={{ width: '42%', background: 'var(--color-brand-accent)' }}></div></div>
          <div className="text-xs text-brand-accent">42%</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="bar-item"
        >
          <div className="bar-label">KI-Fähigkeit heute</div>
          <div className="bar-track"><div className="bar-fill" style={{ width: '2%', background: 'var(--color-brand-accent)' }}></div></div>
          <div className="text-xs text-brand-accent">2%</div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-12 p-8 border border-brand-accent/30 bg-brand-accent/5 rounded-xl"
      >
        <div className="text-sm font-bold text-brand-accent mb-4">Die Konsequenz</div>
        <div className="text-brand-dim leading-relaxed font-light">
          PowerBI ist ein Reporting-Tool. Was wir brauchen ist ein intelligentes Steuerungssystem — das Anomalien erkennt bevor sie Schäden verursachen, und das jede Führungskraft individuell und in Echtzeit informiert.
        </div>
      </motion.div>
    </div>
  </Section>
);

// --- VISION SECTION ---
const VisionSection = () => (
  <Section id="vision" className="bg-brand-black">
    <div className="max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <div className="section-label">Akt IV — Die Vision</div>
        <h2 className="section-h2">Eine Plattform.<br/><span>Eine Wahrheit.</span> Jede Perspektive.</h2>
        <p className="section-p">Webbasiert, KI-gestützt, skalierbar — auf Basis der Infrastruktur die wir bereits besitzen.</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-0 max-w-2xl"
      >
        <div className="border border-white/20 bg-brand-accent/8 rounded-t-lg p-8">
          <div className="text-sm font-bold text-brand-accent mb-3">KI-Schicht · CRAFT Intelligence</div>
          <div className="text-xs text-brand-dim/80">Anomalieerkennung · Natürliche Sprache · Dynamische Dashboards · Management Briefing</div>
        </div>
        
        <div className="flex items-center justify-center py-4">
          <div className="text-2xl text-gray-600">↓</div>
        </div>
        
        <div className="border border-white/10 bg-white/5 p-8">
          <div className="text-sm font-bold text-gray-300 mb-3">Single Point of Truth</div>
          <div className="text-xs text-brand-dim">Azure Cloud · SAP HANA · 11+ Sensoren · Echtzeit-Synchronisation</div>
        </div>
        
        <div className="flex items-center justify-center py-4">
          <div className="text-2xl text-gray-600">↓</div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {['Qualität', 'Produktion', 'Logistik', 'Vorstand'].map((dept, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="border border-white/10 bg-white/3 p-4 rounded-lg text-center"
            >
              <div className="text-xs font-bold mb-2">{dept}</div>
              <div className="text-[10px] text-brand-dim/60">Individuelle KPIs</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </Section>
);

// --- DEMO SECTION ---
const DemoSection = () => (
  <Section id="demo" className="bg-brand-black/50">
    <div className="max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12"
      >
        <div className="section-label">Akt V — Das Produkt</div>
        <h2 className="section-h2">MO360 CRAFT — <span>live.</span></h2>
        <p className="section-p">Dies ist kein Konzept. Das ist die funktionierende Vision — gebaut auf Basis unserer eigenen Datenstruktur und KI-Infrastruktur.</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="glass-panel rounded-xl overflow-hidden border-white/10"
      >
        <div className="bg-black/40 px-6 py-4 border-b border-white/5 flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="flex-1 ml-4 bg-black/50 rounded-full px-4 py-1 text-[10px] text-gray-600 font-mono">
            CRAFT.mercedes-benz.internal / dashboard
          </div>
        </div>
        
        <div className="p-8 bg-linear-to-b from-white/3 to-white/1">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Aktive Nutzer', value: '1000+' },
              { label: 'Fehlerrate', value: '3.7 ppm', highlight: true },
              { label: 'Liefertreue', value: '94.2%' },
              { label: 'Sensoren aktiv', value: '11' }
            ].map((kpi, i) => (
              <div key={i} className={`${kpi.highlight ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'} border rounded-lg p-4`}>
                <div className="text-[9px] uppercase text-brand-dim/60 mb-2">{kpi.label}</div>
                <div className={`text-2xl font-bold ${kpi.highlight ? 'text-red-400' : 'text-white'}`}>{kpi.value}</div>
              </div>
            ))}
          </div>
          
          <div className="bg-black/40 border border-white/10 rounded-lg p-6">
            <div className="flex gap-3 mb-4">
              <input 
                type="text" 
                placeholder="Was sind die kritischsten Anomalien heute?"
                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white placeholder-gray-600 outline-none focus:border-brand-accent/50"
              />
              <button className="bg-brand-accent text-black px-6 py-2 rounded-lg text-xs font-bold hover:brightness-110 transition-all">
                →
              </button>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-xs text-gray-400 leading-relaxed border-l-2 border-brand-accent bg-brand-accent/5 p-4 rounded-r-lg"
            >
              <strong className="text-white">Durchfluss-Sensor kritisch:</strong> 18.3 L/min — 17% unter Sollwert. Direkte Korrelation mit erhöhter Fehlerrate auf Linie 7.<br/><br/>
              <strong className="text-white">Rastatt:</strong> Liefertreue 61% — statistisch signifikante Abweichung. Eskalation an Logistikleitung empfohlen.<br/><br/>
              <strong className="text-white">Temperatur Gruppe C4:</strong> 92.4°C — Warnschwelle überschritten. Automatische Beobachtung aktiv.
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </Section>
);

// --- BUSINESS VALUE SECTION ---
const BusinessValueSection = () => (
  <Section id="business-value" className="bg-brand-black">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="section-label">Strategischer Einfluss</div>
        <h2 className="text-6xl font-light mb-12 italic">Die Qualitäts-<br/>dividende.</h2>
        
        <div className="space-y-12">
          <div>
            <div className="text-6xl font-bold text-brand-accent mb-2">60%</div>
            <div className="text-xs uppercase tracking-widest font-bold mb-4 text-brand-dim">Schnellere Ursachenanalyse (RCA)</div>
            <p className="text-brand-dim/80 text-sm font-light">Von Wochen auf Stunden durch automatisierte Mustererkennung über globale Silos hinweg.</p>
          </div>
          
          <div>
            <div className="text-6xl font-bold text-white mb-2">1.240</div>
            <div className="text-xs uppercase tracking-widest font-bold mb-4 text-brand-dim">Handlungsrelevante Erkenntnisse / Monat</div>
            <p className="text-brand-dim/80 text-sm font-light">Globale Reichweite mit automatisch bereitgestelltem technischem Deep-Dive-Kontext.</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="glass-panel rounded-2xl p-8 border-white/10"
      >
        <h3 className="text-2xl font-light mb-8">Kern-Nutzenversprechen</h3>
        <ul className="space-y-6">
          {[
            "Konsens über eine 'einheitliche Wahrheit' über E2E-Domänen hinweg.",
            "Reduzierung der Abhängigkeit von Qualitätsexperten.",
            "Skalierbare Intelligenz ohne Personalaufbau.",
            "Wettbewerbsvorteil durch digitale Führung."
          ].map((v, i) => (
            <li key={i} className="flex gap-4 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1 shrink-0"></div>
              <span className="text-brand-dim font-light">{v}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </Section>
);

// --- NEXT STEPS / CTA SECTION ---
const NextStepsSection = () => (
  <Section id="next-steps" className="bg-brand-black text-center">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <h2 className="text-6xl font-light mb-6 italic">Das Fundament steht.</h2>
        <p className="text-brand-dim max-w-2xl mx-auto text-lg font-light">Das Know-how ist intern. Die Technologie ist verfügbar. Was fehlt ist das Vorstandsmandat zur Skalierung — und die Entscheidung, es jetzt zu tun.</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { num: '01', title: 'Sponsor', desc: 'Vorstandsmandat zur Weiterentwicklung auf Plattformebene — intern, kontrolliert, skalierbar ohne externe Abhängigkeit.' },
          { num: '02', title: 'Budget', desc: 'Infrastruktur, Entwicklung, KI-Integration — aufbauend auf bestehender Azure- und SAP-Basis. Kein Greenfield.' },
          { num: '03', title: 'Pilot', desc: 'Ein Bereich. Drei Monate. Messbarer Proof of Value mit definierten KPIs und klarer Reportingstruktur.' }
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-panel rounded-lg p-8 border-white/10"
          >
            <div className="text-4xl font-bold text-brand-accent mb-4">{card.num}</div>
            <h3 className="text-lg font-bold mb-3">{card.title}</h3>
            <p className="text-sm text-brand-dim/80 font-light leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-xs uppercase tracking-[0.3em] text-gray-600"
      >
        MO360 · CRAFT — Von Stuttgart in die Welt.
      </motion.div>
    </div>
  </Section>
);

// --- Main App ---
export default function App() {
  const [activeId, setActiveId] = useState('hero');
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    CHAPTERS.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="font-sans text-white selection:bg-brand-accent selection:text-white">
      {/* Navigation */}
      <Navbar scrollTo={scrollTo} activeId={activeId} />
      
      {/* Sections */}
      <HeroSection scrollTo={scrollTo} />
      <ProblemSection />
      <FoundationSection />
      <LimitSection />
      <VisionSection />
      <DemoSection />
      <BusinessValueSection />
      <NextStepsSection />
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center bg-brand-black">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-5 h-5 rounded-full border-2 border-brand-accent flex items-center justify-center">
            <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
          </div>
          <span className="text-xs font-bold font-corporate">MO360 · CRAFT</span>
        </div>
        <div className="text-xs text-gray-600 tracking-widest">Vertraulich · Interne Verwendung · 2026</div>
      </footer>
    </main>
  );
}
