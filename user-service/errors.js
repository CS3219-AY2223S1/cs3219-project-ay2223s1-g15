export class DuplicateUserError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DuplicateUserError';
    }
}


