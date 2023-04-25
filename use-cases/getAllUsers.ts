import { ScoredUser } from '../domain/scoredUser/scoredUser';
import { ScoredUserRepository } from '../domain/scoredUser/scoredUser-repository';

export class GetAllUsers {
    public constructor(
        private readonly scoredUserRepository: ScoredUserRepository
    ) {}

    public async execute(): Promise<ScoredUser[]> {
        const users = await this.scoredUserRepository.getAllUsers();
        return users;
    }
}
