# Presensi awal dibuat dengan fromkeys yang dipanggil lewat objek dict ({}.fromkeys) dan lewat kelasnya (dict.fromkeys)
siswa = ["Andi", "Budi", "Cici"]
awal = dict.fromkeys(siswa, "Belum absen")
print(awal)
presensi = {}.fromkeys(siswa, "Hadir")
presensi["Budi"] = "Sakit"
print(presensi, list(presensi.values()).count("Hadir"))
