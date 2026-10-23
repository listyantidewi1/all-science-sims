def tampilkan_piket(daftar):
    """Menampilkan seluruh petugas piket beserta nomor urutnya."""
    if len(daftar) == 0:
        print("  (daftar piket kosong)")
    for nomor, nama in enumerate(daftar, start=1):
        print(f"  {nomor}. {nama}")

def tambah_petugas(daftar, nama):
    """Menambahkan petugas di akhir daftar."""
    daftar.append(nama)
    print(f"-> {nama} ditambahkan di akhir.")

def hapus_petugas(daftar, nama):
    """Menghapus petugas tertentu; aman jika nama tidak ada."""
    if nama in daftar:
        daftar.remove(nama)
        print(f"-> {nama} dihapus.")
    else:
        print(f"-> {nama} tidak ditemukan, tidak ada yang dihapus.")

def sisip_petugas(daftar, posisi, nama):
    """Menyisipkan petugas pada posisi tertentu (posisi dihitung mulai 1)."""
    daftar.insert(posisi - 1, nama)
    print(f"-> {nama} disisipkan di posisi {posisi}.")

# ---------- Program utama ----------
piket = ["Andi", "Budi", "Cici", "Dina"]
print("Kondisi awal:")
tampilkan_piket(piket)

tambah_petugas(piket, "Eko")
tampilkan_piket(piket)

hapus_petugas(piket, "Budi")
tampilkan_piket(piket)

sisip_petugas(piket, 2, "Fajar")
tampilkan_piket(piket)

hapus_petugas(piket, "Zaki")      # menguji kasus nama tidak ada
tampilkan_piket([])
