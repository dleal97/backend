import mysql from 'mysql2/promise';
import { ScoredUserRepository } from '../../domain/scoredUser/scoredUser-repository';
import { ScoredUser } from '../../domain/scoredUser/scoredUser';

export class SqlScoredUserRepository implements ScoredUserRepository {
    public constructor() {}

    public async getAllUsers(): Promise<ScoredUser[]> {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
        });

        const [results] = await connection.execute<mysql.RowDataPacket[]>(
            'SELECT username, score FROM UCOquizPlayers ORDER BY score DESC LIMIT 10'
        );

        // results.forEach((user) => {
        //     finalUsers[user.username] = user.score;
        // });

        // return Object.entries(finalUsers).map(
        //     ([key, value]) => new ScoredUser(key, value)
        // );

        const finalUsers: ScoredUser[] = results.map((user) => {
            return new ScoredUser(user.username, user.score);
        });

        return finalUsers;
    }

    public async getUserPosition(username: string): Promise<number> {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
        });

        const [results] = await connection.execute<mysql.RowDataPacket[]>(
            `SELECT position FROM (SELECT username, score, ROW_NUMBER() OVER (ORDER BY score DESC) AS position FROM dbs7575347.UCOquizPlayers) AS ranked_table WHERE username = '${username}'`
        );

        if (results.length === 0) {
            return 0;
        }
        const position = results[0].position as number;

        return position;
    }
}
