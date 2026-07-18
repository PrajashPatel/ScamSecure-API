import os
import psutil
import joblib

process = psutil.Process(os.getpid())

print("Before:", process.memory_info().rss / 1024**2, "MB")

model = joblib.load("model.pkl")
print("After model:", process.memory_info().rss / 1024**2, "MB")

vectorizer = joblib.load("vectorizer.pkl")
print("After vectorizer:", process.memory_info().rss / 1024**2, "MB")