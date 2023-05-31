import { Router, Request, Response } from 'express';
import { SqlUserRepository } from '../infraestructure/user/sql-user-repository';
import { ValidateUser } from '../use-cases/validate-user';
import { GetAllUsers } from '../use-cases/getAllUsers';
import { SqlScoredUserRepository } from '../infraestructure/scoredUser/sql-scoredUser-repository';
import { GetUserPosition } from '../use-cases/get-position';

const router = Router();

router.get('/validate-user', async (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*');
    const username = req.query.username;

    if (!username || typeof username !== 'string') {
        res.status(400).send();
        return;
    }

    const useCase = new ValidateUser(new SqlUserRepository());
    const result = await useCase.execute(username);

    res.send(result);
});

router.get('/all', async (_req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*');
    const useCase = new GetAllUsers(new SqlScoredUserRepository());
    const questions = await useCase.execute();

    res.send(questions);
});

router.get('/position', async (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*');

    const username = req.query.username;

    if (!username || typeof username !== 'string') {
        res.status(400).send();
        return;
    }

    const useCase = new GetUserPosition(new SqlScoredUserRepository());
    const position = await useCase.execute(username);

    res.status(200).json({ position: position });
});

export const UserController = router;
