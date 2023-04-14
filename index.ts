import express from 'express';
import dotenv from 'dotenv';
import { QuestionsController } from './controllers/questions.controller';
import { EndGameController } from './controllers/endgame.controller';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use('/', EndGameController);
app.use('/questions', QuestionsController);

app.listen(port, () => {
    console.log(`⚡️[Server]: Server is running at https://localhost:${port}`);
});
