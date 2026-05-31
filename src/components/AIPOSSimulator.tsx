import React, { useState, useEffect, useRef } from "react";
import { 
  Search, ArrowUpRight, Mic, Home as HomeIcon, MessageSquare, 
  Cpu, Brain, Settings, Send, Terminal, Sparkles, Clock, 
  Volume2, Play, Check, Plus, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AIPOSState, AgentLog, KnowledgeNode, KnowledgeLink, ChatMessage } from "../types";

export default function AIPOSSimulator() {
  // Simulator State resembling the exact attachment layout and extra active tabs
  const [osState, setOsState] = useState<AIPOSState>({
    cabCardText: "● BOOK CAB TO STATION",
    creditsRemaining: 99420,
    creditsMax: 99999,
    tasksText: "Active",
    memoryText: "Knowledge Graph",
    briefingText: "Your morning briefing is ready for compilation.",
    briefingReady: true,
    activeTab: 'home'
  });

  const [prompt, setPrompt] = useState("");
  const [isLg, setIsLg] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      text: "Powering up AIPOS main cognitive interface. Ready for voice or text directives, Chief of Staff.",
      timestamp: "09:41"
    }
  ]);

  const [logs, setLogs] = useState<AgentLog[]>([
    { id: "1", timestamp: "09:40:12", source: "System", text: "Ghost AI Kernel v2.5 boot success." },
    { id: "2", timestamp: "09:40:13", source: "Cognitive", text: "Initializing cognitive vectors." },
    { id: "3", timestamp: "09:40:14", source: "Memory", text: "Episodic cache loaded: 412 semantic nodes resolved." },
    { id: "4", timestamp: "09:40:15", source: "System", text: "Network binding to secure Local Proxy established." }
  ]);

  // Memory Graph nodes & links representation
  const [nodes, setNodes] = useState<KnowledgeNode[]>([
    { id: "1", label: "User (You)", type: "user", x: 150, y: 150 },
    { id: "2", label: "Uber Link", type: "integration", x: 60, y: 90 },
    { id: "3", label: "Quiet Cafes", type: "semantic", x: 230, y: 80 },
    { id: "4", label: "Flight to SF", type: "episodic", x: 80, y: 220 },
    { id: "5", label: "Work Hours (9-5)", type: "semantic", x: 220, y: 220 },
    { id: "6", label: "Calendar Sync", type: "integration", x: 150, y: 40 }
  ]);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(nodes[0]);

  const [activeVoicePreset, setActiveVoicePreset] = useState<string>("Zephyr");
  const [apiWarning, setApiWarning] = useState<boolean>(false);
  const [quotaWarning, setQuotaWarning] = useState<boolean>(false);

  // Check if GEMINI_API_KEY is missing (we detect this via standard server responses)
  useEffect(() => {
    // Initial request to warm up or check if we are in demo mode
    fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "hello" })
    })
    .then(r => r.json())
    .then(data => {
      if (data.isDemo) {
        setApiWarning(true);
      }
    })
    .catch(() => {
      setApiWarning(true);
    });
  }, []);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollTop = logsEndRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  }, [messages]);

  const addLog = (text: string, source: 'Cognitive' | 'Planner' | 'Memory' | 'Executor' | 'System' = 'Cognitive') => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setLogs(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        timestamp: timeStr,
        source,
        text
      }
    ]);
  };

  const handleCommandSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isProcessing) return;

    const userMsg = prompt;
    setPrompt("");
    setIsProcessing(true);

    // Save user chat node
    const userMessageObj: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: userMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessageObj]);
    addLog(`User Command entered: "${userMsg}"`, "System");

    try {
      addLog("Dispatching intent query to cognitive orchestrator...", "Cognitive");
      
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMsg,
          userHistory: messages.slice(-6).map(m => ({ role: m.role, content: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error("Local endpoint failure");
      }

      const data = await response.json();
      
      setIsProcessing(false);

      if (data.isQuotaExceeded) {
        setQuotaWarning(true);
      }

      // Add speech reply
      const assistantMsgObj: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        text: data.speech,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsgObj]);

      // State update
      if (data.updatedState) {
        setOsState(prev => ({
          ...prev,
          cabCardText: data.updatedState.cabCard !== "None" ? data.updatedState.cabCard : prev.cabCardText,
          tasksText: data.updatedState.tasksText,
          memoryText: data.updatedState.memoryText,
          briefingReady: data.updatedState.briefingReady,
          creditsRemaining: Math.max(100, prev.creditsRemaining - (data.updatedState.creditCost || Math.floor(Math.random() * 80 + 20)))
        }));
      }

      // Add server-side logs
      if (data.agentLogs && Array.isArray(data.agentLogs)) {
        data.agentLogs.forEach((logItem: string) => {
          let source: 'Cognitive' | 'Planner' | 'Memory' | 'Executor' | 'System' = 'Cognitive';
          if (logItem.includes("Planner")) source = "Planner";
          else if (logItem.includes("Memory")) source = "Memory";
          else if (logItem.includes("Executor") || logItem.includes("Browser")) source = "Executor";
          else if (logItem.includes("System") || logItem.includes("Offline")) source = "System";

          addLog(logItem, source);
        });
      }

      // Sync and add new nodes into the interactive local knowledge graph
      if (data.memoryGraphNodes && Array.isArray(data.memoryGraphNodes)) {
        data.memoryGraphNodes.forEach((nodeLabel: string) => {
          const typeVal: 'user' | 'episodic' | 'semantic' | 'integration' = 
            nodeLabel.toLowerCase().includes("link") || nodeLabel.toLowerCase().includes("sync") ? "integration" : 
            nodeLabel.toLowerCase().includes("trip") || nodeLabel.toLowerCase().includes("flight") ? "episodic" : "semantic";

          const angle = Math.random() * Math.PI * 2;
          const radius = 60 + Math.random() * 60;
          const xVal = 150 + Math.cos(angle) * radius;
          const yVal = 150 + Math.sin(angle) * radius;

          const newNode: KnowledgeNode = {
            id: Math.random().toString(),
            label: nodeLabel,
            type: typeVal,
            x: Math.max(30, Math.min(270, xVal)),
            y: Math.max(30, Math.min(270, yVal))
          };

          setNodes(prev => [...prev, newNode]);
          addLog(`Cognitive vector committed: Node [${nodeLabel}] indexed.`, "Memory");
        });
      }

    } catch (err) {
      console.log("AIPOS interface exception handled safely:", err);
      setIsProcessing(false);
      
      // Local fallback
      const errorReply = "The AIPOS local backup resolver ran a routing failure. Restoring standard simulation buffer.";
      setMessages(prev => [
        ...prev, 
        { id: Math.random().toString(), role: "assistant", text: errorReply, timestamp: "09:41" }
      ]);
      addLog("Local server connection bypassed. Standard simulator simulation recovered.", "System");
    }
  };

  const handleQuickCommand = (txt: string) => {
    setPrompt(txt);
  };

  const clearSandboxState = () => {
    setOsState({
      cabCardText: "● BOOK CAB TO STATION",
      creditsRemaining: 99999,
      creditsMax: 99999,
      tasksText: "Active",
      memoryText: "Knowledge Graph",
      briefingText: "Your morning briefing is ready for compilation.",
      briefingReady: true,
      activeTab: 'home'
    });
    setNodes([
      { id: "1", label: "User (You)", type: "user", x: 150, y: 150 },
      { id: "2", label: "Uber Link", type: "integration", x: 60, y: 90 },
      { id: "3", label: "Quiet Cafes", type: "semantic", x: 230, y: 80 },
      { id: "4", label: "Flight to SF", type: "episodic", x: 80, y: 220 },
      { id: "5", label: "Work Hours (9-5)", type: "semantic", x: 220, y: 220 }
    ]);
    setMessages([
      { id: "1", role: "assistant", text: "AIPOS cognitive buffer cleared. Ready for fresh orchestration instructions.", timestamp: "Now" }
    ]);
    addLog("Cognitive operational database reset complete.", "System");
  };

  // Node coloring switcher helper
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'user': return 'fill-indigo-500 stroke-indigo-400';
      case 'integration': return 'fill-teal-400 stroke-teal-300';
      case 'episodic': return 'fill-rose-500 stroke-rose-400';
      case 'semantic': return 'fill-amber-400 stroke-amber-300';
      default: return 'fill-gray-400 stroke-gray-300';
    }
  };

  return (
    <div id="demo-simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6 pb-12">
      
      {/* LEFT: System Description & Log Terminal */}
      <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sand-200 border border-sand-300 text-xs font-mono text-indigo-700 mb-4 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
            ACTIVE COGNITIVE SIMULATOR
          </div>

          <h3 className="font-display text-2xl lg:text-3xl font-bold text-sand-950 tracking-tight leading-snug">
            Step Inside the OS: Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-[#eb5a3c] to-[#f8cb47]">Ghost AI</span>
          </h3>

          <p className="text-stone-700 font-sans mt-3 text-sm lg:text-base leading-relaxed">
            Unlike static dashboards or simple prompt windows, Ghost AI runs as a 
            <strong> stateful digital chief of staff</strong>. Below, you can directly 
            interact with the operational device. Type commands to plan rides, register 
            automated workflow pipelines, edit long-term memory nodes, or load system metrics!
          </p>

          {/* Quick interactive triggers */}
          <div className="mt-5 space-y-2">
            <span className="text-xs font-mono text-[#eb5a3c] block uppercase tracking-wider font-extrabold">Try quick OS directives:</span>
            <div className="flex flex-wrap gap-2">
              {[
                "Book a cab to San Francisco Hilton",
                "Summarize my unread mail briefing",
                "Remember my flight ticket code is B4F4D5",
                "Execute workspace email sync webhook automation"
              ].map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickCommand(cmd)}
                  className="px-3 py-1.5 rounded-xl bg-sand-150 hover:bg-white border border-sand-300 hover:border-sand-400 text-xs text-stone-800 transition-all cursor-pointer font-sans shadow-sm font-medium"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cognitive Core Agent Live Logs */}
        <div className="rounded-2xl border border-sand-300 bg-sand-50 p-4 shadow-sm flex flex-col h-64 overflow-hidden relative font-mono text-stone-800">
          <div className="flex items-center justify-between border-b border-sand-200 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-sand-900 uppercase tracking-widest">COGNITIVE SYSTEM LOGS</span>
            </div>
            <button 
              onClick={clearSandboxState}
              className="text-[10px] text-stone-500 hover:text-indigo-600 hover:underline uppercase transition-colors"
            >
              [Clear State Buffer]
            </button>
          </div>

          {/* Real-time Logs stream */}
          <div ref={logsEndRef} className="flex-1 overflow-y-auto space-y-1.5 pr-2 select-none scrollbar">
            {logs.map((log) => (
              <div key={log.id} className="text-xs leading-relaxed flex items-start gap-1">
                <span className="text-stone-400 font-bold whitespace-nowrap">[{log.timestamp}]</span>
                <span className={`font-semibold shrink-0 uppercase tracking-wide text-[9px] px-1 rounded font-mono ${
                  log.source === 'Planner' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                  log.source === 'Memory' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                  log.source === 'Executor' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                  log.source === 'System' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                  'bg-purple-100 text-purple-700 border border-purple-200'
                }`}>
                  {log.source}
                </span>
                <span className="text-stone-700 pl-1 font-mono font-medium">{log.text}</span>
              </div>
            ))}
          </div>

          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[9px] text-emerald-700 font-bold">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></span>
            AIPOS DEPLOYMENT OK : PORT 3000
          </div>
        </div>

        {apiWarning && (
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 shadow-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <p className="font-bold text-stone-900 font-sans">Gemini API Offline Preview Mode</p>
              <p className="mt-0.5 text-stone-700 font-sans leading-relaxed">
                To experience live AI response parsing, you can configure your <code className="bg-amber-100/60 px-1 rounded text-amber-850 font-bold font-mono">GEMINI_API_KEY</code> on the AI Studio secrets panel. We've optimized local backup actions to ensure a seamless simulation interface!
              </p>
            </div>
          </div>
        )}

        {quotaWarning && (
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 shadow-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5 animate-pulse" />
            <div>
              <p className="font-bold text-stone-900 font-sans">Temporary Backup Mode (Quota Exceeded / Rate Limited)</p>
              <p className="mt-0.5 text-stone-700 font-sans leading-relaxed">
                The Gemini API endpoints triggered a rate limit (429 RESOURCE_EXHAUSTED). To keep the AIPOS experience pristine and fluid, we've seamlessly routed response workflows to local high-end heuristic backups!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: High-End Claymorphic Device Simulator */}
      <div className="lg:col-span-5 flex justify-center items-center">
        {/* Device Wrapper */}
        <div className="w-full max-w-[340px] aspect-[9/19.5] rounded-[48px] bg-neutral-900 border-[10px] border-neutral-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative">
          
          {/* Top Notch Spacer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[22px] bg-neutral-800 rounded-b-2xl z-50 flex items-center justify-center">
            <div className="w-12 h-1 bg-red-950/20 rounded-full mb-1"></div>
          </div>

          {/* OS UI Backdrop (Slightly Bone-Sand Beige `#f2f1eb` or similar from the screenshot for that unique warm high-end aesthetic) */}
          <div className="flex-1 bg-[#eae9e0] pt-6 pb-2 px-3 overflow-hidden flex flex-col relative selection:bg-purple-200 text-stone-900">
            
            {/* Top Bar Status */}
            <div className="flex justify-between items-center px-1 mb-2 mt-2">
              <div>
                <p className="text-[10px] font-sans text-stone-500 tracking-tight leading-none font-medium">Good evening,</p>
                <h4 className="text-xl font-black text-stone-950 leading-tight">Hi, User!</h4>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-full bg-white text-stone-800 hover:scale-105 active:scale-95 transition-transform shadow-sm">
                  <Search className="w-3.5 h-3.5" />
                </button>
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-sans shadow-sm">
                  U
                </div>
              </div>
            </div>

            {/* SCREEN VIEW SWITCHER */}
            <div className="flex-1 overflow-y-auto mb-16 pr-0.5 space-y-3.5 scrollbar">
              <AnimatePresence mode="wait">
                
                {/* 1. HOME TAB */}
                {osState.activeTab === 'home' && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    {/* CARD 1: CAB / OUTSTANDING TRIP (Mock Black Solid Squircle) */}
                    <div className="p-4 rounded-[26px] bg-black text-white shadow-lg flex flex-col justify-between relative transition-transform duration-300 hover:scale-[1.01] overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-300/10 to-transparent rounded-full blur-xl"></div>
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5 pr-2">
                          <p className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                            {osState.cabCardText}
                          </p>
                          <p className="text-[10px] text-stone-400 font-sans tracking-wide">
                            Uber deep link
                          </p>
                        </div>
                        <button className="w-6 h-6 rounded-full bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center transition-colors">
                          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>

                    {/* TWO COLUMN GRID CARD 2 & CARD 3 */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* CARD 2: CREDITS (Indigo-Blue claymorphism) */}
                      <div className="p-4 py-4.5 rounded-[26px] bg-indigo-600 text-white shadow-md flex flex-col justify-between relative overflow-hidden">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-indigo-200 tracking-widest uppercase">CREDITS</span>
                          <h5 className="text-3xl font-extrabold tracking-tight select-none">
                            {osState.creditsRemaining}
                          </h5>
                          <span className="text-[9px] text-indigo-200 font-medium select-none">of {osState.creditsMax} left</span>
                        </div>
                        {/* Interactive Progress Meter */}
                        <div className="mt-3.5 w-full h-[3.5px] bg-indigo-800/80 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white rounded-full transition-all duration-1000" 
                            style={{ width: `${(osState.creditsRemaining / osState.creditsMax) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* CARD 3: TASKS (Rich Golden/Warm Yellow Squircle) */}
                      <div className="p-4 rounded-[26px] bg-[#f8cb47] text-stone-950 shadow-md flex flex-col justify-between relative overflow-hidden">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-black text-amber-900 tracking-widest uppercase">TASKS</span>
                          <h5 className="text-2xl font-black tracking-tight mt-0.5">{osState.tasksText}</h5>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-1">
                          <span className="px-2 py-0.5 bg-amber-900/10 rounded-lg text-[9px] font-bold text-amber-950">
                            Planner
                          </span>
                          <span className="px-2 py-0.5 bg-amber-900/10 rounded-lg text-[9px] font-bold text-amber-950">
                            Executor
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CARD 4: MEMORY (Vibrant Red-Orange Coral Squircle) */}
                    <div className="p-4 rounded-[26px] bg-[#eb5a3c] text-white shadow-md flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-black text-orange-200 tracking-widest uppercase mb-1 block">MEMORY</span>
                          <h5 className="text-2xl font-black tracking-tight leading-tight w-[75%]">
                            {osState.memoryText}
                          </h5>
                        </div>
                        <button 
                          onClick={() => setOsState(prev => ({ ...prev, activeTab: 'memory' }))}
                          className="w-7 h-7 rounded-full bg-white hover:bg-stone-100 text-stone-950 flex items-center justify-center transition-colors"
                        >
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                      <div className="mt-4 flex gap-1.5">
                        <span className="px-2 py-0.5 bg-white/20 rounded-lg text-[9px] font-semibold text-white">
                          Semantic
                        </span>
                        <span className="px-2 py-0.5 bg-white/20 rounded-lg text-[9px] font-semibold text-white">
                          Episodic
                        </span>
                      </div>
                    </div>

                    {/* CARD 5 & 6 GRID: VOICE & BRIEFING */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* CARD 5: VOICE TAP (EMERALD TEAL SQUIRCLE) */}
                      <button 
                        onClick={() => setOsState(prev => ({ ...prev, activeTab: 'voice' }))}
                        className="p-4 rounded-[26px] bg-[#3dc9a4] text-teal-950 shadow-md text-left flex flex-col justify-between items-stretch hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                      >
                        <span className="text-[9px] font-black text-teal-800 tracking-widest uppercase">VOICE</span>
                        
                        <div className="my-3 flex justify-center">
                          <div className="w-10 h-10 rounded-full bg-teal-950 flex items-center justify-center text-teal-300">
                            <Mic className="w-5 h-5 animate-pulse" />
                          </div>
                        </div>

                        <span className="text-[10px] text-center font-bold text-teal-950">Tap to speak</span>
                      </button>

                      {/* CARD 6: BRIEFING (CLEAN OFF-WHITE SQUIRCLE) */}
                      <div className="p-4 rounded-[26px] bg-[#f6f5f0] text-stone-950 shadow-md flex flex-col justify-between relative overflow-hidden">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-black text-stone-500 tracking-widest uppercase">BRIEFING</span>
                          <h5 className="text-base font-extrabold tracking-tight mt-0.5 leading-snug">Daily Digest</h5>
                        </div>
                        <div className="mt-4">
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-[9px] font-bold inline-block">
                            {osState.briefingReady ? "Ready" : "Compiling..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. VOICE TAB (Live AI Command Center) */}
                {osState.activeTab === 'voice' && (
                  <motion.div
                    key="voice"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col h-full space-y-3 pb-8"
                  >
                    {/* Title */}
                    <div className="px-1 flex justify-between items-center mb-1">
                      <div>
                        <span className="text-[9px] font-black text-stone-500 tracking-widest">NLU CONSOLE</span>
                        <h5 className="text-sm font-black text-stone-950">Voice Orchestrator</h5>
                      </div>
                      <div className="flex gap-1.5">
                        {['Zephyr', 'Kore', 'Puck'].map((v) => (
                          <button
                            key={v}
                            onClick={() => {
                              setActiveVoicePreset(v);
                              addLog(`Speech synthesis node routed to: ${v}`, "System");
                            }}
                            className={`px-1.5 py-0.5 rounded text-[8px] font-semibold transition-all ${
                              activeVoicePreset === v 
                                ? 'bg-indigo-600 text-white shadow-sm' 
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chat log wrapper */}
                    <div 
                      ref={chatEndRef}
                      className="flex-1 bg-stone-100/70 border border-stone-200/50 rounded-2xl p-3 h-[210px] overflow-y-auto space-y-2.5 scrollbar"
                    >
                      {messages.map((m) => (
                        <div 
                          key={m.id} 
                          className={`flex flex-col max-w-[85%] ${m.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                        >
                          <div className={`p-2.5 rounded-xl text-xs font-sans tracking-wide leading-relaxed shadow-sm ${
                            m.role === 'user' 
                              ? 'bg-indigo-600 text-white rounded-br-none' 
                              : 'bg-white text-stone-900 rounded-bl-none border border-stone-200/40'
                          }`}>
                            {m.text}
                          </div>
                          <span className="text-[8px] text-stone-500 font-mono mt-0.5">{m.timestamp}</span>
                        </div>
                      ))}
                      {isProcessing && (
                        <div className="flex items-center gap-1.5 mr-auto p-2 bg-white rounded-xl border border-stone-200 text-[10px] text-stone-600 shadow-sm animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0s' }}></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                          <span>Orchestrating...</span>
                        </div>
                      )}
                    </div>

                    {/* Input Field */}
                    <form onSubmit={handleCommandSubmit} className="flex gap-1.5 items-center">
                      <input 
                        type="text" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Say something to AIPOS..." 
                        className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans tracking-wide shadow-sm"
                        disabled={isProcessing}
                      />
                      <button 
                        type="submit"
                        className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-sm cursor-pointer disabled:opacity-50"
                        disabled={isProcessing || !prompt.trim()}
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* 3. TASKS TAB (Workflow agents visualization) */}
                {osState.activeTab === 'tasks' && (
                  <motion.div
                    key="tasks"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3 pb-8"
                  >
                    <div className="px-1">
                      <span className="text-[9px] font-black text-stone-500 tracking-widest">AGENT EXECUTION ORCHESTRATION</span>
                      <h5 className="text-sm font-black text-stone-950">Multi-Agent Workflow Pipelines</h5>
                    </div>

                    {/* Diagram container */}
                    <div className="bg-stone-100/80 border border-stone-200 rounded-2xl p-3 text-stone-900 space-y-3">
                      <span className="text-[8px] font-mono text-stone-500 block">Agent Pipeline Status: ACTIVE</span>
                      
                      <div className="relative space-y-4 text-xs font-mono select-none">
                        {/* Node 1 */}
                        <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                            <span className="font-bold">1. Planner Agent</span>
                          </div>
                          <span className="text-[9px] text-indigo-700">Decomposing...</span>
                        </div>
                        {/* Connecting line */}
                        <div className="absolute left-6 top-8 w-0.5 h-2 bg-indigo-200"></div>

                        {/* Node 2 */}
                        <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            <span className="font-bold">2. Web Retrieval</span>
                          </div>
                          <span className="text-[9px] text-amber-700">Polled (ETA 2s)</span>
                        </div>
                        {/* Connecting line */}
                        <div className="absolute left-6 top-18 w-0.5 h-2 bg-amber-200"></div>

                        {/* Node 3 */}
                        <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            <span className="font-bold">3. Memory Indexer</span>
                          </div>
                          <span className="text-[9px] text-rose-700">Cached</span>
                        </div>
                        {/* Connecting line */}
                        <div className="absolute left-6 top-28 w-0.5 h-2 bg-rose-200"></div>

                        {/* Node 4 */}
                        <div className="p-2 bg-teal-50 border border-teal-200 rounded-lg flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                            <span className="font-bold">4. Browser Executive</span>
                          </div>
                          <span className="text-[9px] text-teal-800">Ready</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          addLog("Manual agent loop test requested.", "System");
                          addLog("[Planner] Triggered sub-process: Web scraping routine...", "Planner");
                          setTimeout(() => {
                            addLog("[Executor] Executed workflow pipeline successfully.", "Executor");
                          }, 1000);
                        }}
                        className="w-full py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-[10px] font-bold transition-all cursor-pointer text-center"
                      >
                        Run Agent Workflow Validation
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 4. MEMORY TAB (Interactive Episodic Graph) */}
                {osState.activeTab === 'memory' && (
                  <motion.div
                    key="memory"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3 pb-8"
                  >
                    <div className="px-1">
                      <span className="text-[9px] font-black text-stone-500 tracking-widest">KNOWLEDGE SYSTEM COGNIZANCE</span>
                      <h5 className="text-sm font-black text-stone-950 font-sans">Episodic Knowledge Graph</h5>
                    </div>

                    <div className="bg-stone-100 rounded-2xl p-2.5 border border-stone-200 shadow-sm flex flex-col space-y-2 relative overflow-hidden">
                      <span className="text-[8px] font-mono text-zinc-500 block">Interactive SVG Graph Visualizer</span>
                      
                      {/* Interactive Graph Box */}
                      <div className="w-full h-[180px] bg-neutral-900 rounded-xl relative select-none">
                        <svg className="w-full h-full">
                          {/* Render connection lines to central User Node */}
                          {nodes.slice(1).map((linkNode) => (
                            <line
                              key={linkNode.id}
                              x1={nodes[0].x}
                              y1={nodes[0].y}
                              x2={linkNode.x}
                              y2={linkNode.y}
                              stroke="rgba(255, 255, 255, 0.15)"
                              strokeWidth="1.5"
                              strokeDasharray="4 2"
                            />
                          ))}

                          {/* Render graph nodes */}
                          {nodes.map((n) => (
                            <g 
                              key={n.id} 
                              onClick={() => {
                                setSelectedNode(n);
                                addLog(`Querying memory node metadata corresponding to: [${n.label}]`, "Memory");
                              }}
                              className="cursor-pointer group"
                            >
                              <circle
                                cx={n.x}
                                cy={n.y}
                                r={selectedNode?.id === n.id ? 9 : 6.5}
                                className={`${getNodeColor(n.type)} transition-all duration-350 cursor-pointer shadow-md`}
                              />
                            </g>
                          ))}
                        </svg>

                        {/* Quick category labels list in SVG overlay */}
                        <div className="absolute top-1 right-1 bg-stone-950/80 p-1.5 rounded-lg border border-white/5 text-[7px] font-mono text-zinc-400 space-y-0.5">
                          <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>User</div>
                          <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>Integra.</div>
                          <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Episod.</div>
                          <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Seman.</div>
                        </div>
                      </div>

                      {/* Display metadata of selected memory index */}
                      <AnimatePresence mode="wait">
                        {selectedNode && (
                          <motion.div
                            key={selectedNode.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-2 bg-white rounded-lg border border-stone-200 text-[10px] shadow-sm font-sans"
                          >
                            <span className="font-mono text-[8px] text-indigo-600 block uppercase font-black tracking-wide">
                              Node Class: {selectedNode.type}
                            </span>
                            <span className="font-bold text-stone-900 block leading-tight">{selectedNode.label}</span>
                            <p className="text-stone-500 text-[9px] mt-0.5 font-medium leading-normal">
                              {selectedNode.type === 'user' ? "Central user profile coordinating system integrations, flights schedules, Uber links, coffee presets, and workspaces." :
                               selectedNode.type === 'integration' ? "Constructed deep integrations with external protocols. Operates on custom webhooks and standard webhook API tokens." :
                               selectedNode.type === 'episodic' ? "Contextual episodic memory captured locally during conversation logs or user directives. Fully retrievable for cognitive orchestration." :
                               "A long-term belief fact structured contextually based on repetitive user assertions."}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* 5. MORE TAB */}
                {osState.activeTab === 'more' && (
                  <motion.div
                    key="more"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5 pb-8"
                  >
                    <div className="px-1">
                      <span className="text-[9px] font-black text-stone-500 tracking-widest">AIPOS PARAMETERS</span>
                      <h5 className="text-sm font-black text-stone-950">System Diagnostics</h5>
                    </div>

                    <div className="bg-stone-100 rounded-2xl p-3 border border-stone-200 text-stone-900 space-y-4">
                      {/* Metric 1 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-gray-500 uppercase font-black">Memory Graph Congruence</span>
                          <span className="font-bold">98.2%</span>
                        </div>
                        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '98.2%' }} />
                        </div>
                      </div>

                      {/* Metric 2 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-gray-500 uppercase font-black">Epistemic Inference Temp</span>
                          <span className="font-bold">0.45</span>
                        </div>
                        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: '45%' }} />
                        </div>
                      </div>

                      {/* Config */}
                      <div className="space-y-1 bg-white p-2 rounded-xl border border-stone-200 text-[10px]">
                        <span className="font-bold uppercase text-[8px] text-indigo-600 block mb-1">Local Configuration</span>
                        <div className="flex items-center justify-between text-[9px] text-stone-600">
                          <span>Secure Node Encryption</span>
                          <span className="text-emerald-600 font-bold font-mono">AES-256</span>
                        </div>
                        <div className="flex items-center justify-between text-[9px] text-stone-600 mt-1">
                          <span>Cloud Tunnel Sync</span>
                          <span className="text-indigo-600 font-bold font-mono">Active</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* FLOATING NAVIGATION BAR (Rounded squircle container from screenshot) */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 h-[62px] bg-[#fdfdfc]/95 backdrop-filter backdrop-blur-md rounded-[28px] border border-stone-200 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] flex justify-between items-center px-4 z-40">
              {[
                { tab: 'home', icon: HomeIcon, label: 'Home' },
                { tab: 'voice', icon: Mic, label: 'Voice' },
                { tab: 'tasks', icon: Cpu, label: 'Tasks' },
                { tab: 'memory', icon: Brain, label: 'Memory' },
                { tab: 'more', icon: Settings, label: 'More' }
              ].map((item) => {
                const IconComp = item.icon;
                const isActive = osState.activeTab === item.tab;
                return (
                  <button
                    key={item.tab}
                    onClick={() => {
                      setOsState(prev => ({ ...prev, activeTab: item.tab as any }));
                      addLog(`Navigated tab container to: [${item.label}]`, "System");
                    }}
                    className="flex flex-col items-center justify-center p-1.5 rounded-2xl relative cursor-pointer"
                  >
                    {/* Active highlight pill matching the screen decoration */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeTabBadge"
                        className="absolute inset-0 bg-indigo-50 rounded-2xl -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <IconComp className={`w-4 h-4 transition-colors ${isActive ? 'text-indigo-600 stroke-[2.5]' : 'text-stone-500'}`} />
                    <span className={`text-[8px] font-sans font-bold tracking-wide mt-0.5 leading-none transition-colors ${
                      isActive ? 'text-indigo-600' : 'text-stone-500'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
