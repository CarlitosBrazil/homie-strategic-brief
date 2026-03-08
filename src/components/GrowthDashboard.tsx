/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  TrendingUp,
  Target,
  Euro,
  BarChart3,
  ArrowRight,
  Layers,
  Briefcase,
  Sliders,
  PieChart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GrowthDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // --- TAB 1 DATA: 5-Year Projection ---
  const yearlyData = [
    { year: 'Jahr 1', total: 2.7, basic: 0.2, business: 0.4, pro: 1.8, enterprise: 0.3 },
    { year: 'Jahr 2', total: 8.5, basic: 0.5, business: 1.0, pro: 5.5, enterprise: 1.5 },
    { year: 'Jahr 3', total: 21.0, basic: 1.5, business: 2.5, pro: 13.0, enterprise: 4.0 },
    { year: 'Jahr 4', total: 48.0, basic: 3.0, business: 6.0, pro: 29.0, enterprise: 10.0 },
    { year: 'Jahr 5', total: 100.0, basic: 5.0, business: 10.0, pro: 60.0, enterprise: 25.0 },
  ];

  const tierData = [
    { name: 'Basic', price: '€190', arr: '€2,280', cacTarget: '€450', focus: 'Auffangnetz' },
    { name: 'Business', price: '€390', arr: '€4,680', cacTarget: '€1,200', focus: 'Auffangnetz' },
    { name: 'Professional (Hero)', price: '€790', arr: '€9,480', cacTarget: '€2,666', focus: 'Kernfokus' },
    { name: 'Enterprise', price: 'Individuell', arr: '€30,000+', cacTarget: '€8,500', focus: 'Expansion' },
  ];

  // --- TAB 2 DATA: Spend Scenarios (Based on €64k/mo total budget) ---
  const scenarios = [
    {
      id: 'diluted',
      name: 'Breit gestreuter Ansatz',
      allocation: 40,
      color: 'slate',
      monthlySpend: 25600,
      clicks: 3200,
      mqls: 192,
      sqls: 48,
      dealsPerMo: 9.6,
      year1Arr: 1.09,
      description:
        'Budget wird gleichmäßig über alle Tarife verteilt. Ergebnis: zu wenige SQLs – die Kapazität von Peter & Lennart wird nicht ausgeschöpft.',
    },
    {
      id: 'growth',
      name: 'Wachstumsfokus (Empfohlene Basis)',
      allocation: 60,
      color: 'blue',
      monthlySpend: 38400,
      clicks: 4800,
      mqls: 288,
      sqls: 72,
      dealsPerMo: 14.4,
      year1Arr: 1.64,
      description:
        'Solide Allokation. Versorgt Sales mit 72 SQLs/Monat und lässt 40% Budget für automatisierte Auffangnetze in den niedrigeren Tarifen.',
    },
    {
      id: 'hero',
      name: 'Aggressive „Hero“-Strategie',
      allocation: 80,
      color: 'indigo',
      monthlySpend: 51200,
      clicks: 6400,
      mqls: 384,
      sqls: 96,
      dealsPerMo: 19.2,
      year1Arr: 2.18,
      description:
        'Maximale Geschwindigkeit. Bringt Sales auf 80% Auslastung (96 SQLs/Monat) und fokussiert das Segment mit dem stärksten LTV/CAC-Verhältnis.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Navigation */}
        <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
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
          <div className="flex space-x-2 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-colors flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BarChart3 size={16} /> 5-Jahres-Skalierung
            </button>
            <button
              onClick={() => setActiveTab('scenarios')}
              className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-colors flex items-center gap-2 ${
                activeTab === 'scenarios'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Sliders size={16} /> Paid-Budget-Szenarien
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {/* TAB 1: 5-YEAR OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Left Column: Tiers & Economics */}
              <div className="space-y-6 lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Euro className="text-emerald-500" /> Unit Economics nach Tarif
                  </h2>
                  <div className="space-y-4">
                    {tierData.map((tier, idx) => (
                      <div
                        key={idx}
                        className={`p-3 border rounded-xl transition-colors ${
                          tier.name.includes('Hero')
                            ? 'border-blue-500 bg-blue-50 shadow-sm'
                            : 'border-slate-100 bg-slate-50 hover:border-blue-200'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className={`font-bold ${tier.name.includes('Hero') ? 'text-blue-700' : 'text-slate-800'}`}>
                            {tier.name}
                          </span>
                          <span className="text-sm font-semibold text-blue-600">{tier.price}/mo</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                          <span>ARR: {tier.arr}</span>
                          <span>
                            Max. CAC: <span className="text-emerald-600 font-semibold">{tier.cacTarget}</span>
                          </span>
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded border inline-block ${
                            tier.name.includes('Hero')
                              ? 'bg-blue-600 text-white border-blue-700'
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          Strategie: {tier.focus}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Target className="text-blue-400" /> Der „Hero-Produkt“-Funnel
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-slate-800 p-3 rounded-lg border border-blue-500 relative shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                      <div className="absolute -top-3 right-2 bg-blue-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Kernfokus
                      </div>
                      <div className="text-slate-400 text-sm mb-1">1. Akquisitionsmaschine</div>
                      <div className="text-lg font-bold text-white">Professional-Pipeline</div>
                      <div className="text-xs text-slate-400 mt-1">
                        60-80% des Paid-Budgets fließen hierhin. Hyper-targeted LinkedIn/Google Ads liefern Sales High-Intent SQLs.
                      </div>
                    </div>
                    <div className="flex justify-center text-slate-600">
                      <ArrowRight size={20} className="rotate-90" />
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <div className="text-slate-400 text-sm mb-1">2. Auffangnetz</div>
                      <div className="text-lg font-bold text-slate-300">Basic & Business</div>
                      <div className="text-xs text-slate-400 mt-1">
                        Leads, die nicht Sales-ready sind, werden in automatisierte Self-Serve-Funnels überführt, um CAC zu refinanzieren.
                      </div>
                    </div>
                    <div className="flex justify-center text-slate-600">
                      <ArrowRight size={20} className="rotate-90" />
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg border border-emerald-900">
                      <div className="text-slate-400 text-sm mb-1">3. Expansion-Umsatz</div>
                      <div className="text-lg font-bold text-emerald-400">Enterprise-Upgrades</div>
                      <div className="text-xs text-slate-400 mt-1">
                        CS identifiziert erfolgreiche Pro-Kunden; Marketing steuert ABM-Kampagnen, um Upgrades auf die Enterprise-API zu realisieren.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 5-Year Forecast Stacked Chart */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <BarChart3 className="text-blue-600" /> €100M ARR Run-Rate-Verlauf (Pro-getrieben)
                      </h2>
                      <p className="text-sm text-slate-500">
                        Run-Rate-Szenario zur Einordnung von Skalierungsanforderungen und Unit Economics.
                      </p>
                    </div>
                  </div>

                  {/* Stacked Bar Chart Implementation */}
                  <div className="h-80 flex items-end justify-between gap-4 pt-4 border-b-2 border-slate-200 pb-2 relative">
                    <div className="absolute top-0 w-full border-b border-dashed border-slate-200 z-0"></div>
                    <div className="absolute top-1/4 w-full border-b border-dashed border-slate-200 z-0"></div>
                    <div className="absolute top-2/4 w-full border-b border-dashed border-slate-200 z-0"></div>
                    <div className="absolute top-3/4 w-full border-b border-dashed border-slate-200 z-0"></div>

                    {yearlyData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center justify-end z-10 h-full group hover:z-50 transition-all">
                        <div className="text-sm font-bold text-slate-700 mb-2">€{data.total}M</div>
                        <div
                          className="w-full max-w-[80px] flex flex-col-reverse relative shadow-sm hover:shadow-md transition-shadow"
                          style={{ height: `${(data.total / 100) * 100}%`, minHeight: '5%' }}
                        >
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.basic / data.total) * 100}%` }}
                            className="w-full bg-slate-300 relative"
                          ></motion.div>
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.business / data.total) * 100}%` }}
                            className="w-full bg-blue-200 relative"
                          ></motion.div>
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.pro / data.total) * 100}%` }}
                            className="w-full bg-blue-600 relative border-x-2 border-blue-700"
                          ></motion.div>
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.enterprise / data.total) * 100}%` }}
                            className="w-full bg-indigo-800 rounded-t-sm relative"
                          ></motion.div>

                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-[#0f172a] p-4 rounded-xl shadow-2xl border border-slate-800 opacity-0 group-hover:opacity-100 pointer-events-none z-50 w-52 transition-all duration-200">
                            <div className="text-blue-400 text-sm font-bold mb-3">
                              {data.year.replace('Jahr', 'Year')} Breakdown
                            </div>
                            
                            <div className="space-y-2.5 mb-3 border-b border-slate-800 pb-3">
                              <div className="text-xs flex justify-between items-center">
                                <span className="text-slate-400">Enterprise:</span> 
                                <span className="text-white font-bold">€{data.enterprise}M</span>
                              </div>
                              <div className="text-xs flex justify-between items-center">
                                <span className="text-blue-500 font-semibold">Professional:</span> 
                                <span className="text-white font-bold">€{data.pro}M</span>
                              </div>
                              <div className="text-xs flex justify-between items-center">
                                <span className="text-slate-400">Business:</span> 
                                <span className="text-white font-bold">€{data.business}M</span>
                              </div>
                              <div className="text-xs flex justify-between items-center">
                                <span className="text-slate-400">Basic:</span> 
                                <span className="text-white font-bold">€{data.basic}M</span>
                              </div>
                            </div>

                            <div className="flex justify-between items-center pt-1">
                              <span className="text-white text-sm font-bold">Total ARR:</span>
                              <span className="text-emerald-400 text-sm font-black">€{data.total}M</span>
                            </div>

                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                              <div className="border-8 border-transparent border-t-[#0f172a]"></div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 text-sm font-bold text-slate-600">{data.year}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                      <div className="w-3 h-3 rounded-sm bg-indigo-800"></div> Enterprise
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 border border-slate-300 px-2 py-1 rounded bg-slate-50">
                      <div className="w-3 h-3 rounded-sm bg-blue-600"></div> Professional (Kern)
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                      <div className="w-3 h-3 rounded-sm bg-blue-200"></div> Business
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                      <div className="w-3 h-3 rounded-sm bg-slate-300"></div> Basic
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                    <Briefcase className="text-slate-700" size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">Annahmen (zur Diskussion)</h3>
                  <ul className="text-sm text-slate-600 space-y-1 list-disc pl-5">
                    <li>Paid CAC umfasst nur Media-Spend (ohne Sales-Personalkosten und Onboarding).</li>
                    <li>CPC €8; LP CVR 6%; MQL→SQL 25%; SQL→Won 20%.</li>
                    <li>Sales-Kapazitätsreferenz: 120 SQL/Monat.</li>
                    <li>Der ARR entspricht der annualisierten Run-Rate aus gewonnenen Kunden.</li>
                    <li>Bruttomargen-Sensitivität: ~75–85% abhängig von AI-Nutzungslimits.</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                      <Target className="text-blue-600" size={20} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">CAC-Allokation nach Tarif</h3>
                    <p className="text-sm text-slate-600">
                      CAC-Ziele unterscheiden sich je Tarif. Wir allokieren Budget entsprechend: automatisiertes Meta/Google für Basic/Business sowie High-Intent Search + LinkedIn/ABM für Professional/Enterprise – ausgelegt, um CAC-Limits einzuhalten und zur Sales-Kapazität zu passen.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                      <TrendingUp className="text-emerald-600" size={20} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">Unicorn-Nordstern (inspirativ)</h3>
                    <p className="text-sm text-slate-600">
                      €1B ist eine Richtung, keine Prognose. Wenn wir auf dem Professional-Tarif eine planbare Pipeline aufbauen und Retention sowie Expansion (NRR) stark halten, folgt Bewertung als Konsequenz aus ARR und Markt-Multiples – Umsetzung zuerst.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: AD SPEND SCENARIOS */}
          {activeTab === 'scenarios' && (
            <motion.div
              key="scenarios"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl shadow-sm text-white flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <PieChart className="text-blue-400" /> Budget-Allokationsszenarien
                  </h2>
                  <p className="text-slate-300 text-sm mt-1">
                    Modellierung des Year-1-Effekts: Ein hypothetisches Budget von €64.000/Monat mit Fokus auf den Professional-Tarif.
                  </p>
                </div>
                <div className="bg-slate-800/50 border border-slate-600 p-3 rounded-lg text-sm">
                  <div className="text-slate-400">Monatliches Gesamtbudget (Jahr 1)</div>
                  <div className="font-bold text-xl text-emerald-400">€64,000 / mo</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {scenarios.map((s) => (
                  <motion.div
                    key={s.id}
                    whileHover={{ y: -5 }}
                    className={`bg-white p-6 rounded-2xl shadow-sm border-2 relative flex flex-col h-full ${
                      s.id === 'hero'
                        ? 'border-indigo-500 shadow-indigo-100'
                        : s.id === 'growth'
                        ? 'border-blue-400'
                        : 'border-slate-200'
                    }`}
                  >
                    {s.id === 'growth' && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Ausgewogenes Wachstum
                      </div>
                    )}
                    {s.id === 'hero' && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Maximale Geschwindigkeit
                      </div>
                    )}

                    <div className="mb-4">
                      <h3
                        className={`text-xl font-bold ${
                          s.id === 'hero' ? 'text-indigo-900' : s.id === 'growth' ? 'text-blue-900' : 'text-slate-800'
                        }`}
                      >
                        {s.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-2 h-16">{s.description}</p>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-sm font-semibold text-slate-600">Allokation auf Pro-Tarif</span>
                        <span
                          className={`text-2xl font-black ${
                            s.id === 'hero' ? 'text-indigo-600' : s.id === 'growth' ? 'text-blue-600' : 'text-slate-500'
                          }`}
                        >
                          {s.allocation}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.allocation}%` }}
                          className={`h-full ${s.id === 'hero' ? 'bg-indigo-600' : s.id === 'growth' ? 'bg-blue-500' : 'bg-slate-400'}`}
                        ></motion.div>
                      </div>
                      <div className="text-xs text-right mt-1 font-medium text-slate-500">
                        €{s.monthlySpend.toLocaleString()}/mo spend
                      </div>
                    </div>

                    {/* Funnel Metrics */}
                    <div className="space-y-3 flex-grow bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <span className="text-xs text-slate-500 uppercase font-semibold">Generierte MQLs</span>
                        <span className="font-bold text-slate-700">{s.mqls} / mo</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <span className="text-xs text-slate-500 uppercase font-semibold">Demos (SQLs)</span>
                        <span className="font-bold text-slate-700">{s.sqls} / mo</span>
                      </div>
                      <div className="flex justify-between items-center pb-1">
                        <span className="text-xs text-slate-500 uppercase font-semibold">Gewonnene Deals (Pro)</span>
                        <span className={`font-bold ${s.id === 'hero' ? 'text-indigo-600' : 'text-slate-700'}`}>
                          {s.dealsPerMo} / mo
                        </span>
                      </div>
                    </div>

                    {/* ARR Output */}
                    <div
                      className={`mt-auto p-4 rounded-xl border ${
                        s.id === 'hero'
                          ? 'bg-indigo-50 border-indigo-200'
                          : s.id === 'growth'
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div className="text-xs uppercase font-bold text-slate-500 mb-1">
                        Zusätzlicher Pro-ARR (annualisierte Run-Rate)
                      </div>
                      <div
                        className={`text-3xl font-black ${
                          s.id === 'hero' ? 'text-indigo-700' : s.id === 'growth' ? 'text-blue-700' : 'text-slate-700'
                        }`}
                      >
                        €{s.year1Arr}M
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl flex items-start gap-4">
                <div className="bg-emerald-100 p-2 rounded-full mt-1">
                  <Euro className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900 text-lg">Mehrwert fokussierter Allokation</h3>
                  <p className="text-emerald-800 text-sm mt-1">
                    Der Wechsel von 40% auf 60% Allokation erhöht den erwarteten Pro-ARR in Jahr 1 um ~<strong>€540,000</strong> (bei
                    gleichbleibendem Monatsbudget von €64,000). Ziel ist nicht ein „perfekter Split“, sondern eine Allokation, die
                    Pipeline-Impact dort maximiert, wo die Unit Economics am stärksten sind.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
