# Bug Hunt: jawaban "Ya " (ada spasi) atau "ya" tidak sama dengan "Ya"
for _ in range(4):
    hadir = input("Apakah kamu hadir hari ini? (Ya/Tidak): ")
    if hadir == "Ya":
        print("Tercatat hadir.")
    else:
        print("Tercatat TIDAK hadir.", repr(hadir), len(hadir))
    if hadir.strip().lower() in ["ya", "y"]:
        print("  (perbaikan) hadir")
