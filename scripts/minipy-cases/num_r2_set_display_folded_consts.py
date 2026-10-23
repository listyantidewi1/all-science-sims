# the AST optimizer folds constant expressions first (2 ** 30, 2 * 4, -1, (1, 2 * 3)), so a set display of
# folded constants also becomes a frozenset constant (same iteration order as the r1 literal case)
print({2 ** 30, 2 ** 31, 2 ** 32, 2 ** 33, 1})
print({2 * 4, 2 * 8, 3 * 8, 1, 4 * 8}, {8, 16, 24, 1, 32})
print({10 * 8, 5, 3 * 15, 2 ** 6, 7 - 7})
print({(1, 2 * 3), (0, 0), (2 ** 2, 1)})
x = 8
print({x, 16, 24, 1, 32}, {2 ** 3, 16, 24, 1, 32})
