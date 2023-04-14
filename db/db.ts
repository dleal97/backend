import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Question } from '../domain/question/question';

dotenv.config();

export const check_newbd = async (): Promise<void> => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
        });

        await connection.end()
    } catch (error) {
        console.log(error);
    }
};
