def menu():
    try:
        for pilihan in [1, 2, 0, 3]:
            if pilihan == 0:
                print("keluar")
                exit()
            print("pilihan", pilihan)
    finally:
        print("bersih-bersih")
try:
    menu()
except Exception:
    print("tidak tertangkap Exception")
print("tidak dicetak")
