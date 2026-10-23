def turun(n):
    return turun(n - 1)
try:
    turun(10)
except RecursionError as e:
    print("RecursionError:", e)
def aman(n):
    if n == 0:
        return 0
    return 1 + aman(n - 1)
print(aman(500))
turun(3)
