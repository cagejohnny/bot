import { Database } from "sqlite3"

class DAO {
    private db:Database;

    constructor(filename: string) {
        this.db = new Database(filename, (err: Error | null) => {
            if (err) {
                console.error('Could not connect to database', err)
            } else {
                console.log('Connected to database')
            }
        })
    }

    run(sql: string, params: Array<string | number> = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err: Error | null) {
                if (err) {
                    console.error('Error running sql: ' + sql)
                    console.error(err)
                    reject(err)
                } else {
                    resolve({ id: this.lastID })
                }
            })
        })
    }

    get(sql: string, params: Array<string | number> = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err: Error | null, result) => {
                if (err) {
                    console.error('Error running sql: ' + sql)
                    console.error(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    all(sql: string, params: Array<string | number> = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err: Error | null, rows) => {
                if (err) {
                    console.error('Error running sql: ' + sql)
                    console.error(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

export default DAO