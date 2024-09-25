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
  questions: IQuestion[];
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

export enum QuestionType {
  SingleChoice,
  MultiChoice,
  DragDrop,
  Input
}

export interface IQuestion {
  id: number;
  type: QuestionType;
  title: string;
  options: string[];
}

export interface ISingleChoiceQuestion extends IQuestion {
  correctOption: string;
}

export interface IMultiChoiceQuestion extends IQuestion {
  correctOptions: string[];
}

export interface IDragDropQuestion extends IQuestion {
  correctOrder: string[];
}

export interface IInputQuestion extends IQuestion {
  correctAnswer: string
}
