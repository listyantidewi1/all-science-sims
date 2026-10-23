# indices and repeat counts must fit a C ssize_t
tests = [lambda: "ab" * (2 ** 63), lambda: [0] * (10 ** 20), lambda: "abc"[-10 ** 20], lambda: [1, 2][10 ** 20],
         lambda: len(range(10 ** 20)), lambda: range(10)[10 ** 20], lambda: "abc"[10 ** 20:], lambda: (1, 2)[:10 ** 30]]
for t in tests:
    try:
        print(repr(t()))
    except (OverflowError, IndexError, MemoryError) as e:
        print(type(e).__name__, e)
