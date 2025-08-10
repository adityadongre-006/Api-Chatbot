import React, { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import Loader from "./Loader";

const Summary = ({ file }) => {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyDDGbWcv9UwW2tYGKRxOtRMH0607MZqAa0",
  });
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("idle");

  async function getSummary() {
    setStatus("loading");
    try {
      const contents = [
        {
          text: `
                  Generate a comprehensive summary 
                  for the provided document or image. Your summary
                    must be approximately 200 words and presented
                    in clear, concise bulleted points.
                      Each point should be briefly explained. 
                      Focus on these key aspects: 
                      Identify the central theme or main subject
                        of the content. 
                        Extract and explain the most crucial
                          facts, details, or visual elements
                          presented.  Clearly articulate the 
                          primary message, purpose, or intent 
                          conveyed by the document or image. 
                            Highlight any significant 
                            implications, context, or 
                            insights that are evident. 
                            Ensure accuracy and strictly adhere 
                            to the information contained within the
                              original material, without introducing
                              external knowledge. 
                                Organize the bullet points logically to 
                                provide a structured and easily 
                                understandable overview. 
                                The goal is to offer a thorough yet 
                                concise understanding of the original 
                                content through explained bullet points, 
                  making the core information readily accessible.
        `,
        },
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
      setStatus("error");
    }
  }
  useEffect(() => {
    if (status === "idle") {
      getSummary();
    }
  }, [status]);

  return (
    <section className="summary p-5 text-left bg-[#1b0c81b8] rounded-xl">
      <img src={file.imageURL} alt="Preview Image" />
      <h1 className="text-center font-semibold">Summary</h1>
      <hr />

      {status === "loading" ? (
        <Loader />
      ) : status === "success" ? (
        <div className="w-[100%]">
          {" "}
          <p className="bg-[#0007] p-5 rounded-2xl">{summary}</p>
        </div>
      ) : status === "error" ? (
        <h2 className="text-red-500">Error getting the summary</h2>
      ) : (
        ""
      )}
    </section>
  );
};

export default Summary;
