def ambil(data, kunci):
    try:
        return data[kunci]
    except LookupError as e:
        return f"{type(e).__name__}: {e}"
print(ambil([1, 2], 5), ambil({"a": 1}, "b"), ambil("ab", 0))
try:
    int("x")
except ArithmeticError:
    print("tidak")
except ValueError:
    print("ValueError tertangkap duluan")
except Exception:
    print("tidak juga")
print(issubclass(ZeroDivisionError, ArithmeticError), issubclass(KeyError, LookupError), issubclass(bool, int))
def f():
    try:
        return "dari try"
    finally:
        print("finally tetap jalan")
print(f())
def g():
    try:
        1 / 0
    except ZeroDivisionError:
        return "except"
    finally:
        print("finally g")
print(g())
for i in range(3):
    try:
        if i == 1:
            continue
        print("i", i)
    finally:
        print("finally", i)
e = ValueError("a", 2)
print(e, e.args, repr(e), str(ValueError()))
