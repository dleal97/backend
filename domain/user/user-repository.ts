import { User } from './user';

export interface UserRepository {
    findByUsername(username: string): Promise<User | undefined>;
    save(user: User): Promise<void>;
}
