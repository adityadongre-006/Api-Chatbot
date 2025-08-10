import React from 'react'
import { Buffer } from 'buffer';

const FileUpload = ({setFile}) => {
async  function  handleFileUpload  (event){
    const fileupload = await event.target.files[0].arrayBuffer();
    const file ={
        type: event.target.files[0].type,
        file:Buffer.from(fileupload).toString("base64"),
        imageURL:  event.target.files[0].type.includes("pdf") ? "./src/assets/PDFIMG.png"  : URL.createObjectURL(event.target.files[0])
    }
    setFile(file);
  }
  return (
    <section>
        <h2 className="">Get Started</h2>
        <input
         type="file" 
        
         accept='.pdf, .jpg , .jpeg ,.png '
         onChange={handleFileUpload}
        />
      
    </section>
  )
}

export default FileUpload
