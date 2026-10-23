# Aplikasi Rekap Nilai dengan menu (match-case), dict of list, peringkat seri, dan masukan salah (koma desimal, di luar 0-100)
data = {}
def tambah(nama, nilai):
    data.setdefault(nama, []).append(nilai)
def rata(nama):
    n = data.get(nama, [])
    return sum(n) / len(n) if n else 0.0
def peringkat():
    urut = sorted(data, key=lambda k: (-rata(k), k))
    hasil = []
    rank = 0
    prev = None
    for i, nama in enumerate(urut, 1):
        r = rata(nama)
        if r != prev:
            rank = i
            prev = r
        hasil.append((rank, nama, r))
    return hasil
while True:
    print("\n=== MENU ===\n1. Tambah nilai\n2. Lihat peringkat\n3. Hapus siswa\n0. Keluar")
    pilih = input("Pilih: ").strip()
    match pilih:
        case "1":
            nama = input("Nama: ").strip().title()
            try:
                nilai = float(input("Nilai: ").replace(",", "."))
            except ValueError as e:
                print("Nilai tidak valid:", e)
                continue
            if not 0 <= nilai <= 100:
                print(f"Nilai {nilai:g} di luar 0-100")
                continue
            tambah(nama, nilai)
            print(f"OK {nama}: {data[nama]}")
        case "2":
            if not data:
                print("(belum ada data)")
            print(f"{'No':>3} | {'Nama':<10} | {'Rata':>6}")
            print("-" * 25)
            for rank, nama, r in peringkat():
                print(f"{rank:>3} | {nama:<10} | {r:>6.2f}")
        case "3":
            nama = input("Hapus: ").title()
            print("Dihapus:", data.pop(nama, None))
        case "0" | "q" | "Q":
            print("Sampai jumpa!")
            break
        case _:
            print(f"Pilihan {pilih!r} tidak dikenal")
