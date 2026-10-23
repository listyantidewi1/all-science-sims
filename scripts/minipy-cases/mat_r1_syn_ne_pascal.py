# Bug Hunt: guru yang terbiasa Pascal/Excel menulis <> untuk "tidak sama dengan"
tebakan = ""
while tebakan <> "merdeka123":
    tebakan = input("Masukkan kata sandi Wi-Fi perpustakaan: ")
    if tebakan != "merdeka123":
        print("Kata sandi salah, coba lagi.")
print("Koneksi berhasil! Selamat menjelajah.")
