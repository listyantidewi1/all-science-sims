def hitung_mundur(n):
    if n == 0:
        return 10 / n
    return hitung_mundur(n - 1)
try:
    hitung_mundur(2)
except ZeroDivisionError as e:
    print("ditangkap:", e)
hitung_mundur(4)
