# Bab 5.4 Dictionary harga menu: diskon, urut harga, hapus, dan kunci yang salah ketik
harga_menu = {"Nasi Goreng": 12000, "Mie Ayam": 10000, "Es Teh": 3000}
harga_menu["Bakso"] = 11000
harga_menu["Es Teh"] = 3500
print(harga_menu)
diskon = {menu: harga * 0.9 for menu, harga in harga_menu.items()}
print(diskon)
print(sorted(harga_menu.items(), key=lambda x: x[1]))
print(min(harga_menu, key=harga_menu.get), max(harga_menu.values()), sum(harga_menu.values()))
print(harga_menu.pop("Bakso"), harga_menu.pop("Soto", "tidak ada"), harga_menu.setdefault("Soto", 9000), len(harga_menu))
harga_menu.update({"Mie Ayam": 10500, "Jus": 7000})
del harga_menu["Es Teh"]
print(harga_menu, list(harga_menu.keys()), harga_menu.keys())
for menu in harga_menu:
    print(f"- {menu:<12}Rp {harga_menu[menu]:>6,}")
pesan = input("Pesan apa? ")
print("Harga:", harga_menu[pesan])
