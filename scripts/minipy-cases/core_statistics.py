import statistics
data = [70, 85, 90, 60, 85, 75]
print(statistics.mean(data), statistics.median(data), statistics.mode(data))
print(statistics.mean([1, 2, 3]), statistics.mean([1, 2, 3, 4]), statistics.mean([0.1, 0.2, 0.3]))
print(statistics.median([3, 1, 2]), statistics.median([1, 2, 3, 4]), statistics.median([1, 3]))
print(statistics.stdev(data), statistics.pstdev(data))
print(statistics.variance(data), statistics.pvariance(data), statistics.variance([1, 3, 5]))
print(statistics.stdev([2, 4, 4, 4, 5, 5, 7, 9]), statistics.pstdev([2, 4, 4, 4, 5, 5, 7, 9]))
print(statistics.mode(["a", "b", "b", "c"]), statistics.multimode([1, 1, 2, 2, 3]), statistics.mode([3, 1, 1, 3]))
print(statistics.fmean([1, 2, 3, 4]), statistics.median_low([1, 2, 3, 4]), statistics.median_high([1, 2, 3, 4]))
print(statistics.mean([85.5, 90.25, 77.75]), statistics.stdev([85.5, 90.25, 77.75]))
print(statistics.harmonic_mean([40, 60]))
try:
    statistics.mean([])
except statistics.StatisticsError as e:
    print("StatisticsError:", e)
statistics.stdev([5])
