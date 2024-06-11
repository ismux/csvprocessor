
export const initializeDb : string = " USE [master] \n" + 
" IF (NOT EXISTS (SELECT name FROM sys.databases " + 
"WHERE ('[' + name + ']' = 'DataCsv' OR name = 'DataCsv'))) \n" +
"BEGIN \n" +
"CREATE DATABASE [DataCsv] \n" +
"END";

export const initializeSchema : string = " USE [DataCsv] \n" +
" IF (NOT EXISTS (SELECT *  FROM sys.schemas " +
                " WHERE name = 'csv')) \n" +
" BEGIN \n" +
" EXEC ('CREATE SCHEMA [csv] AUTHORIZATION [dbo]') \n" +
" END";

export const initializeTableFile : string = " USE [DataCsv] \n" +
" IF (NOT EXISTS (SELECT *  FROM INFORMATION_SCHEMA.TABLES " +
                " WHERE TABLE_SCHEMA = 'csv' " +
                " AND  TABLE_NAME = 'DataFile')) \n" +
" BEGIN \n" +
" CREATE TABLE [csv].[DataFile]( \n" +
	" [Id] [int] IDENTITY(1,1) NOT NULL, \n" +
	" [FileName] [nvarchar](50) NOT NULL, \n" +
	" CONSTRAINT [PK_DataFile] PRIMARY KEY CLUSTERED  \n" +
	" ( \n" +
		" [Id] ASC \n" +
	" )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] \n" +
	" ) ON [PRIMARY] \n" +
" END";

export const initializeTable : string = " USE [DataCsv] \n" +
" IF (NOT EXISTS (SELECT *  FROM INFORMATION_SCHEMA.TABLES " +
                " WHERE TABLE_SCHEMA = 'csv' " +
                " AND  TABLE_NAME = 'DataContent')) \n" +
" BEGIN \n" +
" CREATE TABLE [csv].[DataContent]( \n" +
	" [Id] [int] IDENTITY(1,1) NOT NULL, \n" +
	" [DataFileId] [int] NOT NULL FOREIGN KEY REFERENCES [csv].[DataFile](Id), \n" +
	"[COLS]" + 
	" CONSTRAINT [PK_DataContent] PRIMARY KEY CLUSTERED  \n" +
	" ( \n" +
		" [Id] ASC \n" +
	" )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] \n" +
	" ) ON [PRIMARY] \n" +
" END";

export const initializeTableCols = () : string => {
	var baseQueryWithCols : string = initializeTable;
	try{
		var cols : string = "";
		const numCols : number = getMaxNumCols(); 
	 
		for (var i = 1; i <= numCols; i++){
		  cols += " [Col"+ i +"] [nvarchar](50) NULL, \n";
		}
	 
		baseQueryWithCols = baseQueryWithCols.split("[COLS]").join(cols);
	}catch(ex: any){
         console.log(ex.message);
	}
   return baseQueryWithCols;
}

export const getMaxNumCols = () : number => {
	const numCols : number = process.env.REACT_APP_CSVCOLS !== undefined ? +process.env.REACT_APP_CSVCOLS : 7; 
	return numCols;
}