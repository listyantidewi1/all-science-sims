# Bab 2.4 Aturan penamaan variabel diperiksa dengan str.isidentifier() dan modul keyword
import keyword
for nama in ["nilai1", "1nilai", "rata rata", "rata_rata", "Nilai", "if", "print", "list", "kelas-X", "for", "match"]:
    sah = nama.isidentifier() and not keyword.iskeyword(nama)
    print(f"{nama:<10} identifier={nama.isidentifier()!s:<5} keyword={keyword.iskeyword(nama)!s:<5} boleh={sah}")
print("Banyak kata kunci Python:", len(keyword.kwlist))
