# Latihan 2.1 Kartu Pelajar Digital: nomor absen harus int; uji "07", spasi, dan "17.0"
for _ in range(3):
    nama = input("Nama: ")
    kelas = input("Kelas: ")
    absen = int(input("Nomor absen: "))
    print(f"Nama: {nama}, Kelas: {kelas}, Absen: {absen}")
    print("Nama: " + nama.strip().title() + ", Kelas: " + kelas.upper() + ", Absen: " + str(absen).zfill(2))
