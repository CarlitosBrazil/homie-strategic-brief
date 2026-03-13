import React, { useState, useMemo, useEffect } from 'react';
import {
  LayoutDashboard,
  Target,
  Users,
  BarChart3,
  ShieldCheck,
  Map,
  Rocket,
  Search,
  Linkedin,
  Instagram,
  ChevronRight,
  ExternalLink,
  Info,
  Check,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Filter,
  Layers,
  Zap,
  MessageSquare,
  FileText,
  X,
  Menu,
  TrendingUp,
  Activity,
  Moon,
  Sun,
  GitBranch,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import companyData from '../data/company.json';
import icpsData from '../data/icps.json';
import competitorsData from '../data/competitors.json';
import paidPlanData from '../data/paidPlan.json';
import measurementData from '../data/measurement.json';
import roadmapData from '../data/roadmap.json';
import experimentsData from '../data/experiments.json';
import modelData from '../data/model.json';
import sourcesData from '../data/sources.json';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Section = 'overview' | 'market' | 'icps' | 'competitors' | 'funnel' | 'paid' | 'measurement' | 'roadmap' | 'experiments';

const Citation = ({ id, onClick }: { id: string; onClick: (id: string) => void }) => (
  <span
    className="inline-flex items-center justify-center w-5 h-5 ml-1 text-[10px] font-black text-blue-500 bg-blue-50 border border-blue-100 rounded-md cursor-pointer hover:bg-blue-100 transition-colors align-middle"
    onClick={(e) => {
      e.stopPropagation();
      onClick(id);
    }}
  >
    {id}
  </span>
);

export default function ResearchDashboard() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [motionType, setMotionType] = useState<'trial' | 'demo'>('trial');
  const [evidenceSource, setEvidenceSource] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const handlePrint = () => {
    window.print();
  };

  const openEvidence = (id: string) => {
    setEvidenceSource(id);
    setIsDrawerOpen(true);
  };

  const navItems = [
    { id: 'overview', label: 'Zusammenfassung', title: 'Executive Summary', icon: LayoutDashboard },
    { id: 'market', label: 'Positionierung', title: 'Marktpositionierung', icon: ShieldCheck },
    { id: 'icps', label: 'ICPs', title: 'Ideale Kundenprofile & Messaging', icon: Users },
    { id: 'competitors', label: 'Wettbewerb', title: 'Wettbewerbslandschaft', icon: Map },
    { id: 'funnel', label: 'GTM Funnel', title: 'Go-to-Market Funnel & Routing', icon: Layers },
    { id: 'paid', label: 'Akquise', title: 'Plan für Akquise', icon: Zap },
    { id: 'measurement', label: 'Messung', title: 'Messung & Attribution', icon: BarChart3 },
    { id: 'experiments', label: 'Experimente', title: 'Experiment-Backlog & Testplan', icon: Zap },
    { id: 'roadmap', label: '90-Tage Plan', title: '90-Tage Implementierungsplan', icon: Rocket },
  ];

  return (
    <div className={cn("flex h-full overflow-hidden bg-slate-50")}>
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-gray-100 flex flex-col z-30 relative"
      >
        <div className="p-6 flex items-center gap-3">
          <svg viewBox="0 0 100 100" className="h-8 w-8 text-[#0F28FF] fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" />
            <path d="M 26 50 Q 50 62 74 50 A 28 28 0 0 1 26 50 Z" fill="white" stroke="white" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          {isSidebarOpen && (
            <div className="text-[22px] font-black tracking-tighter text-[#0F28FF] flex items-center leading-none" style={{ letterSpacing: '-0.05em' }}>
              homie<span className="text-gray-900 ml-1.5 text-[14px] font-bold tracking-tight" style={{ letterSpacing: '-0.01em' }}>Dossier</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                activeSection === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              )}
            >
              <item.icon size={20} className={cn(activeSection === item.id ? "text-blue-600" : "group-hover:text-blue-600")} />
              {isSidebarOpen && <span className="font-bold">{item.label}</span>}
            </button>
          ))}
        </nav>


        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-black shadow-sm z-40"
        >
          {isSidebarOpen ? <ChevronRight size={14} className="rotate-180" /> : <ChevronRight size={14} />}
        </button>
      </motion.aside>

      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-20 px-8 py-4 flex justify-between items-center print:hidden">
          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Research Dossier</h2>
            <h1 className="text-2xl font-bold font-display">
              {navItems.find(n => n.id === activeSection)?.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:text-blue-600 hover:border-blue-600 transition-all"
            >
              <Printer size={14} />
              Exportieren
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === 'overview' && <OverviewView onOpenEvidence={openEvidence} />}
              {activeSection === 'market' && <MarketView onOpenEvidence={openEvidence} />}
              {activeSection === 'icps' && <ICPsView onOpenEvidence={openEvidence} />}
              {activeSection === 'competitors' && <CompetitorsView onOpenEvidence={openEvidence} />}
              {activeSection === 'funnel' && <FunnelView onOpenEvidence={openEvidence} />}
              {activeSection === 'paid' && <PaidView onOpenEvidence={openEvidence} />}
              {activeSection === 'measurement' && <MeasurementView onOpenEvidence={openEvidence} />}
              {activeSection === 'experiments' && <ExperimentsView onOpenEvidence={openEvidence} handlePrint={handlePrint} />}
              {activeSection === 'roadmap' && <RoadmapView onOpenEvidence={openEvidence} handlePrint={handlePrint} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Evidence Drawer */}
      <EvidenceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sourceId={evidenceSource}
      />
    </div>
  );
}

function EvidenceDrawer({ isOpen, onClose, sourceId }: { isOpen: boolean; onClose: () => void; sourceId: string | null }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-white h-full shadow-2xl border-l border-gray-200 flex flex-col"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Evidence & Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <p>Details for source: <strong>{sourceId}</strong></p>
          {/* Add more detailed content based on sourceId here */}
        </div>
      </motion.div>
    </div>
  );
}

// --- VIEW COMPONENTS ---

function OverviewView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
  const [activeMotion, setActiveMotion] = useState<'trial' | 'demo'>('trial');

  const benchmarkKpis = activeMotion === 'trial'
    ? [
      { label: 'Ziel-CAC (Trial)', value: '€80 – €150', badge: '+12% CVR via Retargeting', icon: Zap },
      { label: 'Activation Rate', value: '25% – 40%', badge: 'Setup < 10 Min.', icon: Activity },
      { label: 'Product Impact', value: 'Assisted CVR Lift', badge: 'Signal: Chat → Warenkorb', icon: TrendingUp },
    ]
    : [
      { label: 'Ziel-CPL (Demo)', value: '€200 – €600', badge: 'LinkedIn ABM + High-Intent Search', icon: MessageSquare },
      { label: 'SQL Rate', value: '30% – 50%', badge: 'Offline Conversion Import erforderlich', icon: Target },
      { label: 'Pipeline-Strategie', value: 'Multi-Touch Attribution', badge: 'HubSpot Lifecycle Mapping', icon: BarChart3 },
    ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative p-12 rounded-3xl bg-homie-primary text-white overflow-hidden shadow-xl shadow-homie-primary/20">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-white/80 font-bold mb-4 uppercase tracking-widest text-sm">Management Summary</h2>
          <h1 className="text-5xl font-bold font-display mb-6 leading-tight text-white">
            Growth- &amp; Performance-Engine.<br />Gebaut für Skalierung.
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            High-Intent Demand erfassen. Enterprise-Pipeline skalieren. Paid, CRM und Sales als ein System bauen — nicht als drei separate Funktionen.
            <Citation id="1" onClick={onOpenEvidence} />
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10">
              <CheckCircle2 size={16} className="text-white" />
              <span className="text-sm font-medium">DSGVO-konform</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10">
              <CheckCircle2 size={16} className="text-white" />
              <span className="text-sm font-medium">Omnichannel-ready</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-white/10 to-transparent opacity-50" />
      </div>

      {/* Motion Toggle + Benchmark KPI Card — V1 style */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden premium-shadow">
        {/* Toggle bar */}
        <div className="border-b border-gray-100 bg-gray-50 p-4 flex justify-center gap-2">
          <button
            onClick={() => setActiveMotion('trial')}
            className={cn(
              "px-6 py-2 rounded-full font-bold text-sm transition-all",
              activeMotion === 'trial' ? 'bg-homie-primary text-white shadow-md shadow-homie-primary/30' : 'text-gray-500 hover:bg-gray-200'
            )}
          >
            Trial-Led (PLG)
          </button>
          <button
            onClick={() => setActiveMotion('demo')}
            className={cn(
              "px-6 py-2 rounded-full font-bold text-sm transition-all",
              activeMotion === 'demo' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-gray-500 hover:bg-gray-200'
            )}
          >
            Sales-Led (Enterprise)
          </button>
        </div>

        {/* Benchmark KPIs */}
        <div className="p-6 md:p-8 relative min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMotion}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {benchmarkKpis.map((kpi, i) => (
                <div
                  key={kpi.label}
                  className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-homie-primary/10 rounded-xl text-homie-primary">
                      <kpi.icon size={16} />
                    </div>
                    <p className="text-sm font-bold text-gray-500">{kpi.label}</p>
                  </div>
                  <p className="text-2xl font-black text-gray-900 mb-3 leading-tight">{kpi.value}</p>
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                    {kpi.badge}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Exec Summary + Day 90 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-500" /> TL;DR
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>• Trial- und Demo-Motion parallel betreiben — segmentiert nach Intent, nicht nach Bauchgefühl.<Citation id="3" onClick={onOpenEvidence} /></li>
            <li>• Full-Funnel Tracking aufbauen: Consent Mode v2, LinkedIn Insight Tag, HubSpot — kein Datenloch.<Citation id="4" onClick={onOpenEvidence} /></li>
            <li>• Kanäle in Reihenfolge skalieren: Google Search → LinkedIn ABM → Meta Retargeting.</li>
          </ul>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <Rocket className="w-5 h-5 mr-2 text-homie-primary" /> Ziel: Tag 90
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Stabiles Tracking. Vorhersehbarer SQL-Flow. Erste CAC-zu-ARR Benchmarks. Bereit zum Skalieren.
          </p>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-emerald-400 via-blue-500 to-homie-primary rounded-full" />
          </div>
          <div className="flex justify-between text-[10px] mt-2 text-gray-400 font-bold uppercase tracking-wider">
            <span>Tag 1</span><span>Tag 30</span><span>Tag 60</span><span>Tag 90 ✓</span>
          </div>
        </div>
      </div>

      {/* Warum diese Rolle jetzt zählt */}
      <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
        <h3 className="text-xl font-bold font-display mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2 text-homie-primary" /> Warum diese Rolle jetzt zählt
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          <strong>Nicht mehr Volumen.</strong><br />
          homie braucht keinen weiteren Traffic-Kanal. Es braucht Pipeline-Qualität, der Sales vertrauen kann.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          <strong>5 neue Sales-Rollen.</strong><br />
          Regionale Expansion in DE, PL, UK, NL, Skandinavien. Paid muss diese Kapazität füllen — mit den richtigen Signalen.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong>GTM-Phase wechselt.</strong><br />
          Kampagnenfunktion wird zu Growth-System. Paid, Attribution, CRM und Sales müssen im gleichen Takt laufen.
        </p>
      </div>

      {/* Roadmap Snapshot */}
      <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Ausblick: 30 / 60 / 90 Tage</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[16.66%] w-[66.66%] h-0.5 bg-gray-200 z-0" />

          {[
            { day: '30', title: 'Fundament', desc: 'Tracking live. Erste SQLs attribuiert. Google Search aktiv.', color: 'bg-emerald-500', ring: 'ring-emerald-100', text: 'text-emerald-700', badge: 'bg-emerald-50', kpi: 'Erster attribuierbarer SQL' },
            { day: '60', title: 'Skalierung', desc: 'SQL-Volumen stabil. Retargeting live. Erste Vertical Playbooks.', color: 'bg-blue-500', ring: 'ring-blue-100', text: 'text-blue-700', badge: 'bg-blue-50', kpi: '10+ SQLs / Monat' },
            { day: '90', title: 'System Live', desc: 'ABM läuft. CAC-zu-ARR Benchmarks etabliert. Wiederholbar.', color: 'bg-blue-400/80', ring: 'ring-blue-100/50', text: 'text-blue-600', badge: 'bg-blue-50', kpi: 'Vorhersehbare Pipeline' }
          ].map((item, i) => (
            <div key={item.day} className={cn("relative z-10 flex flex-col p-6 rounded-2xl border border-gray-100 shadow-sm", item.badge)}>
              <div className="flex items-center gap-4 mb-4">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ring-4", item.color, item.ring)}>
                  {item.day}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tag</p>
                  <h4 className={cn("text-lg font-bold", item.text)}>{item.title}</h4>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
              <div className="mt-auto pt-4 border-t border-gray-200">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ziel-KPI</p>
                <p className={cn("text-sm font-bold", item.text)}>{item.kpi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research Conclusion */}
      <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 premium-shadow">
        <h3 className="text-xl font-bold font-display mb-4">Fazit</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Diese Rolle ist kein Channel-Job. Sie ist der Aufbau eines Growth-Systems, dem Sales vertrauen kann — mit sauberer Attribution, qualifizierter Pipeline und der Disziplin, beides zu skalieren.
        </p>
      </div>
    </div>
  );
}

function MarketView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
  // Localized data to fix placeholder issues from company.json
  const valueProps = [
    {
      title: "Conversion-Rate-Optimierung",
      description: "Experten-Produktberatung in Echtzeit auf Kategorie- und Produktseiten zur Beseitigung von Kaufhemmnissen.",
      sourceId: "16"
    },
    {
      title: "Automatisierter Support & Routing",
      description: "Intelligente Bearbeitung von Liefer- und Serviceanfragen mit nahtloser Eskalation an den menschlichen Support bei komplexen Fällen.",
      sourceId: "15"
    },
    {
      title: "Digitale Transformation im Geschäft",
      description: "POS-Terminals und QR-Code-Flows zur Reduzierung von Wartezeiten und zur Entlastung des Personals.",
      sourceId: "17"
    }
  ];

  const differentiation = [
    "Spezialisiert auf E-Commerce & stationären Handel",
    "Native PIM/ERP-Integration statt generischer API",
    "DSGVO-konforme Architektur by Design",
    "Omnichannel: Widget, POS-Terminal, Messenger",
    "Echtzeit-Produktdaten statt statischer Antworten"
  ];

  // Color accents matching V1's bordered cards
  const cardAccents = [
    { border: 'border-t-blue-500', badge: 'bg-blue-100 text-blue-800', label: 'Fokus: E-Commerce' },
    { border: 'border-t-purple-500', badge: 'bg-purple-100 text-purple-800', label: 'Skalierungs-Motor' },
    { border: 'border-t-emerald-500', badge: 'bg-emerald-100 text-emerald-800', label: 'Omnichannel-Integration' },
  ];

  return (
    <div className="space-y-8">
      {/* Value Prop Cards — colored top border like V1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {valueProps.map((prop, i) => (
          <div
            key={prop.title}
            className={cn(
              "p-8 rounded-3xl bg-white border border-gray-100 border-t-4 premium-shadow group hover:shadow-lg transition-all",
              cardAccents[i % 3].border
            )}
          >
            <h3 className="text-xl font-bold mb-3">
              {prop.title}
              <Citation id={prop.sourceId} onClick={onOpenEvidence} />
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm mb-4">{prop.description}</p>
            <span className={cn("text-xs font-bold px-3 py-1 rounded-full", cardAccents[i % 3].badge)}>
              {cardAccents[i % 3].label}
            </span>
          </div>
        ))}
      </div>

      {/* Dark Proof Strip — V1 style */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 md:p-10 shadow-xl">
        {/* Subtle background target ring */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="2" />
            <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="2" />
            <circle cx="100" cy="100" r="30" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-8 flex items-center">
          <ShieldCheck className="mr-2 text-emerald-400" size={22} />
          Öffentliche Proof Points
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div>
            <div className="text-5xl font-black text-emerald-400 mb-2">74%</div>
            <div className="text-sm font-medium text-slate-300">
              Kundenzufriedenheit (hagebau Online-Shops)
              <Citation id="18" onClick={onOpenEvidence} />
            </div>
          </div>
          <div>
            <div className="text-5xl font-black text-blue-400 mb-2">4,9 / 5</div>
            <div className="text-sm font-medium text-slate-300">
              OMR Reviews Bewertung (9 verifizierte Reviews)
              <Citation id="23" onClick={onOpenEvidence} />
            </div>
          </div>
          <div>
            <div className="text-5xl font-black text-purple-400 mb-2">~3x</div>
            <div className="text-sm font-medium text-slate-300">
              Kaufwahrscheinlichkeit bei KI-Beratung
              <Citation id="1" onClick={onOpenEvidence} />
            </div>
          </div>
        </div>
      </div>

      {/* Wahrscheinliche GTM-Friktionen */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold font-display ml-2">Wahrscheinliche GTM-Friktionen</h3>
        <p className="text-sm text-gray-500 ml-2 max-w-3xl">
          Was diese Rolle lösen soll — abgeleitet aus Stellenbeschreibung, Positionierung und Hiring-Muster.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { title: 'Pipeline-Vertrauen fehlt', desc: 'Marketing-Aktivität existiert. Aber wie belastbar ist ihr Beitrag zur Pipeline wirklich? Die Rolle sucht wirtschaftliche Klarheit — nicht mehr Reichweite.' },
            { title: 'Lead-Qualität ≠ Volumen', desc: 'SQL-Qualität und Sales-Feedback werden betont. Das deutet auf eine Lücke zwischen Marketing-Erfolg und Vertriebserfolg hin.' },
            { title: 'Attribution nicht reif', desc: 'Tracking läuft. Aber CRM, Sales-Outcome und Revenue sind noch nicht sauber verbunden. Entscheidungsreife fehlt.' },
            { title: 'Skalierung ohne Struktur', desc: 'Kampagnen laufen. Aber KPI-Logik, Testing-Disziplin und wiederholbare Prozesse fehlen, bevor Wachstum planbar wird.' },
            { title: 'Kapazität nicht synchron', desc: 'Paid kann nur so gut skalieren, wie Sales und CS mithalten. Wächst nur einer schneller, wird Wachstum teuer und qualitativ schwächer.' }
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h4 className="text-xs font-bold text-homie-primary mb-2 uppercase tracking-wider">{item.title}</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <h3 className="text-xl font-bold font-display mb-6">Differenzierungsstrategie</h3>
          <div className="space-y-4">
            {differentiation.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-6 h-6 rounded-full bg-homie-primary/10 flex items-center justify-center text-homie-primary mt-0.5">
                  <CheckCircle2 size={14} />
                </div>
                <p className="font-medium text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-8 rounded-3xl bg-homie-primary text-white overflow-hidden relative">
          <h3 className="text-xl font-bold font-display mb-6">Der homie-Vorteil</h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Kein generischer Chatbot. Native PIM- und ERP-Integration liefert Bestands- und Preisdaten in Echtzeit — direkt im Gespräch. Das ist der Unterschied zwischen Beratung und Raten.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white/80 font-bold">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span className="text-sm">PIM-Integration</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 font-bold">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span className="text-sm">ERP Live-Daten</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 font-bold">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span className="text-sm">Echtzeit-Preise</span>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}

function ICPsView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
  const icpsData = [
    {
      "id": "A",
      "name": "DIY / Baumarkthandel",
      "firmographics": "DIY / Baumarkthandel",
      "description": "Mittelgroße bis große Händler mit tiefem Sortiment, hoher SKU-Komplexität und realer In-Store-Reibung.",
      "buyingCommittee": ["VP E-Commerce", "Leiter Ladenbetrieb", "Kundenservice-Leitung", "IT-Architekt"],
      "pains": [
        "Hohe Entscheidungshemmung bei komplexen Produktanforderungen",
        "Personalmangel auf der Fläche",
        "Produktinformationen verteilt über mehrere Systeme",
        "Bruch zwischen Online-Recherche und In-Store-Ausführung"
      ],
      "jtbd": "Kaufabbrüche durch Komplexität zu adressieren. Die Rolle der KI ist hier nicht dekorativ. Sie hilft Kunden, Anforderungen sauber zu strukturieren, schneller zur richtigen Lösung zu kommen und sicherer zu entscheiden — kanalübergreifend und ohne vollständige Abhängigkeit von verfügbarem Fachpersonal.",
      "messaging": [
        "Projektzentrierte Beratung",
        "Unified Commerce",
        "Messbarer ROI"
      ],
      "messagingAngles": [
        { "title": "Beratung dort, wo Entscheidungen fallen", "desc": "Nicht später im Funnel. Direkt auf der Produktdetailseite." },
        { "title": "Online + POS + QR als ein System", "desc": "Weniger Medienbruch. Mehr durchgehende Kaufunterstützung." },
        { "title": "Komplexität runter, Conversion rauf", "desc": "Wenn Spezifikationen klarer werden, werden Kaufentscheidungen leichter." }
      ],
      "adHooks": [
        "Beratung auf der Produktdetailseite, nicht erst danach.",
        "Online + POS + QR als ein verbundenes System.",
        "Weniger Komplexität. Weniger Kaufabbruch.",
        "Fachberatung skalieren, auch wenn Personal knapp ist."
      ],
      "positioningOutput": [
        "Für DIY- und Baumarkthändler adressiert homie ein zentrales Problem: Kaufabbrüche durch Komplexität.\nDie KI hilft hier, Anforderungen sauber zu strukturieren und daraus umsetzbare Einkaufslisten zu machen. So wird Beratung konkreter, Kaufentscheidungen werden sicherer, und die Abhängigkeit von verfügbarem Fachpersonal sinkt.",
        "Für DIY- und Baumarkthändler adressiert homie ein zentrales Problem: den Bruch zwischen Online-Recherche und In-Store-Ausführung.\nDie KI verbindet Produktsuche, Beratung und Umsetzung über Online, POS und QR in einer durchgehenden Logik. So werden Kaufentscheidungen konsistenter, Reibung sinkt, und Beratung bleibt kanalübergreifend nutzbar.",
        "Für DIY- und Baumarkthändler adressiert homie ein zentrales Problem: fehlende Transparenz darüber, was Beratungsleistung wirtschaftlich wirklich bewirkt.\nDie KI macht Interaktionen nicht nur sichtbar, sondern verknüpft sie mit Umsatzwirkung. So wird Beratung messbarer, Attribution belastbarer und der kommerzielle Wert der Experience klarer."
      ],
      "citations": ["18", "17"]
    },
    {
      "id": "B",
      "name": "Spezialisierte E-Commerce-Händler",
      "firmographics": "Spezialisierte E-Commerce-Händler",
      "description": "Wachstumsstarke Händler in Kategorien wie Elektronik, Möbel oder Sport — meist mit modernen Setups auf Shopify oder Shopware und hohem Druck auf Conversion-Effizienz.",
      "buyingCommittee": ["Leiter Performance Marketing", "Produktleiter", "Kundensupport-Manager"],
      "pains": [
        "Paid Traffic ist teuer und Conversion-Deckel werden schnell sichtbar",
        "Support skaliert nicht im gleichen Tempo wie Nachfrage",
        "Der wirtschaftliche Beitrag des Assistenten ist schwer sauber zu attribuieren"
      ],
      "jtbd": "Effizienz der Werbeausgaben maximieren: Kostenintensiven Traffic in treue Kunden verwandeln, indem Kaufhemmnisse durch sofortigen, intelligenten Dialog gelöst werden.",
      "messaging": [
        "Schnelle Bereitstellung",
        "Granulare Attribution",
        "Reibungslose Conversion"
      ],
      "messagingAngles": [
        { "title": "Traffic besser monetarisieren", "desc": "Nicht mehr Klicks. Mehr Wert aus den Klicks, die schon bezahlt werden." },
        { "title": "Beratung ohne Support-Flaschenhals", "desc": "Sofortige Antworten, ohne dass das Serviceteam linear mitwachsen muss." },
        { "title": "Attribution, die näher an Umsatz ist", "desc": "Nicht nur Interaktionen zählen. Sondern verstehen, was wirklich Revenue bewegt." }
      ],
      "adHooks": [
        "Klicks in Käufer verwandeln — mit Beratung im richtigen Moment.",
        "Schnell live gehen und DSGVO-konform bleiben.",
        "Weniger Reibung zwischen Produktfrage und Warenkorb.",
        "Mehr Klarheit darüber, was der Assistent wirtschaftlich wirklich bringt."
      ],
      "positioningOutput": [
        "Für spezialisierte E-Commerce-Händler adressiert homie ein zentrales Problem: teurer Traffic trifft auf langsame operative Umsetzung.\nDie KI lässt sich schnell einführen, ohne langes Integrationsprojekt. So wird aus bezahlter Reichweite schneller nutzbare Beratung — und aus Besuchern werden früher Käufer.",
        "Für spezialisierte E-Commerce-Händler adressiert homie ein zentrales Problem: fehlende Klarheit darüber, was der Assistent wirtschaftlich wirklich bewirkt.\nDie KI macht Gespräche nicht nur sichtbar, sondern ordnet sie Bestellungen und Umsatzwirkung zu. So wird Attribution belastbarer und Paid Performance besser steuerbar.",
        "Für spezialisierte E-Commerce-Händler adressiert homie ein zentrales Problem: teurer Traffic trifft auf unnötige Reibung im Kaufprozess.\nDie KI hilft, offene Fragen direkt im Entscheidungsmoment zu klären und den Weg in den Warenkorb kürzer zu machen. So sinkt Kaufhemmung, Conversion wird effizienter, und bezahlter Traffic lässt sich besser monetarisieren."
      ],
      "citations": ["16", "4"]
    },
    {
      "id": "C",
      "name": "Industrie-Distributoren",
      "firmographics": "Industrie-Distributoren",
      "description": "B2B-Hersteller und Distributoren mit komplexen Teilekatalogen, viel internem Produktwissen und verteilten Teams in Vertrieb und Außendienst.",
      "buyingCommittee": ["Leiter Digital B2B", "Sales Ops", "Produktdaten-Eigentümer", "Compliance"],
      "pains": [
        "Internes Wissen ist schwer zugänglich",
        "Komplexe Teilekataloge brauchen geführte Suche statt bloßer Navigation",
        "Außendienst und Vertrieb brauchen Antworten direkt im Einsatzmoment",
        "Produkt-, ERP- und PIM-Daten liegen oft nicht in einer sauberen Beratungslogik vor"
      ],
      "jtbd": "Technisches Wissen demokratisieren: 24/7-Zugriff auf komplexe Produktdaten ermöglichen und Außendienstmitarbeiter mit einem leistungsstarken mobilen KI-Begleiter befähigen.",
      "messaging": [
        "24/7 Wissenszugänglichkeit",
        "Enterprise-Ready Integration",
        "Befähigung auf der Verkaufsfläche"
      ],
      "messagingAngles": [
        { "title": "Wissen verfügbar machen, nicht nur speichern", "desc": "Technische Informationen sind nur dann wertvoll, wenn sie im richtigen Moment nutzbar werden." },
        { "title": "Komplexe Kataloge handhabbar machen", "desc": "Nicht mehr Suche über Umwege. Sondern geführte Orientierung durch Teile, Spezifikationen und Anwendungsfälle." },
        { "title": "Außendienst operativ stärker machen", "desc": "Beratung direkt am Regal, beim Kunden oder im Gespräch — ohne Rückfrageketten und Medienbruch." }
      ],
      "adHooks": [
        "Außendienst mit KI-gestütztem Expertenwissen befähigen.",
        "Enterprise-Integration für komplexe Kataloge und Systemlandschaften.",
        "Weniger Wissenssilos. Schnellere technische Antworten.",
        "Geführte Suche statt reiner Teilenummern-Navigation."
      ],
      "positioningOutput": [
        "Für Industrie-Distributoren adressiert homie ein zentrales Problem: relevantes Produkt- und Anwendungswissen ist zwar vorhanden, aber im Alltag schwer zugänglich.\nDie KI macht technisches Wissen sofort nutzbar — für Vertrieb, Außendienst und Kundenservice. So sinkt Suchaufwand, Antworten kommen schneller, und Beratung wird verlässlicher.",
        "Für Industrie-Distributoren adressiert homie ein zentrales Problem: wertvolle Produktdaten liegen in mehreren Systemen, aber nicht in einer durchgehenden Beratungslogik.\nDie KI verbindet ERP-, PIM- und Katalogdaten zu einer nutzbaren Antwortschicht. So wird aus komplexer Systemlandschaft eine belastbare Beratungsinfrastruktur.",
        "Für Industrie-Distributoren adressiert homie ein zentrales Problem: Außendienst und Vertrieb brauchen schnelle, präzise Antworten genau im Einsatzmoment.\nDie KI bringt Expertenwissen direkt dorthin, wo Entscheidungen fallen — mobil, kontextnah und sofort nutzbar. So steigt Beratungssicherheit, ohne dass Wissen nur bei einzelnen Spezialisten hängen bleibt."
      ],
      "citations": ["17", "1"]
    }
  ];

  const [activeIcp, setActiveIcp] = useState(icpsData[0]);
  const [selectedNarrative, setSelectedNarrative] = useState(activeIcp.messaging[0]);

  useEffect(() => {
    setSelectedNarrative(activeIcp.messaging[0]);
  }, [activeIcp]);

  const generatedMessage = useMemo(() => {
    if (activeIcp.positioningOutput) {
      if (Array.isArray(activeIcp.positioningOutput)) {
        const index = activeIcp.messaging.indexOf(selectedNarrative);
        return activeIcp.positioningOutput[index >= 0 ? index : 0];
      }
      return activeIcp.positioningOutput;
    }
    return `Für ${activeIcp.name} löst homie das Problem ${activeIcp.pains[0].toLowerCase()} durch ${selectedNarrative.toLowerCase()}. Dies stellt sicher, dass ${activeIcp.jtbd.toLowerCase()}`;
  }, [activeIcp, selectedNarrative]);

  return (
    <div className="space-y-8">
      {/* ICP Tabs */}
      <div className="flex gap-4 p-1 bg-gray-100 rounded-2xl w-fit">
        {icpsData.map((icp) => (
          <button
            key={icp.id}
            onClick={() => setActiveIcp(icp)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeIcp.id === icp.id ? "bg-white shadow-sm text-homie-primary" : "text-gray-500 hover:text-gray-700"
            )}
          >
            ICP {icp.id}: {icp.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold font-display mb-2">{activeIcp.name}</h3>
                <p className="text-gray-500 mb-2">{activeIcp.firmographics}</p>
                {activeIcp.description && <p className="text-sm text-gray-400 italic">{activeIcp.description}</p>}
              </div>
              <div className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-400">
                ZIELSEGMENT
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Einkaufsgremium</h4>
                <div className="flex flex-wrap gap-2">
                  {activeIcp.buyingCommittee.map(role => (
                    <span key={role} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-600">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Zentrale Pain Points</h4>
                <div className="space-y-2">
                  {activeIcp.pains.map(pain => (
                    <div key={pain} className="flex items-center gap-2 text-sm text-gray-600">
                      <AlertCircle size={14} className="text-red-400" />
                      {pain}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Message Builder */}
          <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Positioning-Generator</h4>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {activeIcp.messaging.map((msg) => (
                  <button
                    key={msg}
                    onClick={() => setSelectedNarrative(msg)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold border transition-all",
                      selectedNarrative === msg
                        ? "bg-homie-primary text-white border-homie-primary"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                    )}
                  >
                    {msg}
                  </button>
                ))}
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-homie-primary">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Positioning Output</p>
                <p className="text-lg font-medium text-gray-800 leading-relaxed whitespace-pre-line">
                  {generatedMessage}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Messaging-Winkel</h4>
            <div className="space-y-4">
              {activeIcp.messagingAngles ? activeIcp.messagingAngles.map((angle: any, i: number) => (
                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-sm font-bold text-homie-primary mb-1">Winkel {i + 1}</p>
                  <p className="text-sm font-bold text-gray-800 mb-1">{angle.title}</p>
                  <p className="text-xs text-gray-500">{angle.desc}</p>
                </div>
              )) : activeIcp.messaging.map((msg, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-sm font-bold text-homie-primary mb-1">Winkel {i + 1}</p>
                  <p className="text-sm text-gray-600">{msg}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Werbe-Hooks</h4>
            <div className="space-y-4">
              {activeIcp.adHooks.map((hook, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-homie-primary/10 flex items-center justify-center text-homie-primary shrink-0">
                    <Zap size={14} />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{hook}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompetitorsView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
  const competitorsData = [
    {
      "name": "Zoovu",
      "positioning": "KI-gestützte Produktentdeckung: KI-Suche + Guided Selling.",
      "icpFocus": "Enterprise-Marken/Einzelhändler; B2B-Kataloge.",
      "deployment": "Web-Erlebnisse: Shopping-Assistent, Produktfinder.",
      "dataNeeds": "Strukturierte Produktdaten; Kataloge.",
      "winCounter": "homie-Vorteil: Überlegene Omnichannel/POS-Integration und radikal schnellere Time-to-Value (Minuten statt Monate der Implementierung).",
      "x": 0.8,
      "y": 0.9
    },
    {
      "name": "iAdvize",
      "positioning": "KI-Shopping-Assistent mit Fokus auf Conversion.",
      "icpFocus": "350+ E-Commerce-Marken.",
      "deployment": "On-Site KI-Assistent; testphasenbasiertes Onboarding.",
      "dataNeeds": "SKU/Katalog, PDP-Kontext, Preis-FAQs.",
      "winCounter": "homie-Vorteil: Tiefere ERP/PIM-Systemintegration und native, EU-fokussierte DSGVO-Konformität für Enterprise-Sicherheit.",
      "x": 0.3,
      "y": 0.7
    },
    {
      "name": "Constructor",
      "positioning": "KI-native Suche + Entdeckung im Handel.",
      "icpFocus": "Enterprise E-Commerce-Marken.",
      "deployment": "Suche, Browsing, Empfehlungen.",
      "dataNeeds": "Clickstream, Produktkatalog, Conversion-Events.",
      "winCounter": "homie-Vorteil: Über die Suche hinaus – ein echter beratender Begleiter, der Kunden durch komplexe, produktübergreifende Projekte führt.",
      "x": 0.2,
      "y": 0.8
    },
    {
      "name": "Coveo",
      "positioning": "KI-Suche + generative Produktentdeckung.",
      "icpFocus": "Enterprise E-Commerce + B2B-Kataloge.",
      "deployment": "Suche, Empfehlungen, Konversation.",
      "dataNeeds": "Katalog + Verhaltensdaten.",
      "winCounter": "homie-Vorteil: Spezialisierte 'Berater'-Logik für den Handel, die generische Suchrelevanz in High-Intent-Szenarien übertrifft.",
      "x": 0.4,
      "y": 0.6
    },
    {
      "name": "Algolia",
      "positioning": "KI-Such- & Entdeckungsplattform.",
      "icpFocus": "Breit (E-Commerce + SaaS + Apps).",
      "deployment": "API-first Suche/Empfehlung.",
      "dataNeeds": "Indexierungssätze + Klick/Conversion-Events.",
      "winCounter": "homie-Vorteil: Eine schlüsselfertige, ergebnisorientierte Lösung im Vergleich zu Algolias entwicklerzentrierten Bausteinen.",
      "x": 0.1,
      "y": 0.5
    },
    {
      "name": "moinAI",
      "positioning": "KI-Plattform für automatisierte Kundenkommunikation.",
      "icpFocus": "Kundenservice + Marketing; DACH + EU.",
      "deployment": "Chatbots + Live-Chat + KI-Agenten.",
      "dataNeeds": "Wissensdatenbank + Übergaberegeln.",
      "winCounter": "homie-Vorteil: Speziell für Handelsabsichten und Conversion entwickelt, während moinAI auf allgemeine Service- und FAQ-Automatisierung fokussiert bleibt.",
      "x": 0.5,
      "y": 0.3
    }
  ];

  const [selectedCompetitor, setSelectedCompetitor] = useState<any>(null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2x2 Map */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold font-display">Positionierungskarte</h3>
            <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-homie-primary" /> homie</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-300" /> Wettbewerber</div>
            </div>
          </div>

          <div className="aspect-video relative border-2 border-gray-100 rounded-2xl bg-gray-50/50">
            {/* Axes */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-gray-200" />

            {/* Labels */}
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 uppercase">Kaufabsicht</span>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 uppercase">Support-Fokus</span>
            <span className="absolute top-1/2 -left-12 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-gray-400 uppercase">Nur E-Commerce</span>
            <span className="absolute top-1/2 -right-12 -translate-y-1/2 rotate-90 text-[10px] font-bold text-gray-400 uppercase">Omnichannel / POS</span>

            {/* Points */}
            {competitorsData.map((comp) => (
              <motion.div
                key={comp.name}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                onClick={() => setSelectedCompetitor(comp)}
                className="absolute w-4 h-4 rounded-full bg-gray-400 border-2 border-white shadow-sm cursor-pointer group"
                style={{
                  left: `${comp.x * 100}%`,
                  bottom: `${comp.y * 100}%`,
                  transform: 'translate(-50%, 50%)'
                }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white border border-gray-100 rounded shadow-sm text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {comp.name}
                </div>
              </motion.div>
            ))}

            {/* homie Point */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute w-6 h-6 rounded-full bg-homie-primary border-4 border-white shadow-lg z-10"
              style={{ left: '85%', bottom: '85%', transform: 'translate(-50%, 50%)' }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-homie-primary text-white rounded shadow-sm text-[10px] font-bold whitespace-nowrap">
                homie
              </div>
            </motion.div>
          </div>
        </div>

        {/* Competitor Details Card */}
        <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
          {selectedCompetitor ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold font-display">{selectedCompetitor.name}</h3>
                <button onClick={() => setSelectedCompetitor(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Positionierung</h4>
                <p className="text-sm text-gray-600">{selectedCompetitor.positioning}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">ICP-Fokus</h4>
                <p className="text-sm text-gray-600">{selectedCompetitor.icpFocus}</p>
              </div>
              <div className="p-4 bg-homie-primary/5 border border-homie-primary/10 rounded-2xl">
                <h4 className="text-xs font-bold text-homie-primary uppercase tracking-widest mb-2">Wie homie gewinnt</h4>
                <p className="text-sm text-gray-700 font-medium">{selectedCompetitor.winCounter}</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <span className="mb-4 opacity-20"><Map size={40} /></span>
              <p>Wählen Sie einen Wettbewerber auf der Karte aus, um Details anzuzeigen.</p>
            </div>
          )}
        </div>
      </div>

      {/* Competitor Table */}
      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 premium-shadow overflow-hidden">
        <h3 className="text-xl font-bold font-display mb-6 text-white">Wettbewerber-Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Wettbewerber</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">ICP-Fokus</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Bereitstellung</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Datenbedarf</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {competitorsData.map((comp) => (
                <tr key={comp.name} className="hover:bg-slate-900/50 transition-colors cursor-pointer" onClick={() => setSelectedCompetitor(comp)}>
                  <td className="py-4 font-bold text-blue-400/80">{comp.name}</td>
                  <td className="py-4 text-sm text-slate-300">{comp.icpFocus}</td>
                  <td className="py-4 text-sm text-slate-300">{comp.deployment}</td>
                  <td className="py-4 text-sm text-slate-300">{comp.dataNeeds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FunnelView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
  const a = {
    budget: 38000,
    cpc: 8,
    engagementRate: 0.15,
    leadRate: 0.08,
    mqlRate: 0.50,
    sqlRate: 0.40,
    closeRate: 0.20,
    proArpa: 9480
  };

  const sessions = a.budget / a.cpc;
  const engagedSessions = Math.round(sessions * a.engagementRate);
  const leads = Math.round(engagedSessions * a.leadRate);
  const mqls = Math.round(leads * a.mqlRate);
  const sqls = Math.round(mqls * a.sqlRate);
  const closedDealsExact = sqls * a.closeRate;
  const closedDeals = Math.round(closedDealsExact * 10) / 10; // 2.4
  const arrExact = Math.round(closedDealsExact * a.proArpa); // 22752
  const arrRounded = Math.round(arrExact / 1000) * 1000; // 23000

  const funnelData = [
    { stage: 'Sessions', volume: sessions, color: '#10B981' },
    { stage: 'Engaged', volume: engagedSessions, color: '#10B981', opacity: 0.8 },
    { stage: 'Leads', volume: leads, color: '#10B981', opacity: 0.6 },
    { stage: 'MQLs', volume: mqls, color: '#3b82f6', opacity: 1 },
    { stage: 'SQLs', volume: sqls, color: '#3b82f6', opacity: 0.8 },
    { stage: 'Closed', volume: closedDeals, color: '#3b82f6', opacity: 0.6 },
  ];

  const parameters = [
    { key: 'Monatliches Budget', val: `€${a.budget.toLocaleString()}`, sub: '' },
    { key: 'CPC (Pro Search)', val: `€${a.cpc}`, sub: '' },
    { key: 'Engagement Rate', val: `${(a.engagementRate * 100).toFixed(0)}%`, sub: '' },
    { key: 'Lead Rate', val: `${(a.leadRate * 100).toFixed(0)}%`, sub: '' },
    { key: 'MQL Rate', val: `${(a.mqlRate * 100).toFixed(0)}%`, sub: '' },
    { key: 'SQL Rate', val: `${(a.sqlRate * 100).toFixed(0)}%`, sub: '' },
    { key: 'Close Rate', val: `${(a.closeRate * 100).toFixed(0)}%`, sub: '' },
    { key: 'Pro ARPA / Jahr', val: `€${a.proArpa.toLocaleString()}`, sub: '' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Section: Funnel and Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Funnel Card */}
        <div className="p-10 rounded-[40px] bg-slate-950 border border-slate-800 premium-shadow text-white relative overflow-hidden group">
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
          <h3 className="text-2xl font-black font-display mb-2">Growth Funnel — Basis-Szenario</h3>
          <p className="text-xs text-slate-500 mb-10 font-medium">Year 1 · €38K/mo Paid Budget · Pro-Tier Fokus</p>
          
          <div className="h-[400px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={funnelData}
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="stage"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fontWeight: 900, fill: '#ffffff', textAnchor: 'start' }}
                  width={100}
                  dx={-100}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#020617', borderRadius: '16px', border: '1px solid #1e293b', padding: '12px' }}
                />
                <Bar dataKey="volume" radius={[0, 8, 8, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={entry.opacity || 1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-500 text-center mt-6 uppercase tracking-widest font-black">Hover over a bar to inspect the volume at each stage.</p>
        </div>

        {/* Right Column: Parameters and Projizierter Output */}
        <div className="space-y-8">
          {/* Pipeline-Parameter */}
          <div className="p-8 rounded-[40px] bg-white border border-gray-100 premium-shadow">
            <h3 className="text-xl font-black font-display mb-8">Pipeline-Parameter</h3>
            <div className="grid grid-cols-2 gap-4">
              {parameters.map((p) => (
                <div key={p.key} className="p-5 bg-gray-50 rounded-[24px] border border-gray-100 transition-all hover:bg-gray-100/50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{p.key}</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">{p.val}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[11px] text-gray-400 leading-relaxed font-medium">
              Basis-Szenario Year 1. Budget aus Excel-Modell v21. Conversion-Rates sind Branchen-Benchmarks — werden in Woche 1–2 validiert.
            </p>
          </div>

          {/* Projizierter Output */}
          <div className="p-10 rounded-[40px] bg-blue-600 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-125" />
            <h3 className="text-xl font-black font-display mb-8 relative z-10">Projizierter Output</h3>
            
            <div className="grid grid-cols-2 gap-y-10 mb-8 relative z-10">
              <div className="col-span-1">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-2">Zusätzlicher ARR / Monat</p>
                <p className="text-5xl font-black tracking-tighter">€{arrRounded.toLocaleString()}</p>
                <p className="text-xs text-white/50 mt-2 font-bold uppercase tracking-widest">Exakt: €{arrExact.toLocaleString()}</p>
              </div>
              <div className="col-span-1 text-right">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-2">Closed Deals / Monat</p>
                <p className="text-3xl font-black tracking-tighter">~2</p>
                <p className="text-xs text-white/50 mt-2 font-bold uppercase tracking-widest">2.4 exakt</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 relative z-10">
              <div>
                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">CAC (Pro)</p>
                <p className="text-lg font-black tracking-tight">€6.530</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Payback</p>
                <p className="text-lg font-black tracking-tight">12 Mo.</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">LTV:CAC</p>
                <p className="text-lg font-black tracking-tight">4.4×</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Funnel Model Detail Table */}
      <div className="p-10 rounded-[40px] bg-white border border-gray-100 premium-shadow">
        <h3 className="text-2xl font-black font-display mb-10 tracking-tight">Funnel-Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stufe</th>
                <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Anzahl / Wert</th>
                <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Basis</th>
                <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Drop-off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { label: 'Paid Sessions', value: sessions.toLocaleString(), note: `€${a.budget.toLocaleString()} ÷ CPC €${a.cpc}`, drop: null },
                { label: 'Engaged Sessions', value: engagedSessions.toLocaleString(), note: '15% der Sessions', drop: '-85%', color: 'text-red-400' },
                { label: 'Leads (Trial + Demo)', value: leads.toLocaleString(), note: '8% der Engaged', drop: '-92%', color: 'text-red-400' },
                { label: 'MQLs', value: mqls.toLocaleString(), note: '50% der Leads', drop: '-51%', color: 'text-red-400' },
                { label: 'SQLs', value: sqls.toLocaleString(), note: '40% der MQLs', drop: '-61%', color: 'text-red-400' },
                { label: 'Closed Won', value: `${closedDealsExact.toFixed(1)} (~${Math.round(closedDealsExact)})`, note: '20% der SQLs', drop: '-80%', color: 'text-emerald-500', labelColor: 'text-emerald-600' },
                { label: 'Monatlicher ARR', value: `€${arrRounded.toLocaleString()}`, note: `Abschlüsse × €${a.proArpa.toLocaleString()} Pro-ARPA`, drop: '×ARPA', color: 'text-emerald-500', labelColor: 'text-emerald-600' },
              ].map((row) => (
                <tr key={row.label} className="group hover:bg-gray-50 transition-all duration-300">
                  <td className={cn("py-5 font-black text-gray-900", row.labelColor)}>{row.label}</td>
                  <td className={cn("py-5 pr-8 font-black text-right tracking-tight", row.color || "text-blue-600")}>{row.value}</td>
                  <td className="py-5 text-[13px] text-gray-500 font-medium italic">{row.note}</td>
                  <td className="py-5 text-right">
                    {row.drop && (
                      <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest", 
                        row.drop.startsWith('×') ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-400"
                      )}>
                        {row.drop}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paid Performance as Revenue System */}
      <div className="p-10 rounded-[40px] bg-white border border-gray-100 premium-shadow relative overflow-hidden">
        <h3 className="text-2xl font-black font-display mb-6 tracking-tight">Paid ist kein Kanal. Es ist ein Input.</h3>
        <p className="text-sm text-gray-500 mb-10 leading-relaxed font-medium max-w-4xl">
          Budget erzeugt nur dann Wert, wenn daraus qualifizierte Pipeline entsteht, Sales diese verarbeiten kann und gewonnene Kunden stark genug sind, um zu bleiben. Signalqualität, Routing und Retention müssen zusammenlaufen — sonst ist Skalierung Scheineffizienz.
        </p>
        <div className="flex items-center gap-6 flex-wrap relative z-10">
          {['Budget', 'Qualifizierte Pipeline', 'Sales-Kapazität', 'Retained ARR'].map((step, i) => (
            <React.Fragment key={step}>
              <div className="px-6 py-3 bg-white border border-gray-100 rounded-[20px] text-[11px] font-black text-blue-600 shadow-sm uppercase tracking-widest">
                {step}
              </div>
              {i < 3 && <ArrowRight size={18} className="text-gray-200" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Routing-Logik: Intent-Segmentierung */}
      <div className="p-10 rounded-[40px] bg-white border border-gray-100 premium-shadow">
        <h3 className="text-2xl font-black font-display mb-2 tracking-tight">Routing-Logik: Intent-Segmentierung</h3>
        <p className="text-sm text-gray-400 mb-12 font-medium">Zwei Pfade. Ein System.</p>
        
        <div className="space-y-4">
          {/* Path 1: Trial-First */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 premium-shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
            <div className="flex flex-col xl:flex-row items-center gap-6 relative z-10">
              <div className="xl:w-64 shrink-0">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 block">Pfad 1</span>
                <h4 className="text-lg font-black text-gray-900">Trial-First (PLG)</h4>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">High-Intent · Basic / Pro</p>
              </div>

              <div className="flex-1 overflow-x-auto">
                <div className="flex items-center justify-start gap-4 min-w-max py-4">
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl min-w-[140px] text-center shadow-sm">
                    <p className="text-[11px] font-black text-gray-900 mb-1">High-Intent Ad</p>
                    <p className="text-[10px] text-gray-400 font-bold italic">z.B. "Shopify KI Berater"</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 shrink-0" />
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl min-w-[140px] text-center shadow-sm">
                    <p className="text-[11px] font-black text-gray-900 mb-1">Trial Landing Page</p>
                    <p className="text-[10px] text-gray-400 font-bold italic">Live in &lt; 10 Min.</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 shrink-0" />
                  <div className="p-5 bg-blue-600 rounded-2xl min-w-[160px] text-center shadow-xl shadow-blue-200">
                    <p className="text-[11px] font-black text-white mb-1">Testphase starten</p>
                    <p className="text-[10px] text-white/70 font-bold italic">Primäre Conversion</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 shrink-0" />
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl min-w-[140px] text-center shadow-sm">
                    <p className="text-[11px] font-black text-gray-900 mb-1">Aktivierung</p>
                    <p className="text-[10px] text-gray-400 font-bold italic">Widget ist live</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Path 2: Sales-Led */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 premium-shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
            <div className="flex flex-col xl:flex-row items-center gap-6 relative z-10">
              <div className="xl:w-64 shrink-0">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1 block">Pfad 2</span>
                <h4 className="text-lg font-black text-gray-900">Demo-First (Sales-Led)</h4>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Enterprise · ABM</p>
              </div>

              <div className="flex-1 overflow-x-auto">
                <div className="flex items-center justify-start gap-4 min-w-max py-4">
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl min-w-[140px] text-center shadow-sm">
                    <p className="text-[11px] font-black text-gray-900 mb-1">Omnichannel Ad</p>
                    <p className="text-[10px] text-gray-400 font-bold italic">z.B. "POS KI Terminal"</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 shrink-0" />
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl min-w-[140px] text-center shadow-sm">
                    <p className="text-[11px] font-black text-gray-900 mb-1">Demo Landing Page</p>
                    <p className="text-[10px] text-gray-400 font-bold italic">Proof + Sicherheit</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 shrink-0" />
                  <div className="p-5 bg-indigo-600 rounded-2xl min-w-[160px] text-center shadow-xl shadow-indigo-100 font-medium">
                    <p className="text-[11px] font-black text-white mb-1">Demo buchen</p>
                    <p className="text-[10px] text-white/70 font-bold italic">Lead ins CRM</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 shrink-0" />
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl min-w-[140px] text-center shadow-sm">
                    <p className="text-[11px] font-black text-gray-900 mb-1">SQL / Pipeline</p>
                    <p className="text-[10px] text-gray-400 font-bold italic">Von Sales akzeptiert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function PaidView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
  const scalingData = [
    { year: '2026', smYear: '€456K', smMonth: '€38K', arrTarget: '€1.56M', budgetPct: 29 },
    { year: '2027', smYear: '€688K', smMonth: '€57K', arrTarget: '€2.88M', budgetPct: 24 },
    { year: '2028', smYear: '€1020K', smMonth: '€85K', arrTarget: '€4.98M', budgetPct: 20 },
    { year: '2029', smYear: '€1354K', smMonth: '€113K', arrTarget: '€7.92M', budgetPct: 17 },
    { year: '2030', smYear: '€1961K', smMonth: '€163K', arrTarget: '€12.43M', budgetPct: 16 },
  ];

  const funnelMetrics = [
    { label: 'Sessions (CPC €8)', value: '12.500' },
    { label: 'Engaged (15%)', value: '1.875' },
    { label: 'Leads (8% engaged)', value: '150' },
    { label: 'MQLs (50% leads)', value: '75' },
    { label: 'SQLs (40% MQLs)', value: '30' },
  ];

  const cacLtvData = [
    { tier: 'Basic', price: '€190/mo', ratio: '4× LTV:CAC', cac: '€1.008', payback: '9 Mo.', ltv: '€4.0K', color: 'bg-blue-400' },
    { tier: 'Business', price: '€390/mo', ratio: '5.1× LTV:CAC', cac: '€2.224', payback: '9 Mo.', ltv: '€11.4K', color: 'bg-indigo-500' },
    { tier: 'Pro', price: '€790/mo', ratio: '4.4× LTV:CAC', cac: '€6.530', payback: '12 Mo.', ltv: '€29.0K', color: 'bg-blue-600' },
    { tier: 'Enterprise', price: 'Custom', ratio: '7.9× LTV:CAC', cac: '€27.048', payback: '12 Mo.', ltv: '€214.7K', color: 'bg-indigo-700' },
  ];

  const frameworkSteps = [
    { period: '2026', title: 'Seed / Early GTM', range: '€1M–€4M', tasks: 'LinkedIn ABM · Google Search · SEO seed content', color: 'border-emerald-200 bg-emerald-50/30' },
    { period: '2027–28', title: 'Growth / Expansion', range: '€4M–€15M', tasks: 'Retargeting · Intent data (G2/Bombora) · Nurture automation', color: 'border-blue-200 bg-blue-50/30' },
    { period: '2029–30', title: 'Scale', range: '€15M–€25M', tasks: 'Multi-market DE/PL/UK/NL · Partner co-marketing · Events', color: 'border-purple-200 bg-purple-50/30' },
    { period: '2031–35', title: 'Maturity', range: '€25M–€100M', tasks: 'Brand campaigns · Gartner/analyst relations · ABM at scale', color: 'border-amber-200 bg-amber-50/30' },
  ];

  return (
    <div className="space-y-8">
      {/* Top 3 Channel Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Google Search Card */}
        <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-blue-600">
              <Search size={22} />
            </div>
            <h3 className="text-xl font-bold font-display text-gray-900">Google Search</h3>
          </div>
          <p className="text-sm text-gray-500 mb-8 font-medium">High-Intent Demand erfassen. Eine plausible Lesart: Wer aktiv sucht, dürfte bereits bereit sein.</p>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50">
              <h4 className="text-[10px] font-bold text-blue-600 mb-4 uppercase tracking-widest">Category Search</h4>
              <div className="flex flex-col gap-2">
                {['KI-Shopping-Assistent', 'Guided Selling Software', 'E-Commerce KI-Assistent'].map(kw => (
                  <div key={kw} className="px-3 py-2 bg-white border border-gray-100 rounded-xl text-[11px] font-bold text-gray-400 text-center shadow-sm">
                    {kw}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50">
              <h4 className="text-[10px] font-bold text-blue-600 mb-4 uppercase tracking-widest">Integration Search</h4>
              <div className="flex flex-col gap-2">
                {['Shopify KI-Assistent', 'Shopware Produktberater', 'GTM Consent Mode'].map(kw => (
                  <div key={kw} className="px-3 py-2 bg-white border border-gray-100 rounded-xl text-[11px] font-bold text-gray-400 text-center shadow-sm">
                    {kw}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn ABM Card */}
        <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-blue-700">
              <Linkedin size={22} />
            </div>
            <h3 className="text-xl font-bold font-display text-gray-900">LinkedIn ABM</h3>
          </div>
          <p className="text-sm text-gray-500 mb-8 font-medium">Enterprise-Pipeline aufbauen. Spricht dafür, das Buying Committee direkt zu targetieren.</p>

          <div className="space-y-4">
            <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50">
              <h4 className="text-[10px] font-bold text-blue-600 mb-1 uppercase tracking-widest">Tier 1 — Named Accounts</h4>
              <p className="text-[11px] text-gray-400 mb-4">Baumarktketten, Elektronikfachmärkte, große Fachhändler.</p>
              <p className="text-xs font-bold text-blue-700">Offer: Retail KI ROI & Compliance Demo</p>
            </div>

            <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50">
              <h4 className="text-[10px] font-bold text-blue-600 mb-1 uppercase tracking-widest">Tier 2 — Category</h4>
              <p className="text-[11px] text-gray-400 mb-4">E-Commerce-Händler + B2B-Distributoren nach Firmografie.</p>
              <p className="text-xs font-bold text-blue-700">Offer: DIY Vertical Playbook (Download)</p>
            </div>
          </div>
        </div>

        {/* Meta Retargeting Card */}
        <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-rose-500">
              <Instagram size={22} />
            </div>
            <h3 className="text-xl font-bold font-display text-gray-900">Meta Retargeting</h3>
          </div>
          <p className="text-sm text-gray-500 mb-8 font-medium">Warme Zielgruppen konvertieren. Könnte den ROAS nachhaltig maximieren.</p>

          <div className="space-y-3 mb-8">
            {[
              'Website-Besucher',
              'Preisseiten-Besucher',
              'Trial-Nutzer (nicht aktiviert)'
            ].map(item => (
              <div key={item} className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-2xl border border-gray-100/50">
                <div className="w-5 h-5 rounded-full border border-blue-500 flex items-center justify-center bg-white shadow-sm">
                  <Check size={12} className="text-blue-500" />
                </div>
                <span className="text-[13px] font-bold text-gray-600">{item}</span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">Ziel-Signal</h4>
            <p className="text-sm font-bold text-blue-900">Trial-Start oder Demo-Buchung</p>
          </div>
        </div>
      </div>

      {/* S&M Budget Table */}
      <div className="p-8 rounded-[32px] bg-[#0B1120] border border-slate-800 premium-shadow text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="relative z-10">
          <h3 className="text-2xl font-black font-display mb-2 tracking-tight">S&M Budget — 5-Jahres-Skalierung</h3>
          <p className="text-sm text-slate-400 mb-10 font-medium">Aus Excel-Modell v21 · Skaliert mit ARR · CAC-Disziplin aufrechterhalten</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800/60 transition-colors">
                  <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Jahr</th>
                  <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">S&M / Jahr</th>
                  <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">S&M / Monat</th>
                  <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">ARR Ziel</th>
                  <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Budget als % ARR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {scalingData.map((row) => (
                  <tr key={row.year} className="group hover:bg-slate-800/20 transition-all duration-300">
                    <td className="py-6 font-bold text-slate-300 text-lg">{row.year}</td>
                    <td className="py-6 font-black text-emerald-400 text-lg tracking-tight">{row.smYear}</td>
                    <td className="py-6 font-bold text-slate-300 text-lg tracking-tight">{row.smMonth}</td>
                    <td className="py-6 font-bold text-slate-200 text-lg tracking-tight">{row.arrTarget}</td>
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden shrink-0">
                          <div 
                            className="h-full bg-blue-500 rounded-full transition-all duration-1000 group-hover:bg-blue-400" 
                            style={{ width: `${row.budgetPct * 2}%` }} 
                          />
                        </div>
                        <span className="text-lg font-bold text-slate-300">{row.budgetPct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Middle Row: Funnel & CAC/LTV */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pro-Tier Funnel */}
        <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <h3 className="text-xl font-bold font-display text-gray-900 mb-2">Pro-Tier Funnel — pro €100K Spend</h3>
          <p className="text-xs text-gray-400 mb-8 font-medium">Basis: CPC €8 · Markttypische Modell-Rates (Plausible Lesart)</p>
          
          <div className="space-y-6">
            {funnelMetrics.map((item, idx) => (
              <div key={item.label} className="flex justify-between items-center group">
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors">{item.label}</span>
                <span className="text-sm font-black text-gray-900 tracking-tight">{item.value}</span>
              </div>
            ))}
            
            <div className="pt-4 space-y-3">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center">
                <span className="text-sm font-bold text-emerald-900">Closed Won (20% SQLs)</span>
                <span className="text-lg font-black text-emerald-600">6.0</span>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center">
                <span className="text-sm font-bold text-emerald-900">New Pro ARR (€9.480/Jahr)</span>
                <span className="text-lg font-black text-emerald-600">€56.880</span>
              </div>
            </div>

            <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
              <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                <span className="font-bold">Blended CAC: €16.667</span> — liegt über dem hypothetischen Ziel-CAC von €6.530. Spricht für eine Korrektur durch Enterprise-Mix und Retargeting-Effizienz.
              </p>
            </div>
          </div>
        </div>

        {/* CAC & LTV:CAC nach Tarif */}
        <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <h3 className="text-xl font-bold font-display text-gray-900 mb-2">CAC & LTV:CAC nach Tarif</h3>
          <p className="text-xs text-gray-400 mb-8 font-medium">Aus Außensicht modellierte Economics · Excel-Modell v21</p>
          
          <div className="grid grid-cols-1 gap-4">
            {cacLtvData.map((item) => (
              <div key={item.tier} className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100/50 hover:border-blue-200 transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-full bg-blue-500/0 group-hover:bg-blue-500/5 transition-all skew-x-12 translate-x-12" />
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-black text-gray-900">{item.tier}</h4>
                      <span className="text-[10px] text-gray-400 font-medium">{item.price}</span>
                    </div>
                    <div className="flex gap-4 text-[10px] font-bold text-gray-500">
                      <span>CAC <span className="text-gray-900">{item.cac}</span></span>
                      <span>Payback <span className="text-gray-900">{item.payback}</span></span>
                      <span>LTV <span className="text-gray-900">{item.ltv}</span></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-blue-600">{item.ratio}</span>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div className={cn("h-full rounded-full", item.color)} style={{ width: `${(parseFloat(item.ratio) / 8) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marketing Investment Framework */}
      <div className="p-8 rounded-[32px] bg-white border border-gray-100 premium-shadow overflow-hidden relative">
        <h3 className="text-2xl font-black font-display mb-2 tracking-tight">Marketing Investment Framework</h3>
        <p className="text-sm text-gray-400 mb-10 font-medium whitespace-nowrap overflow-hidden">Plausibler Pfad von €1M → €100M ARR · Außensicht basierend auf Sales Expansion Scenario</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative items-stretch">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-gray-100 z-0" />
          
          {frameworkSteps.map((step, idx) => (
            <div key={step.title} className="relative z-10 group">
              <div className={cn("p-6 rounded-2xl border transition-all duration-300 group-hover:scale-[1.02] h-full", step.color)}>
                <span className="text-[11px] font-black text-gray-400 mb-1 block">{step.period}</span>
                <h4 className="text-sm font-black text-gray-900 mb-0.5">{step.title}</h4>
                <p className="text-xs font-black text-emerald-600 mb-3 tracking-tight">{step.range}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed font-bold">{step.tasks}</p>
              </div>
              {idx < 3 && (
                <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-white border border-gray-100 rounded-full items-center justify-center shadow-sm text-gray-300 z-20">
                  <ChevronRight size={14} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[11px] text-amber-800 leading-relaxed font-bold">
            <span className="uppercase tracking-widest text-[9px] text-amber-600 block mb-1">Modell-Caveat</span>
            Diese Rekonstruktion basiert auf einer Außensicht und öffentlich zugänglichen Inputs. Es handelt sich nicht um einen internen Forecast, sondern um ein Framework, das die Dynamik der Growth-Mechanismen veranschaulicht.
          </p>
        </div>
      </div>

      {/* Routing-Logik: Intent-Segmentierung */}
      <div className="p-10 rounded-[40px] bg-white border border-gray-100 premium-shadow">
        <h3 className="text-2xl font-black font-display mb-2 tracking-tight">Routing-Logik: Intent-Segmentierung</h3>
        <p className="text-sm text-gray-400 mb-12 font-medium">Zwei Pfade. Ein System. (Plausible Einordnung der GTM-Ebenen)</p>
        
        <div className="space-y-4">
          {/* Path 1: Trial-First */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 premium-shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
            <div className="flex flex-col xl:flex-row items-center gap-6 relative z-10">
              <div className="xl:w-64 shrink-0">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 block">Pfad 1</span>
                <h4 className="text-lg font-black text-gray-900">Trial-First (PLG)</h4>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">High-Intent · Basic / Pro</p>
              </div>

              <div className="flex-1 overflow-x-auto">
                <div className="flex items-center justify-start gap-3 min-w-max py-4">
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl min-w-[140px] text-center shadow-sm">
                    <p className="text-[11px] font-black text-gray-900 mb-1">High-Intent Ad</p>
                    <p className="text-[10px] text-gray-400 font-bold italic">z.B. "Shopify KI Berater"</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 shrink-0" />
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl min-w-[140px] text-center shadow-sm">
                    <p className="text-[11px] font-black text-gray-900 mb-1">Trial Landing Page</p>
                    <p className="text-[10px] text-gray-400 font-bold italic">Live in &lt; 10 Min.</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 shrink-0" />
                  <div className="p-5 bg-blue-600 rounded-2xl min-w-[160px] text-center shadow-xl shadow-blue-200">
                    <p className="text-[11px] font-black text-white mb-1">Testphase starten</p>
                    <p className="text-[10px] text-white/70 font-bold italic">Primäre Conversion</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 shrink-0" />
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl min-w-[140px] text-center shadow-sm">
                    <p className="text-[11px] font-black text-gray-900 mb-1">Aktivierung</p>
                    <p className="text-[10px] text-gray-400 font-bold italic">Widget ist live</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Path 2: Sales-Led */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 premium-shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
            <div className="flex flex-col xl:flex-row items-center gap-6 relative z-10">
              <div className="xl:w-64 shrink-0">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1 block">Pfad 2</span>
                <h4 className="text-lg font-black text-gray-900">Demo-First (Sales-Led)</h4>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Enterprise · ABM</p>
              </div>

              <div className="flex-1 overflow-x-auto">
                <div className="flex items-center justify-start gap-3 min-w-max py-4">
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl min-w-[140px] text-center shadow-sm">
                    <p className="text-[11px] font-black text-gray-900 mb-1">Omnichannel Ad</p>
                    <p className="text-[10px] text-gray-400 font-bold italic">z.B. "POS KI Terminal"</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 shrink-0" />
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl min-w-[140px] text-center shadow-sm">
                    <p className="text-[11px] font-black text-gray-900 mb-1">Demo Landing Page</p>
                    <p className="text-[10px] text-gray-400 font-bold italic">Proof + Sicherheit</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 shrink-0" />
                  <div className="p-5 bg-indigo-600 rounded-2xl min-w-[160px] text-center shadow-xl shadow-indigo-100">
                    <p className="text-[11px] font-black text-white mb-1">Demo buchen</p>
                    <p className="text-[10px] text-white/70 font-bold italic">Lead ins CRM</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 shrink-0" />
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl min-w-[140px] text-center shadow-sm">
                    <p className="text-[11px] font-black text-gray-900 mb-1">SQL / Pipeline</p>
                    <p className="text-[10px] text-gray-400 font-bold italic">Von Sales akzeptiert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MeasurementView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
  return (
    <div className="space-y-8">
      {/* Messrisiken */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold font-display ml-2">Messrisiken — was Wachstumsentscheidungen verzerrt</h3>
        <p className="text-sm text-gray-500 ml-2 max-w-3xl">
          Das Problem ist selten fehlende Daten. Es ist fast immer das falsche Signal.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { title: 'Plattform ≠ Business', desc: 'Plattform-Metriken sehen gut aus. Aber sie sind nicht die Scorecard. Paid Performance muss gegen CRM-Stufen und Umsatzrealität gespiegelt werden.' },
            { title: 'CRM-Disconnect', desc: 'Paid ohne CRM-Feedback optimiert auf billige Aktivität statt wertvolle Pipeline. Marketing wirkt effizient. Business-Qualität steigt nicht.' },
            { title: 'Lifecycle-Unschärfe', desc: 'Wenn Lead, MQL, SQL nicht klar definiert sind, wird Reporting politisch statt steuerbar. Gleiche Zahlen — unterschiedliche Deutungen.' },
            { title: 'Offline-Conversion-Blindheit', desc: 'Ohne Sales-Feedback lernen Plattformen nicht, was kommerzielle Qualität bedeutet. Das am leichtesten Messbare wird belohnt — nicht das Relevante.' },
            { title: 'Aktivität ≠ Umsatz', desc: 'Volumen ist nicht Qualität. Growth-Systeme degenerieren, wenn einfach zählbare Signale stärker belohnt werden als Revenue-Impact.' }
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h4 className="text-[10px] font-bold text-red-500 mb-2 uppercase tracking-wider">{item.title}</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Tracking is Strategic */}
      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 text-white premium-shadow">
        <h3 className="text-xl font-bold font-display mb-4">Tracking ist keine Reporting-Funktion.</h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          Bei homie ist Tracking die Voraussetzung für belastbare Wachstumsentscheidungen. Erst wenn Paid-Daten, CRM-Stufen und Sales-Feedback sauber zusammenlaufen, lässt sich erkennen, welche Nachfrage tatsächlich wirtschaftlichen Wert erzeugt.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Im Setup mit Trial- und Demo-Pfaden entscheidet Tracking, ob das System auf echte Kaufabsicht optimiert — oder nur auf sichtbare Aktivität. Messbarkeit ist Teil der Growth-Architektur. Nicht nachgelagert.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white border border-gray-100 premium-shadow flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-xl font-bold font-display mb-2">Measurement & Attribution Stack</h3>
            <p className="text-sm text-gray-500">Vier Ebenen. Eine Source of Truth.</p>
          </div>
          <div className="relative py-10 my-2 flex items-center justify-between px-8 z-10">
            {/* Connector Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 -translate-y-1/2 opacity-20" />
            {[
              { label: 'GTM + Consent', sub: 'Tag Management', icon: ShieldCheck, color: 'bg-emerald-500' },
              { label: 'GA4 Events', sub: 'Behaviour Layer', icon: Activity, color: 'bg-blue-500' },
              { label: 'HubSpot CRM', sub: 'Revenue Source', icon: Layers, color: 'bg-orange-500' },
              { label: 'Lead Dashboard', sub: 'Decisions', icon: LayoutDashboard, color: 'bg-indigo-500' }
            ].map((node, i) => (
              <div key={node.label} className="relative z-10 flex flex-col items-center">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4", node.color)}>
                  <node.icon size={32} />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{node.label}</span>
                <span className="text-[8px] text-gray-400 font-medium uppercase mt-1">{node.sub}</span>
              </div>
            ))}
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 mt-2">
            <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">Implementation Guidelines</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex gap-3 text-sm text-blue-800 items-start">
                <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <span>GA4 als primäre Verhaltens-Ebene. HubSpot als Single Source of Truth für Revenue-Attribution.</span>
              </li>
              <li className="flex gap-3 text-sm text-blue-800 items-start">
                <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <span>DSGVO-konforme Tags via Google Consent Mode v2 — lückenlos auf allen Pfaden.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 premium-shadow text-white">
          <h3 className="text-xl font-bold font-display mb-2">Tracking Sanity Check</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6">3/7 bestätigt · 4 Items zur Validierung in Woche 1–2</p>
          <div className="space-y-4">
            {[
              "GTM-Container auf allen Seiten geladen",
              "Consent Mode v2 standardmäßig verweigert",
              "GA4 Konfigurations-Tag feuert überall",
              "HubSpot Tracking-Code aktiv",
              "LinkedIn Insight Tag feuert bei Conversion",
              "Erweiterte Conversions in Ads aktiv",
              "Offline-Conversion-Import geplant"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="w-5 h-5 rounded border border-slate-700 flex items-center justify-center bg-slate-950">
                  {i < 3 && <CheckCircle2 size={12} className="text-blue-400/80" />}
                </div>
                <span className="text-xs font-medium text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 premium-shadow text-white">
        <h3 className="text-xl font-bold font-display mb-8">CRM Lifecycle & Funnel-Mapping</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
          {/* Connector Line (Horizontal) */}
          <div className="absolute top-8 left-0 w-full h-px bg-slate-800 hidden md:block" />
          {[
            { stage: 'Visitor', definition: 'Anonymer Website-Besucher. Tracking via GA4 + Consent Mode v2.' },
            { stage: 'Lead', definition: 'Trial gestartet oder Demo gebucht. Ins CRM übergeben.' },
            { stage: 'MQL', definition: 'Fit + Intent Score erfüllt. Von Marketing qualifiziert.' },
            { stage: 'SQL', definition: 'Von Sales akzeptiert. Aktive Pipeline-Opportunity.' },
            { stage: 'Customer', definition: 'Deal geschlossen. Übergabe an CS. Expansion-Tracking beginnt.' }
          ].map((stage, i) => (
            <div key={stage.stage} className="relative z-10 flex flex-col items-center text-center md:w-1/5 group">
              <div className="w-16 h-16 rounded-full bg-white text-slate-950 border-4 border-slate-800 shadow-sm flex items-center justify-center text-xl font-black group-hover:scale-110 transition-transform mb-4">
                {i + 1}
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-bold text-white mb-1">{stage.stage}</p>
                <p className="text-[10px] text-slate-400 leading-tight px-2 max-w-[140px]">{stage.definition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow flex flex-col h-full">
          <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-widest">Event-Taxonomie</h4>
          <div className="space-y-4 mb-6">
            {[
              { label: 'Intent-Besuch', value: 'view_enterprise' },
              { label: 'Primary Conv. (Trial)', value: 'start_free_trial' },
              { label: 'Primary Conv. (Demo)', value: 'book_demo' },
              { label: 'Product Action', value: 'chat_open' }
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center text-sm group">
                <span className="text-gray-600 font-medium">{item.label}</span>
                <span className="font-mono bg-gray-50 px-3 py-1 rounded-lg border border-gray-100 text-gray-500 transition-colors">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 mt-auto">
            <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Conversion Priority</p>
            <p className="text-xs text-blue-800 leading-relaxed">
              start_free_trial und book_demo sind primäre Conversion-Events. Alle anderen sind Supporting-Signals.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-blue-600 text-white shadow-xl flex flex-col h-full">
          <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Lead Scoring Rubrik</h4>
          <div className="space-y-6 flex-1">
            <div>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-[0.2em] mb-3">Fit Score — Firmografie</p>
              <div className="flex flex-wrap gap-2">
                {['Branche: Retail/DIY', 'Unternehmensgröße', 'Region: DACH'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white/10 rounded-xl text-[10px] font-bold border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-[0.2em] mb-3">Intent Score — Verhalten</p>
              <div className="flex flex-wrap gap-2">
                {['Enterprise-Seite besucht', 'Termin-CTA geklickt', 'Trial startet'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white/20 rounded-xl text-[10px] font-bold border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-[10px] font-bold text-blue-200 uppercase mb-2">MQL-Threshold</p>
            <p className="text-lg font-bold">Fit ≥ 2 Kriterien + Intent ≥ 1 Signal</p>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-[#0B1120] border border-slate-800 premium-shadow">
        <h3 className="text-xl font-bold font-display mb-8 text-white">Was wahr sein muss, damit Skalierung funktioniert</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { title: 'Signalqualität ist vertrauenswürdig', desc: 'Ohne belastbare Signale wird Skalierung teuer und unpräzise.' },
            { title: 'Qualität schlägt Volumen', desc: 'Mehr Leads helfen nicht, wenn sie nicht in tragfähige Pipeline übergehen.' },
            { title: 'Paid und CRM laufen zusammen', desc: 'Nur dann lässt sich erkennen, welche Akquisition wirklich Wert erzeugt.' },
            { title: 'Sales und CS halten mit', desc: 'Wächst nur Paid, verliert Wachstum Qualität und wird teurer.' },
            { title: 'Retention verbessert sich mit Scale', desc: 'Nicht nur Conversions — Expansion und Revenue-Qualität entscheiden über Tragfähigkeit.' }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-[#0f172a]/40 rounded-2xl border border-slate-800/60 shadow-inner flex flex-col justify-start">
              <h4 className="text-[10px] font-bold text-blue-400/80 mb-4 uppercase tracking-[0.15em] leading-relaxed">{item.title}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperimentsView({ onOpenEvidence, handlePrint }: { onOpenEvidence: (id: string) => void, handlePrint: () => void }) {
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [selectedExp, setSelectedExp] = useState<any>(null);

  const categories = ['Alle', 'Landing Page', 'Audience', 'Ad Creative', 'Retargeting', 'Bidding', 'ICP Expansion', 'Offline Conv.', 'Content'];

  const stats = [
    { label: 'GEPLANT', value: '6', sub: 'ab Woche 1', color: 'text-blue-600' },
    { label: 'BACKLOG', value: '2', sub: 'priorisierbar', color: 'text-purple-600' },
    { label: 'HIGH IMPACT', value: '5', sub: 'von 8', color: 'text-emerald-600' },
    { label: 'LOW EFFORT', value: '4', sub: 'schnell startbar', color: 'text-orange-500' },
  ];

  const filteredExperiments = activeCategory === 'Alle' 
    ? experimentsData 
    : experimentsData.filter((exp: any) => exp.category === activeCategory);

  return (
    <div className="space-y-8 pb-20">
      {/* Experiment-Logik Header */}
      <div className="p-10 rounded-[40px] bg-slate-950 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-6 font-display">
            Experiment-Logik
            <Citation id="1" onClick={onOpenEvidence} />
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed max-w-3xl mb-8 font-medium">
            Tests hier validieren nicht Conversion-Raten — sie validieren Signal-Qualität, ICP-Fit und Pipeline-Wert. 
            Ziel: Entscheidungsqualität verbessern — nicht Aktivität maximieren.
          </p>
          <div className="flex flex-wrap gap-4">
            {['Signal-Qualität zuerst', 'ICP-Fit validieren', 'Pipeline-Wert messen', 'Entscheidung verbessern'].map(tag => (
              <div key={tag} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" /> {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-100 premium-shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[10px] font-black text-gray-400 tracking-widest mb-1 uppercase">{stat.label}</p>
            <p className={cn("text-4xl font-black tracking-tighter", stat.color)}>{stat.value}</p>
            <p className="text-[11px] text-gray-400 mt-1 font-bold">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100/50 rounded-[24px] w-fit mx-2 border border-gray-200/50">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setSelectedExp(null); }}
            className={cn(
              "px-5 py-2.5 rounded-2xl text-[11px] font-black transition-all uppercase tracking-wider",
              activeCategory === cat ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-500 hover:bg-gray-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Experiment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
        <AnimatePresence mode="popLayout">
          {filteredExperiments.map((exp: any) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={exp.id}
              onClick={() => setSelectedExp(exp)}
              className={cn(
                "bg-white p-8 rounded-[40px] border border-gray-100 premium-shadow hover:border-blue-500/30 transition-all cursor-pointer group relative",
                selectedExp?.id === exp.id && "ring-2 ring-blue-600 border-transparent bg-blue-50/10"
              )}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{exp.id} • {exp.category}</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">{exp.status}</span>
                  <span className={cn("px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border", 
                    exp.priority === 'High' ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                  )}>{exp.priority}</span>
                </div>
              </div>
              <h4 className="text-lg font-black text-gray-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors">
                {exp.hypothesis}
              </h4>
              <div className="flex justify-between items-end border-t border-gray-50 pt-6">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">KPI</p>
                  <p className="text-xs font-bold text-gray-700">{exp.kpi}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Success</p>
                  <p className="text-xs font-black text-emerald-600">{exp.success}</p>
                </div>
              </div>

              {/* Detail Hint */}
              <div className="mt-6 flex items-center gap-2 text-[9px] font-black text-blue-500/60 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                ICE-Score & Details einblenden
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Expanded ICE Detail Modal/Card Content (Shows below grid) */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-12 p-10 md:p-12 rounded-[50px] bg-white border-2 border-blue-600 premium-shadow relative mx-2 shadow-2xl shadow-blue-200/40"
          >
            <button onClick={() => setSelectedExp(null)} className="absolute top-10 right-10 w-12 h-12 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-all flex items-center justify-center border border-gray-100">
              <X size={24} />
            </button>
            <div className="mb-10">
              <p className="text-xs font-black text-blue-600 uppercase tracking-[0.25em] mb-3">{selectedExp.id} — {selectedExp.category}</p>
              <h3 className="text-3xl font-black font-display mb-8 max-w-4xl leading-tight text-gray-900">{selectedExp.hypothesis}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { label: 'Zentraler KPI', val: selectedExp.kpi, icon: Target, color: 'text-gray-900' },
                { label: 'Erfolgskriterium', val: selectedExp.success, icon: CheckCircle2, color: 'text-emerald-600' },
                { label: 'Zeitraum', val: selectedExp.date, icon: Activity, color: 'text-blue-600' }
              ].map(item => (
                <div key={item.label} className="p-6 bg-gray-50 rounded-[32px] border border-gray-100/60 shadow-inner">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <item.icon size={14} className="opacity-40" /> {item.label}
                  </p>
                  <p className={cn("text-base font-black tracking-tight", item.color)}>{item.val}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-950 p-10 rounded-[40px] border border-slate-800 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -mr-32 -mt-32" />
              <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] font-black text-blue-400 tracking-[0.3em] uppercase">Priorisierungs-Signal (ICE Score)</p>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-black rounded-full border border-blue-500/30">
                    Confidence-Level: {selectedExp.confidence}%
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {[
                    { label: 'IMPACT', value: selectedExp.impact, color: 'bg-emerald-500', desc: 'Wirtschaftliche Hebelwirkung' },
                    { label: 'CONFIDENCE', value: selectedExp.confidence, color: 'bg-blue-500', desc: 'Evidenz für Erfolgshypothese' },
                    { label: 'EASE', value: selectedExp.ease, color: 'bg-amber-500', desc: 'Technische Umsetzbarkeit' },
                  ].map(bar => (
                    <div key={bar.label} className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-black text-white uppercase tracking-widest mb-0.5">{bar.label}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase">{bar.desc}</p>
                        </div>
                        <span className="text-lg font-black text-white">{bar.value}%</span>
                      </div>
                      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${bar.value}%` }} 
                          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                          className={cn("h-full rounded-full shadow-[0_0_15px_rgba(0,0,0,0.3)]", bar.color)} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex justify-end">
               <button 
                 onClick={() => onOpenEvidence(selectedExp.id)}
                 className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors"
               >
                 Evidenz & Quellen prüfen <ArrowRight size={14} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PerformanceMemo handlePrint={handlePrint} />
    </div>
  );
}

const PerformanceMemo = ({ handlePrint }: { handlePrint: () => void }) => (
  <div className="mx-4 p-12 rounded-[40px] bg-[#0B1120] border border-slate-800 premium-shadow mt-20 relative overflow-hidden group">
    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
    
    <div className="relative z-10">
      <div className="flex justify-between items-center mb-10">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block">TEMPLATE: WÖCHENTLICHES PERFORMANCE MEMO</span>
        <button 
          onClick={handlePrint}
          className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-blue-400 hover:bg-white/10 transition-all"
        >
          <Printer size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 1, title: 'Was hat sich geändert', content: '"CPL sank 15% in Search — aber SQL-Volumen blieb stabil."', color: 'bg-blue-500/10 text-blue-400', border: 'border-blue-500/20' },
          { id: 2, title: 'Warum (Hypothese)', content: '"Competitor-Bids ließen nach — wir fingen Queries mit geringerem Intent ein."', color: 'bg-indigo-500/10 text-indigo-400', border: 'border-indigo-500/20' },
          { id: 3, title: 'Next Steps (Maßnahme)', content: '"Negative Keyword-Liste erweitern + neue Enterprise-LP testen."', color: 'bg-emerald-500/10 text-emerald-400', border: 'border-emerald-500/20' }
        ].map((item) => (
          <div key={item.id} className={cn("p-8 rounded-[32px] bg-slate-900/40 border transition-all duration-300 hover:bg-slate-900/60 hover:scale-[1.02]", item.border)}>
             <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black mb-6", item.color)}>
              {item.id}
            </div>
            <h4 className={cn("text-base font-black mb-3", item.color.split(' ')[1])}>{item.title}</h4>
            <p className="text-sm italic text-slate-400 leading-relaxed font-medium">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);



function RoadmapView({ onOpenEvidence, handlePrint }: { onOpenEvidence: (id: string) => void, handlePrint: () => void }) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const phases = [
    {
      id: 1,
      tag: 'TAG 1-30',
      title: 'Wahrheit herstellen',
      subtitle: 'Audit. Alignment. Fundament.',
      goal: 'Erster attribuierbarer SQL',
      description: 'Tracking, CRM-Attribution und Paid-to-Pipeline prüfen. Klären, welche Signale für Qualität stehen und wo die Verbindung zwischen Plattform und Sales-Realität bricht.',
      deliverables: [
        { text: 'GA4 + Consent Mode v2 vollständig implementiert', icon: Layers },
        { text: 'HubSpot Lifecycle-Stufen definiert und live', icon: GitBranch },
        { text: 'Google Search Kampagne (High-Intent) aktiv', icon: Search },
        { text: 'Lead- und SQL-Definition mit Sales abgestimmt', icon: Users },
        { text: 'Erstes Weekly Performance Memo an Stakeholder', icon: BarChart3 }
      ],
      weekly: [
        { w: 'W1', task: 'Tracking-Audit: GTM, GA4, HubSpot' },
        { w: 'W2', task: 'Lead-Definition mit Sales klären' },
        { w: 'W3', task: 'Google Search live schalten' },
        { w: 'W4', task: 'Erstes Attribution-Reporting' }
      ],
      output: '“Ich weiß, was wir messen. Ich weiß, was davon zählt. Erste SQLs sind attribuiert.”',
      color: 'emerald'
    },
    {
      id: 2,
      tag: 'TAG 31-60',
      title: 'Qualität stabilisieren',
      subtitle: 'ICP. Routing. Feedback-Loops.',
      goal: '10+ SQLs / Monat',
      description: 'ICP-Logik schärfen, Routing verbessern, Feedback-Loops mit Sales aufbauen. Herausarbeiten, welche Kanäle die besten nachgelagerten Signale liefern.',
      deliverables: [
        { text: 'LinkedIn ABM Kampagne (Tier 1 Named Accounts) live', icon: Linkedin },
        { text: 'Meta Retargeting für Preisseiten-Besucher aktiv', icon: Instagram },
        { text: 'Lead-Scoring Rubrik implementiert in HubSpot', icon: Zap },
        { text: 'Erstes Vertical Playbook (DIY/Baumarkt) fertig', icon: FileText },
        { text: 'Sales-Feedback-Loop: wöchentliches SQL-Review', icon: MessageSquare }
      ],
      weekly: [
        { w: 'W5', task: 'LinkedIn ABM Tier 1 aufsetzen' },
        { w: 'W6', task: 'Lead-Scoring in HubSpot live' },
        { w: 'W7', task: 'Meta Retargeting schalten' },
        { w: 'W8', task: 'SQL-Review mit Sales etablieren' }
      ],
      output: '“SQL-Volumen ist stabil und vorhersehbar. Sales vertraut der Pipeline-Qualität.”',
      color: 'blue'
    },
    {
      id: 3,
      tag: 'TAG 61-90',
      title: 'Skalieren, was trägt',
      subtitle: 'ABM. CAC-Benchmarks. Wiederholbar.',
      goal: 'Vorhersehbare Pipeline',
      description: 'Spend nur dort ausweiten, wo Signal-, Lead-Qualität und Conversion-Pfad tragen. Reporting auf qualifizierte Pipeline und wirtschaftliche Wirkung ausrichten.',
      deliverables: [
        { text: 'ABM Sequenz Tier 2 (Category) live', icon: Target },
        { text: 'Offline-Conversion-Import in Google Ads aktiv', icon: Activity },
        { text: 'CAC-zu-ARR Benchmarks pro Kanal dokumentiert', icon: TrendingUp },
        { text: 'Erstes Experiment abgeschlossen und ausgewertet', icon: Rocket },
        { text: '90-Tage Reporting: Pipeline, CAC, SQL-Qualität', icon: LayoutDashboard }
      ],
      weekly: [
        { w: 'W9', task: 'ABM Tier 2 Kampagne starten' },
        { w: 'W10', task: 'Offline-Conversion-Import testen' },
        { w: 'W11', task: 'Experiment EXP-01 auswerten' },
        { w: 'W12', task: '90-Tage Report + Ausblick Q2' }
      ],
      output: '“Wir haben ein System. CAC-zu-ARR ist messbar. Paid ist kein Glücksspiel mehr.”',
      color: 'purple'
    }
  ];

  const togglePhase = (id: number) => {
    setExpandedPhase(expandedPhase === id ? null : id);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Top Card: Timeline & Goals */}
      <div className="p-10 rounded-[40px] bg-white border border-gray-100 premium-shadow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black font-display tracking-tight text-gray-900 mb-2">
              90-Tage Plan
              <Citation id="3" onClick={onOpenEvidence} />
            </h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide">Drei Phasen. Ein Ziel: vorhersehbare Pipeline.</p>
          </div>
          <div className="px-6 py-3 bg-amber-50 text-amber-900 rounded-full text-xs font-black uppercase tracking-widest border border-amber-100 shadow-sm whitespace-nowrap">
            Bereit zum Start
          </div>
        </div>

        {/* Horizontal Timeline Bar */}
        <div className="relative h-1 bg-gray-100 rounded-full mb-16 mx-4">
          <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full w-4 flex items-center justify-end">
            <div className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-50 shadow-sm" />
          </div>
          <div className="absolute -top-6 left-0 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tag 1</div>
          
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-200 border-4 border-white shadow-sm" />
          <div className="absolute -top-6 left-1/3 -translate-x-1/2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tag 30</div>
          
          <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-200 border-4 border-white shadow-sm" />
          <div className="absolute -top-6 left-2/3 -translate-x-1/2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tag 60</div>
          
          <div className="absolute top-1/2 left-[calc(100%-16px)] -translate-y-1/2 w-4 h-4 rounded-full bg-gray-200 border-4 border-white shadow-sm" />
          <div className="absolute -top-6 right-0 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tag 90</div>
        </div>

        {/* Goal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: 'TAG-30 ZIEL', goal: 'Erster attribuierbarer SQL', color: 'border-emerald-500 text-emerald-900', icon: CheckCircle2 },
            { tag: 'TAG-60 ZIEL', goal: '10+ SQLs / Monat', color: 'border-blue-500 text-blue-900', icon: TrendingUp },
            { tag: 'TAG-90 ZIEL', goal: 'Vorhersehbare Pipeline', color: 'border-purple-500 text-purple-900', icon: Zap }
          ].map((item, idx) => (
            <div key={idx} className={cn("p-6 rounded-3xl bg-gray-50/50 border-l-4 shadow-sm", item.color)}>
              <div className="flex items-center gap-2 mb-2">
                <item.icon size={14} className="opacity-40" />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{item.tag}</span>
              </div>
              <p className="text-sm font-black tracking-tight">{item.goal}</p>
            </div>
          ))}
        </div>
      </div>

      {/* vertical Timeline & Phases */}
      <div className="relative px-4">
        {/* vertical Line */}
        <div className="absolute left-[34px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 opacity-20" />

        <div className="space-y-6">
          {phases.map((phase) => (
            <div key={phase.id} className="relative pl-16">
              {/* Phase Number Indicator */}
              <div className={cn(
                "absolute left-0 top-6 w-9 h-9 rounded-full border-2 flex items-center justify-center font-black text-xs transition-all duration-500 z-10",
                expandedPhase === phase.id 
                  ? "bg-white border-blue-600 text-blue-600 shadow-lg scale-110" 
                  : "bg-gray-50 border-gray-200 text-gray-400"
              )}>
                {phase.id}
              </div>

              {/* Main Card */}
              <div 
                className={cn(
                  "p-8 rounded-[32px] bg-white border border-gray-100 premium-shadow-sm transition-all duration-300 cursor-pointer group",
                  expandedPhase === phase.id ? "shadow-xl ring-1 ring-blue-500/10" : "hover:bg-gray-50/50"
                )}
                onClick={() => togglePhase(phase.id)}
              >
                {/* Header Section */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <span className="px-3 py-1.5 bg-gray-50 text-[10px] font-black text-emerald-600 rounded-lg uppercase tracking-widest border border-gray-100">
                      {phase.tag}
                    </span>
                    <div>
                      <h3 className="text-2xl font-black font-display text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                        {phase.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium tracking-tight mt-0.5">{phase.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 self-end xl:self-center">
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ziel-KPI</span>
                      <p className={cn("text-xs font-black tracking-tight", `text-${phase.color}-600`)}>{phase.goal}</p>
                    </div>
                    <div className={cn(
                      "w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 transition-transform duration-300",
                      expandedPhase === phase.id ? "rotate-180" : "group-hover:translate-y-0.5"
                    )}>
                      <ChevronRight size={18} className="rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Pulsating Detail Hint (Only when closed) */}
                {expandedPhase !== phase.id && (
                   <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-blue-500/60 uppercase tracking-widest">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                     Details zum Plan einblenden
                   </div>
                )}

                {/* Collapsible Content */}
                <AnimatePresence>
                  {expandedPhase === phase.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-10 mt-8 border-t border-gray-50 space-y-10">
                        <p className="text-sm text-gray-500 leading-relaxed font-medium max-w-4xl">
                          {phase.description}
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                          {/* Deliverables Column */}
                          <div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Deliverables</h4>
                            <div className="space-y-3">
                              {phase.deliverables.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50/50 border border-gray-100 rounded-2xl group/item hover:bg-white hover:shadow-sm transition-all duration-300">
                                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400 group-hover/item:text-blue-500 shadow-sm transition-colors shrink-0">
                                    <item.icon size={18} />
                                  </div>
                                  <span className="text-sm font-bold text-gray-700 leading-snug">{item.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Weekly Focus Column */}
                          <div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Wöchentlicher Fokus</h4>
                            <div className="grid grid-cols-2 gap-4">
                              {phase.weekly.map((w, idx) => (
                                <div key={idx} className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm relative group/w overflow-hidden">
                                  <div className={cn("absolute top-0 left-0 w-full h-1", `bg-${phase.color}-500`)} />
                                  <span className={cn("text-[10px] font-black uppercase mb-1 block", `text-${phase.color}-600`)}>{w.w}</span>
                                  <p className="text-[11px] font-bold text-gray-500 leading-relaxed">{w.task}</p>
                                </div>
                              ))}
                            </div>

                            {/* Management Output Card */}
                            <div className="mt-8 p-6 rounded-3xl bg-emerald-50 border border-emerald-100 shadow-inner relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-12 -mt-12" />
                              <h5 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2 relative z-10">Management Output</h5>
                              <p className="text-sm font-black text-emerald-900 leading-relaxed relative z-10">
                                {phase.output}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PerformanceMemo handlePrint={handlePrint} />
    </div>
  );
}

