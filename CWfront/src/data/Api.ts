import {Question, User} from "./types";

const url = import.meta.env.VITE_API_URL;

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${url}/api/Users`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export async function fetchUser(userId: number): Promise<User> {
  const response = await fetch(`http://localhost:5033/api/Users/${userId}`);

  const user: User = await response.json();
  return user;
}
export async function updateUser(
  userId: number,
  updatedUser: User
): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:5033/api/Users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      return true;
    } else {
      console.error("Failed to update user:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
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

export function fetchTempQuestions(): Question[] {
  return [{
    "id": 1,
    "questionText": "Which is the correct syntax for string interpolation?",
    "options": [
      {
        "id": 1,
        "optionText": "$\"Hello, {name}\"",
        "isCorrect": true
      },
      {
        "id": 2,
        "optionText": "Console.WriteLine(\"Hello, \" + name);",
        "isCorrect": false
      }
    ]
  },
    {
      "id": 2,
      "questionText": "Which method is used to concatenate two strings?",
      "options": [
        {
          "id": 1,
          "optionText": "string.Concat()",
          "isCorrect": true
        },
        {
          "id": 2,
          "optionText": "string.Format()",
          "isCorrect": false
        }
      ]
    },
    {
      "id": 3,
      "questionText": "What does the String.Replace() method do?",
      "options": [
        {
          "id": 1,
          "optionText": "Replaces all occurrences of a specified string with another string.",
          "isCorrect": true
        },
        {
          "id": 2,
          "optionText": "Removes all occurrences of a specified character.",
          "isCorrect": false
        }
      ]
    },
    {
      "id": 4,
      "questionText": "How can you check if a string contains a substring?",
      "options": [
        {
          "id": 1,
          "optionText": "string.Contains()",
          "isCorrect": true
        },
        {
          "id": 2,
          "optionText": "string.Join()",
          "isCorrect": false
        }
      ]
    },
    {
      "id": 5,
      "questionText": "What is the output of: Console.WriteLine(\"abc\".Substring(1, 2))?",
      "options": [
        {
          "id": 1,
          "optionText": "\"bc\"",
          "isCorrect": true
        },
        {
          "id": 2,
          "optionText": "\"ab\"",
          "isCorrect": false
        }
      ]
    }];
};