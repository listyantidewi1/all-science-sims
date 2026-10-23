def cek_nilai(n):
    assert (
        0 <= n <= 100
    ), f"nilai {n} di luar rentang"
    return n
print(cek_nilai(85))
print(cek_nilai(120))
