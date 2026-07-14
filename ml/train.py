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


# Accuracy : 0.9697577886238198
# Precision: 0.9855714824594493
# Recall   : 0.9534713985950187
# F1 Score : 0.9692557384651055

# Classification Report

#               precision    recall  f1-score   support

#            0       0.95      0.99      0.97     10962
#            1       0.99      0.95      0.97     10961

#     accuracy                           0.97     21923
#    macro avg       0.97      0.97      0.97     21923
# weighted avg       0.97      0.97      0.97     21923


# Confusion Matrix

# [[10809   153]
#  [  510 10451]]