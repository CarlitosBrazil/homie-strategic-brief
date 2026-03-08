import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  TrendingUp, 
  CheckSquare, 
  User, 
  Download,
  Quote
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import ResearchDashboard from './components/ResearchDashboard';
import GrowthDashboard from './components/GrowthDashboard';

function BriefSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-32">
      <section className="pt-10 pb-10 text-center space-y-6">
        <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">Private Strategic Briefing</h2>
        <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
          Beyond the Channel. <br/>
          <span className="text-slate-500 italic">A Growth Brief for homie.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
          Prepared exclusively for Marco and the homie leadership team.
        </p>
        <div className="pt-8 flex justify-center gap-4">
          <button onClick={() => {
            document.getElementById('founder-note')?.scrollIntoView({ behavior: 'smooth' });
          }} className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-slate-200 transition-colors">
            Read the Brief
          </button>
          <button onClick={() => onNavigate('growth')} className="px-6 py-3 bg-white/5 text-white rounded-full font-medium border border-white/10 hover:bg-white/10 transition-colors">
            View Growth Model
          </button>
        </div>
      </section>

      <section id="founder-note" className="relative scroll-mt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl -z-10" />
        <div className="bg-[#0a0a0a] border border-white/10 p-10 md:p-16 rounded-2xl shadow-2xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-4 text-slate-500">
            <Quote className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-serif text-white mb-8">Dear Marco,</h3>
          <div className="space-y-6 text-slate-300 font-light leading-relaxed text-lg">
            <p>I did not want to approach homie with a standard application.</p>
            <p>The more interesting the role, the more important it is for me to understand the actual growth logic of the business before applying. That is why I took the time to look more closely at homie and build a small set of materials based on public information: research dashboards and a simplified SaaS growth model.</p>
            <p>This is a practical growth brief, not a company diagnosis. Where internal data is unavailable, I prefer transparent assumptions to fake precision. I approached this as if I had already stepped into the role—focusing on market structure, CAC, pipeline quality, measurement, capacity, and sustainable growth.</p>
            <p>What interests me about homie is that it sits where AI becomes practical business infrastructure rather than hype: measurable, operational, and commercially relevant. I do not read this role as a pure channel-management position. To me, it reads more like a business problem: build a commercially trusted growth system that leadership can scale with confidence.</p>
            <p>My approach to paid performance in SaaS is revenue-first, not campaign-first. Platform truth is not business truth. The real scorecard sits where paid data, CRM stages, and recurring revenue meet.</p>
            <p>Paid acquisition cannot scale independently of sales throughput and customer success capacity. Acquisition efficiency without retention quality is false efficiency. The point of the models included here is not precision; the point is decision quality.</p>
            <p>What makes this application unusual is not presentation for its own sake, but the decision to show substance before making claims. I wanted to do more than describe how I work. I wanted to show it.</p>
            <p className="pt-4">Best regards,<br/><span className="text-white font-serif text-2xl italic mt-2 block">Carlos Azevedo</span></p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-serif text-white mb-6">Why homie?</h2>
          <p className="text-slate-400 font-light leading-relaxed mb-6">
            Connecting AI, practical business value, and growth systems.
          </p>
          <p className="text-slate-300 font-light leading-relaxed">
            I have seen one major technology transition up close before: the early internet and telecom period. That experience taught me how powerful scaling can be, but also what happens when growth runs faster than structure. Part of how I work today is by turning complexity into usable frameworks — audits, scorecards, and decision structures that make growth systems more reliable.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
           <ul className="space-y-4">
             <li className="flex gap-4">
               <div className="w-1 h-full bg-blue-500 rounded-full" />
               <div>
                 <h4 className="text-white font-medium">Operational AI</h4>
                 <p className="text-sm text-slate-400 mt-1">AI as infrastructure, not just a feature.</p>
               </div>
             </li>
             <li className="flex gap-4">
               <div className="w-1 h-full bg-emerald-500 rounded-full" />
               <div>
                 <h4 className="text-white font-medium">Revenue-First</h4>
                 <p className="text-sm text-slate-400 mt-1">Optimizing for scalable ARR, not isolated leads.</p>
               </div>
             </li>
             <li className="flex gap-4">
               <div className="w-1 h-full bg-purple-500 rounded-full" />
               <div>
                 <h4 className="text-white font-medium">Systematic Growth</h4>
                 <p className="text-sm text-slate-400 mt-1">Aligning acquisition with sales throughput.</p>
               </div>
             </li>
           </ul>
        </div>
      </section>

      <section className="text-center pb-20">
        <h2 className="text-2xl font-serif text-white mb-4">Let's discuss the first 90 days.</h2>
        <p className="text-slate-400 font-light mb-8">If useful, I would be glad to walk you through my thinking and how I would approach the role.</p>
        <button className="px-8 py-4 bg-white text-black hover:bg-slate-200 rounded-full font-medium transition-colors">
          Schedule a Conversation
        </button>
      </section>
    </div>
  )
}

function AuditSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 space-y-12">
      <header className="mb-12">
        <h2 className="text-3xl font-serif text-white mb-4">Tailored Audit Scorecard</h2>
        <p className="text-slate-400 font-light max-w-2xl">A practical working framework for evaluating growth systems, turning complexity into reliable decision structures. Not a gimmick, but a real operational tool.</p>
      </header>
      
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-6 text-xs font-medium text-slate-400 uppercase tracking-wider">Dimension</th>
                <th className="p-6 text-xs font-medium text-slate-400 uppercase tracking-wider">Evaluation Criteria</th>
                <th className="p-6 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { dim: "Measurement Integrity", crit: "CRM stages map 1:1 to paid platform conversions.", status: "Review Needed" },
                { dim: "Sales Alignment", crit: "Lead volume matches sales throughput capacity.", status: "Pending Data" },
                { dim: "Unit Economics", crit: "CAC payback period is under 12 months for Professional tier.", status: "Modeled" },
                { dim: "Channel Diversification", crit: "No single paid channel accounts for >60% of pipeline.", status: "Review Needed" },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-6 text-sm text-white font-medium">{row.dim}</td>
                  <td className="p-6 text-sm text-slate-400 font-light">{row.crit}</td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300 whitespace-nowrap">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-12">
      <header className="mb-12">
        <h2 className="text-3xl font-serif text-white mb-4">About Carlos Azevedo</h2>
        <p className="text-slate-400 font-light max-w-2xl">Turning complexity into usable frameworks.</p>
      </header>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 mb-6 flex items-center justify-center">
            <span className="text-slate-600 font-serif text-4xl">CA</span>
          </div>
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              View Full CV
            </a>
            <a href="#" className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              LinkedIn Profile
            </a>
          </div>
        </div>
        <div className="md:col-span-2 space-y-8">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl">
            <h3 className="text-xl font-serif text-white mb-4">Profile</h3>
            <p className="text-slate-400 font-light leading-relaxed">
              Experienced growth strategist specializing in B2B SaaS. Proven track record of aligning paid acquisition with sales throughput and optimizing for revenue rather than vanity metrics. Adept at creating transparent, data-driven frameworks that enable leadership to make confident scaling decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
              <h4 className="text-white font-medium mb-2">Recommendation Letters</h4>
              <p className="text-sm text-slate-500 font-light mb-4">Available upon request.</p>
              <button className="text-sm text-blue-400 hover:text-blue-300">Request Access &rarr;</button>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
              <h4 className="text-white font-medium mb-2">Selected Certificates</h4>
              <ul className="text-sm text-slate-500 font-light space-y-2">
                <li>&bull; Advanced Reforge Growth Series</li>
                <li>&bull; HubSpot Revenue Operations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilesSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-12">
      <header className="mb-12">
        <h2 className="text-3xl font-serif text-white mb-4">Files & Downloads</h2>
        <p className="text-slate-400 font-light max-w-2xl">Access the raw models and tailored audit packages supporting this brief.</p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: "SaaS Growth Model", desc: "Interactive spreadsheet with CAC and ARR projections.", type: "XLSX", size: "1.2 MB" },
          { title: "Dashboard Exports", desc: "PDF exports of the research and growth dashboards.", type: "PDF", size: "4.5 MB" },
          { title: "Audit Scorecard Package", desc: "Complete framework for evaluating growth systems.", type: "ZIP", size: "2.1 MB" },
          { title: "Briefing Document", desc: "A printable version of this strategic brief.", type: "PDF", size: "800 KB" },
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
    { id: 'files', label: 'Files' },
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeSection === item.id 
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
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeSection === item.id 
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
