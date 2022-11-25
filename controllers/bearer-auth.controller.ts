import { Router, Request, Response } from 'express';
import { bearerAuthMiddleware } from '../middlewares/bearer-auth.middleware';

const router = Router();

router.use(bearerAuthMiddleware);

router.get('/', (_req: Request, res: Response) => {
    res.send({ result: 'Bearer auth correct!' });
});

export const BearerAuthController = router;
