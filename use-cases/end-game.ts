import { UserRepository } from '../domain/user/user-repository';

export class EndGame {
    public constructor(private readonly userRepository: UserRepository) {}

    public async execute(username: string, newScore: number): Promise<void> {
        // Obtener de la base de datos la informacion del usuario.
        const user = await this.userRepository.findByUsername(username);

        // Compruebo que exista el usuario
        if (!user) {
            throw new Error('User not found');
        }

        // Comparacion entre score y newScore
        user.updateScore(newScore);

        // Hago el guardado si newScore es mayor
        await this.userRepository.save(user);
    }
}
