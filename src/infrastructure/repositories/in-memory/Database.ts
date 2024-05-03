class Database {
    private static _instance: any;
    private constructor() {

    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = {
            todoList: [],
            registeredUsers: [
                {id: '2', email: 'a', password: '$2b$10$vSDyGlhcC6fCovz1Q3oC6.hCVSqQ9AqmJwlZjceIlPXsnWj7AsqtS'}
            ]
        };
        return this._instance;
    }
}

export default Database;
