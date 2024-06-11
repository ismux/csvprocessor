import { useState } from "react";
import { SetFileSave, SetFileRemove  } from '../servicecall/serviceintegration';
import { ProcessAction, Modal } from '../types/dataTypes';

export const useModalScreen = () => {
    const modalInitial : Modal = {
      action: "",
      actionDisabled: true,
      dialog: false,
      message: ""
    };
 
    const [confirm, setConfirm] = useState<Modal>(modalInitial);
    const [processAction, setProcessAction] = useState<ProcessAction | undefined>(undefined);

    const setConfirmFromAction = async (updConfirm : Modal) => {
      setConfirm(confirm => ({
        ...confirm,
        action : updConfirm.action,
        dialog: updConfirm.dialog,
        message : updConfirm.message
      }));
    };

    const setFileSaveEvent = async (fileSave : File | undefined) : Promise<void> => {

     let res : ProcessAction = {
        iserror: false,
        message: ""
     }
      try {
        let dataGuardado = await SetFileSave(fileSave);
        res = dataGuardado;
      }
      catch(error) {
        if (error instanceof Error) {
            res.iserror = true;
            res.message = error.message;
        } 
      }

      setConfirm(confirm => ({
        ...confirm,
        dialog: false
      }));
      setProcessAction(res);
    };

    const setFileRemoveEvent = async (filedelete : string) : Promise<void> => {

      let res : ProcessAction = {
         iserror: false,
         message: ""
      }
       try {
         let dataEliminado = await SetFileRemove(filedelete);
         res = dataEliminado;
       }
       catch(error) {
         if (error instanceof Error) {
             res.iserror = true;
             res.message = error.message;
         } 
       }

       setConfirm(confirm => ({
        ...confirm,
        dialog: false
      }));
       setProcessAction(res);
     };
    

    return {
        confirm,
        processAction,
        setProcessAction, 
        setConfirmFromAction,
        setFileSaveEvent,
        setFileRemoveEvent
    }
}