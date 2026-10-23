# Bug Hunt Bab 7.4: fungsi rekap mencetak (print) hasil, bukan mengembalikan (return)
KKM = 75

def hitung_rekap(daftar_nilai):
    total = 0
    jumlah_tuntas = 0
    for nilai in daftar_nilai:
        total = total + nilai
        if nilai >= KKM:
            jumlah_tuntas = jumlah_tuntas + 1
    print(jumlah_tuntas, total / len(daftar_nilai))

nilai_kelas = [80, 75, 90, 65, 85]
hasil = hitung_rekap(nilai_kelas)
print("hasil =", hasil)
tuntas, rata_rata = hitung_rekap(nilai_kelas)
print(f"Siswa tuntas: {tuntas} dari {len(nilai_kelas)}")
