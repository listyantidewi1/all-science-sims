for expr in ["1 // 0", "1 % 0", "1.0 / 0", "2.5 // 0", "5 % 0.0", "0 ** -1", "divmod(3, 0)"]:
    try:
        eval_map = {"1 // 0": lambda: 1 // 0, "1 % 0": lambda: 1 % 0, "1.0 / 0": lambda: 1.0 / 0,
                    "2.5 // 0": lambda: 2.5 // 0, "5 % 0.0": lambda: 5 % 0.0, "0 ** -1": lambda: 0 ** -1,
                    "divmod(3, 0)": lambda: divmod(3, 0)}
        eval_map[expr]()
    except ZeroDivisionError as e:
        print(expr, "->", e)
x = 10 % 0
