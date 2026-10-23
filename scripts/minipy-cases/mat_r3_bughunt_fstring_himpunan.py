# Bug Hunt: menampilkan notasi himpunan {1, 2, 3} di f-string dengan garis miring terbalik (cara bahasa lain), bukan {{ }}
A = [1, 2, 3]
B = [2, 3, 4]
print("A =", A)
print(f"A = \{A\}")
print(f"A irisan B = {{{', '.join(str(x) for x in A if x in B)}}}")
