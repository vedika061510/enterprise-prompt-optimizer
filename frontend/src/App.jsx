import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [file, setFile] = useState(null);
  const [pdfAnswer, setPdfAnswer] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [pdfQuestion, setPdfQuestion] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/compare?query=${encodeURIComponent(query)}`
      );

      setResult(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadHistory = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/history"
      );

      setHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadPDF = async () => {
    try {
      if (!file) {
        alert("Please select a PDF file");
        return;
      }

      const formData = new FormData();

      formData.append("file", file);

      await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      setUploadStatus("PDF uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  const askPDF = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/ask-document?query=${encodeURIComponent(pdfQuestion)}`
      );

      setPdfAnswer(res.data.answer);
    } catch (error) {
      console.error(error);
      alert("Failed to get answer");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Enterprise Prompt Optimizer</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question"
        style={{
          width: "400px",
          padding: "10px",
          marginRight: "10px"
        }}
      />

      <button onClick={handleSubmit}>
        Compare Prompts
      </button>

      <button
        onClick={loadHistory}
        style={{ marginLeft: "10px" }}
      >
        Load History
      </button>

      <hr />

      <h2>PDF Upload & Chat</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <p>
      Selected File: {file?.name}
      </p>

      <button
        onClick={uploadPDF}
        style={{ marginLeft: "10px" }}
      >
        Upload PDF
      </button>
        
        <input
          type="text"
          value={pdfQuestion}
          onChange={(e) => setPdfQuestion(e.target.value)}
          placeholder="Ask about PDF"
          style={{
            width: "400px",
            padding: "10px",
            marginTop: "10px"
          }}
        />

      <button
        onClick={askPDF}
        style={{ marginLeft: "10px" }}
      >
        Ask PDF
      </button>

      {pdfAnswer && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginTop: "20px"
          }}
        >
          <h2>PDF Answer</h2>
          <p>{pdfAnswer}</p>
        </div>
      )}
      <p>{uploadStatus}</p>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px"
            }}
          >
            <h2>Zero Shot</h2>
            <p>{result.zero_shot.response}</p>
            <p>Time: {result.zero_shot.latency}s</p>
            <p>Words: {result.zero_shot.word_count}</p>
          </div>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px"
            }}
          >
            <h2>Role Based</h2>
            <p>{result.role_based.response}</p>
            <p>Time: {result.role_based.latency}s</p>
            <p>Words: {result.role_based.word_count}</p>
          </div>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px"
            }}
          >
            <h2>Few Shot</h2>
            <p>{result.few_shot.response}</p>
            <p>Time: {result.few_shot.latency}s</p>
            <p>Words: {result.few_shot.word_count}</p>
          </div>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px"
            }}
          >
            <h2>Chain of Thought</h2>
            <p>{result.cot.response}</p>
            <p>Time: {result.cot.latency}s</p>
            <p>Words: {result.cot.word_count}</p>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Query History</h2>

          {history.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px"
              }}
            >
              <p><b>Query:</b> {item.query}</p>
              <p><b>Prompt:</b> {item.prompt_type}</p>
              <p><b>Latency:</b> {item.latency}s</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;