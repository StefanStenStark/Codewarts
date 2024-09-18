const url = import.meta.env.VITE_API_URL;

export interface User {
  id: number;
  name: string;
  userName: string;
}
export type UserTest = {
  id: number;
  name: string;
  avatar: number;
  experience: number;
  level: number;
  schoolYear: number;
  currentAdventure: number;
  house: string;
};

export interface QuestionsChoice {
  id: number;
  question: string;
  options: string[];
  optionCorrect: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${url}/api/Users`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function fetchUser(): UserTest {
  const user: UserTest = {
    id: 43,
    name: "SteffoTheSalamander",
    avatar: 16,
    experience: 4200,
    level: 12,
    schoolYear: 3,
    currentAdventure: 3,
    house: "Crocodile claw",
  };

  return user;
}

export default function fetchQuestions() {
  const QuestionsOne = {
    id: 1,
    question: "The first question???",
    options: ["one", "two", "three", "correct"],
    optionCorrect: "correct",
  };

  const QuestionsTwo = {
    id: 1,
    question: "The two question???",
    options: ["one", "two", "three", "correct"],
    optionCorrect: "correct",
  };

  const QuestionsThree = {
    id: 1,
    question: "The third question???",
    options: ["one", "two", "three", "correct"],
    optionCorrect: "correct",
  };

  return [QuestionsOne, QuestionsTwo, QuestionsThree];
}
