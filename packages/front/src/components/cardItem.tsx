import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CardItem = ({ csvData, setRemove, setConfirmFromAction } :
                  { csvData : Array<Record<string,string>>, setRemove : Function, 
                    setConfirmFromAction: Function }) => {

    return (<Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} style={{maxHeight: '650px', overflowY: 'scroll'}}>
                {csvData.map((obj: Record<string,string>, index: number) => (
                <Grid item xs={12} md={6} lg={3} key={"grid" + index}>
                  <Card variant="outlined" key={"card" + index}>
                   <CardContent key={"content" + index}> 
                      <Button key={"btn" + index} variant="contained" component="button" 
                              color="error" defaultValue={obj["DataFileId"]} 
                              onClick = { async () => {
                                          await setRemove(obj["DataFileId"]);
                                          await setConfirmFromAction({ action: "Eliminar", 
                                                                      message: "¿Deseas eliminar el fichero " +
                                                                               obj["FileName"] + " y todo su contenido?",
                                                                      dialog: true });
                                        } }>
                        Eliminar 
                      </Button><hr></hr>  
                      <Typography key={"head" + index} variant="h6" component="div">
                       { obj["FileName"] }
                      </Typography>    
                      <Typography key={"body" + index} variant="body2">
                       { "Línea nº " +  obj["FileLine"] } 
                      </Typography>   <hr></hr>                        
                      {Object.keys(obj).filter(key => key.indexOf('Col') >= 0).map((key: string, index: number) => (
                        <Typography key={"altbody" + index} variant="body2">
                         { obj[key] }
                        </Typography>                         
                      ))}
                   </CardContent>
                  </Card>
                </Grid>
                ))}
              </Grid>
            </Box>);
}

export default CardItem;