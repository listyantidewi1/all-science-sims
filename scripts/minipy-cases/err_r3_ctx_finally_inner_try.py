try:
    try:
        1 / 0
    finally:
        try:
            int("x")
        except ValueError as e:
            print(repr(e.__context__))
except ZeroDivisionError:
    print("zde")
