import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { QuestionsController } from './controllers/questions.controller';
import { EndGameController } from './controllers/endgame.controller';
import { UserController } from './controllers/user.controller';

dotenv.config();

const app = express();
app.use(express.json())
// const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(cors());
app.use('/', EndGameController);
app.use('/users', UserController);
app.use('/questions', QuestionsController);

app.listen(port, () => {
    console.log(`⚡️[Server]: Server is running at https://localhost:${port}`);
});
