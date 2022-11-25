import { Request, Response, NextFunction } from 'express';
import base64 from 'base-64';

export const basicAuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const [username, password] = decodeCredentials(
        req.headers.authorization || ''
    );

    const secret_username = process.env.BASIC_AUTH_USERNAME || 'admin';
    const secret_password = process.env.BASIC_AUTH_PASSWORD || 'admin';

    if (username === secret_username && password === secret_password) {
        return next();
    }

    res.set('WWW-Authenticate', 'Basic realm="user_pages"');
    res.status(401).send('Authentication required.');
};

const decodeCredentials = (authHeader: string): string[] => {
    const encodedCredentials = authHeader.trim().replace(/Basic\s+/i, '');

    const decodedCredentials = base64.decode(encodedCredentials);
    return decodedCredentials.split(':');
};
