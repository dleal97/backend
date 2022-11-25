import { Router, Request, Response } from 'express';
import jwt from 'jwt-simple';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    return res.status(200).send({ token: createToken() });
});

const createToken = () => {
    const now = new Date();

    const fourteenDaysDateFromNow = new Date();
    fourteenDaysDateFromNow.setDate(now.getDate() + 14);

    const payload = {
        sub: 1,
        iat: now,
        exp: fourteenDaysDateFromNow,
    };

    return jwt.encode(payload, process.env.TOKEN_SECRET || 'token-secret');
};

export const LoginController = router;
