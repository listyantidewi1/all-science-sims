# Kalkulator Nilai Rapor: kuartil (Q1, Q2, Q3) nilai ulangan dengan statistics.quantiles
import statistics
nilai = [int(x) for x in input("Nilai ulangan: ").split()]
q1, q2, q3 = statistics.quantiles(nilai, n=4)
print("Data terurut:", sorted(nilai))
print("Q1 =", q1, "| Q2 =", q2, "| Q3 =", q3, "| median =", statistics.median(nilai))
print("Jangkauan antarkuartil:", q3 - q1)
print("Kuartil (inclusive):", statistics.quantiles(nilai, n=4, method="inclusive"))
