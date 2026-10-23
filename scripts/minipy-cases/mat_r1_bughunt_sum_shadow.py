# Bug Hunt: nama variabel menimpa fungsi bawaan sum
nilai = [80, 75, 90, 65, 85]
sum = 0
for n in nilai:
    sum = sum + n
print("Total:", sum)
rata = sum(nilai) / len(nilai)
print("Rata-rata:", rata)
