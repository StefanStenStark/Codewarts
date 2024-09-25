namespace CWback.Models;

public class QuestionResponseDto
{
    public int Id { get; set; }
    public required QuestionType Type { get; set; }
    public required string Title { get; set; }
    public List<string> Options { get; set; } = [];
    public string? CorrectOption { get; set; } // For SingleChoice
    public List<string>? CorrectOptions { get; set; } // For MultiChoice
    public List<string>? CorrectOrder { get; set; } // For DragDrop
    public string? CorrectAnswer { get; set; } // For Input
}