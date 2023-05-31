import { ScoredUserRepository } from '../domain/scoredUser/scoredUser-repository';

export class GetUserPosition{
    public constructor(
        private readonly scoredUserRepository: ScoredUserRepository
    ) {}

    public async execute(username: string): Promise<number> {
        const pos = await this.scoredUserRepository.getUserPosition(username);
        return pos;
    }
}