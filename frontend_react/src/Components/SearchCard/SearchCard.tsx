import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

import styles from "./SearchCard.module.css";

interface SearchCardProps {
  onResult: (data: any) => void;
}

const SearchCard = ({ onResult }: SearchCardProps) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!url.trim()) {
      alert("Please enter a URL.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:4000/check/url",
        {
          url,
        }
      );

      onResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to analyze URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.card}>

      <h1>Analyze Suspicious URLs</h1>

      <p>
        Detect phishing websites using Machine Learning
        and intelligent rule-based security analysis.
      </p>

      <div className={styles.searchBox}>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={handleScan}
          disabled={loading}
        >
          <FiSearch />

          {loading ? "Analyzing..." : "Analyze URL"}
        </button>

      </div>

    </section>
  );
};

export default SearchCard;