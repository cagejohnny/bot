import DAO from "./dao"

export interface User {
    username: string
    active: number
}

class UserRepository {
    private dao;

    constructor(dao:DAO) {
        this.dao = dao
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(255),
            active DATETIME
        )`
        return this.dao.run(sql)
    }

    async getUserByUsername(name: string): Promise<User | null> {
        const data: any = await this.dao.get(`SELECT * FROM users WHERE name = ?`, [name])
        return data ? {
            username: data.username,
            active: data.active
        } : null
    }
}

export default UserRepository