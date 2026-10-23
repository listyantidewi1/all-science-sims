# Proyek Kalkulator Nilai Rapor dengan modul statistics
import statistics
def ringkas(nama_mapel, nilai):
    print(nama_mapel, nilai)
    print("  mean  :", statistics.mean(nilai), "| manual:", sum(nilai) / len(nilai))
    print("  median:", statistics.median(nilai))
    print("  modus :", statistics.mode(nilai))
    print("  stdev :", statistics.stdev(nilai), round(statistics.stdev(nilai), 2))
ringkas("Matematika", [80, 75, 90, 65, 85, 75])
ringkas("Fisika", [78, 85, 92, 85, 70, 88])
ringkas("Kimia", [77.5, 82.5, 90.0])
ringkas("Biologi", [0.1, 0.2, 0.3, 0.4])
ringkas("Seni", [88, 92, 88, 92, 70])
ringkas("Olahraga", [100, 100])
ringkas("Bahasa", [75])
