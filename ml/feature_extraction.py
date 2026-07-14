import pandas as pd

legit = pd.read_csv("URL dataset.csv")
phish = pd.read_csv("Phishing URLs.csv")

print("Legitimate")
print(legit.head())
print(legit.columns)

print("\nPhishing")
print(phish.head())
print(phish.columns,"\n")

# info about dataset such as Missing values, Data types, Number of rows
print(legit.info())
print(phish.info())