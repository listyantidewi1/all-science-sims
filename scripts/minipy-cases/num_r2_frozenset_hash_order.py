# frozenset hash (shuffled xor of element hashes) decides where frozensets land in a set
print({frozenset({1}), frozenset({2}), frozenset()})
print({frozenset({1, 2}), frozenset({3}), frozenset({1})})
print(hash(frozenset()), hash(frozenset([1, 2, 3])), hash(frozenset([1])), hash(frozenset([1, 2])) == hash(frozenset([2, 1])))
