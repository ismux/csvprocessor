import { useState } from "react";
import { GetCSVData  } from '../servicecall/serviceintegration';
import { ProcessAction } from '../types/dataTypes';

export const useSearchEngine = () => {
      const [search, setSearch] = useState<string>("");
      const [csvData, setCsvData] = useState<[] | Array<Record<string,string>>>([]);

      const setSearchFromVal = (value: string) => {
        setSearch(value);
      };

      const reloadGetCsvData = async (filter : string) : Promise<ProcessAction> => {
        const response : ProcessAction = {
          iserror: false,
          message: "datos OK"
        };
        try {
          const res = await GetCSVData(filter);
          if (!res.iserror){
            setCsvData(res.data);
          }
          else{
            throw new Error(res.message);
          }
        }
        catch(error: any) {
            response.iserror = true;
            response.message = error.message;
        }
        return response;
      };

      return {
        search,
        csvData,
        setSearchFromVal, 
        reloadGetCsvData
    }
};