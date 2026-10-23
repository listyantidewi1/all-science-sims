def baca(teks):
    try:
        return int(teks)
    except ValueError as e:
        print("gagal:", e)
        raise e
baca("x")
