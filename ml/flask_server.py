from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load model and vectorizer once
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    url = data.get("url")

    if not url:
        return jsonify({
            "error": "URL is required"
        }), 400

    # Convert URL into TF-IDF features
    features = vectorizer.transform([url])

    # Prediction
    prediction = model.predict(features)[0]

    probability = model.predict_proba(features)[0]

    return jsonify({
        "prediction": int(prediction),
        "probability": round(float(max(probability)), 4)
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)