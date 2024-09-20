import { User } from "./types";

const url = import.meta.env.VITE_API_URL;

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${url}/api/Users`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function fetchUser(): User {
  const user: User = {
    id: 43,
    clerkId: "wakwak",
    name: "SteffoTheSalamander",
    adventuresCompleted: 2,
    maximumHearts: 3,
    avatar: 1,
    experiencePoints: 4500,
    level: 12,
    house: "GreenSalamanders",
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

export const fetchAdventures = async () => {
  //   const response = await fetch("");

  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }

  //   const data = await response.json();
  //   return data;
  // };
  const AdventureOne = {
    id: 1,
    name: "Intro to C# Magic",
    description: "A basic intro to C#",
    documentation:
      "C# is a computer language that helps you tell the computer what to do. It's like talking to the computer in a way it understands! **Variables**: A variable is like a box where you can store things, like numbers or words. Example: int age = 12 This stores the number 12 in a box called 'age'.",
    level: 1,
    questions: [],
  };
  const AdventureTwo = {
    id: 2,
    name: "Magicians Intro to Data Types",
    description: "Explore C# Data Types, with real spell casting",
    documentation:
      "If a variable is a box. Data types are the kinds of things you can put in the box. 'int' is for numbers. 'string' is for words. 'bool' is for true or false.",
    level: 1,
    questions: [],
  };

  const AdventureThree = {
    id: 3,
    name: "A Mage's guide to Methods",
    description: "Blocks of code that perform tasks, AKA advanced sourcery",
    documentation:
      "A method is like a recipe. It has steps to do something, and you can use it whenever you need. Here is an example void SayHello(){Console.WriteLine('Hello')}",
    level: 2,
    questions: [],
  };

  const AdventureFour = {
    id: 4,
    name: "Hexes and Hash Tables",
    description: "A basic intro to Key Value pairs",
    documentation:
      "C# is a computer language that helps you tell the computer what to do. It's like talking to the computer in a way it understands! **Variables**: A variable is like a box where you can store things, like numbers or words. Example: int age = 12 This stores the number 12 in a box called 'age'.",
    level: 3,
    questions: [],
  };
  const AdventureFive = {
    id: 5,
    name: "Data Sorting for Wizards",
    description: "Learn to sort, with powerful Linq magic",
    documentation:
      "C# is a computer language that helps you tell the computer what to do. It's like talking to the computer in a way it understands! **Variables**: A variable is like a box where you can store things, like numbers or words. Example: int age = 12 This stores the number 12 in a box called 'age'.",
    level: 4,
    questions: [],
  };

  return [
    AdventureOne,
    AdventureTwo,
    AdventureThree,
    AdventureFour,
    AdventureFive,
  ];
};
