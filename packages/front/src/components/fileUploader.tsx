import { ChangeEvent } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataFile } from '../types/dataTypes';

const FileUploader =  ({ file, setSave, setConfirmFromAction } :
                       { file: DataFile, setSave: Function, setConfirmFromAction: Function } ) => {

    return (<Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={6}>
                  <Button variant="outlined" component="label" color="success">
                      Seleccionar archivo CSV
                      <input type="file" accept=".csv" onChange={(e: ChangeEvent<HTMLInputElement>) => { 
                                                                  setSave(e);
                                                                }} hidden />
                  </Button><br />
                  <label>{file.csvFile?.name}</label>
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <Button variant="contained" component="label" disabled={file.csvFile == undefined} 
                            color="success" onClick = { () => { setConfirmFromAction({ dialog: true, 
                                                                                       action: "Guardar",
                                                                                       message: "¿Deseas guardar el fichero " + 
                                                                                                file.csvFile?.name + "?"
                                                                                    });
                                                              } }>
                      Guardar .csv
                    </Button>
                  </Grid>
                </Grid>
            </Box>);

}

export default FileUploader;