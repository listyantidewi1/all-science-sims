# A set display with 3+ constant elements is compiled into a frozenset constant (built, then rebuilt from its own
# iteration order when the compiler merges constants); BUILD_SET + SET_UPDATE then copies that table.
# set([...]) and displays with non-constant elements insert element by element instead.
print({5, 13, 21}, set([5, 13, 21]))
print({100, 1, 50, 8, 16, 7}, set([100, 1, 50, 8, 16, 7]))
print({10, 2, 18, 26}, {9, 1, 17}, {0.5, 8, 16})
a = 5
print({a, 13, 21}, {13, 21, 5})
print(list({21, 13, 5}), sorted({21, 13, 5}))
