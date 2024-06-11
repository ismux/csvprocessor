import { ProcessCsvError } from '../types/responseRequest';
import { getMaxNumCols } from '../database/initializeDb';

export const dbConfig : any = {
    server: '.\\SQLEXPRESS', 
    database: 'master',
    options: {
        trustedConnection: true
    }
};

export const queryAllCsvFilter : string = "SELECT DC.*, DF.FileName, \n" +
                                          "(SELECT COUNT(Id) FROM [DataCsv].[csv].[DataContent] WHERE DataFileId = DC.DataFileId and Id <= DC.Id) AS FileLine \n" +   
                                          "FROM [DataCsv].[csv].[DataContent] \n" +
                                          "DC INNER JOIN [DataCsv].[csv].DataFile DF \n" +
                                          "ON DF.Id = DC.DataFileId ";

export const queryBaseCsvInsert : string = "INSERT INTO [DataCsv].[csv].[DataContent] [COLS] VALUES ";

export const queryFileCsvInsert : string = "INSERT INTO [DataCsv].[csv].[DataFile] (FileName) VALUES ('[PARAM]'); \n" +
                                           "SELECT SCOPE_IDENTITY() AS InsertedFile;";

export const queryCheckFileExists : string = "SELECT COUNT(Id) AS FileCounter FROM [DataCsv].[csv].[DataFile] WHERE FileName = '[PARAM]';";

export const queryFileCsvDelete : string = "DELETE FROM [DataCsv].[csv].[DataContent] WHERE DataFileId = [PARAM]; \n" +
                                           "DELETE FROM [DataCsv].[csv].[DataFile] WHERE Id = [PARAM];";

export function CsvReadQuery(param : string) : string {

    var baseQuery : string = queryAllCsvFilter;
    var maxNumCols : number = getMaxNumCols();
    
    for (var i = 1; i <= maxNumCols; i++) {
      baseQuery += i == 1 ? " WHERE DC.Col" + i + " like '%[PARAM]%'" 
                          : " OR DC.Col" + i + " like '%[PARAM]%'";
    }
    baseQuery += " OR DF.FileName like '%[PARAM]%'";

    let query = param !== "" ? baseQuery.split("[PARAM]").join(param)
                             : queryAllCsvFilter;

    return query;
}

export function CheckCsvFileExists(req: string) : string {
  var baseExistsQuery : string = queryCheckFileExists;

  baseExistsQuery = baseExistsQuery.split("[PARAM]").join(req);

  return baseExistsQuery;    
}

export function CsvFileInsert(req: string) : string {
  var baseInsertQuery : string = queryFileCsvInsert;

  baseInsertQuery = baseInsertQuery.split("[PARAM]").join(req);

  return baseInsertQuery;
}

export function CsvInsertFromCsvData(req: Array<Record<string, string>>,  req2: number) : string {
    
    var crntQuery = "";
    var maxNumCols : number = getMaxNumCols();
    var baseInsertQuery : string = queryBaseCsvInsert;
    var insertQuery : string = "";

    for (var i = 1; i <= maxNumCols; i++) {
      switch (i) {
        case 1:
          insertQuery += "(DataFileId, Col" + i + " ,";
        break;
        case maxNumCols:
          insertQuery += "Col" + i + ")";
        break;
        default:
          insertQuery += "Col" + i + " ,";
        break; 
      }
    }

    baseInsertQuery = baseInsertQuery.split("[COLS]").join(insertQuery);
    let cnt = 1;
    
    for (const key in req) {
      cnt = 1;
      crntQuery += " (";
      const values = Object.values(req[key]);
      const valuesParsed = [];

        if (values.length > maxNumCols){
         let errCols = ProcessCsvError("El fichero CSV no puede tener más de "+ maxNumCols +" columnas");
         throw(errCols);
        }

        valuesParsed.push(req2);

        for (const value in values) {
          valuesParsed.push("'" + values[value] + "'");
          cnt++;  
        }
        crntQuery += valuesParsed.join(",");

        if (cnt <= maxNumCols) {
            for (var i = cnt; i <= maxNumCols; i++){ 
              crntQuery += ",NULL" 
            }
        }

      crntQuery += ")";
    }
   
    crntQuery = crntQuery.split(") (").join("), (");
    
    return baseInsertQuery + crntQuery;
}

export function CsvFileDelete(req: string) : string {
  var baseDeleteQuery : string = queryFileCsvDelete;

  baseDeleteQuery = baseDeleteQuery.split("[PARAM]").join(req);

  return baseDeleteQuery;
}