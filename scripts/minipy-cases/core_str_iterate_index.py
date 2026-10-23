kata = "Python"
for i in range(len(kata)):
    print(i, kata[i], kata[-1 - i])
print(kata[0:2], kata[2:], kata[:-1], kata[-3:], kata[10:], kata[::-1], kata[1:5:2])
vokal = 0
for c in "pemrograman berbasis teks":
    if c in "aiueo":
        vokal += 1
print("vokal:", vokal)
print("aku" + " " + "kamu", "ha" * 3, len("😀ab"), "😀ab"[0], "😀ab"[1:])
print(kata[5])
print(kata[6])
