import { Router, Request, Response } from 'express';
import { get_all_questions } from '../db/db';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*')
    const result = await get_all_questions();

    res.send(result);
});


export const QuestionsController = router;
