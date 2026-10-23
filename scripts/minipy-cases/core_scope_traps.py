daftar = [1, 2]
def tambah_isi():
    daftar.append(3)
tambah_isi()
print(daftar)
def tambah_plus():
    daftar += [4]
try:
    tambah_plus()
except UnboundLocalError as e:
    print("UnboundLocalError:", e)
def main():
    hasil = []
    for i in range(3):
        hasil.append(i * i)
    return hasil
if __name__ == "__main__":
    print(main(), __name__)
def luas(p: int, l: int = 2) -> int:
    """Menghitung luas persegi panjang."""
    return p * l
print(luas(3), luas.__doc__)
jumlah: int = 10
jumlah += 1
print(jumlah)
