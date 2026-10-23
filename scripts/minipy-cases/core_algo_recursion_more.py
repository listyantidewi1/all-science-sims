def hanoi(n, asal, tujuan, bantu, langkah):
    if n == 0:
        return
    hanoi(n - 1, asal, bantu, tujuan, langkah)
    langkah.append((asal, tujuan))
    hanoi(n - 1, bantu, tujuan, asal, langkah)
L = []
hanoi(4, "A", "C", "B", L)
print(len(L), L[:5])
memo = {}
def fib(n):
    if n in memo:
        return memo[n]
    hasil = n if n < 2 else fib(n - 1) + fib(n - 2)
    memo[n] = hasil
    return hasil
print(fib(90), fib(300))
def jumlah_digit(n):
    return n if n < 10 else n % 10 + jumlah_digit(n // 10)
print(jumlah_digit(987654321), jumlah_digit(2 ** 200))
def balik(s):
    return s if len(s) <= 1 else balik(s[1:]) + s[0]
print(balik("pemrograman"))
import math
print(math.factorial(100))
print(len(str(math.factorial(1000))))
