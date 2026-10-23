# Bug Hunt LK 2: parameter bawaan berupa list kosong dipakai bersama antar-pemanggilan
def tambah_lagu(judul, playlist=[]):
    playlist.append(judul)
    return playlist

pagi = tambah_lagu("Hujan")
siang = tambah_lagu("Laskar Pelangi")
print("Pagi :", pagi)
print("Siang:", siang)
print(pagi is siang)
malam = tambah_lagu("Tentang Rindu", [])
print("Malam:", malam)

def tambah_lagu_aman(judul, playlist=None):
    if playlist is None:
        playlist = []
    playlist.append(judul)
    return playlist
print(tambah_lagu_aman("A"), tambah_lagu_aman("B"))
