# Bug Hunt LK 2: hasil random.shuffle ditampung ke variabel
import random
random.seed(3)
playlist = ["Laskar Pelangi", "Hujan", "Bintang di Surga", "Tentang Rindu"]
playlist = random.shuffle(playlist)
print("Playlist acak:", playlist)
print("Jumlah lagu:", len(playlist))
