export interface User {
  id: number;
  clerkId: string;
  name: string;
  adventuresCompleted: number;
  maximumHearts: number;
  level: number;
  experiencePoints: number;
  avatar: number;
  house: string;
}

export interface Adventure {
  id: number;
  name: string;
  description: string;
  level: number;
  documentation: string;
  questions: Questions[];
}

export interface Questions {
  id: number;
  question: string;
  options: string[];
  optionCorrect: string;
}

export interface QuestionsChoice {
  id: number;
  question: string;
  options: string[];
  optionCorrect: string;
}
export type Option = {
  id: number;
  optionText: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  questionText: string;
  options: Option[];
};