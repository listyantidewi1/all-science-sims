# minipy: skip matplotlib.pyplot needs a host module (tested in scripts/test-minipy-api.mjs)
import matplotlib.pyplot as plt
ulangan = ["U-1", "U-2", "U-3", "U-4", "U-5"]
nilai = [70, 75, 85, 80, 95]
plt.plot(ulangan, nilai, marker="o")
plt.title("Perkembangan Nilai Matematika Budi")
plt.xlabel("Ulangan")
plt.ylabel("Nilai")
plt.show()
