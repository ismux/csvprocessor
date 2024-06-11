import { Request, Response } from 'express';
import { app }  from '../index';
import { dbConfig } from '../database/dbConfig';
import { CsvReadQuery } from '../database/dbConfig';

var sql = require('mssql/msnodesqlv8');

export default function readOperations() {
    
    app.get("/api/getfiles/:q?", async (req: Request, res: Response) => {

        try {
            const param = (req.params.q);
            const query = CsvReadQuery(param || "");

            const pool = await sql.connect(dbConfig);
            let result = await pool.request().query(query);
            let csvData: Array<Record<string,string>> = [];

            for (var i = 0; i < result.recordset.length; i++){
                csvData[i] = result.recordset[i];
            }
           
            res.status(200).send({ data: csvData });     
        }
        catch (error) 
        {
            res.status(500).send({ message: "Error al obtener los datos" });  
        }  
    });

}