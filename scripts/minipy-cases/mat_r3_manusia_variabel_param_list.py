# Manusia Variabel / Tebak Output: list sebagai argumen - "daftar += [x]" mengubah list pemanggil, "daftar = daftar + [x]" tidak
def tambah_a(daftar, nama):
    daftar += [nama]
    return daftar

def tambah_b(daftar, nama):
    daftar = daftar + [nama]
    return daftar

def tambah_c(teks, huruf):
    teks += huruf
    return teks

kelas = ["Andi"]
hasil_a = tambah_a(kelas, "Budi")
print(kelas, hasil_a, hasil_a is kelas)
hasil_b = tambah_b(kelas, "Cici")
print(kelas, hasil_b, hasil_b is kelas)
nama = "Dina"
print(tambah_c(nama, "!"), nama)
t = (1, 2)
u = t
t += (3,)
print(t, u, t is u)
salinan = kelas[:]
salinan += ["Eko"]
print(kelas, salinan)
