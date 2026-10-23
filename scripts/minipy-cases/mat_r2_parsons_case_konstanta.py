# Parsons/Bug Hunt: kode menu disimpan di konstanta lalu dipakai sebagai pola case (menjadi name capture)
KODE_NASI = 1
KODE_MIE = 2
kode_menu = int(input("Masukkan kode menu (1-2): "))
match kode_menu:
    case KODE_NASI:
        print("Kamu memesan Nasi Goreng.")
    case KODE_MIE:
        print("Kamu memesan Mie Ayam.")
