import { Question } from './question';

export interface QuestionRepository {
    findAll(): Promise<Question[]>;
}
