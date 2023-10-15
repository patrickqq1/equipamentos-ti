import { Knex } from "knex"
import path from "path"

export const development: Knex.Config = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, '../../../database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, "..", "migrations")
    },
    seeds: {
        directory: path.resolve(__dirname, '..', "seeds")
    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys=ON;', done);
            done();
        }
    }
}

export const production = {
    client: "mysql2",
    useNullAsDefault: true,
    connection: {
        host : '192.168.10.167',
        user: "patrick",
        password: "abc@123",
        database: "estoque_ti"
    },
    migrations: {
        directory: path.resolve(__dirname, "..", "migrations")
    },
    seeds: {
        directory: path.resolve(__dirname, '..', "seeds")
    }
}
