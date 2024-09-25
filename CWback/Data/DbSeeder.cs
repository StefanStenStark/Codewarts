using CWback.Models;

namespace CWback.Data;

public static class DbSeeder
{
    private static readonly List<Question> Adventure1Questions =
    [
        // Single Choice Question about variables
        new SingleChoiceQuestion
        {
            Title = "Which of the following is the correct way to declare a variable in C#?",
            Options = ["int age;", "let age;", "age = 10;", "var age;"],
            CorrectOption = "int age;"
        },

        // Multi Choice Question about methods
        new MultiChoiceQuestion
        {
            Title = "Which of the following are valid method signatures in C#?",
            Options =
            [
                "public void Add(int x, int y)",
                "static int Multiply(int x, int y)",
                "private int age;",
                "double Calculate(double x, double y)"
            ],
            CorrectOptions =
            [
                "public void Add(int x, int y)",
                "static int Multiply(int x, int y)",
                "double Calculate(double x, double y)"
            ]
        },

        // Drag and Drop Question about creating a class
        new DragDropQuestion
        {
            Title = "Order the following code snippets to define a 'Person' class in C#:",
            Options =
            [
                "public class Person {",
                "public string Name { get; set; }",
                "public int Age { get; set; }",
                "}"
            ],
            CorrectOrder =
            [
                "public class Person {",
                "public string Name { get; set; }",
                "public int Age { get; set; }",
                "}"
            ]
        },

        // Single Choice Question about data types
        new SingleChoiceQuestion
        {
            Title = "Which of the following is a reference type in C#?",
            Options = ["int", "float", "string", "bool"],
            CorrectOption = "string"
        },

        // Drag and Drop Question about methods
        new DragDropQuestion
        {
            Title = "Order the following code snippets to create a valid method:",
            Options =
            [
                "public int AddNumbers",
                "(int x, int y)",
                "{ return x + y; }"
            ],
            CorrectOrder =
            [
                "public int AddNumbers",
                "(int x, int y)",
                "{ return x + y; }"
            ]
        }
    ];

    public static void Seed(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<CWContext>();

        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        SeedUsers(context);
        SeedAdventures(context);
    }

    private static void SeedUsers(CWContext context)
    {
        List<User> users =
        [
            new User
            {
                ClerkId = "clerkidyclerk",
                Name = "Haru",
                House = "Ice wind",
                MaximumHearts = 3,
                Level = 1
            }
        ];

        context.AddRange(users);
        context.SaveChanges();
    }

    private static void SeedAdventures(CWContext context)
    {
        List<Adventure> adventures =
        [
            new Adventure
            {
                Name = "Intro to C# Magic",
                Description = "A basic intro to C#",
                Documentation =
                    "C# is a computer language that helps you tell the computer what to do. It's like talking to the computer in a way it understands! **Variables**: A variable is like a box where you can store things, like numbers or words. Example: int age = 12 This stores the number 12 in a box called 'age'.",
                Level = 1,
                Questions = Adventure1Questions
            },
            new Adventure
            {
                Name = "Magicians Intro to Data Types",
                Description = "Explore C# Data Types, with real spell casting",
                Documentation =
                    "If a variable is a box. Data types are the kinds of things you can put in the box. 'int' is for numbers. 'string' is for words. 'bool' is for true or false.",
                Level = 1,
                Questions = []
            },
            new Adventure
            {
                Name = "A Mage's guide to Methods",
                Description = "Blocks of code that perform tasks, AKA advanced sourcery",
                Documentation =
                    "A method is like a recipe. It has steps to do something, and you can use it whenever you need. Here is an example void SayHello(){Console.WriteLine('Hello')}",
                Level = 2,
                Questions = []
            },
            new Adventure
            {
                Name = "Hexes and Hash Tables",
                Description = "A basic intro to Key Value pairs",
                Documentation =
                    "C# is a computer language that helps you tell the computer what to do. It's like talking to the computer in a way it understands! **Variables**: A variable is like a box where you can store things, like numbers or words. Example: int age = 12 This stores the number 12 in a box called 'age'.",
                Level = 3,
                Questions = []
            },
            new Adventure
            {
                Name = "Data Sorting for Wizards",
                Description = "Learn to sort, with powerful Linq magic",
                Documentation =
                    "C# is a computer language that helps you tell the computer what to do. It's like talking to the computer in a way it understands! **Variables**: A variable is like a box where you can store things, like numbers or words. Example: int age = 12 This stores the number 12 in a box called 'age'.",
                Level = 4,
                Questions = []
            }
        ];

        context.AddRange(adventures);
        context.SaveChanges();
    }
}