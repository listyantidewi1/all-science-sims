# str.isidentifier() uses XID_Start/XID_Continue: Other_ID_Start symbols (℘ ℮) are identifiers, while
# characters whose NFKC form is not (ͺ, Thai/Lao SARA AM, ⸯ) are excluded
for s in ["℘", "℮", "x℘", "ͺ", "aͺ", "น้ำ", "ำ", "ຳ", "ⸯ", "aᢅ", "ᢅ", "nilai_1", "1nilai", "π", "ℕ", "_", "x²", "x₂"]:
    print(repr(s), s.isidentifier(), s.isalpha(), s.isprintable())
