# geometric_mean() accepts zeros (result 0.0) since 3.12; negatives and empty data have distinct errors
import statistics as st
print(st.geometric_mean([0, 1]), st.geometric_mean([0, 0]), st.geometric_mean([2, 8, 0.0]), st.geometric_mean([2, 8]))
for data in [[-1, 2], []]:
    try:
        print(st.geometric_mean(data))
    except st.StatisticsError as e:
        print("StatisticsError:", e)
