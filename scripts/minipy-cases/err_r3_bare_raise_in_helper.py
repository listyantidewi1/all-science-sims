def catat():
    print("mencatat error")
    raise
try:
    hasil = 1 / 0
except ZeroDivisionError:
    catat()
