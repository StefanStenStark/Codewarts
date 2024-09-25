namespace CWback.Models;

public class DragDropQuestion : Question
{
    public List<string> CorrectOrder { get; set; } = [];
}