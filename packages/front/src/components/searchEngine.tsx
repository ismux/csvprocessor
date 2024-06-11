import { ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { ProcessAction } from '../types/dataTypes';

const SearchEngine = ({ search, setSearchFromVal, reloadGetCsvData, setProcessAction } : 
                      { search : string, setSearchFromVal : Function, 
                        reloadGetCsvData : Function, setProcessAction : Function }) => {

   const searchAction = async () => {
    let res : ProcessAction = await reloadGetCsvData(search);
    if (res.iserror){
        setProcessAction(res);
    }
   }

   return (
            <>
               <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Buscar</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        label="Amount"
                        onChange = { (event: ChangeEvent<HTMLInputElement>) => { setSearchFromVal(event.target.value) } } />
                </FormControl>
                <Button variant="contained" component="label" onClick = { async () => { await searchAction(); } }>
                    Buscar 
                </Button>
            </>
    );

}

export default SearchEngine;