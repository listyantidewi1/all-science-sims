# Kasir kantin berbasis perintah: match-case dengan pola urutan (list) dari input().split(), termasuk baris kosong
harga = {"bakso": 11000, "mie": 10000, "esteh": 3500}
keranjang = {}
while True:
    match input("> ").lower().split():
        case ["beli", menu] if menu in harga:
            keranjang[menu] = keranjang.get(menu, 0) + 1
        case ["beli", menu, jumlah] if menu in harga and jumlah.isdigit():
            keranjang[menu] = keranjang.get(menu, 0) + int(jumlah)
        case ["beli", *lain]:
            print("  Menu tidak dikenal:", " ".join(lain) or "(kosong)")
        case ["batal", menu] if menu in keranjang:
            del keranjang[menu]
        case ["total" | "bayar"]:
            total = sum(harga[m] * n for m, n in keranjang.items())
            print(f"  {keranjang} -> Rp", f"{total:,}".replace(",", "."))
        case ["selesai"] | ["keluar"]:
            break
        case []:
            print("  (baris kosong)")
        case [perintah, *_]:
            print(f"  Perintah {perintah!r} tidak dikenal")
