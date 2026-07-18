import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix
)

# Load Dataset
df = pd.read_csv("dataset/merged_dataset.csv")

# Features and Labels
X = df["url"]
y = df["label"]

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# TF-IDF Vectorizer
vectorizer = TfidfVectorizer(
    max_features=30000,
    analyzer="char",
    ngram_range=(3, 5)
)

X_train = vectorizer.fit_transform(X_train)
X_test = vectorizer.transform(X_test)

# Logistic Regression Model
model = LogisticRegression(
    max_iter=1000,
    random_state=42
)

# Train
model.fit(X_train, y_train)

# Prediction
y_pred = model.predict(X_test)

# Evaluation
print("Accuracy :", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred))
print("Recall   :", recall_score(y_test, y_pred))
print("F1 Score :", f1_score(y_test, y_pred))

print("\nClassification Report\n")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix\n")
print(confusion_matrix(y_test, y_pred))

# Save Model
joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("\nModel Saved Successfully!")


# Accuracy : 0.9701683163800575
# Precision: 0.984488107549121
# Recall   : 0.9553872821822826
# F1 Score : 0.9697194184646727

# Classification Report

#               precision    recall  f1-score   support

#            0       0.96      0.98      0.97     10962
#            1       0.98      0.96      0.97     10961

#     accuracy                           0.97     21923
#    macro avg       0.97      0.97      0.97     21923
# weighted avg       0.97      0.97      0.97     21923


# Confusion Matrix

# [[10797   165]
#  [  489 10472]]