log = []
def f(mode):
    for i in range(3):
        try:
            log.append(f"try{i}")
            if mode == "break" and i == 1:
                break
            if mode == "continue" and i == 0:
                continue
            if mode == "return" and i == 1:
                return f"ret{i}"
            if mode == "raise" and i == 1:
                raise ValueError(f"err{i}")
        except ValueError as e:
            log.append(f"except {e}")
            if mode == "raise":
                continue
        else:
            log.append(f"else{i}")
        finally:
            log.append(f"finally{i}")
        log.append(f"after{i}")
    else:
        log.append("for-else")
    return "end"
for mode in ["normal", "break", "continue", "return", "raise"]:
    log.clear()
    hasil = f(mode)
    print(mode, hasil, log)
def g():
    try:
        return "try"
    finally:
        return "finally menang"
print(g())
def h():
    for i in range(3):
        try:
            if i == 1:
                return i
        finally:
            if i == 1:
                print("finally sebelum return", i)
    return None
print(h())
def k():
    while True:
        try:
            raise KeyError("x")
        except KeyError:
            break
        finally:
            print("finally k")
    return "keluar"
print(k())
def nested():
    try:
        try:
            raise ValueError("dalam")
        except TypeError:
            print("tidak")
        finally:
            print("finally dalam")
    except ValueError as e:
        print("luar menangkap", e)
        return "ok"
    finally:
        print("finally luar")
print(nested())
def swallow():
    for i in range(2):
        try:
            raise RuntimeError("hilang")
        finally:
            break
    return "ditelan"
print(swallow())
def exc_var_cleared():
    try:
        1 / 0
    except ZeroDivisionError as err:
        pass
    return "err" in dir()
print(exc_var_cleared())
