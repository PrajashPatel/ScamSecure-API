import styles from "./ResultCard.module.css";

interface ResultProps {

    risk_score:number;

    risk_level:string;

    verdict:string;

    mlPrediction:number;

    mlProbability:number;

}

const ResultCard = ({
    risk_score,
    risk_level,
    verdict,
    mlPrediction,
    mlProbability
}:ResultProps)=>{

    return(

        <div className={styles.wrapper}>

            <div className={styles.card}>

                <h3>Risk Score</h3>

                <h1>{risk_score}</h1>

                <span
                    className={`${styles.badge}
                    ${
                        risk_level==="safe"
                        ? styles.safe
                        : risk_level==="low"
                        ? styles.low
                        : risk_level==="medium"
                        ? styles.medium
                        : styles.high
                    }`}
                >

                    {risk_level.toUpperCase()}

                </span>

            </div>


            <div className={styles.card}>

                <h3>Machine Learning</h3>

                <h2>

                    {
                        mlPrediction===1
                        ? "Likely Scam"
                        : "Safe"
                    }

                </h2>

                <p>

                    Confidence

                </p>

                <h1>

                    {(mlProbability*100).toFixed(1)}%

                </h1>

                <small>

                    {verdict}

                </small>

            </div>

        </div>

    )

}

export default ResultCard;