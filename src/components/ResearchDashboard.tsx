import React, { useState, useMemo, useEffect } from'react';
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
 Printer
} from'lucide-react';
import { motion, AnimatePresence } from'motion/react';
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
} from'recharts';
import { clsx, type ClassValue } from'clsx';
import { twMerge } from'tailwind-merge';

import companyData from'../data/company.json';
import icpsData from'../data/icps.json';
import competitorsData from'../data/competitors.json';
import paidPlanData from'../data/paidPlan.json';
import measurementData from'../data/measurement.json';
import roadmapData from'../data/roadmap.json';
import experimentsData from'../data/experiments.json';
import modelData from'../data/model.json';
import sourcesData from'../data/sources.json';

function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

type Section ='overview' |'market' |'icps' |'competitors' |'funnel' |'paid' |'measurement' |'roadmap' |'experiments';

const Citation = ({ id, onClick }: { id: string; onClick: (id: string) => void }) => (
 <span
 className="evidence-chip ml-1 align-top text-xs text-blue-500 cursor-pointer"
 onClick={(e) => {
 e.stopPropagation();
 onClick(id);
 }}
 >
 [{id}]
 </span>
);

export default function ResearchDashboard() {
 const [activeSection, setActiveSection] = useState<Section>('overview');
 const [motionType, setMotionType] = useState<'trial' |'demo'>('trial');
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
 { id:'overview', label:'Zusammenfassung', title:'Executive Summary', icon: LayoutDashboard },
 { id:'market', label:'Positionierung', title:'Marktpositionierung', icon: ShieldCheck },
 { id:'icps', label:'ICPs', title:'Ideale Kundenprofile & Messaging', icon: Users },
 { id:'competitors', label:'Wettbewerb', title:'Wettbewerbslandschaft', icon: Map },
 { id:'funnel', label:'GTM Funnel', title:'Go-to-Market Funnel & Routing', icon: Layers },
 { id:'paid', label:'Bezahlt', title:'Plan für bezahlte Akquise', icon: Zap },
 { id:'measurement', label:'Messung', title:'Messung & Attribution', icon: BarChart3 },
 { id:'experiments', label:'Experimente', title:'Experiment-Backlog & Testplan', icon: Zap },
 { id:'roadmap', label:'90-Tage Plan', title:'90-Tage Implementierungsplan', icon: Rocket },
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
 <div className="text-[22px] font-black tracking-tighter text-[#0F28FF] flex items-center leading-none" style={{ letterSpacing:'-0.05em' }}>
 homie<span className="text-gray-900 ml-1.5 text-[14px] font-bold tracking-tight" style={{ letterSpacing:'-0.01em' }}>Dossier</span>
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
 ?"bg-blue-50 text-blue-600"
 :"text-gray-500 hover:text-blue-600 hover:bg-blue-50"
 )}
 >
 <item.icon size={20} className={cn(activeSection === item.id ?"text-blue-600" :"group-hover:text-blue-600")} />
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
 {activeSection ==='overview' && <OverviewView onOpenEvidence={openEvidence} />}
 {activeSection ==='market' && <MarketView onOpenEvidence={openEvidence} />}
 {activeSection ==='icps' && <ICPsView onOpenEvidence={openEvidence} />}
 {activeSection ==='competitors' && <CompetitorsView onOpenEvidence={openEvidence} />}
 {activeSection ==='funnel' && <FunnelView onOpenEvidence={openEvidence} />}
 {activeSection ==='paid' && <PaidView onOpenEvidence={openEvidence} />}
 {activeSection ==='measurement' && <MeasurementView onOpenEvidence={openEvidence} />}
 {activeSection ==='experiments' && <ExperimentsView onOpenEvidence={openEvidence} />}
 {activeSection ==='roadmap' && <RoadmapView onOpenEvidence={openEvidence} />}
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
 initial={{ x:'100%' }}
 animate={{ x: 0 }}
 exit={{ x:'100%' }}
 transition={{ type:'spring', damping: 25, stiffness: 200 }}
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
      { label: 'Ziel-CAC (Trial)', value: '€80 – €150', badge: '+12% CVR durch Retargeting', icon: Zap },
      { label: 'Ziel-Aktivierungsrate', value: '25% – 40%', badge: 'Setup in < 10 Min.', icon: Activity },
      { label: 'Produkt-Impact', value: 'Assisted CVR Lift', badge: 'Metrik: Chat → Warenkorb', icon: TrendingUp },
    ]
    : [
      { label: 'Ziel-CPL (Demo)', value: '€200 – €600', badge: 'Via LinkedIn ABM / High-Intent Search', icon: MessageSquare },
      { label: 'Ziel-SQL-Rate', value: '30% – 50%', badge: 'Erfordert Offline-Conversion-Import', icon: Target },
      { label: 'Pipeline-Strategie', value: 'Multi-Touch-Attribution', badge: 'HubSpot Lifecycle Mapping', icon: BarChart3 },
    ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative p-12 rounded-3xl bg-homie-primary text-white overflow-hidden shadow-xl shadow-homie-primary/20">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-white/80 font-bold mb-4 uppercase tracking-widest text-sm">Management Summary</h2>
          <h1 className="text-5xl font-bold font-display mb-6 leading-tight text-white">
            homie Strategische Growth- &amp; Performance-Engine
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Eine Hochleistungs-Akquisitionsmaschine, konzipiert zur Erfassung von High-Intent-Nachfrage und zur Skalierung der Enterprise-Pipeline für den marktführenden KI-Shopping-Assistenten.
            <Citation id="1" onClick={onOpenEvidence} />
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10">
              <CheckCircle2 size={16} className="text-white" />
              <span className="text-sm font-medium">DSGVO-konform</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10">
              <CheckCircle2 size={16} className="text-white" />
              <span className="text-sm font-medium">Omnichannel bereit</span>
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
            Trial-Led Modell (PLG)
          </button>
          <button
            onClick={() => setActiveMotion('demo')}
            className={cn(
              "px-6 py-2 rounded-full font-bold text-sm transition-all",
              activeMotion === 'demo' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-gray-500 hover:bg-gray-200'
            )}
          >
            Sales-Led Modell (Enterprise)
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
            <Zap className="w-5 h-5 mr-2 text-yellow-500" /> Zusammenfassung
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>• Betrieb paralleler Trial- & Demo-Modelle, präzise segmentiert nach Intent-Stufen für maximale Conversion-Effizienz.<Citation id="3" onClick={onOpenEvidence} /></li>
            <li>• Maximale Nutzung des Tech-Stacks (Consent Mode v2, LinkedIn Insight Tag, HubSpot) für lückenloses Full-Funnel-Tracking und Attribution.<Citation id="4" onClick={onOpenEvidence} /></li>
            <li>• Strategische Kanalskalierung: Google Search (Demand Capture) → LinkedIn (ABM/Demand Generation) → Meta (High-Frequency Retargeting).</li>
          </ul>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <Rocket className="w-5 h-5 mr-2 text-homie-primary" /> Ziel nach 90 Tagen
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Ein skalierbares Paid-Growth-System: Stabiles Tracking, vorhersehbarer wöchentlicher SQL-Flow und erste CAC-zu-ARR Benchmarks als Basis für Skalierung.
          </p>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-emerald-400 via-blue-500 to-homie-primary rounded-full" />
          </div>
          <div className="flex justify-between text-[10px] mt-2 text-gray-400 font-bold uppercase tracking-wider">
            <span>Tag 1</span><span>Tag 30</span><span>Tag 60</span><span>Tag 90 ✓</span>
          </div>
        </div>
      </div>

      {/* Why this role is important now */}
      <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
        <h3 className="text-xl font-bold font-display mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2 text-homie-primary" /> Warum diese Rolle gerade jetzt wichtig ist
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Diese Rolle wirkt weniger wie eine reine Kanalmanagement-Funktion und mehr wie eine Schnittstelle zwischen Paid Acquisition, Revenue-Logik, Messbarkeit und Sales-Alignment.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Auch das breitere Hiring-Muster ist relevant. Mehrere Sales-Rollen, regionale Expansion und zusätzliche Produkt-/Tech-Rollen deuten darauf hin, dass homie in eine neue Go-to-Market-Phase eintritt. In diesem Kontext wird Paid & Performance weniger zu einer Kampagnenfunktion und mehr zu einem Baustein eines wirtschaftlich belastbaren Growth-Systems.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          Diese Rolle ist deshalb strategisch wichtig: nicht nur, um mehr Nachfrage zu erzeugen, sondern um sicherzustellen, dass Nachfrage, Signalqualität, Sales-Kapazität und Umsatz logik sauber zusammenlaufen.
        </p>
      </div>

      {/* Roadmap Snapshot */}
      <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Ausblick: 30 / 60 / 90 Tage</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[16.66%] w-[66.66%] h-0.5 bg-gray-200 z-0" />

          {[
            { day: '30', title: 'Fundament', desc: 'Tracking aktiv, erste SQLs attribuiert, Basis-Kampagnen in der Google-Suche laufen.', color: 'bg-emerald-500', ring: 'ring-emerald-100', text: 'text-emerald-700', badge: 'bg-emerald-50', kpi: 'Erster attribuierbarer SQL' },
            { day: '60', title: 'Skalierung', desc: 'Stabilisierung des SQL-Volumens, Retargeting aktiv, erste branchenspezifische Playbooks im Einsatz.', color: 'bg-blue-500', ring: 'ring-blue-100', text: 'text-blue-700', badge: 'bg-blue-50', kpi: '10+ SQLs / Monat' },
            { day: '90', title: 'System Live', desc: 'Wiederholbarer Growth-Engine – ABM erweitert, CAC-zu-ARR Benchmarks etabliert.', color: 'bg-indigo-500', ring: 'ring-indigo-100', text: 'text-indigo-700', badge: 'bg-indigo-50', kpi: 'Vorhersehbare Pipeline' }
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
        <h3 className="text-xl font-bold font-display mb-4">Research-Fazit</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Die Rolle wirkt weniger wie eine isolierte Kanalfunktion und mehr wie der Aufbau eines wirtschaftlich belastbaren Growth-Systems. Die wiederholte Betonung von Pipeline-Qualität, Attribution, CRM-Integration und Sales-Alignment deutet darauf hin, dass homie nicht nur mehr Akquisition, sondern bessere Signalqualität, bessere Entscheidungsqualität und tragfähigere Voraussetzungen für skalierbares Wachstum sucht.
        </p>
      </div>
    </div>
  );
}

function MarketView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
 const cardAccents = [
 { border:'border-t-blue-500', badge:'bg-blue-100 text-blue-800', label:'Fokus: E-Commerce' },
 { border:'border-t-purple-500', badge:'bg-purple-100 text-purple-800', label:'Skalierungs-Motor' },
 { border:'border-t-emerald-500', badge:'bg-emerald-100 text-emerald-800', label:'Omnichannel-Integration' },
 ];

 return (
 <div className="space-y-8">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {companyData.valueProps.map((prop, i) => (
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

 <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 md:p-10 shadow-xl">
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

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
 <h3 className="text-xl font-bold font-display mb-6">Differenzierungsstrategie</h3>
 <div className="space-y-4">
 {companyData.differentiation.map((item, i) => (
 <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
 <div className="w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 mt-0.5">
 <CheckCircle2 size={14} />
 </div>
 <p className="font-medium text-gray-700">{item}</p>
 </div>
 ))}
 </div>
 </div>
 <div className="p-8 rounded-3xl bg-blue-600 text-white overflow-hidden relative">
 <h3 className="text-xl font-bold font-display mb-6">Der homie-Vorteil</h3>
 <p className="text-gray-300 leading-relaxed mb-6">
 Im Gegensatz zu generischen Chatbots wurde homie speziell für die komplexen Anforderungen des Handels entwickelt. Es lässt sich direkt in PIM- und ERP-Systeme integrieren, um Bestands- und Preisdaten in Echtzeit zu liefern.
 </p>
 <div className="flex items-center gap-2 text-white/80 font-bold">
 <span>Mehr zum Tech-Stack erfahren</span>
 <ArrowRight size={16} />
 </div>
 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
 </div>
 </div>
 </div>
 );
}

function ICPsView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
 const [activeIcp, setActiveIcp] = useState(icpsData[0]);
 const [selectedNarrative, setSelectedNarrative] = useState(activeIcp.messaging[0]);

 useEffect(() => {
 setSelectedNarrative(activeIcp.messaging[0]);
 }, [activeIcp]);

 const generatedMessage = useMemo(() => {
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
 activeIcp.id === icp.id ?"bg-white shadow-sm text-blue-600" :"text-gray-500 hover:text-gray-700"
 )}
 >
 ICP {icp.id}: {icp.name.split('')[0]}
 </button>
 ))}
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <div className="lg:col-span-2 space-y-8">
 <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
 <div className="flex justify-between items-start mb-6">
 <div>
 <h3 className="text-2xl font-bold font-display mb-2">{activeIcp.name}</h3>
 <p className="text-gray-500">{activeIcp.firmographics}</p>
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
 ?"bg-blue-600 text-white border-blue-600"
 :"bg-white text-gray-500 border-gray-200 hover:border-gray-300"
 )}
 >
 {msg}
 </button>
 ))}
 </div>
 <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-blue-600">
 <p className="text-lg font-medium text-gray-800 leading-relaxed">
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
 {activeIcp.messaging.map((msg, i) => (
 <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
 <p className="text-sm font-bold text-blue-600 mb-1">Winkel {i + 1}</p>
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
 <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
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
 const [selectedCompetitor, setSelectedCompetitor] = useState<any>(null);

 return (
 <div className="space-y-8">
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {/* 2x2 Map */}
 <div className="lg:col-span-2 p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
 <div className="flex justify-between items-center mb-8">
 <h3 className="text-xl font-bold font-display">Positionierungskarte</h3>
 <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase">
 <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-600" /> homie</div>
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
 transform:'translate(-50%, 50%)'
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
 className="absolute w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-lg z-10"
 style={{ left:'85%', bottom:'85%', transform:'translate(-50%, 50%)' }}
 >
 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-blue-600 text-white rounded shadow-sm text-[10px] font-bold whitespace-nowrap">
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
 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">ICP Focus</h4>
 <p className="text-sm text-gray-600">{selectedCompetitor.icpFocus}</p>
 </div>
 <div className="p-4 bg-blue-600/5 border border-blue-600/10 rounded-2xl">
 <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Wie homie gewinnt</h4>
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
 <td className="py-4 font-bold text-blue-400">{comp.name}</td>
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
 const a = modelData.assumptions;

 // Explicit step-by-step computation (lead rate applies to engaged sessions)
 const engagedSessions = Math.round(a.sessions * a.engagementRate);
 const leads = Math.round(engagedSessions * a.leadRate);
 const mqls = Math.round(leads * a.mqlRate);
 const sqls = Math.round(mqls * a.sqlRate);
 const closedDealsExact = sqls * a.closeRate;
 const closedDeals = Math.round(closedDealsExact);
 const arrExact = closedDealsExact * a.avgArr;
 const arrRounded = Math.round(arrExact / 1000) * 1000;

 const funnelData = [
 { stage:'Paid Sessions', volume: a.sessions },
 { stage:'Engaged Sessions', volume: engagedSessions },
 { stage:'Leads (Trial+Demo)', volume: leads },
 { stage:'MQLs', volume: mqls },
 { stage:'SQLs', volume: sqls },
 { stage:'Closed Deals', volume: closedDeals },
 ];

 const funnelSteps = [
 { label:'Sitzungen', value: a.sessions.toLocaleString(), note:'Sitzungen insgesamt (Paid)' },
 { label:'Interaktionen', value: engagedSessions.toLocaleString(), note: `${(a.engagementRate * 100).toFixed(0)}% der Sitzungen` },
 { label:'Leads', value: leads.toLocaleString(), note: `${(a.leadRate * 100).toFixed(0)}% der Interaktionen` },
 { label:'MQLs', value: mqls.toLocaleString(), note: `${(a.mqlRate * 100).toFixed(0)}% der Leads` },
 { label:'SQLs', value: sqls.toLocaleString(), note: `${(a.sqlRate * 100).toFixed(0)}% der MQLs` },
 { label:'Abschlüsse', value: `${closedDealsExact.toFixed(1)} (~${closedDeals})`, note: `${(a.closeRate * 100).toFixed(0)}% der SQLs` },
 { label:'Monatlicher ARR', value: `€${arrExact.toLocaleString()} (~€${arrRounded.toLocaleString()})`, note: `Abschlüsse × €${a.avgArr.toLocaleString()} Ø ARR` },
 ];
 const data = funnelData;

 return (
 <div className="space-y-8">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 premium-shadow text-white">
 <h3 className="text-xl font-bold font-display mb-8">Wachstums-Funnel (Szenario: Basis)</h3>
 <div className="h-[400px]">
 <ResponsiveContainer width="100%" height="100%">
 <BarChart
 layout="vertical"
 data={data}
 margin={{ top: 5, right: 30, left: 130, bottom: 5 }}
 >
 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#475569" strokeOpacity={0.5} />
 <XAxis type="number" hide />
 <YAxis
 dataKey="stage"
 type="category"
 axisLine={false}
 tickLine={false}
 tick={{ fontSize: 11, fontWeight: 700, fill:'#ffffff' }}
 width={125}
 />
 <Tooltip
 cursor={{ fill:'#0f172a' }}
 contentStyle={{ backgroundColor:'#020617', borderRadius:'12px', border:'1px solid #1e293b', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.3)' }}
 itemStyle={{ color:'#fff' }}
 />
 <Bar dataKey="volume" radius={[0, 8, 8, 0]}>
 {data.map((_, index) => (
 <Cell key={`cell-${index}`} fill={index < 3 ?'#10B981' :'#3b82f6'} fillOpacity={1 - index * 0.1} />
 ))}
 </Bar>
 </BarChart>
 </ResponsiveContainer>
 </div>
 </div>

 <div className="space-y-6">
 <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
 <h3 className="text-xl font-bold font-display mb-6">Pipeline-Annahmen</h3>
 <div className="grid grid-cols-2 gap-4">
 {([
 { key:'Sitzungen', val: a.sessions.toLocaleString() },
 { key:'Interaktionsrate', val: `${(a.engagementRate * 100).toFixed(0)}%` },
 { key:'Lead-Rate', val: `${(a.leadRate * 100).toFixed(0)}%` },
 { key:'MQL-Rate', val: `${(a.mqlRate * 100).toFixed(0)}%` },
 { key:'SQL-Rate', val: `${(a.sqlRate * 100).toFixed(0)}%` },
 { key:'Abschlussrate', val: `${(a.closeRate * 100).toFixed(0)}%` },
 { key:'Ø ARR', val: `€${a.avgArr.toLocaleString()}` },
 ] as { key: string; val: string }[]).map(({ key, val }) => (
 <div key={key} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{key}</p>
 <p className="text-xl font-bold text-blue-600">{val}</p>
 </div>
 ))}
 </div>
 <p className="mt-4 text-[10px] text-gray-400 italic">
 Modell: Basis-Szenario – Die Lead-Rate bezieht sich auf die Interaktionen.
 </p>
 </div>

 <div className="p-8 rounded-3xl bg-blue-600 text-white">
 <h3 className="text-xl font-bold font-display mb-6">Prognostizierte Ergebnisse</h3>
 <div className="flex justify-between items-end">
 <div>
 <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Zusätzlicher monatlicher ARR</p>
 <p className="text-4xl font-bold text-white">€{arrRounded.toLocaleString()}</p>
 <p className="text-xs text-white/50 mt-1">Exakt: €{arrExact.toLocaleString()}</p>
 </div>
 <div className="text-right">
 <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Abschlüsse / Monat</p>
 <p className="text-xl font-bold">~{closedDeals}</p>
 <p className="text-xs text-white/50 mt-1">{closedDealsExact.toFixed(1)} exakt</p>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Funnel Model Detail Table */}
 <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
 <h3 className="text-xl font-bold font-display mb-6">Funnel-Details</h3>
 <div className="overflow-x-auto">
 <table className="w-full text-left">
 <thead>
 <tr className="border-b border-gray-100">
 <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-widest">Stufe</th>
 <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Anzahl / Wert</th>
 <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-widest">Basis</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50">
 {funnelSteps.map(({ label, value, note }) => (
 <tr key={label} className="hover:bg-gray-50 transition-colors">
 <td className="py-3 font-bold text-gray-800">{label}</td>
 <td className="py-3 pr-8 font-mono font-bold text-blue-600 text-right">{value}</td>
 <td className="py-3 text-sm text-gray-500 italic">{note}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 {/* Dual Path Visualization */}
 <div className="space-y-4">
 <h3 className="text-xl font-bold font-display ml-2">Routing-Logik nach Intent-Stufen. <Citation id="3" onClick={onOpenEvidence} /></h3>

 {/* Path 1: PLG */}
 <div className="p-6 rounded-2xl bg-white border border-gray-100 premium-shadow relative overflow-hidden group">
 <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
 <div className="flex flex-col md:flex-row items-center gap-4 relative z-10">
 <div className="md:w-64">
 <h4 className="font-bold text-gray-900">Pfad 1: PLG / Trial-Led Modell</h4>
 </div>

 <div className="flex-1 flex flex-wrap items-center gap-3">
 <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl min-w-[140px]">
 <p className="text-[10px] font-bold text-gray-900 mb-1">High-Intent Anzeige</p>
 <p className="text-[10px] text-gray-400 italic">z.B.'Shopify KI Berater'</p>
 </div>
 <ChevronRight size={16} className="text-gray-200" />
 <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl min-w-[140px]">
 <p className="text-[10px] font-bold text-gray-900 mb-1">Trial-First Landingpage</p>
 <p className="text-[10px] text-gray-400 italic">Live in wenigen Minuten</p>
 </div>
 <ChevronRight size={16} className="text-gray-200" />
 <div className="bg-blue-600 p-3 rounded-xl min-w-[140px] shadow-lg shadow-blue-600/20">
 <p className="text-[10px] font-bold text-white mb-1">Testphase starten</p>
 <p className="text-[10px] text-white/50 italic">Primäre Conversion</p>
 </div>
 <ChevronRight size={16} className="text-gray-200" />
 <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl min-w-[140px]">
 <p className="text-[10px] font-bold text-gray-900 mb-1">Aktivierung</p>
 <p className="text-[10px] text-gray-400 italic">Widget ist live</p>
 </div>
 </div>

 <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
 <Activity size={80} />
 </div>
 </div>
 </div>

 {/* Path 2: Sales-Led */}
 <div className="p-6 rounded-2xl bg-white border border-gray-100 premium-shadow relative overflow-hidden group">
 <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
 <div className="flex flex-col md:flex-row items-center gap-4 relative z-10">
 <div className="md:w-64">
 <h4 className="font-bold text-gray-900">Pfad 2: Sales-Led Enterprise Modell</h4>
 </div>

 <div className="flex-1 flex flex-wrap items-center gap-3">
 <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl min-w-[140px]">
 <p className="text-[10px] font-bold text-gray-900 mb-1">Omnichannel Anzeige</p>
 <p className="text-[10px] text-gray-400 italic">z.B.'POS KI Terminal'</p>
 </div>
 <ChevronRight size={16} className="text-gray-200" />
 <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl min-w-[140px]">
 <p className="text-[10px] font-bold text-gray-900 mb-1">Demo-First Landingpage</p>
 <p className="text-[10px] text-gray-400 italic">Proof + Sicherheit</p>
 </div>
 <ChevronRight size={16} className="text-gray-200" />
 <div className="bg-indigo-600 p-3 rounded-xl min-w-[140px] shadow-lg shadow-indigo-600/20">
 <p className="text-[10px] font-bold text-white mb-1">Demo buchen</p>
 <p className="text-[10px] text-white/50 italic">Lead-Erfassung im CRM</p>
 </div>
 <ChevronRight size={16} className="text-gray-200" />
 <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl min-w-[140px]">
 <p className="text-[10px] font-bold text-gray-900 mb-1">SQL / Pipeline</p>
 <p className="text-[10px] text-gray-400 italic">Vom Vertrieb akzeptiert</p>
 </div>
 </div>

 <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
 <svg viewBox="0 0 24 24" className="w-[80px] h-[80px] fill-current" xmlns="http://www.w3.org/2000/svg">
 <path d="M3 21h18v-2H3v2zm2-4h1v-4H5v4zm4 0h1v-4H9v4zm4 0h1v-4h-1v4zm4 0h1v-4h-1v4zM5 11h14V9L12 3 5 9v2z" />
 </svg>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}

function PaidView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
 return (
 <div className="space-y-8">
 <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
 <h3 className="text-xl font-bold font-display mb-6">Budget-Allokation (Q1)</h3>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {paidPlanData.channels.map((channel) => (
 <div key={channel.name} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
 <div className="flex justify-between items-center mb-4">
 <h4 className="font-bold text-gray-900">{channel.name}</h4>
 <span className="text-sm font-bold text-blue-600">{channel.allocation}</span>
 </div>
 <p className="text-sm text-gray-600 mb-4">{channel.focus}</p>
 <div className="space-y-2">
 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ziel-KPIs</p>
 {channel.kpis.map(kpi => (
 <div key={kpi} className="flex items-center gap-2 text-sm text-gray-700">
 <Target size={14} className="text-blue-500" />
 {kpi}
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
 <h3 className="text-xl font-bold font-display mb-6">Kampagnen-Struktur</h3>
 <div className="space-y-4">
 {paidPlanData.campaigns.map((camp, i) => (
 <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
 <div className="flex items-center gap-3 mb-2">
 <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">
 {camp.type}
 </span>
 <h4 className="font-bold text-gray-900">{camp.name}</h4>
 </div>
 <p className="text-sm text-gray-600">{camp.description}</p>
 </div>
 ))}
 </div>
 </div>

 <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 premium-shadow text-white">
 <h3 className="text-xl font-bold font-display mb-6">Retargeting-Logik</h3>
 <div className="space-y-6">
 <div className="relative pl-6 border-l-2 border-slate-800">
 <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5" />
 <h4 className="font-bold mb-1">Besucher (Kein Intent)</h4>
 <p className="text-sm text-slate-400">Ausschluss aus Performance-Kampagnen nach 3 Tagen ohne Interaktion.</p>
 </div>
 <div className="relative pl-6 border-l-2 border-slate-800">
 <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1.5" />
 <h4 className="font-bold mb-1">Pricing-Page Besucher</h4>
 <p className="text-sm text-slate-400">Retargeting via LinkedIn mit Case Studies (Social Proof).</p>
 </div>
 <div className="relative pl-6 border-l-2 border-slate-800">
 <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1.5" />
 <h4 className="font-bold mb-1">Abgebrochener Trial-Signup</h4>
 <p className="text-sm text-slate-400">Aggressives Retargeting via Meta/Google Display (Setup-Hilfe anbieten).</p>
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
 <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
 <h3 className="text-xl font-bold font-display mb-6">Tech-Stack &amp; Datenfluss</h3>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {measurementData.stack.map((item) => (
 <div key={item.tool} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
 <h4 className="font-bold text-gray-900 mb-2">{item.tool}</h4>
 <p className="text-sm text-gray-600 mb-4">{item.purpose}</p>
 <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
 Status: {item.status}
 </div>
 </div>
 ))}
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
 <h3 className="text-xl font-bold font-display mb-6">Attributions-Modell</h3>
 <div className="space-y-4">
 {measurementData.attribution.map((attr, i) => (
 <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
 <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mt-0.5">
 <CheckCircle2 size={14} />
 </div>
 <div>
 <h4 className="font-bold text-gray-900 text-sm mb-1">{attr.stage}</h4>
 <p className="text-sm text-gray-600">{attr.model}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 <div className="p-8 rounded-3xl bg-blue-600 text-white premium-shadow">
 <h3 className="text-xl font-bold font-display mb-6">Offline Conversion Tracking (OCT)</h3>
 <p className="text-white/90 leading-relaxed mb-6 text-sm">
 Der Schlüssel zur Skalierung von B2B-Kampagnen. Anstatt Algorithmen auf"Leads" (Formular-Fills) zu optimieren, senden wir qualifizierte Pipeline-Stufen (MQL, SQL) aus HubSpot an Google/LinkedIn Ads zurück.
 </p>
 <div className="space-y-3">
 <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
 <ArrowRight size={16} className="text-blue-200" />
 <span className="text-sm font-medium">HubSpot Lifecycle Stage ändert sich</span>
 </div>
 <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
 <ArrowRight size={16} className="text-blue-200" />
 <span className="text-sm font-medium">Webhook / Native Integration feuert</span>
 </div>
 <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
 <ArrowRight size={16} className="text-blue-200" />
 <span className="text-sm font-medium">Ad-Netzwerk optimiert auf Qualität</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}

function ExperimentsView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
 return (
 <div className="space-y-8">
 <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
 <h3 className="text-xl font-bold font-display mb-6">Growth Experimente Backlog</h3>
 <div className="space-y-4">
 {experimentsData.map((exp) => (
 <div key={exp.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6">
 <div className="md:w-1/4">
 <div className="flex items-center gap-2 mb-2">
 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{exp.id}</span>
 <span className={cn(
"px-2 py-0.5 text-[10px] font-bold rounded uppercase",
 exp.status ==='Geplant' ?'bg-blue-100 text-blue-700' :'bg-gray-200 text-gray-600'
 )}>
 {exp.status}
 </span>
 </div>
 <h4 className="font-bold text-gray-900">{exp.name}</h4>
 </div>
 <div className="md:w-1/2">
 <p className="text-sm text-gray-600 mb-2">{exp.hypothesis}</p>
 <div className="flex gap-2">
 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Metrik:</span>
 <span className="text-[10px] font-bold text-gray-700">{exp.metric}</span>
 </div>
 </div>
 <div className="md:w-1/4 flex flex-col justify-center">
 <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Aufwand / Impact</div>
 <div className="flex gap-1">
 {[...Array(5)].map((_, i) => (
 <div key={i} className={cn("w-full h-1.5 rounded-full", i < (exp.id ==='EXP-01' ? 4 : 3) ?"bg-blue-500" :"bg-gray-200")} />
 ))}
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}

function RoadmapView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
 return (
 <div className="space-y-8">
 <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
 <h3 className="text-xl font-bold font-display mb-8">90-Tage Implementierungsplan</h3>
 <div className="relative">
 {/* Timeline Line */}
 <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-200" />

 <div className="space-y-8">
 {roadmapData.map((phase, i) => (
 <div key={phase.phase} className="relative pl-16">
 <div className="absolute left-0 top-1 w-14 h-14 rounded-2xl bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 font-black text-lg z-10 shadow-sm">
 {i + 1}
 </div>
 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
 <div className="flex justify-between items-start mb-4">
 <div>
 <h4 className="text-lg font-bold text-gray-900 mb-1">{phase.phase}</h4>
 <p className="text-sm text-blue-600 font-medium">{phase.focus}</p>
 </div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Key Deliverables</p>
 <ul className="space-y-2">
 {phase.deliverables.map(item => (
 <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
 <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>
 <div>
 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Erwartetes Ergebnis</p>
 <div className="p-3 bg-white rounded-xl border border-gray-100 text-sm text-gray-700 font-medium">
 {phase.outcome}
 </div>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 );
}
