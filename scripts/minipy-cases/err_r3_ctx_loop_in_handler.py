try:
    int("x")
except ValueError:
    for i in [2, 0]:
        try:
            print(10 / i)
        except ZeroDivisionError as e:
            print("ctx:", type(e.__context__).__name__)
