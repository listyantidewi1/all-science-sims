# fmean() and harmonic_mean() take optional weights (3.11 / 3.10)
import statistics as st
print(st.fmean([1, 2, 3], weights=[3, 2, 1]), st.fmean([1, 2], [-1, 2]), st.fmean([70, 80, 90], [1, 1, 2]))
print(st.harmonic_mean([1, 2], weights=[3, 1]), st.harmonic_mean([40, 60], [1, 3]))
for f, data, w in [(st.fmean, [1, 2], [1, 2, 3]), (st.fmean, [1, 2], [0, 0]), (st.harmonic_mean, [1, 2], [0, 0]),
                   (st.harmonic_mean, [1, 2], [-1, 2]), (st.harmonic_mean, [1, 2], [1])]:
    try:
        print(f(data, w))
    except st.StatisticsError as e:
        print("StatisticsError:", e)
