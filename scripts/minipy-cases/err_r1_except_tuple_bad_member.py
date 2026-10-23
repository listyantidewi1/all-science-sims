def coba(kelas):
    try:
        int("x")
    except kelas:
        return "tertangkap"
for kelas in [ValueError, (TypeError, ValueError), (ValueError, "TypeError"), ((ValueError,), TypeError)]:
    try:
        print(coba(kelas))
    except TypeError as e:
        print("TypeError:", e)
