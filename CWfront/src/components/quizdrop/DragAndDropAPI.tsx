export interface Question {
  id: number;
  questionText: string;
  possibleAnswers: Option[];
  correctOrder: number[];
}
export interface Option {
  id: number;
  text: string;
}

export default function fetchDragDropQuestions(): Question[] {
  return [
    {
      id: 1,
      questionText:
        "Order the following code snippets to complete the Calculator class:",
      possibleAnswers: [
        { id: 3, text: "(int number1, int number2)" },
        { id: 1, text: "public class Calculator {" },
        { id: 4, text: "{ return number1 + number2; } }" },
        { id: 2, text: "public int AddNumbers" },
      ],
      correctOrder: [1, 2, 3, 4],
    },
    {
      id: 2,
      questionText: "Order the following to create a function:",
      possibleAnswers: [
        { id: 7, text: "console.log(greet('World'));" },
        { id: 5, text: "function greet(name)" },
        { id: 6, text: "{ return 'Hello, ' + name; }" },
      ],
      correctOrder: [5, 6, 7],
    },
    {
      id: 3,
      questionText: "Order the following to form an array declaration:",
      possibleAnswers: [
        { id: 8, text: "const numbers =" },
        { id: 9, text: "[1, 2, 3, 4, 5];" },
      ],
      correctOrder: [8, 9],
    },
    {
      id: 4,
      questionText:
        "Order the following code snippets to correctly implement an interface:",
      possibleAnswers: [
        { id: 10, text: "public interface" },
        { id: 12, text: "void Start();" },
        { id: 13, text: "void Stop();}" },
        { id: 11, text: " IVehicle {" },
      ],
      correctOrder: [10, 11, 12, 13],
    },
    {
      id: 5,
      questionText:
        "Order the following to define a basic 'Person' class with properties:",
      possibleAnswers: [
        { id: 14, text: "public class Person {" },
        { id: 16, text: "public int Age { get; set; }" },
        { id: 17, text: "}" },
        { id: 15, text: "public string Name { get; set; }" },
      ],
      correctOrder: [14, 15, 16, 17],
    },
    {
      id: 6,
      questionText: "Order the following to define a basic constructor:",
      possibleAnswers: [
        { id: 20, text: "Name = name;" },
        { id: 18, text: "public Person" },
        { id: 19, text: "(string name, int age) { " },
        { id: 21, text: "Age = age; }" },
      ],
      correctOrder: [18, 19, 20, 21],
    },
    {
      id: 7,
      questionText: "Order the following to write a basic 'for' loop:",
      possibleAnswers: [
        { id: 22, text: "for (int i = 0;" },
        { id: 25, text: "Console.WriteLine(i);" },
        { id: 24, text: "i++) {" },
        { id: 26, text: "}" },
        { id: 23, text: "i < 10;" },
      ],
      correctOrder: [22, 23, 24, 25, 26],
    },
  ];
}
