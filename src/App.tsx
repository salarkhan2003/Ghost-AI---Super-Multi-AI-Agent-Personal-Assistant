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
    <div className="min-h-screen bg-[#f2f1eb] font-sans text-sand-950 overflow-x-hidden selection:bg-indigo-600/10 selection:text-indigo-950">
      
      {/* 1. TOP PREMIUM FLOATING BAR */}
      <header className="sticky top-0 z-50 w-full bg-[#f2f1eb]/80 backdrop-blur-md border-b border-sand-300 px-4 py-3.5">
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

      {/* 2. MASTER BENTO GRID WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10 space-y-6">

        {/* ================= BENTO ROW 1: HERO & BRAIN HERO ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Bento Tile 1: Hero headlines & Primary Message (Spans 8 cols) */}
          <div className="lg:col-span-8 rounded-[36px] border border-sand-300 bg-sand-50 p-6 sm:p-10 flex flex-col justify-between hover:border-sand-400 hover:shadow-sm transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[450px] h-[350px] bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-mono font-bold text-indigo-700 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> GHOST AI CORE INTEGRATED ENGINE
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-sand-950 leading-[1.15] tracking-tight">
                The Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-[#eb5a3c] to-[#f8cb47]">AI Operating System</span> Built For Sovereign Life.
              </h1>
              
              <p className="font-sans text-stone-700 text-sm md:text-base leading-relaxed max-w-2xl">
                Ghost AI coordinates real-time stateful voice scheduling, episodic knowledge graphs, and cross-application automation workflows. Bypassing rigid dashboards to run directly as your active digital chief of staff.
              </p>
            </div>

            {/* In-Bento Secondary waitlist request drawer */}
            <div className="mt-8 pt-6 border-t border-sand-200 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-5 text-left">
                <p className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest">Beta Access Vector</p>
                <p className="text-[11px] text-stone-500 font-sans mt-0.5">Reserve private dedicated hardware space below.</p>
              </div>
              <div className="md:col-span-7">
                {inviteSuccess ? (
                  <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-700 text-center font-mono flex items-center justify-center gap-2 animate-bounce">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-sans font-semibold">Invite node committed successfully to security ledger!</span>
                  </div>
                ) : (
                  <form onSubmit={handleInviteSubmit} className="flex gap-2 items-stretch">
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Secure contact email..."
                      required
                      className="flex-1 px-4 py-2.5 bg-white border border-sand-300 rounded-2xl text-xs text-sand-950 placeholder-stone-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition-all font-sans"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-xs font-bold font-mono tracking-wide text-white transition-all cursor-pointer shadow-md shrink-0 border border-indigo-400/30 flex items-center gap-1.5"
                    >
                      Waitlist
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Bento Tile 2: 3D Neural Brand Orb (Spans 4 cols) */}
          <div className="lg:col-span-4 rounded-[36px] border border-sand-300 bg-sand-50 p-6 sm:p-8 flex flex-col justify-between items-center text-center hover:border-sand-400 hover:shadow-sm transition-all relative overflow-hidden select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="w-full text-left">
              <span className="text-[9px] font-mono font-bold text-stone-500 tracking-widest uppercase block">COGNITIVE HUB PRESET</span>
              <h3 className="text-sm font-bold font-display text-sand-950 mt-0.5">Neural Node Pulse</h3>
            </div>

            {/* Neural Interactive Orb */}
            <div className="relative my-7 flex items-center justify-center">
              <div 
                onClick={toggleOrbThinkingState}
                className="w-44 h-44 rounded-full flex items-center justify-center cursor-pointer relative group transition-transform duration-500 active:scale-95"
                title="Tap neural node core to trigger interactive pulse"
              >
                {/* Orbital Rotating clay highlights */}
                <div className="absolute inset-0 rounded-full border border-sand-400/30 animate-spin" style={{ animationDuration: '25s' }}></div>
                <div className="absolute inset-2 .rounded-full border border-sand-500/25 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }}></div>
                <div className="absolute inset-4 rounded-full border border-indigo-600/10 border-dashed animate-spin" style={{ animationDuration: '35s' }}></div>

                {/* Main Orb Sphere */}
                <div className={`w-28 h-28 rounded-full orb-gradient p-1 shadow-[2px_12px_24px_rgba(0,0,0,0.1),inset_2px_4px_8px_rgba(255,255,255,0.7)] transition-all duration-700 flex items-center justify-center overflow-hidden ${
                  isOrbThinking ? 'scale-105 saturate-125 rotate-45' : 'scale-100 group-hover:scale-105'
                }`}>
                  <div className="w-full h-full rounded-full bg-sand-50/95 flex flex-col justify-center items-center backdrop-blur-md">
                    <Brain className={`w-9 h-9 text-indigo-600 transition-transform duration-1000 ${
                      isOrbThinking ? 'scale-110 rotate-180 text-rose-600' : 'scale-100 group-hover:rotate-12'
                    }`} />
                    <span className="text-[7px] font-mono font-black text-sand-950 mt-1 tracking-widest uppercase">
                      {isOrbThinking ? 'COMPUTING' : 'ACTIVE OS'}
                    </span>
                  </div>
                </div>

                {/* Sub satellites */}
                <div className="absolute top-1 left-2 w-5 h-5 rounded-full bg-indigo-500 shadow-sm border border-sand-100 animate-float flex items-center justify-center">
                  <Cpu className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="absolute bottom-5 right-1 w-5.5 h-5.5 rounded-full bg-emerald-400 shadow-sm border border-sand-100 animate-float-delayed flex items-center justify-center">
                  <Activity className="w-3 text-teal-950" />
                </div>
              </div>
            </div>

            <p className="text-[10px] font-mono text-stone-500 tracking-wide uppercase">
              [ {isOrbThinking ? 'COGNITIVE PULSE SENT' : 'TAP CORE ORB TO CALIBRATE'} ]
            </p>
          </div>

        </div>

        {/* ================= BENTO ROW 2: ACTIVE SIMULATOR CONSOLE ================= */}
        <div id="demo-simulator" className="rounded-[40px] border border-sand-300 bg-sand-100 p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2-mb-8 pb-4 border-b border-sand-300">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#eb5a3c]">INTEGRATED SOVEREIGN COMMAND</span>
              <h2 className="font-display text-2xl md:text-3xl font-black text-sand-950 tracking-tight leading-none mt-1">
                Active Operating Sandbox
              </h2>
            </div>
            <div className="flex gap-2 text-[10px] font-mono text-stone-500">
              <span className="px-2 py-0.5 rounded-md bg-sand-200 border border-sand-300 font-bold text-indigo-700">OS AGENT V2.5</span>
              <span className="px-2 py-0.5 rounded-md bg-sand-200 border border-sand-300 font-bold text-emerald-700">● STABLE STATE</span>
            </div>
          </div>

          {/* Render the simulator device core directly inside the beautiful container */}
          <AIPOSSimulator />
        </div>

        {/* ================= BENTO ROW 3: RECAP STATS MATRIX ================= */}
        <div className="rounded-[36px] border border-sand-300 bg-sand-50 p-6 md:p-8 hover:border-sand-400 hover:shadow-sm transition-all relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sand-50 via-sand-100/30 to-sand-50 pointer-events-none"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center select-none relative z-10">
            {[
              { value: "0.08s", label: "Semantic Inference Latency", color: "text-indigo-600" },
              { value: "99.8%", label: "Privacy Guardrail Authenticity", color: "text-[#eb5a3c]" },
              { value: "15M+", label: "Autonomously Executed Tasks", color: "text-[#f8cb47]" },
              { value: "Sovereign", label: "Hosting Partition Isolation", color: "text-emerald-700" }
            ].map((st, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#fdfdfc]/80 border border-sand-300 hover:border-sand-400 transition-colors shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-sand-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h5 className={`font-display text-3xl md:text-4xl font-black ${st.color} tracking-tight`}>
                  {st.value}
                </h5>
                <span className="text-[10px] font-mono text-stone-500 uppercase font-bold block mt-1 tracking-wide">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= BENTO ROW 4: DUAL COGNITIVE BRIEF & FEATURE GRID ================= */}
        <div id="sub-process" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Left Side: Brief Summary HUD Block (Spans 6 cols) */}
          <div className="lg:col-span-6 rounded-[36px] border border-sand-300 bg-sand-100 p-6 md:p-8 flex flex-col justify-between hover:border-sand-400 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
            
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#eb5a3c]">HUD COGNITIVE BRIEFS</span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-sand-950 tracking-tight leading-tight">
                A Unified System to Synthesize Your Day.
              </h3>
              <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed">
                Ditch endless clanging alert slots. AIPOS parses email chains, calendars, and external webhooks to compile a structured, human-level morning digest.
              </p>

              {/* Day Digest Simulation Card */}
              <div className="rounded-2xl border border-sand-300 bg-sand-50 p-5 shadow-sm space-y-3.5 text-xs text-stone-800">
                <div className="flex justify-between items-center border-b border-sand-200 pb-2">
                  <span className="font-mono text-[9px] text-stone-500">CHIEF SUMMARY RECAP: 11-02-2026</span>
                  <span className="px-1.5 py-0.5 bg-indigo-50 border border-indigo-200 rounded-md font-mono text-[8px] font-bold text-indigo-700">
                    COMPILED OK
                  </span>
                </div>

                <div className="space-y-3 leading-relaxed">
                  <p>
                    <strong className="text-sand-950">Flight ua28 coordinates:</strong> Departure scheduled runway B at 11:45 AM. Ticket data committed to memory.
                  </p>
                  <p className="bg-sand-100 p-2.5 rounded-lg border border-sand-200 text-[10.5px] font-mono text-stone-600">
                    ● Auto Uber cab requested 45 mins prior to boarding.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 font-sans text-[10.5px]">
                  <span className="text-stone-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Morning Briefing Ready
                  </span>
                  <button 
                    onClick={() => alert("Playing brief audio compilation via standard TTS node preset Zephyr.")}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm border border-indigo-400/20"
                  >
                    <Play className="w-2.5 h-2.5 fill-white text-white" /> Listen
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-sand-200 grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-stone-500 uppercase font-bold">
              <div>
                <span className="block text-indigo-600 font-extrabold text-xs">Calendar</span>
                <span>Active Sync</span>
              </div>
              <div className="border-x border-sand-200">
                <span className="block text-[#eb5a3c] font-extrabold text-xs">Acoustics</span>
                <span>Synthesized</span>
              </div>
              <div>
                <span className="block text-emerald-600 font-extrabold text-xs">Updates</span>
                <span>Batched</span>
              </div>
            </div>
          </div>

          {/* Right Side: Feature Grid (Spans 6 cols) */}
          <div className="lg:col-span-6 rounded-[36px] border border-sand-300 bg-sand-50 p-6 md:p-8 flex flex-col justify-between hover:border-sand-400 transition-all">
            <FeatureGrid />
          </div>

        </div>

        {/* ================= BENTO ROW 5: SECURE ARCHITECTURE ================= */}
        <div id="architecture" className="rounded-[36px] border border-sand-300 bg-sand-100 p-6 md:p-8 hover:border-sand-400 transition-all">
          <ArchitectureGraph />
        </div>

        {/* ================= BENTO ROW 6: SUBSCRIPTION PLANS ================= */}
        <div id="pricing" className="rounded-[36px] border border-sand-300 bg-sand-50 p-6 md:p-8 hover:border-sand-400 transition-all">
          <PricingPlans />
        </div>

        {/* ================= BENTO ROW 7: TESTIMONIALS ================= */}
        <div id="testimonials" className="rounded-[36px] border border-sand-300 bg-sand-100 p-6 md:p-8 hover:border-sand-400 transition-all">
          <Testimonials />
        </div>

        {/* ================= BENTO ROW 8: INVITE CONGRUENCE BOTTOM PANEL ================= */}
        <div className="rounded-[36px] border border-sand-300 bg-sand-950 p-8 md:p-12 text-center relative overflow-hidden select-none text-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f8cb47]">
              Sovereignty established COGNITIVE LEDGER
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Ready to Transcend the Static Web?
            </h2>
            <p className="text-stone-300 font-sans text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Ghost AI runs on dedicated infrastructure partitions. Reserve your place in the wait list node structure to authorize secure containerized deployment instances.
            </p>

            <div className="pt-2">
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-lg hover:shadow-indigo-600/30 inline-flex items-center gap-2 border border-indigo-400/20"
              >
                Access Sovereign Console Waitlist <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center text-[9px] font-mono text-stone-400 pt-3">
              <span>● Private Compute Channels</span>
              <span>● Complete Data Partitioning</span>
              <span>● AES-GCM Encrypted Connection</span>
            </div>
          </div>
        </div>

      </main>

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
