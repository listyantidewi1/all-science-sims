# Bab 6.3 Catatan: print bukan return - hasil prosedur cetak_surat_izin adalah None
def cetak_surat_izin(nama_siswa, keterangan):
    print("=" * 30)
    print("SURAT IZIN TIDAK MASUK SEKOLAH")
    print("Nama       :", nama_siswa)
    print("Keterangan :", keterangan)
    print("=" * 30)

x = cetak_surat_izin("Ayu Lestari", "Sakit demam")
print("x berisi:", x, type(x))
print(x is None, x == None, bool(x))
print("Arsip:", x.upper())
