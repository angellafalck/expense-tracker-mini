import { error, log } from 'console';
import mysql from 'mysql2/promise';

let connection: any;
const createConnection = async() =>{
    if(!connection){
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        })
    }
    return connection;
}

export default createConnection;