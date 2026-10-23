def ubah(teks):
    try:
        return int(teks)
    except ValueError as e:
        raise e from e
print(ubah("12"))
print(ubah("dua"))
