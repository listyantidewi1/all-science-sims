# Bab 3.2 match-case butuh Python 3.10+: program memeriksa versi dengan sys.version_info sebelum memakai match
import sys

versi = sys.version_info
print("Python", f"{versi.major}.{versi.minor}", "| tuple:", versi[:2])
if versi < (3, 10):
    print("Perbarui Python: match-case belum tersedia")
else:
    hari = input("Hari (1-7): ")
    match hari:
        case "6" | "7":
            print("Akhir pekan")
        case "1" | "2" | "3" | "4" | "5":
            print("Hari sekolah")
        case _:
            print("Nomor hari tidak valid")
