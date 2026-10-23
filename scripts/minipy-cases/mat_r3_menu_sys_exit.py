# Menu kalkulator kelas: keluar dengan sys.exit(pesan) dari dalam fungsi; finally tetap dijalankan
import sys

def keluar():
    print("Menyimpan data...")
    sys.exit("Terima kasih telah menggunakan kalkulator.")

try:
    while True:
        pilihan = input("Menu (1=tambah, 2=kali, 0=keluar): ").strip()
        if pilihan == "0":
            keluar()
        a = int(input("a: "))
        b = int(input("b: "))
        if pilihan == "1":
            print("Hasil:", a + b)
        elif pilihan == "2":
            print("Hasil:", a * b)
        else:
            print("Menu tidak ada")
finally:
    print("Program berakhir.")
print("baris ini tidak pernah dicetak")
