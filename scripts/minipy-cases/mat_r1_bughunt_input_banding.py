# Bug Hunt: lupa int() pada input sebelum membandingkan
nama = input("Nama: ")
nilai = input("Nilai: ")
print("Nilai", nama, "adalah", nilai)
if nilai >= 75:
    print("Tuntas")
else:
    print("Belum Tuntas")
