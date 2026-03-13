import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface StrategicBriefProps {
  onNavigate: (id: string) => void;
}

const SectionCard = ({ children, className = '', isDark = false }: { children: React.ReactNode, className?: string, isDark?: boolean }) => (
  <div
    className={`rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-500 ${isDark ? 'backdrop-blur-md border border-slate-800' : ''} ${className}`}
    style={{
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : '#F7F2EB',
      color: isDark ? '#e2e8f0' : '#1e293b',
      ...(!isDark ? { border: 'none' } : {})
    }}
  >
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

export default function StrategicBrief({ onNavigate }: StrategicBriefProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 space-y-32 pb-32">
      {/* Hero */}
      <div className="max-w-4xl mx-auto">
        <section className="pt-24 pb-20 text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif text-white leading-tight"
          >
            Eine andere Art der Bewerbung.<br />
            <span className="italic" style={{ color: '#A8C7D9' }}>Rund um die Rolle gebaut.</span>
          </motion.h1>
          <p className="text-xl text-slate-400 font-light">So gedacht, dass es nützlich ist.</p>
          <div className="pt-8 flex justify-center">
            <button 
              onClick={() => {
                document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-slate-200 transition-colors shadow-xl"
            >
              Bewerbung lesen
            </button>
          </div>
        </section>
      </div>

      {/* 01 — Ein Brief an das homie Team */}
      <div className="max-w-4xl mx-auto w-full">
        <section id="letter" className="relative scroll-mt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl -z-10" />
          <SectionCard isDark={false}>
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
              <p>Das Audit ist dabei, because Tracking und Attribution wirkten wie einer der wahrscheinlichen Engpässe hinter der Rolle wirkten. In meiner Arbeit mit God Tier Ads und Midas Media war genau das immer wieder eines der häufigsten und wichtigsten Themen.</p>
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
          <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">02</h3>
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
                  <p className="text-slate-800 font-serif text-xl leading-snug">Kann Marketing Volumen erzeugen?</p>
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
                        <ChevronRight size={20} strokeWidth={1} />
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
            <div className="bg-[#030712] px-8 py-10 rounded-2xl border border-slate-700 shadow-2xl w-full">
              <p className="text-white text-lg font-serif italic leading-relaxed">Was müsste wahr sein, damit homie langfristig in Richtung Unicorn-Scale wachsen kann?</p>
            </div>
            <p className="max-w-2xl">Nicht als Prognose.<br />Als schärfere Denkweise.</p>
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
