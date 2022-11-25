import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    res.send({ result: 'Hello world!' });
});

export const StatusAuthController = router;
