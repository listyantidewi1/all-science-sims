# Latihan gaya OSN Informatika: masukan dibaca cepat dengan sys.stdin.readline (baris masih membawa "\n")
import sys
input = sys.stdin.readline

n = int(input())
nilai = list(map(int, input().split()))
nama = input()
print("Banyak data:", n, "| terbaca:", len(nilai))
print("Jumlah:", sum(nilai), "| maks:", max(nilai), "| min:", min(nilai))
print("Nama mentah:", repr(nama), "| dirapikan:", repr(nama.strip()))
if nama == "Budi":
    print("cocok tanpa strip")
else:
    print("tidak cocok: ada '\\n' di ujung")
sisa = sys.stdin.readline()
print("Setelah data habis:", repr(sisa), sisa == "")
