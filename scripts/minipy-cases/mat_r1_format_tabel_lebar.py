# Laporan nilai berbentuk tabel dengan lebar kolom yang diatur lewat variabel
data = [("Andi", 80), ("Budi", 75.5), ("Cici", 90)]
lebar_nama = 10
lebar_nilai = 6
print("{:<{}}|{:>{}}".format("Nama", lebar_nama, "Nilai", lebar_nilai))
for nama, nilai in data:
    print("{:<{}}|{:>{}}".format(nama, lebar_nama, nilai, lebar_nilai))
rata = sum(n for _, n in data) / len(data)
desimal = 2
print("Rata-rata: {:.{}f}".format(rata, desimal))
print("Rata-rata: {0:.{1}f} (dari {2} siswa)".format(rata, desimal, len(data)))
