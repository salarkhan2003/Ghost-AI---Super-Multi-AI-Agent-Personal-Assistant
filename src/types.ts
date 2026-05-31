/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AIPOSState {
  cabCardText: string;
  creditsRemaining: number;
  creditsMax: number;
  tasksText: string;
  memoryText: string;
  briefingText: string;
  briefingReady: boolean;
  activeTab: 'home' | 'voice' | 'tasks' | 'memory' | 'more';
}

export interface AgentLog {
  id: string;
  timestamp: string;
  source: 'Cognitive' | 'Planner' | 'Memory' | 'Executor' | 'System';
  text: string;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'user' | 'episodic' | 'semantic' | 'integration';
  x: number;
  y: number;
}

export interface KnowledgeLink {
  source: string;
  target: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  billing: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  author: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
}
