def faktorial(n):
    if n <= 1:
        return 1
    return n * faktorial(n - 1)
print(faktorial(5), faktorial(25))
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
print([fib(i) for i in range(15)])
def pangkat(b, e):
    return 1 if e == 0 else b * pangkat(b, e - 1)
print(pangkat(2, 64))
def hitung_mundur(n):
    if n == 0:
        print("Meluncur!")
        return
    print(n)
    hitung_mundur(n - 1)
hitung_mundur(3)
def depth(n):
    return 0 if n == 0 else 1 + depth(n - 1)
print(depth(900))
