a, b = map(int, input().split())
print(a + b, a * b)
data = list(map(float, input("Nilai: ").split(",")))
print(data, sum(data) / len(data), max(data))
kata = input().strip().split()
print(len(kata), kata[::-1])
n = int(input())
nilai = [int(input()) for _ in range(n)]
print(nilai, sorted(nilai, reverse=True)[:2])
