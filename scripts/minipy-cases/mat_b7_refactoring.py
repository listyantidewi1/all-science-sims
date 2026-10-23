n=[80,75,90,65,85]
t=0
k=0
for i in range(len(n)):
    t=t+n[i]
    if n[i]>=75:
        k=k+1
print(k, t/len(n))
KKM = 75
def hitung_rekap(daftar_nilai):
    """Mengembalikan (banyak siswa tuntas, rata-rata) dari sebuah list nilai."""
    if len(daftar_nilai) == 0:
        return 0, 0            # kasus tepi: list kosong
    total = 0
    jumlah_tuntas = 0
    for nilai in daftar_nilai:
        total = total + nilai
        if nilai >= KKM:
            jumlah_tuntas = jumlah_tuntas + 1
    return jumlah_tuntas, total / len(daftar_nilai)
nilai_kelas = [80, 75, 90, 65, 85]
tuntas, rata_rata = hitung_rekap(nilai_kelas)
print(f"Siswa tuntas: {tuntas} dari {len(nilai_kelas)}")
print(f"Rata-rata   : {rata_rata:.2f}")
print(hitung_rekap([]))
