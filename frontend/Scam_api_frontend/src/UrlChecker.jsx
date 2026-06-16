import {useState , useEffect} from 'react'
import axios from 'axios'

const UrlChecker=()=>{
    const [data, setData] = useState('');
    const[url, setUrl] = useState('');
    // const [loading,setLoading] = useState(false);
    // useEffect(()=>{
    //     setLoading(true);
    //     // handleUrl();
    // },)

    const handleUrl = async(event) =>{
        if(event) event.preventDefault();
        //setLoading(true);
        try{
            const backUrl = 'http://localhost:4000/check/url';
            const response = await axios.post(backUrl,{url: url});
            setData(response.data);
            console.log(response.data);
        } catch(error){
            console.error(error);
        }
        
    }
   return (
  <div className="checker-container">
    <h1>Enter URL to Check if its genuine or not</h1>

    <form className="url-checker-form">
      <input
        type="text"
        placeholder="Enter URL here"
        onChange={(event) => setUrl(event.target.value)}
      />

      <button type="submit" onClick={handleUrl}>
        Check URL
      </button>
    </form>

            {
                <ul>
                    <li>URL: {data.input}</li>
                    <li>Score: {data.risk_score}</li>
                    <li>Risk Level: {data.risk_level}</li>
                    <li>Verdict: {data.verdict}</li>
                </ul>
            }
        </div>
    );
}

export default UrlChecker;