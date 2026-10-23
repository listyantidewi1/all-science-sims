# Exception chaining attributes: __context__, __cause__, __suppress_context__, args, value, code
def show(e):
    print(type(e).__name__, e.args, repr(e.__context__), repr(e.__cause__), e.__suppress_context__)

try:
    try:
        1 / 0
    except ZeroDivisionError:
        int("x")
except ValueError as e:
    show(e)

try:
    try:
        [][1]
    except IndexError as ie:
        raise KeyError("k") from ie
except KeyError as e:
    show(e)
    print(e.__cause__ is e.__context__)

try:
    try:
        {}["a"]
    except KeyError:
        raise TypeError("t") from None
except TypeError as e:
    show(e)

try:
    try:
        raise ValueError("inner")
    finally:
        print("cleanup")
        x = undefined_name
except NameError as e:
    show(e)

saved = None
try:
    raise RuntimeError("first")
except RuntimeError as e:
    saved = e
try:
    try:
        raise OSError("second")
    except OSError:
        raise saved
except RuntimeError as e:
    show(e)
    print(e is saved, repr(e.__context__.__context__))

e = ValueError(1, 2)
e.__cause__ = KeyError("c")
show(e)
e.__suppress_context__ = False
e.args = [3]
show(e)
try:
    e.__context__ = 5
except TypeError as err:
    print(err)
print(StopIteration(7).value, StopIteration().value, SystemExit(3).code, SystemExit().code)
ex = Exception("note me")
ex.add_note("extra")
print(ex.__notes__)

def outer():
    try:
        inner()
    except ArithmeticError as err:
        raise LookupError("wrapped") from err

def inner():
    return 10 % 0

try:
    outer()
except LookupError as err:
    show(err)

try:
    raise ValueError("bad value")
except ValueError:
    raise RuntimeError("while handling") from None if False else KeyError("final")
