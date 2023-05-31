import { Router, Request, Response } from 'express';
import { SqlUserRepository } from '../infraestructure/user/sql-user-repository';
import { EndGame } from '../use-cases/end-game';

const router = Router();

router.put('/end-game', async (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*');
    const body = req.body;

    const useCase = new EndGame(new SqlUserRepository());
    await useCase.execute(body.username, body.newScore);
    // console.log(body.username);

    res.send();
});

export const EndGameController = router;
