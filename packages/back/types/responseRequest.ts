
export interface responseRequest {
   isOk: boolean, 
   estado: number,
   message: string
}

export function ProcessCsvError(msg : string) {
   const err = Error(msg);
   err.name = 'ProcessCsvError';
   return err;
 }