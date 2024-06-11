import { useEffect } from "react";
import FileUploader from '../src/components/fileUploader';
import { useFileUploader } from '../src/customHooks/useFileUploader';
import CardItem from '../src/components/cardItem';
import ModalScreen from '../src/components/modalScreen';
import { useModalScreen } from '../src/customHooks/useModalScreen';
import ShowAlert from '../src/components/showAlert';
import SearchEngine from './components/searchEngine';
import { useSearchEngine } from './customHooks/useSearchEngine';

const App = () => {

const { file, setSave, setRemove } = useFileUploader();
const { processAction, confirm, setProcessAction, setConfirmFromAction, setFileSaveEvent, setFileRemoveEvent } = useModalScreen();
const { search, csvData, setSearchFromVal, reloadGetCsvData } = useSearchEngine();

useEffect(() => {
  (async () => {
    await reloadGetCsvData("");
  })();
}, []);

  return (
    <>
    <form>
     <FileUploader file={file} setSave={setSave} setConfirmFromAction={setConfirmFromAction} />
     <hr></hr>
     <SearchEngine search={search} setSearchFromVal={setSearchFromVal} reloadGetCsvData={reloadGetCsvData}
                   setProcessAction={setProcessAction} />
    </form>
    <br /><br />
     <CardItem csvData={csvData} setRemove={setRemove} setConfirmFromAction={setConfirmFromAction} />
     <ModalScreen confirm={confirm} file={file} setConfirmFromAction={setConfirmFromAction} 
                  setFileSaveEvent={setFileSaveEvent} setFileRemoveEvent={setFileRemoveEvent} 
                  reloadGetCsvData={reloadGetCsvData} />
     <ShowAlert processAction={processAction} setProcessAction={setProcessAction} />        
    </>);
}

export default App