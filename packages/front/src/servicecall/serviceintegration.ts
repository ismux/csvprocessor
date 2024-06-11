import axios from "axios";
import { ProcessAction, DataCsv } from '../types/dataTypes';

export async function GetCSVData(filter : string): Promise<DataCsv> {
    let res : DataCsv = {
        data: [],
        message: "",
        iserror: false
    };
    try {

      if (filter.indexOf("%") > -1) {
        res.iserror = true;
        res.message = 'Caracter de búsqueda "%" no permitido';
      }
      else {
        const url = import.meta.env.VITE_APP_API + "/api/getfiles/" + filter;
        const response = await axios.get<DataCsv>(url);
        
        res.data = response.data.data;
      }
    } 
    catch (err) {
        res.message = "Se ha producido un error al obtener los datos";
        res.iserror = true;
    }
    return res;
  }

  export async function SetFileSave(fichero : File | undefined) : Promise<ProcessAction> {
    
    let res : ProcessAction = {
        iserror: false,
        message: ""
    };

    try {
      
      if (fichero == undefined){
        res.iserror = true;
        res.message = "No se ha seleccionado ningún fichero";
      }
      else {
        var config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'accept': '*/*',
          }
        };
        
        const formData = new FormData();
        formData.append("file", fichero);
  
        const apiResponse = await axios.post(import.meta.env.VITE_APP_API + '/api/filesave', formData, config);

        res.iserror = apiResponse.data.iserror;
        res.message = apiResponse.data.message;
       }
      } 
      catch (error : any) {
        res.iserror = true;
        res.message = error.message;     
      }
      return res;
  }


  export async function SetFileRemove(datafileid: string): Promise<ProcessAction> {
    let res : ProcessAction = {
      iserror: false,
      message: ""
    };
    try {
       const dataToSend = { datafileid: datafileid };

       const apiResponse = await axios.post(import.meta.env.VITE_APP_API + '/api/filedelete', dataToSend);
      
       res.iserror = apiResponse.data.iserror;
       res.message = apiResponse.data.message;
    }
    catch (error) {
        res.iserror = true;
        res.message = "Error al eliminar fichero ";     
    }
    return res;
  }