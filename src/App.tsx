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
            A different kind of application.<br />
            <span className="italic" style={{ color: '#A8C7D9' }}>Built around the role.</span>
          </h1>
          <div className="pt-8 flex justify-center">
            <button onClick={() => {
              document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-slate-200 transition-colors shadow-xl">
              Application Letter
            </button>
          </div>
        </section>
      </div>

      {/* 01 — A Letter to the homie Team */}
      <div className="max-w-4xl mx-auto w-full">
        <section id="letter" className="relative scroll-mt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl -z-10" />
          <SectionCard>
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">01</h3>
            <h2 className="text-3xl font-serif text-slate-900 mb-8">A Letter to the homie Team</h2>

            <div className="space-y-6 text-slate-800 font-serif leading-relaxed text-lg max-w-2xl">
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
      </div>

      {/* 02 — The Role */}
      <section className="space-y-6">
        <SectionCard isDark={true}>
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">02</h3>
          <h2 className="text-3xl font-serif text-white mb-8">The Role</h2>
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg max-w-2xl">
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
          <div className="space-y-8 text-slate-700 font-light leading-relaxed text-lg">
            <p className="max-w-2xl">This role signals a shift.</p>
            <p className="max-w-2xl">Not just more traffic, but more sustainable expansion.</p>

            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">A shift from:</p>
              <div className="grid md:grid-cols-2 gap-6 w-full">
                <div className="bg-slate-100/50 border border-slate-200/60 rounded-2xl p-8 space-y-4 transition-all duration-300">
                  <div className="w-fit px-2 py-0.5 rounded bg-slate-200/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Before</div>
                  <p className="text-slate-800 font-serif text-xl leading-snug whitespace-nowrap">Can marketing generate volume?</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-xl shadow-slate-200/20 ring-1 ring-blue-500/5 transition-all duration-300 transform md:scale-[1.02]">
                  <div className="w-fit px-2 py-0.5 rounded bg-blue-50 text-[10px] font-bold text-blue-600 uppercase tracking-widest">Now</div>
                  <p className="text-slate-900 font-serif text-xl leading-snug">Can the business trust what marketing generates enough to scale it?</p>
                </div>
              </div>
            </div>

            <p className="pt-2 max-w-2xl">That is the real change.</p>
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
          <div className="space-y-8 text-slate-700 font-light leading-relaxed text-lg">
            <p className="max-w-2xl">Paid is not a channel in isolation.<br />It is part of a larger growth system.</p>

            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">The real chain is:</p>
              <div className="flex items-center gap-x-12 bg-slate-50 border border-slate-200/60 p-8 md:p-10 rounded-2xl w-full">
                {[
                  'budget',
                  'qualified pipeline',
                  'sales capacity',
                  'retained revenue'
                ].map((item, i, arr) => (
                  <React.Fragment key={item}>
                    <div className="flex flex-col shrink-0">
                      <span className="font-mono text-[10px] text-blue-600 uppercase tracking-widest mb-1">Step 0{i + 1}</span>
                      <span className="font-serif text-xl text-slate-900">{item}</span>
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

            <p className="text-slate-600 max-w-2xl">Because paid acquisition cannot scale on its own.<br />And acquisition efficiency without retention quality is false efficiency.</p>

            <div className="pt-2">
              <button onClick={() => onNavigate('growth')} className="text-blue-700 hover:text-blue-900 font-medium flex items-center gap-2 transition-colors group">
                Growth Dashboard <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
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
            <p className="max-w-2xl">Built from public inputs only.</p>
            <p className="max-w-2xl">It starts with the visible price points on your site and expands into a harder what-if:</p>
            <div className="bg-[#0f0f0f] px-8 py-10 rounded-2xl border border-white/5 shadow-2xl w-full">
              <p className="text-white text-lg font-serif italic leading-relaxed whitespace-nowrap">What would need to be true for homie to build toward unicorn-scale value over time?</p>
            </div>
            <p className="max-w-2xl">Not as a prediction.<br />As a sharper way to think.</p>
            <p>The screenshots below come directly from the model.</p>
            <div className="pt-4 pb-2">
              <p className="text-[10px] font-bold text-blue-500/80 uppercase tracking-[0.25em] mb-4">Growth Model Preview</p>
              <div
                className="aspect-video bg-[#0d0d0d] border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden relative group cursor-pointer shadow-2xl"
                onClick={() => onNavigate('growth')}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-8 left-8 z-20 space-y-1">
                  <p className="text-white text-xl font-medium tracking-tight">Interactive Growth Model</p>
                  <p className="text-sm text-slate-400 font-light">Click to open</p>
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
            <p>Platform performance and business performance are not always the same thing.</p>
            <p>The real scorecard starts where paid data, CRM stages, pipeline quality, and recurring revenue meet.</p>
          </div>
        </SectionCard>
      </section >

      {/* 08 — The Audit */}
      < section className="space-y-6" >
        <SectionCard isDark={true}>
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">08</h3>
          <h2 className="text-3xl font-serif text-white mb-8">The Audit</h2>
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg max-w-2xl">
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
      </section >

      {/* 09 — What I Would Want to Build */}
      < section className="space-y-6" >
        <SectionCard isDark={false}>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">09</h3>
          <h2 className="text-3xl font-serif text-slate-900 mb-8">What I Would Want to Build</h2>
          <div className="space-y-6 text-slate-700 font-light leading-relaxed text-lg max-w-2xl">
            <p>Not more media buying in isolation.</p>
            <p>A growth function that sees clearly, measures honestly, and scales with more confidence.</p>
          </div>
        </SectionCard>
      </section >

      {/* 10 — If This Resonates */}
      < section className="space-y-6 pt-12 border-t border-white/10" >
        <SectionCard isDark={true}>
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">10</h3>
          <h2 className="text-3xl font-serif text-white mb-8">If This Resonates</h2>
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg max-w-2xl">
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
      </section >

    </div >
  );
}

function AuditSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-32 pb-32">
      {/* 01. The Audit */}
      <section className="pt-10 space-y-8">
        <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">01</h2>
        <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
          The Audit
        </h1>
        <div className="text-xl text-[var(--color-navy-text-body)] max-w-2xl font-light leading-relaxed space-y-6">
          <p>Tracking and attribution looked like one of the likely pressure points behind the role.</p>
          <p>So I did not just mention it.<br />I built around it.</p>
          <p>I wanted to contribute something useful.<br />A practical gift for the team.</p>
        </div>
      </section>

      {/* 02. What It Reviews */}
      <section className="space-y-12">
        <div className="space-y-2">
          <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">02</h2>
          <h2 className="text-3xl font-serif text-white">What It Reviews</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Tracking & attribution",
            "CRM signal quality",
            "Campaign structure",
            "Reporting & feedback loops"
          ].map((title, i) => (
            <div key={i} className="p-8 bg-[var(--color-navy-surface)] border border-[var(--color-navy-border-light)] rounded-2xl hover:bg-[var(--color-navy-elevated)] transition-colors">
              <h3 className="text-xl font-serif text-white">{title}</h3>
            </div>
          ))}
        </div>
        <div className="text-lg text-[var(--color-navy-text-body)] font-light leading-relaxed max-w-2xl">
          <p>Not in isolation.<br />As one system.</p>
        </div>
      </section>

      {/* 03. Why It Matters */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">03</h2>
          <h2 className="text-3xl font-serif text-white">Why It Matters</h2>
        </div>
        <div className="space-y-6 text-lg text-[var(--color-navy-text-body)] font-light leading-relaxed max-w-2xl">
          <p>Weak measurement makes everything downstream harder to trust.</p>
          <p>Platform numbers can look clean.<br />Pipeline quality can say something else.</p>
          <p>That is the gap.</p>
        </div>
      </section>

      {/* 04. The Point */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">04</h2>
          <h2 className="text-3xl font-serif text-white">The Point</h2>
        </div>
        <div className="space-y-6 text-lg text-[var(--color-navy-text-body)] font-light leading-relaxed max-w-2xl">
          <p>This document carries real working knowledge.</p>
          <p>Not theory.<br />Not decoration.<br />Useful judgment.</p>
        </div>
      </section>

      {/* 05. Documents */}
      <section className="space-y-8 pt-8 border-t border-[var(--color-navy-border-light)]">
        <div className="space-y-2">
          <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">05</h2>
          <h2 className="text-3xl font-serif text-white">Documents</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#" className="px-8 py-4 bg-white text-black hover:bg-slate-200 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> Open Audit PDF
          </a>
          <a href="#" className="px-8 py-4 bg-[var(--color-navy-surface)] text-white hover:bg-[var(--color-navy-elevated)] border border-[var(--color-navy-border-light)] rounded-full font-medium transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Download Scorecard
          </a>
          <a href="#" className="px-8 py-4 bg-[var(--color-navy-surface)] text-white hover:bg-[var(--color-navy-elevated)] border border-[var(--color-navy-border-light)] rounded-full font-medium transition-colors flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" /> Open Audit Workbook
          </a>
        </div>
      </section>

      {/* 06. Closing Line */}
      <section className="text-center pt-16">
        <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold mb-6">06</h2>
        <p className="text-[var(--color-navy-text-body)] font-serif italic text-lg">
          Decision-grade signal matters more than visible activity.
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
          <h2 className="text-blue-500/80 uppercase tracking-[0.2em] text-xs font-bold">ABOUT CARLOS AZEVEDO</h2>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
            Hi, I’m Carlos.
          </h1>
          <div className="text-xl text-[var(--color-navy-text-body)] max-w-2xl font-light leading-relaxed space-y-4">
            <p className="text-white font-medium">Growth strategist specializing in B2B SaaS and performance marketing.</p>
            <p>I build systems that connect paid acquisition, measurement, and sales reality — so growth becomes easier to trust, not just easier to report.</p>
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
              I have experienced first-hand how powerful scaling can be — inside a business that grew from roughly 300 active clients to more than 1.9 million customers across seven countries in about two years. I have also experienced what happens when growth runs ahead of process, measurement, and structure.
            </p>
            <p>
              Part of how I work today is turning complexity into usable frameworks — audits, SOPs, scorecards, and decision structures that make growth systems more reliable.
            </p>
            <p className="text-[#0F172A] font-medium pt-4 border-l-2 border-blue-500 pl-4 italic">
              "Growth is not just about generating volume. It is about generating trust in the system that produces the volume."
            </p>
          </div>
        </div>
      </section>

      {/* 3. Impact & Scale */}
      <section className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-serif text-white">Impact & Scale</h2>
          <p className="text-[var(--color-navy-text-body)] font-light">Evidence of systematic growth and operational rigor.</p>
        </div>

        <div className="space-y-6">
          {[
            {
              metric: "€50M+ Managed",
              context: "Direct paid media responsibility across B2B lead generation and e-commerce.",
            },
            {
              metric: "2,800+ Trained",
              context: "Contributed to training systems used by 2,800+ professionals and 200+ agency owners.",
            },
            {
              metric: "4x Lead Growth",
              context: "Scaled B2B lead acquisition while improving operational structure and contribution to revenue.",
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
          <h2 className="text-3xl font-serif text-white">Documents</h2>
          <p className="text-[var(--color-navy-text-body)] font-light">Supporting materials and profile links.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Full CV", icon: <FileText className="w-5 h-5 text-blue-400" />, type: "PDF", link: cvPdf },
            { title: "Recommendation Letters", icon: <FileText className="w-5 h-5 text-emerald-400" />, type: "PDF", link: recPdf },
            { title: "Certificates", icon: <Award className="w-5 h-5 text-purple-400" />, type: "PDF", link: certPdf },
            { title: "LinkedIn Profile", icon: <ExternalLink className="w-5 h-5 text-slate-400" />, type: "Link", link: "#" },
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
