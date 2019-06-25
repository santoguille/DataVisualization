import json

offenses = {}

with open("offense_codes.csv", "r") as f:
    aux = f.readlines()
    for l in aux[1:]:
        aux2 = l.replace('"', "").replace("\n", "").split(",")
        offenses[aux2[0]]=aux2[3]

with open("offenses.json", "w") as fout:
    json.dump(offenses, fout)

