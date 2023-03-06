import axios from 'axios';
import "./App.css";
import react, { useState } from "react";

function App() {
  const [code,setCode]=useState(" ");
  const [output,setOutput]=useState(" ");

  const handleSubmit = async()=>{
    const payload = {
      language: "cpp",
      code //code: "code"
    };
    try{
      const {data} = await axios.post("http://localhost:5000/run", payload);
    setOutput(data.output);
    // console.log(output);
    } catch(err){
      console.log(err.response);
    }
    
  }
  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <textarea
        rows="20"
        cols="75"
        valus={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
