import DAO from "./dao"

export type URL = string

class QueueRepository {
    private dao:DAO;
    private index:number;

    constructor(dao:DAO) {
        this.dao = dao
        this.index = 0;
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS queue (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url VARCHAR(255),
            active BOOLEAN,
            created DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
        return this.dao.run(sql)
    }

    setQueue(url: URL) {
        const sql = `INSERT INTO queue (url) VALUES ('${url}')`
        return this.dao.run(sql)
    }

    getQueue(id: number) {
        const sql = `SELECT * FROM queue WHERE id = ?`
        return this.dao.run(sql, [id])
    }

    async getAllQueue(): Promise<URL[] | null> {
        const data: any = await this.dao.all(`SELECT * FROM queue`)
        return data ? data : null
    }

    getActive() {
        const sql = `SELECT * FROM queue WHERE active`
    }

    removeQueue(id: number) {
        const sql = `DELETE FROM queue WHERE id = ?`
        return this.dao.run(sql, [id])
    }
}

export default QueueRepository