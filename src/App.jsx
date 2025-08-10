import { useState } from 'react'

import './App.css'
import FileUpload from './Components/FileUpload'
import Header from './Components/Header'
import Summary from './Components/Summary'
import Chat from './Components/Chat'

function App() {
  const [upLoadfile,setUpLoadfile] = useState(null);
 

  return (
    <>
    <main className="container">
       <Header />
       {
        upLoadfile ?
                      <>
                       <Summary file={upLoadfile} />
                        <Chat file={upLoadfile}  /> 
                      </>
                    :
         <FileUpload setFile={setUpLoadfile} />
        
       }
    
   
    </main>

    </>
  )
}

export default App
