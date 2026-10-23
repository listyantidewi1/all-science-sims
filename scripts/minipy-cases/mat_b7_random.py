import random
random.seed(2026)   # ditambahkan agar hasil acak dapat diuji ulang
playlist = ["Laskar Pelangi", "Hujan", "Bintang di Surga", "Tentang Rindu"]
random.shuffle(playlist)              # mengacak urutan list DI TEMPAT (tidak mengembalikan apa pun)
print("Playlist acak      :", playlist)
print("Lagu pilihan acak  :", random.choice(playlist))
print("Nomor undian 1-30  :", random.randint(1, 30))
print("Tiga pemenang doorprize:", random.sample(range(1, 31), 3))
