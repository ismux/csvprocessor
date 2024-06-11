import { useState } from "react";
import { ChangeEvent } from 'react';
import { DataFile } from '../types/dataTypes';

export const useFileUploader = () => {
    const fileInitial : DataFile = {
       csvFile: undefined,
       fileid: undefined
    };
    const [file, setFile] = useState<DataFile>(fileInitial);

    const setSave = async (e: ChangeEvent<HTMLInputElement>) => {
      let currentFile = e.target.files !== null ? e.target.files[0] : undefined;
      if (currentFile !== undefined) {
        setFile(file => ({
          ...file,
          csvFile : currentFile,
          fileid : undefined
        }));
      }
    };

    const setRemove = async (idFile: string) => {
      setFile(file => ({
        ...file,
        csvFile : undefined,
        fileid : idFile
      }));
    };

    return {
      file,
      setSave,
      setRemove
    }
  };