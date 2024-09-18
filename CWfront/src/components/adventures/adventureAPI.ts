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
    level: 1,
    questions: [{}, {}, {}],
  };

  const AdventureTwo = {
    id: 2,
    name: "Data Sorting for Wizards",
    description: "A basic intro to C#",
    level: 2,
    questions: [{}, {}, {}],
  };

  const AdventureThree = {
    id: 3,
    name: "Hexes and Hash Tables",
    description: "A basic intro to C#",
    level: 3,
    questions: [{}, {}, {}],
  };

  return [AdventureOne, AdventureTwo, AdventureThree];
};
