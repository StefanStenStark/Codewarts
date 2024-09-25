namespace CWback.Models;

public class Adventure
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public int Level { get; set; }
    public string? Documentation { get; set; }
    public List<Question>? Questions { get; set; }
}