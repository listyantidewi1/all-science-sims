# Pola yang sering muncul di buku lama: eval(input()) agar angka langsung jadi int/float
angka = eval(input("Masukkan angka: "))
print(angka * 2, type(angka))
pecahan = eval(input("Masukkan angka desimal: "))
print(pecahan + 1, type(pecahan))
