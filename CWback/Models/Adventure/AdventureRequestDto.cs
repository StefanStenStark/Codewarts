namespace CWback.Models;

public class AdventureRequestDto
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public int Level { get; set; }
    public string? Documentation { get; set; }
    public List<QuestionRequestDto> Questions { get; set; } = [];
}