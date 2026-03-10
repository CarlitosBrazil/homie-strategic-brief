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
      <div className="relative z-10 p-10 md:p-16">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-32 pb-32">

      {/* Hero */}
      <section className="pt-10 pb-10 text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
          A different kind of application.<br />
          <span className="text-blue-300 italic">Built around the role.</span>
        </h1>
        <div className="pt-8 flex justify-center">
          <button onClick={() => {
            document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' });
          }} className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-slate-200 transition-colors">
            Application Letter
          </button>
        </div>
      </section>

      {/* 01 — A Letter to the homie Team */}
      <section id="letter" className="relative scroll-mt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl -z-10" />
        <SectionCard>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">01</h3>
          <h2 className="text-3xl font-serif text-slate-900 mb-8">A Letter to the homie Team</h2>

          <div className="space-y-6 text-slate-800 font-serif leading-relaxed text-lg">
            <p>I did not want to send a standard application.</p>
            <p>
              I read the role closely.<br />
              To me, it looked less like a channel job and more like a growth systems job.
            </p>
            <p>
              Paid. Pipeline. Tracking. CRM. Sales alignment.<br />
              Not in isolation. As one system.
            </p>
            <p>That is what pulled me in.</p>
            <p>So instead of talking too much about how I work, I built something around the role:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>research</li>
              <li>a growth model</li>
              <li>a paid media and tracking audit</li>
            </ul>
            <p>Everything was built from public information only.</p>
            <p>The model starts with the price points on your site and extends into a what-if:</p>
            <div className="pl-6 border-l-2 border-blue-500/40 italic text-slate-700">
              <p>What would need to be true for a company like homie to build toward unicorn-scale value over time?</p>
            </div>
            <p>
              Not as a prediction.<br />
              As a sharper way to think.
            </p>
            <p>The audit is there because tracking and attribution looked like one of the likely pressure points behind the role. In my work with God Tier Ads and Midas Media, this was consistently one of the most common and most important issues.</p>
            <p>So this page is simple.</p>
            <p>
              I saw the challenge.<br />
              I thought about it seriously.<br />
              And I built the material.
            </p>
            <p>That is how I wanted to apply.</p>
            <p>I hope it resonates with all of you.</p>
            <p className="pt-4">
              Best regards,<br />
              <span className="font-serif text-2xl italic mt-2 block text-slate-900">Carlos Azevedo</span>
            </p>
          </div>
        </SectionCard>
      </section>

      {/* 02 — The Role */}
      <section className="space-y-6">
        <SectionCard isDark={true}>
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">02</h3>
          <h2 className="text-3xl font-serif text-white mb-8">The Role</h2>
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
            <p>A data-driven performance marketer who can fix what matters for growth:</p>
            <ul className="space-y-4 pl-6 border-l border-white/10 text-white/90">
              <li>measurement that is not yet decision-grade</li>
              <li>lead flow that does not always equal lead quality</li>
              <li>platform performance that may not fully match business truth</li>
              <li>paid, CRM, and sales signals that do not yet speak with one voice</li>
              <li>growth ambition pressing against operating structure</li>
            </ul>
            <p>Critical for growth.<br />Not in isolation. As one system.</p>
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
          <div className="space-y-6 text-slate-700 font-light leading-relaxed text-lg">
            <p>This role signals a shift.</p>
            <p>Not just more traffic, but more sustainable expansion.</p>
            <p>A shift from:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/70 border border-slate-200 rounded-xl p-6 space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Before</p>
                <p className="text-slate-800 font-medium">Can marketing generate volume?</p>
              </div>
              <div className="bg-white border border-slate-300 rounded-xl p-6 space-y-2 shadow-sm">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-widest">Now</p>
                <p className="text-slate-900 font-medium">Can the business trust what marketing generates enough to scale it?</p>
              </div>
            </div>
            <p>That is the real change.</p>
            <div className="pt-2">
              <button onClick={() => onNavigate('audit')} className="text-blue-700 hover:text-blue-900 font-medium flex items-center gap-2 transition-colors">
                Audit Scorecard &rarr;
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
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
            <p>An outside-in view of the business:</p>
            <ul className="space-y-3 pl-6 border-l border-white/10 text-white/80">
              <li>where homie looks strongest</li>
              <li>which ICPs look most valuable</li>
              <li>what the market seems to reward</li>
              <li>where friction is likely to show up</li>
              <li>what this role really needs to strengthen</li>
            </ul>
            <p>Built to surface what matters early.</p>
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
          <div className="space-y-6 text-slate-700 font-light leading-relaxed text-lg">
            <p>Paid is not a channel in isolation.<br />It is part of a larger growth system.</p>
            <p>The real chain is:</p>
            <p className="font-mono text-sm text-slate-800 bg-white border border-slate-200 p-4 rounded-xl">
              budget &rarr; qualified pipeline &rarr; sales capacity &rarr; retained revenue
            </p>
            <p>That is the model.</p>
            <p>Because paid acquisition cannot scale on its own.<br />And acquisition efficiency without retention quality is false efficiency.</p>
            <div className="pt-2">
              <button onClick={() => onNavigate('growth')} className="text-blue-700 hover:text-blue-900 font-medium flex items-center gap-2 transition-colors">
                Growth Dashboard &rarr;
              </button>
            </div>
          </div>
        </SectionCard>
      </section>

      {/* 06 — The Model */}
      <section className="space-y-6">
        <SectionCard isDark={true}>
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">06</h3>
          <h2 className="text-3xl font-serif text-white mb-8">The Model</h2>
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
            <p>Built from public inputs only.</p>
            <p>It starts with the visible price points on your site and expands into a harder what-if:</p>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <p className="text-white text-xl font-serif italic">What would need to be true for homie to build toward unicorn-scale value over time?</p>
            </div>
            <p>Not as a prediction.<br />As a sharper way to think.</p>
            <p>The screenshots below come directly from the model.</p>
            <div className="pt-4 pb-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Growth Model Preview</p>
              <div
                className="aspect-video bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative group cursor-pointer"
                onClick={() => onNavigate('growth')}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60 z-10" />
                <div className="absolute bottom-6 left-6 z-20">
                  <p className="text-white font-medium">Interactive Growth Model</p>
                  <p className="text-sm text-slate-400">Click to open</p>
                </div>
                <div
                  className="w-full h-full opacity-50 group-hover:opacity-70 transition-opacity bg-cover bg-center"
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
      </section>

      {/* 07 — Business Truth */}
      <section className="space-y-6">
        <SectionCard isDark={false}>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">07</h3>
          <h2 className="text-3xl font-serif text-slate-900 mb-8">Business Truth</h2>
          <div className="space-y-6 text-slate-800 font-serif leading-relaxed text-lg">
            <p>Platform performance and business performance are not always the same thing.</p>
            <p>The real scorecard starts where paid data, CRM stages, pipeline quality, and recurring revenue meet.</p>
          </div>
        </SectionCard>
      </section>

      {/* 08 — The Audit */}
      <section className="space-y-6">
        <SectionCard isDark={true}>
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">08</h3>
          <h2 className="text-3xl font-serif text-white mb-8">The Audit</h2>
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
            <p>I included the audit for a simple reason.</p>
            <p>Tracking and attribution looked like one of the likely pressure points behind the role.</p>
            <p>In my work with God Tier Ads and Midas Media, this was consistently one of the most common and most important issues.</p>
            <p>So I did not just mention it.<br />I built around it.</p>
            <div className="pt-2">
              <button onClick={() => onNavigate('audit')} className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition-colors">
                Audit Scorecard &rarr;
              </button>
            </div>
          </div>
        </SectionCard>
      </section>

      {/* 09 — What I Would Want to Build */}
      <section className="space-y-6">
        <SectionCard isDark={false}>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">09</h3>
          <h2 className="text-3xl font-serif text-slate-900 mb-8">What I Would Want to Build</h2>
          <div className="space-y-6 text-slate-700 font-light leading-relaxed text-lg">
            <p>Not more media buying in isolation.</p>
            <p>A growth function that sees clearly, measures honestly, and scales with more confidence.</p>
          </div>
        </SectionCard>
      </section>

      {/* 10 — If This Resonates */}
      <section className="space-y-6 pt-12 border-t border-white/10">
        <SectionCard isDark={true}>
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">10</h3>
          <h2 className="text-3xl font-serif text-white mb-8">If This Resonates</h2>
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
            <p>
              This is not meant as certainty.<br />
              And it is not meant as a polished performance.
            </p>
            <p>It is simply the most honest way I know to apply:</p>
            <ul className="space-y-2 pl-6 border-l border-white/10 text-white/90">
              <li>to do the work first,</li>
              <li>to think carefully,</li>
              <li>and to make that thinking visible.</li>
            </ul>
            <p>If that feels useful, I would be glad to walk through the materials and discuss how I would approach the first 90 days.</p>
            <div className="pt-12">
              <button className="px-8 py-4 bg-white text-black hover:bg-slate-200 rounded-full font-medium transition-colors">
                Schedule a Conversation
              </button>
            </div>
          </div>
        </SectionCard>
      </section>

    </div>
  );
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
