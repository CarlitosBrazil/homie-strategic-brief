/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

// Data Imports
import companyData from './data/company.json';
import icpsData from './data/icps.json';
import competitorsData from './data/competitors.json';
import paidPlanData from './data/paidPlan.json';
import measurementData from './data/measurement.json';
import roadmapData from './data/roadmap.json';
import experimentsData from './data/experiments.json';
import modelData from './data/model.json';
import sourcesData from './data/sources.json';

// Utility for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Types
type Section = 'overview' | 'market' | 'icps' | 'competitors' | 'funnel' | 'paid' | 'measurement' | 'roadmap' | 'experiments';

interface Source {
  id: string;
  label: string;
  url: string;
  note: string;
}

// Components
const Citation = ({ id, onClick }: { id: string; onClick: (id: string) => void }) => (
  <span
    className="evidence-chip ml-1 align-top"
    onClick={(e) => {
      e.stopPropagation();
      onClick(id);
    }}
  >
    {id}
  </span>
);

const EvidenceDrawer = ({
  isOpen,
  onClose,
  sourceId
}: {
  isOpen: boolean;
  onClose: () => void;
  sourceId: string | null
}) => {
  const source = sourcesData.find(s => s.id === sourceId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 p-8 overflow-y-auto border-l border-gray-100"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-display font-bold">Quellennachweis</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <X size={20} />
              </button>
            </div>

            {source ? (
              <div className="space-y-6">
                <div className="p-4 bg-homie-primary/5 border border-homie-primary/10 rounded-xl">
                  <p className="text-xs font-bold text-homie-primary uppercase tracking-wider mb-2">Quellenangabe</p>
                  <h4 className="text-lg font-bold mb-2">{source.label}</h4>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    Originalquelle ansehen <ExternalLink size={12} />
                  </a>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Analysten-Kommentar</p>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 italic text-gray-600 text-sm">
                    "{source.note}"
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Konfidenz-Score</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= 4 ? "bg-homie-primary" : "bg-gray-200")} />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">Hohe Konfidenz: Verifiziert durch öffentliche Primärquellen.</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400">
                <span className="mx-auto mb-4 opacity-20"><Info size={40} /></span>
                <p>Wählen Sie ein Quellen-Symbol aus, um Belege anzuzeigen.</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
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
    { id: 'overview', label: 'Zusammenfassung', title: 'Management Summary', icon: LayoutDashboard },
    { id: 'market', label: 'Positionierung', title: 'Marktpositionierung', icon: ShieldCheck },
    { id: 'icps', label: 'ICPs', title: 'Ideale Kundenprofile & Messaging', icon: Users },
    { id: 'competitors', label: 'Wettbewerb', title: 'Wettbewerbslandschaft', icon: Map },
    { id: 'funnel', label: 'GTM-Funnel', title: 'Go-to-Market Funnel & Routing', icon: Layers },
    { id: 'paid', label: 'Akquise', title: 'Plan für bezahlte Akquise', icon: Zap },
    { id: 'measurement', label: 'Messung', title: 'Messung & Attribution', icon: BarChart3 },
    { id: 'experiments', label: 'Experimente', title: 'Experiment-Backlog & Testplan', icon: Zap },
    { id: 'roadmap', label: '90-Tage Plan', title: '90-Tage Implementierungsplan', icon: Rocket },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-homie-bg">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-gray-100 flex flex-col z-30 relative"
      >
        <div className="p-6 flex items-center gap-3">
          {/* Inline SVG logo - no external dependency */}
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
                  ? "bg-homie-primary/5 text-homie-primary"
                  : "text-gray-500 hover:text-homie-primary hover:bg-homie-primary/5"
              )}
            >
              <item.icon size={20} className={cn(activeSection === item.id ? "text-homie-primary" : "group-hover:text-homie-primary")} />
              {isSidebarOpen && <span className="font-bold">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className={cn("flex items-center gap-3", !isSidebarOpen && "justify-center")}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-homie-primary" />
            {isSidebarOpen && (
              <div>
                <p className="text-xs font-bold text-homie-text">Analyst</p>
                <p className="text-[10px] text-gray-400">Wachstumsstrategie</p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-black shadow-sm z-40"
        >
          {isSidebarOpen ? <ChevronRight size={14} className="rotate-180" /> : <ChevronRight size={14} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-20 px-8 py-4 flex justify-between items-center print:hidden">
          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Research-Dossier</h2>
            <h1 className="text-2xl font-bold font-display">
              {navItems.find(n => n.id === activeSection)?.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:text-homie-primary hover:border-homie-primary transition-all"
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
              {activeSection === 'experiments' && <ExperimentsView onOpenEvidence={openEvidence} />}
              {activeSection === 'roadmap' && <RoadmapView onOpenEvidence={openEvidence} />}
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
          Diese Rolle ist deshalb strategisch wichtig: nicht nur, um mehr Nachfrage zu erzeugen, sondern um sicherzustellen, dass Nachfrage, Signalqualität, Sales-Kapazität und Umsatzlogik sauber zusammenlaufen.
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
        <h3 className="text-xl font-bold font-display ml-2">Wahrscheinliche GTM-Friktionen bei homie</h3>
        <p className="text-sm text-gray-500 ml-2 max-w-3xl">
          Auf Basis der Stellenausschreibung, der öffentlichen Positionierung und des breiteren Hiring-Musters sind dies die wahrscheinlichsten Wachstumsfriktionen, die diese Rolle adressieren soll.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { title: 'Pipeline-Vertrauenslücke', desc: 'Es gibt wahrscheinlich bereits Marketing-Aktivität, aber die eigentliche Frage ist, wie belastbar ihr Beitrag zur Pipeline wirklich messbar ist. Die Rolle deutet darauf hin, dass nicht nur Reichweite oder Leads zählen, sondern eine wirtschaftlich vertrauenswürdige Sicht auf Pipeline-Impact.' },
            { title: 'Lead-Qualitäts-Mismatch', desc: 'Die wiederholte Betonung von SQL-Qualität, Lead Scoring und Feedback-Loops mit Sales spricht dafür, dass Qualität wichtiger ist als bloßes Volumen. Das deutet auf eine mögliche Lücke zwischen Marketing-Erfolg und Vertriebserfolg hin.' },
            { title: 'Attribution nicht entscheidungsreif', desc: 'Tracking scheint wichtig zu sein, ist aber vermutlich noch nicht so sauber mit CRM, Sales-Outcome und kommerziellem Wert verbunden, dass darauf mit voller Sicherheit skaliert werden kann. Die Herausforderung ist nicht nur Datenerfassung, sondern Entscheidungsreife.' },
            { title: 'Skalierung ohne Prozessdisziplin', desc: 'Die Rolle verlangt mehr als Kampagnensteuerung. Sie verlangt Struktur: KPI-Logik, Testing-Disziplin, klare Reporting-Muster und wiederholbare Best Practices. Das spricht für einen Bedarf an operativer Schärfung, bevor Wachstum wirklich planbar wird.' },
            { title: 'Kapazitäts-Koordinationslücke', desc: 'Paid kann nur so gut skalieren, wie Sales und Customer Success nachgelagert mithalten. Wenn Akquisition, Vertrieb und Betreuung nicht im gleichen Takt wachsen, wird Wachstum schnell teurer und qualitativ schwächer.' }
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
            {companyData.differentiation.map((item, i) => (
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
            homie übertrifft generische Chatbots durch eine spezialisierte Architektur für den Handel. Die native Integration in PIM- und ERP-Systeme ermöglicht die Bereitstellung von Bestands- und Preisdaten in Echtzeit – ein entscheidender Wettbewerbsvorteil.
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
                        ? "bg-homie-primary text-white border-homie-primary"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                    )}
                  >
                    {msg}
                  </button>
                ))}
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-homie-primary">
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
    { stage: 'Paid-Sitzungen', volume: a.sessions },
    { stage: 'Engaged-Sitzungen', volume: engagedSessions },
    { stage: 'Leads (Trial+Demo)', volume: leads },
    { stage: 'MQLs', volume: mqls },
    { stage: 'SQLs', volume: sqls },
    { stage: 'Closed Deals', volume: closedDeals },
  ];

  const funnelSteps = [
    { label: 'Sitzungen', value: a.sessions.toLocaleString(), note: 'Sitzungen insgesamt (Paid)' },
    { label: 'Interaktionen', value: engagedSessions.toLocaleString(), note: `${(a.engagementRate * 100).toFixed(0)}% der Sitzungen` },
    { label: 'Leads', value: leads.toLocaleString(), note: `${(a.leadRate * 100).toFixed(0)}% der Interaktionen` },
    { label: 'MQLs', value: mqls.toLocaleString(), note: `${(a.mqlRate * 100).toFixed(0)}% der Leads` },
    { label: 'SQLs', value: sqls.toLocaleString(), note: `${(a.sqlRate * 100).toFixed(0)}% der MQLs` },
    { label: 'Abschlüsse', value: `${closedDealsExact.toFixed(1)} (~${closedDeals})`, note: `${(a.closeRate * 100).toFixed(0)}% der SQLs` },
    { label: 'Monatlicher ARR', value: `€${arrExact.toLocaleString()} (~€${arrRounded.toLocaleString()})`, note: `Abschlüsse × €${a.avgArr.toLocaleString()} Ø ARR` },
  ];
  const data = funnelData;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 premium-shadow text-white">
          <h3 className="text-xl font-bold font-display mb-8">Growth-Funnel: Strategisches Basis-Szenario</h3>
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
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#ffffff' }}
                  width={125}
                />
                <Tooltip
                  cursor={{ fill: '#0f172a' }}
                  contentStyle={{ backgroundColor: '#020617', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="volume" radius={[0, 8, 8, 0]}>
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index < 3 ? '#10B981' : '#3b82f6'} fillOpacity={1 - index * 0.1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
            <h3 className="text-xl font-bold font-display mb-6">Strategische Pipeline-Parameter</h3>
            <div className="grid grid-cols-2 gap-4">
              {([
                { key: 'Sitzungen', val: a.sessions.toLocaleString() },
                { key: 'Interaktionsrate', val: `${(a.engagementRate * 100).toFixed(0)}%` },
                { key: 'Lead-Rate', val: `${(a.leadRate * 100).toFixed(0)}%` },
                { key: 'MQL-Rate', val: `${(a.mqlRate * 100).toFixed(0)}%` },
                { key: 'SQL-Rate', val: `${(a.sqlRate * 100).toFixed(0)}%` },
                { key: 'Abschlussrate', val: `${(a.closeRate * 100).toFixed(0)}%` },
                { key: 'Ø ARR', val: `€${a.avgArr.toLocaleString()}` },
              ] as { key: string; val: string }[]).map(({ key, val }) => (
                <div key={key} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{key}</p>
                  <p className="text-xl font-bold text-homie-primary">{val}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[10px] text-gray-400 italic">
              Modell: Basis-Szenario – Die Lead-Rate bezieht sich auf die Interaktionen.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-homie-primary text-white">
            <h3 className="text-xl font-bold font-display mb-6">Projizierte Performance-Outcomes</h3>
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
                  <td className="py-3 pr-8 font-mono font-bold text-homie-primary text-right">{value}</td>
                  <td className="py-3 text-sm text-gray-500 italic">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paid Performance as Revenue System */}
      <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
        <h3 className="text-lg font-bold mb-4">Paid Performance als Revenue-System</h3>
        <p className="text-sm text-gray-600 mb-6">
          Paid sollte nicht isoliert bewertet werden. Budget schafft nur dann Wert, wenn daraus qualifizierte Pipeline entsteht, Sales diese Pipeline verarbeiten kann und die gewonnenen Kunden stark genug sind, um zu bleiben und sich weiterzuentwickeln.
          <br /><br />
          Aus dieser Perspektive ist Paid nicht einfach ein Lead-Kanal, sondern ein Input in ein größeres Revenue-System. Erst wenn Signalqualität, Routing, Sales-Verarbeitung und Retention zusammenpassen, entsteht skalierbares Wachstum.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          {['Budget', 'Qualifizierte Pipeline', 'Sales-Kapazität', 'Retained ARR'].map((step, i) => (
            <React.Fragment key={step}>
              <div className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-homie-primary shadow-sm">
                {step}
              </div>
              {i < 3 && <ArrowRight size={14} className="text-gray-300" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Dual Path Visualization */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-display ml-2">Intelligente Routing-Logik basierend auf Intent-Segmentierung. <Citation id="3" onClick={onOpenEvidence} /></h3>

        {/* Path 1: PLG */}
        <div className="p-6 rounded-2xl bg-white border border-gray-100 premium-shadow relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
          <div className="flex flex-col md:flex-row items-center gap-4 relative z-10">
            <div className="md:w-64">
              <h4 className="font-bold text-gray-900">Pfad 1: Product-Led Growth (PLG) / Trial-First Motion</h4>
            </div>

            <div className="flex-1 flex flex-wrap items-center gap-3">
              <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl min-w-[140px]">
                <p className="text-[10px] font-bold text-gray-900 mb-1">High-Intent Anzeige</p>
                <p className="text-[10px] text-gray-400 italic">z.B. 'Shopify KI Berater'</p>
              </div>
              <ChevronRight size={16} className="text-gray-200" />
              <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl min-w-[140px]">
                <p className="text-[10px] font-bold text-gray-900 mb-1">Trial-First Landingpage</p>
                <p className="text-[10px] text-gray-400 italic">Live in wenigen Minuten</p>
              </div>
              <ChevronRight size={16} className="text-gray-200" />
              <div className="bg-homie-primary p-3 rounded-xl min-w-[140px] shadow-lg shadow-homie-primary/20">
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
              <h4 className="font-bold text-gray-900">Pfad 2: Sales-Led Growth (SLG) / Enterprise-First Motion</h4>
            </div>

            <div className="flex-1 flex flex-wrap items-center gap-3">
              <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl min-w-[140px]">
                <p className="text-[10px] font-bold text-gray-900 mb-1">Omnichannel Anzeige</p>
                <p className="text-[10px] text-gray-400 italic">z.B. 'POS KI Terminal'</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Google Search Card */}
        <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-blue-600">
              <Search size={22} />
            </div>
            <h3 className="text-xl font-bold font-display text-gray-900">Google Search</h3>
          </div>
          <p className="text-sm text-gray-500 mb-8 font-medium">Präzise Erfassung von High-Intent-Nachfrage für wettbewerbsrelevante Kategorie- und Lösungsbegriffe.</p>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50">
              <h4 className="text-sm font-bold text-blue-600 mb-4">Category Search</h4>
              <div className="flex flex-wrap gap-2">
                {['KI-Shopping-Assistent', 'Guided Selling Software', 'E-Commerce KI-Assistent'].map(kw => (
                  <span key={kw} className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-400">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50">
              <h4 className="text-sm font-bold text-blue-600 mb-4">Integration Search</h4>
              <div className="flex flex-wrap gap-2">
                {['Shopify KI-Assistent', 'Shopware Produktberater', 'GTM Consent Mode'].map(kw => (
                  <span key={kw} className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-400">
                    {kw}
                  </span>
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
          <p className="text-sm text-gray-500 mb-8 font-medium">Skalierbarer Enterprise-Pipeline-Aufbau durch strategisches ABM-Targeting relevanter Einkaufsgremien.</p>

          <div className="space-y-4">
            <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50">
              <h4 className="text-sm font-bold text-blue-600 mb-1">Tier 1 (Named)</h4>
              <p className="text-[10px] text-gray-400 mb-3">Baumarktketten, Elektronikfachmärkte, große Fachhändler.</p>
              <p className="text-[11px] font-bold text-blue-700">Angebot: Retail KI Berater ROI & Compliance (Demo)</p>
            </div>

            <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50">
              <h4 className="text-sm font-bold text-blue-600 mb-1">Tier 2 (Category)</h4>
              <p className="text-[10px] text-gray-400 mb-3">E-Commerce-Händler + B2B-Distributoren nach Firmografie.</p>
              <p className="text-[11px] font-bold text-blue-700">Angebot: DIY Vertical Playbook (Download)</p>
            </div>
          </div>
        </div>

        {/* Meta Retargeting Card */}
        <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-pink-600">
              <Instagram size={22} />
            </div>
            <h3 className="text-xl font-bold font-display text-gray-900">Meta Retargeting</h3>
          </div>
          <p className="text-sm text-gray-500 mb-8 font-medium">Reibungslose Conversion-Verstärkung für Website-Besucher und Trial-Nutzer zur Maximierung des ROAS.</p>

          <div className="space-y-5 px-4 pt-4">
            {[
              'Website-Besucher',
              'Preisseiten-Besucher',
              'Testnutzer'
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-blue-500 flex items-center justify-center">
                  <Check size={12} className="text-blue-500" />
                </div>
                <span className="text-sm font-medium text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 premium-shadow text-white">
        <h3 className="text-xl font-bold font-display mb-6">Strategische Budget-Allokation (Initiales Starter-System)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Kanal</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Starter-Budget (EUR)</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Begründung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {paidPlanData.budget.map((item) => (
                <tr key={item.channel} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 font-bold text-emerald-400">{item.channel}</td>
                  <td className="py-4 text-sm font-bold text-slate-200">€{item.budget}</td>
                  <td className="py-4 text-sm text-slate-400 italic">{item.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Baseline Math Model Chart */}
      <div className="p-8 rounded-2xl bg-white border border-gray-100 premium-shadow">
        <h3 className="text-xl font-bold font-display mb-8">Mathematisches Basis-Modell (Validierung in Woche 1-2)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {(() => {
              const a = modelData.assumptions;
              const engagedSessions = Math.round(a.sessions * a.engagementRate);
              const leads = Math.round(engagedSessions * a.leadRate);
              const mqls = Math.round(leads * a.mqlRate);
              const sqls = Math.round(mqls * a.sqlRate);
              const closedDeals = Math.round(sqls * a.closeRate);
              const chartData = [
                { stage: 'Sitzungen', volume: a.sessions },
                { stage: 'Interaktionen', volume: engagedSessions },
                { stage: 'Leads', volume: leads },
                { stage: 'MQLs', volume: mqls },
                { stage: 'SQLs', volume: sqls },
                { stage: 'Abschlüsse', volume: closedDeals },
              ];
              return (
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="stage"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fontWeight: 500, fill: '#94a3b8' }}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="volume" radius={[4, 4, 0, 0]} barSize={60}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#6366f1'} />
                    ))}
                  </Bar>
                </BarChart>
              );
            })()}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MeasurementView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
  return (
    <div className="space-y-8">
      {/* Measurement Risks */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold font-display dark:text-white ml-2">Messrisiken, die Wachstumsentscheidungen verzerren</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 ml-2 max-w-3xl">
          Das Problem ist selten ein kompletter Mangel an Daten. Häufiger ist das Problem, dass auf Signale optimiert wird, die nützlich aussehen, aber wirtschaftlich irreführend sind.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { title: 'Plattform-Wahrheit ≠ Business-Wahrheit', desc: 'Plattform-Metriken sind nützlich, aber sie sind nicht die endgültige Scorecard. Paid Performance muss gegen CRM-Stufen, Pipeline-Qualität und Umsatzrealität gespiegelt werden, nicht nur gegen In-Platform-Conversions.' },
            { title: 'CRM-Disconnect', desc: 'Wenn Paid-Daten nicht sauber mit CRM-Ergebnissen verbunden sind, optimiert das System schnell auf billige Aktivität statt auf wertvolle Pipeline. Dann sieht Marketing effizient aus, ohne dass die Business-Qualität wirklich steigt.' },
            { title: 'Lifecycle-Unschärfe', desc: 'Wenn Begriffe wie Lead, MQL, SQL und Opportunity nicht klar definiert sind, wird Reporting politisch statt steuerbar. Unklare Stufen führen dazu, dass Teams dieselben Zahlen sehen, aber Unterschiedliches darunter verstehen.' },
            { title: 'Offline-Conversion-Blindheit', desc: 'Ohne Rückkopplung aus Sales und späteren Outcomes lernen Plattformen nicht, welche Signale tatsächlich kommerzielle Qualität abbilden. Dann wird oft das am leichtesten Messbare belohnt, nicht das wirtschaftlich Relevante.' },
            { title: 'Optimierung auf Aktivität statt Umsatz', desc: 'Die am einfachsten zählbaren Signale sind nicht automatisch die wertvollsten. Growth-Systeme werden schwächer, wenn Volumen stärker belohnt wird als Qualität, Retention oder tatsächlicher Revenue-Impact.' }
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h4 className="text-[10px] font-bold text-red-500 mb-2 uppercase tracking-wider">{item.title}</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Tracking is Strategic */}
      <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 premium-shadow">
        <h3 className="text-xl font-bold font-display mb-4 dark:text-white">Warum Tracking hier strategisch ist</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Bei homie ist Tracking keine reine Reporting-Funktion, sondern die Voraussetzung für belastbare Wachstumsentscheidungen. Erst wenn Paid-Daten, CRM-Stufen, Sales-Feedback und spätere Umsatzsignale sauber zusammenlaufen, lässt sich erkennen, welche Nachfrage tatsächlich wirtschaftlichen Wert erzeugt.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Gerade in einem Setup mit Trial- und Demo-Pfaden entscheidet Tracking darüber, ob das System auf echte Kaufabsicht optimiert oder nur auf sichtbare Aktivität. In diesem Sinne ist Messbarkeit nicht nachgelagert, sondern ein Teil der Growth-Architektur selbst.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 premium-shadow">
          <h3 className="text-xl font-bold font-display mb-8 dark:text-white">Enterprise Measurement & Attributions-Architektur</h3>
          <div className="relative h-[300px] flex items-center justify-between px-12">
            {/* Connector Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 -translate-y-1/2 opacity-20" />

            {[
              { label: 'GTM + Consent', icon: ShieldCheck, color: 'bg-emerald-500' },
              { label: 'GA4 Events', icon: Activity, color: 'bg-blue-500' },
              { label: 'HubSpot CRM', icon: Database, color: 'bg-orange-500' },
              { label: 'Lead-Dashboard', icon: LayoutDashboard, color: 'bg-indigo-500' }
            ].map((node, i) => (
              <div key={node.label} className="relative z-10 flex flex-col items-center">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4", node.color)}>
                  <node.icon size={24} />
                </div>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{node.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Strategische Implementierungs-Guidelines</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle2 size={14} className="text-homie-primary shrink-0 mt-0.5" />
                GA4 als primäre Verhaltens-Ebene; HubSpot als Single Source of Truth für Umsatz-Attribution.
              </li>
              <li className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle2 size={14} className="text-homie-primary shrink-0 mt-0.5" />
                Lückenlose Einbindung DSGVO-konformer Tags via Google Consent Mode v2.
              </li>
            </ul>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 premium-shadow">
          <h3 className="text-xl font-bold font-display mb-6 dark:text-white">Tracking-Validierung & Sanity Check</h3>
          <div className="space-y-4">
            {[
              "GTM-Container auf allen Seiten geladen",
              "Consent Mode v2 standardmäßig verweigert",
              "GA4 Konfigurations-Tag feuert überall",
              "HubSpot Tracking-Code aktiv",
              "LinkedIn Insight Tag feuert bei Conversion",
              "Erweiterte Conversions in Ads aktiv",
              "Job für Offline-Conversion-Import geplant"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="w-5 h-5 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center bg-white dark:bg-gray-900">
                  {i < 3 && <CheckCircle2 size={12} className="text-homie-primary" />}
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 dark:bg-slate-900 dark:border-slate-700 premium-shadow text-white">
        <h3 className="text-xl font-bold font-display mb-8">CRM Lifecycle-Architektur & Funnel-Mapping</h3>
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 relative">
          {/* Connector Line (Horizontal) */}
          <div className="absolute top-8 left-0 w-full h-px bg-slate-800 hidden md:block" />

          {measurementData.lifecycle.map((stage, i) => (
            <div key={stage.stage} className="relative z-10 flex flex-col items-center text-center md:w-1/5 group">
              <div className="w-16 h-16 rounded-full bg-slate-50 border-4 border-slate-800 shadow-sm flex items-center justify-center text-base font-black text-slate-950 group-hover:bg-white group-hover:scale-110 transition-all mb-4">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">{stage.stage}</p>
                <p className="text-[10px] text-slate-400 leading-tight px-2">{stage.definition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Event Taxonomy Card */}
        <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow flex flex-col h-full">
          <h4 className="text-sm font-bold text-gray-900 mb-8 uppercase tracking-widest">Event-Taxonomie</h4>
          <div className="space-y-5 flex-1 flex flex-col justify-center">
            {[
              { label: 'Intent-Besuch', value: 'view_enterprise' },
              { label: 'Haupt-Conv. (Trial)', value: 'start_free_trial' },
              { label: 'Haupt-Conv. (Demo)', value: 'book_demo' },
              { label: 'Produkt-Aktion', value: 'chat_open' }
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center text-xs group">
                <span className="text-gray-500 font-medium">{item.label}:</span>
                <span className="font-mono bg-gray-50 px-3 py-1 rounded-lg border border-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Scoring Rubric Card */}
        <div className="p-8 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 flex flex-col h-full">
          <h4 className="text-sm font-bold text-white/90 mb-8 uppercase tracking-widest">Lead-Scoring Rubrik</h4>
          <div className="space-y-8 flex-1 flex flex-col justify-center">
            <div>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-4">Fit-Score (Firmografie)</p>
              <div className="flex flex-wrap gap-2">
                {['Branche: Retail/DIY', 'Unternehmensgröße (Proxy)', 'Region: DACH'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white/10 rounded-xl text-[10px] font-bold border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-4">Intent-Score (Verhalten)</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Enterprise-Seite aufgerufen',
                  'Klick auf \'Termin vereinbaren\'',
                  'Trial-Start'
                ].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white/20 rounded-xl text-[10px] font-bold border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What must be true for scaling */}
      <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 premium-shadow">
        <h3 className="text-xl font-bold font-display mb-6 dark:text-white">Was wahr sein muss, damit Skalierung funktioniert</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { title: 'Die Signalqualität muss vertrauenswürdig sein', desc: 'Ohne belastbare Signale wird Skalierung teuer und unpräzise.' },
            { title: 'Lead-Qualität muss wichtiger sein als bloßes Volumen', desc: 'Mehr Nachfrage ist nicht automatisch besser, wenn sie nicht in tragfähige Pipeline übergeht.' },
            { title: 'Paid- und CRM-Daten müssen sauber zusammenlaufen', desc: 'Nur dann lässt sich erkennen, welche Akquisition wirklich wirtschaftlichen Wert erzeugt.' },
            { title: 'Sales- und Customer-Success-Kapazitäten müssen mithalten', desc: 'Wachstum verliert an Qualität, wenn nachgelagerte Teams nicht im gleichen Takt skalieren.' },
            { title: 'Wachstum muss die Qualität des wiederkehrenden Umsatzes verbessern', desc: 'Nicht nur Conversions, sondern Retention, Expansion und Revenue-Qualität entscheiden über die Tragfähigkeit des Modells.' }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h4 className="text-[10px] font-bold text-homie-primary mb-2 uppercase tracking-widest">{item.title}</h4>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperimentsView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
  return (
    <div className="space-y-8">
      {/* Experiment Logic */}
      <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 premium-shadow">
        <h3 className="text-xl font-bold font-display mb-4 dark:text-white">Experiment-Logik</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Experimente dienen hier nicht der reinen Conversion-Optimierung, sondern der Validierung von Signalqualität, ICP-Fit und Pipeline-Wert. Die zentrale Frage ist nicht nur, welche Kampagne günstiger Leads erzeugt, sondern welche Tests die belastbarsten Hinweise auf qualifizierte Pipeline und wiederholbares Wachstum liefern.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Gerade in einem Setup mit Trial- und Demo-Pfaden muss das Experimentieren enger an Sales-Feedback, Lead-Scoring und spätere Umsatzsignale gekoppelt werden. Erst dann entsteht ein Testprogramm, das nicht Aktivität maximiert, sondern Entscheidungsqualität verbessert.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 premium-shadow overflow-hidden">
        <h3 className="text-xl font-bold font-display mb-6 dark:text-white">Strategischer Growth-Experiment Backlog</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Experiment</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">KPI</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Erfolgskriterium</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Zieldatum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {experimentsData.map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-4">
                    <p className="font-bold text-homie-primary">{exp.hypothesis}</p>
                  </td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-300">{exp.kpi}</td>
                  <td className="py-4 text-sm font-bold text-homie-primary">{exp.success}</td>
                  <td className="py-4 text-sm text-gray-400 dark:text-gray-500">{exp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RoadmapView({ onOpenEvidence }: { onOpenEvidence: (id: string) => void }) {
  return (
    <div className="space-y-8 px-4 md:px-0">
      <div className="relative">
        {/* Continuous Timeline Line */}
        <div className="absolute left-[31px] md:left-[39px] top-0 h-full w-[2px] bg-gray-100" />

        <div className="space-y-16">
          {roadmapData.phases.map((phase, i) => (
            <div key={phase.weeks} className="relative transition-all duration-300">
              {/* Dot & Week Indicator */}
              <div className="absolute left-[24px] md:left-[32px] top-0 z-20">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white dark:bg-gray-800 border-4 border-homie-primary dark:border-blue-500 shadow-sm" />
                <div className="absolute left-10 md:left-12 top-0 -translate-y-[2px] whitespace-nowrap">
                  <div className="px-3 py-1 bg-homie-primary/10 dark:bg-blue-900/40 rounded-full">
                    <span className="text-[10px] font-black text-homie-primary dark:text-blue-400 uppercase tracking-widest">
                      {i === 0 ? 'Tag 1–30' : i === 1 ? 'Tag 31–60' : 'Tag 61–90'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-10 pl-12 md:pl-20">
                <div className="p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 premium-shadow hover:shadow-xl transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-gray-800/50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-50 transition-opacity" />

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold font-display mb-8 text-gray-900 dark:text-white">
                      {i === 0 ? 'Wahrheit herstellen' : i === 1 ? 'Qualität stabilisieren' : 'Skalieren, was belastbar ist'}
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-5">Zentrale Deliverables</h4>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                            {i === 0 
                              ? 'Tracking, Lifecycle-Definitionen, CRM-Attribution und die aktuelle Sicht auf Paid-to-Pipeline prüfen. Klären, welche Signale tatsächlich für Qualität stehen und wo die Verbindung zwischen Plattform, CRM und Sales-Realität bricht.'
                              : i === 1
                              ? 'ICP-Logik schärfen, Routing und Feedback-Loops mit Sales verbessern, Landingpages und Angebote überprüfen und herausarbeiten, welche Kanäle und Kampagnen die besten nachgelagerten Signale liefern.'
                              : 'Spend nur dort ausweiten, wo Signalqualität, Lead-Qualität und Conversion-Pfad tragfähig sind. Reporting auf qualifizierte Pipeline und wirtschaftliche Wirkung ausrichten, nicht nur auf Plattform-Outcome.'
                            }
                          </p>
                          <div className="pt-4 space-y-3">
                            {phase.deliverables.map(del => (
                              <div key={del} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                                  <CheckCircle2 size={12} className="text-blue-500" />
                                </div>
                                {del}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100/50 dark:border-slate-700">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Management-Ergebnis</h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300 font-bold leading-relaxed italic">
                          "{phase.outcomes}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Performance Memo Template - V1 Style */}
      <div className="mt-16 p-8 md:p-12 rounded-3xl bg-slate-950 border border-slate-800 dark:bg-slate-900 dark:border-slate-700 premium-shadow relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900 rounded-full -mr-16 -mt-16 opacity-50" />

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white uppercase tracking-[0.2em] mb-10">Vorlage: Wöchentliches Performance Memo</h3>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group">
              <h4 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-sm">1</span>
                Was hat sich geändert (Metriken)
              </h4>
              <p className="text-sm text-slate-400 italic pl-11">z.B. "CPL sank um 15% in der Suche, aber das SQL-Volumen blieb stabil."</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group">
              <h4 className="text-lg font-bold text-purple-400 mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-sm">2</span>
                Warum (Hypothese)
              </h4>
              <p className="text-sm text-slate-400 italic pl-11">z.B. "Gebote der Wettbewerber ließen nach, aber wir fingen eher Suchanfragen mit geringerem Intent ein."</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group">
              <h4 className="text-lg font-bold text-emerald-400 mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">3</span>
                Nächste Schritte (Maßnahme)
              </h4>
              <p className="text-sm text-slate-400 italic pl-11">z.B. "Negative Keyword-Liste erweitern und neue Enterprise-LP testen."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing icon
function Database(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}
