# set.__contains__/remove/discard retry an unhashable set argument as a frozenset; dict lookups do not
kelompok = {frozenset({"a", "b"}), frozenset({1, 2}), 3}
print({1, 2} in kelompok, {2, 1} in kelompok, {9} in kelompok, set() in kelompok, {1, 2} not in kelompok)
kelompok.remove({1, 2})
kelompok.discard({"b", "a"})
kelompok.discard({7})
print(kelompok)
try:
    kelompok.remove({8})
except KeyError as e:
    print("KeyError:", e)
for bad in [lambda: {frozenset({1}): "x"}[{1}], lambda: [1] in kelompok, lambda: {1} in {1: 2}, lambda: kelompok.add({1})]:
    try:
        print(bad())
    except TypeError as e:
        print("TypeError:", e)
print(frozenset({1}) in [{1}], {1} in [frozenset({1})], {1} in (frozenset({1}),))
