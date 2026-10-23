x = 10
x += 5; print(x)
x -= 3; print(x)
x *= 2; print(x)
x /= 4; print(x)
x //= 2; print(x)
x **= 3; print(x)
x %= 5; print(x)
n = 7
n //= 2; n **= 2; n %= 4; print(n)
s = "ab"
s += "cd"; s *= 2; print(s)
lst = [1]
alias = lst
lst += [2, 3]
print(lst, alias, lst is alias)
t = (1,)
t += (2,)
print(t)
b = 6
b &= 3; b |= 8; b ^= 1; b <<= 2; b >>= 1; print(b)
