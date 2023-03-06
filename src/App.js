import axios from "axios";
import "./App.css";
import react, { useState } from "react";

function App() {
  const [code, setCode] = useState(" ");
  const [language, setLanguage] = useState("cpp ");
  const [output, setOutput] = useState(" ");

  const handleSubmit = async () => {
    const payload = {
      language,
      code, //code: "code"
    };
    try {
      setOutput("");
      const { data } = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
    } catch ({ response }) {
      if(response){
        const errMsg = response.data.err.stderr;
      setOutput(errMsg);
      } else{
        setOutput("Error connecting to server");
      }
      
    }
  };
  return (
    <div className="App">
      <div className="container my-3">
        <h1>Online Code Compiler</h1>
        <div>
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
          {/* <select>
        <option>C++</option>
        <option>Python</option>
      </select> */}
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label my-2"
          >
            Code Editor
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="20"
            cols="75"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></textarea>
        </div>
        {/* <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea> */}
        <br />
        <button
          type="button"
          className="btn btn-primary "
          onClick={handleSubmit}
        >
          Submit
        </button>
        {/* <button onClick={handleSubmit}>Submit</button> */}
        <p>{output}</p>
      </div>
    </div>
  );
}

export default App;
