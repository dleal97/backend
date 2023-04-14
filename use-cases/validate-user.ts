import { UserRepository } from '../domain/user/user-repository';

export class ValidateUser {
    public constructor(private readonly userRepository: UserRepository) {}

    public async execute(username: string): Promise<boolean> {
        const user = await this.userRepository.findByUsername(username);

        return user !== undefined;
    }
}
