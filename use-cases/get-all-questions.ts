import { Question } from '../domain/question/question';
import { QuestionRepository } from '../domain/question/question-repository';

export class GetAllQuestions {
    public constructor(
        private readonly questionRepository: QuestionRepository
    ) {}

    public async execute(): Promise<Question[]> {
        const questions = await this.questionRepository.findAll();

        return questions;
    }
}
