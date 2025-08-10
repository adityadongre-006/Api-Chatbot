import React, { useState } from 'react'
import "./Chat.css";
import { GoogleGenAI } from "@google/genai";
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyDDGbWcv9UwW2tYGKRxOtRMH0607MZqAa0",
  });

const Chat = ({file}) => {
    const [messages,setMessages] = useState([
        // {
        //     role:"user",
        //     text:"When was this photo taken ? "
        // },
        // {
        //     role:"model",
        //     text:"This photo was taken in June 2022. "
        // },
        // {
        //     role:"error",
        //     text:"Error sending your message. Please try  again "
        // },


    ]);
    const [input,setInput] =useState("");
    // console.log(input);
   async function handleSendMessage(){
        if(input.length){
            let chatMessages =[...messages,{role:"user",text: input} ,{role:"loader",text: ""}];
            setInput("");
            setMessages(chatMessages);
                try {
        const contents = [
      { text: `
        Answer this Question about the attached document :${input}.
        Answer as a chatbot with short messages and text only (no markdowns ,tags or symbols )
        Chat History : ${JSON.stringify(messages)}.
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
    chatMessages =[...chatMessages.filter((msg)=>msg.role != "loader"),{role:"text",text: response.text}];
    setMessages(chatMessages);
    // setStatus("success");
    // setSummary(response.text);

        
    } catch (error) {
         chatMessages =[...chatMessages,{role:"error",text:"Error Sending Messages, Please try again later"}];
          setMessages(chatMessages);
        console.log("error");
        
    }

        }

    };
  return (
    <section className='chat-window '>
        <h1 className='gradient'>Chat</h1>
          {
            messages.length ? 
            <div className="chat">
                {
                    messages.map((msg)=>(
                        <div className={msg.role} key={msg.text}>
                            <p className='bg-[#07b38e76]'>{msg.text}</p>

                        </div>
                    ))
                }
            </div> : ""

          }
         {/* <div className="chat"> */}
            {/* <div className="user">
                <p className="">When was this photo taken ? </p>
            </div>
            <div className="model">
                <p className="">This photo was taken in June 2022.</p>
            </div>
            <div className="error">
                <p className="">Error sending your message. Please try  again</p>
            </div> */}

     {/* </div> */}
        <div className="input-area mb-10">
            <input 
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            type="text"
            placeholder='Ask any questions about the uploaded doc/img'
            
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
      
    </section>
  )
}

export default Chat
