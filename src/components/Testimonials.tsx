import React from "react";
import { Quote } from "lucide-react";
import { Testimonial } from "../types";

export default function Testimonials() {
  const list: Testimonial[] = [
    {
      author: "Edward Vance",
      role: "Managing Director",
      company: "Vortex Capital",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      text: "Ghost AI is genuinely the next paradigm shift since the browser. Having a multi-agent framework book flights, update calendars, and remember clients' goals across devices is miraculous. It has easily doubled my personal leverage."
    },
    {
      author: "Clara Tremblay",
      role: "Principal Product Officer",
      company: "Zenon Software",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      text: "The sheer design craft of Ghost AI's claymorphism design is gorgeous. But underneath lies an absolute workhorse. The browser automation executes complex Yelp searches and cab reservations cleanly without breaking privacy boundaries."
    },
    {
      author: "Marcus Chen",
      role: "General Partner",
      company: "Sovereign Labs",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      text: "Most AI systems are just chatbots with short-term tokens. Ghost AI's Episodic Memory system indexer tracks context logically across months. This makes it a real Chief of Staff, not a text-to-text plaything."
    }
  ];

  return (
    <section id="testimonials" className="py-16 border-t border-sand-300 relative">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#eb5a3c]">
          GLOBAL RECOGNITION
        </span>
        <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-sand-950 mt-1.5 tracking-tight">
          Praise from Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-[#eb5a3c] to-[#f8cb47]">Operators & Founders</span>
        </h2>
        <p className="text-stone-700 text-sm lg:text-base mt-2 font-sans max-w-xl mx-auto">
          See how leading executives use Ghost AI to filter digital noise, coordinate automated agent actions, and manage cognitive context.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {list.map((t, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl border border-sand-300 bg-sand-50 flex flex-col justify-between hover:border-sand-400 hover:bg-white transition-all text-left shadow-sm relative animate-float"
            style={{ animationDelay: `${idx * 1.5}s` }}
          >
            <div className="absolute top-4 right-4 text-sand-400/30">
              <Quote className="w-8 h-8 rotate-180" />
            </div>

            <div>
              <p className="text-stone-800 font-sans text-xs lg:text-sm leading-relaxed italic relative z-10">
                "{t.text}"
              </p>
            </div>

            <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-sand-200">
              <img
                src={t.avatar}
                alt={t.author}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-sand-300 shadow-inner"
              />
              <div>
                <h5 className="text-xs font-bold font-sans text-sand-950 leading-tight">
                  {t.author}
                </h5>
                <span className="text-[10px] text-stone-500 font-mono">
                  {t.role}, <span className="text-indigo-600 font-bold">{t.company}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
