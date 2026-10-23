def rata(nilai):
    assert len(nilai) > 0, "daftar nilai kosong"
    return sum(nilai) / len(nilai)
print(rata([80, 90]))
try:
    rata([])
except AssertionError as e:
    print("AssertionError:", e)
assert 1 + 1 == 2
x = 5
assert x > 10, f"x terlalu kecil: {x}"
