import express from 'express'
import bodyParser from "body-parser"
import levenshtein from "fast-levenshtein";

import router from './db.js';

const app = express()
const Port = 4000;

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


app.post('/check/url', (req, res) => {
    const url = req.body?.url.trim();
    if (!url){
        return res.status(400).json({error: 'URL is required'});
    } else {
      // console.log(url);
      const parsed = new URL(url); // convert string to URL object (a json contaioning all the components of the URL)
      console.log(parsed);

      let reasons = [];
      let score = 0;
      if (parsed.protocol !== 'https:'){ 
        score += 20;
        reasons.push(`URL contains unsecure protocol, ${parsed.protocol}`);
      }
      const keywords = ["login", "verify", "win", "free", "urgent"];
      if(keywords.some(word => url.toLowerCase().includes(word))) {reasons.push('URL contains suspicious keywords'); 
        score += 15;
      }
      const badTlds = [".xyz", ".top", ".click", ".buzz",".win",".club",".c",".w"];
      if (badTlds.some(tld => url.toLowerCase().endsWith(tld))) {reasons.push('URL contains suspicious domain extension');
        score += 20;
      }

      const brands = [
        "amazon",
        "google",
        "paytm",
        "paypal",
        "microsoft",
        "flipkart",
        "phonepe"
      ];

        function detectTyposquatting(hostname) {
          const host = parsed.hostname.toLowerCase();

          for (const brand of brands) {
            const distance = levenshtein.get(host, brand);

            if (host.includes(brand) && !hostname.endsWith(`${brand}.com`)) {
              return {
                suspicious: true,
                brand,
                reason: `Domain may impersonate ${brand}`
              };
            }

            if (distance <= 2) {
              return { 
                suspicious: true,
                brand,
                reason: `Domain closely resembles ${brand}`
              }; 
            }
          }

          return { };
        }
        const signal = detectTyposquatting(parsed.hostname);

        let risk_level =
            score <= 20 ? "safe" :
            score <= 50 ? "low" :
            score <= 75 ? "medium" :
            "high";

        let verdict =
            score >= 76 ? "Likely Scam" :
            score >= 51 ? "Suspicious" :
            "Probably Safe";

       res.json({
            success: true,
            input:url,
            normalized_url: parsed.href,
            risk_score: score,
            risk_level,
            verdict,
            safe_to_open: score < 50,
            reasons,
            signals: signal
            ,
            recommended_action:
                score <20 ? "This URL appears to be safe."
                :
                score <= 20 ? "This URL is likely safe. still, be cautious and verify the source."
                : score > 75
                ? "You are advised not to open. Avoid entering passwords or payment details."
                : "Proceed carefully. Don't share your important information.",
            checked_at: new Date().toISOString()
        });
      }
    }
)

app.use('/scam', router);

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`)
})