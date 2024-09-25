namespace CWback.Models;

public class MultiChoiceQuestion : Question
{
    public List<string> CorrectOptions { get; set; } = [];
}