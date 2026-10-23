putaran = 0
while putaran < 3:
    putaran = putaran + 1
    print("Selesai putaran ke-", putaran)
print("Akhirnya selesai! Boleh minum.")
tebakan = ""
while tebakan != "merdeka123":
    tebakan = input("Masukkan kata sandi Wi-Fi perpustakaan: ")
    if tebakan != "merdeka123":
        print("Kata sandi salah, coba lagi.")
print("Koneksi berhasil! Selamat menjelajah.")
