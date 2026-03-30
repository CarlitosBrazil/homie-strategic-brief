import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Download,
  ExternalLink,
  Award,
  ShieldCheck,
  TrendingUp,
  LockKeyhole,
  ArrowRight
} from 'lucide-react';

import ResearchDashboard from './components/ResearchDashboard';
import GrowthDashboard from './components/GrowthDashboard';
import StrategicBrief from './components/StrategicBrief';
import AuditScorecard from './components/AuditScorecard';

// Assets for About Page
import profileImg from '../assets/about/Carlos De Azevedo Jr - 2024.jpg';
import cvPdf from '../assets/about/Carlos Azevedo C.V._ DE_2026 .pdf';
import recPdf from '../assets/about/Carlos Azevedo Jr._Alveus Arbeitszeugnis.pdf';
import certPdf from '../assets/about/Carlos Azevedo Jr._Zertifizierungen_2026.pdf';

const ACCESS_PASSWORD = 'HomieBrief-30Mar2026-Carlos';
const ACCESS_STORAGE_KEY = 'homie-brief-unlocked';

function AccessGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== ACCESS_PASSWORD) {
      setError('Password incorrect. Please contact Carlos if you still want access.');
      return;
    }

    window.localStorage.setItem(ACCESS_STORAGE_KEY, 'true');
    onUnlock();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.22),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(148,163,184,0.16),_transparent_30%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10">
              <LockKeyhole className="h-5 w-5 text-blue-300" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">Private Access</p>
              <h1 className="font-serif text-3xl text-white">This brief is now locked.</h1>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-slate-400">
            <p>
              The strategic brief and supporting materials have been paused for now.
            </p>
            <p>
              If your team would still like to review the work, please reach out to Carlos for the current password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) {
                    setError('');
                  }
                }}
                placeholder="Enter password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none transition focus:border-blue-400/50 focus:bg-white/8"
              />
            </label>

            {error ? (
              <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Unlock brief
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-xs leading-relaxed text-slate-500">
            To change the password, update <code className="rounded bg-white/5 px-1.5 py-0.5 text-slate-300">ACCESS_PASSWORD</code> in this file before redeploying.
          </p>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-32 pb-32">
      {/* 1. Hero */}
      <section className="pt-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        <div className="flex-1 space-y-8">
          <h2 className="text-blue-400 uppercase tracking-[0.2em] text-xs font-bold">ÜBER CARLOS AZEVEDO</h2>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-200 leading-tight">
            Hi, ich bin Carlos.
          </h1>
          <div className="text-xl text-slate-400 max-w-2xl font-light leading-relaxed space-y-4">
            <p className="text-slate-200 font-medium">Growth- und Performance-Marketer mit einer starken Leidenschaft für Daten, Systeme und kommerzieller Klarheit — geprägt von fundiertem Finanzwissen und praktischer Marketing-Erfahrung.</p>
            <p>Ich baue Systeme, die Paid Acquisition, Messung und Sales-Realität miteinander verbinden — damit Wachstum nicht nur gut reportet aussieht, sondern wirklich belastbar wird.</p>
          </div>
        </div>

        {/* Profile Image - Vertical Portrait */}
        <div className="w-56 md:w-64 shrink-0 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative aspect-[3/4]">
          <img
            src={profileImg}
            alt="Carlos Azevedo"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </section>

      {/* 2. Operating Philosophy */}
      <section className="bg-[#F5F3EE] text-[#0F172A] p-10 md:p-16 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#EEE9E1] rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl font-serif">Operating Philosophy</h2>
          <div className="space-y-6 text-lg font-light leading-relaxed text-[#475569]">
            <p>
              Ich habe aus nächster Nähe erlebt, wie kraftvoll Skalierung sein kann — innerhalb eines Unternehmens, das in rund zwei Jahren von etwa 300 aktiven Kunden auf mehr als 1,9 Millionen Kunden in sieben Ländern gewachsen ist. Ich habe aber auch erlebt, was passiert, wenn Wachstum Prozess, Messung und Struktur überholt.
            </p>
            <p>
              Ein Teil meiner heutigen Arbeitsweise besteht darin, Komplexität in nutzbare Frameworks zu übersetzen — Audits, SOPs, Scorecards und Entscheidungslogiken, die Wachstumssysteme verlässlicher machen.
            </p>
            <p className="text-[#0F172A] font-medium pt-4 border-l-2 border-blue-500 pl-4 italic">
              "Wachstum bedeutet nicht nur, Volumen zu erzeugen. Es bedeutet, Vertrauen in das System zu schaffen, das dieses Volumen erzeugt."
            </p>
          </div>
        </div>
      </section>

      {/* 3. Impact & Scale */}
      <section className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-serif text-slate-200">Impact & Scale</h2>
          <p className="text-slate-400 font-light">Belege für systematisches Wachstum und operative Substanz.</p>
        </div>

        <div className="space-y-6">
          {[
            {
              metric: "€50M+ verwaltet",
              context: "Direkte Verantwortung für Paid Media in B2B Leadgen und E-Commerce.",
            },
            {
              metric: "2.800+ geschult",
              context: "Mitgewirkt an Trainingssystemen, die von 2.800+ Professionals und 200+ Agenturinhabern genutzt wurden.",
            },
            {
              metric: "4x Leadwachstum",
              context: "B2B Lead Acquisition skaliert und gleichzeitig Struktur und Umsatzbeitrag verbessert.",
            }
          ].map((proof, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 p-8 bg-slate-900/40 border border-slate-800 rounded-2xl backdrop-blur-md hover:bg-slate-900/60 transition-colors">
              <div className="md:w-1/3">
                <div className="text-3xl font-serif text-slate-200 mb-1">{proof.metric}</div>
              </div>
              <div className="md:w-2/3 text-slate-400 font-light leading-relaxed flex items-center">
                {proof.context}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Documents */}
      <section className="space-y-12 pt-8 border-t border-slate-800">
        <div className="space-y-4">
          <h2 className="text-3xl font-serif text-slate-200">Dokumente</h2>
          <p className="text-slate-400 font-light">Unterlagen und weiterführende Links.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Vollständiger CV", icon: <FileText className="w-5 h-5 text-blue-400" />, type: "PDF", link: cvPdf },
            { title: "Arbeitszeugnisse / Empfehlungsschreiben", icon: <FileText className="w-5 h-5 text-emerald-400" />, type: "PDF", link: recPdf },
            { title: "Zertifikate", icon: <Award className="w-5 h-5 text-purple-400" />, type: "PDF", link: certPdf },
            { title: "LinkedIn Profil", icon: <ExternalLink className="w-5 h-5 text-slate-400" />, type: "Link", link: "#" },
          ].map((doc, i) => (
            <a
              href={doc.link}
              key={i}
              target={doc.link.startsWith('http') || doc.link.endsWith('.pdf') ? "_blank" : undefined}
              rel={doc.link.startsWith('http') || doc.link.endsWith('.pdf') ? "noopener noreferrer" : undefined}
              className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md flex items-center justify-between hover:bg-slate-900/60 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-blue-500/30 transition-colors">
                  {doc.icon}
                </div>
                <h3 className="text-slate-200 font-medium">{doc.title}</h3>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">{doc.type}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function FilesSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-12">
      <header className="mb-12">
        <h2 className="text-3xl font-serif text-slate-200 mb-4">Dateien & Downloads</h2>
        <p className="text-slate-400 font-light max-w-2xl">Greifen Sie auf die Rohmodelle und maßgeschneiderten Audit-Pakete zu, die diesen Brief unterstützen.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: "SaaS Paid Media Audit Guide", desc: "Strategischer Leitfaden zur Bewertung von Performance-Systemen.", type: "PDF", size: "190 KB", link: "/downloads/audit-scorecard/B2B SaaS Paid Media Audit_Guide_V2_DE.pdf" },
          { title: "SaaS Growth Model", desc: "Interaktive Tabelle mit CAC- und ARR-Prognosen (Homie Starter v20).", type: "XLSX", size: "52 KB", link: "/downloads/growth-model/Homie_Model_Starter_v20_DE.xlsx" },
          { title: "Audit Scorecard (DE)", desc: "Das Haupt-Framework zur quantitativen Auditierung (Deutsch).", type: "XLSX", size: "154 KB", link: "/downloads/audit-scorecard/SaaS_Paid_Media_Audit_Scorecard_v1.0_de.xlsx" },
          { title: "Modellanpassung & Logik", desc: "Supporting Doc: Wie und warum ich dieses Modell gebaut habe.", type: "PDF", size: "82 KB", link: "/downloads/growth-model/Homie Growth Model_DE.pdf" },
        ].map((file, i) => (
          <DownloadCard key={i} file={file} />
        ))}
      </div>
    </div>
  );
}

function DownloadCard({ file }: { file: any; key?: React.Key }) {
  return (
    <a 
      href={file.link} 
      download={file.link !== "#"}
      className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md flex items-start gap-4 hover:bg-slate-900/60 transition-all cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-blue-500/30 transition-colors">
        <Download className="w-6 h-6 text-slate-400" />
      </div>
      <div>
        <h4 className="text-slate-200 font-medium mb-1">{file.title}</h4>
        <p className="text-sm text-slate-500 font-light mb-3 leading-relaxed">{file.desc}</p>
        <div className="flex gap-3 text-xs font-medium text-slate-600">
          <span className="px-2 py-1 bg-slate-950/50 rounded border border-slate-800/50">{file.type}</span>
          <span className="px-2 py-1 bg-slate-950/50 rounded border border-slate-800/50">{file.size}</span>
        </div>
      </div>
    </a>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('brief');
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(ACCESS_STORAGE_KEY) === 'true';
  });

  const navItems = [
    { id: 'brief', label: 'Brief' },
    { id: 'research', label: 'Research' },
    { id: 'growth', label: 'Growth Model' },
    { id: 'audit', label: 'Audit Scorecard' },
    { id: 'about', label: 'About' },
    { id: 'files', label: 'Dateien' },
  ];

  if (!isUnlocked) {
    return <AccessGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-blue-500/30">
      <nav className="fixed top-0 w-full z-50 bg-[#030712]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-serif text-xl text-white tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            homie<span className="text-slate-500 italic font-light">Brief</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeSection === item.id
                  ? 'bg-white/10 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden flex overflow-x-auto px-4 pb-3 gap-2 border-t border-white/5 pt-3">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${activeSection === item.id
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="pt-32 md:pt-40 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'brief' && <StrategicBrief onNavigate={setActiveSection} />}
            {activeSection === 'research' && (
              <div className="fixed inset-0 top-[133px] md:top-20 bg-white text-slate-900 z-40">
                <ResearchDashboard />
              </div>
            )}
            {activeSection === 'growth' && (
              <div className="bg-slate-50 text-slate-900 min-h-screen -mt-32 pt-32">
                <GrowthDashboard />
              </div>
            )}
            {activeSection === 'audit' && <AuditScorecard />}
            {activeSection === 'about' && <AboutSection />}
            {activeSection === 'files' && <FilesSection />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
