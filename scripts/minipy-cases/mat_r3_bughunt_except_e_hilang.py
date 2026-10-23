# Bug Hunt: variabel e dari "except ... as e" dihapus otomatis setelah blok except selesai
for _ in range(2):
    teks = input("Masukkan nilai: ")
    try:
        nilai = int(teks)
        pesan = "OK"
    except ValueError as e:
        pesan = "Gagal"
        print("Di dalam except:", e)
    print(pesan, "-", teks)
print("Pesan error terakhir:", e)
