# Parsons Puzzle: kartu return tidak menjorok (sejajar def) sehingga berada di luar fungsi
def status_ketuntasan(nilai):
    if nilai >= 75:
        status = "Tuntas"
    else:
        status = "Belum Tuntas"
return status

print(status_ketuntasan(80))
