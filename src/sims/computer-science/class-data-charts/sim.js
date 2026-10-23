// Charts from Class Data (PP 03 section 7.3, matplotlib enrichment, and the "Kalkulator Nilai Rapor" / "Grafik
// Perkembangan Nilai" project ideas of section 8.6): run short Python programs that use lists, statistics and
// matplotlib.pyplot, and watch the chart being built line by line. The program runs in minipy (src/lib/minipy.js) with a
// host `matplotlib.pyplot` module (the PLT-CORE block below) that follows matplotlib 3.11's defaults: colour cycle,
// categorical axes, autoscaling with 5% margins, tick positions and labels, legend placement, plt.show() opening and
// closing a window, and matplotlib's error messages (adapted from matplotlib, Copyright (c) 2012- Matplotlib Development
// Team, Matplotlib License; see THIRD-PARTY-NOTICES.md). The stage shows the figure window (one tab per window shown),
// the editable code with the running line, the console, and a data panel with the mean, median and mode of every
// data set on the chart (optionally drawn on the chart as an overlay of the simulation).
import { button, select, slider, toggle } from '../../../lib/controls.js';
import { createCanvas } from '../../../lib/canvas.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';
import { compile, createRun, pyRepr } from '../../../lib/minipy.js';
import { codePanel, consolePanel } from '../../../lib/codepanel.js';

// PRESETS-START
// Preset programs. The Indonesian versions follow PP 03 (section 7.2 statistics / Counter, 7.3 matplotlib, the
// "Kalkulator Nilai Rapor" and "Grafik Perkembangan Nilai" project ideas of section 8.6) with the materials'
// identifiers; the English versions are the same programs with English names. Every program prints the same text in
// python3 3.13 with matplotlib as in this page. `inputs` = default values for input(), one per line.
const P = String.raw;
const PRESETS = [
  {
    key: 'line',
    name: { en: "Budi's maths scores (line)", id: 'Nilai Matematika Budi (garis)' },
    tip: {
      en: 'The tests are text, so matplotlib places them at positions 0, 1, 2, … in the order given. Predict first: does the y axis start at 0? (No: it starts a little below the lowest score.) Then modify: try marker="s", color="red" or linestyle="--".',
      id: 'Nama ulangan berupa teks, jadi matplotlib menaruhnya di posisi 0, 1, 2, … sesuai urutan. Tebak dulu: apakah sumbu y mulai dari 0? (Tidak: mulai sedikit di bawah nilai terendah.) Lalu ubah: coba marker="s", color="red", atau linestyle="--".',
    },
    code: {
      en: P`import matplotlib.pyplot as plt

tests = ["T-1", "T-2", "T-3", "T-4", "T-5"]
scores = [70, 75, 85, 80, 95]

plt.plot(tests, scores, marker="o")
plt.title("Budi's Maths Scores")
plt.xlabel("Test")
plt.ylabel("Score")

print("Highest score:", max(scores))
print("Lowest score :", min(scores))
print("Rise T-1 to T-5:", scores[-1] - scores[0])
plt.show()
`,
      id: P`import matplotlib.pyplot as plt

ulangan = ["U-1", "U-2", "U-3", "U-4", "U-5"]
nilai = [70, 75, 85, 80, 95]

plt.plot(ulangan, nilai, marker="o")
plt.title("Perkembangan Nilai Matematika Budi")
plt.xlabel("Ulangan")
plt.ylabel("Nilai")

print("Nilai tertinggi:", max(nilai))
print("Nilai terendah :", min(nilai))
print("Kenaikan U-1 ke U-5:", nilai[-1] - nilai[0])
plt.show()
`,
    },
  },
  {
    key: 'bar',
    name: { en: 'Club members (bar)', id: 'Peminat ekskul (batang)' },
    tip: {
      en: 'Bars always start at 0, so the heights can be compared fairly. max() finds the tallest bar and .index() finds where it is. Modify: add color="orange", or sort the clubs from most to fewest members.',
      id: 'Batang selalu mulai dari 0, jadi tingginya adil untuk dibandingkan. max() mencari batang tertinggi dan .index() mencari posisinya. Ubah: tambahkan color="orange", atau urutkan ekskul dari peminat terbanyak.',
    },
    code: {
      en: P`import matplotlib.pyplot as plt

clubs = ["Scouts", "Red Cross",
         "Futsal", "Basketball"]
members = [45, 20, 60, 35]

plt.bar(clubs, members)
plt.title("Club Members in Grade 10")
plt.ylabel("Students")

most = max(members)
position = members.index(most)
print("Total members:", sum(members))
print("Most popular :", clubs[position], most)
plt.show()
`,
      id: P`import matplotlib.pyplot as plt

ekskul = ["Pramuka", "PMR", "Futsal", "Basket"]
peminat = [45, 20, 60, 35]

plt.bar(ekskul, peminat)
plt.title("Jumlah Peminat Ekskul Kelas X")
plt.ylabel("Banyak siswa")

terbanyak = max(peminat)
posisi = peminat.index(terbanyak)
print("Total peminat  :", sum(peminat))
print("Paling diminati:", ekskul[posisi], terbanyak)
plt.show()
`,
    },
  },
  {
    key: 'compare',
    name: { en: 'Two students compared (legend)', id: 'Dua siswa dibandingkan (legenda)' },
    tip: {
      en: 'Two plot() calls draw two lines on one chart. The first line gets colour C0 (blue), the next C1 (orange), because each plot() without a colour takes the next colour of the cycle. "s--" is a format string: square markers and a dashed line. label= names each line and legend() shows the names. The loop compares the lists test by test.',
      id: 'Dua pemanggilan plot() menggambar dua garis pada satu grafik. Garis pertama berwarna C0 (biru), berikutnya C1 (oranye), karena setiap plot() tanpa warna mengambil warna berikutnya dari siklus. "s--" adalah string format: penanda persegi dan garis putus-putus. label= memberi nama tiap garis dan legend() menampilkannya. Perulangan membandingkan kedua list per ulangan.',
    },
    code: {
      en: P`import matplotlib.pyplot as plt

tests = ["T-1", "T-2", "T-3", "T-4", "T-5"]
budi = [70, 75, 85, 80, 95]
ani = [82, 80, 78, 80, 90]

plt.plot(tests, budi, marker="o", label="Budi")
plt.plot(tests, ani, "s--", label="Ani")
plt.title("Maths Scores: Budi and Ani")
plt.xlabel("Test")
plt.ylabel("Score")
plt.ylim(60, 100)
plt.grid(True)
plt.legend()

for i in range(len(tests)):
    if budi[i] > ani[i]:
        print(f"{tests[i]}: Budi is higher")
    elif ani[i] > budi[i]:
        print(f"{tests[i]}: Ani is higher")
    else:
        print(f"{tests[i]}: the same")
plt.show()
`,
      id: P`import matplotlib.pyplot as plt

ulangan = ["U-1", "U-2", "U-3", "U-4", "U-5"]
budi = [70, 75, 85, 80, 95]
ani = [82, 80, 78, 80, 90]

plt.plot(ulangan, budi, marker="o", label="Budi")
plt.plot(ulangan, ani, "s--", label="Ani")
plt.title("Nilai Matematika Budi dan Ani")
plt.xlabel("Ulangan")
plt.ylabel("Nilai")
plt.ylim(60, 100)
plt.grid(True)
plt.legend()

for i in range(len(ulangan)):
    if budi[i] > ani[i]:
        print(f"{ulangan[i]}: Budi lebih tinggi")
    elif ani[i] > budi[i]:
        print(f"{ulangan[i]}: Ani lebih tinggi")
    else:
        print(f"{ulangan[i]}: sama")
plt.show()
`,
    },
  },
  {
    key: 'mean',
    name: { en: 'Class average line (axhline)', id: 'Garis rata-rata kelas (axhline)' },
    tip: {
      en: 'statistics.mean, median and mode summarise the class. One low score (45) pulls the mean down to 78.75, while the median stays at 83.0. axhline() draws a horizontal line across the whole chart: here the mean and the pass mark (KKM) 75. Turn on "Show mean and median" to compare.',
      id: 'statistics.mean, median, dan mode merangkum nilai kelas. Satu nilai rendah (45) menarik rata-rata turun ke 78.75, sedangkan median tetap 83.0. axhline() menggambar garis mendatar selebar grafik: di sini rata-rata dan KKM 75. Nyalakan "Tampilkan rata-rata dan median" untuk membandingkan.',
    },
    code: {
      en: P`import matplotlib.pyplot as plt
import statistics

names = ["Andi", "Budi", "Citra", "Dewi",
         "Eka", "Fajar", "Gita", "Hana"]
scores = [78, 85, 92, 45, 88, 76, 85, 81]

mean = statistics.mean(scores)
print("Mean  :", mean)
print("Median:", statistics.median(scores))
print("Mode  :", statistics.mode(scores))

passed = 0
for s in scores:
    if s >= 75:
        passed += 1
print("Passed:", passed, "of", len(scores))

plt.bar(names, scores, color="skyblue")
plt.axhline(mean, color="red", label="Mean")
plt.axhline(75, color="green", linestyle="--",
            label="Pass mark 75")
plt.title("Test Scores, Class X-1")
plt.ylabel("Score")
plt.legend()
plt.show()
`,
      id: P`import matplotlib.pyplot as plt
import statistics

nama = ["Andi", "Budi", "Citra", "Dewi",
        "Eka", "Fajar", "Gita", "Hana"]
nilai = [78, 85, 92, 45, 88, 76, 85, 81]

rata = statistics.mean(nilai)
print("Rata-rata:", rata)
print("Median   :", statistics.median(nilai))
print("Modus    :", statistics.mode(nilai))

tuntas = 0
for n in nilai:
    if n >= 75:
        tuntas += 1
print("Tuntas   :", tuntas, "dari", len(nilai))

plt.bar(nama, nilai, color="skyblue")
plt.axhline(rata, color="red", label="Rata-rata")
plt.axhline(75, color="green", linestyle="--",
            label="KKM 75")
plt.title("Nilai Ulangan Kelas X-1")
plt.ylabel("Nilai")
plt.legend()
plt.show()
`,
    },
  },
  {
    key: 'scatter',
    name: { en: 'Study hours vs score (scatter)', id: 'Jam belajar vs nilai (sebar)' },
    tip: {
      en: 'scatter() draws one dot per student: x = hours of study, y = score. The dots rise to the right, and the correlation (close to 1) says how close they are to a straight line. linear_regression gives the slope and intercept of the trend line, which the loop builds with the accumulator pattern. Both the dots and the line are blue C0 unless a colour is given: bars and dots use their own colour cycle.',
      id: 'scatter() menggambar satu titik per siswa: x = jam belajar, y = nilai. Titik-titik naik ke kanan, dan korelasi (mendekati 1) menunjukkan seberapa dekat titik-titik itu dengan garis lurus. linear_regression memberi kemiringan dan titik potong garis tren, yang disusun perulangan dengan pola akumulator. Titik dan garis sama-sama biru C0 jika warna tidak diberikan: batang dan titik memakai siklus warnanya sendiri.',
    },
    code: {
      en: P`import matplotlib.pyplot as plt
from statistics import correlation, linear_regression

hours = [1, 2, 2, 3, 4, 4, 5, 6, 7, 8]
scores = [55, 60, 68, 65, 72, 78, 80, 85, 88, 94]

r = correlation(hours, scores)
slope, intercept = linear_regression(hours, scores)
print("Correlation:", round(r, 2))
print("Points per extra hour:", round(slope, 1))

trend = []
for h in hours:
    trend.append(slope * h + intercept)

plt.scatter(hours, scores, label="Students")
plt.plot(hours, trend, color="orange", label="Trend")
plt.title("Study Hours vs Score")
plt.xlabel("Study hours per week")
plt.ylabel("Score")
plt.grid(True)
plt.legend()
plt.show()
`,
      id: P`import matplotlib.pyplot as plt
from statistics import correlation, linear_regression

jam = [1, 2, 2, 3, 4, 4, 5, 6, 7, 8]
nilai = [55, 60, 68, 65, 72, 78, 80, 85, 88, 94]

r = correlation(jam, nilai)
miring, potong = linear_regression(jam, nilai)
print("Korelasi:", round(r, 2))
print("Kenaikan nilai per jam:", round(miring, 1))

tren = []
for j in jam:
    tren.append(miring * j + potong)

plt.scatter(jam, nilai, label="Siswa")
plt.plot(jam, tren, color="orange", label="Tren")
plt.title("Jam Belajar vs Nilai")
plt.xlabel("Jam belajar per minggu")
plt.ylabel("Nilai")
plt.grid(True)
plt.legend()
plt.show()
`,
    },
  },
  {
    key: 'report',
    name: { en: 'Report card calculator (barh)', id: 'Kalkulator Nilai Rapor (barh)' },
    tip: {
      en: 'The "Kalkulator Nilai Rapor" project idea: a function for the average, a function for the grade (A ≥ 90, B ≥ 80, C ≥ 70, else D), and a horizontal bar chart. barh() puts the first subject at the bottom. axvline() marks the pass mark.',
      id: 'Ide proyek "Kalkulator Nilai Rapor": fungsi untuk rata-rata, fungsi untuk predikat (A ≥ 90, B ≥ 80, C ≥ 70, selain itu D), dan grafik batang mendatar. barh() menaruh mapel pertama di bawah. axvline() menandai KKM.',
    },
    code: {
      en: P`import matplotlib.pyplot as plt
import statistics

subjects = ["Maths", "Indonesian", "English",
            "Physics", "Informatics"]
scores = [82, 90, 74, 68, 95]

def average(values):
    return statistics.mean(values)

def grade(avg):
    if avg >= 90:
        return "A"
    elif avg >= 80:
        return "B"
    elif avg >= 70:
        return "C"
    else:
        return "D"

avg = average(scores)
print(f"Report average: {avg:.2f}")
print("Grade:", grade(avg))
for i in range(len(subjects)):
    if scores[i] < 75:
        print("Needs remedial:", subjects[i])

plt.barh(subjects, scores, color="seagreen")
plt.axvline(75, color="red", linestyle="--",
            label="Pass mark 75")
plt.title("Report Card Calculator")
plt.xlabel("Score")
plt.xlim(0, 100)
plt.legend()
plt.show()
`,
      id: P`import matplotlib.pyplot as plt
import statistics

mapel = ["Matematika", "B. Indonesia",
         "B. Inggris", "Fisika", "Informatika"]
nilai = [82, 90, 74, 68, 95]

def hitung_rata(daftar):
    return statistics.mean(daftar)

def predikat(rata):
    if rata >= 90:
        return "A"
    elif rata >= 80:
        return "B"
    elif rata >= 70:
        return "C"
    else:
        return "D"

rata = hitung_rata(nilai)
print(f"Rata-rata rapor: {rata:.2f}")
print("Predikat:", predikat(rata))
for i in range(len(mapel)):
    if nilai[i] < 75:
        print("Perlu remedial:", mapel[i])

plt.barh(mapel, nilai, color="seagreen")
plt.axvline(75, color="red", linestyle="--",
            label="KKM 75")
plt.title("Kalkulator Nilai Rapor")
plt.xlabel("Nilai")
plt.xlim(0, 100)
plt.legend()
plt.show()
`,
    },
  },
  {
    key: 'counter',
    name: { en: 'Survey with Counter (bar)', id: 'Survei dengan Counter (batang)' },
    tip: {
      en: 'Raw survey answers are counted with Counter. most_common() lists the clubs from most to fewest, and the loop splits the pairs into two lists for bar(). A list of colours gives each bar its own colour. The mode of the answers is the most popular club.',
      id: 'Jawaban survei mentah dihitung dengan Counter. most_common() mengurutkan ekskul dari peminat terbanyak, lalu perulangan memisahkan pasangan menjadi dua list untuk bar(). List warna memberi setiap batang warnanya sendiri. Modus jawaban adalah ekskul terfavorit.',
    },
    code: {
      en: P`import matplotlib.pyplot as plt
from collections import Counter
import statistics

answers = ["Scouts", "Futsal", "Scouts",
           "Red Cross", "Futsal", "Scouts",
           "Basketball", "Futsal", "Scouts",
           "Red Cross", "Basketball", "Scouts"]

count = Counter(answers)
print("Members:", dict(count))
print("Top    :", count.most_common(1))
print("Mode   :", statistics.mode(answers))

clubs = []
totals = []
for club, number in count.most_common():
    clubs.append(club)
    totals.append(number)

colours = ["gold", "tomato", "skyblue", "plum"]
plt.bar(clubs, totals, color=colours)
plt.title("Club Survey (12 students)")
plt.ylabel("Students")
plt.show()
`,
      id: P`import matplotlib.pyplot as plt
from collections import Counter
import statistics

pilihan = ["Pramuka", "Futsal", "Pramuka", "PMR",
           "Futsal", "Pramuka", "Basket", "Futsal",
           "Pramuka", "PMR", "Basket", "Pramuka"]

hitung = Counter(pilihan)
print("Peminat  :", dict(hitung))
print("Terbanyak:", hitung.most_common(1))
print("Modus    :", statistics.mode(pilihan))

ekskul = []
jumlah = []
for nama, banyak in hitung.most_common():
    ekskul.append(nama)
    jumlah.append(banyak)

warna = ["gold", "tomato", "skyblue", "plum"]
plt.bar(ekskul, jumlah, color=warna)
plt.title("Hasil Survei Ekskul (12 siswa)")
plt.ylabel("Banyak siswa")
plt.show()
`,
    },
  },
  {
    key: 'twocharts',
    name: { en: 'Two charts, two show()', id: 'Dua grafik, dua show()' },
    tip: {
      en: 'A complete matplotlib example: a line chart and a bar chart in one program. Each plt.show() opens a window with the chart drawn so far and then closes it, so the bar chart starts on a fresh Figure 1. Step through and watch the figure tabs. Remove the first plt.show() and predict what happens.',
      id: 'Contoh matplotlib lengkap: grafik garis dan grafik batang dalam satu program. Setiap plt.show() membuka jendela berisi grafik yang sudah digambar lalu menutupnya, sehingga grafik batang dimulai pada Figure 1 yang baru. Jalankan langkah demi langkah dan amati tab gambar. Hapus plt.show() yang pertama lalu tebak apa yang terjadi.',
    },
    code: {
      en: P`import matplotlib.pyplot as plt

tests = ["T-1", "T-2", "T-3", "T-4", "T-5"]
scores = [70, 75, 85, 80, 95]
plt.plot(tests, scores, marker="o")
plt.title("Budi's Maths Scores")
plt.xlabel("Test")
plt.ylabel("Score")
plt.show()

clubs = ["Scouts", "Red Cross",
         "Futsal", "Basketball"]
members = [45, 20, 60, 35]
plt.bar(clubs, members)
plt.title("Club Members in Grade 10")
plt.show()
`,
      id: P`import matplotlib.pyplot as plt

ulangan = ["U-1", "U-2", "U-3", "U-4", "U-5"]
nilai = [70, 75, 85, 80, 95]
plt.plot(ulangan, nilai, marker="o")
plt.title("Perkembangan Nilai Matematika Budi")
plt.xlabel("Ulangan")
plt.ylabel("Nilai")
plt.show()

ekskul = ["Pramuka", "PMR", "Futsal", "Basket"]
peminat = [45, 20, 60, 35]
plt.bar(ekskul, peminat)
plt.title("Jumlah Peminat Ekskul Kelas X")
plt.show()
`,
    },
  },
  {
    key: 'input',
    name: { en: 'Your own scores (input)', id: 'Nilai kamu sendiri (input)' },
    tip: {
      en: 'The "Grafik Perkembangan Nilai" project idea with three functions. input() reads the scores from the "Values for input()" box, one per line; type your own five scores and run again. "go-" means green, circle markers, solid line. plt.xticks() puts a tick at every test number (try removing it).',
      id: 'Ide proyek "Grafik Perkembangan Nilai" dengan tiga fungsi. input() membaca nilai dari kotak "Nilai untuk input()", satu per baris; ketik lima nilaimu sendiri lalu jalankan lagi. "go-" berarti hijau, penanda lingkaran, garis utuh. plt.xticks() memberi tanda di setiap nomor ulangan (coba hapus).',
    },
    inputs: '68\n74\n71\n80\n86',
    code: {
      en: P`import matplotlib.pyplot as plt

def read_scores(count):
    values = []
    for i in range(count):
        s = int(input(f"Score {i + 1}: "))
        values.append(s)
    return values

def count_rises(values):
    rises = 0
    for i in range(1, len(values)):
        if values[i] > values[i - 1]:
            rises += 1
    return rises

def make_chart(values):
    number = list(range(1, len(values) + 1))
    plt.plot(number, values, "go-")
    plt.title("My Score Progress")
    plt.xlabel("Test number")
    plt.ylabel("Score")
    plt.xticks(number)
    plt.grid(True)
    plt.show()

scores = read_scores(5)
rises = count_rises(scores)
chances = len(scores) - 1
print("Went up", rises, "times out of", chances)
make_chart(scores)
`,
      id: P`import matplotlib.pyplot as plt

def input_nilai(banyak):
    daftar = []
    for i in range(banyak):
        n = int(input(f"Nilai ke-{i + 1}: "))
        daftar.append(n)
    return daftar

def hitung_tren(daftar):
    naik = 0
    for i in range(1, len(daftar)):
        if daftar[i] > daftar[i - 1]:
            naik += 1
    return naik

def buat_grafik(daftar):
    ke = list(range(1, len(daftar) + 1))
    plt.plot(ke, daftar, "go-")
    plt.title("Grafik Perkembangan Nilai")
    plt.xlabel("Ulangan ke-")
    plt.ylabel("Nilai")
    plt.xticks(ke)
    plt.grid(True)
    plt.show()

nilai = input_nilai(5)
naik = hitung_tren(nilai)
kesempatan = len(nilai) - 1
print("Nilai naik", naik, "kali dari", kesempatan)
buat_grafik(nilai)
`,
    },
  },
  {
    key: 'bug',
    name: { en: 'Find the bug: lists of different lengths', id: 'Cari bug: panjang list berbeda' },
    tip: {
      en: 'A runtime error. Read the last line of the traceback: the shapes (6,) and (5,) are the lengths of the two lists. plot() needs one y value for every x value. Add the missing score for Saturday and run again. (Real Python also prints a few lines from inside the matplotlib files.)',
      id: 'Galat saat program berjalan (runtime error). Baca baris terakhir traceback: bentuk (6,) dan (5,) adalah panjang kedua list. plot() memerlukan satu nilai y untuk setiap nilai x. Tambahkan nilai hari Sabtu yang hilang lalu jalankan lagi. (Python asli juga mencetak beberapa baris dari dalam berkas matplotlib.)',
    },
    code: {
      en: P`import matplotlib.pyplot as plt

# Goal: Sinta's daily scores, Monday to Saturday.
# The program stops with a ValueError. Read the
# last line of the error message, then fix it!
days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
scores = [72, 80, 78, 85, 90]

print("Number of days  :", len(days))
print("Number of scores:", len(scores))

plt.plot(days, scores, marker="o")
plt.title("Sinta's Daily Scores")
plt.ylabel("Score")
plt.show()
`,
      id: P`import matplotlib.pyplot as plt

# Tujuan: grafik nilai harian Sinta, Senin-Sabtu.
# Program berhenti dengan ValueError. Baca baris
# terakhir pesan galat, lalu perbaiki!
hari = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
nilai = [72, 80, 78, 85, 90]

print("Banyak hari :", len(hari))
print("Banyak nilai:", len(nilai))

plt.plot(hari, nilai, marker="o")
plt.title("Nilai Harian Sinta")
plt.ylabel("Nilai")
plt.show()
`,
    },
  },
];
const DEFAULT_PRESET = 'line';
// PRESETS-END
// PLT-CORE-START
// A host `matplotlib.pyplot` module for minipy (pure JS, no DOM). It follows matplotlib 3.11 with its default style:
// the tab10 colour cycle (separate cycles for lines and for bars/scatter, advanced only when no colour is given),
// categorical axes for text data (positions 0, 1, 2, … in order of first appearance), autoscaling with 5% margins and
// "sticky" bar bottoms, MaxNLocator ticks (steps 1, 2, 2.5, 5, 10) and ScalarFormatter labels, legend(loc="best")
// placement, grid() toggling, ylim/xlim, and the same error types and messages for the common mistakes (lists of
// different lengths, unknown colours, markers, line styles and keyword arguments, missing arguments). Checked
// against matplotlib 3.11.2 under python3 3.13 (limits, ticks, labels, colours, legend position, error messages).
// plt.show() moves every open figure to the list of shown windows and closes it, like a script with a GUI backend.
const TAB10 = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
const TAB_NAMES = ['blue', 'orange', 'green', 'red', 'purple', 'brown', 'pink', 'gray', 'olive', 'cyan'];
const BASE_COLORS = { b: '0000ff', g: '008000', r: 'ff0000', c: '00bfbf', m: 'bf00bf', y: 'bfbf00', k: '000000', w: 'ffffff' };
// matplotlib's exact values of the one-letter colours (the hex codes above are their rounded display colours)
const BASE_RGB = { b: [0, 0, 1], g: [0, 0.5, 0], r: [1, 0, 0], c: [0, 0.75, 0.75], m: [0.75, 0, 0.75], y: [0.75, 0.75, 0], k: [0, 0, 0], w: [1, 1, 1] };
const CSS4 = {
  aliceblue: 'f0f8ff', antiquewhite: 'faebd7', aqua: '00ffff', aquamarine: '7fffd4', azure: 'f0ffff', beige: 'f5f5dc',
  bisque: 'ffe4c4', black: '000000', blanchedalmond: 'ffebcd', blue: '0000ff', blueviolet: '8a2be2', brown: 'a52a2a',
  burlywood: 'deb887', cadetblue: '5f9ea0', chartreuse: '7fff00', chocolate: 'd2691e', coral: 'ff7f50', cornflowerblue: '6495ed',
  cornsilk: 'fff8dc', crimson: 'dc143c', cyan: '00ffff', darkblue: '00008b', darkcyan: '008b8b', darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9', darkgreen: '006400', darkgrey: 'a9a9a9', darkkhaki: 'bdb76b', darkmagenta: '8b008b',
  darkolivegreen: '556b2f', darkorange: 'ff8c00', darkorchid: '9932cc', darkred: '8b0000', darksalmon: 'e9967a',
  darkseagreen: '8fbc8f', darkslateblue: '483d8b', darkslategray: '2f4f4f', darkslategrey: '2f4f4f', darkturquoise: '00ced1',
  darkviolet: '9400d3', deeppink: 'ff1493', deepskyblue: '00bfff', dimgray: '696969', dimgrey: '696969', dodgerblue: '1e90ff',
  firebrick: 'b22222', floralwhite: 'fffaf0', forestgreen: '228b22', fuchsia: 'ff00ff', gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff', gold: 'ffd700', goldenrod: 'daa520', gray: '808080', green: '008000', greenyellow: 'adff2f',
  grey: '808080', honeydew: 'f0fff0', hotpink: 'ff69b4', indianred: 'cd5c5c', indigo: '4b0082', ivory: 'fffff0', khaki: 'f0e68c',
  lavender: 'e6e6fa', lavenderblush: 'fff0f5', lawngreen: '7cfc00', lemonchiffon: 'fffacd', lightblue: 'add8e6',
  lightcoral: 'f08080', lightcyan: 'e0ffff', lightgoldenrodyellow: 'fafad2', lightgray: 'd3d3d3', lightgreen: '90ee90',
  lightgrey: 'd3d3d3', lightpink: 'ffb6c1', lightsalmon: 'ffa07a', lightseagreen: '20b2aa', lightskyblue: '87cefa',
  lightslategray: '778899', lightslategrey: '778899', lightsteelblue: 'b0c4de', lightyellow: 'ffffe0', lime: '00ff00',
  limegreen: '32cd32', linen: 'faf0e6', magenta: 'ff00ff', maroon: '800000', mediumaquamarine: '66cdaa', mediumblue: '0000cd',
  mediumorchid: 'ba55d3', mediumpurple: '9370db', mediumseagreen: '3cb371', mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a', mediumturquoise: '48d1cc', mediumvioletred: 'c71585', midnightblue: '191970', mintcream: 'f5fffa',
  mistyrose: 'ffe4e1', moccasin: 'ffe4b5', navajowhite: 'ffdead', navy: '000080', oldlace: 'fdf5e6', olive: '808000',
  olivedrab: '6b8e23', orange: 'ffa500', orangered: 'ff4500', orchid: 'da70d6', palegoldenrod: 'eee8aa', palegreen: '98fb98',
  paleturquoise: 'afeeee', palevioletred: 'db7093', papayawhip: 'ffefd5', peachpuff: 'ffdab9', peru: 'cd853f', pink: 'ffc0cb',
  plum: 'dda0dd', powderblue: 'b0e0e6', purple: '800080', rebeccapurple: '663399', red: 'ff0000', rosybrown: 'bc8f8f',
  royalblue: '4169e1', saddlebrown: '8b4513', salmon: 'fa8072', sandybrown: 'f4a460', seagreen: '2e8b57', seashell: 'fff5ee',
  sienna: 'a0522d', silver: 'c0c0c0', skyblue: '87ceeb', slateblue: '6a5acd', slategray: '708090', slategrey: '708090',
  snow: 'fffafa', springgreen: '00ff7f', steelblue: '4682b4', tan: 'd2b48c', teal: '008080', thistle: 'd8bfd8', tomato: 'ff6347',
  turquoise: '40e0d0', violet: 'ee82ee', wheat: 'f5deb3', white: 'ffffff', whitesmoke: 'f5f5f5', yellow: 'ffff00',
  yellowgreen: '9acd32'
};
const VIRIDIS = ['440154', '48186a', '472d7b', '424086', '3b528b', '33638d', '2c728e', '26828e', '21918c', '1fa088', '28ae80',
  '3fbc73', '5ec962', '84d44b', 'addc30', 'd8e219', 'fde725'];
const LS_VALUES = ['-', '--', '-.', ':', 'None', ' ', '', 'solid', 'dashed', 'dashdot', 'dotted'];
const LS_NAMES = { solid: '-', dashed: '--', dashdot: '-.', dotted: ':', ' ': 'None', '': 'None', none: 'None' };
const MARKERS = ['.', ',', 'o', 'v', '^', '<', '>', '1', '2', '3', '4', '8', 's', 'p', '*', 'h', 'H', '+', 'x', 'D', 'd', '|', '_', 'P', 'X'];
const LEGEND_LOCS = ['best', 'upper right', 'upper left', 'lower left', 'lower right', 'right', 'center left', 'center right',
  'lower center', 'upper center', 'center'];
const FONT_SCALE = { 'xx-small': 0.579, 'x-small': 0.694, small: 0.833, medium: 1, large: 1.2, 'x-large': 1.44, 'xx-large': 1.728, larger: 1.2, smaller: 0.833 };
// keyword arguments each artist accepts (matplotlib's setters and aliases); anything else is an AttributeError there
const COMMON_PROPS = ['agg_filter', 'alpha', 'animated', 'antialiased', 'aa', 'clip_box', 'clip_on', 'clip_path', 'figure', 'gid',
  'in_layout', 'label', 'mouseover', 'path_effects', 'picker', 'rasterized', 'sketch_params', 'snap', 'transform', 'url', 'visible', 'zorder'];
const LINE_PROPS = new Set([...COMMON_PROPS, 'color', 'c', 'dash_capstyle', 'dash_joinstyle', 'dashes', 'data', 'drawstyle', 'ds',
  'fillstyle', 'gapcolor', 'linestyle', 'ls', 'linewidth', 'lw', 'marker', 'markeredgecolor', 'mec', 'markeredgewidth', 'mew',
  'markerfacecolor', 'mfc', 'markerfacecoloralt', 'mfcalt', 'markersize', 'ms', 'markevery', 'pickradius', 'solid_capstyle',
  'solid_joinstyle', 'xdata', 'ydata']);
const RECT_PROPS = new Set([...COMMON_PROPS, 'angle', 'bounds', 'capstyle', 'color', 'edgecolor', 'ec', 'facecolor', 'fc', 'fill',
  'hatch', 'hatch_linewidth', 'hatchcolor', 'height', 'joinstyle', 'linestyle', 'ls', 'linewidth', 'lw', 'width', 'x', 'xy', 'y',
  // bar() itself
  'xerr', 'yerr', 'ecolor', 'capsize', 'error_kw', 'log', 'tick_label', 'orientation']);
const COLL_PROPS = new Set([...COMMON_PROPS, 'antialiaseds', 'array', 'capstyle', 'clim', 'cmap', 'color', 'edgecolor', 'ec',
  'edgecolors', 'facecolor', 'facecolors', 'fc', 'hatch', 'joinstyle', 'linestyle', 'dashes', 'linestyles', 'ls', 'linewidth',
  'linewidths', 'lw', 'norm', 'offset_transform', 'offsets', 'paths', 'pickradius', 'sizes', 'urls']);
const TEXT_PROPS = new Set([...COMMON_PROPS, 'backgroundcolor', 'bbox', 'color', 'c', 'fontfamily', 'family', 'fontname',
  'fontproperties', 'font', 'font_properties', 'fontsize', 'size', 'fontstretch', 'stretch', 'fontstyle', 'style', 'fontvariant',
  'variant', 'fontweight', 'weight', 'horizontalalignment', 'ha', 'linespacing', 'math_fontfamily', 'multialignment', 'ma',
  'parse_math', 'position', 'rotation', 'rotation_mode', 'text', 'transform_rotates_text', 'usetex', 'verticalalignment', 'va',
  'wrap', 'x', 'y', 'antialiased', 'fontdict']);
const LEGEND_KW = new Set(['loc', 'numpoints', 'markerscale', 'markerfirst', 'reverse', 'scatterpoints', 'scatteryoffsets', 'prop',
  'fontsize', 'labelcolor', 'borderpad', 'labelspacing', 'handlelength', 'handleheight', 'handletextpad', 'borderaxespad',
  'columnspacing', 'ncols', 'ncol', 'mode', 'fancybox', 'shadow', 'title', 'title_fontsize', 'title_fontproperties', 'framealpha',
  'edgecolor', 'facecolor', 'bbox_to_anchor', 'bbox_transform', 'frameon', 'handler_map', 'alignment', 'draggable', 'handles', 'labels']);
const GRID_KW = ['size', 'width', 'color', 'tickdir', 'pad', 'labelsize', 'labelcolor', 'labelfontfamily', 'zorder', 'gridOn', 'tick1On',
  'tick2On', 'label1On', 'label2On', 'length', 'direction', 'left', 'bottom', 'right', 'top', 'labelleft', 'labelbottom', 'labelright',
  'labeltop', 'labelrotation', 'labelrotation_mode', ...['agg_filter', 'alpha', 'animated', 'antialiased', 'clip_box', 'clip_on',
    'clip_path', 'color', 'dash_capstyle', 'dash_joinstyle', 'dashes', 'data', 'drawstyle', 'figure', 'fillstyle', 'gapcolor', 'gid',
    'in_layout', 'label', 'linestyle', 'linewidth', 'marker', 'markeredgecolor', 'markeredgewidth', 'markerfacecolor',
    'markerfacecoloralt', 'markersize', 'markevery', 'mouseover', 'path_effects', 'picker', 'pickradius', 'rasterized',
    'sketch_params', 'snap', 'solid_capstyle', 'solid_joinstyle', 'transform', 'url', 'visible', 'xdata', 'ydata', 'zorder', 'aa',
    'c', 'ds', 'ls', 'lw', 'mec', 'mew', 'mfc', 'mfcalt', 'ms'].map((k) => 'grid_' + k)];
const UNSUPPORTED = {
  pie: 'plt.bar()', hist: 'plt.bar() with counts from collections.Counter', boxplot: 'statistics.median and plt.bar()',
  fill_between: 'plt.plot()', errorbar: 'plt.plot()', annotate: 'plt.text()', imshow: null, stem: 'plt.bar()', step: 'plt.plot()',
  stackplot: 'plt.plot()', violinplot: null, polar: null, subplot: 'plt.figure()', twinx: null, twiny: null, colorbar: null,
  semilogx: 'plt.plot()', semilogy: 'plt.plot()', loglog: 'plt.plot()', xscale: null, yscale: null, axis: 'plt.xlim() and plt.ylim()',
  fill: null, hlines: 'plt.axhline()', vlines: 'plt.axvline()', table: null, quiver: null, contour: null, contourf: null,
  pcolormesh: null, matshow: null, spy: null, eventplot: null, hexbin: null, broken_barh: 'plt.barh()', stairs: 'plt.plot()',
};
const NOT_AXES = ['polar', 'subplot', 'colorbar', 'xscale', 'yscale'];   // pyplot-only names of UNSUPPORTED
// The other public functions and methods of matplotlib 3.11 that this simulation does not provide. They stop with a
// NotImplementedError, so that a student never reads "has no attribute" for something real matplotlib has.
const SUGGEST = {
  bar_label: 'plt.text() for each bar', axhspan: 'plt.axhline()', axvspan: 'plt.axvline()', axline: 'plt.plot()', figtext: 'plt.text()',
  tick_params: 'plt.xticks(rotation=45) or plt.yticks(fontsize=12)', margins: 'plt.xlim() and plt.ylim()', autoscale: 'plt.xlim() and plt.ylim()',
  locator_params: 'plt.xticks() and plt.yticks()', figlegend: 'plt.legend()', arrow: 'plt.plot()', grouped_bar: 'plt.bar()', pie_label: 'plt.bar()',
  fill_betweenx: 'plt.plot()', subplot2grid: 'plt.figure()', subplot_mosaic: 'plt.figure()', axes: 'plt.figure()', ecdf: 'plt.plot()',
  set_xticklabels: 'ax.set_xticks(ticks, labels)', set_yticklabels: 'ax.set_yticks(ticks, labels)', add_subplot: 'plt.subplots()',
  add_axes: 'plt.subplots()', subplots: 'plt.subplots()', legend: 'plt.legend()', text: 'plt.text()', set_size_inches: 'plt.figure(figsize=(w, h))',
  set_figwidth: 'plt.figure(figsize=(w, h))', set_figheight: 'plt.figure(figsize=(w, h))', set_xscale: null, set_yscale: null,
  set_color: 'color= in the call that draws it', set_linewidth: 'linewidth= in the call that draws it',
  set_linestyle: 'linestyle= in the call that draws it', set_marker: 'marker= in the call that draws it',
};
const PLT_MORE = ('acorr angle_spectrum arrow autoscale autumn axes axhspan axline axvspan bar_label barbs bone box clabel clim cohere connect cool '
  + 'copper csd delaxes disconnect draw_if_interactive ecdf figimage figlegend fignum_exists figtext fill_betweenx findobj flag gci get get_cmap '
  + 'get_current_fig_manager get_figlabels get_fignums get_plot_commands getp ginput gray grouped_bar hist2d hot hsv imread imsave inferno '
  + 'install_repl_displayhook isinteractive jet locator_params magma magnitude_spectrum margins minorticks_off minorticks_on new_figure_manager '
  + 'nipy_spectral pcolor phase_spectrum pie_label pink plasma prism psd quiverkey rc rc_context rcdefaults rgrids sca sci set_cmap set_loglevel '
  + 'setp specgram spring streamplot subplot2grid subplot_mosaic subplot_tool subplots_adjust summer switch_backend thetagrids tick_params '
  + 'ticklabel_format tricontour tricontourf tripcolor triplot uninstall_repl_displayhook viridis waitforbuttonpress winter xcorr xkcd').split(' ');
const AXES_MORE = ('ArtistList acorr add_artist add_callback add_child_axes add_collection add_container add_image add_line add_patch add_table '
  + 'angle_spectrum apply_aspect arrow autoscale autoscale_view axhspan axline axvspan bar_label barbs bxp can_pan can_zoom cla clabel clear cohere '
  + 'contains contains_point convert_xunits convert_yunits csd drag_pan draw draw_artist ecdf end_pan fill_betweenx findobj format_coord '
  + 'format_cursor_data format_xdata format_ydata get_adjustable get_agg_filter get_alpha get_anchor get_animated get_aspect get_autoscale_on '
  + 'get_autoscalex_on get_autoscaley_on get_axes_locator get_axisbelow get_box_aspect get_children get_clip_box get_clip_on get_clip_path '
  + 'get_cursor_data get_data_ratio get_default_bbox_extra_artists get_facecolor get_fc get_figure get_forward_navigation_events get_frame_on '
  + 'get_gid get_gridspec get_images get_in_layout get_label get_legend get_legend_handles_labels get_lines get_mouseover get_navigate '
  + 'get_navigate_mode get_path_effects get_picker get_position get_rasterization_zorder get_rasterized get_shared_x_axes get_shared_y_axes '
  + 'get_sketch_params get_snap get_subplotspec get_tightbbox get_transform get_transformed_clip_path_and_affine get_url get_visible '
  + 'get_window_extent get_xaxis get_xaxis_text1_transform get_xaxis_text2_transform get_xaxis_transform get_xbound get_xgridlines '
  + 'get_xinverted get_xmajorticklabels get_xmargin get_xminorticklabels get_xscale get_xticklabels get_xticklines get_xticks get_yaxis '
  + 'get_yaxis_text1_transform get_yaxis_text2_transform get_yaxis_transform get_ybound get_ygridlines get_yinverted get_ymajorticklabels '
  + 'get_ymargin get_yminorticklabels get_yscale get_yticklabels get_yticklines get_yticks get_zorder grouped_bar has_data have_units hist2d '
  + 'in_axes indicate_inset indicate_inset_zoom inset_axes invert_xaxis invert_yaxis is_transform_set label_outer locator_params '
  + 'magnitude_spectrum margins minorticks_off minorticks_on pchanged pcolor pcolorfast phase_spectrum pick pickable pie_label properties psd '
  + 'quiverkey redraw_in_frame relim remove remove_callback reset_position secondary_xaxis secondary_yaxis set_adjustable set_agg_filter '
  + 'set_alpha set_anchor set_animated set_aspect set_autoscale_on set_autoscalex_on set_autoscaley_on set_axes_locator set_axis_off '
  + 'set_axis_on set_axisbelow set_box_aspect set_clip_box set_clip_on set_clip_path set_facecolor set_fc set_figure '
  + 'set_forward_navigation_events set_frame_on set_gid set_in_layout set_label set_mouseover set_navigate set_navigate_mode '
  + 'set_path_effects set_picker set_position set_prop_cycle set_rasterization_zorder set_rasterized set_sketch_params set_snap '
  + 'set_subplotspec set_transform set_url set_visible set_xbound set_xinverted set_xmargin set_xscale set_xticklabels set_ybound '
  + 'set_yinverted set_ymargin set_yscale set_yticklabels set_zorder sharex sharey specgram start_pan streamplot tick_params '
  + 'ticklabel_format tricontour tricontourf tripcolor triplot update update_datalim update_from violin xaxis_date xaxis_inverted xcorr '
  + 'yaxis_date yaxis_inverted').split(' ');
const FIG_MORE = ('add_artist add_axes add_axobserver add_callback add_gridspec add_subfigure add_subplot align_labels align_titles align_xlabels '
  + 'align_ylabels autofmt_xdate clear clf colorbar contains convert_xunits convert_yunits delaxes draw draw_artist draw_without_rendering '
  + 'figimage findobj format_cursor_data get_agg_filter get_alpha get_animated get_axes get_children get_clip_box get_clip_on get_clip_path '
  + 'get_constrained_layout get_constrained_layout_pads get_cursor_data get_default_bbox_extra_artists get_dpi get_edgecolor get_facecolor '
  + 'get_figheight get_figure get_figwidth get_frameon get_gid get_in_layout get_label get_layout_engine get_linewidth get_mouseover '
  + 'get_path_effects get_picker get_rasterized get_size_inches get_sketch_params get_snap get_suptitle get_supxlabel get_supylabel '
  + 'get_tight_layout get_tightbbox get_transform get_transformed_clip_path_and_affine get_url get_visible get_window_extent get_zorder ginput '
  + 'have_units is_transform_set legend pchanged pick pickable properties remove remove_callback sca set set_agg_filter set_alpha set_animated '
  + 'set_canvas set_clip_box set_clip_on set_clip_path set_constrained_layout set_constrained_layout_pads set_dpi set_edgecolor set_facecolor '
  + 'set_figheight set_figure set_figwidth set_frameon set_gid set_in_layout set_label set_layout_engine set_linewidth set_mouseover '
  + 'set_path_effects set_picker set_rasterized set_size_inches set_sketch_params set_snap set_tight_layout set_transform set_url set_visible '
  + 'set_zorder subfigures subplot_mosaic subplots subplots_adjust supxlabel supylabel text update update_from waitforbuttonpress').split(' ');
// commonly used methods of the objects that plot(), scatter(), bar(), text() and legend() return
const LINE_MORE = ['set_color', 'set_linewidth', 'set_linestyle', 'set_marker', 'set_markersize', 'set_markerfacecolor', 'set_markeredgecolor',
  'set_data', 'set_xdata', 'set_ydata', 'get_data', 'set_alpha', 'get_alpha', 'set_visible', 'get_visible', 'get_linewidth', 'get_markersize',
  'set_zorder', 'get_zorder', 'remove', 'set_dashes', 'set_drawstyle', 'set_fillstyle', 'get_xydata', 'get_path'];
const TEXT_MORE = ['set_text', 'set_color', 'get_color', 'set_fontsize', 'get_fontsize', 'set_position', 'get_position', 'set_x', 'set_y',
  'set_rotation', 'get_rotation', 'set_visible', 'set_ha', 'set_va', 'set_fontweight', 'set_alpha', 'remove', 'set_bbox'];
const COLL_MORE = ['set_color', 'set_facecolor', 'get_facecolor', 'set_edgecolor', 'get_edgecolor', 'set_sizes', 'get_sizes', 'set_offsets',
  'get_offsets', 'set_alpha', 'get_alpha', 'set_visible', 'set_array', 'get_array', 'set_cmap', 'remove', 'set_zorder'];
const LEGEND_MORE = ['get_texts', 'set_title', 'get_title', 'get_frame', 'set_draggable', 'set_visible', 'remove', 'get_lines', 'get_patches',
  'set_loc', 'set_bbox_to_anchor', 'set_alpha', 'set_zorder', 'get_window_extent'];
const BARS_MORE = ['remove', 'get_children', 'get_label', 'set_label', 'index', 'count'];

const pyErr = (type, msg) => { const e = new Error(msg); e.pyType = type; return e; };
// The run uses hostArgs: 'typed' (an integral float arrives as { __float: x }, a tuple as { __tuple: [...] }). The module
// works on JS numbers and Arrays, so arguments are untyped on the way in (untype in createPlt); the Python reprs of a
// list of numbers are kept here, keyed by the untyped Array, for what must print like Python: the statistics
// (statistics.median([80.0, 90.0]) is 85.0, not 85) and get_xdata() / get_ydata().
const PY_REPRS = new WeakMap();
const isFiniteNum = (v) => typeof v === 'number' && Number.isFinite(v);
const pow10 = (k) => Number('1e' + k);   // exact, unlike 10 ** k for some negative k

/** Python's float divmod (floor division with the snapping of floatobject.c) */
function pyDivmod(x, y) {
  let mod = x % y;
  let div = (x - mod) / y;
  if (mod) { if ((y < 0) !== (mod < 0)) { mod += y; div -= 1; } } else mod = y < 0 ? -0 : 0;
  let fd;
  if (div) { fd = Math.floor(div); if (div - fd > 0.5) fd += 1; } else fd = (x / y < 0 || Object.is(x / y, -0)) ? -0 : 0;
  return [fd, mod];
}
const roundHalfEven = (v) => { const r = Math.round(v); return (Math.abs(v % 1) === 0.5 && r % 2 !== 0) ? r - 1 : r; };

// ------------------------------------------------------------------ difflib.get_close_matches (for "Did you mean")
function seqRatio(a, b) {
  const b2j = new Map();
  for (let j = 0; j < b.length; j++) { if (!b2j.has(b[j])) b2j.set(b[j], []); b2j.get(b[j]).push(j); }
  const longest = (alo, ahi, blo, bhi) => {
    let bi = alo, bj = blo, bs = 0, j2len = new Map();
    for (let i = alo; i < ahi; i++) {
      const nj = new Map();
      for (const j of b2j.get(a[i]) || []) {
        if (j < blo) continue;
        if (j >= bhi) break;
        const k = (j2len.get(j - 1) || 0) + 1;
        nj.set(j, k);
        if (k > bs) { bi = i - k + 1; bj = j - k + 1; bs = k; }
      }
      j2len = nj;
    }
    return [bi, bj, bs];
  };
  let matches = 0;
  const queue = [[0, a.length, 0, b.length]];
  while (queue.length) {
    const [alo, ahi, blo, bhi] = queue.pop();
    const [i, j, k] = longest(alo, ahi, blo, bhi);
    if (k) {
      matches += k;
      if (alo < i && blo < j) queue.push([alo, i, blo, j]);
      if (i + k < ahi && j + k < bhi) queue.push([i + k, ahi, j + k, bhi]);
    }
  }
  return a.length + b.length ? 2 * matches / (a.length + b.length) : 1;
}
function closeMatches(word, options, n = 3, cutoff = 0.6) {
  const res = [];
  for (const x of options) {
    const T = x.length + word.length;
    if (T && 2 * Math.min(x.length, word.length) / T < cutoff) continue;
    const cnt = new Map();
    for (const ch of word) cnt.set(ch, (cnt.get(ch) || 0) + 1);
    let m = 0;
    for (const ch of x) { const c = cnt.get(ch) || 0; if (c > 0) { m++; cnt.set(ch, c - 1); } }
    if (T && 2 * m / T < cutoff) continue;
    const r = seqRatio(x, word);
    if (r >= cutoff) res.push([r, x]);
  }
  res.sort((p, q) => q[0] - p[0] || (q[1] > p[1] ? 1 : q[1] < p[1] ? -1 : 0));
  return res.slice(0, n).map((p) => p[1]);
}

// ------------------------------------------------------------------ ticks: MaxNLocator + ScalarFormatter
function nonsingular(vmin, vmax, expander = 0.001, tiny = 1e-15) {
  if (!Number.isFinite(vmin) || !Number.isFinite(vmax)) return [-expander, expander];
  if (vmax < vmin) [vmin, vmax] = [vmax, vmin];
  const maxabs = Math.max(Math.abs(vmin), Math.abs(vmax));
  if (maxabs < (1e6 / tiny) * 2.2250738585072014e-308) { vmin = -expander; vmax = expander; }
  else if (vmax - vmin <= maxabs * tiny) {
    if (vmax === 0 && vmin === 0) { vmin = -expander; vmax = expander; }
    else { vmin -= expander * Math.abs(vmin); vmax += expander * Math.abs(vmax); }
  }
  return [vmin, vmax];
}
const STEPS = [0.1, 0.2, 0.25, 0.5, 1, 2, 2.5, 5, 10, 20];   // MaxNLocator._staircase([1, 2, 2.5, 5, 10])
function maxNTicks(vmin, vmax, nbins) {
  [vmin, vmax] = nonsingular(vmin, vmax, 1e-13, 1e-14);
  const dv = Math.abs(vmax - vmin), meanv = (vmax + vmin) / 2;
  const offset = Math.abs(meanv) / dv < 100 ? 0 : Math.sign(meanv) * pow10(Math.floor(Math.log10(Math.abs(meanv))));
  const scale = pow10(Math.floor(Math.log10(dv / nbins)));
  const v0 = vmin - offset, v1 = vmax - offset;
  const steps = STEPS.map((s) => s * scale);
  const raw = (v1 - v0) / nbins;
  let istep = steps.findIndex((s) => s >= raw);
  if (istep < 0) istep = steps.length - 1;
  const absOff = Math.abs(offset);
  let ticks = [];
  for (let si = istep; si >= 0; si--) {
    const step = steps[si];
    const best = pyDivmod(v0, step)[0] * step;
    let tol = 1e-10;
    if (absOff > 0) tol = Math.min(0.4999, Math.max(1e-10, Math.pow(10, Math.log10(absOff / step) - 12)));
    const closeto = (ms, edge) => Math.abs(ms - edge) < tol;
    const le = (x) => { const [d, m] = pyDivmod(x, step); return closeto(m / step, 1) ? d + 1 : d; };
    const ge = (x) => { const [d, m] = pyDivmod(x, step); return closeto(m / step, 0) ? d : d + 1; };
    const lo = le(v0 - best), hi = ge(v1 - best);
    ticks = [];
    for (let i = lo; i < hi + 1 && ticks.length < 1000; i++) ticks.push(i * step + best);
    const n = ticks.filter((t) => t <= v1 && t >= v0).length;
    if (n >= 2) break;
  }
  return ticks.map((t) => t + offset);
}
/** ScalarFormatter._set_format: the number of decimals that tells all tick labels apart */
function scalarDecimals(locs, view) {
  let L = locs.length < 2 ? [...locs, view[0], view[1]] : locs;
  let range = Math.max(...L) - Math.min(...L);
  if (range === 0) range = Math.max(...L.map(Math.abs));
  if (range === 0) range = 1;
  if (locs.length < 2) L = locs;
  const oom = Math.floor(Math.log10(range));
  let sig = Math.max(0, 3 - oom);
  const thresh = 1e-3 * pow10(oom);
  while (sig >= 0) {
    const p = pow10(sig);
    let mx = 0;
    for (const v of L) mx = Math.max(mx, Math.abs(v - roundHalfEven(v * p) / p));
    if (mx < thresh) sig--; else break;
  }
  return sig + 1;
}
/**
 * ScalarFormatter with matplotlib's defaults (useOffset, offset_threshold 4, scientific powerlimits (-5, 6)):
 * tick labels, plus the offset text drawn at the end of the axis ("1e6", "+2.02e3").
 */
function scalarFormat(locs, view) {
  const vmin = Math.min(view[0], view[1]), vmax = Math.max(view[0], view[1]);
  const vis = locs.filter((v) => vmin <= v && v <= vmax);
  let offset = 0;
  if (vis.length) {
    const lmin = Math.min(...vis), lmax = Math.max(...vis);
    if (!(lmin === lmax || (lmin <= 0 && lmax >= 0))) {
      const absMin = Math.min(Math.abs(lmin), Math.abs(lmax)), absMax = Math.max(Math.abs(lmin), Math.abs(lmax));
      const sign = lmin < 0 ? -1 : 1;
      const fdiv = (a, k) => pyDivmod(a, pow10(k))[0];
      const oomMax = Math.ceil(Math.log10(absMax));
      let oom = oomMax;
      for (let o = oomMax; o > oomMax - 700; o--) if (fdiv(absMin, o) !== fdiv(absMax, o)) { oom = o + 1; break; }
      if ((absMax - absMin) / pow10(oom) <= 1e-2) {
        for (let o = oomMax; o > oomMax - 700; o--) if (fdiv(absMax, o) - fdiv(absMin, o) > 1) { oom = o + 1; break; }
      }
      offset = fdiv(absMax, oom) >= 1000 ? sign * fdiv(absMax, oom) * pow10(oom) : 0;
    }
  }
  let mag = 0;
  if (vis.length) {
    let o;
    if (offset) o = Math.floor(Math.log10(vmax - vmin));
    else { const val = Math.max(...vis.map(Math.abs)); o = val === 0 ? 0 : Math.floor(Math.log10(val)); }
    if (o <= -5 || o >= 6) mag = o;
  }
  const sc = pow10(mag);
  const scaled = locs.map((v) => (v - offset) / sc);
  const dec = scalarDecimals(scaled, [(view[0] - offset) / sc, (view[1] - offset) / sc]);
  const labels = scaled.map((v) => fmtTick(v, dec));
  let offsetText = '';
  if (locs.length && (mag || offset)) {
    let off = '';
    if (offset) {
      const e = Math.floor(Math.log10(Math.abs(offset)));
      const m = Math.round(offset / pow10(e) * 1e10) / 1e10;
      const sig = m % 1 === 0 ? String(m) : String(Number(m.toPrecision(10)));
      off = (offset > 0 ? '+' : '') + (e === 0 ? sig : `${sig}e${e}`);
    }
    offsetText = ((mag ? `1e${mag}` : '') + off).replace(/-/g, '\u2212');
  }
  return { labels, offsetText };
}
function fmtTick(v, dec) {
  if (Math.abs(v) < 1e-8) v = 0;
  const s = v.toFixed(Math.min(20, dec));
  return s.startsWith('-') ? '−' + s.slice(1) : s;
}

// ------------------------------------------------------------------ colours
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const hexRGBA = (h) => {
  if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
  const n = (i) => parseInt(h.slice(i, i + 2), 16) / 255;
  return [n(0), n(2), n(4), h.length === 8 ? n(6) : 1];
};
/** matplotlib.colors.to_rgba: [r, g, b, a] (0..1) or null when `c` is not a colour */
function toRGBA(c) {
  if (typeof c === 'string') {
    if (c.toLowerCase() === 'none') return [0, 0, 0, 0];
    if (/^C\d+$/.test(c)) return hexRGBA(TAB10[Number(c.slice(1)) % 10].slice(1));
    if (c.length === 1) return BASE_RGB[c] ? [...BASE_RGB[c], 1] : null;
    const lc = c.toLowerCase();
    if (lc.startsWith('tab:')) { const i = TAB_NAMES.indexOf(lc.slice(4) === 'grey' ? 'gray' : lc.slice(4)); return i >= 0 ? hexRGBA(TAB10[i].slice(1)) : null; }
    if (CSS4[lc]) return hexRGBA(CSS4[lc]);
    if (/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(c)) return hexRGBA(c.slice(1));
    if (/^\s*[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?\s*$/.test(c)) { const g = Number(c); return g >= 0 && g <= 1 ? [g, g, g, 1] : null; }
    return null;
  }
  if (Array.isArray(c)) {
    if (c.length === 2 && (typeof c[0] === 'string' || Array.isArray(c[0])) && isFiniteNum(c[1])) {
      const base = toRGBA(c[0]);
      return base && c[1] >= 0 && c[1] <= 1 ? [base[0], base[1], base[2], c[1]] : null;
    }
    if ((c.length === 3 || c.length === 4) && c.every((v) => typeof v === 'number' && v >= 0 && v <= 1)) return [c[0], c[1], c[2], c.length === 4 ? c[3] : 1];
  }
  return null;
}
const isColorList = (c) => Array.isArray(c) && !toRGBA(c) && c.length > 0 && c.every((x) => toRGBA(x));
const cssColor = (rgba, alpha) => {
  const a = alpha == null ? rgba[3] : rgba[3] * alpha;
  return `rgba(${Math.round(rgba[0] * 255)},${Math.round(rgba[1] * 255)},${Math.round(rgba[2] * 255)},${+a.toFixed(4)})`;
};
const hexOf = (rgba) => '#' + rgba.slice(0, 3).map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
function viridis(t) {
  t = clamp01(Number.isFinite(t) ? t : 0) * (VIRIDIS.length - 1);
  const i = Math.min(VIRIDIS.length - 2, Math.floor(t)), f = t - i;
  const a = hexRGBA(VIRIDIS[i]), b = hexRGBA(VIRIDIS[i + 1]);
  return [0, 1, 2].map((k) => a[k] + (b[k] - a[k]) * f).concat(1);
}

// ------------------------------------------------------------------ the pyplot host module
function createPlt(deps = {}) {
  const pyRepr = deps.pyRepr || ((v) => (typeof v === 'string' ? `'${v}'` : String(v)));
  const reprAny = (v) => (Array.isArray(v) ? `(${v.map(reprAny).join(', ')}${v.length === 1 ? ',' : ''})` : v === null ? 'None'
    : typeof v === 'boolean' ? (v ? 'True' : 'False') : pyRepr(v));
  const S = { open: [], cur: null, shown: [], calls: [], log: [], warnings: [], line: 0, nextId: 1, seq: 0 };
  const objs = new WeakMap();   // figure / axes record → its Python-visible object
  const isTypedNum = (x) => typeof x === 'number' || typeof x === 'bigint' || (x !== null && typeof x === 'object' && typeof x.__float === 'number');
  function untypeDict(o) { const r = {}; for (const k of Object.keys(o)) r[k] = untype(o[k]); return r; }
  function untype(v) {
    if (v === null || typeof v !== 'object') return v;
    if (typeof v.__float === 'number') return v.__float;
    const items = Array.isArray(v) ? v : Array.isArray(v.__tuple) ? v.__tuple : null;
    if (items) {
      const out = items.map(untype);
      if (PY_REPRS.has(v)) PY_REPRS.set(out, PY_REPRS.get(v));
      else if (items.length && items.every(isTypedNum)) PY_REPRS.set(out, items.map((x) => pyRepr(x)));
      return out;
    }
    if (v.__kwargs && typeof v.__kwargs === 'object') return { __kwargs: untypeDict(v.__kwargs) };
    if (Object.getPrototypeOf(v) === Object.prototype) return untypeDict(v);
    return v;
  }
  // a list the program gave back as Python had it (80.0 stays a float)
  const typedOut = (arr) => {
    const r = PY_REPRS.get(arr);
    return r ? arr.map((v, i) => (typeof v === 'number' && Number.isInteger(v) && /[.en]/.test(r[i]) ? { __float: v } : v)) : arr.slice();
  };

  // ---- small helpers
  const splitKw = (args) => {
    const a = args.slice();
    const last = a[a.length - 1];
    if (last && typeof last === 'object' && !Array.isArray(last) && Object.prototype.hasOwnProperty.call(last, '__kwargs')) {
      a.pop();
      return [a, { ...last.__kwargs }];
    }
    return [a, {}];
  };
  const pop = (kw, k, d) => { if (Object.prototype.hasOwnProperty.call(kw, k)) { const v = kw[k]; delete kw[k]; return v; } return d; };
  const has = (kw, k) => Object.prototype.hasOwnProperty.call(kw, k);
  const quoteList = (names) => names.length === 1 ? `'${names[0]}'` : names.length === 2 ? `'${names[0]}' and '${names[1]}'`
    : names.slice(0, -1).map((n) => `'${n}'`).join(', ') + `, and '${names[names.length - 1]}'`;
  /** bind positional / keyword arguments like a Python def (pos names, how many required, keyword-only names) */
  function bind(fname, args, kw, pos, required = 0, kwonly = [], selfCount = 0) {
    if (args.length > pos.length) {
      const given = args.length + selfCount, lo = required + selfCount, hi = pos.length + selfCount;
      throw pyErr('TypeError', `${fname}() takes ${lo === hi ? lo : `from ${lo} to ${hi}`} positional argument${hi === 1 ? '' : 's'} but ${given} ${given === 1 ? 'was' : 'were'} given`);
    }
    const out = {};
    args.forEach((v, i) => { out[pos[i]] = v; });
    for (const p of [...pos, ...kwonly]) {
      if (!has(kw, p)) continue;
      if (has(out, p)) throw pyErr('TypeError', `${fname}() got multiple values for argument '${p}'`);
      out[p] = pop(kw, p);
    }
    const missing = pos.slice(0, required).filter((p) => !has(out, p));
    if (missing.length) throw pyErr('TypeError', `${fname}() missing ${missing.length} required positional argument${missing.length > 1 ? 's' : ''}: ${quoteList(missing)}`);
    return out;
  }
  // cbook.normalize_kwargs: aliases (c, ls, lw, …) become the full names; both spellings at once is a TypeError
  const aliases = (kw, cls, pairs) => {
    const canon = new Map(pairs.map(([long, short]) => [short, long]));
    const seen = new Map(), out = {};
    for (const k of Object.keys(kw)) {
      const c = canon.get(k) || k;
      if (seen.has(c)) throw pyErr('TypeError', `Got both '${seen.get(c)}' and '${k}', which are aliases of one another`);
      seen.set(c, k);
      out[c] = kw[k];
    }
    for (const k of Object.keys(kw)) delete kw[k];
    return Object.assign(kw, out);
  };
  const checkProps = (kw, cls, allowed) => {
    for (const k of Object.keys(kw)) if (!allowed.has(k)) throw pyErr('AttributeError', `${cls}.set() got an unexpected keyword argument '${k}'`);
  };
  const toFloat = (v, dflt) => {
    if (v === undefined || v === null) return dflt;
    if (typeof v === 'number') return v;
    if (typeof v === 'bigint' || typeof v === 'boolean') return Number(v);
    if (typeof v === 'string') {
      const t = v.trim();
      if (/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(t) || /^[+-]?(inf|infinity|nan)$/i.test(t)) return Number(t.replace(/inf(inity)?/i, 'Infinity').replace(/^([+-]?)nan$/i, 'NaN'));
      throw pyErr('ValueError', `could not convert string to float: ${pyRepr(v)}`);
    }
    throw pyErr('TypeError', `float() argument must be a string or a real number, not '${Array.isArray(v) ? 'list' : 'object'}'`);
  };
  const lineColor = (c, key = 'color') => {
    const rgba = toRGBA(c);
    if (!rgba) throw pyErr('ValueError', `${reprAny(c)} is not a valid value for ${key}: supported inputs are (r, g, b) and (r, g, b, a) 0-1 float tuples; '#rrggbb', '#rrggbbaa', '#rgb', '#rgba' strings; named color strings; string reprs of 0-1 floats for grayscale values; 'C0', 'C1', ... strings for colors of the color cycle; and pairs combining one of the above with an alpha value`);
    return rgba;
  };
  const checkLs = (ls) => {
    if (Array.isArray(ls) && ls.length === 2 && Array.isArray(ls[1])) return { dash: ls[1].map(Number), off: Number(ls[0]) || 0 };
    if (typeof ls === 'string') {
      if (['-', '--', '-.', ':'].includes(ls)) return ls;
      if (ls === 'None' || has(LS_NAMES, ls)) return LS_NAMES[ls] || 'None';
    }
    const best = typeof ls === 'string' ? closeMatches(ls, LS_VALUES, 3, 0.5) : [];
    const sug = typeof ls !== 'string' ? ` Supported values are ${LS_VALUES.map((v) => `'${v}'`).join(', ')}`
      : best.length === 1 ? ` Did you mean: '${best[0]}'?` : best.length > 1 ? ` Did you mean one of: ${best.map((b) => `'${b}'`).join(', ')}?` : '';
    throw pyErr('ValueError', `${reprAny(ls)} is not a valid value for ls.${sug}`);
  };
  const checkMarker = (m) => {
    if (m === null || m === undefined) return 'None';
    if (typeof m === 'string' && (MARKERS.includes(m) || m === 'None' || m === 'none' || m === '' || m === ' ')) return ['none', '', ' '].includes(m) ? 'None' : m;
    if (typeof m === 'string' && m.length > 2 && m.startsWith('$') && m.endsWith('$')) return m;
    if (typeof m === 'number' && Number.isInteger(m) && m >= 0 && m <= 11) return 'tick' + m;
    throw pyErr('ValueError', `Unrecognized marker style ${reprAny(m)}`);
  };
  const fontSize = (v, base = 10) => {
    if (v === undefined || v === null) return base;
    if (typeof v === 'number') return v;
    if (typeof v === 'string' && FONT_SCALE[v]) return 10 * FONT_SCALE[v];
    return toFloat(v, base);
  };
  const textStyle = (kw, cls, defSize, fontdict) => {
    if (fontdict && typeof fontdict === 'object' && !Array.isArray(fontdict)) for (const k of Object.keys(fontdict)) if (!has(kw, k)) kw[k] = fontdict[k];
    aliases(kw, cls, [['color', 'c'], ['fontsize', 'size'], ['fontweight', 'weight'], ['horizontalalignment', 'ha'],
      ['verticalalignment', 'va'], ['fontstyle', 'style'], ['fontfamily', 'family']]);
    const st = {
      size: fontSize(pop(kw, 'fontsize'), defSize),
      color: has(kw, 'color') ? lineColor(pop(kw, 'color')) : [0, 0, 0, 1],
      weight: String(pop(kw, 'fontweight', 'normal')),
      italic: String(pop(kw, 'fontstyle', 'normal')) === 'italic',
      ha: pop(kw, 'horizontalalignment'), va: pop(kw, 'verticalalignment'),
      rotation: pop(kw, 'rotation'), alpha: pop(kw, 'alpha'), bg: pop(kw, 'backgroundcolor'),
    };
    if (st.bg != null) st.bg = lineColor(st.bg, 'backgroundcolor');
    if (st.rotation === 'vertical') st.rotation = 90; else if (st.rotation === 'horizontal' || st.rotation == null) st.rotation = 0; else st.rotation = toFloat(st.rotation, 0);
    checkProps(kw, cls, TEXT_PROPS);
    return st;
  };
  const strOf = (v) => (v === null ? 'None' : typeof v === 'boolean' ? (v ? 'True' : 'False') : typeof v === 'string' ? v : Array.isArray(v) ? reprAny(v) : String(v));

  // ---- data
  function scalarOf(x, what) {
    if (typeof x === 'number' || typeof x === 'string') return x;
    if (typeof x === 'bigint') return Number(x);
    if (typeof x === 'boolean') return x ? 1 : 0;
    if (x === null || x === undefined) return NaN;
    if (Array.isArray(x)) throw pyErr('NotImplementedError', `this simulation draws 1-D data only (a list of numbers or texts), but ${what} contains a list`);
    throw pyErr('TypeError', `this simulation cannot plot this kind of value in ${what}; use numbers or text`);
  }
  /** a data argument → JS array of numbers / strings (a single value counts as a list of one) */
  function dataOf(v, what) {
    // (d.keys(), d.values() and iterators arrive as Arrays too)
    if (Array.isArray(v)) { const out = v.map((x) => scalarOf(x, what)); if (PY_REPRS.has(v)) PY_REPRS.set(out, PY_REPRS.get(v)); return out; }
    if (typeof v === 'number' || typeof v === 'bigint' || typeof v === 'boolean' || typeof v === 'string' || v === null) return [scalarOf(v, what)];
    if (v && typeof v === 'object' && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype) {
      throw pyErr('TypeError', `this simulation needs a list for ${what}, not a dict: use list(d.keys()) or list(d.values())`);
    }
    throw pyErr('TypeError', `this simulation needs a list of numbers or texts for ${what}; convert it with list(...)`);
  }
  const isCat = (arr) => arr.some((v) => typeof v === 'string');
  function units(ax, name, arr) {
    const key = name + 'cat';
    if (isCat(arr) || (ax[key] && arr.length && arr.every((v) => typeof v === 'string'))) {
      if (!ax[key]) ax[key] = new Map();
      const m = ax[key];
      return arr.map((v) => { const s = typeof v === 'string' ? v : String(v); if (!m.has(s)) m.set(s, m.size); return m.get(s); });
    }
    return arr.map((v) => (typeof v === 'number' ? v : NaN));
  }
  const unit1 = (ax, name, v) => (typeof v === 'string' ? units(ax, name, [v])[0] : toFloat(v, 0));
  const shape = (a) => `(${a.length},)`;

  // ---- figures and axes
  function newFigure(num) {
    const nums = S.open.map((f) => f.num).filter((n) => typeof n === 'number');
    const f = {
      id: S.nextId++, num: num ?? (nums.length ? Math.max(...nums) + 1 : 1), figsize: [6.4, 4.8], dpi: 100, ax: null,
      suptitle: null, line: S.line, status: 'open', shownLine: null, facecolor: [1, 1, 1, 1],
    };
    S.open.push(f);
    S.cur = f;
    return f;
  }
  const gcf = () => S.cur || newFigure();
  function newAxes(fig) {
    return {
      fig, artists: [], titles: {}, xlabel: null, ylabel: null, grid: { x: false, y: false, style: null }, xlim: null, ylim: null,
      legend: null, xcat: null, ycat: null, xticks: null, yticks: null, xtickStyle: null, ytickStyle: null, lineCyc: 0, patchCyc: 0,
    };
  }
  const gca = () => { const f = gcf(); if (!f.ax) f.ax = newAxes(f); return f.ax; };
  function record(fn, ax, info = {}) {
    const fig = ax ? ax.fig : S.cur;
    if (info.artist) { info.artist.line = S.line; info.artist.fn = fn; }
    S.calls.push({ seq: S.seq++, fn, line: S.line, fig: fig ? fig.id : null, ...info });
  }
  const nextLineColor = (ax) => TAB10[ax.lineCyc++ % 10];
  const nextPatchColor = (ax) => TAB10[ax.patchCyc++ % 10];

  // ---- objects the program can hold (repr like matplotlib's)
  class Line2D {
    constructor(a) { this.__pyname = 'matplotlib.lines.Line2D'; objs.set(this, a); a.obj = this; }
    __str__() { return `Line2D(${this.get_label()})`; }   // str() / print() of the object, like matplotlib
    get_color() {
      // as matplotlib 3.11 gives it back: the color= text, the letter of a format string, or an RGB(A) tuple of floats
      const a = objs.get(this);
      const fl = (v) => ({ __float: v });
      if (a.colorSpec !== undefined) return a.colorSpec;
      const sp = a.fmtSpec;
      if (typeof sp === 'string') return sp;
      if (sp) return { __tuple: [...sp.t.slice(0, 3).map(fl), sp.intAlpha ? 1 : fl(sp.t[3])] };
      return { __tuple: a.rgba.slice(0, 3).map(fl) };
    }
    get_label() { const a = objs.get(this); return a.label ?? `_child${a.child}`; }
    set_label(s) { objs.get(this).label = strOf(s); return null; }
    get_xdata() { return typedOut(objs.get(this).xRaw); }
    get_ydata() { return typedOut(objs.get(this).yRaw); }
    get_linestyle() { return objs.get(this).ls; }
    get_marker() { const m = objs.get(this).marker; return m; }
  }
  class BarContainer {
    constructor(a) { objs.set(this, a); a.obj = this; }
    __repr__() { return `<BarContainer object of ${objs.get(this).n} artists>`; }
    get_label() { return objs.get(this).label ?? ''; }
  }
  class PathCollection {
    constructor(a) { this.__pyname = 'matplotlib.collections.PathCollection'; objs.set(this, a); a.obj = this; }
    get_label() { const a = objs.get(this); return a.label ?? `_child${a.child}`; }
  }
  class Text {
    constructor(x, y, s) { this._x = x; this._y = y; this._s = s; }
    get_text() { return this._s; }
    __repr__() { return `Text(${this._x}, ${this._y}, ${pyRepr(this._s)})`; }
  }
  class Legend {
    constructor() { this.__pyname = 'matplotlib.legend.Legend'; }
    __str__() { return 'Legend'; }
    get_texts() { return []; }
  }
  const figObj = (f) => { if (!objs.has(f)) objs.set(f, new Figure(f)); return objs.get(f); };
  const axObj = (ax) => { if (!objs.has(ax)) objs.set(ax, new Axes(ax)); return objs.get(ax); };

  // ---- the plotting functions (shared by plt.* and Axes methods)
  function plotImpl(ax, args, kw, fname) {
    for (const k of ['x', 'y']) if (has(kw, k)) throw pyErr('TypeError', `${fname}() got an unexpected keyword argument '${k}'`);
    pop(kw, 'scalex'); pop(kw, 'scaley'); pop(kw, 'data');
    aliases(kw, 'Line2D', [['color', 'c'], ['linestyle', 'ls'], ['linewidth', 'lw'], ['markersize', 'ms'], ['markeredgecolor', 'mec'],
      ['markeredgewidth', 'mew'], ['markerfacecolor', 'mfc'], ['drawstyle', 'ds'], ['antialiased', 'aa']]);
    const out = [];
    if (!args.length) return out;
    const groups = [];
    let rest = args.slice();
    while (rest.length) {
      let g = rest.slice(0, 2);
      rest = rest.slice(2);
      if (rest.length && typeof rest[0] === 'string') { g.push(rest[0]); rest = rest.slice(1); }
      groups.push(g);
    }
    for (const g of groups) {
      let fmt = null, xy = g;
      if (g.length > 1 && typeof g[g.length - 1] === 'string') { fmt = g[g.length - 1]; xy = g.slice(0, -1); }
      else if (g.length === 3) throw pyErr('ValueError', 'third arg must be a format string');
      let fls = null, fmk = null, fcol = null, fspec = null;
      if (fmt !== null) [fls, fmk, fcol, fspec] = parseFmt(fmt);
      if (g.some((v) => v === null)) throw pyErr('ValueError', 'x, y, and format string must not be None');
      let xr, yr;
      if (xy.length === 2) { xr = dataOf(xy[0], 'x'); yr = dataOf(xy[1], 'y'); } else { yr = dataOf(xy[0], 'y'); xr = yr.map((_, i) => i); }
      const xs = units(ax, 'x', xr), ys = units(ax, 'y', yr);
      if (xs.length !== ys.length) throw pyErr('ValueError', `x and y must have same first dimension, but have shapes ${shape(xs)} and ${shape(ys)}`);
      const k2 = { ...kw };
      const line = makeLine(ax, xs, ys, k2, { ls: fls, marker: fmk, color: fcol }, 'Line2D');
      line.xRaw = xr; line.yRaw = yr;
      if (fspec && line.colorSpec === undefined && !has(kw, 'color')) line.fmtSpec = fspec;
      ax.artists.push(line);
      record(fname, ax, { kind: 'line', artist: line });
      out.push(new Line2D(line));
    }
    return out;
  }
  // [linestyle, marker, rgba, spec]: spec is what Line2D.get_color() gives back for a colour of the format string (the
  // letter itself, or the RGBA tuple when the whole string is a colour or a 'Cn' colour)
  function parseFmt(fmt) {
    if (fmt !== '0' && fmt !== '1') { const c = toRGBA(fmt); if (c) return [null, null, c, { t: c, intAlpha: /^([bgrcmykw]|C\d+)$/.test(fmt) }]; }
    let ls = null, mk = null, col = null, spec = null, i = 0;
    const err = (why) => pyErr('ValueError', `${pyRepr(fmt)} is not a valid format string (${why})`);
    while (i < fmt.length) {
      const c = fmt[i], two = fmt.slice(i, i + 2);
      if (two === '--' || two === '-.') { if (ls) throw err('two linestyle symbols'); ls = two; i += 2; }
      else if (c === '-' || c === ':') { if (ls) throw err('two linestyle symbols'); ls = c; i++; }
      else if (MARKERS.includes(c)) { if (mk) throw err('two marker symbols'); mk = c; i++; }
      else if (BASE_COLORS[c]) { if (col) throw err('two color symbols'); col = [...BASE_RGB[c], 1]; spec = c; i++; }
      else if (c === 'C') {
        const m = /^C\d+/.exec(fmt.slice(i));
        if (!m) throw err("'C' must be followed by a number");
        col = toRGBA(m[0]); spec = { t: col, intAlpha: true }; i += m[0].length;
      } else throw err(`unrecognized character ${pyRepr(c)}`);
    }
    if (!ls && !mk) ls = '-';
    return [ls || 'None', mk || 'None', col, spec];
  }
  function makeLine(ax, xs, ys, kw, fmt, cls) {
    let rgba;
    const colorSpec = has(kw, 'color') ? kw.color : undefined;
    if (has(kw, 'color') && kw.color !== null) rgba = lineColor(pop(kw, 'color'));
    else { pop(kw, 'color'); rgba = fmt.color || hexRGBA(nextLineColor(ax).slice(1)); }
    const ls = has(kw, 'linestyle') && kw.linestyle !== null ? checkLs(pop(kw, 'linestyle')) : (pop(kw, 'linestyle'), fmt.ls || '-');
    const marker = has(kw, 'marker') && kw.marker !== null ? checkMarker(pop(kw, 'marker')) : (pop(kw, 'marker'), fmt.marker || 'None');
    const lw = toFloat(pop(kw, 'linewidth'), 1.5), ms = toFloat(pop(kw, 'markersize'), 6), mew = toFloat(pop(kw, 'markeredgewidth'), 1);
    const mfc = has(kw, 'markerfacecolor') && kw.markerfacecolor !== null ? lineColor(pop(kw, 'markerfacecolor'), 'markerfacecolor') : (pop(kw, 'markerfacecolor'), null);
    const mec = has(kw, 'markeredgecolor') && kw.markeredgecolor !== null ? lineColor(pop(kw, 'markeredgecolor'), 'markeredgecolor') : (pop(kw, 'markeredgecolor'), null);
    const alpha = has(kw, 'alpha') && kw.alpha !== null ? toFloat(pop(kw, 'alpha'), 1) : (pop(kw, 'alpha'), null);
    const label = has(kw, 'label') && kw.label !== null ? strOf(pop(kw, 'label')) : (pop(kw, 'label'), null);
    const zorder = toFloat(pop(kw, 'zorder'), 2);
    const fill = pop(kw, 'fillstyle', 'full');
    const visible = pop(kw, 'visible', true) !== false;
    checkProps(kw, cls, LINE_PROPS);
    return {
      kind: 'line', x: xs, y: ys, rgba, colorSpec: typeof colorSpec === 'string' ? colorSpec : undefined, ls, marker, lw, ms, mew, mfc, mec,
      alpha, label: label && !label.startsWith('_') ? label : null, zorder, fill: fill === 'none' ? 'none' : 'full', visible,
      child: ax.artists.length, call: S.seq,
    };
  }
  function barImpl(ax, horiz, args, kw, fname) {
    const p = horiz ? bind(fname, args, kw, ['y', 'width', 'height', 'left'], 2, ['align', 'data'])
      : bind(fname, args, kw, ['x', 'height', 'width', 'bottom'], 2, ['align', 'data']);
    aliases(kw, 'Rectangle', [['edgecolor', 'ec'], ['facecolor', 'fc'], ['linewidth', 'lw'], ['linestyle', 'ls'], ['antialiased', 'aa']]);
    const color = pop(kw, 'color', null);
    let face = pop(kw, 'facecolor', color);
    let faces;
    if (face === null || face === undefined) faces = [hexRGBA(nextPatchColor(ax).slice(1))];
    else if (toRGBA(face)) faces = [toRGBA(face)];
    else if (isColorList(face)) faces = face.map(toRGBA);
    else throw pyErr('ValueError', "'facecolor' or 'color' argument must be a valid color or sequence of colors.");
    const ecRaw = pop(kw, 'edgecolor', null);
    let edges = null;
    if (ecRaw !== null) {
      if (toRGBA(ecRaw)) edges = [toRGBA(ecRaw)]; else if (isColorList(ecRaw)) edges = ecRaw.map(toRGBA);
      else throw pyErr('ValueError', `Invalid RGBA argument: ${reprAny(ecRaw)}`);
    }
    const lw = toFloat(pop(kw, 'linewidth'), edges ? 1 : 0);
    const label = pop(kw, 'label', '');
    const tickLabel = pop(kw, 'tick_label', null);
    const alpha = has(kw, 'alpha') && kw.alpha !== null ? toFloat(pop(kw, 'alpha'), 1) : (pop(kw, 'alpha'), null);
    const zorder = toFloat(pop(kw, 'zorder'), 1);
    const align = p.align ?? 'center';
    if (align !== 'center' && align !== 'edge') throw pyErr('ValueError', `${reprAny(align)} is not a valid value for align; supported values are 'center', 'edge'`);
    for (const k of ['xerr', 'yerr', 'ecolor', 'capsize', 'error_kw', 'log', 'orientation', 'hatch', 'linestyle', 'fill']) pop(kw, k);
    checkProps(kw, 'Rectangle', RECT_PROPS);
    // positions (categorical or numeric), sizes and the other end of each bar
    const posName = horiz ? 'y' : 'x', valName = horiz ? 'x' : 'y';
    const posRaw = dataOf(horiz ? p.y : p.x, posName);
    const valRaw = dataOf(horiz ? p.width : p.height, horiz ? 'width' : 'height');
    const thick = dataOf(horiz ? (p.height ?? 0.8) : (p.width ?? 0.8), horiz ? 'height' : 'width').map((v) => toFloat(v, 0.8));
    const base = dataOf(horiz ? (p.left ?? 0) : (p.bottom ?? 0), horiz ? 'left' : 'bottom');
    const pos = units(ax, posName, posRaw);
    const val = units(ax, valName, valRaw);
    const baseU = units(ax, valName, base);
    // np.broadcast_arrays(x, height, width, y): report the first two arrays whose lengths differ
    const arrs = horiz ? [['x', baseU], ['height', thick], ['width', val], ['y', pos]] : [['x', pos], ['height', val], ['width', thick], ['y', baseU]];
    let n = 1, nArg = null;
    for (const [nm, a] of arrs) {
      if (a.length === 1) continue;
      if (nArg === null) { n = a.length; nArg = [nm, a]; } else if (a.length !== n) {
        throw pyErr('ValueError', `shape mismatch: objects cannot be broadcast to a single shape.  Mismatch is between '${nArg[0]}' with shape ${shape(nArg[1])} and '${nm}' with shape ${shape(a)}.`);
      }
    }
    if (nArg === null) n = Math.max(...arrs.map(([, a]) => a.length));
    const at = (a, i) => a[a.length === 1 ? 0 : i];
    const bars = [];
    for (let i = 0; i < n; i++) {
      const c = at(pos, i), w = at(thick, i), v = at(val, i), b0 = at(baseU, i);
      const lo = align === 'center' ? c - w / 2 : c;
      bars.push({ p0: lo, p1: lo + w, v0: b0, v1: b0 + v, c: faces[i % faces.length], e: edges ? edges[i % edges.length] : null, center: c, val: v });
    }
    const labels = Array.isArray(label) ? label.map(strOf) : null;
    const lab = labels ? null : strOf(label);
    const art = {
      kind: 'bars', horiz, bars, n, lw, alpha, zorder, label: lab && !lab.startsWith('_') ? lab : null, labels,
      raw: valRaw, posRaw, call: S.seq,
    };
    if (tickLabel !== null) {
      const tl = (Array.isArray(tickLabel) ? tickLabel : [tickLabel]).map(strOf);
      const t = { ticks: bars.map((b) => b.center), labels: tl.length === 1 ? Array(n).fill(tl[0]) : tl };
      if (horiz) ax.yticks = t; else ax.xticks = t;
    }
    ax.artists.push(art);
    record(fname, ax, { kind: 'bars', artist: art });
    return new BarContainer(art);
  }
  function scatterImpl(ax, args, kw, fname) {
    const p = bind(fname, args, kw, ['x', 'y', 's', 'c'], 2, ['marker', 'cmap', 'norm', 'vmin', 'vmax', 'alpha', 'linewidths', 'edgecolors', 'colorizer', 'plotnonfinite', 'data']);
    aliases(kw, 'PathCollection', [['edgecolor', 'ec'], ['facecolor', 'fc'], ['linewidth', 'lw'], ['linestyle', 'ls'], ['antialiased', 'aa']]);
    if (has(kw, 'edgecolors') && !has(kw, 'edgecolor')) kw.edgecolor = pop(kw, 'edgecolors');
    if (has(kw, 'facecolors') && !has(kw, 'facecolor')) kw.facecolor = pop(kw, 'facecolors');
    const xr = dataOf(p.x, 'x'), yr = dataOf(p.y, 'y');
    const xs = units(ax, 'x', xr), ys = units(ax, 'y', yr);
    if (xs.length !== ys.length) throw pyErr('ValueError', 'x and y must be the same size');
    const n = xs.length;
    const sRaw = p.s === undefined || p.s === null ? [36] : dataOf(p.s, 's');
    if ((sRaw.length !== 1 && sRaw.length !== n) || sRaw.some((v) => typeof v !== 'number')) throw pyErr('ValueError', 's must be a scalar, or float array-like with the same size as x and y');
    const kwcolor = pop(kw, 'color', null);
    const face = pop(kw, 'facecolor', null);
    const edgeIn = p.edgecolors ?? pop(kw, 'edgecolor', null);
    let c = p.c ?? null;
    if (kwcolor !== null && c !== null) throw pyErr('ValueError', "Supply a 'c' argument or a 'color' kwarg but not both; they differ but their functionalities overlap.");
    if (kwcolor !== null && !toRGBA(kwcolor) && !isColorList(kwcolor)) {
      throw pyErr('ValueError', "'color' kwarg must be a color or sequence of color specs.  For a sequence of values to be color-mapped, use the 'c' argument instead.");
    }
    let colors, mapped = null;
    const cWasNone = c === null;
    if (c === null) c = kwcolor ?? face ?? nextPatchColor(ax);
    const isStr = typeof c === 'string' || (Array.isArray(c) && c.length && typeof c[0] === 'string');
    if (!cWasNone && kwcolor === null && !isStr && Array.isArray(c) && c.length === n && c.every((v) => typeof v === 'number' || typeof v === 'bigint' || typeof v === 'boolean')) {
      const vals = c.map(Number);
      const lo = p.vmin ?? Math.min(...vals), hi = p.vmax ?? Math.max(...vals);
      mapped = vals;
      colors = vals.map((v) => viridis(hi > lo ? (v - lo) / (hi - lo) : 0));
    } else if (toRGBA(c)) colors = [toRGBA(c)];
    else if (isColorList(c) && (c.length === 1 || c.length === n)) colors = c.map(toRGBA);
    else if (isColorList(c)) throw pyErr('ValueError', `'c' argument has ${c.length} elements, which is inconsistent with 'x' and 'y' with size ${n}.`);
    else throw pyErr('ValueError', `'c' argument must be a color, a sequence of colors, or a sequence of numbers, not ${reprAny(c)}`);
    let edges = null;
    if (edgeIn !== null && edgeIn !== 'face') {
      if (toRGBA(edgeIn)) edges = [toRGBA(edgeIn)]; else if (isColorList(edgeIn)) edges = edgeIn.map(toRGBA);
      else throw pyErr('ValueError', `Invalid RGBA argument: ${reprAny(edgeIn)}`);
    }
    const marker = checkMarker(p.marker ?? 'o');
    const alpha = p.alpha != null ? toFloat(p.alpha, 1) : (has(kw, 'alpha') ? toFloat(pop(kw, 'alpha'), 1) : null);
    const lw = toFloat(p.linewidths ?? pop(kw, 'linewidth', null), 1);
    const label = has(kw, 'label') && kw.label !== null ? strOf(pop(kw, 'label')) : (pop(kw, 'label'), null);
    const zorder = toFloat(pop(kw, 'zorder'), 1);
    pop(kw, 'linestyle');
    checkProps(kw, 'PathCollection', COLL_PROPS);
    const art = {
      kind: 'scatter', x: xs, y: ys, s: sRaw.map(Number), colors, edges, marker, alpha, lw, mapped, zorder,
      label: label && !label.startsWith('_') ? label : null, child: ax.artists.length, xRaw: xr, yRaw: yr, call: S.seq,
    };
    ax.artists.push(art);
    record(fname, ax, { kind: 'scatter', artist: art });
    return new PathCollection(art);
  }
  function refLineImpl(ax, horiz, args, kw, fname) {
    const p = horiz ? bind(fname, args, kw, ['y', 'xmin', 'xmax']) : bind(fname, args, kw, ['x', 'ymin', 'ymax']);
    if (has(kw, 'transform')) throw pyErr('ValueError', `'transform' is not allowed as a keyword argument; ${fname.replace(/^.*\./, '')} generates its own transform.`);
    const v = horiz ? (p.y ?? 0) : (p.x ?? 0);
    if (Array.isArray(v)) {
      if (v.length > 1) throw pyErr('ValueError', 'The truth value of an array with more than one element is ambiguous. Use a.any() or a.all()');
    }
    const val = unit1(ax, horiz ? 'y' : 'x', Array.isArray(v) ? v[0] : v);
    const a0 = toFloat(horiz ? p.xmin : p.ymin, 0), a1 = toFloat(horiz ? p.xmax : p.ymax, 1);
    aliases(kw, 'Line2D', [['color', 'c'], ['linestyle', 'ls'], ['linewidth', 'lw'], ['markersize', 'ms'], ['markeredgecolor', 'mec'],
      ['markeredgewidth', 'mew'], ['markerfacecolor', 'mfc'], ['antialiased', 'aa']]);
    const k2 = { ...kw };
    if (!has(k2, 'color') || k2.color === null) k2.color = 'C0';   // lines.color; the colour cycle does not move
    const line = makeLine(ax, [], [], k2, {}, 'Line2D');
    Object.assign(line, { kind: horiz ? 'hline' : 'vline', v: val, a0, a1, raw: Array.isArray(v) ? v[0] : v });
    if (!has(kw, 'color') || kw.color === null) line.colorSpec = 'C0';
    ax.artists.push(line);
    record(fname, ax, { kind: line.kind, artist: line });
    return new Line2D(line);
  }
  function textImpl(ax, args, kw, fname) {
    const p = bind(fname, args, kw, ['x', 'y', 's', 'fontdict'], 3);
    const st = textStyle(kw, 'Text', 10, p.fontdict);
    const art = {
      kind: 'text', x: unit1(ax, 'x', p.x), y: unit1(ax, 'y', p.y), s: strOf(p.s), st, ha: st.ha || 'left', va: st.va || 'baseline', zorder: 3, call: S.seq,
    };
    ax.artists.push(art);
    record(fname, ax, { kind: 'text', artist: art });
    const fx = typeof p.x === 'number' ? p.x : p.x, fy = p.y;
    return new Text(typeof fx === 'string' ? pyRepr(fx) : fx, typeof fy === 'string' ? pyRepr(fy) : fy, art.s);
  }
  function titleImpl(ax, args, kw, fname) {
    const p = bind(fname, args, kw, ['label', 'fontdict', 'loc', 'pad'], 1, ['y']);
    const loc = p.loc == null ? 'center' : String(p.loc).toLowerCase();
    if (!['left', 'center', 'right'].includes(loc)) throw pyErr('ValueError', `${reprAny(p.loc)} is not a valid value for loc; supported values are 'left', 'center', 'right'`);
    const st = textStyle(kw, 'Text', 12, p.fontdict);
    ax.titles[loc] = { text: strOf(p.label), st, pad: toFloat(p.pad, 6) };
    record(fname, ax, { kind: 'title' });
    return new Text(loc === 'left' ? 0 : loc === 'right' ? 1 : 0.5, '1.0', strOf(p.label));
  }
  function axLabelImpl(ax, which, args, kw, fname) {
    const p = bind(fname, args, kw, [which + 'label', 'fontdict', 'labelpad'], 1, ['loc']);
    const st = textStyle(kw, 'Text', 10, p.fontdict);
    const okLoc = which === 'x' ? ['left', 'center', 'right'] : ['bottom', 'center', 'top'];
    const loc = p.loc ?? 'center';
    if (!okLoc.includes(loc)) throw pyErr('ValueError', `${reprAny(loc)} is not a valid value for loc; supported values are ${okLoc.map((v) => `'${v}'`).join(', ')}`);
    ax[which + 'label'] = { text: strOf(p[which + 'label']), st, pad: toFloat(p.labelpad, 4), loc };
    record(fname, ax, { kind: which + 'label' });
    return which === 'x' ? new Text(0.5, 0, strOf(p.xlabel)) : new Text(0, 0.5, strOf(p.ylabel));
  }
  function legendImpl(ax, args, kw, fname) {
    for (const k of Object.keys(kw)) if (!LEGEND_KW.has(k)) throw pyErr('TypeError', `Legend.__init__() got an unexpected keyword argument '${k}'`);
    let loc = pop(kw, 'loc', 'best');
    if (typeof loc === 'number') {
      if (!Number.isInteger(loc) || loc < 0 || loc > 10) throw pyErr('ValueError', `loc must be string, coordinate tuple, or an integer 0-10, not ${reprAny(loc)}`);
    } else if (typeof loc === 'string') {
      const i = LEGEND_LOCS.indexOf(loc);
      if (i < 0) {
        const best = closeMatches(loc, LEGEND_LOCS, 3, 0.5);
        throw pyErr('ValueError', `${pyRepr(loc)} is not a valid value for loc.${best.length === 1 ? ` Did you mean: '${best[0]}'?` : best.length > 1 ? ` Did you mean one of: ${best.map((b) => `'${b}'`).join(', ')}?` : ''}`);
      }
      loc = i;
    } else loc = 0;
    let handles = pop(kw, 'handles', null), labels = pop(kw, 'labels', null);
    if (args.length === 1) labels = args[0];
    else if (args.length === 2) { handles = args[0]; labels = args[1]; }
    else if (args.length > 2) throw pyErr('TypeError', `legend only accepts two non-keyword arguments`);
    // the artists that can appear: lines and scatter in the order they were added, then bar containers
    const all = [...ax.artists.filter((a) => a.kind === 'line' || a.kind === 'hline' || a.kind === 'vline' || a.kind === 'scatter'),
      ...ax.artists.filter((a) => a.kind === 'bars')];
    let entries = [];
    if (handles && labels) {
      const hs = (Array.isArray(handles) ? handles : [handles]).map((h) => (Array.isArray(h) ? h[0] : h)).map((h) => objs.get(h)).filter(Boolean);
      entries = hs.map((a, i) => ({ a, text: i < labels.length ? strOf(labels[i]) : null })).filter((e) => e.text !== null);
    } else if (labels) {
      const L = Array.isArray(labels) ? labels : [labels];
      entries = all.slice(0, L.length).map((a, i) => ({ a, text: strOf(L[i]) }));
    } else {
      for (const a of all) {
        if (a.kind === 'bars' && a.labels) a.labels.forEach((t, i) => { if (!t.startsWith('_')) entries.push({ a, text: t, bar: i }); });
        else if (a.label) entries.push({ a, text: a.label });
      }
      if (!entries.length) {
        S.warnings.push({ line: S.line, text: 'UserWarning: No artists with labels found to put in legend.  Note that artists whose label start with an underscore are ignored when legend() is called with no argument.' });
      }
    }
    const ncols = Math.max(1, Math.round(toFloat(pop(kw, 'ncols', pop(kw, 'ncol', 1)), 1)));
    const title = pop(kw, 'title', null);
    ax.legend = {
      loc, entries, ncols, title: title === null ? null : strOf(title), size: fontSize(pop(kw, 'fontsize'), 10),
      frameon: pop(kw, 'frameon', true) !== false, alpha: toFloat(pop(kw, 'framealpha'), 0.8),
    };
    record(fname, ax, { kind: 'legend' });
    return new Legend();
  }
  function gridImpl(ax, args, kw, fname) {
    const p = bind(fname, args, kw, ['visible', 'which', 'axis']);
    const axis = p.axis ?? 'both';
    if (!['x', 'y', 'both'].includes(axis)) throw pyErr('ValueError', `${reprAny(axis)} is not a valid value for axis. Supported values are 'x', 'y', 'both'`);
    const which = String(p.which ?? 'major').toLowerCase();
    if (!['major', 'minor', 'both'].includes(which)) throw pyErr('ValueError', `${reprAny(p.which)} is not a valid value for which. Supported values are 'major', 'minor', 'both'`);
    for (const k of Object.keys(kw)) if (!GRID_KW.includes('grid_' + k)) {
      throw pyErr('ValueError', `keyword grid_${k} is not recognized; valid keywords are [${GRID_KW.map((g) => `'${g}'`).join(', ')}]`);
    }
    let vis = p.visible ?? null;
    const style = {};
    if (Object.keys(kw).length) {
      if (vis === null || !vis) vis = true;
      aliases(kw, 'Line2D', [['color', 'c'], ['linestyle', 'ls'], ['linewidth', 'lw']]);
      if (has(kw, 'color')) style.rgba = lineColor(kw.color);
      if (has(kw, 'linestyle')) style.ls = checkLs(kw.linestyle);
      if (has(kw, 'linewidth')) style.lw = toFloat(kw.linewidth, 0.8);
      if (has(kw, 'alpha')) style.alpha = toFloat(kw.alpha, 1);
    }
    if (which !== 'minor') {
      for (const a of axis === 'both' ? ['x', 'y'] : [axis]) {
        ax.grid[a] = vis === null ? !ax.grid[a] : !!vis;
        if (Object.keys(style).length) ax.grid[a + 'style'] = { ...(ax.grid[a + 'style'] || {}), ...style };
      }
    }
    record(fname, ax, { kind: 'grid' });
    return null;
  }
  function limImpl(ax, which, args, kw, fname) {
    const lo = which === 'x' ? 'left' : 'bottom', hi = which === 'x' ? 'right' : 'top';
    if (!args.length && !Object.keys(kw).length) {
      const v = viewLimits(ax, which);
      return { __tuple: [{ __float: v[0] }, { __float: v[1] }] };
    }
    const meth = `_AxesBase.set_${which}lim`;
    const p = bind(meth, args, kw, [lo, hi], 0, ['emit', 'auto', which + 'min', which + 'max'], 1);
    for (const k of Object.keys(kw)) throw pyErr('TypeError', `${meth}() got an unexpected keyword argument '${k}'`);
    let v0 = p[lo] ?? null, v1 = p[hi] ?? null;
    if (v1 === null && Array.isArray(v0)) { if (v0.length !== 2) throw pyErr('ValueError', `too many values to unpack (expected 2)`); [v0, v1] = v0; }
    if (p[which + 'min'] != null) { if (v0 !== null) throw pyErr('TypeError', `Cannot pass both '${lo}' and '${which}min'`); v0 = p[which + 'min']; }
    if (p[which + 'max'] != null) { if (v1 !== null) throw pyErr('TypeError', `Cannot pass both '${hi}' and '${which}max'`); v1 = p[which + 'max']; }
    const conv = (v) => (v === null ? null : unit1(ax, which, v));
    v0 = conv(v0); v1 = conv(v1);
    for (const v of [v0, v1]) if (v !== null && !Number.isFinite(v)) throw pyErr('ValueError', 'Axis limits cannot be NaN or Inf');
    if (v0 === null || v1 === null) { const cur = viewLimits(ax, which); if (v0 === null) v0 = cur[0]; if (v1 === null) v1 = cur[1]; }
    if (v0 === v1) S.warnings.push({ line: S.line, text: `UserWarning: Attempting to set identical low and high ${which}lims makes transformation singular; automatically expanding.` });
    const rev = v0 > v1;
    let [a, b] = nonsingular(v0, v1, 0.05);
    if (rev) [a, b] = [b, a];
    ax[which + 'lim'] = [a, b];
    record(fname, ax, { kind: which + 'lim' });
    return { __tuple: [{ __float: a }, { __float: b }] };
  }
  function ticksImpl(ax, which, args, kw, fname, axesMethod) {
    if (axesMethod) {
      // Axes.set_xticks(ticks, labels=None, *, minor=False, **kwargs)
      const p = bind(fname, args, kw, ['ticks', 'labels'], 1, ['minor']);
      return setTicks(ax, which, p.ticks, p.labels ?? null, kw, fname);
    }
    const p = bind(fname, args, kw, ['ticks', 'labels'], 0, ['minor']);
    if ((p.ticks ?? null) === null && (p.labels ?? null) !== null) throw pyErr('TypeError', `${which}ticks(): Parameter 'labels' can't be set without setting 'ticks'`);
    return setTicks(ax, which, p.ticks ?? null, p.labels ?? null, kw, fname);
  }
  function setTicks(ax, which, ticks, labels, kw, fname) {
    const st = textStyle({ ...kw }, 'Text', 10, null);
    if (ticks !== null) {
      const raw = dataOf(ticks, 'ticks');
      const t = units(ax, which, raw);
      if (labels !== null) {
        const L = Array.isArray(labels) ? labels : [labels];
        if (L.length !== t.length) throw pyErr('ValueError', `The number of FixedLocator locations (${t.length}), usually from a call to set_ticks, does not match the number of labels (${L.length}).`);
        ax[which + 'ticks'] = { ticks: t, labels: L.map(strOf) };
      } else ax[which + 'ticks'] = { ticks: t, labels: null };
    }
    if (Object.keys(kw).length) ax[which + 'tickStyle'] = st;
    record(fname, ax, { kind: which + 'ticks' });
    const locs = ticks === null ? [] : (ax[which + 'ticks'].ticks);
    return { __tuple: [locs.map((v) => ({ __float: v })), []] };
  }

  // ---- Python-visible Axes and Figure objects (fig, ax = plt.subplots())
  class Axes {
    constructor(ax) { objs.set(this, ax); }
    get _ax() { return objs.get(this); }
    __str__() { return 'Axes(0.125,0.11;0.775x0.77)'; }
    __repr__() {
      const ax = objs.get(this);
      const parts = [];
      const t = Object.entries(ax.titles).filter(([, v]) => v.text);
      if (t.length) parts.push(`title={${t.map(([k, v]) => `'${k}': ${pyRepr(v.text)}`).join(', ')}}`);
      if (ax.xlabel && ax.xlabel.text) parts.push(`xlabel=${pyRepr(ax.xlabel.text)}`);
      if (ax.ylabel && ax.ylabel.text) parts.push(`ylabel=${pyRepr(ax.ylabel.text)}`);
      return `<Axes: ${parts.join(', ')}>`;
    }
    plot(...a) { const [args, kw] = splitKw(a); return plotImpl(objs.get(this), args, kw, 'Axes.plot'); }
    bar(...a) { const [args, kw] = splitKw(a); return barImpl(objs.get(this), false, args, kw, 'Axes.bar'); }
    barh(...a) { const [args, kw] = splitKw(a); return barImpl(objs.get(this), true, args, kw, 'Axes.barh'); }
    scatter(...a) { const [args, kw] = splitKw(a); return scatterImpl(objs.get(this), args, kw, 'Axes.scatter'); }
    axhline(...a) { const [args, kw] = splitKw(a); return refLineImpl(objs.get(this), true, args, kw, 'Axes.axhline'); }
    axvline(...a) { const [args, kw] = splitKw(a); return refLineImpl(objs.get(this), false, args, kw, 'Axes.axvline'); }
    text(...a) { const [args, kw] = splitKw(a); return textImpl(objs.get(this), args, kw, 'Axes.text'); }
    set_title(...a) { const [args, kw] = splitKw(a); return titleImpl(objs.get(this), args, kw, 'Axes.set_title'); }
    set_xlabel(...a) { const [args, kw] = splitKw(a); return axLabelImpl(objs.get(this), 'x', args, kw, 'Axes.set_xlabel'); }
    set_ylabel(...a) { const [args, kw] = splitKw(a); return axLabelImpl(objs.get(this), 'y', args, kw, 'Axes.set_ylabel'); }
    legend(...a) { const [args, kw] = splitKw(a); return legendImpl(objs.get(this), args, kw, 'Axes.legend'); }
    grid(...a) { const [args, kw] = splitKw(a); return gridImpl(objs.get(this), args, kw, 'Axes.grid'); }
    set_xlim(...a) { const [args, kw] = splitKw(a); return limImpl(objs.get(this), 'x', args, kw, 'Axes.set_xlim'); }
    set_ylim(...a) { const [args, kw] = splitKw(a); return limImpl(objs.get(this), 'y', args, kw, 'Axes.set_ylim'); }
    get_xlim() { const v = viewLimits(objs.get(this), 'x'); return { __tuple: [{ __float: v[0] }, { __float: v[1] }] }; }
    get_ylim() { const v = viewLimits(objs.get(this), 'y'); return { __tuple: [{ __float: v[0] }, { __float: v[1] }] }; }
    set_xticks(...a) { const [args, kw] = splitKw(a); return ticksImpl(objs.get(this), 'x', args, kw, 'Axes.set_xticks', true); }
    set_yticks(...a) { const [args, kw] = splitKw(a); return ticksImpl(objs.get(this), 'y', args, kw, 'Axes.set_yticks', true); }
    get_title(loc = 'center') { const t = objs.get(this).titles[loc]; return t ? t.text : ''; }
    get_xlabel() { const l = objs.get(this).xlabel; return l ? l.text : ''; }
    get_ylabel() { const l = objs.get(this).ylabel; return l ? l.text : ''; }
    /** ax.set(title=..., xlabel=..., ylabel=..., xlim=..., ylim=..., xticks=..., yticks=...): each setter in order */
    set(...a) {
      const [args, kw] = splitKw(a);
      if (args.length) throw pyErr('TypeError', `Artist.set() takes 1 positional argument but ${args.length + 1} were given`);
      const setters = { title: 'set_title', xlabel: 'set_xlabel', ylabel: 'set_ylabel', xlim: 'set_xlim', ylim: 'set_ylim', xticks: 'set_xticks', yticks: 'set_yticks' };
      const out = [];
      for (const k of Object.keys(kw)) {
        if (has(setters, k)) out.push(this[setters[k]](kw[k]));
        else if (AXES_MORE.includes('set_' + k)) throw unsupported('ax.set_' + k);
        else throw pyErr('AttributeError', `Axes.set() got an unexpected keyword argument '${k}'`);
      }
      return out;
    }
  }
  for (const k of Object.keys(UNSUPPORTED)) {
    if (!NOT_AXES.includes(k)) Axes.prototype[k] = function unsupportedAxes() { throw unsupported('ax.' + k); };
  }
  class Figure {
    constructor(f) { objs.set(this, f); }
    __str__() { const f = objs.get(this); return `Figure(${Math.round(f.figsize[0] * f.dpi)}x${Math.round(f.figsize[1] * f.dpi)})`; }
    __repr__() { const f = objs.get(this); return `<Figure size ${Math.round(f.figsize[0] * f.dpi)}x${Math.round(f.figsize[1] * f.dpi)} with ${f.ax ? 1 : 0} Axes>`; }
    savefig(...a) { const [args, kw] = splitKw(a); return savefigImpl(objs.get(this), args, kw, 'Figure.savefig'); }
    suptitle(...a) {
      const [args, kw] = splitKw(a);
      const p = bind('Figure.suptitle', args, kw, ['t'], 1);
      const st = textStyle(kw, 'Text', 12, null);
      const f = objs.get(this);
      f.suptitle = { text: strOf(p.t), st };
      record('suptitle', f.ax, { kind: 'suptitle' });
      return new Text(0.5, 0.98, f.suptitle.text);
    }
    gca() { const f = objs.get(this); if (!f.ax) f.ax = newAxes(f); return axObj(f.ax); }
    tight_layout() { return null; }
    show() { return null; }
  }
  // real methods this simulation does not provide: NotImplementedError instead of a false "has no attribute"
  const stubs = (cls, prefix, names) => {
    for (const k of names) if (!(k in cls.prototype)) cls.prototype[k] = function notSupported() { throw unsupported(prefix + k); };
  };
  stubs(Axes, 'ax.', AXES_MORE);
  stubs(Figure, 'fig.', FIG_MORE);
  stubs(Line2D, 'Line2D.', LINE_MORE);
  stubs(Text, 'Text.', TEXT_MORE);
  stubs(PathCollection, 'PathCollection.', COLL_MORE);
  stubs(Legend, 'Legend.', LEGEND_MORE);
  stubs(BarContainer, 'BarContainer.', BARS_MORE);
  function unsupported(name) {
    const short = name.slice(name.indexOf('.') + 1);
    const draws = has(UNSUPPORTED, short);
    const alt = draws ? UNSUPPORTED[short] : SUGGEST[short];
    return pyErr('NotImplementedError', `${name}() works in real matplotlib, but this simulation ${draws ? 'cannot draw it' : 'does not support it'} yet${alt ? `; try ${alt}` : ''}`);
  }
  function savefigImpl(fig, args, kw, fname) {
    const p = bind(fname, args, kw, ['fname'], 1);
    record('savefig', fig.ax, { kind: 'savefig', file: strOf(p.fname), empty: !fig.ax || !fig.ax.artists.length });
    return null;
  }
  function figureImpl(args, kw) {
    const p = bind('figure', args, kw, ['num', 'figsize', 'dpi'], 0, ['facecolor', 'edgecolor', 'frameon', 'FigureClass', 'clear']);
    let f = null;
    if (p.num !== undefined && p.num !== null) {
      f = S.open.find((g) => g.num === p.num || g.label === p.num) || null;
      if (f) { S.cur = f; return figObj(f); }
    }
    let size = [6.4, 4.8];
    if (p.figsize !== undefined && p.figsize !== null) {
      if (!Array.isArray(p.figsize)) throw pyErr('TypeError', `object of type '${typeof p.figsize === 'string' ? 'str' : Number.isInteger(p.figsize) ? 'int' : 'float'}' has no len()`);
      if (p.figsize.length !== 2) throw pyErr('ValueError', `figure size must be positive finite not ${reprAny(p.figsize)}`);
      size = p.figsize.map((v) => toFloat(v, 1));
      if (!size.every((v) => v > 0 && Number.isFinite(v))) throw pyErr('ValueError', `figure size must be positive finite not ${reprAny(p.figsize)}`);
    }
    f = newFigure(typeof p.num === 'number' ? p.num : null);
    if (typeof p.num === 'string') f.label = p.num;
    f.figsize = size;
    if (p.dpi != null) f.dpi = toFloat(p.dpi, 100);
    if (p.facecolor != null) f.facecolor = lineColor(p.facecolor, 'facecolor');
    record('figure', null, { kind: 'figure', fig: f.id });
    return figObj(f);
  }
  function showImpl() {
    const figs = S.open.slice();
    for (const f of figs) { f.status = 'shown'; f.shownLine = S.line; f.shownSeq = S.seq; S.shown.push(f); }
    S.open = [];
    S.cur = null;
    record('show', null, { kind: 'show', figs: figs.map((f) => f.id) });
    return null;
  }
  function closeImpl(args, kw) {
    const p = bind('close', args, kw, ['fig']);
    const which = p.fig ?? null;
    let drop = [];
    if (which === null) drop = S.cur ? [S.cur] : [];
    else if (which === 'all') drop = S.open.slice();
    else if (typeof which === 'number') drop = S.open.filter((f) => f.num === which);
    else if (typeof which === 'string') drop = S.open.filter((f) => f.label === which);
    else if (objs.get(which) && objs.get(which).figsize) drop = [objs.get(which)];
    else throw pyErr('TypeError', 'close() argument must be a Figure, an int, a string, or None, not ' + reprAny(which));
    for (const f of drop) { f.status = 'closed'; }
    S.open = S.open.filter((f) => !drop.includes(f));
    if (drop.includes(S.cur)) S.cur = S.open[S.open.length - 1] || null;
    record('close', null, { kind: 'close', figs: drop.map((f) => f.id) });
    return null;
  }

  // methods of the objects the program holds take their arguments untyped too
  for (const C of [Line2D, BarContainer, PathCollection, Text, Legend, Axes, Figure]) {
    for (const k of Object.getOwnPropertyNames(C.prototype)) {
      const d = Object.getOwnPropertyDescriptor(C.prototype, k);
      if (k === 'constructor' || typeof d.value !== 'function') continue;
      const f = d.value;
      Object.defineProperty(C.prototype, k, { ...d, value: { [k](...a) { return f.apply(this, a.map(untype)); } }[k] });
    }
  }

  // ---- the module object
  const wrap = (fname, fn) => function pyplotFunction(...a) {
    const [args, kw] = splitKw(a.map(untype));
    S.log.push([fname, args, kw]);
    return fn(args, { ...kw });
  };
  const module = {
    figure: wrap('figure', (args, kw) => figureImpl(args, kw)),
    plot: wrap('plot', (args, kw) => plotImpl(gca(), args, kw, 'plot')),
    bar: wrap('bar', (args, kw) => barImpl(gca(), false, args, kw, 'bar')),
    barh: wrap('barh', (args, kw) => barImpl(gca(), true, args, kw, 'barh')),
    scatter: wrap('scatter', (args, kw) => scatterImpl(gca(), args, kw, 'scatter')),
    axhline: wrap('axhline', (args, kw) => refLineImpl(gca(), true, args, kw, 'axhline')),
    axvline: wrap('axvline', (args, kw) => refLineImpl(gca(), false, args, kw, 'axvline')),
    text: wrap('text', (args, kw) => textImpl(gca(), args, kw, 'text')),
    title: wrap('title', (args, kw) => titleImpl(gca(), args, kw, 'title')),
    xlabel: wrap('xlabel', (args, kw) => axLabelImpl(gca(), 'x', args, kw, 'xlabel')),
    ylabel: wrap('ylabel', (args, kw) => axLabelImpl(gca(), 'y', args, kw, 'ylabel')),
    legend: wrap('legend', (args, kw) => legendImpl(gca(), args, kw, 'legend')),
    grid: wrap('grid', (args, kw) => gridImpl(gca(), args, kw, 'grid')),
    xlim: wrap('xlim', (args, kw) => limImpl(gca(), 'x', args, kw, 'xlim')),
    ylim: wrap('ylim', (args, kw) => limImpl(gca(), 'y', args, kw, 'ylim')),
    xticks: wrap('xticks', (args, kw) => ticksImpl(gca(), 'x', args, kw, 'xticks', false)),
    yticks: wrap('yticks', (args, kw) => ticksImpl(gca(), 'y', args, kw, 'yticks', false)),
    suptitle: wrap('suptitle', (args, kw) => figObj(gcf()).suptitle(...args, { __kwargs: kw })),
    show: wrap('show', (args, kw) => {
      if (args.length) throw pyErr('TypeError', `_Backend.show() takes 1 positional argument but ${args.length + 1} were given`);
      pop(kw, 'block');
      for (const k of Object.keys(kw)) throw pyErr('TypeError', `_Backend.show() got an unexpected keyword argument '${k}'`);
      return showImpl();
    }),
    savefig: wrap('savefig', (args, kw) => savefigImpl(gcf(), args, kw, 'savefig')),
    close: wrap('close', (args, kw) => closeImpl(args, kw)),
    clf: wrap('clf', () => { const f = gcf(); f.ax = null; f.suptitle = null; record('clf', null, { kind: 'clf', fig: f.id }); return null; }),
    cla: wrap('cla', () => { const f = gcf(); if (f.ax) f.ax = newAxes(f); record('cla', f.ax, { kind: 'clf' }); return null; }),
    gcf: wrap('gcf', () => figObj(gcf())),
    gca: wrap('gca', () => axObj(gca())),
    subplots: wrap('subplots', (args, kw) => {
      const p = bind('subplots', args, kw, ['nrows', 'ncols'], 0, ['sharex', 'sharey', 'squeeze', 'width_ratios', 'height_ratios', 'subplot_kw', 'gridspec_kw']);
      if ((p.nrows ?? 1) !== 1 || (p.ncols ?? 1) !== 1) throw pyErr('NotImplementedError', 'this simulation draws one chart per figure: use plt.subplots() without rows and columns, or plt.figure() for each chart');
      const fo = figureImpl([], kw);
      const f = objs.get(fo);
      f.ax = newAxes(f);
      return { __tuple: [fo, axObj(f.ax)] };
    }),
    tight_layout: wrap('tight_layout', () => null),
    ion: wrap('ion', () => null), ioff: wrap('ioff', () => null), pause: wrap('pause', () => null), draw: wrap('draw', () => null),
  };
  for (const k of [...Object.keys(UNSUPPORTED), ...PLT_MORE]) if (!has(module, k)) module[k] = wrap(k, () => { throw unsupported('plt.' + k); });
  module.style = { __repr__: () => "<module 'matplotlib.style'>", use() { throw unsupported('plt.style.use'); }, context() { throw unsupported('plt.style.context'); } };

  return { module, S, gca, setLine(n) { S.line = n; } };
}

// ------------------------------------------------------------------ view limits and ticks (shared with drawing)
function dataInterval(ax, name) {
  let lo = Infinity, hi = -Infinity;
  const sticky = [];
  const add = (v) => { if (Number.isFinite(v)) { if (v < lo) lo = v; if (v > hi) hi = v; } };
  for (const a of ax.artists) {
    if (a.kind === 'line' || a.kind === 'scatter') for (const v of a[name]) add(v);
    else if (a.kind === 'bars') {
      const posAxis = a.horiz ? 'y' : 'x';
      for (const b of a.bars) {
        if (!(b.p1 - b.p0) && !(b.v1 - b.v0)) continue;
        if (name === posAxis) { add(b.p0); add(b.p1); } else { add(b.v0); add(b.v1); sticky.push(b.v0); }
      }
    } else if (a.kind === 'hline' && name === 'y') add(a.v);
    else if (a.kind === 'vline' && name === 'x') add(a.v);
  }
  return lo <= hi ? { lo, hi, sticky: sticky.sort((p, q) => p - q) } : null;
}
function viewLimits(ax, name) {
  if (ax[name + 'lim']) return ax[name + 'lim'].slice();
  const d = dataInterval(ax, name);
  let v;
  if (!d) v = [0, 1];
  else {
    let [x0, x1] = nonsingular(d.lo, d.hi, 0.05);
    const tol = 1e-5 * Math.abs(x1 - x0);
    let b0 = null, b1 = null;
    for (const s of d.sticky) { if (s < x0 + tol) b0 = s; }
    for (const s of d.sticky) { if (s >= x1 - tol) { b1 = s; break; } }
    const delta = (x1 - x0) * 0.05;
    x0 -= delta; x1 += delta;
    if (b0 !== null) x0 = Math.max(x0, b0);
    if (b1 !== null) x1 = Math.min(x1, b1);
    v = nonsingular(x0, x1);
  }
  const t = ax[name + 'ticks'];
  if (t && t.ticks.length) {   // set_ticks() widens the view so that every given tick is visible
    const tl = Math.min(...t.ticks), th = Math.max(...t.ticks);
    if (tl < v[0]) v[0] = tl;
    if (th > v[1]) v[1] = th;
  }
  return v;
}
/** major ticks of one axis: [{ v, label }] inside the view, for an axis `lengthPt` points long */
function axisTicks(ax, name, view, lengthPt, tickPt = 10) {
  const spec = ax[name + 'ticks'];
  const cat = ax[name + 'cat'];
  let locs, labels;
  if (spec) {
    locs = spec.ticks.slice();
    if (spec.labels) labels = spec.labels.slice();
  } else if (cat && cat.size) {
    locs = [...cat.values()];
    labels = [...cat.keys()];
  } else {
    const space = Math.floor(lengthPt / (tickPt * (name === 'x' ? 3 : 2)));
    const nbins = Math.max(1, Math.min(9, space));
    locs = maxNTicks(Math.min(view[0], view[1]), Math.max(view[0], view[1]), nbins);
  }
  let offsetText = '';
  if (!labels) {
    if (cat && cat.size && spec) {
      const names = [...cat.keys()];
      labels = locs.map((v) => (Number.isInteger(v) && v >= 0 && v < names.length ? names[v] : ''));
    } else {
      const f = scalarFormat(locs, view);
      labels = f.labels;
      offsetText = f.offsetText;
    }
  }
  const lo = Math.min(view[0], view[1]), hi = Math.max(view[0], view[1]);
  const eps = (hi - lo) * 1e-10;
  const out = [];
  locs.forEach((v, i) => { if (v >= lo - eps && v <= hi + eps) out.push({ v, label: labels[i] ?? '' }); });
  out.offsetText = offsetText;
  return out;
}

// ------------------------------------------------------------------ legend: entries, size and loc="best"
function legendEntries(ax) {
  const lg = ax.legend;
  if (!lg) return [];
  return lg.entries.map((e) => {
    const a = e.a;
    let h;
    if (a.kind === 'bars') {
      const b = a.bars[e.bar ?? 0];
      h = { type: 'patch', fill: b ? b.c : TAB10[0], edge: b ? b.e : null, alpha: a.alpha };
    } else if (a.kind === 'scatter') h = { type: 'scatter', fill: a.colors[0], edge: a.edges ? a.edges[0] : null, marker: a.marker, s: a.s[0], alpha: a.alpha };
    else h = { type: 'line', rgba: a.rgba, ls: a.ls, lw: a.lw, marker: a.marker, ms: a.ms, mfc: a.mfc, mec: a.mec, mew: a.mew, alpha: a.alpha, fill: a.fill };
    return { text: e.text, h };
  });
}
/** legend size in points; measure(text, sizePt) gives a text width in points */
function legendSize(lg, entries, measure) {
  const fs = lg.size, rowH = fs * 1.1641, handleH = 0.7 * fs;
  const ncols = Math.min(lg.ncols, Math.max(1, entries.length));
  const rows = Math.ceil(entries.length / ncols);
  const colW = [];
  for (let c = 0; c < ncols; c++) {
    let w = 0;
    for (let r = 0; r < rows; r++) { const e = entries[c * rows + r]; if (e) w = Math.max(w, measure(e.text, fs)); }
    colW.push(2 * fs + 0.8 * fs + w);
  }
  const h = Math.max(rowH, handleH);
  let W = colW.reduce((s, w) => s + w, 0) + (ncols - 1) * 2 * fs + 2 * 0.4 * fs;
  let H = rows * h + (rows - 1) * 0.5 * fs + 2 * 0.4 * fs;
  if (lg.title) { W = Math.max(W, measure(lg.title, fs) + 2 * 0.4 * fs); H += rowH + 0.5 * fs; }
  return { w: W, h: H, rows, ncols, colW, rowH: h };
}
// legend loc codes 1..10 → anchor (fractions of the box that sit on the same fraction of the padded axes)
const LOC_ANCHOR = [null, [1, 1], [0, 1], [0, 0], [1, 0], [1, 0.5], [0, 0.5], [1, 0.5], [0.5, 0], [0.5, 1], [0.5, 0.5]];
/**
 * Place a legend of size w × h (display units, y up) in the axes box `box` {x0, y0, x1, y1}; `pad` = borderaxespad.
 * items: { lines: [[x, y], ...][] (display coordinates), offsets: [x, y][], boxes: {x0, y0, x1, y1}[] }.
 * loc 0 = "best": the first of codes 1..10 with the fewest data points, line crossings and boxes under the legend.
 */
function legendPlace(loc, box, w, h, pad, items) {
  const at = (code) => {
    const [fx, fy] = LOC_ANCHOR[code];
    const cx0 = box.x0 + pad, cx1 = box.x1 - pad, cy0 = box.y0 + pad, cy1 = box.y1 - pad;
    return { x0: cx0 + (cx1 - cx0 - w) * fx, y0: cy0 + (cy1 - cy0 - h) * fy, code };
  };
  if (loc) return at(loc);
  let best = null;
  for (let code = 1; code <= 10; code++) {
    const p = at(code);
    const L = { x0: p.x0, y0: p.y0, x1: p.x0 + w, y1: p.y0 + h };
    const inside = ([x, y]) => L.x0 < x && x < L.x1 && L.y0 < y && y < L.y1;
    let bad = 0;
    for (const pts of items.lines) for (const q of pts) if (inside(q)) bad++;
    for (const q of items.offsets) if (inside(q)) bad++;
    for (const b of items.boxes) if (!(b.x1 <= L.x0 || b.y1 <= L.y0 || b.x0 >= L.x1 || b.y0 >= L.y1)) bad++;
    for (const pts of items.lines) if (pathHitsBox(pts, L)) bad++;
    if (!best || bad < best.bad) best = { bad, p };
    if (bad === 0) break;
  }
  return best.p;
}
function segHitsBox(ax, ay, bx, by, L) {
  // Liang–Barsky clipping: does the segment pass through the rectangle?
  let t0 = 0, t1 = 1;
  const dx = bx - ax, dy = by - ay;
  const clip = (p, q) => {
    if (p === 0) return q >= 0;
    const r = q / p;
    if (p < 0) { if (r > t1) return false; if (r > t0) t0 = r; } else { if (r < t0) return false; if (r < t1) t1 = r; }
    return true;
  };
  return clip(-dx, ax - L.x0) && clip(dx, L.x1 - ax) && clip(-dy, ay - L.y0) && clip(dy, L.y1 - ay) && t0 <= t1;
}
function pathHitsBox(pts, L) {
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    if (![a[0], a[1], b[0], b[1]].every(Number.isFinite)) continue;
    if (segHitsBox(a[0], a[1], b[0], b[1], L)) return true;
  }
  return false;
}
/** the data the legend must avoid, in display coordinates (y up) for an axes box and two mapping functions */
function legendAvoid(ax, box, X, Y) {
  const items = { lines: [], offsets: [], boxes: [] };
  for (const a of ax.artists) {
    if (a.kind === 'line') items.lines.push(a.x.map((x, i) => [X(x), Y(a.y[i])]).filter((p) => p.every(Number.isFinite)));
    else if (a.kind === 'hline') { const y = Y(a.v); items.lines.push([[box.x0 + (box.x1 - box.x0) * a.a0, y], [box.x0 + (box.x1 - box.x0) * a.a1, y]]); }
    else if (a.kind === 'vline') { const x = X(a.v); items.lines.push([[x, box.y0 + (box.y1 - box.y0) * a.a0], [x, box.y0 + (box.y1 - box.y0) * a.a1]]); }
    else if (a.kind === 'scatter') for (let i = 0; i < a.x.length; i++) { const q = [X(a.x[i]), Y(a.y[i])]; if (q.every(Number.isFinite)) items.offsets.push(q); }
    else if (a.kind === 'bars') for (const b of a.bars) {
      const xs = a.horiz ? [X(b.v0), X(b.v1)] : [X(b.p0), X(b.p1)];
      const ys = a.horiz ? [Y(b.p0), Y(b.p1)] : [Y(b.v0), Y(b.v1)];
      items.boxes.push({ x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) });
    }
  }
  return items;
}

/**
 * data sets of a figure (for reading points and for the statistics panel): [{ key, kind, values, labels, artist, axis }].
 * A data set given as text (plt.plot(x, ["80", "75"]): a categorical axis) has text: true and texts = the strings;
 * its values are then only the positions 0, 1, 2, … of the categories, so it has no mean or median.
 */
function figureSeries(fig) {
  const out = [];
  if (!fig || !fig.ax) return out;
  const ax = fig.ax;
  const catName = (name, v) => { const m = ax[name + 'cat']; if (m) for (const [k, i] of m) if (i === v) return k; return null; };
  const add = (o, raw) => {
    if (Array.isArray(raw) && raw.some((v) => typeof v === 'string')) { o.text = true; o.texts = o.values.map((v) => catName(o.axis, v) ?? String(v)); }
    // the Python reprs of the values (80.0 is a float), when they are the numbers the program gave
    const r = Array.isArray(raw) ? PY_REPRS.get(raw) : null;
    if (r && !o.text && r.length === o.values.length && o.values.every((v, i) => !Number.isFinite(v) || Number(r[i]) === v)) o.reprs = r;
    out.push(o);
  };
  ax.artists.forEach((a, idx) => {
    if (a.kind === 'line') add({ key: `${idx}`, kind: 'line', artist: a, axis: 'y', values: a.y, labels: a.x.map((x) => catName('x', x) ?? x) }, a.yRaw);
    else if (a.kind === 'scatter') {
      add({ key: `${idx}y`, kind: 'scatter', artist: a, axis: 'y', values: a.y, labels: a.x.map((x) => catName('x', x) ?? x) }, a.yRaw);
      add({ key: `${idx}x`, kind: 'scatter', artist: a, axis: 'x', values: a.x, labels: a.y.map((y) => catName('y', y) ?? y) }, a.xRaw);
    } else if (a.kind === 'bars') {
      const posAxis = a.horiz ? 'y' : 'x';
      add({ key: `${idx}`, kind: a.horiz ? 'barh' : 'bar', artist: a, axis: a.horiz ? 'x' : 'y', values: a.bars.map((b) => b.v1 - b.v0), labels: a.bars.map((b) => catName(posAxis, b.center) ?? b.center) }, a.raw);
    }
  });
  return out.filter((s) => s.values.some(Number.isFinite));
}
/** n, mean, median, mode (the first most common value, like statistics.mode), multimode, min, max of the finite values */
function stats(values) {
  const v = values.filter(Number.isFinite);
  if (!v.length) return null;
  const n = v.length, sum = v.reduce((s, x) => s + x, 0);
  const sorted = v.slice().sort((p, q) => p - q);
  const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const counts = new Map();
  for (const x of v) counts.set(x, (counts.get(x) || 0) + 1);
  let top = 0;
  for (const c of counts.values()) top = Math.max(top, c);
  const modes = [...counts].filter(([, c]) => c === top).map(([x]) => x);
  return { n, sum, mean: sum / n, median, mode: modes[0], modes, modeCount: top, min: sorted[0], max: sorted[n - 1] };
}
// PLT-CORE-END

// ------------------------------------------------------------------ drawing a figure on the canvas (matplotlib look)
const FONT_STACK = '"DejaVu Sans", "Bitstream Vera Sans", Verdana, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const isBold = (st) => !!st && /bold|heavy|black|[6-9]00/.test(String(st.weight));
const fontCss = (px, st) => `${st && st.italic ? 'italic ' : ''}${isBold(st) ? '700 ' : ''}${px.toFixed(2)}px ${FONT_STACK}`;
const LINE_H = 1.164, ASC = 0.928;   // DejaVu Sans: (ascent + descent) and ascent per em
const DASHES = { '--': [3.7, 1.6], '-.': [6.4, 1.6, 1, 1.6], ':': [1, 1.65] };
const easeOut = (t) => 1 - (1 - t) * (1 - t);

/** where everything goes for a figure drawn at W × H CSS px with k px per point (pure geometry, uses ctx to measure) */
function layoutFigure(ctx, fig, W, H, k) {
  const P = (v) => v * k;
  const measure = (s, px, st) => { ctx.font = fontCss(px, st); return ctx.measureText(s).width; };
  const lines = (s) => String(s).split('\n');
  const L = { W, H, k, fig, ax: fig.ax, measure };
  let top = P(5);
  if (fig.suptitle && fig.suptitle.text) {
    const px = P(fig.suptitle.st.size), ls = lines(fig.suptitle.text);
    L.sup = { lines: ls, px, st: fig.suptitle.st, y: top, h: ls.length * px * LINE_H };
    top += L.sup.h + P(2);
  }
  const ax = fig.ax;
  if (!ax) return L;
  const xv = viewLimits(ax, 'x'), yv = viewLimits(ax, 'y');
  L.xv = xv; L.yv = yv;
  const xs = ax.xtickStyle || null, ys = ax.ytickStyle || null;
  const xtPx = P(xs ? xs.size : 10), ytPx = P(ys ? ys.size : 10);
  const xRot = (xs ? xs.rotation : 0) * Math.PI / 180, yRot = (ys ? ys.rotation : 0) * Math.PI / 180;
  // titles (left / center / right), axis labels
  const titles = ['left', 'center', 'right'].map((loc) => (ax.titles[loc] && ax.titles[loc].text ? { loc, ...ax.titles[loc], ls: lines(ax.titles[loc].text), px: P(ax.titles[loc].st.size) } : null)).filter(Boolean);
  let titleH = 0;
  for (const t of titles) titleH = Math.max(titleH, t.ls.length * t.px * LINE_H - t.px * (LINE_H - ASC) + P(t.pad));
  const xl = ax.xlabel && ax.xlabel.text ? { ...ax.xlabel, ls: lines(ax.xlabel.text), px: P(ax.xlabel.st.size) } : null;
  const yl = ax.ylabel && ax.ylabel.text ? { ...ax.ylabel, ls: lines(ax.ylabel.text), px: P(ax.ylabel.st.size) } : null;
  const xlH = xl ? xl.ls.length * xl.px * LINE_H + P(xl.pad) : 0;
  const ylH = yl ? yl.ls.length * yl.px * LINE_H + P(yl.pad) : 0;
  const tickOut = P(3.5 + 3.5);
  const rotBox = (w, h, r) => [Math.abs(w * Math.cos(r)) + Math.abs(h * Math.sin(r)), Math.abs(w * Math.sin(r)) + Math.abs(h * Math.cos(r))];
  let box = { x0: P(48), y0: top + Math.max(titleH, ytPx * 0.7), x1: W - P(12), y1: H - P(36) };
  let xt = [], yt = [];
  for (let pass = 0; pass < 4; pass++) {
    xt = axisTicks(ax, 'x', xv, Math.max(1, box.x1 - box.x0) / k, xs ? xs.size : 10);
    yt = axisTicks(ax, 'y', yv, Math.max(1, box.y1 - box.y0) / k, ys ? ys.size : 10);
    let xh = 0, yw = 0;
    for (const t of xt) { t.w = measure(t.label, xtPx, xs); [t.bw, t.bh] = rotBox(t.w, xtPx * LINE_H, xRot); if (t.label) xh = Math.max(xh, t.bh); }
    for (const t of yt) { t.w = measure(t.label, ytPx, ys); [t.bw, t.bh] = rotBox(t.w, ytPx * LINE_H, yRot); if (t.label) yw = Math.max(yw, t.bw); }
    // offset texts ("1e6") sit above the y axis and under the x tick labels
    const yOffH = yt.offsetText ? ytPx * LINE_H + P(3) : 0, xOffH = xt.offsetText ? xtPx * LINE_H + P(3) : 0;
    const nb = {
      x0: P(5) + ylH + yw + tickOut,
      y0: top + Math.max(titleH + P(2) + yOffH, ytPx * 0.7 + yOffH),
      x1: W - P(10),
      y1: H - (P(5) + xlH + xOffH + (xt.some((t) => t.label) ? xh : 0) + tickOut),
    };
    // x tick labels that would stick out of the figure at either end
    const X = (v) => nb.x0 + (v - xv[0]) / (xv[1] - xv[0]) * (nb.x1 - nb.x0);
    for (const t of xt) {
      if (!t.label) continue;
      const cx = X(t.v);
      if (cx - t.bw / 2 < P(3)) nb.x0 += P(3) - (cx - t.bw / 2);
      if (cx + t.bw / 2 > W - P(3)) nb.x1 -= cx + t.bw / 2 - (W - P(3));
    }
    nb.x1 = Math.max(nb.x1, nb.x0 + 30);
    nb.y1 = Math.max(nb.y1, nb.y0 + 30);
    const same = Math.abs(nb.x0 - box.x0) < 0.5 && Math.abs(nb.x1 - box.x1) < 0.5 && Math.abs(nb.y0 - box.y0) < 0.5 && Math.abs(nb.y1 - box.y1) < 0.5;
    box = nb;
    if (same) break;
  }
  L.box = box;
  L.X = (v) => box.x0 + (v - xv[0]) / (xv[1] - xv[0]) * (box.x1 - box.x0);
  L.Y = (v) => box.y1 - (v - yv[0]) / (yv[1] - yv[0]) * (box.y1 - box.y0);
  L.invX = (px) => xv[0] + (px - box.x0) / (box.x1 - box.x0) * (xv[1] - xv[0]);
  L.invY = (py) => yv[0] + (box.y1 - py) / (box.y1 - box.y0) * (yv[1] - yv[0]);
  L.xt = xt; L.yt = yt; L.xtPx = xtPx; L.ytPx = ytPx; L.xRot = xRot; L.yRot = yRot; L.xs = xs; L.ys = ys;
  const xhAll = Math.max(0, ...xt.filter((t) => t.label).map((t) => t.bh));
  const yOffH = yt.offsetText ? ytPx * LINE_H + P(3) : 0, xOffH = xt.offsetText ? xtPx * LINE_H + P(3) : 0;
  if (yt.offsetText) L.yOff = { text: yt.offsetText, x: box.x0, base: box.y0 - P(3) };
  if (xt.offsetText) L.xOff = { text: xt.offsetText, x: box.x1, top: box.y1 + tickOut + xhAll + P(3) };
  // text placements (boxes are used for the change highlight)
  L.titles = titles.map((t) => {
    const w = Math.max(...t.ls.map((s) => measure(s, t.px, t.st)));
    const x = t.loc === 'left' ? box.x0 : t.loc === 'right' ? box.x1 : (box.x0 + box.x1) / 2;
    const base = box.y0 - P(t.pad) - yOffH;
    const h = t.ls.length * t.px * LINE_H;
    const x0 = t.loc === 'left' ? x : t.loc === 'right' ? x - w : x - w / 2;
    return { ...t, x, base, w, bbox: { x0, y0: base - h + t.px * (LINE_H - ASC), x1: x0 + w, y1: base + t.px * (LINE_H - ASC) } };
  });
  const xh = Math.max(0, ...xt.filter((t) => t.label).map((t) => t.bh));
  const yw = Math.max(0, ...yt.filter((t) => t.label).map((t) => t.bw));
  if (xl) {
    const w = Math.max(...xl.ls.map((s) => measure(s, xl.px, xl.st)));
    const ytop = box.y1 + tickOut + xh + xOffH + P(xl.pad);
    const x = xl.loc === 'left' ? box.x0 + w / 2 : xl.loc === 'right' ? box.x1 - w / 2 : (box.x0 + box.x1) / 2;
    L.xl = { ...xl, x, ytop, w, bbox: { x0: x - w / 2, y0: ytop, x1: x + w / 2, y1: ytop + xl.ls.length * xl.px * LINE_H } };
  }
  if (yl) {
    const w = Math.max(...yl.ls.map((s) => measure(s, yl.px, yl.st)));
    const xr = box.x0 - tickOut - yw - P(yl.pad);
    const cy = yl.loc === 'bottom' ? box.y1 - w / 2 : yl.loc === 'top' ? box.y0 + w / 2 : (box.y0 + box.y1) / 2;
    const h = yl.ls.length * yl.px * LINE_H;
    L.yl = { ...yl, xr, cy, w, bbox: { x0: xr - h, y0: cy - w / 2, x1: xr, y1: cy + w / 2 } };
  }
  L.xtBox = { x0: box.x0, y0: box.y1, x1: box.x1, y1: box.y1 + tickOut + xh };
  L.ytBox = { x0: box.x0 - tickOut - yw, y0: box.y0, x1: box.x0, y1: box.y1 };
  // legend (sizes in points → px; placed in y-up display coordinates like matplotlib)
  const entries = legendEntries(ax);
  if (ax.legend && entries.length) {
    const lg = ax.legend;
    const sz = legendSize(lg, entries, (s, pt) => measure(s, P(pt)) / k);
    const w = P(sz.w), h = P(sz.h);
    const up = { x0: box.x0, y0: H - box.y1, x1: box.x1, y1: H - box.y0 };
    const items = legendAvoid(ax, up, L.X, (v) => H - L.Y(v));
    const pl = legendPlace(lg.loc, up, w, h, P(0.5 * lg.size), items);
    L.legend = { x: pl.x0, y: H - (pl.y0 + h), w, h, code: pl.code, entries, sz, lg };
  }
  // the data points that can be read with the pointer or the keyboard
  L.series = figureSeries(fig).map((s) => {
    const a = s.artist;
    let pts;
    if (s.kind === 'line' || s.kind === 'scatter') pts = a.x.map((x, i) => ({ x: L.X(x), y: L.Y(a.y[i]), i }));
    else if (s.kind === 'bar') pts = a.bars.map((b, i) => ({ x: L.X(b.center), y: L.Y(b.v1), i }));
    else pts = a.bars.map((b, i) => ({ x: L.X(b.v1), y: L.Y(b.center), i }));
    return { ...s, pts: pts.filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y)) };
  });
  return L;
}

function setDash(ctx, ls, lw, k) {
  if (ls && typeof ls === 'object') { ctx.setLineDash(ls.dash.map((d) => Math.max(0.5, d * lw * k))); ctx.lineDashOffset = ls.off * lw * k; return; }
  const d = DASHES[ls];
  ctx.setLineDash(d ? d.map((v) => Math.max(0.5, v * lw * k)) : []);
  ctx.lineDashOffset = 0;
}
/** a marker of matplotlib's shape; size = markersize in px; fill / edge are CSS colours or null */
function drawMarker(ctx, m, x, y, size, fill, edge, ew) {
  const r = size / 2;
  ctx.beginPath();
  let filled = true;
  switch (m) {
    case 'o': ctx.arc(x, y, r, 0, Math.PI * 2); break;
    case '.': ctx.arc(x, y, r / 2, 0, Math.PI * 2); break;
    case ',': ctx.rect(x - 0.5, y - 0.5, 1, 1); break;
    case 's': ctx.rect(x - r, y - r, size, size); break;
    case 'D': ctx.moveTo(x, y - r * Math.SQRT2); ctx.lineTo(x + r * Math.SQRT2, y); ctx.lineTo(x, y + r * Math.SQRT2); ctx.lineTo(x - r * Math.SQRT2, y); ctx.closePath(); break;
    case 'd': ctx.moveTo(x, y - r * Math.SQRT2); ctx.lineTo(x + r * 0.6 * Math.SQRT2, y); ctx.lineTo(x, y + r * Math.SQRT2); ctx.lineTo(x - r * 0.6 * Math.SQRT2, y); ctx.closePath(); break;
    case '^': case 'v': case '<': case '>': {
      const rot = { '^': 0, '>': -Math.PI / 2, 'v': Math.PI, '<': Math.PI / 2 }[m];
      const P3 = [[0, -r], [-r, r], [r, r]].map(([px, py]) => [x + px * Math.cos(rot) - py * Math.sin(rot), y + px * Math.sin(rot) + py * Math.cos(rot)]);
      ctx.moveTo(...P3[0]); ctx.lineTo(...P3[1]); ctx.lineTo(...P3[2]); ctx.closePath(); break;
    }
    case 'p': case 'h': case 'H': case '8': case '*': {
      const n = { p: 5, h: 6, H: 6, 8: 8, '*': 5 }[m];
      const off = m === 'H' ? Math.PI / 6 : m === '8' ? Math.PI / 8 : 0;
      const pts = m === '*' ? 10 : n;
      for (let i = 0; i < pts; i++) {
        const a = -Math.PI / 2 + off + i * 2 * Math.PI / pts;
        const rr = m === '*' && i % 2 ? r * 0.381966 : r;
        const px = x + rr * Math.cos(a), py = y + rr * Math.sin(a);
        if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
      }
      ctx.closePath(); break;
    }
    case 'P': case 'X': {
      const t = r / 3;
      const pts = [[-t, -r], [t, -r], [t, -t], [r, -t], [r, t], [t, t], [t, r], [-t, r], [-t, t], [-r, t], [-r, -t], [-t, -t]];
      const rot = m === 'X' ? Math.PI / 4 : 0;
      pts.forEach(([px, py], i) => { const qx = x + px * Math.cos(rot) - py * Math.sin(rot), qy = y + px * Math.sin(rot) + py * Math.cos(rot); if (i) ctx.lineTo(qx, qy); else ctx.moveTo(qx, qy); });
      ctx.closePath(); break;
    }
    case '+': ctx.moveTo(x - r, y); ctx.lineTo(x + r, y); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); filled = false; break;
    case 'x': ctx.moveTo(x - r, y - r); ctx.lineTo(x + r, y + r); ctx.moveTo(x - r, y + r); ctx.lineTo(x + r, y - r); filled = false; break;
    case '|': ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); filled = false; break;
    case '_': ctx.moveTo(x - r, y); ctx.lineTo(x + r, y); filled = false; break;
    case '1': case '2': case '3': case '4': {
      const rot = { 1: Math.PI, 2: 0, 3: Math.PI / 2, 4: -Math.PI / 2 }[m];
      for (let i = 0; i < 3; i++) { const a = rot - Math.PI / 2 + i * 2 * Math.PI / 3; ctx.moveTo(x, y); ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a)); }
      filled = false; break;
    }
    default:
      if (typeof m === 'string' && m.startsWith('$')) {
        ctx.font = fontCss(size, null); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = fill || edge || '#000'; ctx.fillText(m.slice(1, -1), x, y); return;
      }
      if (typeof m === 'string' && m.startsWith('tick')) { ctx.moveTo(x, y); ctx.lineTo(x + (m === 'tick0' ? r : m === 'tick1' ? -r : 0), y + (m === 'tick2' ? -r : m === 'tick3' ? r : 0)); filled = false; break; }
      return;
  }
  if (filled && fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (edge && ew > 0) { ctx.setLineDash([]); ctx.lineWidth = ew; ctx.strokeStyle = edge; ctx.stroke(); }
  else if (!filled && fill) { ctx.setLineDash([]); ctx.lineWidth = Math.max(1, ew || 1); ctx.strokeStyle = fill; ctx.stroke(); }
}
function drawTextLines(ctx, ls, x, y0, px, st, align) {
  ctx.font = fontCss(px, st);
  ctx.textAlign = align;
  ctx.textBaseline = 'alphabetic';
  ls.forEach((s, i) => ctx.fillText(s, x, y0 + px * ASC + i * px * LINE_H));
}
const rr = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); };

/**
 * Draw a figure. opts: { anim: Map(artist → 0..1), hl: { kind, a } (the part the last line changed, a = strength),
 * overlay: { axis, mean, median, labels } | null, focus: { x, y, text } | null, dim: bool }
 */
function drawFigure(ctx, L, opts = {}) {
  const { W, H, k, fig } = L;
  const P = (v) => v * k;
  ctx.save();
  ctx.setLineDash([]);
  ctx.fillStyle = cssColor(fig.facecolor || [1, 1, 1, 1]);
  ctx.fillRect(0, 0, W, H);
  if (L.sup) { ctx.fillStyle = cssColor(L.sup.st.color); drawTextLines(ctx, L.sup.lines, W / 2, L.sup.y, L.sup.px, L.sup.st, 'center'); }
  const ax = L.ax;
  if (!ax) { ctx.restore(); return; }
  const { box, X, Y } = L;
  const anim = opts.anim || new Map();
  const prog = (a) => (anim.has(a) ? anim.get(a) : 1);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(box.x0, box.y0, box.x1 - box.x0, box.y1 - box.y0);
  const hl = opts.hl;
  const glow = (b, pad = 3) => {
    if (!b) return;
    ctx.save();
    ctx.fillStyle = `rgba(251, 191, 36, ${0.38 * hl.a})`;
    ctx.strokeStyle = `rgba(217, 119, 6, ${0.9 * hl.a})`;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    rr(ctx, b.x0 - pad, b.y0 - pad, b.x1 - b.x0 + 2 * pad, b.y1 - b.y0 + 2 * pad, 4);
    ctx.fill(); ctx.stroke();
    ctx.restore();
  };
  if (hl && hl.a > 0) {
    if (hl.kind === 'title') for (const t of L.titles) glow(t.bbox);
    if (hl.kind === 'xlabel' && L.xl) glow(L.xl.bbox);
    if (hl.kind === 'ylabel' && L.yl) glow(L.yl.bbox);
    if (hl.kind === 'xlim' || hl.kind === 'xticks') glow(L.xtBox, 2);
    if (hl.kind === 'ylim' || hl.kind === 'yticks') glow(L.ytBox, 2);
  }
  // data artists, in zorder (stable), with the grid at 1.5 and the spines at 2.5
  const arts = ax.artists.map((a, i) => ({ a, i })).sort((p, q) => (p.a.zorder - q.a.zorder) || (p.i - q.i)).map((p) => p.a);
  const clipAxes = () => { ctx.save(); ctx.beginPath(); ctx.rect(box.x0, box.y0, box.x1 - box.x0, box.y1 - box.y0); ctx.clip(); };
  const drawArtist = (a) => {
    const t = prog(a);
    if (t <= 0 || a.visible === false) return;
    clipAxes();
    if (a.kind === 'bars') {
      const n = a.bars.length;
      a.bars.forEach((b, i) => {
        const ti = n > 1 ? Math.min(1, Math.max(0, t * 1.6 - i / n * 0.6)) : t;
        if (ti <= 0) return;
        const g = easeOut(ti);
        const v1 = b.v0 + (b.v1 - b.v0) * g;
        const xs = a.horiz ? [X(b.v0), X(v1)] : [X(b.p0), X(b.p1)];
        const ys = a.horiz ? [Y(b.p0), Y(b.p1)] : [Y(b.v0), Y(v1)];
        const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.abs(xs[1] - xs[0]), h = Math.abs(ys[1] - ys[0]);
        if (![x0, y0, w, h].every(Number.isFinite)) return;
        ctx.fillStyle = cssColor(b.c, a.alpha);
        ctx.fillRect(x0, y0, w, h);
        if (b.e && a.lw > 0) { ctx.strokeStyle = cssColor(b.e, a.alpha); ctx.lineWidth = P(a.lw); ctx.setLineDash([]); ctx.strokeRect(x0, y0, w, h); }
      });
    } else if (a.kind === 'scatter') {
      const n = a.x.length;
      for (let i = 0; i < n; i++) {
        const ti = n > 1 ? Math.min(1, Math.max(0, t * 1.8 - i / n * 0.8)) : t;
        if (ti <= 0) continue;
        const px = X(a.x[i]), py = Y(a.y[i]);
        if (!Number.isFinite(px) || !Number.isFinite(py)) continue;
        const size = P(Math.sqrt(Math.max(0, a.s[a.s.length === 1 ? 0 : i]))) * (0.4 + 0.6 * easeOut(ti));
        const c = cssColor(a.colors[a.colors.length === 1 ? 0 : i], a.alpha);
        const e = a.edges ? cssColor(a.edges[a.edges.length === 1 ? 0 : i], a.alpha) : c;
        drawMarker(ctx, a.marker, px, py, size, c, e, P(a.lw));
      }
    } else if (a.kind === 'line' || a.kind === 'hline' || a.kind === 'vline') {
      let pts;
      if (a.kind === 'line') pts = a.x.map((x, i) => [X(x), Y(a.y[i])]);
      else if (a.kind === 'hline') { const y = Y(a.v); pts = [[box.x0 + (box.x1 - box.x0) * a.a0, y], [box.x0 + (box.x1 - box.x0) * a.a1, y]]; }
      else { const x = X(a.v); pts = [[x, box.y1 - (box.y1 - box.y0) * a.a0], [x, box.y1 - (box.y1 - box.y0) * a.a1]]; }
      const col = cssColor(a.rgba, a.alpha);
      // the part drawn so far (animation): a fraction of the total length
      let total = 0;
      const seg = [];
      for (let i = 1; i < pts.length; i++) {
        const ok = pts[i - 1].every(Number.isFinite) && pts[i].every(Number.isFinite);
        const d = ok ? Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]) : 0;
        seg.push(d); total += d;
      }
      const lim = total * easeOut(t);
      if (a.ls !== 'None' && pts.length > 1) {
        ctx.strokeStyle = col;
        ctx.lineWidth = P(a.lw);
        ctx.lineJoin = 'round';
        ctx.lineCap = a.ls === '-' ? 'square' : 'butt';
        setDash(ctx, a.ls, a.lw, k);
        ctx.beginPath();
        let acc = 0, pen = false;
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          if (!p.every(Number.isFinite)) { pen = false; continue; }
          if (i === 0 || !pen) { ctx.moveTo(p[0], p[1]); pen = true; continue; }
          const d = seg[i - 1];
          if (acc + d <= lim + 1e-6) { ctx.lineTo(p[0], p[1]); acc += d; }
          else { const f = d ? (lim - acc) / d : 0; const q = pts[i - 1]; ctx.lineTo(q[0] + (p[0] - q[0]) * f, q[1] + (p[1] - q[1]) * f); break; }
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }
      if (a.marker !== 'None' && a.kind === 'line') {
        let acc = 0;
        for (let i = 0; i < pts.length; i++) {
          if (i > 0) acc += seg[i - 1];
          if (acc > lim + 1e-6) break;
          const p = pts[i];
          if (!p.every(Number.isFinite)) continue;
          const fillC = a.fill === 'none' ? null : cssColor(a.mfc || a.rgba, a.alpha);
          drawMarker(ctx, a.marker, p[0], p[1], P(a.ms), fillC, cssColor(a.mec || a.rgba, a.alpha), P(a.mew));
        }
      }
    }
    ctx.restore();
    if (a.kind === 'text') {
      ctx.save();
      ctx.globalAlpha = t * (a.st.alpha == null ? 1 : a.st.alpha);
      const px = P(a.st.size), x = X(a.x), y = Y(a.y);
      if (Number.isFinite(x) && Number.isFinite(y)) {
        ctx.translate(x, y);
        if (a.st.rotation) ctx.rotate(-a.st.rotation * Math.PI / 180);
        ctx.font = fontCss(px, a.st);
        ctx.fillStyle = cssColor(a.st.color);
        ctx.textAlign = a.ha === 'center' ? 'center' : a.ha === 'right' ? 'right' : 'left';
        ctx.textBaseline = a.va === 'top' ? 'top' : a.va === 'center' || a.va === 'center_baseline' ? 'middle' : a.va === 'bottom' ? 'bottom' : 'alphabetic';
        String(a.s).split('\n').forEach((s, i) => ctx.fillText(s, 0, i * px * LINE_H));
      }
      ctx.restore();
    }
  };
  const gridDraw = () => {
    for (const which of ['x', 'y']) {
      if (!ax.grid[which]) continue;
      const st = ax.grid[which + 'style'] || {};
      const lw = st.lw ?? 0.8;
      ctx.strokeStyle = cssColor(st.rgba || [176 / 255, 176 / 255, 176 / 255, 1], st.alpha);
      ctx.lineWidth = P(lw);
      ctx.lineCap = 'butt';
      setDash(ctx, st.ls || '-', lw, k);
      ctx.beginPath();
      for (const t of which === 'x' ? L.xt : L.yt) {
        if (which === 'x') { const x = Math.round(X(t.v) * 2) / 2; ctx.moveTo(x, box.y0); ctx.lineTo(x, box.y1); }
        else { const y = Math.round(Y(t.v) * 2) / 2; ctx.moveTo(box.x0, y); ctx.lineTo(box.x1, y); }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }
    if (hl && hl.a > 0 && hl.kind === 'grid') glow(box, 1);
  };
  let gridDone = false, spinesDone = false;
  const spines = () => {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = P(0.8);
    ctx.setLineDash([]);
    ctx.strokeRect(box.x0, box.y0, box.x1 - box.x0, box.y1 - box.y0);
    // ticks (outward) on the bottom and left
    ctx.beginPath();
    for (const t of L.xt) { const x = X(t.v); ctx.moveTo(x, box.y1); ctx.lineTo(x, box.y1 + P(3.5)); }
    for (const t of L.yt) { const y = Y(t.v); ctx.moveTo(box.x0, y); ctx.lineTo(box.x0 - P(3.5), y); }
    ctx.stroke();
  };
  for (const a of arts) {
    if (!gridDone && a.zorder >= 1.5) { gridDraw(); gridDone = true; }
    if (!spinesDone && a.zorder >= 2.5) { spines(); spinesDone = true; }
    drawArtist(a);
  }
  if (!gridDone) gridDraw();
  if (!spinesDone) spines();
  // tick labels
  ctx.fillStyle = '#000000';
  for (const t of L.xt) {
    if (!t.label) continue;
    const x = X(t.v), ytop = box.y1 + P(7);
    ctx.save();
    ctx.fillStyle = L.xs ? cssColor(L.xs.color) : '#000';
    ctx.font = fontCss(L.xtPx, L.xs);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(x, ytop + t.bh / 2);
    if (L.xRot) ctx.rotate(-L.xRot);
    ctx.fillText(t.label, 0, 0);
    ctx.restore();
  }
  for (const t of L.yt) {
    if (!t.label) continue;
    const y = Y(t.v), xr = box.x0 - P(7);
    ctx.save();
    ctx.fillStyle = L.ys ? cssColor(L.ys.color) : '#000';
    ctx.font = fontCss(L.ytPx, L.ys);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(xr - t.bw / 2, y);
    if (L.yRot) ctx.rotate(-L.yRot);
    ctx.fillText(t.label, 0, 0);
    ctx.restore();
  }
  // offset texts of the axes ("1e6")
  if (L.yOff) { ctx.fillStyle = '#000'; ctx.font = fontCss(L.ytPx, L.ys); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(L.yOff.text, L.yOff.x, L.yOff.base); }
  if (L.xOff) { ctx.fillStyle = '#000'; ctx.font = fontCss(L.xtPx, L.xs); ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic'; ctx.fillText(L.xOff.text, L.xOff.x, L.xOff.top + L.xtPx * ASC); }
  // titles and axis labels
  for (const t of L.titles) {
    ctx.fillStyle = cssColor(t.st.color);
    const y0 = t.base - (t.ls.length - 1) * t.px * LINE_H - t.px * ASC;
    drawTextLines(ctx, t.ls, t.loc === 'left' ? t.bbox.x0 : t.loc === 'right' ? t.bbox.x1 : t.x, y0, t.px, t.st, t.loc === 'left' ? 'left' : t.loc === 'right' ? 'right' : 'center');
  }
  if (L.xl) { ctx.fillStyle = cssColor(L.xl.st.color); drawTextLines(ctx, L.xl.ls, L.xl.x, L.xl.ytop, L.xl.px, L.xl.st, 'center'); }
  if (L.yl) {
    ctx.save();
    ctx.translate(L.yl.xr, L.yl.cy);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = cssColor(L.yl.st.color);
    const h = L.yl.ls.length * L.yl.px * LINE_H;
    drawTextLines(ctx, L.yl.ls, 0, -h, L.yl.px, L.yl.st, 'center');
    ctx.restore();
  }
  // legend
  if (L.legend) {
    const { x, y, w, h, entries, sz, lg } = L.legend;
    const fs = P(lg.size);
    ctx.save();
    if (lg.frameon) {
      rr(ctx, x, y, w, h, P(0.2 * lg.size));
      ctx.fillStyle = `rgba(255,255,255,${lg.alpha})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(204,204,204,${lg.alpha})`;
      ctx.lineWidth = P(1);
      ctx.stroke();
    }
    let ty = y + P(0.4 * lg.size);
    if (lg.title) { ctx.fillStyle = '#000'; drawTextLines(ctx, [lg.title], x + w / 2, ty, fs, null, 'center'); ty += P(sz.rowH + 0.5 * lg.size); }
    let cx = x + P(0.4 * lg.size);
    for (let c = 0; c < sz.ncols; c++) {
      for (let r = 0; r < sz.rows; r++) {
        const e = entries[c * sz.rows + r];
        if (!e) continue;
        const ry = ty + r * P(sz.rowH + 0.5 * lg.size), mid = ry + P(sz.rowH) / 2;
        const hx = cx, hw = P(2 * lg.size);
        const hd = e.h;
        if (hd.type === 'patch') {
          ctx.fillStyle = cssColor(hd.fill, hd.alpha);
          ctx.fillRect(hx, mid - P(0.35 * lg.size), hw, P(0.7 * lg.size));
          if (hd.edge) { ctx.strokeStyle = cssColor(hd.edge); ctx.lineWidth = P(1); ctx.strokeRect(hx, mid - P(0.35 * lg.size), hw, P(0.7 * lg.size)); }
        } else if (hd.type === 'scatter') {
          drawMarker(ctx, hd.marker, hx + hw / 2, mid, P(Math.sqrt(hd.s)), cssColor(hd.fill, hd.alpha), cssColor(hd.edge || hd.fill, hd.alpha), P(1));
        } else {
          if (hd.ls !== 'None') {
            ctx.strokeStyle = cssColor(hd.rgba, hd.alpha);
            ctx.lineWidth = P(hd.lw);
            ctx.lineCap = 'butt';
            setDash(ctx, hd.ls, hd.lw, k);
            ctx.beginPath(); ctx.moveTo(hx, mid); ctx.lineTo(hx + hw, mid); ctx.stroke();
            ctx.setLineDash([]);
          }
          if (hd.marker !== 'None') drawMarker(ctx, hd.marker, hx + hw / 2, mid, P(hd.ms), hd.fill === 'none' ? null : cssColor(hd.mfc || hd.rgba, hd.alpha), cssColor(hd.mec || hd.rgba, hd.alpha), P(hd.mew));
        }
        ctx.fillStyle = '#000';
        ctx.font = fontCss(fs, null);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(e.text, hx + hw + P(0.8 * lg.size), mid);
      }
      cx += P(sz.colW[c] + 2 * lg.size);
    }
    ctx.restore();
    if (hl && hl.a > 0 && hl.kind === 'legend') glow({ x0: x, y0: y, x1: x + w, y1: y + h }, 2);
  }
  // overlay of the simulation (not part of the matplotlib figure): mean and median of the chosen data
  if (opts.overlay) {
    const o = opts.overlay;
    ctx.save();
    ctx.beginPath(); ctx.rect(box.x0, box.y0, box.x1 - box.x0, box.y1 - box.y0); ctx.clip();
    const marks = [[o.mean, '#c026d3', o.labels[0], [7, 4]], [o.median, '#0f766e', o.labels[1], [2, 3]]];
    // the label of the line drawn higher goes above it, the other one below its line, so the two never collide
    const meanHigher = o.axis === 'y' && Y(o.mean) <= Y(o.median);
    // labels at the end away from the legend
    const atLeft = !!L.legend && L.legend.x + L.legend.w / 2 > (box.x0 + box.x1) / 2;
    marks.forEach(([v, col, text, dash], i) => {
      if (!Number.isFinite(v)) return;
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.setLineDash(dash);
      ctx.beginPath();
      let tx, ty;
      if (o.axis === 'y') { const y = Y(v); ctx.moveTo(box.x0, y); ctx.lineTo(box.x1, y); tx = atLeft ? box.x0 + 4 : box.x1 - 4; ty = y + ((i === 0) === meanHigher ? -10 : 11); }
      else { const x = X(v); ctx.moveTo(x, box.y0); ctx.lineTo(x, box.y1); tx = x - 4; ty = box.y0 + 12 + i * 16; }
      ctx.stroke(); ctx.setLineDash([]);
      ctx.font = `600 ${Math.max(11, P(8.5)).toFixed(1)}px ${FONT_STACK}`;
      const leftAligned = o.axis === 'y' && atLeft;
      ctx.textAlign = leftAligned ? 'left' : 'right'; ctx.textBaseline = 'middle';
      // a white outline keeps the label readable without hiding the data under it
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(255,255,255,0.95)'; ctx.lineWidth = 3.5;
      ctx.strokeText(text, tx, ty);
      ctx.fillStyle = col; ctx.fillText(text, tx, ty);
    });
    ctx.restore();
  }
  // the point being read (pointer or keyboard)
  if (opts.focus) {
    const f = opts.focus;
    ctx.save();
    ctx.strokeStyle = '#111827'; ctx.lineWidth = 2; ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(f.x, f.y, 7, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(f.x, f.y, 9.5, 0, Math.PI * 2); ctx.stroke();
    const fpx = Math.max(12, P(9));
    ctx.font = `600 ${fpx.toFixed(1)}px ${FONT_STACK}`;
    const tw = ctx.measureText(f.text).width + 14, th = fpx + 10;
    let bx = f.x + 12, by = f.y - th - 10;
    if (bx + tw > W - 2) bx = f.x - 12 - tw;
    if (bx < 2) bx = 2;
    if (by < 2) by = f.y + 12;
    rr(ctx, bx, by, tw, th, 5);
    ctx.fillStyle = 'rgba(17, 24, 39, 0.92)'; ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(f.text, bx + 7, by + th / 2);
    ctx.restore();
  }
  if (opts.dim) { ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fillRect(0, 0, W, H); }
  ctx.restore();
}

// ------------------------------------------------------------------ source helpers
/** the argument texts of the call to `fn` that starts on 1-based line `line`: { pos: [...], kw: { name: text } } */
function callArgs(lines, line, fn) {
  const name = String(fn).replace(/^.*\./, '');
  const text = lines.slice(line - 1, line + 11).join('\n');
  const m = new RegExp(`(^|[^\\w])${name}\\s*\\(`).exec(text);
  if (!m) return null;
  let i = m.index + m[0].length, depth = 1, cur = '', quote = null;
  const parts = [];
  while (i < text.length && depth > 0) {
    const c = text[i];
    if (quote) {
      cur += c;
      if (c === '\\') { cur += text[i + 1] || ''; i += 2; continue; }
      if (text.startsWith(quote, i)) { if (quote.length === 3) { cur += quote.slice(1); i += 3; quote = null; continue; } quote = null; }
      i++; continue;
    }
    if (c === '#') { while (i < text.length && text[i] !== '\n') i++; continue; }
    if (c === '"' || c === "'") { quote = text.startsWith(c.repeat(3), i) ? c.repeat(3) : c; cur += quote; i += quote.length; continue; }
    if (c === '(' || c === '[' || c === '{') depth++;
    if (c === ')' || c === ']' || c === '}') { depth--; if (depth === 0) break; }
    if (c === ',' && depth === 1) { parts.push(cur); cur = ''; i++; continue; }
    cur += c; i++;
  }
  if (cur.trim()) parts.push(cur);
  const out = { pos: [], kw: {} };
  for (const p0 of parts) {
    const p = p0.replace(/\s+/g, ' ').trim();
    const km = /^([A-Za-z_]\w*)\s*=(?!=)\s*(.*)$/.exec(p);
    if (km) out.kw[km[1]] = km[2]; else out.pos.push(p);
  }
  return out;
}
/**
 * mean, median, mode, min, max and range exactly as Python prints them (repr), computed by running a tiny program in
 * minipy. `reprs` = the Python reprs the values had in the program (80.0 is a float, see PY_REPRS); without
 * them, whole numbers are passed as int and the others as float.
 */
const PY_STATS = new Map();
function pyStats(values, reprs) {
  const parts = [];
  values.forEach((x, i) => { if (Number.isFinite(x)) parts.push(reprs ? reprs[i] : String(x)); });
  if (!parts.length) return null;
  const lit = parts.join(', ');
  if (PY_STATS.has(lit)) return PY_STATS.get(lit);
  let res = null;
  try {
    const src = `import statistics\nd = [${lit}]\nfor v in (statistics.mean(d), statistics.median(d), statistics.mode(d), min(d), max(d), max(d) - min(d)):\n    print(repr(v))\nprint(statistics.multimode(d))\n`;
    const c = compile(src, { filename: 'stats.py' });
    if (c.ok) {
      const r = createRun(c.program, { maxSteps: 5000, echoInput: false });
      r.runToEnd();
      if (r.status === 'done') {
        const o = r.stdout.split('\n');
        res = { mean: o[0], median: o[1], mode: o[2], min: o[3], max: o[4], range: o[5], multimode: o[6] };
      }
    }
  } catch (e) { res = null; }
  if (PY_STATS.size > 300) PY_STATS.clear();
  PY_STATS.set(lit, res);
  return res;
}
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const num = (v, nd = 2) => {
  if (!Number.isFinite(v)) return String(v);
  const r = Math.round(v * 10 ** nd) / 10 ** nd;
  return String(Object.is(r, -0) ? 0 : r);
};
const SPEEDS = [0.5, 1, 2, 4, 8, 16];   // lines per second
const DEFAULT_SPEED = 3;
const MAX_STEPS = 20000;
const TAB_ID = ['biru', 'oranye', 'hijau', 'merah', 'ungu', 'cokelat', 'merah muda', 'abu-abu', 'zaitun', 'sian'];

const CSS = `
.cd { padding: 12px; min-width: 0; }
.cd *, .cd *::before, .cd *::after, .cd-ctl * { box-sizing: border-box; }
.cd [hidden], .cd-ctl [hidden] { display: none !important; }
.cd-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; min-width: 0; }
.cd-col { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.cd.is-wide .cd-grid { grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); align-items: start; }
.cd.is-wide .cd-bar { grid-column: 1 / -1; }
.cd-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; min-width: 0; }
.cd-btns { display: flex; flex-wrap: wrap; gap: 6px; }
.cd-btns .btn { padding: 7px 10px; min-height: 38px; white-space: nowrap; }
.cd-btns .btn:disabled { opacity: .45; cursor: not-allowed; filter: none; }
.cd-scrub { display: flex; align-items: center; gap: 8px; flex: 1 1 160px; min-width: 0; }
.cd-scrub input { flex: 1 1 auto; min-width: 60px; accent-color: var(--accent, var(--color-accent)); }
.cd-count { font: 600 13px/1.2 var(--font-mono, monospace); white-space: nowrap; color: var(--color-fg); }
.cd-status { flex: 1 1 100%; margin: 0; font-size: 13px; line-height: 1.45; color: var(--color-muted); min-height: 2.9em; overflow-wrap: anywhere; }
.cd-status b { color: var(--color-fg); }
.cd-status code { font: 12.5px/1.3 var(--font-mono, monospace); color: var(--color-fg); }
.cd-status.is-err b { color: var(--color-danger); }
.cd-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.cd-win { background: #0b1220; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden; color-scheme: dark; min-width: 0; }
.cd-win-h { display: flex; align-items: center; gap: 8px; min-height: 30px; padding: 4px 10px; background: #0f182c; border-bottom: 1px solid #1e2a44;
  font: 600 12px/1.3 var(--font-sans, sans-serif); color: #b6c2d6; }
.cd-win-h .dots { display: inline-flex; gap: 4px; flex: none; }
.cd-win-h .dots i { width: 9px; height: 9px; border-radius: 50%; background: #334155; display: block; }
.cd-win-h .t { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cd-badge { flex: none; padding: 1px 8px; border-radius: 999px; font: 600 11.5px/1.5 var(--font-sans, sans-serif); white-space: nowrap; }
.cd-badge.s-shown { background: #064e3b; color: #d1fae5; }
.cd-badge.s-open { background: #78350f; color: #fef3c7; }
.cd-badge.s-never { background: #7f1d1d; color: #fee2e2; }
.cd-tabs { display: flex; flex-wrap: wrap; gap: 6px; padding: 6px 8px; border-bottom: 1px solid #1e2a44; background: #0b1220; }
.cd-tabs button { font: 600 12px/1.3 var(--font-sans, sans-serif); color: #cbd5e1; background: #111a2e; border: 1px solid #334155; border-radius: 6px;
  padding: 5px 9px; min-height: 30px; cursor: pointer; }
.cd-tabs button[aria-pressed="true"] { background: #1e3a8a; border-color: #60a5fa; color: #fff; }
.cd-tabs button.s-open { border-style: dashed; }
.cd-tabs button:focus-visible { outline: 2px solid #60a5fa; outline-offset: 2px; }
.cd-cw { position: relative; outline: none; touch-action: manipulation; aspect-ratio: 4 / 3; overflow: hidden; min-height: 0; }
.cd-cw canvas { position: absolute; left: 0; top: 0; }
.cd-cw:focus-visible { box-shadow: inset 0 0 0 3px #60a5fa; }
.sim-stage .cd-cw canvas { background: #ffffff; cursor: crosshair; }
.cd-foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2px 12px; padding: 6px 10px; border-top: 1px solid #1e2a44;
  font: 12.5px/1.45 var(--font-sans, sans-serif); color: #b6c2d6; min-height: 30px; }
.cd-foot b { font: 600 12.5px/1.45 var(--font-mono, monospace); color: #fde68a; }
.cd-key { margin: 0; font-size: 12px; line-height: 1.5; color: var(--color-muted); }
.cd-key b { color: var(--color-fg); font-weight: 600; }
.cd-legend { display: flex; flex-wrap: wrap; gap: 4px 14px; margin-top: 6px; font-size: 12px; line-height: 1.5; color: var(--color-muted); }
.cd-lsw { display: inline-block; width: 18px; height: 12px; margin-right: 5px; border-radius: 3px; vertical-align: -1px; }
.cd-lsw.s-next { background: rgba(251,191,36,.35); box-shadow: inset 3px 0 0 #fbbf24; }
.cd-lsw.s-ran { background: rgba(148,163,184,.25); box-shadow: inset 3px 0 0 #94a3b8; }
.cd-lsw.s-plt { background: rgba(96,165,250,.3); box-shadow: inset 3px 0 0 #60a5fa; }
.cd-lsw.s-err { background: rgba(248,113,113,.35); box-shadow: inset 3px 0 0 #f87171; }
.cd-in label { display: block; font-size: 13px; font-weight: 600; color: var(--color-fg); margin-bottom: 4px; }
.cd-in textarea { width: 100%; min-height: 64px; resize: vertical; font: 14px/1.45 var(--font-mono, monospace); padding: 6px 8px; border-radius: 8px;
  border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-fg); }
.cd-in p { margin: 4px 0 0; font-size: 12px; color: var(--color-muted); }
.cd-stats { border: 1px solid var(--color-border); border-radius: 10px; padding: 10px 12px; background: var(--color-surface-2, transparent); min-width: 0; }
.cd-stats h3 { margin: 0 0 8px; font-size: 14px; color: var(--color-fg); }
.cd-stats .row { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; margin-bottom: 8px; }
.cd-stats label { font-size: 13px; font-weight: 600; color: var(--color-fg); }
.cd-stats select { flex: 1 1 180px; min-width: 0; max-width: 100%; font-size: 14px; padding: 6px 8px; min-height: 36px; border-radius: 8px;
  border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-fg); }
.cd-chips { display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 6px; margin: 0; }
.cd-chips div { border: 1px solid var(--color-border); border-radius: 8px; padding: 5px 8px; background: var(--color-surface); min-width: 0; }
.cd-chips dt { font-size: 11.5px; color: var(--color-muted); }
.cd-chips dd { margin: 0; font: 600 15px/1.3 var(--font-mono, monospace); color: var(--color-fg); overflow-wrap: anywhere; }
.cd-chips .c-mean dd { color: #c026d3; }
.cd-chips .c-median dd { color: #0f766e; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .cd-chips .c-mean dd { color: #e879f9; } :root:not([data-theme="light"]) .cd-chips .c-median dd { color: #2dd4bf; } }
:root[data-theme="dark"] .cd-chips .c-mean dd { color: #e879f9; }
:root[data-theme="dark"] .cd-chips .c-median dd { color: #2dd4bf; }
.cd-note { margin: 8px 0 0; font-size: 12.5px; line-height: 1.5; color: var(--color-muted); overflow-wrap: anywhere; }
.cd-note code { font: 12px/1.4 var(--font-mono, monospace); color: var(--color-fg); }
.cd-stats details { margin-top: 8px; }
.cd-stats summary { cursor: pointer; font-size: 13px; font-weight: 600; color: var(--color-fg); min-height: 28px; }
.cd-tablewrap { max-height: 220px; overflow: auto; margin-top: 6px; border: 1px solid var(--color-border); border-radius: 8px; }
.cd-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.cd-table th, .cd-table td { padding: 4px 8px; text-align: left; border-bottom: 1px solid var(--color-border); color: var(--color-fg); }
.cd-table th { position: sticky; top: 0; background: var(--color-surface); font-weight: 600; }
.cd-table td.n { font-family: var(--font-mono, monospace); text-align: right; }
.cd-table tr.is-max td { background: color-mix(in srgb, #f59e0b 16%, transparent); }
.cd-table tr.is-min td { background: color-mix(in srgb, #3b82f6 14%, transparent); }
.cd-table tr.is-focus td { outline: 2px solid #f59e0b; outline-offset: -2px; }
.cd-empty { margin: 0; font-size: 13px; color: var(--color-muted); }
.cd-tip { margin: 0; padding: 8px 10px; border-left: 3px solid var(--accent, var(--color-accent)); border-radius: 0 6px 6px 0;
  background: color-mix(in srgb, var(--accent, var(--color-accent)) 7%, transparent); font-size: 13px; line-height: 1.5; color: var(--color-fg); }
.cd-tip b { font-weight: 700; }
.cd-code .cp button { font: 600 12px/1.2 var(--font-sans, sans-serif); }
`;

export function mount(rootEl) {
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const T = (en, id) => (lang === 'id' ? id : en);
  const reduceMotion = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const narrowStart = !!window.matchMedia?.('(max-width: 600px)').matches;
  const uid = Math.random().toString(36).slice(2, 8);

  const style = document.createElement('style');
  style.textContent = CSS;
  rootEl.appendChild(style);

  // ------------------------------------------------------------------ layout
  const main = document.createElement('div');
  main.className = 'cd';
  const grid = document.createElement('div');
  grid.className = 'cd-grid';
  main.appendChild(grid);
  rootEl.appendChild(main);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls cd-ctl';
  rootEl.appendChild(ctrlPanel);

  // transport bar
  const bar = document.createElement('div');
  bar.className = 'cd-bar';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', T('Run controls', 'Kontrol jalannya program'));
  const btns = document.createElement('div');
  btns.className = 'cd-btns';
  const mkBtn = (label, aria, onClick, primary = false) => {
    const b = button({ label, primary, onClick });
    b.el.setAttribute('aria-label', aria);
    b.el.title = aria;
    return b.el;
  };
  const bBack = mkBtn(T('◀ Back', '◀ Mundur'), T('Back: undo the last line', 'Mundur: batalkan baris terakhir'), () => stepBack());
  const bStep = mkBtn(T('Step ▶', 'Langkah ▶'), T('Step: run the next line of code', 'Langkah: jalankan satu baris kode berikutnya'), () => stepForward(), true);
  const bRun = mkBtn(T('▶ Run', '▶ Jalankan'), T('Run: run the program line by line at the chosen speed', 'Jalankan: jalankan program baris demi baris dengan kecepatan yang dipilih'), () => togglePlay());
  const bEnd = mkBtn(T('⏭ Instant', '⏭ Langsung'), T('Instant: run the whole program at once', 'Langsung: jalankan seluruh program sekaligus'), () => toEnd());
  const bReset = mkBtn(T('⟲ Reset', '⟲ Ulang'), T('Reset: clear the output and start again', 'Ulang: hapus keluaran dan mulai lagi'), () => { restart(); announce(T('Reset: the program starts again.', 'Diulang: program dimulai lagi.')); });
  btns.append(bBack, bStep, bRun, bEnd, bReset);
  const scrub = document.createElement('div');
  scrub.className = 'cd-scrub';
  const scrubIn = document.createElement('input');
  scrubIn.type = 'range';
  scrubIn.min = '0'; scrubIn.max = '0'; scrubIn.step = '1'; scrubIn.value = '0';
  scrubIn.setAttribute('aria-label', T('Step slider: move through the lines of the program', 'Penggeser langkah: telusuri baris-baris program'));
  const count = document.createElement('span');
  count.className = 'cd-count';
  scrub.append(scrubIn, count);
  const status = document.createElement('p');
  status.className = 'cd-status';
  const live = document.createElement('div');
  live.className = 'cd-sr';
  live.setAttribute('aria-live', 'polite');
  bar.append(btns, scrub, status, live);

  // figure window
  const figWrap = document.createElement('section');
  figWrap.className = 'cd-col cd-figcol';
  figWrap.setAttribute('aria-label', T('Figure window', 'Jendela gambar'));
  const win = document.createElement('div');
  win.className = 'cd-win';
  const winH = document.createElement('div');
  winH.className = 'cd-win-h';
  winH.innerHTML = '<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>';
  const winTitle = document.createElement('span');
  winTitle.className = 't';
  const badge = document.createElement('span');
  badge.className = 'cd-badge';
  winH.append(winTitle, badge);
  const tabs = document.createElement('div');
  tabs.className = 'cd-tabs';
  tabs.setAttribute('role', 'group');
  tabs.setAttribute('aria-label', T('Figure windows', 'Jendela gambar'));
  tabs.hidden = true;
  const cw = document.createElement('div');
  cw.className = 'cd-cw';
  cw.tabIndex = 0;
  cw.setAttribute('role', 'img');
  const descId = `cd-desc-${uid}`;
  const desc = document.createElement('div');
  desc.id = descId;
  desc.className = 'cd-sr';
  cw.setAttribute('aria-describedby', descId);
  const foot = document.createElement('div');
  foot.className = 'cd-foot';
  const footL = document.createElement('span');
  const footR = document.createElement('span');
  foot.append(footL, footR);
  foot.setAttribute('aria-hidden', 'true');
  win.append(winH, tabs, cw, foot, desc);
  const keyHint = document.createElement('p');
  keyHint.className = 'cd-key';
  keyHint.innerHTML = esc(T('Point at the chart to read values.', 'Arahkan penunjuk ke grafik untuk membaca nilai.'))
    + ` <b>${esc(T('Keys on the chart:', 'Tombol pada grafik:'))}</b> ← → ${esc(T('data points', 'titik data'))}, ↑ ↓ ${esc(T('data set', 'kumpulan data'))}, ${esc(T('Home/End first/last.', 'Home/End pertama/terakhir.'))}`;
  figWrap.append(win, keyHint);
  const cv = createCanvas(cw);
  cv.canvas.setAttribute('aria-hidden', 'true');
  const cwRo = new ResizeObserver(() => requestDraw());
  cwRo.observe(cw);

  // statistics panel
  const statWrap = document.createElement('section');
  statWrap.className = 'cd-stats';
  statWrap.setAttribute('aria-label', T('Data and statistics', 'Data dan statistik'));
  const statH = document.createElement('h3');
  statH.textContent = T('Data and statistics', 'Data dan statistik');
  const selRow = document.createElement('div');
  selRow.className = 'row';
  const selLab = document.createElement('label');
  selLab.htmlFor = `cd-ser-${uid}`;
  selLab.textContent = T('Data set', 'Kumpulan data');
  const serSel = document.createElement('select');
  serSel.id = `cd-ser-${uid}`;
  selRow.append(selLab, serSel);
  const chips = document.createElement('dl');
  chips.className = 'cd-chips';
  const statNote = document.createElement('p');
  statNote.className = 'cd-note';
  const tableDet = document.createElement('details');
  const tableSum = document.createElement('summary');
  tableSum.textContent = T('Data table', 'Tabel data');
  const tableWrap = document.createElement('div');
  tableWrap.className = 'cd-tablewrap';
  tableWrap.tabIndex = 0;
  tableWrap.setAttribute('role', 'region');
  tableWrap.setAttribute('aria-label', T('Data table', 'Tabel data'));
  tableDet.append(tableSum, tableWrap);
  const statEmpty = document.createElement('p');
  statEmpty.className = 'cd-empty';
  statWrap.append(statH, selRow, chips, statNote, tableDet, statEmpty);

  // code panel
  const codeWrap = document.createElement('div');
  codeWrap.className = 'cd-code';
  const cp = codePanel({
    value: '', language: 'python', editable: true, minLines: 8, maxLines: narrowStart ? 14 : 24, title: 'main.py', locale: lang,
    ariaLabel: T('Python program (editable)', 'Program Python (dapat diedit)'),
    onChange: () => onCodeEdit(),
  });
  const restoreBtn = document.createElement('button');
  restoreBtn.type = 'button';
  restoreBtn.textContent = T('↺ Original code', '↺ Kode awal');
  restoreBtn.title = T('Put back the preset program', 'Kembalikan program contoh');
  restoreBtn.disabled = true;
  restoreBtn.addEventListener('click', () => loadPreset(preset.key, true));
  cp.actions.appendChild(restoreBtn);
  const legend = document.createElement('div');
  legend.className = 'cd-legend';
  legend.innerHTML = `<span><span class="cd-lsw s-next" aria-hidden="true"></span>${esc(T('amber: runs next', 'kuning: dijalankan berikutnya'))}</span>`
    + `<span><span class="cd-lsw s-ran" aria-hidden="true"></span>${esc(T('grey: already ran', 'abu-abu: sudah dijalankan'))}</span>`
    + `<span><span class="cd-lsw s-plt" aria-hidden="true"></span>${esc(T('blue: drew on the chart', 'biru: menggambar pada grafik'))}</span>`
    + `<span><span class="cd-lsw s-err" aria-hidden="true"></span>${esc(T('red: error', 'merah: galat'))}</span>`;
  codeWrap.append(cp.el, legend);

  // values for input()
  const inWrap = document.createElement('div');
  inWrap.className = 'cd-in';
  const inLab = document.createElement('label');
  inLab.htmlFor = `cd-in-${uid}`;
  inLab.textContent = T('Values for input(), one per line', 'Nilai untuk input(), satu per baris');
  const inBox = document.createElement('textarea');
  inBox.id = `cd-in-${uid}`;
  inBox.rows = 3;
  inBox.spellcheck = false;
  const inHint = document.createElement('p');
  inHint.textContent = T('When the values run out, the console asks you for the next one.', 'Jika nilainya habis, konsol akan meminta nilai berikutnya.');
  inWrap.append(inLab, inBox, inHint);
  inBox.addEventListener('input', () => { markStale(); });

  // console
  const conWrap = document.createElement('div');
  conWrap.className = 'cd-con';
  const out = consolePanel({
    minLines: 3, maxLines: narrowStart ? 7 : 9, title: T('Output (console)', 'Keluaran (konsol)'), locale: lang,
    ariaLabel: T('Program output', 'Keluaran program'),
    placeholder: T('print() output and error messages appear here.', 'Keluaran print() dan pesan galat muncul di sini.'),
  });
  conWrap.appendChild(out.el);

  // two columns on wide stages, one column (chart first) on narrow ones
  const colA = document.createElement('div');
  colA.className = 'cd-col';
  const colB = document.createElement('div');
  colB.className = 'cd-col';
  let wideNow = null;
  function placePanels() {
    const wide = main.clientWidth >= 720;
    if (wide === wideNow) return;
    wideNow = wide;
    main.classList.toggle('is-wide', wide);
    if (wide) { colA.append(codeWrap, inWrap, conWrap); colB.append(figWrap, statWrap); grid.append(bar, colA, colB); }
    else { grid.append(figWrap, bar, codeWrap, inWrap, conWrap, statWrap); colA.remove(); colB.remove(); }
  }
  placePanels();
  const ro = new ResizeObserver(() => { placePanels(); requestDraw(); });
  ro.observe(main);

  // ------------------------------------------------------------------ side controls
  let preset = PRESETS.find((p) => p.key === DEFAULT_PRESET) || PRESETS[0];
  const progSel = select({
    label: T('Program', 'Program'), key: 'program', value: preset.key,
    options: PRESETS.map((p, i) => ({ value: p.key, label: `${i + 1}. ${p.name[lang]}` })),
    onChange: (v) => loadPreset(v, true),
  });
  const tip = document.createElement('p');
  tip.className = 'cd-tip';
  tip.setAttribute('aria-live', 'polite');
  let speedIdx = DEFAULT_SPEED;
  const speedSl = slider({
    label: T('Run speed', 'Kecepatan jalan'), key: 'speed', min: 0, max: SPEEDS.length - 1, step: 1, value: speedIdx,
    format: (i) => T(`${num(SPEEDS[i])} line${SPEEDS[i] === 1 ? '' : 's'}/s`, `${num(SPEEDS[i])} baris/detik`),
    onInput: (i) => { speedIdx = i; },
  });
  let showOverlay = false;
  const ovTg = toggle({ label: T('Show mean and median on the chart', 'Tampilkan rata-rata dan median pada grafik'), key: 'mean-median', value: false, onChange: (on) => { showOverlay = on; requestDraw(); } });
  let animOn = !reduceMotion;
  const animTg = toggle({ label: T('Animate the drawing', 'Animasikan penggambaran'), key: 'animate', value: animOn, onChange: (on) => { animOn = on; if (!on) { anims.clear(); requestDraw(); } } });
  const lab = labPanel({
    title: 'Class data lab',
    filename: 'class-data-charts-data.csv',
    columns: [
      { key: 'program', label: 'Program' },
      { key: 'dataset', label: 'Data set' },
      { key: 'n', label: 'n' },
      { key: 'mean', label: 'Mean' },
      { key: 'median', label: 'Median' },
      { key: 'mode', label: 'Mode' },
      { key: 'min', label: 'Min' },
      { key: 'max', label: 'Max' },
    ],
    procedure: [
      'Program 1 (line): run it and record the scores. Is the mean above or below the median?',
      'Program 4 (class average): record, then turn on "Show mean and median". Which one does the score of 45 pull down?',
      'Program 4: change 45 to 75 in the code, run again and record. How much do the mean and the median change?',
      'Program 5 (scatter): record the scores (y) and the study hours (x).',
      'Program 9 (your own scores): type five of your own scores in the input box, run and record.',
      'Make your own: chart a small data set from your class (for example shoe sizes or travel times) and record it.',
    ],
    predict: 'Before running program 4: the class has one very low score. Will the mean be higher or lower than the median? Why?',
    source: () => labRow(),
  });
  ctrlPanel.append(progSel.el, tip, speedSl.el, ovTg.el, animTg.el, lab.el);

  // ------------------------------------------------------------------ state
  const ctx = cv.ctx;
  let edited = false, stale = true, destroyed = false;
  let sess = null;            // the run being shown
  let total = null;           // number of steps of the whole program (null = unknown: it waits for input)
  let seed = 1;
  let playing = false, lastTick = 0, acc = 0, raf = 0, needDraw = true;
  let waiting = false;        // the console prompt is open
  let figSel = null;          // id of the figure shown in the window
  let serKey = null, focusIdx = null, hover = null;
  const anims = new Map();    // artist → start time
  let hlState = null;         // { kind, fig, t0 }
  let L = null;               // layout of the figure drawn last
  let lastDesc = '';
  const announce = (msg) => { live.textContent = ''; requestAnimationFrame(() => { if (!destroyed) live.textContent = msg; }); };

  function newSession(code, inputs) {
    const host = createPlt({ pyRepr });
    const s = { host, run: null, compileError: null, segs: [], steps: 0, nextLine: null, ended: null, error: null, visited: new Set(), warn: 0, lastCalls: [], lastLine: null, inputs: inputs.slice(), inputsUsed: 0, waiting: false };
    const c = compile(code, { filename: 'main.py' });
    if (!c.ok) { s.compileError = c.error; s.ended = 'error'; s.error = c.error; return s; }
    s.lines = c.lines;
    s.run = createRun(c.program, { inputs: [], echoInput: true, maxSteps: MAX_STEPS, seed, modules: { 'matplotlib.pyplot': host.module }, hostArgs: 'typed', locale: lang });
    advance(s);   // up to the first line: it is "next"
    s.steps = 0;
    s.visited.clear();
    return s;
  }
  /** run until the next line event (one step), the end, an error or an input() that waits */
  function advance(s) {
    if (!s.run || s.ended) return;
    const before = s.host.S.calls.length;
    if (s.nextLine !== null) s.visited.add(s.nextLine);
    s.lastLine = s.nextLine;
    for (let guard = 0; guard < 200000; guard++) {
      if (s.run.status === 'waiting-input') {
        if (s.inputsUsed < s.inputs.length) { s.run.provideInput(s.inputs[s.inputsUsed++]); s.waiting = false; continue; }
        s.waiting = true; break;
      }
      let ev;
      try { ev = s.run.step(); } catch (e) {
        s.error = { type: 'InternalError', message: String(e && e.message), traceback: `Traceback (most recent call last):\nInternalError: ${e && e.message}`, line: s.nextLine };
        s.ended = 'error'; s.segs.push({ text: s.error.traceback + '\n', kind: 'err' }); break;
      }
      if (ev.kind === 'line') { s.host.setLine(ev.line); s.nextLine = ev.line; s.steps++; s.waiting = false; break; }
      if (ev.kind === 'output') s.segs.push({ text: ev.text, kind: ev.echo ? 'in' : ev.stderr ? 'err' : 'out' });
      else if (ev.kind === 'input') continue;
      else if (ev.kind === 'exception') {
        s.error = ev.error; s.ended = 'error'; s.nextLine = null; s.steps++;
        // a traceback follows the output straight away, as in python3; the simulator's step-limit note gets a line
        const lastSeg = s.segs[s.segs.length - 1];
        if (ev.error.simulatorLimit && lastSeg && !lastSeg.text.endsWith('\n')) s.segs.push({ text: '\n', kind: 'out' });
        s.segs.push({ text: String(ev.error.traceback).replace(/\n?$/, '\n'), kind: 'err' });
        break;
      } else if (ev.kind === 'done') { s.ended = 'done'; s.nextLine = null; s.steps++; break; }
    }
    // matplotlib warnings (printed by Python on stderr)
    const W = s.host.S.warnings;
    for (; s.warn < W.length; s.warn++) {
      const w = W[s.warn];
      const srcLine = (s.lines[w.line - 1] || '').trim();
      s.segs.splice(s.segs.length - (s.ended === 'error' ? 1 : 0), 0, { text: `main.py:${w.line}: ${w.text}\n  ${srcLine}\n`, kind: 'info' });
    }
    s.lastCalls = s.host.S.calls.slice(before);
  }
  /**
   * console pieces from index `from` on, with neighbours of the same kind joined: the console then gets one update per
   * run of text instead of one per print() (thousands of separate updates of a long output freeze the page)
   */
  function joinSegs(segs, from = 0) {
    const res = [];
    for (let i = from; i < segs.length; i++) {
      const g = segs[i], last = res[res.length - 1];
      if (last && last.kind === g.kind) last.text += g.text; else res.push({ text: g.text, kind: g.kind });
    }
    return res;
  }
  const inputLines = () => { const v = inBox.value.replace(/\r/g, ''); if (!v.trim()) return []; const a = v.split('\n'); if (a[a.length - 1] === '') a.pop(); return a; };
  function build(n) {   // a fresh run advanced n steps (no animation)
    const s = newSession(cp.value, inputLines());
    for (let i = 0; i < n && !s.ended && !s.waiting; i++) advance(s);
    return s;
  }
  function measureTotal() {
    const s = build(MAX_STEPS + 5);
    total = s.waiting ? null : s.steps;
  }
  function prepare() {
    stopPlay();
    cancelWait();
    seed = (Date.now() % 100000) + 1;
    sess = build(0);
    stale = false;
    anims.clear(); hlState = null; focusIdx = null;
    measureTotal();
    figSel = null;
    out.clear();
    if (sess.compileError) out.set(String(sess.compileError.traceback).replace(/\n?$/, '\n'), { error: sess.compileError.traceback });
    renderAll();
  }
  function markStale() {
    if (!stale) { stale = true; stopPlay(); cancelWait(); }
    renderButtons();
    setStatus(`<b>${esc(T('The program changed.', 'Program berubah.'))}</b> ${esc(T('Press Run, Step or Instant to run the new version.', 'Tekan Jalankan, Langkah, atau Langsung untuk menjalankan versi baru.'))}`);
  }
  function onCodeEdit() {
    edited = true;
    restoreBtn.disabled = false;
    updateInputVisibility();
    markStale();
  }
  function updateInputVisibility() {
    inWrap.hidden = !/\binput\s*\(/.test(cp.value) && !inBox.value.trim();
    inBox.rows = Math.min(6, Math.max(3, inBox.value.split('\n').length));
  }
  function loadPreset(key, announceIt) {
    const p = PRESETS.find((q) => q.key === key) || PRESETS[0];
    preset = p;
    if (progSel.value !== p.key) progSel.value = p.key;
    cp.value = p.code[lang];
    inBox.value = p.inputs || '';
    edited = false;
    restoreBtn.disabled = true;
    tip.innerHTML = `<b>${esc(T('Look for:', 'Perhatikan:'))}</b> ${esc(p.tip[lang])}`;
    updateInputVisibility();
    prepare();
    setStatus(`<b>${esc(T('Predict first:', 'Tebak dulu:'))}</b> ${esc(T('what will the chart look like? Then press Run, or Step to run one line at a time.', 'seperti apa grafiknya nanti? Lalu tekan Jalankan, atau Langkah untuk menjalankan satu baris demi satu baris.'))}`);
    if (announceIt) announce(T(`Program ${p.name.en} loaded.`, `Program ${p.name.id} dimuat.`));
  }

  // ------------------------------------------------------------------ actions
  function ensureFresh() { if (stale || !sess) { prepare(); return true; } return false; }
  function stepOnce(animate) {
    if (!sess || sess.ended) return false;
    if (sess.waiting) { askInput(); return false; }
    const prevSegs = sess.segs.length;
    advance(sess);
    for (const g of joinSegs(sess.segs, prevSegs)) out.append(g.text, g.kind);
    noteCalls(sess.lastCalls, animate);
    if (sess.waiting) askInput();
    return true;
  }
  function stepForward() {
    if (waiting) { focusPrompt(); return; }
    if (ensureFresh()) return;
    if (sess.compileError) { renderAll(); return; }
    if (sess.ended) { prepare(); return; }
    stopPlay();
    stepOnce(true);
    renderAll();
    describeStep(true);
  }
  function stepBack() {
    if (stale || !sess || sess.compileError) return;
    const n = sess.steps;
    if (n <= 0) return;
    stopPlay();
    cancelWait();
    seekTo(n - 1);
    describeStep(true, true);
  }
  function seekTo(n) {
    sess = build(Math.max(0, n));
    anims.clear(); hlState = null;
    figSel = null;
    noteCalls(sess.host.S.calls, false);
    hlState = null;
    for (const c of sess.lastCalls) if (['title', 'xlabel', 'ylabel', 'legend', 'grid', 'xlim', 'ylim', 'xticks', 'yticks'].includes(c.kind)) hlState = { kind: c.kind, fig: c.fig, t0: performance.now(), keep: true };
    out.set(sess.segs.length ? joinSegs(sess.segs) : '');
    renderAll();
    if (sess.waiting) askInput();
  }
  function togglePlay() {
    if (playing) { stopPlay(); renderButtons(); announce(T('Paused.', 'Dijeda.')); return; }
    if (waiting) { focusPrompt(); return; }
    const fresh = ensureFresh();
    if (sess.compileError) { renderAll(); describeStep(true); return; }
    if (!fresh && sess.ended) prepare();
    playing = true;
    acc = 1;   // the first line runs at once
    lastTick = 0;
    startLoop();
    renderButtons();
  }
  function stopPlay() { playing = false; }
  function toEnd() {
    if (waiting) { focusPrompt(); return; }
    ensureFresh();
    if (sess.compileError) { renderAll(); describeStep(true); return; }
    stopPlay();
    const prev = sess.segs.length;
    let guard = 0;
    while (!sess.ended && !sess.waiting && guard++ < MAX_STEPS + 5) { advance(sess); noteCalls(sess.lastCalls, false); }
    hlState = null;
    for (const g of joinSegs(sess.segs, prev)) out.append(g.text, g.kind);
    if (sess.waiting) { resumeMode = 'end'; askInput(); }
    if (animOn) {
      // let the figure in the window appear with its drawing animation
      const f = currentFigure();
      // one artist after another, but the whole figure within about 1.5 s however many artists the program made
      if (f && f.ax) { const now = performance.now(), gap = Math.min(120, 1200 / Math.max(1, f.ax.artists.length)); f.ax.artists.forEach((a, i) => anims.set(a, now + i * gap)); }
    }
    renderAll();
    describeStep(true);
  }
  function restart() { prepare(); describeStep(false); }

  // input() that waits: a prompt at the end of the console
  let resumeMode = null;   // 'play' | 'end': what to do after the value is typed
  function askInput() {
    if (waiting || !sess || !sess.waiting) return;
    waiting = true;
    if (playing) resumeMode = 'play';
    stopPlay();
    renderButtons();
    setStatus(`<b>${esc(T('input() is waiting.', 'input() sedang menunggu.'))}</b> ${esc(T('Type a value in the console and press Enter (or add it to the input box).', 'Ketik nilai di konsol lalu tekan Enter (atau tambahkan ke kotak input).'))}`);
    const mySess = sess;
    out.prompt({ placeholder: T('type a value, then Enter', 'ketik nilai, lalu Enter'), echo: false, focus: true }).then((v) => {
      waiting = false;
      if (v === null || destroyed || mySess !== sess) { renderButtons(); return; }
      // keep the answer in the input box, so that Back and Reset replay it
      const cur = inBox.value.replace(/\s+$/, '');
      inBox.value = cur ? `${cur}\n${v}` : v;
      updateInputVisibility();
      sess.inputs.push(v);
      sess.waiting = false;   // advance() hands the value to input() and runs on to the next line
      stepOnce(true);
      measureTotal();
      renderAll();
      describeStep(true);
      const mode = resumeMode;
      resumeMode = null;
      if (mode === 'play' && !sess.ended && !sess.waiting) togglePlay();
      else if (mode === 'end' && !sess.ended && !sess.waiting) toEnd();
    });
  }
  function cancelWait() { resumeMode = null; if (waiting) { waiting = false; out.cancelPrompt(); } }
  function focusPrompt() { const i = out.el.querySelector('input'); if (i) i.focus(); }

  // calls made by the last step: animations, highlights, the figure to show
  function noteCalls(calls, animate) {
    const now = performance.now();
    for (const c of calls) {
      if (c.fig !== null && c.fig !== undefined && c.kind !== 'close') figSel = c.fig;
      if (c.kind === 'show' && c.figs && c.figs.length) figSel = c.figs[c.figs.length - 1];
      if (animate && animOn && c.artist) anims.set(c.artist, now);
      if (['title', 'xlabel', 'ylabel', 'legend', 'grid', 'xlim', 'ylim', 'xticks', 'yticks'].includes(c.kind)) hlState = { kind: c.kind, fig: c.fig, t0: now, keep: !animate || !animOn };
    }
    if (animate && (anims.size || hlState)) startLoop();
  }

  // ------------------------------------------------------------------ figures in the window
  function figureList() {
    if (!sess) return [];
    const S = sess.host.S;
    const list = S.shown.map((f) => ({ f, state: 'shown' }));
    for (const f of S.open) list.push({ f, state: sess.ended === 'error' ? 'stopped' : sess.ended ? 'never' : 'open' });
    return list;
  }
  function currentFigure() {
    const list = figureList();
    if (!list.length) return null;
    const hit = list.find((e) => e.f.id === figSel);
    return (hit || list[list.length - 1]).f;
  }
  function currentEntry() {
    const list = figureList();
    return list.find((e) => e.f.id === figSel) || list[list.length - 1] || null;
  }
  function renderTabs() {
    const list = figureList();
    tabs.hidden = list.length < 2;
    tabs.textContent = '';
    if (list.length < 2) return;
    const cur = currentFigure();
    list.forEach((e, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `s-${e.state === 'shown' ? 'shown' : 'open'}`;
      b.setAttribute('aria-pressed', String(e.f === cur));
      const st = e.state === 'shown' ? T('shown', 'ditampilkan') : e.state === 'open' ? T('not shown yet', 'belum ditampilkan') : e.state === 'stopped' ? T('not shown: the program stopped', 'tidak ditampilkan: program berhenti') : T('never shown', 'tidak pernah ditampilkan');
      b.textContent = `${i + 1}. Figure ${e.f.num}`;
      b.setAttribute('aria-label', `${T('Window', 'Jendela')} ${i + 1}: Figure ${e.f.num}, ${st}`);
      b.title = st;
      b.addEventListener('click', () => { figSel = e.f.id; focusIdx = null; renderAll(); });
      tabs.appendChild(b);
    });
  }

  // ------------------------------------------------------------------ drawing loop
  function requestDraw() { needDraw = true; startLoop(); }
  function startLoop() { if (!raf && !destroyed) raf = requestAnimationFrame(frame); }
  function frame(ts) {
    raf = 0;
    if (destroyed) return;
    let more = false;
    if (playing) {
      if (!lastTick) lastTick = ts;
      acc += (ts - lastTick) / 1000 * SPEEDS[speedIdx];
      lastTick = ts;
      let n = 0;
      while (acc >= 1 && playing && n < 4) {
        acc -= 1; n++;
        if (!sess || sess.ended) { stopPlay(); break; }
        stepOnce(true);
        renderAll();
        describeStep(false);
        if (sess.ended || sess.waiting) { stopPlay(); describeStep(true); }
      }
      if (playing) more = true; else renderButtons();
    }
    if (anims.size || (hlState && !hlState.keep)) { needDraw = true; more = true; }
    if (needDraw) draw(ts);
    if (more && !raf) raf = requestAnimationFrame(frame);
  }
  function animProgress(now) {
    const m = new Map();
    const dur = Math.max(260, Math.min(900, 1100 / SPEEDS[speedIdx]));
    for (const [a, t0] of anims) {
      const t = (now - t0) / dur;
      if (t >= 1) anims.delete(a); else m.set(a, Math.max(0, t));
    }
    return m;
  }
  function draw(ts) {
    needDraw = false;
    const now = ts || performance.now();
    const W = cv.width, H = cv.height;
    if (!W || !H) return;
    const f = currentFigure();
    ctx.save();
    ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
    if (!f) {
      L = null;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#64748b';
      ctx.font = `600 ${Math.max(13, Math.min(17, W / 32)).toFixed(1)}px ${FONT_STACK}`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const msg = sess && sess.compileError ? T('The program has a syntax error: nothing was drawn.', 'Program memiliki galat sintaksis: tidak ada yang digambar.')
        : sess && sess.ended ? T('This program did not draw a figure.', 'Program ini tidak menggambar figure.')
          : T('No figure yet: plt.plot(), plt.bar() … create one.', 'Belum ada figure: plt.plot(), plt.bar() … membuatnya.');
      wrapText(ctx, msg, W / 2, H / 2 - 12, W - 40, 22);
      ctx.font = `${Math.max(12, Math.min(15, W / 36)).toFixed(1)}px ${FONT_STACK}`;
      if (!sess || (!sess.ended && sess.steps === 0)) wrapText(ctx, T('Predict the chart, then press Run.', 'Tebak grafiknya, lalu tekan Jalankan.'), W / 2, H / 2 + 26, W - 40, 20);
      ctx.restore();
      return;
    }
    const k = Math.min(1.389, Math.max(1.08, W / (f.figsize[0] * 72)));
    L = layoutFigure(ctx, f, W, H, k);
    const prog = animOn ? animProgress(now) : new Map();
    let hl = null;
    if (hlState && hlState.fig === f.id) {
      const age = (now - hlState.t0) / 1400;
      const a = hlState.keep ? 0.8 : Math.max(0, 1 - age);
      if (a > 0) hl = { kind: hlState.kind, a }; else hlState = null;
    }
    const ser = currentSeries();
    let overlay = null;
    if (showOverlay && ser) {
      const ss = seriesStats(ser);
      // the values as Python prints them, unless that is long (78.33333333333333)
      const txt = (p, v) => (p && p.length <= 9 ? p : num(v));
      if (ss) overlay = { axis: ser.axis, mean: ss.st.mean, median: ss.st.median, labels: [`${T('mean', 'rata-rata')} ${txt(ss.py.mean, ss.st.mean)}`, `median ${txt(ss.py.median, ss.st.median)}`] };
    }
    let focus = null;
    const fp = focusPoint();
    if (fp) focus = fp;
    const entry = currentEntry();
    drawFigure(ctx, L, { anim: prog, hl, overlay, focus, dim: !!entry && (entry.state === 'never' || entry.state === 'stopped') });
    if (entry && entry.state !== 'shown') {
      // a figure that plt.show() has not shown (yet): a dashed frame and a note
      ctx.save();
      ctx.strokeStyle = entry.state === 'open' ? 'rgba(217,119,6,0.9)' : 'rgba(220,38,38,0.9)';
      ctx.setLineDash([8, 5]); ctx.lineWidth = 3;
      ctx.strokeRect(1.5, 1.5, W - 3, H - 3);
      ctx.restore();
    }
    ctx.restore();
  }
  function wrapText(c, text, x, y, maxW, lh) {
    const words = text.split(' ');
    const rows = [];
    let cur = '';
    for (const w of words) { const t = cur ? cur + ' ' + w : w; if (c.measureText(t).width > maxW && cur) { rows.push(cur); cur = w; } else cur = t; }
    if (cur) rows.push(cur);
    rows.forEach((r, i) => c.fillText(r, x, y + (i - (rows.length - 1) / 2) * lh));
  }

  // ------------------------------------------------------------------ data sets, statistics and reading points
  /** the source text of the argument that holds a data set's values (e.g. "scores"), or null */
  function seriesArg(s) {
    const a = s.artist;
    if (!sess || !sess.lines || !a.line || !a.fn) return null;
    const args = callArgs(sess.lines, a.line, a.fn);
    if (!args) return null;
    const fn = a.fn.replace(/^.*\./, '');
    if (fn === 'plot') return args.pos.length >= 2 && !/^["']/.test(args.pos[1]) ? args.pos[1] : (args.pos[0] ?? null);
    if (fn === 'bar') return args.pos[1] ?? args.kw.height ?? null;
    if (fn === 'barh') return args.pos[1] ?? args.kw.width ?? null;
    if (fn === 'scatter') return (s.axis === 'y' ? (args.pos[1] ?? args.kw.y) : (args.pos[0] ?? args.kw.x)) ?? null;
    return null;
  }
  function seriesName(s, i) {
    const a = s.artist;
    const kindName = s.kind === 'line' ? T('line', 'garis') : s.kind === 'bar' ? T('bars', 'batang') : s.kind === 'barh' ? T('bars', 'batang')
      : s.axis === 'y' ? T('dots, y', 'titik, y') : T('dots, x', 'titik, x');
    let src = seriesArg(s);
    if (src && src.length > 28) src = src.slice(0, 26) + '…';
    const label = a.label || (a.labels && a.labels.join(', ')) || null;
    return { kindName, src, label, text: `${i + 1}. ${kindName}: ${src || label || '—'}${label && src && label !== src ? ` (${label})` : ''}` };
  }
  /** { st (JS numbers), py (the texts Python prints) } of a numeric data set, or null */
  function seriesStats(s) {
    if (!s || s.text) return null;
    const st = stats(s.values);
    if (!st) return null;
    const reprs = s.reprs || null;   // the Python reprs the program's values had (figureSeries)
    const py = pyStats(s.values, reprs) || { mean: num(st.mean, 6), median: num(st.median, 6), mode: num(st.mode, 6), min: num(st.min, 6), max: num(st.max, 6), range: num(st.max - st.min, 6), multimode: '' };
    return { st, py, reprs };
  }
  function seriesList() { return L && L.series ? L.series : []; }
  function currentSeries() {
    const list = seriesList();
    if (!list.length) return null;
    return list.find((s) => s.key === serKey) || list[0];
  }
  const fmtVal = (v) => num(v, 4);
  function axisVal(axis, v) {
    const cat = L && L.ax && L.ax[axis + 'cat'];
    if (cat) for (const [k, j] of cat) if (j === v) return k;
    return fmtVal(v);
  }
  const valText = (s, i) => (s.text ? s.texts[i] : fmtVal(s.values[i]));
  function pointText(s, i) {
    if (s.kind === 'scatter') { const a = s.artist; return `(${axisVal('x', a.x[i])}, ${axisVal('y', a.y[i])})`; }
    const lab = s.labels[i];
    return `${typeof lab === 'number' ? fmtVal(lab) : lab}: ${valText(s, i)}`;
  }
  function focusPoint() {
    const s = currentSeries();
    if (hover && L) return hover;
    if (!s || focusIdx === null || !L) return null;
    const p = s.pts.find((q) => q.i === focusIdx);
    if (!p) return null;
    return { x: p.x, y: p.y, text: pointText(s, focusIdx) };
  }
  function renderStats() {
    const list = seriesList();
    const f = currentFigure();
    statEmpty.hidden = !!list.length;
    selRow.hidden = chips.hidden = statNote.hidden = tableDet.hidden = !list.length;
    if (!list.length) {
      statEmpty.textContent = f ? T('This figure has no data yet.', 'Figure ini belum berisi data.') : T('Run a program: the numbers plotted on the chart appear here with their mean, median and mode.', 'Jalankan program: angka-angka yang digambar pada grafik muncul di sini beserta rata-rata, median, dan modusnya.');
      serKey = null;
      return;
    }
    const cur = currentSeries();
    serKey = cur.key;
    const names = list.map((s, i) => seriesName(s, i));
    const opts = list.map((s, i) => `<option value="${esc(s.key)}"${s === cur ? ' selected' : ''}>${esc(names[i].text)}</option>`).join('');
    if (serSel.dataset.k !== opts) { serSel.innerHTML = opts; serSel.dataset.k = opts; }
    serSel.value = cur.key;
    const nm = names[list.indexOf(cur)];
    const chip = (cls, k, v) => `<div class="${cls}"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`;
    const head = cur.kind === 'scatter' ? [cur.axis === 'y' ? 'x' : 'y', cur.axis] : [T('label', 'label'), T('value', 'nilai')];
    const table = (rows) => { tableWrap.innerHTML = `<table class="cd-table"><thead><tr><th>${esc(head[0])}</th><th>${esc(head[1])}</th></tr></thead><tbody>${rows}</tbody></table>`; };
    const labText = (i) => { const lab = cur.kind === 'scatter' ? (cur.axis === 'y' ? axisVal('x', cur.artist.x[i]) : axisVal('y', cur.artist.y[i])) : cur.labels[i]; return typeof lab === 'number' ? fmtVal(lab) : lab; };
    if (cur.text) {
      // text data: a category axis, nothing to average
      chips.innerHTML = chip('', 'n', String(cur.values.length));
      statNote.innerHTML = esc(T('These values are text (str), not numbers: matplotlib puts each different text on the axis in the order it first appears, like names, so the axis is not sorted and there is no mean or median. Convert the values with int() or float() first, for example int(input()).',
        'Nilai-nilai ini berupa teks (str), bukan bilangan: matplotlib menaruh setiap teks yang berbeda pada sumbu sesuai urutan kemunculannya, seperti nama, jadi sumbunya tidak urut dan tidak ada rata-rata atau median. Ubah dulu nilainya dengan int() atau float(), misalnya int(input()).'));
      let rows = '';
      cur.values.forEach((val, i) => { rows += `<tr${focusIdx === i ? ' class="is-focus"' : ''}><td>${esc(labText(i))}</td><td class="n">${esc(cur.texts[i])}</td></tr>`; });
      table(rows);
      return;
    }
    const ss = seriesStats(cur);
    if (!ss) { chips.innerHTML = ''; statNote.textContent = ''; table(''); return; }
    const { st, py, reprs } = ss;
    chips.innerHTML = chip('', 'n', String(st.n)) + chip('c-mean', T('mean', 'rata-rata'), py.mean) + chip('c-median', 'median', py.median)
      + chip('', T('mode', 'modus'), py.mode) + chip('', 'min', py.min) + chip('', 'max', py.max) + chip('', T('range', 'jangkauan'), py.range);
    const v = nm.src && /^[A-Za-z_]\w*$/.test(nm.src) ? nm.src : T('data', 'data');
    let modeNote;
    if (st.modeCount === 1) modeNote = T(`Every value appears once, so statistics.mode(${v}) gives the first one: ${py.mode}.`, `Setiap nilai muncul sekali, jadi statistics.mode(${v}) memberi nilai pertama: ${py.mode}.`);
    else if (st.modes.length > 1) modeNote = T(`statistics.multimode(${v}) is ${py.multimode || st.modes.join(', ')}: each appears ${st.modeCount} times, and statistics.mode(${v}) gives the first one, ${py.mode}.`, `statistics.multimode(${v}) adalah ${py.multimode || st.modes.join(', ')}: masing-masing muncul ${st.modeCount} kali, dan statistics.mode(${v}) memberi yang pertama, ${py.mode}.`);
    else modeNote = T(`${py.mode} appears ${st.modeCount} times.`, `${py.mode} muncul ${st.modeCount} kali.`);
    const pull = Math.abs(st.mean - st.median) < 1e-9 ? T('The mean equals the median.', 'Rata-rata sama dengan median.')
      : st.mean < st.median ? T('The mean is below the median: some low values pull it down.', 'Rata-rata di bawah median: ada nilai rendah yang menariknya turun.')
        : T('The mean is above the median: some high values pull it up.', 'Rata-rata di atas median: ada nilai tinggi yang menariknya naik.');
    statNote.innerHTML = `${esc(pull)} ${esc(modeNote)} ${esc(T('In Python:', 'Di Python:'))} <code>statistics.mean(${esc(v)})</code>, <code>statistics.median(${esc(v)})</code>, <code>statistics.mode(${esc(v)})</code>, <code>max(${esc(v)})</code>.`;
    // data table (largest and smallest marked)
    let rows = '';
    cur.values.forEach((val, i) => {
      if (!Number.isFinite(val)) return;
      const cls = [val === st.max ? 'is-max' : '', val === st.min ? 'is-min' : '', focusIdx === i ? 'is-focus' : ''].filter(Boolean).join(' ');
      rows += `<tr${cls ? ` class="${cls}"` : ''}><td>${esc(labText(i))}</td><td class="n">${esc(reprs ? reprs[i] : fmtVal(val))}</td></tr>`;
    });
    table(rows);
  }
  serSel.addEventListener('change', () => { serKey = serSel.value; focusIdx = null; renderStats(); requestDraw(); });
  function labRow() {
    const s = currentSeries();
    const ss = seriesStats(s);
    if (!ss) return null;
    const { st } = ss;
    const nm = seriesName(s, seriesList().indexOf(s));
    return {
      program: edited ? `${preset.key} (edited)` : preset.key, dataset: nm.src || nm.label || nm.kindName,
      n: st.n, mean: +num(st.mean, 4), median: +num(st.median, 4), mode: +num(st.mode, 4), min: +num(st.min, 4), max: +num(st.max, 4),
    };
  }

  // pointer and keyboard reading of the chart
  cv.canvas.style.touchAction = 'manipulation';
  cv.canvas.addEventListener('pointermove', (e) => {
    if (!L || !L.box) { if (hover) { hover = null; requestDraw(); } footL.textContent = ''; return; }
    const r = cv.canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const b = L.box;
    let best = null;
    for (const s of L.series) for (const p of s.pts) { const d = Math.hypot(p.x - x, p.y - y); if (d < 14 && (!best || d < best.d)) best = { d, s, p }; }
    if (best) { hover = { x: best.p.x, y: best.p.y, text: pointText(best.s, best.p.i) }; }
    else hover = null;
    if (x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1) footL.innerHTML = `x=<b>${esc(coordText('x', L.invX(x)))}</b> y=<b>${esc(coordText('y', L.invY(y)))}</b>`;
    else footL.textContent = '';
    requestDraw();
  });
  cv.canvas.addEventListener('pointerleave', () => { hover = null; footL.textContent = ''; requestDraw(); });
  function coordText(axis, v) {
    const ax = L.ax;
    const cat = ax && ax[axis + 'cat'];
    if (cat && cat.size) { const i = Math.round(v); for (const [k, j] of cat) if (j === i && Math.abs(v - i) < 0.5) return k; }
    const span = Math.abs((axis === 'x' ? L.xv[1] - L.xv[0] : L.yv[1] - L.yv[0]));
    const nd = Math.max(0, Math.min(6, 3 - Math.floor(Math.log10(span || 1))));
    return num(v, nd);
  }
  cw.addEventListener('keydown', (e) => {
    const list = seriesList();
    if (!list.length) return;
    let s = currentSeries();
    const n = s.values.length;
    const valid = (i) => Number.isFinite(s.values[i]);
    let handled = true;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const d = e.key === 'ArrowRight' ? 1 : -1;
      let i = focusIdx === null ? (d > 0 ? -1 : n) : focusIdx;
      do { i += d; } while (i >= 0 && i < n && !valid(i));
      if (i >= 0 && i < n) focusIdx = i;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const j = list.indexOf(s) + (e.key === 'ArrowDown' ? 1 : -1);
      if (j >= 0 && j < list.length) { s = list[j]; serKey = s.key; focusIdx = Math.min(focusIdx ?? 0, s.values.length - 1); }
    } else if (e.key === 'Home') focusIdx = s.values.findIndex(Number.isFinite);
    else if (e.key === 'End') { for (let i = n - 1; i >= 0; i--) if (valid(i)) { focusIdx = i; break; } }
    else if (e.key === 'Escape') focusIdx = null;
    else handled = false;
    if (!handled) return;
    e.preventDefault();
    hover = null;
    renderStats();
    requestDraw();
    s = currentSeries();
    if (focusIdx !== null && s) announce(`${seriesName(s, list.indexOf(s)).text}. ${pointText(s, focusIdx)}`);
  });
  cw.addEventListener('blur', () => { if (focusIdx !== null) { focusIdx = null; renderStats(); requestDraw(); } });

  // ------------------------------------------------------------------ rendering the rest of the page
  function renderButtons() {
    const busy = waiting;
    bBack.disabled = busy || stale || !sess || sess.steps === 0 || !!sess.compileError;
    bStep.disabled = busy;
    bEnd.disabled = busy;
    bRun.textContent = playing ? T('⏸ Pause', '⏸ Jeda') : T('▶ Run', '▶ Jalankan');
    bRun.setAttribute('aria-label', playing ? T('Pause', 'Jeda') : T('Run: run the program line by line at the chosen speed', 'Jalankan: jalankan program baris demi baris dengan kecepatan yang dipilih'));
    bRun.disabled = busy;
    const n = sess ? sess.steps : 0;
    const tot = total === null ? Math.max(n, 1) : total;
    scrubIn.max = String(Math.max(tot, n));
    scrubIn.value = String(n);
    scrubIn.disabled = !sess || !!sess.compileError || stale || busy;
    count.textContent = `${T('Step', 'Langkah')} ${n}/${total === null ? '?' : total}`;
    scrubIn.setAttribute('aria-valuetext', `${T('step', 'langkah')} ${n} ${T('of', 'dari')} ${total === null ? '?' : total}`);
  }
  scrubIn.addEventListener('input', () => {
    if (!sess || stale) return;
    stopPlay();
    cancelWait();
    seekTo(Number(scrubIn.value));
    describeStep(false, true);
  });
  scrubIn.addEventListener('change', () => describeStep(true, true));
  function renderCode() {
    if (!sess) { cp.setActiveLine(null); cp.setMarks([]); return; }
    const marks = [];
    for (const l of sess.visited) marks.push({ line: l, kind: 'visited' });
    // lines that drew on the chart are blue; the line that just ran gets a note saying what it drew
    const plotLines = new Set();
    for (const c of sess.host.S.calls) if (c.line && sess.visited.has(c.line)) plotLines.add(c.line);
    const lastCall = sess.lastCalls[sess.lastCalls.length - 1];
    for (const line of plotLines) {
      const m = { line, kind: 'match' };
      if (lastCall && lastCall.line === line && !sess.error) m.note = shortNote(lastCall);
      marks.push(m);
    }
    if (sess.error && sess.error.line) {
      const m = { line: sess.error.line, kind: 'error', note: sess.error.type };
      if (sess.compileError && sess.error.col) { m.col = Math.max(0, sess.error.col - 1); if (sess.error.endCol && sess.error.endLine === sess.error.line) m.endCol = Math.max(m.col + 1, sess.error.endCol - 1); }
      marks.push(m);
    }
    cp.setMarks(marks);
    cp.setActiveLine(!sess.ended && !stale ? sess.nextLine : null);
  }
  function shortNote(c) {
    const a = c.artist;
    switch (c.kind) {
      case 'line': return T('line', 'garis') + ' ' + lineNo(c);
      case 'bars': return `${a.n} ${a.horiz ? T('h-bars', 'batang-h') : T('bars', 'batang')}`;
      case 'scatter': return `${a.x.length} ${T('dots', 'titik')}`;
      case 'hline': return `y = ${num(a.v)}`;
      case 'vline': return `x = ${num(a.v)}`;
      case 'text': return T('text', 'teks');
      case 'title': case 'suptitle': return T('title', 'judul');
      case 'xlabel': return T('x label', 'label x');
      case 'ylabel': return T('y label', 'label y');
      case 'legend': return T('legend', 'legenda');
      case 'grid': return 'grid';
      case 'xlim': return 'xlim';
      case 'ylim': return 'ylim';
      case 'xticks': return 'xticks';
      case 'yticks': return 'yticks';
      case 'figure': return 'figure';
      case 'show': return c.figs && c.figs.length ? `show ▸ ${c.figs.length} ${T('window', 'jendela')}` : 'show';
      case 'savefig': return 'savefig';
      default: return c.fn;
    }
  }
  function lineNo(c) {
    const f = sess.host.S.shown.concat(sess.host.S.open).find((g) => g.id === c.fig);
    if (!f || !f.ax) return '';
    return String(f.ax.artists.filter((a) => a.kind === 'line').indexOf(c.artist) + 1);
  }
  function renderWindow() {
    const e = currentEntry();
    if (!e) { winTitle.textContent = T('Figure (none yet)', 'Figure (belum ada)'); badge.hidden = true; }
    else {
      winTitle.textContent = `Figure ${e.f.num}`;
      badge.hidden = false;
      badge.className = `cd-badge s-${e.state === 'stopped' ? 'never' : e.state}`;
      badge.textContent = e.state === 'shown' ? T('shown by plt.show()', 'ditampilkan plt.show()') : e.state === 'open' ? T('in memory, not shown yet', 'di memori, belum ditampilkan')
        : e.state === 'stopped' ? T('not shown: the program stopped', 'tidak ditampilkan: program berhenti') : T('never shown: no plt.show()', 'tidak pernah ditampilkan: tanpa plt.show()');
      const asp = Math.min(2.2, Math.max(1, e.f.figsize[0] / e.f.figsize[1]));
      cw.style.aspectRatio = `${asp}`;
    }
    if (!e) cw.style.aspectRatio = '4 / 3';
    renderTabs();
  }
  function describeFigure(f) {
    if (!f) return T('No figure yet.', 'Belum ada figure.');
    if (!f.ax) return `Figure ${f.num}: ${T('empty', 'kosong')}.`;
    const ax = f.ax;
    const parts = [`Figure ${f.num}.`];
    const t = ax.titles.center || ax.titles.left || ax.titles.right;
    if (t) parts.push(`${T('Title', 'Judul')}: ${t.text}.`);
    const xv = viewLimits(ax, 'x'), yv = viewLimits(ax, 'y');
    const axisWords = (n, v) => {
      const lab = ax[n + 'label'] && ax[n + 'label'].text;
      const cat = ax[n + 'cat'];
      return `${T(`${n} axis`, `sumbu ${n}`)}${lab ? ` "${lab}"` : ''}: ${cat && cat.size ? [...cat.keys()].join(', ') : `${num(v[0])} ${T('to', 'sampai')} ${num(v[1])}`}.`;
    };
    parts.push(axisWords('x', xv), axisWords('y', yv));
    const list = figureSeries(f);
    list.forEach((s, i) => parts.push(`${seriesName(s, i).text}: ${s.values.map((v, j) => valText(s, j)).join(', ')}.`));
    if (ax.legend && ax.legend.entries.length) parts.push(`${T('Legend', 'Legenda')}: ${ax.legend.entries.map((e) => e.text).join(', ')}.`);
    return parts.join(' ');
  }
  function renderAll() {
    renderWindow();
    needDraw = true;
    draw();
    renderCode();
    renderStats();
    renderButtons();
    const f = currentFigure();
    footR.textContent = f && f.ax ? `x: ${num(viewLimits(f.ax, 'x')[0])} … ${num(viewLimits(f.ax, 'x')[1])}   y: ${num(viewLimits(f.ax, 'y')[0])} … ${num(viewLimits(f.ax, 'y')[1])}` : '';
    const d = describeFigure(f);
    if (d !== lastDesc) { desc.textContent = d; lastDesc = d; }
    cw.setAttribute('aria-label', T('Chart drawn by the program. Use the arrow keys to read the data points.', 'Grafik yang digambar program. Gunakan tombol panah untuk membaca titik data.'));
  }

  // ------------------------------------------------------------------ status messages
  function setStatus(html, isErr = false) { status.innerHTML = html; status.classList.toggle('is-err', isErr); }
  const colourWords = (a) => {
    if (a.colorSpec && !/^C\d+$/.test(a.colorSpec)) return `"${a.colorSpec}"`;
    const hex = hexOf(a.rgba);
    const i = TAB10.indexOf(hex);
    return i >= 0 ? `C${i} (${lang === 'id' ? TAB_ID[i] : TAB_NAMES[i]})` : hex;
  };
  function callText(c) {
    const a = c.artist;
    const fn = c.fn.startsWith('Axes.') ? `ax.${c.fn.slice(5)}()` : `plt.${c.fn}()`;
    const figWord = (id) => { const f = sess.host.S.shown.concat(sess.host.S.open).find((g) => g.id === id); return f ? `Figure ${f.num}` : 'Figure'; };
    switch (c.kind) {
      case 'line': return T(`<code>${fn}</code> added line ${lineNo(c)} to ${figWord(c.fig)}: ${a.x.length} points, colour ${colourWords(a)}${a.marker !== 'None' ? `, marker "${a.marker}"` : ''}${a.ls !== '-' ? `, line style "${typeof a.ls === 'string' ? a.ls : 'custom'}"` : ''}.`,
        `<code>${fn}</code> menambahkan garis ${lineNo(c)} ke ${figWord(c.fig)}: ${a.x.length} titik, warna ${colourWords(a)}${a.marker !== 'None' ? `, penanda "${a.marker}"` : ''}${a.ls !== '-' ? `, gaya garis "${typeof a.ls === 'string' ? a.ls : 'khusus'}"` : ''}.`);
      case 'bars': {
        const from0 = a.bars.every((b) => b.v0 === 0);
        return T(`<code>${fn}</code> added ${a.n} ${a.horiz ? 'horizontal ' : ''}bar${a.n === 1 ? '' : 's'}${from0 ? ' starting at 0' : ''}.`, `<code>${fn}</code> menambahkan ${a.n} batang${a.horiz ? ' mendatar' : ''}${from0 ? ' yang mulai dari 0' : ''}.`);
      }
      case 'scatter': return T(`<code>${fn}</code> added ${a.x.length} dots: one for each (x, y) pair.`, `<code>${fn}</code> menambahkan ${a.x.length} titik: satu untuk setiap pasangan (x, y).`);
      case 'hline': return T(`<code>${fn}</code> drew a horizontal line across the chart at y = ${num(a.v, 4)}.`, `<code>${fn}</code> menggambar garis mendatar selebar grafik di y = ${num(a.v, 4)}.`);
      case 'vline': return T(`<code>${fn}</code> drew a vertical line at x = ${num(a.v, 4)}.`, `<code>${fn}</code> menggambar garis tegak di x = ${num(a.v, 4)}.`);
      case 'text': return T(`<code>${fn}</code> wrote “${esc(a.s)}” on the chart.`, `<code>${fn}</code> menulis “${esc(a.s)}” pada grafik.`);
      case 'title': return T(`<code>${fn}</code> set the chart title.`, `<code>${fn}</code> mengatur judul grafik.`);
      case 'suptitle': return T(`<code>${fn}</code> set the figure title.`, `<code>${fn}</code> mengatur judul figure.`);
      case 'xlabel': return T(`<code>${fn}</code> named the x axis.`, `<code>${fn}</code> memberi nama sumbu x.`);
      case 'ylabel': return T(`<code>${fn}</code> named the y axis.`, `<code>${fn}</code> memberi nama sumbu y.`);
      case 'legend': {
        const f = sess.host.S.shown.concat(sess.host.S.open).find((g) => g.id === c.fig);
        const n = f && f.ax && f.ax.legend ? f.ax.legend.entries.length : 0;
        return n ? T(`<code>${fn}</code> added a legend with ${n} entr${n === 1 ? 'y' : 'ies'} (the label= texts).`, `<code>${fn}</code> menambahkan legenda berisi ${n} entri (teks dari label=).`)
          : T(`<code>${fn}</code> found no label= to show: Python prints a warning.`, `<code>${fn}</code> tidak menemukan label= untuk ditampilkan: Python mencetak peringatan.`);
      }
      case 'grid': return T(`<code>${fn}</code> switched the grid lines.`, `<code>${fn}</code> mengubah garis kisi (grid).`);
      case 'xlim': case 'ylim': {
        const f = sess.host.S.shown.concat(sess.host.S.open).find((g) => g.id === c.fig);
        const v = f && f.ax ? viewLimits(f.ax, c.kind[0]) : [0, 1];
        return T(`<code>${fn}</code> fixed the ${c.kind[0]} axis from ${num(v[0])} to ${num(v[1])}.`, `<code>${fn}</code> menetapkan sumbu ${c.kind[0]} dari ${num(v[0])} sampai ${num(v[1])}.`);
      }
      case 'xticks': case 'yticks': return T(`<code>${fn}</code> chose the ticks of the ${c.kind[0]} axis.`, `<code>${fn}</code> memilih tanda (tick) sumbu ${c.kind[0]}.`);
      case 'figure': return T(`<code>${fn}</code> started a new, empty ${figWord(c.fig)}.`, `<code>${fn}</code> memulai ${figWord(c.fig)} baru yang kosong.`);
      case 'show': return c.figs && c.figs.length
        ? T(`<code>${fn}</code> opened ${c.figs.map(figWord).join(' and ')} in a window. A real script waits here until the window is closed; then the figure is gone and the next plot starts a new one.`, `<code>${fn}</code> membuka ${c.figs.map(figWord).join(' dan ')} di jendela. Skrip asli menunggu di sini sampai jendela ditutup; setelah itu figure hilang dan plot berikutnya memulai figure baru.`)
        : T(`<code>${fn}</code> had nothing to show.`, `<code>${fn}</code> tidak punya gambar untuk ditampilkan.`);
      case 'savefig': return c.empty
        ? T(`<code>${fn}</code> would save “${esc(c.file)}”, but the figure is empty (was plt.show() called first?).`, `<code>${fn}</code> akan menyimpan “${esc(c.file)}”, tetapi figure-nya kosong (apakah plt.show() dipanggil lebih dulu?).`)
        : T(`<code>${fn}</code> would save the chart as “${esc(c.file)}” (this page cannot write files).`, `<code>${fn}</code> akan menyimpan grafik sebagai “${esc(c.file)}” (halaman ini tidak dapat menulis berkas).`);
      case 'close': return T(`<code>${fn}</code> closed a figure.`, `<code>${fn}</code> menutup sebuah figure.`);
      case 'clf': return T(`<code>${fn}</code> cleared the figure.`, `<code>${fn}</code> mengosongkan figure.`);
      default: return `<code>${fn}</code>`;
    }
  }
  const sentence = (m) => (/[.?!…]$/.test(m) ? m : m + '.');
  function describeStep(speak, back = false) {
    if (!sess) return;
    if (sess.compileError) {
      const e = sess.compileError;
      setStatus(`<b>${esc(e.type)} ${esc(T('on line', 'pada baris'))} ${e.line}:</b> ${esc(sentence(e.message))} ${esc(T('Python found it before running anything, so nothing was drawn. Fix the code and run again.', 'Python menemukannya sebelum menjalankan apa pun, jadi tidak ada yang digambar. Perbaiki kode lalu jalankan lagi.'))}`, true);
      if (speak) announce(`${e.type}: ${e.message}`);
      return;
    }
    if (sess.ended === 'error' && sess.error.simulatorLimit) {
      // the simulator's step limit, not a Python error (its message says so, in the page's language)
      const e = sess.error;
      setStatus(`<b>${esc(T('Line', 'Baris'))} ${e.line ?? '?'}: ${esc(T('stopped by the simulator', 'dihentikan oleh simulator'))}.</b> ${esc(sentence(e.message.charAt(0).toUpperCase() + e.message.slice(1)))}`, true);
      if (speak) announce(e.message);
      return;
    }
    if (sess.ended === 'error') {
      const e = sess.error;
      setStatus(`<b>${esc(T('Line', 'Baris'))} ${e.line ?? '?'} ${esc(T('stopped the program with', 'menghentikan program dengan'))} ${esc(e.type)}:</b> ${esc(sentence(e.message))} ${esc(T('Read the last line of the traceback in the console.', 'Baca baris terakhir traceback di konsol.'))}`, true);
      if (speak) announce(`${e.type}: ${e.message}`);
      return;
    }
    const parts = [];
    if (sess.steps === 0 && sess.ended === 'done') parts.push(`<b>${esc(T('The program is empty: there is nothing to run.', 'Programnya kosong: tidak ada yang dijalankan.'))}</b>`);
    else if (sess.steps === 0) parts.push(`<b>${esc(T('Ready.', 'Siap.'))}</b>`);
    else if (sess.lastLine) parts.push(`<b>${esc(T('Line', 'Baris'))} ${sess.lastLine} ${esc(back ? T('ran last.', 'terakhir dijalankan.') : T('ran.', 'dijalankan.'))}</b>`);
    for (const c of sess.lastCalls.slice(-2)) parts.push(callText(c));
    if (sess.ended === 'done' && sess.steps > 0) {
      const S = sess.host.S;
      const notShown = S.open.filter((f) => f.ax && f.ax.artists.length).length;
      parts.push(esc(T(`The program finished: ${S.shown.length} window${S.shown.length === 1 ? '' : 's'} shown.`, `Program selesai: ${S.shown.length} jendela ditampilkan.`)));
      if (notShown) parts.push(esc(T('A figure was drawn but plt.show() was never called: in a script no window opens (Jupyter and Colab show it anyway).', 'Ada figure yang digambar tetapi plt.show() tidak pernah dipanggil: pada skrip tidak ada jendela yang terbuka (Jupyter dan Colab tetap menampilkannya).')));
      else if (S.shown.length) parts.push(esc(T('Point at the chart or use the arrow keys to read the values.', 'Arahkan penunjuk ke grafik atau gunakan tombol panah untuk membaca nilai.')));
    } else if (sess.waiting) parts.push(esc(T('input() is waiting for a value.', 'input() menunggu sebuah nilai.')));
    else if (sess.nextLine) parts.push(esc(T(`Line ${sess.nextLine} runs next.`, `Baris ${sess.nextLine} dijalankan berikutnya.`)));
    setStatus(parts.join(' '));
    if (speak) announce(status.textContent);
  }

  // ------------------------------------------------------------------ start
  loadPreset(preset.key, false);

  return () => {
    destroyed = true;
    playing = false;
    if (raf) cancelAnimationFrame(raf);
    ro.disconnect();
    cwRo.disconnect();
    cancelWait();
    cp.destroy();
    out.destroy();
    cv.destroy();
    main.remove();
    ctrlPanel.remove();
    style.remove();
  };
}
