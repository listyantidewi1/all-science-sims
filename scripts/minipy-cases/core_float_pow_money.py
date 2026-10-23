modal = 1000000
for bunga in [0.05, 0.1, 0.035]:
    for tahun in [1, 2, 5, 10, 12]:
        print(bunga, tahun, modal * (1 + bunga) ** tahun, round(modal * (1 + bunga) ** tahun, 2))
print(1.1 ** 10, 1.05 ** 12, 0.1 ** 2, 2.5 ** 3, (-2.5) ** 3, 10 ** -2, 2 ** -10, 1.5 ** -2)
print(9 ** 0.5, 2 ** 0.5, 27 ** (1 / 3), 1.0001 ** 10000, 0.5 ** 1074)
print((1 + 1 / 1000) ** 1000, 3 ** 40, 3.0 ** 40)
