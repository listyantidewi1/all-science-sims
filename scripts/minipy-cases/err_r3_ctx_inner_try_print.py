try:
    x = [][0]
except IndexError:
    try:
        y = {}["a"]
    except KeyError as e2:
        print("konteks:", repr(e2.__context__))
