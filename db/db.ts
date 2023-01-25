import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Question } from '../domain/question';

dotenv.config();

export const get_all_questions = async (): Promise<Question[]> => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    });
    //const [results, ] = await connection.execute("SELECT * FROM Multichoice");
    //const [results, ] = await connection.execute("SELECT m.id, m.question, a.text, a.fraction FROM Multichoice m, Answer a WHERE m.id = a.idQuestion");
    const [results, ] = await connection.execute("SELECT m.id, m.question, a.text, REPLACE(REPLACE(a.fraction, '-33.3333', 'false') , '100', 'true') AS value FROM Multichoice m, Answer a WHERE m.id = a.idQuestion;");
    const questions = (results as mysql.RowDataPacket[]).map(result => new Question(result.id, result.question, [result.text, result.value]));

    return questions
  }