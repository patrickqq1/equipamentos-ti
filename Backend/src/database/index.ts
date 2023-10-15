import knex from "knex";
import { development, production } from "./knex/Enviroment";
import dotenv from 'dotenv'

dotenv.config()

const getEnviroment = () => {
    switch(process.env.NODE_ENV) {
        case 'production': return production;
        case 'development': return development;
        default: throw new Error('Defina a variavel de ambiente!');
    }
}

export const Knex = knex(getEnviroment())