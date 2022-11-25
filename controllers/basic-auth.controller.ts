import { Router, Request, Response } from 'express';
import { basicAuthMiddleware } from '../middlewares/basic-auth.middleware';

const router = Router();

router.use(basicAuthMiddleware);

router.get('/', (_req: Request, res: Response) => {
    res.send({ result: 'Basic auth correct!' });
});

export const BasicAuthController = router;
