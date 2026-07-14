import pandas as pd

legit = pd.read_csv("dataset/URL dataset.csv")
phish = pd.read_csv("dataset/Phishing URLs.csv")

print("Legitimate Shape:", legit.shape)
print("Phishing Shape:", phish.shape)

print(legit.head())
print(phish.head())

legit = legit[["url"]]
phish = phish[["url"]]


# if duplicates are present in the dataset, we can drop them
# legit = legit.drop_duplicates(subset="url")
# phish = phish.drop_duplicates(subset="url")

legit = legit.sample(
    n=len(phish),      # 54,805
    random_state=42
)

legit["label"] = 0
phish["label"] = 1

print(legit.shape)
print(phish.shape)

# for checking missing url
# print("Legitimate Missing:")
# print(legit.isnull().sum())

# print("\nPhishing Missing:")
# print(phish.isnull().sum())

dataset = pd.concat([legit, phish], ignore_index=True)
dataset = dataset.sample(
    frac=1,
    random_state=42
).reset_index(drop=True)

print(dataset.head())
print(dataset.shape)
dataset.to_csv(
    "dataset/merged_dataset.csv",
    index=False
)