import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Search,
  TrendingUp,
  CheckSquare,
  User,
  Download,
  Quote,
  FileText,
  ExternalLink,
  Award
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Assets for About Page
import profileImg from '../assets/about/Carlos De Azevedo Jr - 2024.jpg';
import cvPdf from '../assets/about/Carlos Azevedo C.V._ DE_2026 .pdf';
import recPdf from '../assets/about/Carlos Azevedo Jr._Alveus Arbeitszeugnis.pdf';
import certPdf from '../assets/about/Carlos Azevedo Jr._Zertifizierungen_2026.pdf';

import ResearchDashboard from './components/ResearchDashboard';
import GrowthDashboard from './components/GrowthDashboard';

function BriefSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  const SectionCard = ({ children, className = '', isDark = false }) => (
    <div
      className={`rounded-2xl shadow-2xl relative overflow-hidden ${className}`}
      style={{
        backgroundColor: isDark ? '#0a0a0a' : '#F7F2EB',
        color: isDark ? 'white' : '#1e293b',
      }}
    >
      {/* Paper texture overlay for light cards */}
      {!isDark && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/paper-bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
          }}
        />
      )}
      <div className="relative z-10 p-10 md:p-20">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 space-y-32 pb-32">

      {/* Hero */}
      <div className="max-w-4xl mx-auto">
        <section className="pt-24 pb-20 text-center space-y-8">
          <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight">
            Eine andere Art der Bewerbung.<br />
            <span className="italic" style={{ color: '#A8C7D9' }}>Rund um die Rolle gebaut.</span>
          </h1>
          <p className="text-xl text-slate-400 font-light">So gedacht, dass es nützlich ist.</p>
          <div className="pt-8 flex justify-center">
            <button onClick={() => {
              document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-slate-200 transition-colors shadow-xl">
              Bewerbung lesen
            </button>
          </div>
        </section>
      </div>

      {/* 01 — Ein Brief an das homie Team */}
      <div className="max-w-4xl mx-auto w-full">
        <section id="letter" className="relative scroll-mt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl -z-10" />
          <SectionCard>
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">01</h3>
            <h2 className="text-3xl font-serif text-slate-900 mb-8">Ein Brief an das homie Team</h2>

            <div className="space-y-6 text-slate-800 font-serif leading-relaxed text-lg max-w-2xl">
              <p>Ich wollte mich nicht mit einer Standardbewerbung melden.</p>
              <p>
                Ich habe die Rolle genau gelesen.<br />
                Für mich sah sie weniger nach einem reinen Channel-Job aus und mehr nach einer Growth-Systems-Rolle.
              </p>
              <p>
                Paid. Pipeline. Tracking. CRM. Sales Alignment.<br />
                Nicht isoliert. Als ein System.
              </p>
              <p>Genau das hat mich interessiert.</p>
              <p>Also habe ich nicht lange darüber gesprochen, wie ich arbeite. Ich habe etwas rund um die Rolle gebaut:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Research</li>
                <li>ein Growth Model</li>
                <li>ein Paid-Media- und Tracking-Audit</li>
              </ul>
              <p>Alles auf Basis öffentlicher Informationen.</p>
              <p>Das Modell startet mit den sichtbaren Preisstufen auf eurer Website und führt zu einer schwierigeren What-if-Frage:</p>
              <div className="pl-6 border-l-2 border-blue-500/40 italic text-slate-700">
                <p>Was müsste wahr sein, damit ein Unternehmen wie homie langfristig in Richtung Unicorn-Scale wachsen kann?</p>
              </div>
              <p>
                Nicht als Prognose.<br />
                Als schärfere Denkweise.
              </p>
              <p>Das Audit ist dabei, weil Tracking und Attribution wie einer der wahrscheinlichen Engpässe hinter der Rolle wirkten. In meiner Arbeit mit God Tier Ads und Midas Media war genau das immer wieder eines der häufigsten und wichtigsten Themen.</p>
              <p>Diese Seite ist deshalb einfach.</p>
              <p>
                Ich habe die Herausforderung gesehen.<br />
                Ich habe sie ernst genommen.<br />
                Und ich habe etwas dazu gebaut.
              </p>
              <p>So wollte ich mich bewerben.</p>
              <p>Ich hoffe, es resoniert bei euch.</p>
              <p className="pt-4">
                Viele Grüße<br />
                <span className="font-serif text-2xl italic mt-2 block text-slate-900">Carlos Azevedo</span>
              </p>
            </div>
          </SectionCard>
        </section>
      </div>

      {/* 02 — Die Rolle */}
      <section className="space-y-6">
        <SectionCard isDark={true}>
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">02</h3>
          <h2 className="text-3xl font-serif text-white mb-8">Die Rolle</h2>
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg max-w-2xl">
            <p>Ein datengetriebener Performance Marketer, der die Punkte lösen kann, die für Wachstum wirklich zählen:</p>
            <ul className="space-y-4 pl-6 border-l border-white/10 text-white/90">
              <li>Messung, die noch nicht entscheidungsreif ist</li>
              <li>Leadfluss, der nicht immer Leadqualität bedeutet</li>
              <li>Plattform-Performance, die nicht vollständig zur Business-Realität passt</li>
              <li>Paid-, CRM- und Sales-Signale, die noch nicht mit einer Stimme sprechen</li>
              <li>Wachstumsambition, die auf operative Grenzen trifft</li>
            </ul>
            <p>Kritisch für Wachstum.<br />Nicht isoliert. Als ein System.</p>
            <div className="pt-4">
              <button onClick={() => onNavigate('growth')} className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition-colors">
                Growth Model &rarr;
              </button>
            </div>
          </div>
        </SectionCard>
      </section>

      {/* 03 — Timing */}
      <section className="space-y-6">
        <SectionCard isDark={false}>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">03</h3>
          <h2 className="text-3xl font-serif text-slate-900 mb-8">Timing</h2>
          <div className="space-y-8 text-slate-700 font-light leading-relaxed text-lg">
            <p className="max-w-2xl">Diese Rolle signalisiert einen Wechsel.</p>
            <p className="max-w-2xl">Nicht einfach mehr Traffic, sondern belastbareres Wachstum.</p>

            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Ein Wechsel von:</p>
              <div className="grid md:grid-cols-2 gap-6 w-full">
                <div className="bg-slate-100/50 border border-slate-200/60 rounded-2xl p-8 space-y-4 transition-all duration-300">
                  <div className="w-fit px-2 py-0.5 rounded bg-slate-200/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vorher</div>
                  <p className="text-slate-800 font-serif text-xl leading-snug whitespace-nowrap">Kann Marketing Volumen erzeugen?</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-xl shadow-slate-200/20 ring-1 ring-blue-500/5 transition-all duration-300 transform md:scale-[1.02]">
                  <div className="w-fit px-2 py-0.5 rounded bg-blue-50 text-[10px] font-bold text-blue-600 uppercase tracking-widest">Jetzt</div>
                  <p className="text-slate-900 font-serif text-xl leading-snug">Kann das Unternehmen dem vertrauen, was Marketing erzeugt, um darauf zu skalieren?</p>
                </div>
              </div>
            </div>

            <p className="pt-2 max-w-2xl">Das ist der eigentliche Unterschied.</p>
            <div className="pt-4">
              <button onClick={() => onNavigate('audit')} className="text-blue-700 hover:text-blue-900 font-medium flex items-center gap-2 transition-colors group">
                Audit Scorecard <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </div>
        </SectionCard>
      </section>

      {/* 04 — Research */}
      <section className="space-y-6">
        <SectionCard isDark={true}>
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">04</h3>
          <h2 className="text-3xl font-serif text-white mb-8">Research</h2>
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg max-w-2xl">
            <p>Ein Outside-in-Blick auf das Unternehmen:</p>
            <ul className="space-y-3 pl-6 border-l border-white/10 text-white/80">
              <li>wo homie besonders stark wirkt</li>
              <li>welche ICPs am wertvollsten aussehen</li>
              <li>was der Markt zu belohnen scheint</li>
              <li>wo Reibung wahrscheinlich entsteht</li>
              <li>was diese Rolle eigentlich stärken soll</li>
            </ul>
            <p>Gebaut, um früh sichtbar zu machen, was wirklich zählt.</p>
            <div className="pt-2">
              <button onClick={() => onNavigate('research')} className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition-colors">
                Research Dashboard &rarr;
              </button>
            </div>
          </div>
        </SectionCard>
      </section>

      {/* 05 — Growth System */}
      <section className="space-y-6">
        <SectionCard isDark={false}>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">05</h3>
          <h2 className="text-3xl font-serif text-slate-900 mb-8">Growth System</h2>
          <div className="space-y-8 text-slate-700 font-light leading-relaxed text-lg">
            <p className="max-w-2xl">Paid ist kein Kanal in Isolation.<br />Es ist Teil eines größeren Wachstumssystems.</p>

            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Die eigentliche Kette ist:</p>
              <div className="flex items-center gap-x-12 bg-slate-50 border border-slate-200/60 p-8 md:p-10 rounded-2xl w-full">
                {[
                  { label: 'Budget', step: '01' },
                  { label: 'qualifizierte Pipeline', step: '02' },
                  { label: 'Sales-Kapazität', step: '03' },
                  { label: 'gebundener Umsatz', step: '04' }
                ].map((item, i, arr) => (
                  <React.Fragment key={item.label}>
                    <div className="flex flex-col shrink-0">
                      <span className="font-mono text-[10px] text-blue-600 uppercase tracking-widest mb-1">Schritt {item.step}</span>
                      <span className="font-serif text-xl text-slate-900">{item.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="text-slate-300 hidden md:block shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14m-7-7 7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <p className="text-slate-600 max-w-2xl">Denn Paid Acquisition kann nicht für sich allein skalieren.<br />Und Akquisitionseffizienz ohne Retention-Qualität ist Scheineffizienz.</p>

            <div className="pt-2">
              <button onClick={() => onNavigate('growth')} className="text-blue-700 hover:text-blue-900 font-medium flex items-center gap-2 transition-colors group">
                Growth Dashboard <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </div>
        </SectionCard>
      </section>

      {/* 06 — Das Modell */}
      <section className="space-y-6">
        <SectionCard isDark={true}>
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">06</h3>
          <h2 className="text-3xl font-serif text-white mb-8">Das Modell</h2>
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
            <p className="max-w-2xl">Gebaut auf Basis öffentlicher Inputs.</p>
            <p className="max-w-2xl">Es startet mit den sichtbaren Preisstufen auf eurer Website und erweitert sie in eine anspruchsvollere What-if-Frage:</p>
            <div className="bg-[#0f0f0f] px-8 py-10 rounded-2xl border border-white/5 shadow-2xl w-full">
              <p className="text-white text-lg font-serif italic leading-relaxed whitespace-nowrap">Was müsste wahr sein, damit homie langfristig in Richtung Unicorn-Scale wachsen kann?</p>
            </div>
            <p className="max-w-2xl">Nicht als Prognose.<br />Als schärfere Denkweise.</p>
            <p>Die screenshots unten stammen direkt aus dem Modell.</p>
            <div className="pt-4 pb-2">
              <p className="text-[10px] font-bold text-blue-500/80 uppercase tracking-[0.25em] mb-4">Growth Model Preview</p>
              <div
                className="aspect-video bg-[#0d0d0d] border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden relative group cursor-pointer shadow-2xl"
                onClick={() => onNavigate('growth')}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-8 left-8 z-20 space-y-1">
                  <p className="text-white text-xl font-medium tracking-tight">Interaktives Growth Model</p>
                  <p className="text-sm text-slate-400 font-light">Zum Öffnen klicken</p>
                </div>
                <div
                  className="w-full h-full opacity-40 group-hover:opacity-60 transition-opacity duration-500 bg-cover bg-center scale-105 group-hover:scale-100"
                  style={{ backgroundImage: `url('/growth-model-preview.png')` }}
                />
              </div>
            </div>
            <div className="pt-2">
              <button onClick={() => onNavigate('growth')} className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition-colors">
                Growth Model &rarr;
              </button>
            </div>
          </div>
        </SectionCard>
      </section >

      {/* 07 — Business Truth */}
      < section className="space-y-6" >
        <SectionCard isDark={false}>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">07</h3>
          <h2 className="text-3xl font-serif text-slate-900 mb-8">Business Truth</h2>
          <div className="space-y-6 text-slate-800 font-serif leading-relaxed text-lg max-w-2xl">
            <p>Plattform-Performance und Business-Performance sind nicht immer dasselbe.</p>
            <p>Der eigentliche Score beginnt dort, wo Paid-Daten, CRM-Stufen, Pipeline-Qualität und wiederkehrender Umsatz zusammenlaufen.</p>
          </div>
        </SectionCard>
      </section >

      {/* 08 — Das Audit */}
      < section className="space-y-6" >
        <SectionCard isDark={true}>
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">08</h3>
          <h2 className="text-3xl font-serif text-white mb-8">Das Audit</h2>
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg max-w-2xl">
            <p>Ich habe das Audit aus einem einfachen Grund aufgenommen.</p>
            <p>Tracking und Attribution wirkten wie einer der wahrscheinlichen Engpässe hinter der Rolle.</p>
            <p>In meiner Arbeit mit God Tier Ads und Midas Media war genau das immer wieder eines der häufigsten und wichtigsten Themen.</p>
            <p>Also habe ich es nicht nur erwähnt.<br />Ich habe etwas darum gebaut.</p>
            <div className="pt-2">
              <button onClick={() => onNavigate('audit')} className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition-colors">
                Audit Scorecard &rarr;
              </button>
            </div>
          </div>
        </SectionCard>
      </section >

      {/* 09 — Was ich bauen wollen würde */}
      < section className="space-y-6" >
        <SectionCard isDark={false}>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">09</h3>
          <h2 className="text-3xl font-serif text-slate-900 mb-8">Was ich bauen wollen würde</h2>
          <div className="space-y-6 text-slate-700 font-light leading-relaxed text-lg max-w-2xl">
            <p>Nicht mehr Media Buying in Isolation.</p>
            <p>Sondern eine Growth-Funktion, die klarer sieht, ehrlicher misst und mit mehr Vertrauen skaliert.</p>
          </div>
        </SectionCard>
      </section >

      {/* 10 — Wenn das resoniert */}
      < section className="space-y-6 pt-12 border-t border-white/10" >
        <SectionCard isDark={true}>
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">10</h3>
          <h2 className="text-3xl font-serif text-white mb-8">Wenn das resoniert</h2>
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg max-w-2xl">
            <p>
              Das hier ist nicht als Gewissheit gemeint.<br />
              Und auch nicht als polierte Performance.
            </p>
            <p>Es ist einfach die ehrlichste Art, wie ich mich bewerben kann:</p>
            <ul className="space-y-2 pl-6 border-l border-white/10 text-white/90">
              <li>zuerst die Arbeit machen,</li>
              <li>sorgfältig nachdenken,</li>
              <li>und dieses Denken sichtbar machen.</li>
            </ul>
            <p>Wenn sich das nützlich anfühlt, würde ich mich freuen, die Unterlagen im Gespräch einzuordnen und zu zeigen, wie ich an die ersten 90 Tage herangehen würde.</p>
            <div className="pt-12">
              <button className="px-8 py-4 bg-white text-black hover:bg-slate-200 rounded-full font-medium transition-colors">
                Gespräch vereinbaren
              </button>
            </div>
          </div>
        </SectionCard>
      </section >

    </div >
  );
}

function AuditSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-32 pb-32">
      {/* 01. Das Audit */}
      <section className="pt-10 space-y-8">
        <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">01</h2>
        <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
          Das Audit
        </h1>
        <div className="text-xl text-[var(--color-navy-text-body)] max-w-2xl font-light leading-relaxed space-y-6">
          <p>Tracking und Attribution wirkten wie einer der wahrscheinlichen Engpässe hinter der Rolle.</p>
          <p>Also habe ich es nicht nur erwähnt.<br />Ich habe etwas darum gebaut.</p>
          <p>Ich wollte etwas Nützliches beitragen.<br />Ein praktisches Geschenk für das Team.</p>
        </div>
      </section>

      {/* 02. Was es prüft */}
      <section className="space-y-12">
        <div className="space-y-2">
          <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">02</h2>
          <h2 className="text-3xl font-serif text-white">Was es prüft</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Tracking & Attribution",
            "CRM-Signalqualität",
            "Kampagnenstruktur",
            "Reporting & Feedback-Loops"
          ].map((title, i) => (
            <div key={i} className="p-8 bg-[var(--color-navy-surface)] border border-[var(--color-navy-border-light)] rounded-2xl hover:bg-[var(--color-navy-elevated)] transition-colors">
              <h3 className="text-xl font-serif text-white">{title}</h3>
            </div>
          ))}
        </div>
        <div className="text-lg text-[var(--color-navy-text-body)] font-light leading-relaxed max-w-2xl">
          <p>Nicht isoliert.<br />Als ein System.</p>
        </div>
      </section>

      {/* 03. Warum das wichtig ist */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">03</h2>
          <h2 className="text-3xl font-serif text-white">Warum das wichtig ist</h2>
        </div>
        <div className="space-y-6 text-lg text-[var(--color-navy-text-body)] font-light leading-relaxed max-w-2xl">
          <p>Schwache Messung macht alles, was danach kommt, schwerer belastbar.</p>
          <p>Plattform-Zahlen können sauber aussehen.<br />Pipeline-Qualität kann etwas anderes sagen.</p>
          <p>Genau das ist die Lücke.</p>
        </div>
      </section>

      {/* 04. Der Punkt */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">04</h2>
          <h2 className="text-3xl font-serif text-white">Der Punkt</h2>
        </div>
        <div className="space-y-6 text-lg text-[var(--color-navy-text-body)] font-light leading-relaxed max-w-2xl">
          <p>Dieses Dokument trägt echtes Arbeitswissen in sich.</p>
          <p>Keine Theorie.<br />Keine Dekoration.<br />Nützliches Urteil.</p>
        </div>
      </section>

      {/* 05. Dokumente */}
      <section className="space-y-8 pt-8 border-t border-[var(--color-navy-border-light)]">
        <div className="space-y-2">
          <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">05</h2>
          <h2 className="text-3xl font-serif text-white">Dokumente</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#" className="px-8 py-4 bg-white text-black hover:bg-slate-200 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> Audit PDF öffnen
          </a>
          <a href="#" className="px-8 py-4 bg-[var(--color-navy-surface)] text-white hover:bg-[var(--color-navy-elevated)] border border-[var(--color-navy-border-light)] rounded-full font-medium transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Scorecard herunterladen
          </a>
          <a href="#" className="px-8 py-4 bg-[var(--color-navy-surface)] text-white hover:bg-[var(--color-navy-elevated)] border border-[var(--color-navy-border-light)] rounded-full font-medium transition-colors flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" /> Audit Workbook öffnen
          </a>
        </div>
      </section>

      {/* 06. Schlusszeile */}
      <section className="text-center pt-16">
        <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold mb-6">06</h2>
        <p className="text-[var(--color-navy-text-body)] font-serif italic text-lg">
          Entscheidungsreifes Signal ist wichtiger als sichtbare Aktivität.
        </p>
      </section>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-32 pb-32">
      {/* 1. Hero */}
      <section className="pt-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        <div className="flex-1 space-y-8">
          <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">ÜBER CARLOS AZEVEDO</h2>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
            Hi, ich bin Carlos.
          </h1>
          <div className="text-xl text-[var(--color-navy-text-body)] max-w-2xl font-light leading-relaxed space-y-4">
            <p className="text-white font-medium">Growth- und Performance-Marketer mit einer starken Leidenschaft für Daten, Systeme und kommerzieller Klarheit — geprägt von fundiertem Finanzwissen und praktischer Marketing-Erfahrung.</p>
            <p>Ich baue Systeme, die Paid Acquisition, Messung und Sales-Realität miteinander verbinden — damit Wachstum nicht nur gut reportet aussieht, sondern wirklich belastbar wird.</p>
          </div>
        </div>

        {/* Profile Image - Vertical Portrait */}
        <div className="w-56 md:w-64 shrink-0 rounded-2xl overflow-hidden border border-[var(--color-navy-border-light)] shadow-2xl relative aspect-[3/4]">
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
          <h2 className="text-3xl font-serif text-white">Impact & Scale</h2>
          <p className="text-[var(--color-navy-text-body)] font-light">Belege für systematisches Wachstum und operative Substanz.</p>
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
            <div key={i} className="flex flex-col md:flex-row gap-6 p-8 bg-[var(--color-navy-surface)] border border-[var(--color-navy-border-light)] rounded-2xl hover:bg-[var(--color-navy-elevated)] transition-colors">
              <div className="md:w-1/3">
                <div className="text-3xl font-serif text-white mb-1">{proof.metric}</div>
              </div>
              <div className="md:w-2/3 text-[var(--color-navy-text-body)] font-light leading-relaxed flex items-center">
                {proof.context}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Documents */}
      <section className="space-y-12 pt-8 border-t border-[var(--color-navy-border-light)]">
        <div className="space-y-4">
          <h2 className="text-3xl font-serif text-white">Dokumente</h2>
          <p className="text-[var(--color-navy-text-body)] font-light">Unterlagen und weiterführende Links.</p>
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
              className="bg-[var(--color-navy-surface)] border border-[var(--color-navy-border-light)] p-6 rounded-2xl flex items-center justify-between hover:bg-[var(--color-navy-elevated)] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-navy-base)] border border-[var(--color-navy-border-light)] flex items-center justify-center shrink-0 group-hover:border-blue-500/30 transition-colors">
                  {doc.icon}
                </div>
                <h3 className="text-white font-medium">{doc.title}</h3>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-[var(--color-navy-base)] px-2 py-1 rounded border border-[var(--color-navy-border-light)]">{doc.type}</span>
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
        <h2 className="text-3xl font-serif text-white mb-4">Dateien & Downloads</h2>
        <p className="text-slate-400 font-light max-w-2xl">Greifen Sie auf die Rohmodelle und maßgeschneiderten Audit-Pakete zu, die diesen Brief unterstützen.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: "SaaS Growth Model", desc: "Interaktive Tabelle mit CAC- und ARR-Prognosen.", type: "XLSX", size: "1.2 MB" },
          { title: "Dashboard-Exporte", desc: "PDF-Exporte der Research- und Growth-Dashboards.", type: "PDF", size: "4.5 MB" },
          { title: "Audit-Scorecard-Paket", desc: "Vollständiges Framework zur Bewertung von Wachstumssystemen.", type: "ZIP", size: "2.1 MB" },
          { title: "Briefing-Dokument", desc: "Eine druckbare Version dieses Strategic Briefs.", type: "PDF", size: "800 KB" },
        ].map((file, i) => (
          <div key={i} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:bg-white/5 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">{file.title}</h4>
              <p className="text-sm text-slate-500 font-light mb-3">{file.desc}</p>
              <div className="flex gap-3 text-xs font-medium text-slate-600">
                <span className="px-2 py-1 bg-white/5 rounded">{file.type}</span>
                <span className="px-2 py-1 bg-white/5 rounded">{file.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('brief');

  const navItems = [
    { id: 'brief', label: 'Brief' },
    { id: 'research', label: 'Research' },
    { id: 'growth', label: 'Growth Model' },
    { id: 'audit', label: 'Audit Scorecard' },
    { id: 'about', label: 'About' },
    { id: 'files', label: 'Dateien' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-blue-500/30">
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-serif text-xl text-white tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            homie<span className="text-slate-500 italic">Brief</span>
          </div>
          <div className="hidden md:flex items-center gap-1 overflow-x-auto">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeSection === item.id
                  ? 'bg-white/10 text-white'
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
            {activeSection === 'brief' && <BriefSection onNavigate={setActiveSection} />}
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
            {activeSection === 'audit' && <AuditSection />}
            {activeSection === 'about' && <AboutSection />}
            {activeSection === 'files' && <FilesSection />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
