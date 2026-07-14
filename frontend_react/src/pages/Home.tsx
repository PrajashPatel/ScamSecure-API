import { useState } from "react";

import Header from "../Components/Header/Header";
import SearchCard from "../Components/SearchCard/SearchCard";
import ResultCard from "../Components/ResultCard/ResultCard";

import AnalysisResult from "../Components/AnalysisResult/AnalysisResult";

const Home = () => {

    interface ScanResult{

    success:boolean;

    input:string;

    normalized_url:string;

    risk_score:number;

    risk_level:string;

    mlPrediction:number;

    mlProbability:number;

    verdict:string;

    safe_to_open:boolean;

    reasons:string[];

    recommended_action:string;

    checked_at:string;

} 
    const [result,setResult]=useState<ScanResult|null>(null);

    return(

        <>

            <Header/>

            <main
                style={{
                    maxWidth:"1200px",
                    margin:"40px auto"
                }}
            >

                <SearchCard
                    onResult={setResult}
                />

                {
                    result && (

                        <ResultCard

                            risk_score={result.risk_score}

                            risk_level={result.risk_level}

                            verdict={result.verdict}

                            mlPrediction={result.mlPrediction}

                            mlProbability={result.mlProbability}

                        />

                    )
                }
                {
                    result && (
                        <AnalysisResult data={result} />
                    )
                }

                {/*
                    ResultCard

                    ReasonList

                    Recommendation

                    UrlDetails

                    will come here
                */}

            </main>

        </>

    )

}

export default Home;