namespace CWback.Models;

public class AdventureResponseDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public int Level { get; set; }
    public string? Documentation { get; set; }
    public List<QuestionResponseDto> Questions { get; set; } = [];
}