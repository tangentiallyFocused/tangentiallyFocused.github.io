import csv
import json

with open('portfolioData.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    data = [row for row in reader]
    
    
with open('newPortData.json', 'w') as jsonfile:
    json.dump(data, jsonfile)