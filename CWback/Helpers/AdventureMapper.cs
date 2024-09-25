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
                CorrectOption = requestDto.CorrectOption ?? throw new ArgumentNullException(nameof(requestDto.CorrectOption),
                    $"Missing field 'CorrectOption' on question with type {requestDto.Type}")
            },
            QuestionType.MultiChoice => new MultiChoiceQuestion
            {
                Title = requestDto.Title,
                Options = requestDto.Options,
                CorrectOptions = requestDto.CorrectOptions ?? throw new ArgumentNullException(nameof(requestDto.CorrectOptions),
                    $"Missing field 'CorrectOptions' on question with type {requestDto.Type}")
            },
            QuestionType.DragDrop => new DragDropQuestion
            {
                Title = requestDto.Title,
                Options = requestDto.Options,
                CorrectOrder = requestDto.CorrectOrder ?? throw new ArgumentNullException(nameof(requestDto.CorrectOrder),
                    $"Missing field 'CorrectOrder' on question with type {requestDto.Type}")
            },
            QuestionType.Input => new InputQuestion
            {
                Title = requestDto.Title,
                Options = requestDto.Options,
                CorrectAnswer = requestDto.CorrectAnswer ?? throw new ArgumentNullException(nameof(requestDto.CorrectAnswer),
                    $"Missing field '{nameof(requestDto.CorrectAnswer)}' on question with type {requestDto.Type}")
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
            InputQuestion ipq => new QuestionResponseDto
            {
                Id = question.Id,
                Type = ipq.Type,
                Title = ipq.Title,
                Options = ipq.Options,
                CorrectAnswer = ipq.CorrectAnswer
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