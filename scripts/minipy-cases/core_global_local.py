skor = 0
def tambah_skor():
    global skor
    skor += 10
tambah_skor()
tambah_skor()
print(skor)
x = "global"
def lihat():
    print(x)
lihat()
def bayangan():
    x = "lokal"
    print(x)
bayangan()
print(x)
def buat_counter():
    hitung = 0
    def naik():
        nonlocal hitung
        hitung += 1
        return hitung
    return naik
c = buat_counter()
c(); c()
print(c())
def pengali(n):
    return lambda x: x * n
kali3 = pengali(3)
print(kali3(7))
