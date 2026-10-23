data = [("Andi", 85.5), ("Budi", 72.25), ("Citra", 90)]
print(f"{'Nama':<10}{'Nilai':>8}")
print("-" * 18)
for nama, n in data:
    print(f"{nama:<10}{n:>8.2f}")
total = sum(n for _, n in data)
print(f"{'Rata-rata':<10}{total / len(data):>8.2f}")
harga = 150000
print(f"Rp{harga:,}".replace(",", "."))
print(f"Diskon 10%: Rp {harga * 0.9:,.0f}")
