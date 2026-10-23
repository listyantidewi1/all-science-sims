for _ in range(4):
    tinggi_badan = int(input("Tinggi badan (cm): "))
    kehadiran_latihan = int(input("Persentase kehadiran latihan: "))
    if tinggi_badan >= 180 and kehadiran_latihan >= 80:
        print("Lolos seleksi posisi Center.")
    elif tinggi_badan >= 170 and kehadiran_latihan >= 80:
        print("Lolos seleksi posisi Guard.")
    elif kehadiran_latihan < 80:
        print("Kehadiran latihan belum mencukupi.")
    else:
        print("Maaf, belum memenuhi standar tinggi tim inti.")
