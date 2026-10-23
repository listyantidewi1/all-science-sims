# str.title()/capitalize() use the titlecase mapping (ligatures become 'Fi', 'Ffl'), casefold() uses full
# case folding, and swapcase() leaves titlecase letters such as 'ǅ' unchanged
for ch in ["ﬁ", "ﬃ", "ﬆ", "ŉ", "ǅ", "ᾳ", "ᾈ", "և"]:
    print(repr(ch), repr(ch.title()), repr(ch.capitalize()), repr(ch.casefold()), repr(ch.swapcase()), repr((ch + "x").title()))
print("ﬁle ﬂow".title(), "ǅemal".swapcase(), "ﬁ" .casefold() == "fi", "ǅ".istitle(), "ǅ".isupper())
