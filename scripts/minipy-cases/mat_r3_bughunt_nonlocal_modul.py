# Bug Hunt Bab 6.3: siswa mengira "nonlocal" sama dengan "global" dan menulisnya di luar fungsi
skor_tim = 50
nonlocal skor_tim
skor_tim = skor_tim + 10
print(skor_tim)
