import { useState } from "react";
import axios from "axios";

interface UrlCheckResponse {
  input: string;
  risk_score: number;
  risk_level: string;
  verdict: string;
}

const UrlChecker = () => {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<UrlCheckResponse | null>(null);

  const handleUrl = async (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      const response = await axios.post<UrlCheckResponse>(
        "http://localhost:4000/check/url",
        {
          url,
        }
      );

      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="checker-container">
      <h1>Enter URL to Check if it's genuine or not</h1>

      <form className="url-checker-form" onSubmit={handleUrl}>
        <input
          type="text"
          placeholder="Enter URL here"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />

        <button type="submit">Check URL</button>
      </form>

      {data && (
        <ul>
          <li>
            <strong>URL:</strong> {data.input}
          </li>
          <li>
            <strong>Score:</strong> {data.risk_score}
          </li>
          <li>
            <strong>Risk Level:</strong> {data.risk_level}
          </li>
          <li>
            <strong>Verdict:</strong> {data.verdict}
          </li>
        </ul>
      )}
    </div>
  );
};

export default UrlChecker;