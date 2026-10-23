# range objects hold arbitrary-precision ints: indexing past 2**53 must stay exact
r = range(10 ** 20)
print(r[-1], r[-2], r[10 ** 19 + 1])
r2 = range(2 ** 53 + 5)
print(r2[-3], r2[2 ** 53 + 1])
r3 = range(1, 10 ** 18, 7)
print(r3[-1], r3[-2], r3[-100], r3.index(r3[-1]), r3[-3:])
print(range(9007199254740993, 9007199254740999)[1], range(0, 2 ** 64, 2 ** 62)[-1])
