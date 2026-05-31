import React, { useState } from "react";
import { 
  Sparkles, Terminal, ShieldCheck, Mail, ArrowRight, Github, 
  Cpu, Brain, Shield, ChevronRight, Activity, Calendar, Globe, Play
} from "lucide-react";
import AIPOSSimulator from "./components/AIPOSSimulator";
import FeatureGrid from "./components/FeatureGrid";
import ArchitectureGraph from "./components/ArchitectureGraph";
import PricingPlans from "./components/PricingPlans";
import Testimonials from "./components/Testimonials";

export default function App() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [isOrbThinking, setIsOrbThinking] = useState(false);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setInviteEmail("");
    }, 4500);
  };

  const toggleOrbThinkingState = () => {
    setIsOrbThinking(!isOrbThinking);
  };

  return (
    <div className="min-h-screen bg-sand-200 font-sans text-sand-950 overflow-x-hidden selection:bg-indigo-600/10 selection:text-indigo-950">
      
      {/* 1. TOP PREMIUM FLOATING BAR */}
      <header className="sticky top-0 z-50 w-full bg-sand-200/80 backdrop-blur-md border-b border-sand-300 px-4 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Glyph */}
          <a href="#" className="flex items-center gap-2 px-1 py-1 rounded-xl hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/10 border border-indigo-500 flex items-center justify-center shadow-sm">
              <span className="font-display font-black text-indigo-600 text-sm">G</span>
            </div>
            <div>
              <span className="font-display font-black text-sand-950 text-base tracking-tight block leading-none">
                GHOST AI
              </span>
              <span className="text-[8px] font-mono font-bold text-indigo-600 tracking-wider">
                AIPOS v2.5
              </span>
            </div>
          </a>

          {/* Navigation links for elite desktop layout */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-bold text-stone-600">
            <a href="#demo-simulator" className="hover:text-stone-950 transition-colors">OS Simulator</a>
            <a href="#features" className="hover:text-stone-950 transition-colors">Core Features</a>
            <a href="#sub-process" className="hover:text-stone-950 transition-colors">Workflow Automation</a>
            <a href="#architecture" className="hover:text-stone-950 transition-colors">Sovereign Architecture</a>
            <a href="#pricing" className="hover:text-stone-950 transition-colors">Subscription Tiers</a>
          </nav>

          {/* Pilot Link Action CTA */}
          <div className="flex items-center gap-3">
            <a 
              href="#demo-simulator" 
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer flex items-center gap-1.5 border border-indigo-400/30"
            >
              Launch Core <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

        </div>
      </header>

      {/* 2. CORE IMMERSIVE HERO & BRAND ORB CENTERPIECE */}
      <section className="relative pt-16 md:pt-24 pb-16 px-4 max-w-7xl mx-auto text-center overflow-hidden">
        
        {/* Glow Spheres */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none select-none">
          {/* External blur glow */}
          <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-[140px] animate-pulse-glow"></div>
        </div>

        {/* 3D Neural Glowing AI Orb Brand Centerpiece */}
        <div className="relative mb-10 inline-flex items-center justify-center select-none">
          <div 
            onClick={toggleOrbThinkingState}
            className="w-48 h-48 rounded-full flex items-center justify-center cursor-pointer relative group transition-transform duration-500 active:scale-95"
            title="Click to interact with the neural node"
          >
            {/* Concentric rotating glowing clay rings */}
            <div className={`absolute inset-0 rounded-full border border-sand-400/30 animate-spin`} style={{ animationDuration: '25s' }}></div>
            <div className="absolute inset-2 rounded-full border border-sand-500/25 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-5 rounded-full border-2 border-indigo-600/10 border-dashed animate-spin" style={{ animationDuration: '40s' }}></div>

            {/* Core Neural Orb with deep dimensional look and active hover state */}
            <div className={`w-32 h-32 rounded-full orb-gradient p-1 shadow-[2px_12px_24px_rgba(0,0,0,0.1),inset_2px_4px_8px_rgba(255,255,255,0.70)] transition-all duration-700 flex items-center justify-center overflow-hidden ${
              isOrbThinking ? 'scale-105 saturate-120 rotate-45' : 'scale-100 group-hover:scale-105'
            }`}>
              <div className="w-full h-full rounded-full bg-sand-50/95 flex flex-col justify-center items-center backdrop-blur-md shadow-inner">
                <Brain className={`w-10 h-10 text-indigo-600 transition-transform duration-1000 ${
                  isOrbThinking ? 'scale-110 rotate-180 text-rose-600' : 'scale-100 group-hover:rotate-12'
                }`} />
                <span className="text-[8px] font-mono font-bold text-sand-950 mt-1 tracking-widest uppercase">
                  {isOrbThinking ? 'COMMITTED' : 'AIPOS ON'}
                </span>
              </div>
            </div>

            {/* Micro floating satellites representing AI multi-agents */}
            <div className="absolute top-1 left-4 w-5 h-5 rounded-full bg-indigo-500 shadow-md border border-sand-100 animate-float flex items-center justify-center">
              <Cpu className="w-2.5 h-2.5 text-white" />
            </div>
            <div className="absolute bottom-6 right-1.5 w-6 h-6 rounded-full bg-emerald-400 shadow-md border border-sand-100 animate-float-delayed flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 text-teal-950" />
            </div>
            <div className="absolute top-1/2 right-1/2 translate-x-24 w-4 h-4 rounded-full bg-[#eb5a3c] shadow-md border border-sand-100 animate-float flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            </div>
          </div>

          {/* Interactive hints */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-stone-600 tracking-wide uppercase select-none">
            [ Tap Neural Orb to {isOrbThinking ? 'Calibrate' : 'Test Pulse'} ]
          </div>
        </div>

        {/* Hero Headlines */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-sand-950 leading-[1.1] tracking-tight max-w-4xl mx-auto">
          The Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-[#eb5a3c] to-[#f8cb47]">AI Operating System</span> Built For Sovereign Life.
        </h1>

        <p className="font-sans text-stone-700 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
          Ghost AI (AIPOS) coordinates voice scheduling, long-term memory graph database indexing, and browser-level automation pipelines into one unified digital chief of staff. Private. Secure. Infinite.
        </p>

        {/* Action button triggers */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8 relative z-20">
          <a
            href="#demo-simulator"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-lg hover:shadow-indigo-600/30 cursor-pointer flex items-center justify-center gap-2 border border-indigo-400/30"
          >
            Launch Interactive OS Preview <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#architecture"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-sand-300/50 hover:bg-sand-300/90 text-sand-900 font-mono text-xs font-bold transition-all border border-sand-400 select-none text-center"
          >
            Inspect Cognitive Graph blueprint
          </a>
        </div>

      </section>

      {/* 3. INTERACTIVE SIMULATOR CARD VIEWPORT */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <AIPOSSimulator />
      </section>

      {/* 4. COGNITIVE RECAP & STATS MATRICES */}
      <section className="px-4 py-10 max-w-7xl mx-auto border-t border-sand-300">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center select-none">
          {[
            { value: "0.08s", label: "Semantic Inference Latency" },
            { value: "99.8%", label: "Privacy Guardrail Authenticity" },
            { value: "15M+", label: "Autonomously Executed Tasks" },
            { value: "Sovereign", label: "Hosting Partition Isolation" }
          ].map((st, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-sand-50 border border-sand-300 hover:border-sand-400 transition-colors shadow-sm">
              <h5 className="font-display text-2xl lg:text-3xl font-black text-indigo-600 tracking-tight">
                {st.value}
              </h5>
              <span className="text-[10px] font-mono text-stone-500 uppercase font-black block mt-1 tracking-wide">
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BENTO GRID FEATURES */}
      <div className="max-w-7xl mx-auto px-4">
        <FeatureGrid />
      </div>

      {/* 6. DAILY BRIEFINGS HIGHLIGHT */}
      <section id="sub-process" className="py-16 border-t border-sand-300 bg-sand-100 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              HUD COGNITIVE BRIEFS
            </span>
            <h3 className="font-display text-3xl font-extrabold text-sand-950 tracking-tight leading-tight">
              A Unified System to Synthesize Your Day.
            </h3>
            <p className="text-stone-700 font-sans text-sm leading-relaxed">
              Why browse ten separate applications when AIPOS can summarize everything elegantly? Ghost AI looks at your local Outlook calendar slots, newly arrived email metrics, and urgent Trello task cards, synthesising a single morning brief in standard executive-level prose.
            </p>

            <div className="space-y-3.5 pt-4">
              {[
                { title: "No Notification Fatigue", desc: "Ditch constant background pings. Run asynchronous batch compilation loops." },
                { title: "Smart Prioritization Matrix", desc: "Categorize flight updates automatically from real-time airline webhooks." },
                { title: "In-Context Voice Reading", desc: "Listen cheerfully over TTS voices like Puck during morning commutes." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 h-fit shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-sand-950 font-sans">{item.title}</h5>
                    <p className="text-stone-500 text-xs mt-0.5 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            {/* Visual simulation box for briefings */}
            <div className="rounded-3xl border border-stone-300 bg-sand-50 p-6 shadow-md relative overflow-hidden font-sans text-xs">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-center border-b border-sand-300 pb-3 mb-4">
                <span className="font-mono text-[9px] text-stone-500">CHIEF SUMMARY RECAP: 11-02-2026</span>
                <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-md font-mono text-[8px] font-bold">
                  KNOWLEDGE COMPILED
                </span>
              </div>

              <div className="space-y-4 leading-normal text-stone-800">
                <p>
                  <strong className="text-sand-950">Scheduled Flight to SF:</strong> Your boarding pass for Flight-UA28 has been indexed successfully into episodic cache. Departure listed at 11:45 AM from Runway B4. Terminal coordinates deep-linked directly to card.
                </p>
                <div className="p-3 bg-sand-100/80 border border-sand-300 rounded-xl text-[11px]">
                  <p className="font-bold text-amber-600 mb-1 uppercase font-mono text-[9px]">Planned Autonomous Actions:</p>
                  <ul className="list-disc list-inside space-y-1 text-stone-600">
                    <li>Uber Cab booked autonomously 45 mins before gate check-in.</li>
                    <li>Sovereign email draft queued for Clara Tremblay regarding Vortex meeting.</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-sand-950">Workspace Task Digest:</strong> Zenon team submitted the finalized SLA code payload. Webhook executor confirmed AES synchronization. Live instance validated green.
                </p>
              </div>

              <div className="h-[1px] bg-sand-300 my-4"></div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Monday Briefing Complete
                </span>
                <button 
                  onClick={() => alert("Simulated Speech playback. Running TTS preset Zephyr.")}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                >
                  <Play className="w-3 h-3 fill-white" /> Audio-Listen
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. SECURE MULTI-AGENT ARCHITECTURE */}
      <div className="max-w-7xl mx-auto px-4">
        <ArchitectureGraph />
      </div>

      {/* 8. SUBSCRIPTIONS PLANS */}
      <div className="max-w-7xl mx-auto px-4">
        <PricingPlans />
      </div>

      {/* 9. TESTIMONIALS */}
      <div className="max-w-7xl mx-auto px-4">
        <Testimonials />
      </div>

      {/* 10. STRONG CALL TO ACTION & INVITE FORM */}
      <section className="py-20 border-t border-sand-300 relative px-4 bg-sand-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto text-center space-y-5 rounded-3xl border border-sand-300 bg-sand-50 p-8 md:p-12 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>

          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
            SECURE YOUR ACCESS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-sand-950 tracking-tight leading-tight">
            Ready to Transcend the Static Web?
          </h2>
          <p className="text-stone-700 text-sm font-sans max-w-xl mx-auto leading-relaxed">
            Invite slots are highly allocated due to dedicated private compute requirements. Enter your vector authorization credentials or email below to reserve a spot in the AIPOS beta sandbox.
          </p>

          <div className="max-w-md mx-auto pt-4 relative z-10">
            {inviteSuccess ? (
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-700 text-center font-mono flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>INVITE SECURED: Index node mapped successfully to waitlist vector.</span>
              </div>
            ) : (
              <form onSubmit={handleInviteSubmit} className="flex flex-col sm:flex-row gap-2.5 items-stretch">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter secure contact email..."
                  required
                  className="flex-1 px-4 py-3 bg-white border border-sand-300 rounded-2xl text-xs text-sand-950 placeholder-stone-400 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-xs font-bold font-mono tracking-wide text-white transition-all cursor-pointer shadow-md"
                >
                  Request Waitlist Vector
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-center text-[10px] font-mono text-zinc-500 pt-3 select-none">
            <span>● 5,420 Active waitlist vectors mapped</span>
            <span>● AES-GCM Encrypted Connection</span>
          </div>

        </div>
      </section>

      {/* 11. FOOTER - Luxury deep dark graphite to balance the sand light look */}
      <footer className="border-t border-sand-950 bg-sand-950 py-12 px-4 text-xs text-stone-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-600/10 border border-indigo-600 flex items-center justify-center">
                <span className="font-display font-black text-indigo-400 text-xs">G</span>
              </div>
              <span className="font-display font-extrabold text-white text-sm tracking-wide">
                GHOST AI
              </span>
            </div>
            <p className="text-stone-400 text-[11px] leading-relaxed font-sans">
              The premium Personal AI Operating System (AIPOS). Restoring digital sovereignty to elite operators through stateful context preservation and multi-agent coordination pipelines.
            </p>
            <div className="flex items-center gap-3 text-stone-500 hover:text-white transition-colors">
              <a href="#" className="p-1 hover:bg-stone-900 rounded-lg"><Github className="w-4 h-4" /></a>
              <a href="#" className="p-1 hover:bg-stone-900 rounded-lg"><Terminal className="w-4 h-4" /></a>
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#eb5a3c] block">OS ENGINE</span>
            <ul className="space-y-1.5 text-stone-400">
              <li><a href="#demo-simulator" className="hover:text-white">Active Simulator</a></li>
              <li><a href="#features" className="hover:text-white">Cognitive Core</a></li>
              <li><a href="#architecture" className="hover:text-white font-mono text-[10px]">SOC2 Guardrails</a></li>
              <li><a href="#" className="hover:text-white">Browser Control Node</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#f8cb47] block">PROTOCOLS</span>
            <ul className="space-y-1.5 text-stone-400">
              <li><a href="#" className="hover:text-white">Sovereignty Act</a></li>
              <li><a href="#" className="hover:text-white">Epistemic Vaults</a></li>
              <li><a href="#" className="hover:text-white">Integration APIs</a></li>
              <li><a href="#" className="hover:text-white">Litepaper Document</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#3dc9a4] block">INFRASTRUCTURE STATUS</span>
            <div className="p-3.5 rounded-xl bg-sand-900 border border-stone-800 font-mono text-[9px] space-y-1 text-stone-300">
              <div className="flex items-center justify-between">
                <span>Central Orchestrator Core</span>
                <span className="text-emerald-400 font-bold">OPERATIONAL</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cognitive Graph Nodes</span>
                <span className="text-emerald-400 font-bold">100% HEALTHY</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Webhook Dispatches Pool</span>
                <span className="text-indigo-400 font-bold">428 / SEC</span>
              </div>
            </div>
          </div>

        </div>

        <div className="h-[1px] bg-stone-800 my-8 max-w-7xl mx-auto"></div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 font-sans text-[11px] font-medium">
          <span>© 12026 Ghost AI Tech Labs, Inc. All rights reserved. Intellectual sovereignty established.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Decentralized SLA v2</a>
            <a href="#" className="hover:text-white">Privacy Node Statement</a>
            <a href="#" className="hover:text-white">Terms of Compute</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
