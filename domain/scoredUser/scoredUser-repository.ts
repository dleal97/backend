import { ScoredUser } from './scoredUser';

export interface ScoredUserRepository {
    getAllUsers(): Promise<ScoredUser[]>;
}
