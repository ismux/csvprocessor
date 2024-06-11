import { app, upload }  from '../index';
import { Request, Response } from "express";
import { dbConfig } from '../database/dbConfig';
import { CsvFileInsert, CheckCsvFileExists, CsvInsertFromCsvData, CsvFileDelete } from '../database/dbConfig';
import { ProcessCsvError } from '../types/responseRequest';
import csvToJson from 'convert-csv-to-json';

var sql = require('mssql/msnodesqlv8');

export default function writeOperations() {

    app.post('/api/filesave', upload.single('file'), async (req: Request, res: Response) => {
          
        try {
            
            const { file } = req;

            if (file == undefined){ 
                let errProc = ProcessCsvError("Fichero requerido");
                throw(errProc);
            }

            if (file.mimetype !== "text/csv") {
                let errFormat = ProcessCsvError("El fichero " + file.originalname + " no es un CSV" );
                throw(errFormat);
            }            

            const pool = await sql.connect(dbConfig);

            let queryCheckFileExists = CheckCsvFileExists(file.originalname);
            var resultCheckFileExists = await pool.request().query(queryCheckFileExists);
            var countExists : number = resultCheckFileExists.recordset[0].FileCounter;
            if (countExists > 0) {
                let errFormat = ProcessCsvError("El fichero " + file.originalname + " ya existe" );
                throw(errFormat);
            }

            let queryInsertFile = CsvFileInsert(file.originalname);
            var resultInsertFile = await pool.request().query(queryInsertFile);
            var idInserted : number = resultInsertFile.recordset[0].InsertedFile;
            
            const result = Buffer.from(file.buffer).toString("utf-8");
            const resultJson = csvToJson.csvStringToJson(result);
            let csvData: Array<Record<string,string>> = resultJson;

            let query = CsvInsertFromCsvData(csvData, idInserted);
            
            await pool.request().query(query);
        
            res.status(200).send({ iserror: false, message: "El archivo " + file?.originalname + " se cargó correctamente" });   
        } 
        catch (error : any) 
        {
            if (error instanceof Error) {
                if (error.name === 'ProcessCsvError') {
                    res.status(200).send({ iserror: true, message: error.message });
                }
                else {
                    res.status(500).send({ iserror: true, message: error.message }); 
                }
            }
            else {
                res.status(500).send({ iserror: true, message: "Error al guardar" }); 
            } 
        }
    });


    app.post('/api/filedelete', async (req: Request, res: Response) => {
      try {
        const { datafileid } : { datafileid: string } = req.body;
        
        const pool = await sql.connect(dbConfig);
        let queryInsertFile = CsvFileDelete(datafileid);

        await pool.request().query(queryInsertFile);

        res.status(200).send({ iserror: false, message: "El archivo se eliminó correctamente" });  
      }
      catch (error : any) 
      {
        if (error instanceof Error) {
            if (error.name === 'ProcessCsvError') {
                res.status(200).send({ iserror: true, message: error.message });
            }
            else {
                res.status(500).send({ iserror: true, message: error.message }); 
            }
        }
        else {
            res.status(500).send({ iserror: true, message: "Error al eliminar" }); 
        } 
       }
    });
}