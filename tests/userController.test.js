import { expect } from 'chai';
import { getAllUsers } from '../src/controllers/userController';

describe('getAllUsers', () => {
    it('debería devolver todos los usuarios', async () => {
        const users = await getAllUsers();
        expect(users).to.be.an('array').that.is.not.empty;
    });
});