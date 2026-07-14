import Header from "../Components/Header/Header";
import styles from "./Documentation.module.css";

const Documentation = () => {
  return (
    <>
      <Header />

      <main className={styles.container}>

        <h1>Documentation</h1>

        <p className={styles.subtitle}>
          AI-Powered URL Security Analysis REST API
        </p>

        {/* Introduction */}

        <section className={styles.card}>
          <h2>Overview</h2>

          <p>
            ScamSecure API is a hybrid phishing URL detection system that
            combines Rule-Based Security Analysis with Machine Learning to
            identify suspicious and phishing URLs. The API analyzes submitted
            URLs, generates a risk score, predicts phishing probability, and
            returns a detailed security report.
          </p>
        </section>

        {/* Architecture */}

        <section className={styles.card}>
          <h2>Project Architecture</h2>

          <pre className={styles.code}>
{`React + TypeScript
        │
        ▼
Express.js REST API
        │
 ┌──────┴─────────┐
 ▼                ▼
Rule Engine   Flask ML API
                  │
                  ▼
        TF-IDF Vectorizer
                  │
                  ▼
      Logistic Regression
                  │
                  ▼
      Combined API Response
                  │
                  ▼
          React Dashboard`}
          </pre>
        </section>

        {/* Workflow */}

        <section className={styles.card}>
          <h2>Project Workflow</h2>

          <ol>
            <li>User enters a URL in the dashboard.</li>

            <li>
              React sends a <strong>POST</strong> request to the Express API.
            </li>

            <li>
              Express performs rule-based security analysis including:
              <ul>
                <li>HTTPS Verification</li>
                <li>Suspicious Keyword Detection</li>
                <li>Suspicious TLD Detection</li>
                <li>Brand Impersonation Detection</li>
                <li>Typosquatting Detection</li>
              </ul>
            </li>

            <li>
              Express forwards the URL to the Flask Machine Learning service.
            </li>

            <li>
              Flask converts the URL using a TF-IDF Vectorizer and predicts the
              result using Logistic Regression.
            </li>

            <li>
              Express combines the rule-based score and ML prediction into the
              final security report.
            </li>

            <li>The API response is returned to the React dashboard.</li>
          </ol>
        </section>

        {/* Machine Learning */}

        <section className={styles.card}>
          <h2>Machine Learning Pipeline</h2>

          <pre className={styles.code}>
{`Dataset

↓

Data Cleaning

↓

Shuffle Dataset

↓

Train / Test Split

↓

TF-IDF Vectorizer

↓

Logistic Regression

↓

Model Evaluation

↓

Save Model (.pkl)

↓

Flask API`}
          </pre>
        </section>

        {/* Endpoints */}

        <section className={styles.card}>
          <h2>REST API Endpoints</h2>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>POST</td>
                <td>/check/url</td>
                <td>Analyze URL using ML and Rule-Based Detection.</td>
              </tr>

              <tr>
                <td>GET</td>
                <td>/scam/trending</td>
                <td>Retrieve all trending scam categories.</td>
              </tr>

              <tr>
                <td>GET</td>
                <td>/scam/trending/:type</td>
                <td>Retrieve a specific scam category.</td>
              </tr>

              <tr>
                <td>POST</td>
                <td>/scam/trending</td>
                <td>Add a new scam category.</td>
              </tr>

              <tr>
                <td>DELETE</td>
                <td>/scam/trending/:type</td>
                <td>Delete a scam category.</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Technology */}

        <section className={styles.card}>
          <h2>Technology Stack</h2>

          <ul>
            <li><strong>Frontend:</strong> React, TypeScript, Axios, CSS Modules</li>

            <li><strong>Backend:</strong> Node.js, Express.js</li>

            <li><strong>Machine Learning:</strong> Python, Flask, Scikit-Learn, Logistic Regression, TF-IDF</li>

            <li><strong>Database:</strong> PostgreSQL</li>
          </ul>
        </section>

        {/* Features */}

        <section className={styles.card}>
          <h2>Key Features</h2>

          <ul>
            <li>Rule-Based URL Analysis</li>
            <li>Machine Learning Prediction</li>
            <li>Risk Score Generation</li>
            <li>Brand Impersonation Detection</li>
            <li>Typosquatting Detection</li>
            <li>Trending Scam Analytics</li>
            <li>REST API Architecture</li>
            <li>PostgreSQL Integration</li>
          </ul>
        </section>

        {/* Design */}

        <section className={styles.card}>
          <h2>Design Decisions</h2>

          <ul>
            <li>
              <strong>Why Logistic Regression?</strong><br />
              Fast, lightweight, and highly effective for URL text
              classification while providing quick predictions.
            </li>

            <li>
              <strong>Why TF-IDF?</strong><br />
              URLs are short strings containing meaningful tokens. TF-IDF
              efficiently converts them into numerical features suitable for
              Logistic Regression.
            </li>

            <li>
              <strong>Why Flask?</strong><br />
              Flask keeps the Machine Learning service independent from the
              Express backend, making the application modular and easier to
              maintain.
            </li>

            <li>
              <strong>Why Express.js?</strong><br />
              Express efficiently handles REST APIs, rule-based analysis,
              database operations, and communication with the ML service.
            </li>
          </ul>
        </section>

      </main>
    </>
  );
};

export default Documentation;