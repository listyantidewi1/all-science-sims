print(isinstance(5, int), isinstance(5.0, int), isinstance(True, int), isinstance("a", (int, str)))
print(isinstance([], list), isinstance({}, dict), isinstance(None, type(None)), isinstance(3.5, (int, float)))
print(chr(65), chr(97), chr(8364), ord("A"), ord("a"), ord("€"), ord("\n"))
kata = "Halo"
print([ord(c) for c in kata], "".join(chr(ord(c) + 1) for c in kata))
print(any([0, "", 3]), all([1, "a", [0]]), any([]), all([]), any(x > 5 for x in [1, 7]))
print(divmod(100, 7), pow(2, 10), pow(2, -1), pow(3, 4, 5), pow(2.0, 3))
print(callable(len), callable(5), hash(1) == hash(1.0), id([]) != 0)
