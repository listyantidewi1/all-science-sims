# statistics: stdev/pstdev reject inf/nan data with ValueError, variance of data with inf is inf,
# and median sorts nan with the real list.sort
import statistics as st
inf = float("inf")
nan = float("nan")
print(st.variance([inf, 1, 2]), st.pvariance([inf]), st.mean([inf, 1]), st.mean([nan, 1]))
print(st.median([3, 1, nan, 2]), st.median([nan, 1, 0]), st.median([1, nan, 2]))
for f, data in [(st.stdev, [inf, 1]), (st.stdev, [nan, 1]), (st.pstdev, [nan, 1]), (st.pstdev, [1, 2, inf])]:
    try:
        print(f(data))
    except ValueError as e:
        print("ValueError:", e)
