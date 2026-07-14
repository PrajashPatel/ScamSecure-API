import styles from "./AnalysisResult.module.css";
import type {ScanResponse}  from "../../../types/response";

interface Props {
  data: ScanResponse;
}

const AnalysisResult = ({ data }: Props) => {
  return (
    <div className={styles.card}>

      <h2>Analysis Result</h2>

      {/* General Information */}

      <section className={styles.section}>
        <h3>General Information</h3>

        <p><strong>URL:</strong> {data.input}</p>

        <p><strong>Normalized URL:</strong> {data.normalized_url}</p>

        <p><strong>Checked At:</strong> {new Date(data.checked_at).toLocaleString()}</p>
      </section>

      {/* Security */}

      <section className={styles.section}>
        <h3>Security Analysis</h3>

        <p><strong>Risk Score:</strong> {data.risk_score}</p>

        <p><strong>Risk Level:</strong> {data.risk_level}</p>

        <p><strong>Verdict:</strong> {data.verdict}</p>

        <p>
          <strong>Safe To Open:</strong>{" "}
          {data.safe_to_open ? "Yes" : "No"}
        </p>
      </section>

      {/* Machine Learning */}

      <section className={styles.section}>
        <h3>Machine Learning</h3>

        <p>
          <strong>Prediction:</strong>{" "}
          {data.mlPrediction === 1 ? "Phishing" : "Legitimate"}
        </p>

        <p>
          <strong>Confidence:</strong>{" "}
          {(data.mlProbability * 100).toFixed(2)}%
        </p>
      </section>

      {/* Reasons */}

      <section className={styles.section}>
        <h3>Reasons</h3>

        {
          data.reasons.length === 0 ? (
            <p>No suspicious reasons detected.</p>
          ) : (
            <ul>
              {
                data.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))
              }
            </ul>
          )
        }
      </section>

      {/* Signals */}

      <section className={styles.section}>
        <h3>Signals</h3>

        <p>
          <strong>Suspicious:</strong>{" "}
          {data.signals?.suspicious ? "Yes" : "No"}
        </p>

        <p>
          <strong>Brand:</strong>{" "}
          {data.signals?.brand || "N/A"}
        </p>

        <p>
          <strong>Reason:</strong>{" "}
          {data.signals?.reason || "N/A"}
        </p>
      </section>

      {/* Recommendation */}

      <section className={styles.section}>
        <h3>Recommended Action</h3>

        <p>{data.recommended_action}</p>
      </section>

    </div>
  );
};

export default AnalysisResult;