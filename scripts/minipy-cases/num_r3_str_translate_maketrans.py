# str.maketrans builds an ordinal mapping; str.translate maps, replaces or deletes characters
sandi = str.maketrans("aiueo", "41u30")
print("rahasia negara".translate(sandi), sandi)
print("halo, dunia!".translate(str.maketrans("", "", ",!")), str.maketrans("ab", "cd", "x"))
print("abc".translate({97: None, 98: "BB", 99: 100}), str.maketrans({"a": "1", "b": None, 99: "z"}))
print("Budi".translate({}), "kata".translate(str.maketrans({"k": "K"})), "x-y".translate({ord("-"): " - "}))
for bad in [lambda: str.maketrans("ab", "c"), lambda: str.maketrans({"ab": 1}), lambda: str.maketrans(1), lambda: "a".translate({97: 1.5})]:
    try:
        print(bad())
    except (ValueError, TypeError) as e:
        print(type(e).__name__, e)
