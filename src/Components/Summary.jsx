import React, { useState,useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import Loader from "./Loader";

const Summary = ({ file }) => {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyDDGbWcv9UwW2tYGKRxOtRMH0607MZqAa0",
  });
  const [summary,setSummary] = useState("");
  const [status,setStatus] = useState("idle");

  async function getSummary() {
    setStatus("loading");
    try {
        const contents = [
      { text: `
        Summarize the document in bulleted 
        points and short paragraph (less than 200 words ),
        use just plain text with no markdowns or html tags 
        ` },
      {
        inlineData: {
          mimeType: file.type,
          data: file.file,
        },
      },
    ];
    

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    setStatus("success");
    setSummary(response.text);
        
    } catch (error) {
        setStatus("error")
        
    }
    
    
  }
  useEffect(()=>{
    if(status === "idle"){
           getSummary();
    }
          
  },[status]);
  

  return (
  <section className="summary p-20 text-left bg-[#1b0c81b8] rounded-xl">
    <img src={file.imageURL} alt="Preview Image" />
    <h1 className="text-center font-semibold">Summary</h1>
    <hr  />
    
    {
        status === "loading" ? <Loader />:
        status === "success" ? <p className="bg-[#0007] p-5 rounded-2xl">{summary}</p> :
        status === "error" ?  <h2 className="text-red-500">Error getting the summary</h2> :
        ""
    }
    
  </section>
  )
};

export default Summary;
