# Kuis Tebak Kata Daerah: random.choice langsung pada dictionary (bug yang sering terjadi)
import random
random.seed(13)
soal = {1: "Rumah adat Jawa Tengah?", 2: "Tarian dari Aceh?", 3: "Senjata khas Jawa Barat?"}
jawaban = {1: "Joglo", 2: "Saman", 3: "Kujang"}
skor = 0
for putaran in range(1, 6):
    pertanyaan = random.choice(soal)
    print(f"Soal {putaran}: {pertanyaan}")
    tebakan = input("Jawaban: ")
    if tebakan.strip().lower() in [j.lower() for j in jawaban.values()]:
        skor += 10
print("Skor akhir:", skor)
