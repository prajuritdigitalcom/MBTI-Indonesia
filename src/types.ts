export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  direction: 'positive' | 'negative'; // positive means high score points to first letter (E, S, T, J), negative to second (I, N, F, P)
}

export interface MBTIDimensionScore {
  percentage: number; // 0 to 100 percentage for the dominant trait
  dominant: string; // e.g. "I" or "E"
  leftTrait: string; // e.g. "E"
  rightTrait: string; // e.g. "I"
  leftPercentage: number;
  rightPercentage: number;
}

export interface MBTIResultData {
  type: string; // e.g., "INTJ"
  title: string; // e.g., "Sang Arsitek" (The Architect)
  subtitle: string; // short catchphrase
  summary: string;
  characteristics: string[];
  strengths: string[];
  weaknesses: string[];
  communicationStyle: string;
  workingStyle: string;
  learningStyle: string;
  stressCoping: string;
  suitableCareers: string[];
  idealWorkEnvironment: string;
  selfDevelopmentTips: string[];
  bgGradient: string; // gradient CSS class for visualization card
  textColor: string;
}

export interface HistoryRecord {
  id: string;
  timestamp: string;
  createdAt?: number;
  name: string;
  mbtiType: string;
  mbtiTitle: string;
  scores: {
    EI: number; // percentage of E
    SN: number; // percentage of S
    TF: number; // percentage of T
    JP: number; // percentage of J
  };
}
