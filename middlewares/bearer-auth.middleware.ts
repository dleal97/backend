import { Request, Response, NextFunction } from 'express';
import jwt from 'jwt-simple';

export const bearerAuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No auth header in request' });
    }

    const token = req.headers.authorization.split(' ')[1];

    let payload;

    try {
        payload = jwt.decode(token, process.env.TOKEN_SECRET || 'token-secret');
    } catch (error) {
        return res
            .status(401)
            .send({ message: `Error: ${(error as Error).message}` });
    }

    if (payload.exp <= new Date()) {
        return res.status(401).send({ message: 'Token has expired' });
    }

    next();
};
