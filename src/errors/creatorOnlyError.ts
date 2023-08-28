export class CreatorOnlyError extends Error {
    message = 'apenas o criador do prato pode editá-lo';

    constructor() {
        super();
    }
}