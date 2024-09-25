using CWback.Models;

namespace CWback.Helpers;

public static class AdventureMapper
{
    public static Adventure MapAdventureRequestDtoToAdventure(AdventureRequestDto requestDto)
    {
        return new Adventure
        {
            Name = requestDto.Name,
            Description = requestDto.Description,
            Level = requestDto.Level,
            Documentation = requestDto.Documentation,
            Questions = requestDto.Questions.Select(q => MapQuestionRequestDtoToQuestion(q)).ToList()
        };
    }

    private static Question MapQuestionRequestDtoToQuestion(QuestionRequestDto requestDto)
    {
        return requestDto.Type switch
        {
            QuestionType.SingleChoice => new SingleChoiceQuestion
            {
                Title = requestDto.Title,
                Options = requestDto.Options,
                CorrectOption = requestDto.CorrectOption ?? ""
            },
            QuestionType.MultiChoice => new MultiChoiceQuestion
            {
                Title = requestDto.Title,
                Options = requestDto.Options,
                CorrectOptions = requestDto.CorrectOptions ?? new List<string>()
            },
            QuestionType.DragDrop => new DragDropQuestion
            {
                Title = requestDto.Title,
                Options = requestDto.Options,
                CorrectOrder = requestDto.CorrectOrder ?? new List<string>()
            },
            _ => throw new ArgumentOutOfRangeException(nameof(requestDto.Type),
                $"Unsupported question type: {requestDto.Type}")
        };
    }

    public static AdventureResponseDto MapAdventureToAdventureResponseDto(Adventure adventure)
    {
        return new AdventureResponseDto
        {
            Id = adventure.Id,
            Name = adventure.Name,
            Description = adventure.Description,
            Level = adventure.Level,
            Documentation = adventure.Documentation,
            Questions = adventure.Questions?.Select(q => MapQuestionToQuestionResponseDto(q)).ToList() ?? []
        };
    }
    
    private static QuestionResponseDto MapQuestionToQuestionResponseDto(Question question)
    {
        return question switch
        {
            SingleChoiceQuestion scq => new QuestionResponseDto
            {
                Id = question.Id,
                Type = scq.Type,
                Title = scq.Title,
                Options = scq.Options,
                CorrectOption = scq.CorrectOption
            },
            MultiChoiceQuestion mcq => new QuestionResponseDto
            {
                Id = question.Id,
                Type = mcq.Type,
                Title = mcq.Title,
                Options = mcq.Options,
                CorrectOptions = mcq.CorrectOptions
            },
            DragDropQuestion ddq => new QuestionResponseDto
            {
                Id = question.Id,
                Type = ddq.Type,
                Title = ddq.Title,
                Options = ddq.Options,
                CorrectOrder = ddq.CorrectOrder
            },
            _ => new QuestionResponseDto
            {
                Id = question.Id,
                Type = question.Type,
                Title = question.Title,
                Options = question.Options
            }
        };
    }
}