nama = "Andi"
umur = 17
tinggi = 165.5
lulus = True
print(type(nama))
print(type(umur))
print(type(tinggi))
print(type(lulus))
print(type(None), type([]), type(()), type({}), type(set()), type(range(3)))
print(type(len), type(type))
def f(): pass
print(type(f).__name__, type(umur).__name__)
print(type(umur) == int, type(tinggi) is float)
