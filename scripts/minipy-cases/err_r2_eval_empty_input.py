for teks in ["2 + 3", "", "   ", "\n", "2 +"]:
    try:
        print(eval(teks))
    except SyntaxError as e:
        print("SyntaxError:", e)
ekspresi = input("Ekspresi: ")
try:
    print(eval(ekspresi))
except SyntaxError as e:
    print("SyntaxError:", e)
