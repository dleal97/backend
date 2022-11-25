import express from 'express';
import dotenv from 'dotenv';
import { BasicAuthController } from './controllers/basic-auth.controller';
import { StatusAuthController } from './controllers/status-auth.controller';
import { BearerAuthController } from './controllers/bearer-auth.controller';
import { LoginController } from './controllers/login.controller';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/', StatusAuthController);
app.use('/basic', BasicAuthController);
app.use('/bearer', BearerAuthController);
app.use('/login', LoginController);

app.listen(port, () => {
    console.log(`⚡️[Server]: Server is running at https://localhost:${port}`);
});
