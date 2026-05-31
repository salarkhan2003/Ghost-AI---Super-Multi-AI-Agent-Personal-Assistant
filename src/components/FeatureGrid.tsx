import React from "react";
import { Mic, Database, Globe, Workflow, FileText, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function FeatureGrid() {
  const features = [
    {
      icon: Mic,
      title: "Conversational Intelligence",
      description: "Talk to Ghost AI as if speaking to a trusted personal Chief of Staff. Utilizing modern high-fidelity voice synthesis models, the OS translates acoustic intent into live OS events instantly.",
      badge: "Voice Assist",
      colorClass: "bg-indigo-50 text-indigo-600 border-indigo-200",
      colSpan: "lg:col-span-4"
    },
    {
      icon: Database,
      title: "Infinite Episodic Memory",
      description: "Every statement, flight ticket, meeting, preference, and schedule is stored locally in an encrypted knowledge graph database. Ghost AI references context months later with near-zero latency.",
      badge: "Knowledge Graph",
      colorClass: "bg-[#eb5a3c]/10 text-[#eb5a3c] border-[#eb5a3c]/20",
      colSpan: "lg:col-span-4"
    },
    {
      icon: Globe,
      title: "Autonomous Browser Execution",
      description: "Ghost AI can orchestrate standard web actions using containerized browser agents: ordering food, booking rides on Yelp or Uber, finding flights, or managing online bills safely on your behalf.",
      badge: "Browser Agent",
      colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      colSpan: "lg:col-span-4"
    },
    {
      icon: Workflow,
      title: "Multi-Agent Automation Pipelines",
      description: "Connect APIs, software services, and emails. Ghost AI coordinates sub-agents to execute complex workflow loops—like drafting executive recaps, triggering webhooks, and optimizing calendar slots.",
      badge: "Auto-Orchestrator",
      colorClass: "bg-[#f8cb47]/10 text-[#cbb115] border-[#f8cb47]/30",
      colSpan: "lg:col-span-6"
    },
    {
      icon: FileText,
      title: "Daily Cognitive Briefings",
      description: "Wake up to a highly tailored daily debrief summary compiled elegantly. No notifications clatter. Ghost AI reviews your upcoming schedules, mail, and tasks to synthesize a single executive briefing.",
      badge: "Daily Digests",
      colorClass: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
      colSpan: "lg:col-span-6"
    }
  ];

  return (
    <section id="features" className="py-16 border-t border-sand-300 relative">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#eb5a3c]">
          SYSTEM CORE MODULES
        </span>
        <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-sand-950 mt-1.5 tracking-tight">
          Beyond Chatbots: A Complete Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-[#eb5a3c] to-[#f8cb47]">AI Operating System</span>
        </h2>
        <p className="text-stone-700 text-sm lg:text-base mt-2 font-sans max-w-2xl mx-auto">
          Ghost AI (AIPOS) binds modern cognitive LLMs directly into an active operating system thread. It coordinates files, memory indexes, and schedules autonomously.
        </p>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {features.map((f, idx) => {
          const IconComp = f.icon;
          return (
            <motion.div
              key={idx}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`rounded-3xl border border-sand-300 bg-sand-50 p-6 hover:shadow-md hover:border-sand-400 hover:bg-white transition-all text-left flex flex-col justify-between ${f.colSpan}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-sand-100 rounded-xl border border-sand-300">
                    <IconComp className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border font-bold ${f.colorClass}`}>
                    {f.badge}
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-sand-950 tracking-wide">
                  {f.title}
                </h4>
                <p className="text-stone-700 font-sans text-xs lg:text-sm mt-3 leading-relaxed">
                  {f.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-sand-300/60 flex items-center justify-between text-xs text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer group">
                <span className="font-bold uppercase tracking-wider font-mono">Explore capability parameters</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
