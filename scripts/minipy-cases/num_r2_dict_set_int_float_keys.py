# 1, 1.0 and True are the same key: the first key object stays, the last value wins; set ops keep
# the elements of the set they iterate/copy from
e = {}
e[1] = "int"; e[1.0] = "float"; e[True] = "bool"
print(e, {(1, 2): "a", (1.0, 2.0): "b"}, {**{1: "a"}, **{1.0: "b"}}, dict([(1, "a"), (1.0, "b")]))
print({1: "a"} | {1.0: "b"}, {1.0: "a"} | {1: "b"}, dict.fromkeys([1, 1.0, True]), {10 ** 20: 1, 1e20: 2})
x = {1.0: "a"}
x.update({1: "b"}); x.setdefault(True, "c")
print(x, set([1.0, 1, True]), {True, 1, 1.0}, {1.0} | {1}, {1} | {1.0})
print({1, 2} & {2.0, 1.0}, {2.0, 1.0} & {1, 2}, {2.0, 1.0, 3.0} & {1, 2}, {1, 2} & {2.0, 1.0, 3.0}, {1.0, 2.0}.intersection([1, 2]))
print({1, 2} - {1.0}, {1.0, 2} ^ {1, 2.0}, {0} | {False} | {0.0}, {False} | {0}, {-0.0: "a", 0: "b", False: "c"})
