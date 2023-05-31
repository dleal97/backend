import { ScoredUser } from './scoredUser';

export interface ScoredUserRepository {
    getAllUsers(): Promise<ScoredUser[]>;
    getUserPosition(username: string): Promise<number>;
}
