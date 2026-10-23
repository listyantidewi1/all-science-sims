import statistics
nilai = [80, 75, 90, 65, 85, 75]
print("Rata-rata :", statistics.mean(nilai))
print("Median    :", statistics.median(nilai))
print("Modus     :", statistics.mode(nilai))
print("Simpangan baku:", round(statistics.stdev(nilai), 2))
