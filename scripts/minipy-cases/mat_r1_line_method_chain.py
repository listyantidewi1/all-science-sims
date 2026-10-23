# Bug Hunt: pemanggilan method yang dipecah ke beberapa baris
nama = input("Nama: ")
umur = int(input("Umur: "))
sapaan = (nama
          .strip()
          .title())
print("Halo,", sapaan)
info = (umur
        .strip())
print(info)
