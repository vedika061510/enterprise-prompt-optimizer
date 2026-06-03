import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Enterprise Prompt Optimizer</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question"
      />

      <button onClick={handleSubmit}>
        Compare Prompts
      </button>

      <button onClick={loadHistory}>
        Load History
      </button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Zero Shot</h2>
          <p>{result.zero_shot.response}</p>

          <h2>Role Based</h2>
          <p>{result.role_based.response}</p>

          <h2>Few Shot</h2>
          <p>{result.few_shot.response}</p>

          <h2>Chain of Thought</h2>
          <p>{result.cot.response}</p>
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