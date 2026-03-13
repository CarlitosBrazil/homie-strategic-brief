import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function AuditScorecard() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-32 pb-32">
      {/* 01. Das Audit */}
      <section className="pt-10 space-y-8">
        <h2 className="text-blue-400 uppercase tracking-[0.2em] text-xs font-bold">01</h2>
        <h1 className="text-5xl md:text-7xl font-serif text-slate-200 leading-tight">
          Das Audit
        </h1>
        <div className="text-xl text-slate-400 max-w-2xl font-light leading-relaxed space-y-6">
          <p>Tracking und Attribution wirkten wie einer der wahrscheinlichen Engpässe hinter der Rolle.</p>
          <p>Also habe ich es nicht nur erwähnt.<br />Ich habe etwas darum gebaut.</p>
          <p>Ich wollte etwas Nützliches beitragen.<br />Ein praktisches Geschenk für das Team.</p>
        </div>
      </section>

      {/* 02. Was es prüft */}
      <section className="space-y-12">
        <div className="space-y-2">
          <h2 className="text-blue-400 uppercase tracking-[0.2em] text-xs font-bold">02</h2>
          <h2 className="text-3xl font-serif text-slate-200">Was es prüft</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Tracking & Attribution",
            "CRM-Signalqualität",
            "Kampagnenstruktur",
            "Reporting & Feedback-Loops"
          ].map((title, i) => (
            <div key={i} className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl backdrop-blur-md hover:bg-slate-900/60 transition-colors">
              <h3 className="text-xl font-serif text-slate-200">{title}</h3>
            </div>
          ))}
        </div>
        <div className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
          <p>Nicht isoliert.<br />Als ein System.</p>
        </div>
      </section>

      {/* 03. Warum das wichtig ist */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-blue-400 uppercase tracking-[0.2em] text-xs font-bold">03</h2>
          <h2 className="text-3xl font-serif text-slate-200">Warum das wichtig ist</h2>
        </div>
        <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
          <p>Schwache Messung macht alles, was danach kommt, schwerer belastbar.</p>
          <p>Plattform-Zahlen können sauber aussehen.<br />Pipeline-Qualität kann etwas anderes sagen.</p>
          <p>Genau das ist die Lücke.</p>
        </div>
      </section>

      {/* 04. Der Punkt */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-blue-400 uppercase tracking-[0.2em] text-xs font-bold">04</h2>
          <h2 className="text-3xl font-serif text-slate-200">Der Punkt</h2>
        </div>
        <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
          <p>Dieses Dokument trägt echtes Arbeitswissen in sich.</p>
          <p>Keine Theorie.<br />Keine Dekoration.<br />Nützliches Urteil.</p>
        </div>
      </section>

      {/* 05. Dokumente */}
      <section className="space-y-8 pt-8 border-t border-slate-800">
        <div className="space-y-2">
          <h2 className="text-blue-400 uppercase tracking-[0.2em] text-xs font-bold">05</h2>
          <h2 className="text-3xl font-serif text-slate-200">Dokumente</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/downloads/audit-scorecard/B2B SaaS Paid Media Audit_Guide_V2_DE.pdf" download className="px-8 py-4 bg-white text-black hover:bg-slate-200 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> Audit PDF öffnen
          </a>
          <a href="/downloads/audit-scorecard/SaaS_Paid_Media_Audit_Scorecard_v1.0_de.xlsx" download className="px-8 py-4 bg-slate-900/40 text-slate-200 hover:bg-slate-900/60 border border-slate-800 rounded-full font-medium backdrop-blur-md transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Scorecard (DE)
          </a>
          <a href="/downloads/audit-scorecard/SaaS_Paid_Media_Audit_Scorecard_v1.0.xlsx" download className="px-8 py-4 bg-slate-900/40 text-slate-200 hover:bg-slate-900/60 border border-slate-800 rounded-full font-medium backdrop-blur-md transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Scorecard (EN)
          </a>
        </div>
      </section>

      {/* 06. Schlusszeile */}
      <section className="text-center pt-16">
        <h2 className="text-blue-400 uppercase tracking-[0.2em] text-xs font-bold mb-6">06</h2>
        <p className="text-slate-400 font-serif italic text-lg">
          Entscheidungsreifes Signal ist wichtiger als sichtbare Aktivität.
        </p>
      </section>
    </div>
  );
}
