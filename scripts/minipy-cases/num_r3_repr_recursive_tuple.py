# repr guards recursion per container object: a tuple that (indirectly) contains itself prints as (...),
# a dict as {...}, a list as [...] - whichever container is re-entered
t = ([],)
t[0].append(t)
print(t, t[0])
d = {}
d["k"] = (d, [d])
print(d)
L = [1, 2]
T = (L, L)
L.append(T)
print(T, L)
p = ([], {})
p[1]["self"] = p
p[0].append(p[1])
print(p, repr(p[1]), str(p[0]))
