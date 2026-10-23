def tarik(saldo, jumlah):
    if jumlah > saldo:
        raise ValueError(f"Saldo tidak cukup: {saldo} < {jumlah}")
    return saldo - jumlah
print(tarik(100, 30))
print(tarik(100, 300))
