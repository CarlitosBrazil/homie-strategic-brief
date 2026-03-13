/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  TrendingUp,
  Euro,
  BarChart3,
  Layers,
  Users,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ─── REAL MODEL DATA (sourced from audited Excel model v21) ───────────────────
const YEARS = ["2026", "2027", "2028", "2029", "2030"];

const ARR_BY_PLAN: Record<string, number[]> = {
  Basic:      [143.2,  184.5,  211.7,  221.2,  242.0],
  Business:   [249.2,  360.5,  471.4,  549.4,  669.6],
  Pro:        [434.8,  749.2, 1166.4, 1565.2, 2188.9],
  Enterprise: [614.4, 1314.8, 2603.2, 4600.6, 7660.0],
};

const TOTAL_ARR  = [1.44,  2.61,  4.45,  6.94, 10.76]; // €M
const CUSTOMERS  = [155,   226,   302,   367,   466];
const GROWTH_PCT = [111,    84,    73,    59,    57];
const HIRED_REPS = [7,      8,     10,    11,    15];
const SM_SPEND   = [456,   688,  1020,  1354,  1961]; // €K
const NET_BURN   = [821,   155,  -576, -2168, -4244]; // €K (neg = profitable)

const LOGOS: Record<string, number[]> = {
  Basic:      [57, 72,  81,  83,  89],
  Business:   [47, 66,  83,  93, 109],
  Pro:        [39, 64,  94, 119, 157],
  Enterprise: [12, 24,  44,  72, 111],
};

const UNIT_ECON = [
  { plan: "Basic",      price: 190,  gm: 78, churn: 4.0, ltv: 4.0,   cac: 1008,  ltvcac: 4.0, role: "Auffangnetz" },
  { plan: "Business",   price: 390,  gm: 80, churn: 3.0, ltv: 11.4,  cac: 2224,  ltvcac: 5.1, role: "SMB Kern" },
  { plan: "Pro",        price: 790,  gm: 82, churn: 2.5, ltv: 29.0,  cac: 6530,  ltvcac: 4.4, role: "Hero Tier ★" },
  { plan: "Enterprise", price: 3500, gm: 80, churn: 1.5, ltv: 214.7, cac: 27048, ltvcac: 7.9, role: "Skalierungshebel" },
];

const OPEN_ROLES = [
  { title: "Sales Manager", location: "Köln",        market: "Germany South",  tier: "Pro + Enterprise", arr: "€1.5–3M" },
  { title: "Sales Manager", location: "Hamburg",     market: "Germany North",  tier: "Pro + Enterprise", arr: "€1.5–3M" },
  { title: "Sales Manager", location: "Remote",      market: "Poland",         tier: "Business + Pro",   arr: "€0.8–1.5M" },
  { title: "Sales Manager", location: "Remote",      market: "UK / NL / Scan", tier: "Pro + Enterprise", arr: "€2–4M" },
  { title: "Junior Sales",  location: "Hamburg",     market: "DE Inbound",     tier: "Basic + Business", arr: "€0.5–1M" },
];

const PLAN_COLORS: Record<string, string> = {
  Basic:      "#94a3b8", // slate-400
  Business:   "#93c5fd", // blue-300
  Pro:        "#2563eb", // blue-600
  Enterprise: "#4f46e5", // indigo-600
};

export default function GrowthDashboard() {
  const [activeTab, setActiveTab] = useState('growth');
  const [barHover, setBarHover] = useState<number | null>(null);
  const [roleHover, setRoleHover] = useState<number | null>(null);

  const tabs = [
    { id: "growth",    label: "5-Jahres-Wachstum", icon: BarChart3 },
    { id: "expansion", label: "Vertriebsexpansion", icon: Users },
    { id: "marketing", label: "Marketing-Maschine", icon: Zap },
    { id: "economics", label: "Unit Economics", icon: Euro },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Navigation */}
        <header className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-200/60 sticky top-0 z-30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Layers className="text-blue-600" /> homie Wachstumsarchitektur
              </h1>
              <p className="text-slate-500 font-medium mt-1">Skalierungsstrategie mit Fokus auf Professional</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 md:mt-0 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold flex items-center gap-2 shadow-md"
            >
              <TrendingUp size={18} />
              €100M ARR Ziel
            </motion.div>
          </div>

          {/* Tab Switcher */}
          <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === t.id
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {/* ══════════════════════════════ TAB 1: GROWTH MODEL */}
          {activeTab === 'growth' && (
            <motion.div
              key="growth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Left Column: KPI Strip & Bar Chart */}
              <div className="lg:col-span-2 space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "ARR 2026",      value: "€1.44M",  sub: "+111% YoY",            color: "text-blue-600", border: "border-t-blue-600"  },
                    { label: "ARR 2028",      value: "€4.45M",  sub: "Break-even Jahr",      color: "text-emerald-600", border: "border-t-emerald-600"   },
                    { label: "ARR 2030",      value: "€10.76M", sub: "466 Kunden gesamt",  color: "text-indigo-600", border: "border-t-indigo-600"  },
                    { label: "Gross Margin",  value: "~80%",    sub: "Alle Jahre, alle Tiers", color: "text-amber-600", border: "border-t-amber-600"   },
                  ].map(k => (
                    <div key={k.label} className={`bg-white/90 backdrop-blur-sm border border-slate-200/60 rounded-xl p-4 shadow-sm border-t-4 ${k.border}`}>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{k.label}</div>
                      <div className={`text-2xl font-black leading-tight ${k.color}`}>{k.value}</div>
                      <div className="text-xs text-slate-500 mt-1">{k.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Bar chart */}
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60">
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-800 m-0">
                      ARR Build-up nach Plan
                    </h2>
                    <p className="m-0 text-slate-500 text-sm">
                      Hover für Details · Enterprise wird bis 2030 dominant
                    </p>
                  </div>
                  
                  <div className="h-64 flex items-end justify-between gap-4 pt-4 border-b-2 border-slate-200 pb-2 relative px-2">
                    <div className="absolute top-0 w-full border-b border-dashed border-slate-200 z-0"></div>
                    <div className="absolute top-1/4 w-full border-b border-dashed border-slate-200 z-0"></div>
                    <div className="absolute top-2/4 w-full border-b border-dashed border-slate-200 z-0"></div>
                    <div className="absolute top-3/4 w-full border-b border-dashed border-slate-200 z-0"></div>

                    {YEARS.map((year, idx) => {
                      const plans = ["Basic", "Business", "Pro", "Enterprise"];
                      const total = plans.reduce((s, p) => s + ARR_BY_PLAN[p][idx], 0);
                      const maxTotal = Math.max(...TOTAL_ARR) * 1000;
                      const heightPct = (total / maxTotal) * 100;
                      const isHov = barHover === idx;

                      return (
                        <div 
                          key={idx} 
                          className="flex-1 flex flex-col items-center justify-end z-10 h-full group hover:z-50 transition-all relative cursor-default"
                          onMouseEnter={() => setBarHover(idx)}
                          onMouseLeave={() => setBarHover(null)}
                        >
                          {/* Tooltip */}
                          {isHov && (
                            <div className="absolute bottom-[calc(100%+8px)] left-1/2 transform -translate-x-1/2 bg-white border border-slate-200 rounded-xl p-3 z-50 w-40 shadow-lg">
                              <div className="font-bold text-xs text-slate-900 mb-1.5 border-b border-slate-100 pb-1">
                                {year}
                              </div>
                              {[...plans].reverse().map(p => (
                                <div key={p} className="flex justify-between text-[11px] mb-1">
                                  <span className="font-semibold" style={{ color: PLAN_COLORS[p] }}>{p}</span>
                                  <span className="font-semibold text-slate-700">€{ARR_BY_PLAN[p][idx]}K</span>
                                </div>
                              ))}
                              <div className="border-t border-slate-100 mt-1.5 pt-1.5 flex justify-between">
                                <span className="text-[11px] text-slate-500">Gesamt</span>
                                <span className="text-xs text-blue-600 font-extrabold">€{(total / 1000).toFixed(2)}M</span>
                              </div>
                              <div className="text-[10px] text-emerald-600 text-right mt-0.5">+{GROWTH_PCT[idx]}% YoY</div>
                            </div>
                          )}

                          <div 
                            className="w-full max-w-[80px] flex flex-col-reverse relative rounded-t-md overflow-hidden transition-transform duration-200 origin-bottom"
                            style={{ 
                              height: `${heightPct}%`, 
                              minHeight: '5%',
                              transform: isHov ? "scaleY(1.04)" : "scaleY(1)",
                              boxShadow: isHov ? "0 -2px 12px rgba(37,99,235,0.3)" : "none"
                            }}
                          >
                            {plans.map(p => (
                              <div 
                                key={p} 
                                className="w-full relative"
                                style={{ 
                                  height: `${(ARR_BY_PLAN[p][idx] / total) * 100}%`, 
                                  background: PLAN_COLORS[p], 
                                  minHeight: '2px' 
                                }}
                              />
                            ))}
                          </div>
                          <div className={`mt-2 text-xs font-bold ${isHov ? 'text-blue-600' : 'text-slate-500'}`}>{year}</div>
                          <div className={`text-sm font-extrabold ${isHov ? 'text-blue-600' : 'text-slate-900'}`}>€{(total / 1000).toFixed(2)}M</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-5 mt-6 justify-center flex-wrap">
                    {Object.entries(PLAN_COLORS).map(([p, c]) => (
                      <div key={p} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Customers & Burn */}
              <div className="space-y-6 lg:col-span-1">
                {/* Customer count */}
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60">
                  <h3 className="m-0 mb-4 text-sm font-bold text-slate-900">
                    Kunden nach Plan
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr>
                          <th className="text-left text-slate-500 font-semibold pb-2 text-[10px] uppercase">Plan</th>
                          {YEARS.map(y => (
                            <th key={y} className="text-right text-slate-500 font-semibold pb-2 text-[10px]">{y.slice(2)}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {["Basic", "Business", "Pro", "Enterprise"].map(p => (
                          <tr key={p} className="border-t border-slate-100">
                            <td className="py-2 font-bold" style={{ color: PLAN_COLORS[p] }}>{p}</td>
                            {LOGOS[p].map((v, i) => (
                              <td key={i} className={`text-right py-2 ${p === "Pro" || p === "Enterprise" ? "font-bold text-slate-700" : "text-slate-500"}`}>{v}</td>
                            ))}
                          </tr>
                        ))}
                        <tr className="border-t-2 border-blue-200 bg-blue-50">
                          <td className="py-2 font-extrabold text-blue-600 text-[11px] px-1">Gesamt</td>
                          {CUSTOMERS.map((v, i) => (
                            <td key={i} className="text-right text-blue-600 font-extrabold py-2 px-1">{v}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Burn path */}
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60">
                  <h3 className="m-0 mb-4 text-sm font-bold text-slate-900">
                    Burn & Profitabilität
                  </h3>
                  {YEARS.map((y, i) => {
                    const profitable = NET_BURN[i] < 0;
                    const pct = Math.min(Math.abs(NET_BURN[i]) / 4500, 1);
                    return (
                      <div key={y} className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500 font-semibold">{y}</span>
                          <span className={`font-bold ${profitable ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {profitable ? `+€${Math.abs(NET_BURN[i])}K Profit` : `−€${NET_BURN[i]}K Burn`}
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${profitable ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${pct * 100}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700 font-semibold flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</div>
                    Break-even erreicht 2028 bei €4.45M ARR
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════ TAB 2: SALES EXPANSION */}
          {activeTab === 'expansion' && (
            <motion.div
              key="expansion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Banner */}
              <div className="lg:col-span-3 bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Das Einstellungssignal: 5 offene Sales-Rollen
                  </h2>
                  <p className="text-slate-400 text-sm">
                    homie expandiert aktiv von 2 → 7 Sales Reps in DE, PL, UK, NL & Skandinavien.
                  </p>
                </div>
                <div className="flex gap-6 md:gap-10 items-center">
                  {[
                    { label: "Vorher", value: "2", sub: "Sales Reps", color: "text-amber-400" },
                    { label: "Nachher",  value: "7", sub: "Sales Reps", color: "text-emerald-400" },
                  ].map(item => (
                    <div key={item.label} className="text-center">
                      <div className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">{item.label}</div>
                      <div className={`font-black text-4xl leading-none my-1 ${item.color}`}>{item.value}</div>
                      <div className="text-slate-400 text-xs">{item.sub}</div>
                    </div>
                  ))}
                  <div className="w-px bg-slate-700 h-12 hidden md:block" />
                  <div className="text-center hidden md:block">
                    <div className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">ARR 2030</div>
                    <div className="text-blue-400 font-black text-3xl leading-none my-1">€10.8M</div>
                    <div className="text-emerald-400 text-xs">vs €1.75M Base Case</div>
                  </div>
                </div>
              </div>

              {/* Open roles */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Offene Positionen</h3>
                  <div className="space-y-2">
                    {OPEN_ROLES.map((r, i) => (
                      <div
                        key={i}
                        onMouseEnter={() => setRoleHover(i)}
                        onMouseLeave={() => setRoleHover(null)}
                        className={`p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 cursor-default ${
                          roleHover === i ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-slate-100 bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-sm text-slate-900">{r.title}</div>
                          <div className="text-slate-500 text-xs mt-1">{r.location} · {r.market}</div>
                        </div>
                        <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between">
                          <span className="inline-block px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold tracking-wide">
                            {r.tier}
                          </span>
                          <div className="text-emerald-600 text-[11px] font-bold sm:mt-1.5">{r.arr} Territory</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex justify-between items-center">
                    <span className="text-emerald-700 text-sm font-bold">Kombiniertes Territory ARR Potenzial</span>
                    <span className="text-emerald-600 text-lg font-black">€6.3–12.5M</span>
                  </div>
                </div>
              </div>

              {/* Impact */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Sales-Kapazität vs. Bedarf</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    2026–2027 zeigt absichtliche Überkapazität (Hired Reps) zur Beschleunigung des Wachstums ab 2028.
                    <br />
                    <em>2026–2027 intentionally includes surplus capacity to support later growth.</em>
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr>
                          {["Jahr", "Hired Reps", "Bedarf", "Status"].map((h, i) => (
                            <th key={h} className={`text-slate-500 font-semibold pb-3 text-[10px] uppercase ${i === 0 ? 'text-left' : 'text-center'}`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {YEARS.map((y, i) => {
                          const needed = [5, 7, 10, 11, 15][i];
                          const ok = HIRED_REPS[i] >= needed;
                          return (
                            <tr key={y} className="border-t border-slate-100">
                              <td className="py-2.5 text-slate-600 font-semibold">{y}</td>
                              <td className="text-center py-2.5 text-slate-900 font-bold">{HIRED_REPS[i]}</td>
                              <td className="text-center py-2.5 text-slate-500">{needed}</td>
                              <td className="text-center py-2.5">
                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                                  ok ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {ok ? "✓ OK" : "Skalierung"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">ARR Uplift vs. Base Case</h3>
                  <div className="space-y-4">
                    {YEARS.map((y, i) => {
                      const expanded = TOTAL_ARR[i];
                      const base = [0.91, 1.22, 1.41, 1.55, 1.75][i];
                      const uplift = Math.round((expanded / base - 1) * 100);
                      return (
                        <div key={y}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-slate-600 font-semibold">{y}</span>
                            <span className="text-emerald-600 font-bold">+{uplift}% Uplift</span>
                          </div>
                          <div className="flex gap-1 h-2">
                            <div className="bg-amber-400 rounded-full opacity-60" style={{ flex: base / expanded }} />
                            <div className="bg-emerald-500 rounded-full" style={{ flex: (expanded - base) / expanded }} />
                          </div>
                          <div className="flex gap-3 text-[10px] mt-1.5 text-slate-500">
                            <span>Base Case €{base}M</span>
                            <span className="text-emerald-600 font-semibold">Mit Expansion €{expanded}M</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════ TAB 3: MARKETING ENGINE */}
          {activeTab === 'marketing' && (
            <motion.div
              key="marketing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Campaign architecture */}
              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60 h-full">
                  <h2 className="text-lg font-bold text-slate-800 mb-1">Kampagnen-Architektur</h2>
                  <p className="text-slate-500 text-xs mb-6">Budgetallokation nach Tarif und GTM-Motion</p>
                  
                  <div className="space-y-4">
                    {[
                      {
                        tier: "Professional", pct: "60–80%", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200",
                        channels: ["LinkedIn ABM", "Google High-Intent", "Retargeting"],
                        motion: "Sales-Assisted", cac: "€6,530", payback: "12 mo",
                        note: "Primärer S&M Spend. Liefert SQLs direkt an Sales. Stärkste LTV/CAC-Disziplin.",
                      },
                      {
                        tier: "Enterprise", pct: "10–15%", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200",
                        channels: ["LinkedIn Outbound", "Event ABM", "CS Expansion"],
                        motion: "Sales-Led", cac: "€27,048", payback: "12 mo",
                        note: "Kleineres Ad-Budget, höchster ACV (€42K/Jahr). CS übernimmt Expansion-Pipeline.",
                      },
                      {
                        tier: "Basic + Business", pct: "10–20%", color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200",
                        channels: ["Meta Broad", "Google PMax", "SEO Content"],
                        motion: "Self-Serve / Automated", cac: "€1K–€2.2K", payback: "9 mo",
                        note: "Kapital-recycelnder Funnel. Low-touch, füttert die Upgrade-Pipeline über Zeit.",
                      },
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-xl border ${item.border} ${item.bg}`}>
                        <div className="flex justify-between mb-3">
                          <div>
                            <div className={`font-bold text-sm mb-2 ${item.color}`}>{item.tier}</div>
                            <div className="flex gap-1.5 flex-wrap">
                              {item.channels.map(c => (
                                <span key={c} className="bg-white border border-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded font-semibold">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-black text-xl leading-none ${item.color}`}>{item.pct}</div>
                            <div className="text-slate-500 text-[10px] mt-1">des Ad-Budgets</div>
                          </div>
                        </div>
                        <div className="flex gap-4 mb-2">
                          {[["CAC", item.cac], ["Payback", item.payback], ["Motion", item.motion]].map(([k, v]) => (
                            <span key={k} className="text-[11px] text-slate-500">
                              {k}: <strong className="text-slate-700">{v}</strong>
                            </span>
                          ))}
                        </div>
                        <div className="text-slate-500 text-[11px] italic">{item.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* S&M spend + funnel + retention */}
              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">S&M Budget-Skalierung</h3>
                  <div className="space-y-3">
                    {YEARS.map((y, i) => {
                      const pct = SM_SPEND[i] / Math.max(...SM_SPEND);
                      return (
                        <div key={y}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-slate-600 font-semibold">{y}</span>
                            <span className="text-slate-700 font-bold">€{SM_SPEND[i]}K/Jahr · €{Math.round(SM_SPEND[i] / 12)}K/Monat</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                              style={{ width: `${pct * 100}%` }} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Pro-Tarif Funnel (pro €100K Spend)</h3>
                  <div className="space-y-1.5">
                    {[
                      { label: "Clicks (CPC €8)",           value: "12,500", highlight: false },
                      { label: "Leads (LP CVR 6.4%)",        value: "800",    highlight: false },
                      { label: "MQLs (Qual. 30%)",           value: "240",    highlight: false },
                      { label: "SQLs / Demos (MQL→SQL 32%)", value: "76.8",   highlight: false },
                      { label: "Closed Won (SQL→Won 20%)",   value: "15.36",  highlight: true  },
                      { label: "Neuer Pro ARR (€9,480/Jahr)",value: "€145.6K",highlight: true  },
                    ].map((row, i) => (
                      <div key={i} className={`flex justify-between p-2.5 rounded-lg border ${
                        row.highlight ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'
                      }`}>
                        <span className="text-slate-600 text-xs">{row.label}</span>
                        <span className={`font-bold text-sm ${row.highlight ? 'text-emerald-600' : 'text-slate-800'}`}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-700">
                    <strong>Blended CAC: €6,510</strong> — innerhalb des €6,530 Ziels · Payback &lt;12 Monate
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Retention & Expansion (Modell-Inputs)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Pro Monthly Churn",   value: "2.5%",  note: "~27% jährlich",       color: "text-amber-600",  bg: "bg-amber-50", border: "border-amber-200" },
                      { label: "Enterprise Churn",    value: "1.5%",  note: "~17% jährlich",       color: "text-emerald-600",  bg: "bg-emerald-50", border: "border-emerald-200" },
                      { label: "Pro Expansion Rate",  value: "12%",   note: "Overages + Upgrades", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
                      { label: "Ent. Expansion",      value: "18%",   note: "ABM Upsell / Seats",  color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
                    ].map((item, i) => (
                      <div key={i} className={`p-3 rounded-xl border ${item.border} ${item.bg}`}>
                        <div className={`font-black text-2xl leading-none ${item.color}`}>{item.value}</div>
                        <div className="text-slate-800 text-[11px] font-bold mt-2">{item.label}</div>
                        <div className="text-slate-500 text-[10px] mt-1">{item.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════ TAB 4: UNIT ECONOMICS */}
          {activeTab === 'economics' && (
            <motion.div
              key="economics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {UNIT_ECON.map((u) => (
                  <div key={u.plan} className={`bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60 relative border-t-4 ${
                    u.plan === 'Pro' ? 'border-t-blue-600' : 'border-t-slate-200'
                  }`}>
                    {u.plan === "Pro" && (
                      <div className="absolute top-4 right-4 bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Hero Tier
                      </div>
                    )}
                    <div className="font-black text-xl mb-1" style={{ color: PLAN_COLORS[u.plan] }}>{u.plan}</div>
                    <div className="text-slate-500 text-xs mb-5">{u.role}</div>

                    <div className="flex justify-between mb-4">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-1">Preis</div>
                        <div className="font-bold text-lg text-slate-800">
                          {u.plan === "Enterprise" ? "Custom" : `€${u.price}/mo`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-1">Gross Margin</div>
                        <div className="font-bold text-lg text-emerald-600">{u.gm}%</div>
                      </div>
                    </div>

                    <div className="h-px bg-slate-100 mb-4" />

                    <div className="space-y-3">
                      {[
                        { label: "Monthly Churn", value: `${u.churn}%/mo`, color: u.churn > 3 ? 'text-amber-600' : 'text-emerald-600' },
                        { label: "Customer LTV",  value: `€${u.ltv}K`,      color: 'text-blue-600' },
                        { label: "Illustr. CAC",  value: `€${u.cac.toLocaleString()}`, color: 'text-slate-800' },
                        { label: "LTV : CAC",     value: `${u.ltvcac}×`,    color: u.ltvcac >= 5 ? 'text-emerald-600' : 'text-blue-600' },
                      ].map((row, ri) => (
                        <div key={ri} className={`flex justify-between pb-2 ${ri < 3 ? 'border-b border-slate-100' : ''}`}>
                          <span className="text-slate-500 text-xs">{row.label}</span>
                          <span className={`font-bold text-sm ${row.color}`}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5">
                      <div className="text-[10px] text-slate-500 mb-1.5">LTV:CAC (3× Minimum)</div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${u.ltvcac >= 5 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                          style={{ width: `${Math.min((u.ltvcac / 10) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <span className="text-[9px] text-slate-400">0×</span>
                        <span className="text-[9px] text-amber-500">3× min</span>
                        <span className="text-[9px] text-slate-400">10×</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Insights */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Strategische Erkenntnisse</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: "Professional ist der Wirtschaftsmotor",
                      body: "Mit €29K LTV vs €6.5K CAC (4.4× Ratio) liefert Pro die beste Balance aus Volumen und Wertdichte. 60–80% des Ad-Budgets gehören hierhin.",
                      color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200"
                    },
                    {
                      title: "Enterprise ist der Bewertungshebel",
                      body: "Mit 7.9× LTV:CAC and €214K LTV pro Logo bringt Enterprise überproportionale ARR-Dichte. Die 5 neuen Hires erschließen dieses Tier skaliert.",
                      color: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200"
                    },
                    {
                      title: "Basic/Business refinanzieren CAC",
                      body: "Automatisierte Funnels für niedrigere Tiers sind nicht der Wachstumsmotor — sie sind Kapital-Recycling und eine Upgrade-Pipeline. Payback < 9 Monate ist das Ziel.",
                      color: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200"
                    },
                    {
                      title: "Churn-Verbesserung = Compounding ARR",
                      body: "Jede 0.5% Reduktion im Pro Monthly Churn fügt dem 2030 ARR ~€200K hinzu (bei aktuellen Logo-Zahlen). Retention ist der höchste ROI-Hebel nach der Akquise.",
                      color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200"
                    },
                  ].map((item, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${item.border} ${item.bg}`}>
                      <div className={`font-bold text-sm mb-2 ${item.color}`}>{item.title}</div>
                      <div className="text-slate-600 text-xs leading-relaxed">{item.body}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
