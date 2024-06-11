import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import { ProcessAction } from '../types/dataTypes';

const ShowAlert = ({ processAction, setProcessAction } : 
                   { processAction : ProcessAction | undefined, setProcessAction : Function }) => {

const typeMess = processAction !== undefined && !processAction.iserror ? "success" : "error";
const titleMess = processAction !== undefined && !processAction.iserror ? "Acción realizada con éxito" : "Se ha producido un Error";

return (
    <>
{processAction !== undefined && processAction.message !== "" ?
                     <Alert style={{zIndex: 1000, position: "absolute", width: "400px", top: "20%", left: '40%'}} 
                           severity={typeMess} onClose={() => setProcessAction(undefined)}>
                        <AlertTitle>{titleMess}</AlertTitle>
                        <p>{processAction.message}</p>
                    </Alert>
                : "" }
    </>);
}

export default ShowAlert;