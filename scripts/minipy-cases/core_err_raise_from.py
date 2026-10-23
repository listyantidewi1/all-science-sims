try:
    int("x")
except ValueError as e:
    raise RuntimeError("konversi gagal") from e
