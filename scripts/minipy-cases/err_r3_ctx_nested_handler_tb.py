data = []
try:
    pertama = data[0]
except IndexError:
    try:
        nilai = {}["Budi"]
    except KeyError:
        rata = 10 / len(data)
