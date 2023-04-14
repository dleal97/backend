import { User } from '../../domain/user/user';
import { SqlUserRepository } from './sql-user-repository';

describe('UserRepository', () => {
    it('should find a user by username', async () => {
        const repository = new SqlUserRepository();
        const result = await repository.findByUsername('Pedro');

        // Comprobar que el resultado de la consulta es el esperado
        expect(result).toBeDefined();
    });

    it('should  not find a user by username if user does not exist', async () => {
        const repository = new SqlUserRepository();
        const result = await repository.findByUsername('Antonio');

        // Comprobar que el resultado de la consulta es el esperado
        expect(result).not.toBeDefined();
    });

    it('should save user', async () => {
        const repository = new SqlUserRepository();
        const user = new User("Antonio", "123", 789);

        await repository.save(user);

        const userFound = await repository.findByUsername("Antonio");
        expect(userFound).toBeDefined();
    });
});
