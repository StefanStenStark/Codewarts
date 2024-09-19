namespace CWback.Models;

public class User
{
    public int Id { get; set; }
    public required string ClerkId { get; set; }
    public required string Name { get; set; }
    public int AdventuresCompleted { get; set; }
    public int MaximumHearts { get; set; }
    public int Level { get; set; }
    public int ExperiencePoints { get; set; }
    public int Avatar { get; set; }
    public required string House { get; set; } = "Crocodile Claw";
}