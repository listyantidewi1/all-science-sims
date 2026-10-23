# Proyek Aplikasi Presensi Kelas: dictionary status dan persentase kehadiran
def tandai_hadir(status, nama):
    if nama in status:
        status[nama] = "H"
    else:
        print(f"{nama} tidak ada di daftar kelas.")

def rekap_persentase(status):
    if len(status) == 0:
        return 0.0
    hadir = list(status.values()).count("H")
    return hadir / len(status) * 100

kelas = ["Andi", "Budi", "Cici", "Dina", "Eko", "Fajar"]
status = {nama: "A" for nama in kelas}
for nama in input("Yang hadir: ").split():
    tandai_hadir(status, nama)
status.setdefault("Gina", "S")
print(status)
persen = rekap_persentase(status)
print("Kehadiran:", persen, f"{persen:.1f}%", f"{persen / 100:.1%}", round(persen, 2))
print("Kelas kosong:", rekap_persentase({}))
print("Tidak hadir:", [n for n, s in status.items() if s != "H"])
print(status.get("Zaki"), status.get("Zaki", "-"), status.pop("Gina"), len(status))
