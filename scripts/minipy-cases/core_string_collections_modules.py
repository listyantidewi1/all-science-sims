import string
print(string.ascii_lowercase, string.digits, string.ascii_uppercase[:5])
print(len(string.punctuation), string.capwords("halo dunia python"))
import collections
print(collections.Counter([1, 1, 2]).most_common(1), collections.deque("ab"))
od = collections.OrderedDict()
od["x"] = 1
print(dict(od))
import copy
a = [[1, 2], [3]]
b = copy.deepcopy(a)
c = copy.copy(a)
b[0].append(99)
c[1].append(77)
print(a, b, c)
import sys
print(sys.getrecursionlimit(), type(sys.maxsize).__name__)
