$file = 'c:\Users\Carlos Azevedo\Desktop\homie-strategic-brief\src\components\ResearchDashboard.tsx'
$lines = Get-Content $file

# Lines 237-421 (1-indexed) = indices 236-420 (0-indexed)
$before = $lines[0..235]
$after = $lines[421..($lines.Count - 1)]

$newBlock = @'
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
          <h2 className="text-white/80 font-bold mb-4 uppercase tracking-widest text-sm">Overview</h2>
          <h1 className="text-5xl font-bold font-display mb-6 leading-tight text-white">
            Growth- &amp; Performance-Engine.<br />Gebaut für Skalierung.
          </h1>
          <p className="text-xl text-white/90 mb-6 leading-relaxed">
            High-Intent Demand erfassen. Pipeline skalieren. Paid, CRM und Sales als ein System bauen — nicht als getrennte Funktionen.
            <Citation id="1" onClick={onOpenEvidence} />
          </p>
          <p className="text-sm text-white/70 mb-8 max-w-3xl">
            Ausschließlich auf Basis öffentlicher Informationen. Wo interne Daten fehlen, sind mir transparente Annahmen wichtiger als falsche Präzision.
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

      {/* Motion Toggle + Benchmark KPI Card */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden premium-shadow">
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
              {benchmarkKpis.map((kpi) => (
                <div key={kpi.label} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
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

      {/* TL;DR + Day 90 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-500" /> TL;DR
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>• Trial- und Demo-Motion parallel aufbauen — segmentiert nach Intent, nicht nach Bauchgefühl.<Citation id="3" onClick={onOpenEvidence} /></li>
            <li>• Full-Funnel-Tracking sauber aufsetzen: Consent Mode v2, LinkedIn Insight Tag, HubSpot.<Citation id="4" onClick={onOpenEvidence} /></li>
            <li>• Kanäle in klarer Reihenfolge skalieren: Google Search → LinkedIn ABM → Retargeting.</li>
          </ul>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-gray-100 premium-shadow">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <Rocket className="w-5 h-5 mr-2 text-homie-primary" /> Ziel: Tag 90
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Stabiles Tracking. Klarerer SQL-Flow. Erste CAC- und Pipeline-Benchmarks. Bereit für kontrollierte Skalierung.
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
        <h3 className="text-xl font-bold font-display mb-6 flex items-center">
          <Info className="w-5 h-5 mr-2 text-homie-primary" /> Warum diese Rolle jetzt relevant wirkt
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "Nicht nur mehr Volumen.",
              desc: "Von außen wirkt es weniger so, als ginge es nur um mehr Traffic, und mehr um die Frage, wie bezahlte Nachfrage in belastbare Pipeline übersetzt wird.",
              color: "border-t-blue-500"
            },
            {
              label: "Expansion erhöht Komplexität.",
              desc: "Die sichtbaren Sales-Hires deuten auf regionale Expansion hin. Eine plausible Folge: Paid, CRM und Sales müssen sauberer zusammenspielen.",
              color: "border-t-indigo-500"
            },
            {
              label: "Paid wird zum System-Thema.",
              desc: "Eine plausible Interpretation ist, dass Kampagnensteuerung allein nicht mehr reicht und Messbarkeit, Attribution und Handoff wichtiger werden.",
              color: "border-t-emerald-500"
            }
          ].map((item, i) => (
            <div key={i} className={`p-5 rounded-2xl bg-gray-50 border border-gray-100 border-t-4 ${item.color}`}>
              <h4 className="font-bold text-gray-900 mb-2">{item.label}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap Snapshot */}
      <div className="p-8 rounded-3xl bg-white border border-gray-100 premium-shadow">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Ausblick: 30 / 60 / 90 Tage</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-12 left-[16.66%] w-[66.66%] h-0.5 bg-gray-200 z-0" />
          {[
            { day: '30', title: 'Fundament', desc: 'Tracking live. Erste SQLs attribuiert. Google Search aktiv.', color: 'bg-emerald-500', ring: 'ring-emerald-100', text: 'text-emerald-700', badge: 'bg-emerald-50', kpi: 'Erster attribuierbarer SQL' },
            { day: '60', title: 'Skalierung', desc: 'SQL-Volumen stabil. Retargeting live. Erste Playbooks.', color: 'bg-blue-500', ring: 'ring-blue-100', text: 'text-blue-700', badge: 'bg-blue-50', kpi: '10+ SQLs / Monat' },
            { day: '90', title: 'System Live', desc: 'ABM läuft. CAC- und Pipeline-Benchmarks etabliert. Skalierbar.', color: 'bg-indigo-500', ring: 'ring-indigo-100', text: 'text-indigo-700', badge: 'bg-indigo-50', kpi: 'Vorhersehbare Pipeline' }
          ].map((item) => (
            <div key={item.day} className={cn("relative z-10 flex flex-col p-6 rounded-2xl border border-gray-100 shadow-sm", item.badge)}>
              <div className="flex items-center gap-4 mb-4">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ring-4", item.color, item.ring)}>{item.day}</div>
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
          Von außen wirkt die Rolle weniger wie eine isolierte Channel-Funktion und mehr wie eine Growth-Systems-Rolle. Die Signale rund um Pipeline, Attribution, CRM und Sales-Alignment deuten darauf hin, dass die Herausforderung möglicherweise nicht nur darin liegt, mehr Nachfrage zu erzeugen, sondern ein Setup aufzubauen, dem das Unternehmen beim Skalieren vertrauen kann.
        </p>
      </div>
    </div>
  );
}
'@

$result = $before + ($newBlock -split "`n") + $after
$result | Set-Content $file -Encoding UTF8
Write-Output "Done. New line count: $($result.Count)"
