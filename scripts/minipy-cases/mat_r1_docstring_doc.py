# Investigate (PRIMM): apa isi docstring sebuah fungsi?
def tampilkan_piket(daftar):
    """Menampilkan seluruh petugas piket
    beserta nomor urutnya.

    Jika daftar kosong, tampilkan pesan khusus.
    """
    if len(daftar) == 0:
        print("  (daftar piket kosong)")
    for nomor, nama in enumerate(daftar, start=1):
        print(f"  {nomor}. {nama}")

def tambah_petugas(daftar, nama):
    """Menambahkan petugas di akhir daftar."""
    daftar.append(nama)

print(tampilkan_piket.__doc__)
print(repr(tambah_petugas.__doc__))
piket = ["Andi"]
tambah_petugas(piket, "Eko")
tampilkan_piket(piket)
tampilkan_piket([])
