import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

const dbUsername = process.env.DB_USER || 'root'; 
const dbPassword = process.env.DB_PASSWORD; 
const dbName = process.env.DB_NAME || 'dama2';
const dbHost = process.env.DB_HOST || 'db'; 

//crea una connessione
export class DbConnection {
    private static instance: DbConnection;
    private sequelizer: any;
    private constructor() {
        this.sequelizer = new Sequelize(dbName, dbUsername, dbPassword, {
            host: dbHost,
            dialect: 'mysql',
        });
    }

    public static getConnection(): any {
        if (!DbConnection.instance) {
            this.instance = new DbConnection();
        }
        return DbConnection.instance.sequelizer;
    }
}