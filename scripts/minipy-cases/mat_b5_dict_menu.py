harga_menu = {"Nasi Goreng": 12000, "Mie Ayam": 10000, "Es Teh": 3000}
print("Harga Mie Ayam:", harga_menu["Mie Ayam"])
harga_menu["Bakso"] = 11000          # menambah pasangan baru
harga_menu["Es Teh"] = 3500          # mengubah nilai
print("Semua menu:", list(harga_menu.keys()))
print("Semua harga:", list(harga_menu.values()))
print("Ada Soto?", "Soto" in harga_menu)
print("Harga Soto:", harga_menu.get("Soto", "tidak tersedia"))   # aman, tidak KeyError
for menu, harga in harga_menu.items():
    print(f"- {menu}: Rp {harga}")
print(harga_menu["Soto"])
