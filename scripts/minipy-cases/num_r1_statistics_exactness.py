# statistics computes with exact fractions: no cancellation error, and int data keeps int results where CPython does
import statistics as st
print(st.mean([1e20, 1, -1e20]), st.mean([1, 2, 3]), st.mean([2, 2.0]), st.mean(range(1, 101)), st.mean([True, True, False]))
print(st.median([1, 3]), st.median([1, 2]), st.median([1.0, 3.0]), st.median([1, 2, 3]), type(st.median([2, 4])), type(st.mean([2, 4])))
print(st.stdev([0.1] * 3), st.variance([1e9 + 1, 1e9 + 2, 1e9 + 3]), st.pstdev([1, 2, 3, 4]), st.variance([2, 4]), st.pvariance([1.5, 2.5]))
print(st.mean([0.1, 0.2, 0.3, 0.4]), st.mean([1.1, 2.2, 3.3]), st.fmean([1.1, 2.2, 3.3]), st.mean([10 ** 20, 1]), st.mean([1e308, 1e308]))
print(st.mean({1: "a", 3: "b"}), st.median({5, 1, 3}), st.mean(x * 2 for x in range(4)), st.stdev(range(5)), st.median_low([5, 3]), st.median_high([5, 3]))
for bad in [[], [1]]:
    try:
        print(st.stdev(bad))
    except st.StatisticsError as e:
        print("StatisticsError:", e)
try:
    print(st.mean(["a"]))
except TypeError as e:
    print("TypeError:", e)
