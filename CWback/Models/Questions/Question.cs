namespace CWback.Models;

public abstract class Question
{
    public int Id { get; set; }
    public QuestionType Type { get; set; }
    public required string Title { get; set; }
    public List<string> Options { get; set; } = [];
}