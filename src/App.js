import axios from "axios";
import "./App.css";
import react, { useState } from "react";

function App() {
  const [code, setCode] = useState(" ");
  const [language, setLanguage] = useState("cpp ");
  const [output, setOutput] = useState(" ");

  const handleSubmit = async () => {
    const payload = {
      language: "cpp",
      code, //code: "code"
    };
    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
      // console.log(output);
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <div className="App">
      <div className="container my-3">
        <h1>Online Code Compiler</h1>
        <div>
          <label>Language: </label>
          <select
            className="form-select my-2"
            aria-label="Default select example"
          >
            <option defaultValue>C++</option>
            <option value="1">Python</option>
            <option value="2">Java</option>
            <option value="3">Javacript</option>
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
