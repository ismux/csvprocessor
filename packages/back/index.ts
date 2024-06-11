/*
   Si falla el proyecto al iniciar
   rm -r node_modules
   npm install
*/
import express, { Application } from 'express';
import cors  from 'cors';
import multer from "multer";
import readOperations from './api/readOperations';
import writeOperations from './api/writeOperations';
import { dbConfig } from './database/dbConfig';
import { initializeDb, initializeSchema, initializeTableFile, initializeTableCols } from './database/initializeDb';
import dotenv from 'dotenv';
dotenv.config();

var sql = require('mssql/msnodesqlv8');

const port = process.env.REACT_APP_PORT; 
const API = process.env.REACT_APP_API_URL; 

export const app : Application = express();

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
export const upload = multer({ storage });

readOperations();
writeOperations();

app.listen(port, async () => {
    try {
    const pool = await sql.connect(dbConfig);
    await pool.request().query(initializeDb);
    await pool.request().query(initializeSchema);
    await pool.request().query(initializeTableFile);
    await pool.request().query(initializeTableCols());   

    console.log('Server running at ' + API + ' and db initialized');
    }
    catch(exc : any){
        console.log(exc.message);
    }
});