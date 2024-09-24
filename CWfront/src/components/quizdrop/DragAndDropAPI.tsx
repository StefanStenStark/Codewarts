export interface Question {
  id: number;
  questionText: string;
  option: string[];
  correctOrder: string[];
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
      option: [
        "(int number1, int number2)",
        "public class Calculator {",
        "{ return number1 + number2; } }",
        "public int AddNumbers",
      ],
      correctOrder: [
        "public class Calculator {",
        "public int AddNumbers",
        "(int number1, int number2)",
        "{ return number1 + number2; } }",
      ],
    },
    {
      id: 2,
      questionText: "Order the following to create a function:",
      option: [
        "console.log(greet('World'));",
        "function greet(name)",
        "{ return 'Hello, ' + name; }",
      ],
      correctOrder: [
        "function greet(name)",
        "{ return 'Hello, ' + name; }",
        "console.log(greet('World'));",
      ],
    },
    {
      id: 3,
      questionText: "Order the following to form an array declaration:",
      option: ["const numbers =", "[1, 2, 3, 4, 5];"],
      correctOrder: ["const numbers =", "[1, 2, 3, 4, 5];"],
    },
    {
      id: 4,
      questionText:
        "Order the following code snippets to correctly implement an interface:",
      option: [
        "public interface",
        "void Start();",
        "void Stop();}",
        " IVehicle {",
      ],
      correctOrder: [
        "public interface",
        " IVehicle {",
        "void Start();",
        "void Stop();}",
      ],
    },
    {
      id: 5,
      questionText:
        "Order the following to define a basic 'Person' class with properties:",
      option: [
        "public class Person {",
        "public int Age { get; set; }",
        "}",
        "public string Name { get; set; }",
      ],
      correctOrder: [
        "public class Person {",
        "public string Name { get; set; }",
        "public int Age { get; set; }",
        "}",
      ],
    },
    {
      id: 6,
      questionText: "Order the following to define a basic constructor:",
      option: [
        "Name = name;",
        "public Person",
        "(string name, int age) { ",
        "Age = age; }",
      ],
      correctOrder: [
        "public Person",
        "(string name, int age) { ",
        "Name = name;",
        "Age = age; }",
      ],
    },
    {
      id: 7,
      questionText: "Order the following to write a basic 'for' loop:",
      option: [
        "for (int i = 0;",
        "Console.WriteLine(i);",
        "i++) {",
        "}",
        "i < 10;",
      ],
      correctOrder: [
        "for (int i = 0;",
        "i < 10;",
        "i++) {",
        "Console.WriteLine(i);",
        "}",
      ],
    },
  ];
}
