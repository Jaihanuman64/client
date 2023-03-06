import axios from "axios";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  let pollInterval;

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };
    try {
      setOutput("");
      setStatus(null);
      setJobId(null);
      const { data } = await axios.post("http://localhost:5000/run", payload);
      if (data.jobId) {
        setJobId(data.jobId);
        setStatus("Submitted.");

        // poll here
        pollInterval = setInterval(async () => {
          const { data: statusRes } = await axios.get(
            `http://localhost:5000/status`,
            {
              params: {
                id: data.jobId,
              },
            }
          );
          const { success, job, error } = statusRes;
          console.log(statusRes);
          if (success) {
            const { status: jobStatus, output: jobOutput } = job;
            setStatus(jobStatus);
            if(jobStatus === "pending") return;
            setOutput(jobOutput);
            clearInterval(pollInterval);
          } else {
            console.error(error);
            setOutput(error);
            setStatus("Bad request");
            clearInterval(pollInterval);
          }
        }, 1000);
      } else {
        setOutput("Retry again.");
      }
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      } else {
        setOutput("Please retry submitting.");
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
        <p>{status}</p>
      <p>{jobId ? `Job ID: ${jobId}` : ""}</p>
      <p>{output}</p>
    </div>
    </div>
  );
}

export default App;
