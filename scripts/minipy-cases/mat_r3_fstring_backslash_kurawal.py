# Tebak Output: garis miring terbalik sebelum { di f-string tidak "meloloskan" kurung kurawal; {nilai} tetap diganti
nilai = 85
nama = "Andi"
print(f"Kode: \{nilai} poin")
print(f"\{nama}: {nilai}")
print(f"{{nilai}} -> {nilai}")
print(f"\\{nilai}\\")
print("\{nilai}")
