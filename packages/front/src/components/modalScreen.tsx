import Grid from '@mui/material/Grid';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { Modal } from '../types/dataTypes';
import { DataFile } from '../types/dataTypes';

const ModalScreen = ({ confirm, file, setConfirmFromAction, setFileSaveEvent, setFileRemoveEvent, reloadGetCsvData } :
                     { confirm : Modal, file : DataFile,   
                      setConfirmFromAction : Function, setFileSaveEvent : Function, setFileRemoveEvent : Function, 
                      reloadGetCsvData : Function }) => {

    return (
        <Dialog onClose={() => setConfirmFromAction({ dialog: false })} open={confirm.dialog}>
        <DialogTitle align="center">Confirmar {confirm.action}</DialogTitle>
        <DialogContent>
        <p style={{textAlign: 'center'}}>{confirm.message}</p><hr></hr>
        <Grid container spacing={{ xs: 6, md: 20, lg: 20 }}>
        <Grid item xs={6} md={6} lg={6}>
        <Button variant="contained" component="label" disabled={file.csvFile == undefined && file.fileid == undefined} 
                 color="success" onClick = { async () => { confirm.action == "Guardar" ? 
                                                           await setFileSaveEvent(file.csvFile) : 
                                                           await setFileRemoveEvent(file.fileid);
                                                           await reloadGetCsvData("");
                                            } }>
         {confirm.action}
       </Button>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
        <Button variant="contained" component="label" disabled={file.csvFile == undefined && file.fileid == undefined} 
                color="error" onClick = { () => { setConfirmFromAction({ dialog: false }) } }>
         Cancelar
       </Button>
        </Grid>
        </Grid> 
        </DialogContent>   
     </Dialog>);
}

export default ModalScreen;