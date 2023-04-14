import { User } from '../../domain/user/user';
import mysql from 'mysql2/promise';
import { UserRepository } from '../../domain/user/user-repository';
import Connection from 'mysql2/typings/mysql/lib/Connection';
import { createConnection } from 'mysql2';

export class SqlUserRepository implements UserRepository {
    public constructor() {}

    public async findByUsername(username: string): Promise<User | undefined> {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
        });

        const [results] = await connection.query<mysql.RowDataPacket[]>(
            'SELECT * FROM UCOquizPlayers WHERE username = ?',
            [username]
        );

        if (results.length === 0) {
            return undefined;
        }

        return new User(
            results[0].username,
            results[0].password,
            results[0].score
        );
    }

    public async save(user: User): Promise<void> {
        try {
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PWD,
                database: process.env.DB_NAME,
            });

            await connection.query(
                `INSERT INTO UCOquizPlayers (username, password, score) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password=?, score=?`,
                [user.username, user.password, user.score, user.password, user.score]
            );
        } catch (err) {
            console.error('Error saving user:', err);
            throw err;
        }
    }
}
