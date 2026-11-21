export enum AppPhase {
  ATTENTION = 'ATTENTION',
  DISCOVERY = 'DISCOVERY',
  ENGAGEMENT = 'ENGAGEMENT',
  REFLECTION = 'REFLECTION',
  SHARING = 'SHARING',
  ADMIN = 'ADMIN'
}

export interface CareerNode {
  id: string;
  title: string;
  role: string;
  salaryRange: string;
  period: string;
  skills: string[];
  description: string;
  videoPlaceholder: string;
  // New fields for detailed career progression
  benefits: string[];
  trainingPath: string;
  futureProspect: string;
}

export interface SimulationScenario {
  id: string;
  context: string;
  question: string;
  options: {
    id: 'A' | 'B' | 'C';
    text: string;
    skillImpact: Partial<UserStats>;
    feedback: string;
  }[];
}

export interface UserStats {
  leadership: number;
  communication: number;
  crisisManagement: number;
  adaptability: number;
  customerService: number;
}

export interface GeneratedScenarioResponse {
  scenarioText: string;
  options: {
    label: string;
    text: string;
    impact: string; // Simplified for parsing
  }[];
}