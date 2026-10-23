times = 3
path = "data.txt"
for nama in ["time", "math", "random"]:
    try:
        eval(nama)
    except NameError as e:
        print(e)
for i in range(times):
    time.sleep(1)
