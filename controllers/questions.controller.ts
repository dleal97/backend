import { Router, Request, Response } from 'express';
import { check_newbd } from '../db/db';
import { SqlQuestionRepository } from '../infraestructure/question/sql-question-repository';
import { GetAllQuestions } from '../use-cases/get-all-questions';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*')
    const useCase  = new GetAllQuestions( new SqlQuestionRepository());
    const questions = await useCase.execute();

    res.send(questions);
});

router.get('/health', async (_req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*')
    const result = await check_newbd();

    res.send(result);
});


export const QuestionsController = router;
