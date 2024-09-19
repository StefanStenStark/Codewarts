export interface User {
  id: number;
  name: string;
  userName: string;
  levelsCompleted: string[];
  totalPoints: number;
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
