import React, { useState } from "react";
import { Server, Cpu, Database, GitFork, Shield, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ArchitectureGraph() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: 0,
      title: "1. Cognitive Guardrails & Sanitization",
      agent: "Inbound Shield Agent",
      description: "Any user vocal or tactical request is first processed by a local encrypted filter. It wipes out telemetry metadata to guarantee 100% sovereign user privacy before token classification.",
      status: "Verified Safe",
      icon: Shield,
      color: "border-indigo-500 text-indigo-400 bg-indigo-550/10"
    },
    {
      id: 1,
      title: "2. Strategic Sub-task Decomposer",
      agent: "Tactical Planner Agent",
      description: "Drafts a structural JSON plan. Instead of throwing raw prompts at a closed model, the Planner agent maps dependencies, schedules webhook timers, and sets memory search queries.",
      status: "Pipeline Formulated",
      icon: Cpu,
      color: "border-amber-500 text-amber-400 bg-amber-550/10"
    },
    {
      id: 2,
      title: "3. Semantic Linkage Retrieval",
      agent: "Knowledge Memory Node Agent",
      description: "Consults the long-term vector representation space for personal preferences, past context metrics, and previous schedule results to anchor current execution plans correctly.",
      status: "Context Enriched",
      icon: Database,
      color: "border-rose-500 text-rose-400 bg-rose-550/10"
    },
    {
      id: 3,
      title: "4. Autonomous Remote Dispatcher",
      agent: "Executor / Browser Agent",
      description: "Directly runs containerized secure web requests or coordinates standard API webhooks (Stripe, Slack, Uber, Drive) to produce tangible physical-world outputs or digital updates.",
      status: "Task Completed",
      icon: Server,
      color: "border-teal-500 text-teal-400 bg-teal-550/10"
    }
  ];

  return (
    <section id="architecture" className="py-16 border-t border-sand-300 relative">
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT: Structural Explanation */}
        <div className="lg:col-span-5 text-left space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#eb5a3c]">
            COGNITIVE BLUEPRINT
          </span>
          <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-sand-950 tracking-tight">
            Sovereign, Multi-Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-[#eb5a3c] to-[#f8cb47]">Orchestration System</span>
          </h3>
          <p className="text-stone-700 font-sans text-xs lg:text-sm leading-relaxed">
            Ghost AI runs on a distinct four-tier sandboxed architecture. Raw models never access external systems directly. Instead, specialised agents isolate, structure, verify, and execute plans sequentially with hardware-level security.
          </p>

          {/* Interactive Steps Indicators */}
          <div className="space-y-2.5 pt-3">
            {stages.map((st, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  activeStage === idx 
                    ? 'bg-white border-indigo-500 shadow-md' 
                    : 'bg-sand-100/50 border-sand-300 hover:border-sand-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg border ${activeStage === idx ? 'bg-indigo-50 border-indigo-300 text-indigo-600' : 'bg-transparent border-sand-300 text-stone-400'}`}>
                    <st.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold font-sans ${activeStage === idx ? 'text-sand-950' : 'text-stone-600'}`}>
                    {st.agent}
                  </span>
                </div>
                <ArrowRight className={`w-3.5 h-3.5 text-stone-500 transition-transform ${activeStage === idx ? 'translate-x-1 text-indigo-600' : ''}`} />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: High-End Live Interactive Pipeline Visualizer */}
        <div className="lg:col-span-7 rounded-3xl border border-sand-300 bg-sand-50 p-6 md:p-8 flex flex-col justify-between h-[360px] lg:h-[420px] shadow-md relative overflow-hidden backdrop-blur-md">
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent"></div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-indigo-600 font-bold">
              <GitFork className="w-3.5 h-3.5" />
              <span>COGNITIVE CORE RUNTIME PIPE</span>
            </div>
            <span className="text-[10px] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg text-emerald-600 font-mono font-bold">
              ● STANDBY LIVE
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, scale: 0.98, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-4 rounded-2xl border-2 ${stages[activeStage].color} shadow-sm shrink-0`}>
                    {React.createElement(stages[activeStage].icon, { className: "w-8 h-8" })}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-stone-500 block tracking-wide uppercase">ACTIVE STAGE THREAD</span>
                    <h4 className="font-display text-lg lg:text-xl font-extrabold text-sand-950 leading-tight">
                      {stages[activeStage].title}
                    </h4>
                  </div>
                </div>

                <p className="text-stone-700 font-sans text-xs lg:text-sm leading-relaxed bg-sand-100/70 p-4 border border-sand-300 rounded-xl">
                  {stages[activeStage].description}
                </p>

                <div className="flex flex-wrap items-center gap-3 font-mono text-[10px]">
                  <span className="text-stone-500">Inbound Protocol Code:</span>
                  <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-md">
                    ISO-27001 SOC2
                  </span>
                  <span className="text-stone-500">Node Outcome:</span>
                  <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-md font-bold flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> {stages[activeStage].status}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-6">
            {stages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeStage === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-sand-300 hover:bg-sand-400'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
