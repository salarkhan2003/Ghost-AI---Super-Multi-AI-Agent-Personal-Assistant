import React from "react";
import { Check, Sparkles } from "lucide-react";
import { PricingPlan } from "../types";

export default function PricingPlans() {
  const plans: PricingPlan[] = [
    {
      name: "Sovereign Core",
      price: "$0",
      billing: "Forever Access",
      description: "Perfect for testing AIPOS. Runs models locally or over standardized shared key parameters.",
      features: [
        "Up to 100 Episodic Graph Nodes",
        "Standard Voice Orchestrator (Zephyr)",
        "Local browser scraping sandbox",
        "25 Daily Executive summaries",
        "Community Slack Support"
      ]
    },
    {
      name: "Sovereign Pro",
      price: "$19",
      billing: "Per Month, Billed Annually",
      description: "For founders, investors, and elite operators needing instant cognitive support.",
      features: [
        "Unlimited Episodic vector memories",
        "All TTS Voice Presets (Kore, Puck, Zephyr)",
        "Multi-Agent Workflow Pipelines",
        "Unlimited Cognitive briefings",
        "Webhooks and Zapier deep integrations",
        "Priority dedicated API resources"
      ],
      isPopular: true
    },
    {
      name: "Private Instance",
      price: "$99",
      billing: "Per Agent / Month",
      description: "Dedicated node instance running within a private cloud partition with specialized legal compliance.",
      features: [
        "Everything in Sovereign Pro",
        "Dedicated container resources isolation",
        "Custom domain and White-label API routing",
        "Custom brand cognitive rules configuration",
        "Zero data retention guarantees",
        "24/7 Dedicated Ops engineer SLA"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-16 border-t border-sand-300 relative">
      {/* Background radial shine */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#eb5a3c]">
          SECURE SUBSCRIPTION
        </span>
        <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-sand-950 mt-1.5 tracking-tight">
          Flexible Pricing for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-[#eb5a3c] to-[#f8cb47]">Infinite Productivity</span>
        </h2>
        <p className="text-stone-700 text-sm lg:text-base mt-2 font-sans max-w-xl mx-auto">
          Choose a memory capacity and coordination tier optimized for your personal workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`rounded-3xl border p-6 md:p-8 flex flex-col justify-between relative transition-all duration-300 ${
              p.isPopular 
                ? 'bg-indigo-600/5 border-indigo-600 shadow-md hover:shadow-lg hover:border-indigo-500' 
                : 'bg-sand-50 border-sand-300 hover:border-sand-400 hover:bg-white'
            }`}
          >
            {/* Visual highlight tag */}
            {p.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-[#eb5a3c] text-white text-[10px] uppercase font-black tracking-widest px-3.5 py-1 rounded-full border border-indigo-400/30 flex items-center gap-1 shadow-md">
                <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} /> Recommended
              </span>
            )}

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-600 font-extrabold block mb-2">
                {p.name}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-extrabold text-sand-950 tracking-tight">{p.price}</span>
                <span className="text-xs text-stone-500 font-medium">/{p.billing.split(',')[0]}</span>
              </div>
              <p className="text-stone-600 text-xs mt-3 leading-relaxed">
                {p.description}
              </p>

              <div className="h-[1px] bg-sand-300 my-6"></div>

              <span className="text-stone-800 font-mono text-[10px] uppercase font-black tracking-wider block mb-4">
                INCLUDED METRICS / INTEGRATIONS:
              </span>

              <ul className="space-y-3.5 text-left text-xs text-stone-700 font-sans">
                {p.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.isPopular ? 'text-indigo-600' : 'text-stone-500'}`} />
                    <span className="leading-tight">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-sand-300 pt-6">
              <button
                onClick={() => {
                  alert(`Sovereign orchestration tier selection for [${p.name}] clicked. Redirecting to billing sandbox.`);
                }}
                className={`w-full py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  p.isPopular 
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md' 
                    : 'bg-sand-200 hover:bg-sand-300 text-stone-800 border border-sand-300 hover:border-sand-400'
                }`}
              >
                {p.price === "$0" ? "Initialize Sovereign Core" : "Authorize Core Purchase"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
