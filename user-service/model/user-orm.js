import { createUser } from './repository.js';
import { userNameExists } from './repository.js';
import { DuplicateUserError } from '../errors.js';
import bcrypt from 'bcrypt';


//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        if (await userNameExists(username)) {
            throw new DuplicateUserError(`User ${username} is taken!`)
        }
        const newUser = await createUser({username, password});
        newUser.password = await hashPassword(newUser);
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

async function hashPassword(newUser) {
    const hashed = await bcrypt.hash(newUser.password, 10);
    return hashed;
}

