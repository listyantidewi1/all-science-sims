// Turtle Graphics (PP 03 section 7.3, enrichment): run Python turtle programs in the browser. The material notes that
// the turtle module does not work in Google Colab; here the program runs in minipy (src/lib/minipy.js) with a host
// `turtle` module that ports CPython 3.13's Lib/turtle.py (positions, headings, circle() chords, colours, errors are
// those of python3; altered from turtle.py, Copyright (C) 2006-2010 Gregor Lingl, zlib-style license, see
// THIRD-PARTY-NOTICES.md). Running the program first records a timeline (one entry per line run, per move, per turn); the
// page then animates it at the turtle's own speed() times the speed slider, one line at a time with Step, backwards
// with Back, or at once. The stage shows the turtle window (with a grid, the turn angle of every left/right as an
// arc, and a readout of position, heading and total turning), the editable code with the running line, and the console.
import { button, select, slider, toggle } from '../../../lib/controls.js';
import { createCanvas } from '../../../lib/canvas.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';
// pyMath: minipy's exact ports of glibc's sin/cos/atan2 and CPython's math.hypot (turtle.py's Vec2D.rotate(),
// heading() and distance() call them; JS Math.* differs from them in the last bit for ~6% of angles)
import { compile, createRun, pyMath } from '../../../lib/minipy.js';
import { codePanel, consolePanel } from '../../../lib/codepanel.js';

// PRESETS-START
// Preset programs. The Indonesian versions follow PP 03 (identifiers, messages and comments; preset 5 is the code of
// PP 03 section 7.3 as printed); the English versions are the same programs with English names. `tip` = what to look
// for (PRIMM: predict, run, investigate, modify).
const P = String.raw;
const PRESETS = [
  {
    key: 'square',
    name: { en: 'Square (for loop)', id: 'Persegi (perulangan for)' },
    tip: {
      en: 'Predict first: which way does the turtle turn at each corner? Then Run. The turtle turns 90° four times: 4 × 90° = 360°, one full turn. Modify: change 120 or 90 and predict again.',
      id: 'Tebak dulu: ke arah mana kura-kura berbelok di setiap pojok? Lalu Jalankan. Kura-kura berbelok 90° sebanyak empat kali: 4 × 90° = 360°, satu putaran penuh. Ubah: ganti 120 atau 90 lalu tebak lagi.',
    },
    code: {
      en: P`import turtle

t = turtle.Turtle()
t.shape("turtle")
t.color("green")

for i in range(4):  # four sides
    t.forward(120)
    t.left(90)      # turn 90 degrees

turtle.done()
`,
      id: P`import turtle

t = turtle.Turtle()
t.shape("turtle")
t.color("green")

for i in range(4):  # empat sisi persegi
    t.forward(120)
    t.left(90)      # belok 90 derajat

turtle.done()
`,
    },
  },
  {
    key: 'polygon',
    name: { en: 'Regular polygon (n sides)', id: 'Segi-n beraturan' },
    tip: {
      en: 'Change n to 3, 5, 8 or 12 and run again. The turtle turns by the exterior angle 360 / n at every corner, so the total turning is always 360°. The interior angle is 180° minus the turn.',
      id: 'Ganti n menjadi 3, 5, 8, atau 12 lalu jalankan lagi. Kura-kura berbelok sebesar sudut luar 360 / n di setiap pojok, sehingga total belokan selalu 360°. Sudut dalam = 180° dikurangi sudut belok.',
    },
    code: {
      en: P`import turtle

n = 6  # sides: try 3, 5, 8, 12
length = 100
angle = 360 / n  # exterior angle = the turn

print("Sides         :", n)
print("Turning angle :", angle)
print("Interior angle:", 180 - angle)

t = turtle.Turtle()
t.color("blue")
for i in range(n):
    t.forward(length)
    t.left(angle)

print("Total turning :", n * angle)
turtle.done()
`,
      id: P`import turtle

n = 6  # banyak sisi: coba 3, 5, 8, 12
panjang = 100
sudut = 360 / n  # sudut luar = sudut belok

print("Banyak sisi  :", n)
print("Sudut belok  :", sudut)
print("Sudut dalam  :", 180 - sudut)

t = turtle.Turtle()
t.color("blue")
for i in range(n):
    t.forward(panjang)
    t.left(sudut)

print("Total belokan:", n * sudut)
turtle.done()
`,
    },
  },
  {
    key: 'bug',
    name: { en: 'Find the bug: triangle', id: 'Cari bug: segitiga' },
    tip: {
      en: 'A logic error: no error message, but the drawing is wrong. The comment thinks of the angle inside the triangle, but the turtle turns by the angle outside it. Fix one number (angle = 60) so that the triangle closes and the total turning becomes 360°.',
      id: 'Kesalahan logika: tidak ada pesan error, tetapi gambarnya salah. Komentarnya memikirkan sudut di dalam segitiga, padahal kura-kura berbelok sebesar sudut di luarnya. Perbaiki satu angka (sudut = 60) agar segitiganya tertutup dan total belokan menjadi 360°.',
    },
    code: {
      en: P`import turtle

# Goal: an equilateral triangle with sides of 150.
# It runs without an error message, but the
# drawing is wrong: a logic error. Fix it!
t = turtle.Turtle()
t.color("purple")
angle = 60   # a triangle's angle is 60

for i in range(3):
    t.forward(150)
    t.left(angle)

print("Total turning:", 3 * angle, "degrees")
turtle.done()
`,
      id: P`import turtle

# Tujuan: segitiga sama sisi dengan sisi 150.
# Program berjalan tanpa pesan error, tetapi
# gambarnya salah: kesalahan logika. Perbaiki!
t = turtle.Turtle()
t.color("purple")
sudut = 60   # tiap sudut segitiga = 60

for i in range(3):
    t.forward(150)
    t.left(sudut)

print("Total belokan:", 3 * sudut, "derajat")
turtle.done()
`,
    },
  },
  {
    key: 'star',
    name: { en: 'Star (turn 144°)', id: 'Bintang (belok 144°)' },
    tip: {
      en: 'Each point turns 144°, and 5 × 144° = 720°: the turtle turns round twice before it is back where it started. The readout shows −720° because right turns count as negative (clockwise). Where the lines cross, Python on Linux and Windows leaves the middle unfilled (even-odd rule).',
      id: 'Setiap ujung berbelok 144°, dan 5 × 144° = 720°: kura-kura berputar dua kali sebelum kembali ke titik awal. Penghitung menampilkan −720° karena belok kanan (searah jarum jam) dihitung negatif. Di tempat garis bersilangan, Python di Linux dan Windows membiarkan bagian tengah tidak terisi (aturan genap-ganjil).',
    },
    code: {
      en: P`import turtle

t = turtle.Turtle()
t.color("red", "yellow")  # line, fill
t.penup()
t.goto(-100, 35)  # start on the left
t.pendown()

t.begin_fill()
for i in range(5):
    t.forward(200)
    t.right(144)  # 144 = 2 x 360 / 5
t.end_fill()

print("Total turning:", 5 * 144, "degrees")
print("Full turns   :", 5 * 144 // 360)
turtle.done()
`,
      id: P`import turtle

t = turtle.Turtle()
t.color("red", "yellow")  # garis, isi
t.penup()
t.goto(-100, 35)  # mulai di kiri
t.pendown()

t.begin_fill()
for i in range(5):
    t.forward(200)
    t.right(144)  # 144 = 2 x 360 / 5
t.end_fill()

print("Total belokan:", 5 * 144, "derajat")
print("Putaran penuh:", 5 * 144 // 360)
turtle.done()
`,
    },
  },
  {
    key: 'flower',
    name: { en: 'Flower of 36 circles', id: 'Bunga 36 lingkaran' },
    tip: {
      en: 'Each circle() is drawn as a polygon of many short lines. After every circle the turtle turns 10°, and 36 × 10° = 360°. It is slow at real Python speed: raise the speed, or add t.speed(0) after line 3.',
      id: 'Setiap circle() digambar sebagai segi banyak dari banyak garis pendek. Setelah setiap lingkaran kura-kura berbelok 10°, dan 36 × 10° = 360°. Pada kecepatan Python asli gambarnya lambat: naikkan kecepatan, atau tambahkan t.speed(0) setelah baris 3.',
    },
    code: {
      en: P`import turtle

t = turtle.Turtle()
t.color("green")

for i in range(4): # four sides of a square
    t.forward(120)
    t.left(90)

for i in range(36): # flower of 36 circles
    t.circle(60)
    t.right(10)

turtle.done()
`,
      id: P`import turtle

t = turtle.Turtle()
t.color("green")

for i in range(4): # empat sisi persegi
    t.forward(120)
    t.left(90)

for i in range(36): # pola bunga dari 36 lingkaran
    t.circle(60)
    t.right(10)

turtle.done()
`,
    },
  },
  {
    key: 'nested',
    name: { en: 'Turning squares (nested loops)', id: 'Persegi berputar (perulangan bersarang)' },
    tip: {
      en: 'Nested loops: the inner loop draws one square (4 × 90° = 360°), the outer loop turns 30° before the next square. After 12 squares the pattern closes, because 12 × 30° = 360°. Try 18 squares with 20°.',
      id: 'Perulangan bersarang: perulangan dalam menggambar satu persegi (4 × 90° = 360°), perulangan luar berbelok 30° sebelum persegi berikutnya. Setelah 12 persegi polanya tertutup, karena 12 × 30° = 360°. Coba 18 persegi dengan 20°.',
    },
    code: {
      en: P`import turtle

t = turtle.Turtle()
t.speed(10)
t.color("teal")

for j in range(12):       # 12 squares
    for i in range(4):    # one square
        t.forward(100)
        t.left(90)
    t.left(30)            # then turn 30 degrees

print("Total turning:", 12 * (360 + 30))
turtle.done()
`,
      id: P`import turtle

t = turtle.Turtle()
t.speed(10)
t.color("teal")

for j in range(12):       # 12 persegi
    for i in range(4):    # satu persegi
        t.forward(100)
        t.left(90)
    t.left(30)            # lalu belok 30 derajat

print("Total belokan:", 12 * (360 + 30))
turtle.done()
`,
    },
  },
  {
    key: 'spiral',
    name: { en: 'Colour spiral (list of colours)', id: 'Spiral warna (list warna)' },
    tip: {
      en: 'Every line is 3 units longer than the one before, and 59° (just under 60°) makes the hexagon twist. colours[i % 6] cycles through the list of colours. speed(0) is the fastest speed.',
      id: 'Setiap garis 3 satuan lebih panjang daripada garis sebelumnya, dan 59° (sedikit di bawah 60°) membuat segi enamnya terpilin. warna[i % 6] memilih warna dari list secara bergiliran. speed(0) adalah kecepatan tercepat.',
    },
    code: {
      en: P`import turtle

turtle.bgcolor("black")
t = turtle.Turtle()
t.speed(0)              # 0 = fastest
colours = ["red", "orange", "yellow",
           "lime", "cyan", "magenta"]

for i in range(80):
    t.pencolor(colours[i % 6])  # next colour
    t.width(i // 20 + 1)        # thicker
    t.forward(i * 3)
    t.left(59)

t.hideturtle()
turtle.done()
`,
      id: P`import turtle

turtle.bgcolor("black")
t = turtle.Turtle()
t.speed(0)              # 0 = paling cepat
warna = ["red", "orange", "yellow",
         "lime", "cyan", "magenta"]

for i in range(80):
    t.pencolor(warna[i % 6])  # bergiliran
    t.width(i // 20 + 1)      # makin tebal
    t.forward(i * 3)
    t.left(59)

t.hideturtle()
turtle.done()
`,
    },
  },
  {
    key: 'house',
    name: { en: 'House built from functions', id: 'Rumah dari fungsi' },
    tip: {
      en: 'Three functions with parameters build the house: move_to(x, y), rectangle(width, height, colour) and triangle(side, colour). Step through and watch every call jump into the function body. begin_fill() and end_fill() fill each shape.',
      id: 'Tiga fungsi berparameter membangun rumah: pindah(x, y), persegi_panjang(lebar, tinggi, warna), dan segitiga(sisi, warna). Jalankan langkah demi langkah dan amati setiap pemanggilan melompat ke isi fungsi. begin_fill() dan end_fill() mengisi setiap bentuk.',
    },
    code: {
      en: P`import turtle

t = turtle.Turtle()
t.speed(6)

def move_to(x, y):
    # pen up, move to (x, y), pen down
    t.penup()
    t.goto(x, y)
    t.pendown()

def rectangle(width, height, colour):
    t.fillcolor(colour)
    t.begin_fill()
    for i in range(2):
        t.forward(width)
        t.left(90)
        t.forward(height)
        t.left(90)
    t.end_fill()

def triangle(side, colour):
    t.fillcolor(colour)
    t.begin_fill()
    for i in range(3):
        t.forward(side)
        t.left(120)
    t.end_fill()

move_to(-100, -120)
rectangle(200, 150, "khaki")    # wall
move_to(-120, 30)
triangle(240, "firebrick")      # roof
move_to(-25, -120)
rectangle(50, 90, "sienna")     # door
move_to(-80, -40)
rectangle(40, 40, "skyblue")    # window
move_to(40, -40)
rectangle(40, 40, "skyblue")    # window
move_to(0, -170)
t.write("My house", align="center",
        font=("Arial", 16, "bold"))
t.hideturtle()
turtle.done()
`,
      id: P`import turtle

t = turtle.Turtle()
t.speed(6)

def pindah(x, y):
    # angkat pena, pindah, turunkan pena
    t.penup()
    t.goto(x, y)
    t.pendown()

def persegi_panjang(lebar, tinggi, warna):
    t.fillcolor(warna)
    t.begin_fill()
    for i in range(2):
        t.forward(lebar)
        t.left(90)
        t.forward(tinggi)
        t.left(90)
    t.end_fill()

def segitiga(sisi, warna):
    t.fillcolor(warna)
    t.begin_fill()
    for i in range(3):
        t.forward(sisi)
        t.left(120)
    t.end_fill()

pindah(-100, -120)
persegi_panjang(200, 150, "khaki")  # dinding
pindah(-120, 30)
segitiga(240, "firebrick")          # atap
pindah(-25, -120)
persegi_panjang(50, 90, "sienna")   # pintu
pindah(-80, -40)
persegi_panjang(40, 40, "skyblue")  # jendela
pindah(40, -40)
persegi_panjang(40, 40, "skyblue")  # jendela
pindah(0, -170)
t.write("Rumahku", align="center",
        font=("Arial", 16, "bold"))
t.hideturtle()
turtle.done()
`,
    },
  },
  {
    key: 'coords',
    name: { en: 'Coordinates and goto', id: 'Koordinat dan goto' },
    tip: {
      en: 'The centre of the window is (0, 0): x grows to the right, y grows upwards. goto(x, y) draws a straight line to that point. distance() measures the hypotenuse, the same as √(150² + 100²). Point at the picture to read coordinates.',
      id: 'Pusat jendela adalah (0, 0): x bertambah ke kanan, y bertambah ke atas. goto(x, y) menggambar garis lurus ke titik itu. distance() mengukur sisi miring, sama dengan √(150² + 100²). Arahkan penunjuk ke gambar untuk membaca koordinat.',
    },
    code: {
      en: P`import turtle

t = turtle.Turtle()
t.shape("turtle")
t.pencolor("darkgreen")
points = [(0, 0), (150, 0), (150, 100)]

for x, y in points:
    t.goto(x, y)   # straight line to (x, y)
    t.dot(8, "red")
    t.write(f"({x}, {y})")
    print("Position:", t.position())

t.goto(0, 0)   # close the triangle
print("Hypotenuse:", t.distance(150, 100))
print("Pythagoras:", (150**2 + 100**2) ** 0.5)
turtle.done()
`,
      id: P`import turtle

t = turtle.Turtle()
t.shape("turtle")
t.pencolor("darkgreen")
titik = [(0, 0), (150, 0), (150, 100)]

for x, y in titik:
    t.goto(x, y)   # garis lurus ke (x, y)
    t.dot(8, "red")
    t.write(f"({x}, {y})")
    print("Posisi:", t.position())

t.goto(0, 0)   # tutup segitiga
print("Sisi miring:", t.distance(150, 100))
print("Pythagoras :", (150**2 + 100**2) ** 0.5)
turtle.done()
`,
    },
  },
  {
    key: 'random',
    name: { en: 'Random dots with a seed', id: 'Titik acak dengan seed' },
    tip: {
      en: 'random.seed(2026) makes the "random" numbers the same on every run, and the same as in real Python: compare the console with python3. Change the seed, or delete that line, and run again.',
      id: 'random.seed(2026) membuat bilangan "acak" sama pada setiap jalannya program, dan sama dengan Python asli: bandingkan konsol dengan python3. Ganti seed-nya, atau hapus baris itu, lalu jalankan lagi.',
    },
    code: {
      en: P`import turtle
import random

random.seed(2026)  # same seed, same picture
colours = ["red", "orange", "gold", "green",
           "blue", "purple", "deep pink"]

t = turtle.Turtle()
t.speed(0)
t.penup()
for i in range(12):
    x = random.randint(-250, 250)
    y = random.randint(-200, 200)
    size = random.randint(10, 60)
    c = random.choice(colours)
    t.goto(x, y)
    t.dot(size, c)
    print(f"Dot {i + 1}: ({x}, {y}) size {size} {c}")

t.hideturtle()
turtle.done()
`,
      id: P`import turtle
import random

random.seed(2026)  # seed sama, gambar sama
warna = ["red", "orange", "gold", "green",
         "blue", "purple", "deep pink"]

t = turtle.Turtle()
t.speed(0)
t.penup()
for i in range(12):
    x = random.randint(-250, 250)
    y = random.randint(-200, 200)
    ukuran = random.randint(10, 60)
    w = random.choice(warna)
    t.goto(x, y)
    t.dot(ukuran, w)
    print(f"Titik {i + 1}: ({x}, {y}) ukuran {ukuran} {w}")

t.hideturtle()
turtle.done()
`,
    },
  },
];
// PRESETS-END

// TURTLE-CORE-START
// A port of CPython 3.13's Lib/turtle.py (TNavigator, TPen, RawTurtle, TurtleScreen) as a minipy host module. The
// geometry follows turtle.py operation by operation (Vec2D.rotate with math.radians/cos/sin, heading() with
// round(math.degrees(atan2), 10) % 360, circle() as `steps` chords), so positions, headings and distances come out bit
// for bit like python3. Instead of drawing on a Tk canvas, every call appends entries to a timeline (`tl`) and display
// items (`items`) that the page animates. Needs exact sin/cos/atan2/hypot (minipy's pyMath) passed in `opt`.
// The run must use hostArgs: 'typed', so the host sees int / float and list / tuple apart: an integral float arrives
// as { __float: x } and a tuple as { __tuple: [...] } (plain Arrays are lists), as turtle.py's checks need.
const TURTLE_COLOR_TABLE = 'alice_blue:f0f8ff,antique_white:faebd7,aqua:00ffff,aquamarine:7fffd4,azure:f0ffff,beige:f5f5dc,bisque:ffe4c4,black:000000,'
  + 'blanched_almond:ffebcd,blue:0000ff,blue_violet:8a2be2,brown:a52a2a,burlywood:deb887,cadet_blue:5f9ea0,chartreuse:7fff00,'
  + 'chocolate:d2691e,coral:ff7f50,cornflower_blue:6495ed,cornsilk:fff8dc,crimson:dc143c,cyan:00ffff,dark_blue:00008b,'
  + 'dark_cyan:008b8b,dark_goldenrod:b8860b,dark_gray:a9a9a9,dark_green:006400,dark_grey:a9a9a9,dark_khaki:bdb76b,'
  + 'dark_magenta:8b008b,dark_olive_green:556b2f,dark_orange:ff8c00,dark_orchid:9932cc,dark_red:8b0000,dark_salmon:e9967a,'
  + 'dark_sea_green:8fbc8f,dark_slate_blue:483d8b,dark_slate_gray:2f4f4f,dark_slate_grey:2f4f4f,dark_turquoise:00ced1,'
  + 'dark_violet:9400d3,debianred:d70751,deep_pink:ff1493,deep_sky_blue:00bfff,dim_gray:696969,dim_grey:696969,dodger_blue:1e90ff,'
  + 'firebrick:b22222,floral_white:fffaf0,forest_green:228b22,fuchsia:ff00ff,gainsboro:dcdcdc,ghost_white:f8f8ff,gold:ffd700,'
  + 'goldenrod:daa520,gray:808080,green:008000,green_yellow:adff2f,grey:808080,honeydew:f0fff0,hot_pink:ff69b4,indian_red:cd5c5c,'
  + 'indigo:4b0082,ivory:fffff0,khaki:f0e68c,lavender:e6e6fa,lavender_blush:fff0f5,lawn_green:7cfc00,lemon_chiffon:fffacd,'
  + 'light_blue:add8e6,light_coral:f08080,light_cyan:e0ffff,light_goldenrod:eedd82,light_goldenrod_yellow:fafad2,light_gray:d3d3d3,'
  + 'light_green:90ee90,light_grey:d3d3d3,light_pink:ffb6c1,light_salmon:ffa07a,light_sea_green:20b2aa,light_sky_blue:87cefa,'
  + 'light_slate_blue:8470ff,light_slate_gray:778899,light_slate_grey:778899,light_steel_blue:b0c4de,light_yellow:ffffe0,lime:00ff00,'
  + 'lime_green:32cd32,linen:faf0e6,magenta:ff00ff,maroon:800000,medium_aquamarine:66cdaa,medium_blue:0000cd,medium_orchid:ba55d3,'
  + 'medium_purple:9370db,medium_sea_green:3cb371,medium_slate_blue:7b68ee,medium_spring_green:00fa9a,medium_turquoise:48d1cc,'
  + 'medium_violet_red:c71585,midnight_blue:191970,mint_cream:f5fffa,misty_rose:ffe4e1,moccasin:ffe4b5,navajo_white:ffdead,'
  + 'navy:000080,navy_blue:000080,old_lace:fdf5e6,olive:808000,olive_drab:6b8e23,orange:ffa500,orange_red:ff4500,orchid:da70d6,'
  + 'pale_goldenrod:eee8aa,pale_green:98fb98,pale_turquoise:afeeee,pale_violet_red:db7093,papaya_whip:ffefd5,peach_puff:ffdab9,'
  + 'peru:cd853f,pink:ffc0cb,plum:dda0dd,powder_blue:b0e0e6,purple:800080,red:ff0000,rosy_brown:bc8f8f,royal_blue:4169e1,'
  + 'saddle_brown:8b4513,salmon:fa8072,sandy_brown:f4a460,sea_green:2e8b57,seashell:fff5ee,sienna:a0522d,silver:c0c0c0,'
  + 'sky_blue:87ceeb,slate_blue:6a5acd,slate_gray:708090,slate_grey:708090,snow:fffafa,spring_green:00ff7f,steel_blue:4682b4,'
  + 'tan:d2b48c,teal:008080,thistle:d8bfd8,tomato:ff6347,turquoise:40e0d0,violet:ee82ee,violet_red:d02090,wheat:f5deb3,white:ffffff,'
  + 'white_smoke:f5f5f5,yellow:ffff00,yellow_green:9acd32,antiquewhite#ffefdbeedfcccdc0b08b8378,aquamarine#7fffd476eec666cdaa458b74,'
  + 'azure#f0ffffe0eeeec1cdcd838b8b,bisque#ffe4c4eed5b7cdb79e8b7d6b,blue#0000ff0000ee0000cd00008b,brown#ff4040ee3b3bcd33338b2323,'
  + 'burlywood#ffd39beec591cdaa7d8b7355,cadetblue#98f5ff8ee5ee7ac5cd53868b,chartreuse#7fff0076ee0066cd00458b00,'
  + 'chocolate#ff7f24ee7621cd661d8b4513,coral#ff7256ee6a50cd5b458b3e2f,cornsilk#fff8dceee8cdcdc8b18b8878,'
  + 'cyan#00ffff00eeee00cdcd008b8b,darkgoldenrod#ffb90feead0ecd950c8b6508,darkolivegreen#caff70bcee68a2cd5a6e8b3d,'
  + 'darkorange#ff7f00ee7600cd66008b4500,darkorchid#bf3effb23aee9a32cd68228b,darkseagreen#c1ffc1b4eeb49bcd9b698b69,'
  + 'darkslategray#97ffff8deeee79cdcd528b8b,deeppink#ff1493ee1289cd10768b0a50,deepskyblue#00bfff00b2ee009acd00688b,'
  + 'dodgerblue#1e90ff1c86ee1874cd104e8b,firebrick#ff3030ee2c2ccd26268b1a1a,gold#ffd700eec900cdad008b7500,'
  + 'goldenrod#ffc125eeb422cd9b1d8b6914,green#00ff0000ee0000cd00008b00,honeydew#f0fff0e0eee0c1cdc1838b83,'
  + 'hotpink#ff6eb4ee6aa7cd60908b3a62,indianred#ff6a6aee6363cd55558b3a3a,ivory#fffff0eeeee0cdcdc18b8b83,'
  + 'khaki#fff68feee685cdc6738b864e,lavenderblush#fff0f5eee0e5cdc1c58b8386,lemonchiffon#fffacdeee9bfcdc9a58b8970,'
  + 'lightblue#bfefffb2dfee9ac0cd68838b,lightcyan#e0ffffd1eeeeb4cdcd7a8b8b,lightgoldenrod#ffec8beedc82cdbe708b814c,'
  + 'lightpink#ffaeb9eea2adcd8c958b5f65,lightsalmon#ffa07aee9572cd81628b5742,lightskyblue#b0e2ffa4d3ee8db6cd607b8b,'
  + 'lightsteelblue#cae1ffbcd2eea2b5cd6e7b8b,lightyellow#ffffe0eeeed1cdcdb48b8b7a,magenta#ff00ffee00eecd00cd8b008b,'
  + 'maroon#ff34b3ee30a7cd29908b1c62,mediumorchid#e066ffd15feeb452cd7a378b,mediumpurple#ab82ff9f79ee8968cd5d478b,'
  + 'mistyrose#ffe4e1eed5d2cdb7b58b7d7b,navajowhite#ffdeadeecfa1cdb38b8b795e,olivedrab#c0ff3eb3ee3a9acd32698b22,'
  + 'orange#ffa500ee9a00cd85008b5a00,orangered#ff4500ee4000cd37008b2500,orchid#ff83faee7ae9cd69c98b4789,'
  + 'palegreen#9aff9a90ee907ccd7c548b54,paleturquoise#bbffffaeeeee96cdcd668b8b,palevioletred#ff82abee799fcd68898b475d,'
  + 'peachpuff#ffdab9eecbadcdaf958b7765,pink#ffb5c5eea9b8cd919e8b636c,plum#ffbbffeeaeeecd96cd8b668b,purple#9b30ff912cee7d26cd551a8b,'
  + 'red#ff0000ee0000cd00008b0000,rosybrown#ffc1c1eeb4b4cd9b9b8b6969,royalblue#4876ff436eee3a5fcd27408b,'
  + 'salmon#ff8c69ee8262cd70548b4c39,seagreen#54ff9f4eee9443cd802e8b57,seashell#fff5eeeee5decdc5bf8b8682,'
  + 'sienna#ff8247ee7942cd68398b4726,skyblue#87ceff7ec0ee6ca6cd4a708b,slateblue#836fff7a67ee6959cd473c8b,'
  + 'slategray#c6e2ffb9d3ee9fb6cd6c7b8b,snow#fffafaeee9e9cdc9c98b8989,springgreen#00ff7f00ee7600cd66008b45,'
  + 'steelblue#63b8ff5cacee4f94cd36648b,tan#ffa54fee9a49cd853f8b5a2b,thistle#ffe1ffeed2eecdb5cd8b7b8b,'
  + 'tomato#ff6347ee5c42cd4f398b3626,turquoise#00f5ff00e5ee00c5cd00868b,violetred#ff3e96ee3a8ccd32788b2252,'
  + 'wheat#ffe7baeed8aecdba968b7e66,yellow#ffff00eeee00cdcd008b8b00';

function createTurtleHost(opt) {
  const { sin, cos, atan2, hypot } = opt;
  const measure = opt.measure || ((s, size) => s.length * size * 0.6);
  const DEG2RAD = Math.PI / 180;   // CPython's degToRad = Py_MATH_PI / 180.0
  const RAD2DEG = 180 / Math.PI;   // radToDeg = 180.0 / Py_MATH_PI
  const S = Symbol('turtle-state');
  const tl = [];      // timeline entries
  const items = [];   // display items (segments, fills, texts, stamps) in creation order
  const notes = new Set();

  // ---------------------------------------------------------------- Python-ish helpers
  const err = (type, msg) => { const e = new Error(msg); e.pyType = type; return e; };
  // turtle.TurtleGraphicsError: the module exposes this class, so minipy raises it as that Python exception
  class TurtleGraphicsError extends Error {}
  const tgErr = (msg) => new TurtleGraphicsError(msg);
  // values from Python (hostArgs: 'typed'): a float with an integral value is { __float: x }, a tuple { __tuple: [...] }
  const isF = (v) => v !== null && typeof v === 'object' && typeof v.__float === 'number';
  const isTup = (v) => v !== null && typeof v === 'object' && Array.isArray(v.__tuple);
  const seq = (v) => (Array.isArray(v) ? v : isTup(v) ? v.__tuple : null);   // the items of a list or tuple
  const isNum = (v) => typeof v === 'number' || typeof v === 'boolean' || typeof v === 'bigint' || isF(v);
  const isInt = (v) => typeof v === 'boolean' || typeof v === 'bigint' || (typeof v === 'number' && Number.isInteger(v));
  const isFloat = (v) => isF(v) || (typeof v === 'number' && !Number.isInteger(v));
  const num = (v) => (typeof v === 'boolean' ? (v ? 1 : 0) : isF(v) ? v.__float : Number(v));
  function typeName(v) {
    if (v === null || v === undefined) return 'NoneType';
    switch (typeof v) {
      case 'boolean': return 'bool';
      case 'bigint': return 'int';
      case 'number': return Number.isInteger(v) ? 'int' : 'float';
      case 'string': return 'str';
      case 'function': return 'function';
    }
    if (isF(v)) return 'float';
    if (isTup(v)) return 'tuple';
    if (Array.isArray(v)) return 'list';
    if (v[S]) return 'Turtle';
    if (v instanceof Vec2D) return 'Vec2D';
    if (v.__pyname) return String(v.__pyname).split('.').pop();
    return 'dict';
  }
  function pyFloatRepr(x) {
    if (x !== x) return 'nan';
    if (x === Infinity) return 'inf';
    if (x === -Infinity) return '-inf';
    if (x === 0) return Object.is(x, -0) ? '-0.0' : '0.0';
    const [m, e] = x.toExponential().split('e');
    const exp = Number(e);
    const neg = m[0] === '-';
    const digits = m.replace('-', '').replace('.', '');
    if (exp < -4 || exp >= 16) {
      const mant = digits.length > 1 ? digits[0] + '.' + digits.slice(1) : digits;
      return (neg ? '-' : '') + mant + 'e' + (exp < 0 ? '-' : '+') + String(Math.abs(exp)).padStart(2, '0');
    }
    let s;
    if (exp >= 0) s = digits.length > exp + 1 ? digits.slice(0, exp + 1) + '.' + digits.slice(exp + 1) : digits.padEnd(exp + 1, '0') + '.0';
    else s = '0.' + '0'.repeat(-exp - 1) + digits;
    return (neg ? '-' : '') + s;
  }
  // str() of a value that came from Python (typed: an integral JS number is an int, { __float } a float)
  function pyStr(v, inner = false) {
    if (v === null || v === undefined) return 'None';
    switch (typeof v) {
      case 'boolean': return v ? 'True' : 'False';
      case 'bigint': return String(v);
      case 'number': return Number.isInteger(v) ? String(v) : pyFloatRepr(v);
      case 'string': return inner ? "'" + v.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'" : v;
    }
    if (isF(v)) return pyFloatRepr(v.__float);
    if (isTup(v)) return '(' + v.__tuple.map((x) => pyStr(x, true)).join(', ') + (v.__tuple.length === 1 ? ',)' : ')');
    if (Array.isArray(v)) return '[' + v.map((x) => pyStr(x, true)).join(', ') + ']';
    if (typeof v.__repr__ === 'function') return v.__repr__();
    if (v[S]) return '<turtle.Turtle object>';
    if (typeof v === 'object') return '{' + Object.keys(v).map((k) => pyStr(k, true) + ': ' + pyStr(v[k], true)).join(', ') + '}';
    return String(v);
  }
  // '%.{nd}f' % x and round(x, nd) of CPython: exact decimal value, ties to even
  function pyFixed(x, nd) {
    if (!Number.isFinite(x)) return x !== x ? 'nan' : x > 0 ? 'inf' : '-inf';
    const neg = x < 0 || Object.is(x, -0);
    const a = Math.abs(x);
    if (a >= 1e21) return (neg ? '-' : '') + a.toFixed(nd);
    let s = a.toFixed(nd);
    const long = a.toFixed(Math.min(100, nd + 40));
    const dot = long.indexOf('.');
    const frac = long.slice(dot + 1);
    if (frac[nd] === '5' && /^0*$/.test(frac.slice(nd + 1))) {
      const trunc = nd ? long.slice(0, dot + 1 + nd) : long.slice(0, dot);
      if (Number(trunc[trunc.length - 1]) % 2 === 0) s = trunc;
    }
    return (neg ? '-' : '') + s;
  }
  const pyRound = (x, nd) => Number(pyFixed(x, nd));
  const roundEven = (x) => { const r = Math.round(x); return Math.abs(x % 1) === 0.5 && r % 2 !== 0 ? r - 1 : r; };
  function pymod(a, b) {
    let m = a % b;
    if (m) { if ((b < 0) !== (m < 0)) m += b; } else m = b < 0 ? -0 : 0;
    return m;
  }
  // ---------------------------------------------------------------- colours (Tk 8.6 on X11: rgb.txt + web colours)
  const COLORS = new Map();
  const addName = (n, h) => { COLORS.set(n.replace(/_/g, ''), '#' + h); if (n.includes('_')) COLORS.set(n.replace(/_/g, ' '), '#' + h); };
  for (const part of TURTLE_COLOR_TABLE.split(',')) {
    const hi = part.indexOf('#');
    if (hi > 0) { const base = part.slice(0, hi), hx = part.slice(hi + 1); for (let i = 0; i < 4; i++) addName(base + (i + 1), hx.slice(i * 6, i * 6 + 6)); }
    else { const c = part.indexOf(':'); addName(part.slice(0, c), part.slice(c + 1)); }
  }
  for (let n = 0; n <= 100; n++) {
    const v = n === 50 ? 127 : n === 90 ? 229 : Math.floor(n * 255 / 100 + 0.5);
    const h = v.toString(16).padStart(2, '0').repeat(3);
    COLORS.set('gray' + n, '#' + h); COLORS.set('grey' + n, '#' + h);
  }
  const HEXRE = /^#(?:[0-9a-f]{3}){1,4}$/;
  const isColorString = (c) => COLORS.has(c.toLowerCase()) || HEXRE.test(c.toLowerCase());
  // the colour as #rrggbb for drawing ('' = transparent)
  function hexOf(c) {
    if (c === '' || c === null || c === undefined) return '';
    const l = c.toLowerCase();
    if (COLORS.has(l)) return COLORS.get(l);
    if (HEXRE.test(l)) { const h = l.slice(1), n = h.length / 3; return '#' + [0, 1, 2].map((i) => (n === 1 ? h[i] + h[i] : h.slice(i * n, i * n + 2))).join(''); }
    return '#000000';
  }

  // ---------------------------------------------------------------- Vec2D (repr "(%.2f,%.2f)")
  // turtle.Vec2D is a tuple subclass: the dunders give it the tuple behaviour python3 has (x, y = t.pos(), p[0],
  // len(p), for v in p, p == (0, 0)) and Vec2D's own + - * (scalar or dot product), unary -, abs() and rotate().
  // v.vx / v.vy keep the values as Python sees them (int, or { __float } for an integral float); x / y are numbers.
  // (isinstance(p, tuple) is still False here.)
  const vItem = (v) => (isNum(v) ? (isF(v) || isInt(v) ? v : num(v)) : v);
  const vRes = (n) => (Number.isInteger(n) ? fl(n) : n);   // the float result of float arithmetic
  const vArith = (a, b) => (isInt(a) && isInt(b) && typeof a !== 'boolean' && typeof b !== 'boolean');
  function vOp(a, b, op) {   // one component of Vec2D arithmetic, typed like python3's result
    const x = num(a), y = num(b);
    const r = op === '+' ? x + y : op === '-' ? x - y : x * y;
    return vArith(a, b) ? r : vRes(r);
  }
  class Vec2D {
    constructor(x, y) { this.vx = vItem(x); this.vy = vItem(y); this.x = num(x); this.y = num(y); }
    __repr__() { return '(' + pyFixed(this.x, 2) + ',' + pyFixed(this.y, 2) + ')'; }
    __len__() { return 2; }
    __iter__() { return [this.vx, this.vy]; }
    __getitem__(i) {
      if (i && Array.isArray(i.__slice)) {
        const [a, b, c] = i.__slice.map((v) => (v === null || v === undefined ? undefined : num(v)));
        const st = c === undefined ? 1 : c;
        if (st === 0) throw err('ValueError', 'slice step cannot be zero');
        const all = [this.vx, this.vy], out = [];
        const norm = (v, d) => (v === undefined ? d : v < 0 ? Math.max(v + 2, st < 0 ? -1 : 0) : Math.min(v, st < 0 ? 1 : 2));
        const s0 = norm(a, st < 0 ? 1 : 0), s1 = norm(b, st < 0 ? -1 : 2);
        for (let k = s0; st > 0 ? k < s1 : k > s1; k += st) out.push(all[k]);
        return { __tuple: out };
      }
      if (!isInt(i)) throw err('TypeError', `tuple indices must be integers or slices, not ${typeName(i)}`);
      const k = num(i) < 0 ? num(i) + 2 : num(i);
      if (k !== 0 && k !== 1) throw err('IndexError', 'tuple index out of range');
      return k === 0 ? this.vx : this.vy;
    }
    __eq__(o) {
      const b = o instanceof Vec2D ? [o.vx, o.vy] : isTup(o) ? o.__tuple : null;
      if (!b) return Array.isArray(o) ? false : undefined;
      return b.length === 2 && isNum(b[0]) && isNum(b[1]) && num(b[0]) === this.x && num(b[1]) === this.y;
    }
    __ne__(o) { const r = this.__eq__(o); return r === undefined ? undefined : !r; }
    __add__(o) { const b = vecPair(o, '+'); return new Vec2D(vOp(this.vx, b[0], '+'), vOp(this.vy, b[1], '+')); }
    __sub__(o) { const b = vecPair(o, '-'); return new Vec2D(vOp(this.vx, b[0], '-'), vOp(this.vy, b[1], '-')); }
    __mul__(o) {
      if (o instanceof Vec2D) { const r = this.x * o.x + this.y * o.y; return vArith(this.vx, o.vx) && vArith(this.vy, o.vy) ? r : vRes(r); }
      if (!isNum(o)) return undefined;
      return new Vec2D(vOp(this.vx, o, '*'), vOp(this.vy, o, '*'));
    }
    __rmul__(o) { return isNum(o) && typeof o !== 'boolean' ? new Vec2D(vOp(this.vx, o, '*'), vOp(this.vy, o, '*')) : undefined; }
    __neg__() { return new Vec2D(vOp(this.vx, -1, '*'), vOp(this.vy, -1, '*')); }
    __abs__() { return fl(hypot(this.x, this.y)); }
    rotate(...args) {
      const [angle] = bind('Vec2D.rotate', [['angle']], args, true);
      if (!isNum(angle)) throw err('TypeError', `must be real number, not ${typeName(angle)}`);
      const a = num(angle) * DEG2RAD;
      const c = cos(a), s = sin(a);
      return new Vec2D(vRes(this.x * c + -this.y * s), vRes(this.y * c + this.x * s));
    }
    index(v) { const k = [this.vx, this.vy].findIndex((w) => isNum(v) && num(v) === num(w)); if (k < 0) throw err('ValueError', 'tuple.index(x): x not in tuple'); return k; }
    count(v) { return [this.vx, this.vy].filter((w) => isNum(v) && num(v) === num(w)).length; }
  }
  Vec2D.prototype.__pyname = 'turtle.Vec2D';
  // the other operand of Vec2D + / -: other[0], other[1] like turtle.py (a tuple, a list or a Vec2D)
  function vecPair(o, op) {
    const b = o instanceof Vec2D ? [o.vx, o.vy] : seq(o);
    if (!b) throw err('TypeError', `'${typeName(o)}' object is not subscriptable`);
    if (b.length < 2) throw err('IndexError', `${Array.isArray(o) ? 'list' : 'tuple'} index out of range`);
    for (const v of b.slice(0, 2)) if (!isNum(v)) throw err('TypeError', `unsupported operand type(s) for ${op}: '${typeName(1.5)}' and '${typeName(v)}'`);
    return b;
  }

  // ---------------------------------------------------------------- argument binding with CPython's messages
  function plural(n, w) { return `${n} ${w}${n === 1 ? '' : 's'}`; }
  function bind(qual, params, args, method, varargs) {
    // params: [[name, default?]] (a 1-element array = required); returns values in order (undefined → default)
    let kw = null;
    if (args.length && args[args.length - 1] && typeof args[args.length - 1] === 'object' && args[args.length - 1].__kwargs) kw = args.pop().__kwargs;
    const name = qual + '()';
    const n = params.length;
    const vals = new Array(n);
    const filled = new Array(n).fill(false);
    for (let i = 0; i < Math.min(args.length, n); i++) { vals[i] = args[i]; filled[i] = true; }
    const rest = varargs ? args.slice(n) : [];
    if (kw) {
      for (const k of Object.keys(kw)) {
        const j = params.findIndex((p) => p[0] === k);
        if (j < 0) throw err('TypeError', `${name} got an unexpected keyword argument '${k}'`);
        if (filled[j]) throw err('TypeError', `${name} got multiple values for argument '${k}'`);
        vals[j] = kw[k]; filled[j] = true;
      }
    }
    if (!varargs && args.length > n) {
      const self = method ? 1 : 0;
      const req = params.filter((p) => p.length === 1).length;
      const given = args.length + self;
      const sig = req === n ? plural(n + self, 'positional argument') : `from ${req + self} to ${n + self} positional arguments`;
      throw err('TypeError', `${name} takes ${sig} but ${given} ${given === 1 ? 'was' : 'were'} given`);
    }
    const missing = params.filter((p, i) => p.length === 1 && !filled[i]).map((p) => `'${p[0]}'`);
    if (missing.length) {
      const list = missing.length === 1 ? missing[0] : missing.length === 2 ? `${missing[0]} and ${missing[1]}` : `${missing.slice(0, -1).join(', ')}, and ${missing[missing.length - 1]}`;
      throw err('TypeError', `${name} missing ${missing.length} required positional argument${missing.length === 1 ? '' : 's'}: ${list}`);
    }
    for (let i = 0; i < n; i++) if (!filled[i]) vals[i] = params[i][1];
    if (varargs) vals.push(rest);
    return vals;
  }

  // ---------------------------------------------------------------- world
  const W = {
    bg: 'white', title: 'Python Turtle Graphics', winW: 600, winH: 500,
    colormode: 1.0, tracing: 1, delay: 10, mode: 'standard',
    turtles: [], screen: null, pen: null, nextId: 1, stampId: 1,
  };
  const push = (e) => { tl.push(e); return tl.length - 1; };
  const note = (key, text) => { if (!notes.has(key)) { notes.add(key); push({ k: 'note', text }); } };
  const upd = (n) => (W.tracing ? n / Math.max(1, W.tracing) : 0) * (W.delay + 1);   // ms of real-time turtle animation

  function heading(T) {
    let result = pymod(pyRound(atan2(T.oy, T.ox) * RAD2DEG, 10), 360.0);
    result /= T.degPerAU;
    return pymod(T.angleOffset + T.angleOrient * result, T.full);
  }
  function vis(T) {
    return {
      x: T.x, y: T.y, ox: T.ox, oy: T.oy, h: heading(T), shown: T.shown, shape: T.shape, pc: hexOf(T.pencolor), fc: hexOf(T.fillcolor),
      pcName: T.pencolor, ps: num(T.pensize), down: T.drawing, rm: T.resizemode, sf: T.stretch.map(num), ol: num(T.outline),
    };
  }
  const stPush = (T, keys) => { const v = vis(T), s = {}; for (const k of keys) s[k] = v[k]; push({ k: 'st', id: T.id, s }); };

  function resetTurtle(T) {
    T.x = 0.0; T.y = 0.0; T.xi = false; T.yi = false;
    if (T.mode === 'logo') { T.ox = 0.0; T.oy = 1.0; } else { T.ox = 1.0; T.oy = 0.0; }
    T.pensize = 1; T.shown = true; T.pencolor = 'black'; T.fillcolor = 'black'; T.drawing = true; T.speed = 3;
    T.stretch = [1.0, 1.0]; T.stretchV = [fl(1), fl(1)]; T.outline = 1; T.resizemode = 'noresize';   // stretchV: as Python sees them
  }
  function setMode(T, mode) {
    T.mode = mode;
    if (mode === 'logo') { T.angleOffset = T.full / 4; T.angleOrient = -1; } else { T.angleOffset = 0; T.angleOrient = 1; }
  }
  function newTurtleState(shape, visible) {
    const T = { id: W.nextId++, full: 360.0, degPerAU: 1.0, angleOffset: 0, angleOrient: 1, mode: W.mode, shape: 'classic',
      fillItem: null, fillpath: null, stamps: [], own: [], label: '' };
    setMode(T, W.mode);
    if (W.mode === 'logo') { T.angleOffset = T.full / 4; }
    resetTurtle(T);
    T.shape = shape; T.shown = visible;
    return T;
  }

  // ---------------------------------------------------------------- motion (TNavigator + RawTurtle._goto/_rotate)
  function rotate(T, angle, show, user, noDur) {
    angle *= T.degPerAU;
    const ox = T.ox, oy = T.oy;
    const a = angle * DEG2RAD;
    const c = cos(a), s = sin(a);
    const nx = ox * c + (-oy) * s, ny = oy * c + ox * s;
    let dur = 0;
    if (W.tracing && !noDur) dur = upd(W.tracing === 1 && T.speed > 0 ? 2 + Math.trunc(Math.abs(angle) / (3 * T.speed)) : 1);
    T.ox = nx; T.oy = ny;
    push({ k: 'rot', id: T.id, x: T.x, y: T.y, a0: Math.atan2(oy, ox), a1: Math.atan2(ny, nx), d: angle, h: heading(T), dur, show: !!show, turn: user ? angle : undefined });
  }
  function gotoXY(T, ex, ey, exi, eyi, kind, durOverride) {
    const sx = T.x, sy = T.y;
    if (!Number.isFinite(ex) || !Number.isFinite(ey)) {
      if (ex !== ex || ey !== ey) throw err('ValueError', 'cannot convert float NaN to integer');
      throw err('OverflowError', 'cannot convert float infinity to integer');
    }
    if (items.length > 200000) throw err('RuntimeError', 'too much drawing for this simulation (more than 200000 lines)');
    let dur = 0;
    if (W.tracing) {
      if (W.tracing === 1 && T.speed) {
        const dx = ex - sx, dy = ey - sy;
        const nhops = 1 + Math.trunc(Math.sqrt(dx * dx + dy * dy) / (3 * Math.pow(1.1, T.speed) * T.speed));
        dur = upd(nhops);
      } else dur = upd(1);
    }
    if (durOverride !== undefined) dur = durOverride;
    let item;
    if (T.drawing) {
      item = items.length;
      items.push({ t: 'seg', o: T.id, b: tl.length, x0: sx, y0: sy, x1: ex, y1: ey, c: hexOf(T.pencolor), w: num(T.pensize) });
      T.own.push(item);
    }
    if (T.fillpath) T.fillpath.push([ex, ey]);
    T.x = ex; T.y = ey; T.xi = exi; T.yi = eyi;
    push({ k: 'go', id: T.id, x0: sx, y0: sy, x1: ex, y1: ey, draw: T.drawing, item, dur, side: kind === 'side' && T.drawing && (ex !== sx || ey !== sy) });
  }
  // float * v (Vec2D * distance)
  function mulCheck(v, op = '*', left = 'float') {
    if (isNum(v)) return;
    if (typeof v === 'string' || Array.isArray(v)) throw err('TypeError', "can't multiply sequence by non-int of type 'float'");
    throw err('TypeError', `unsupported operand type(s) for ${op}: '${left}' and '${typeName(v)}'`);
  }
  function negCheck(v) { if (!isNum(v)) throw err('TypeError', `bad operand type for unary -: '${typeName(v)}'`); }
  function rotCheck(v) {   // angle *= self._degreesPerAU
    if (isNum(v)) return;
    if (typeof v === 'string' || Array.isArray(v)) throw err('TypeError', "can't multiply sequence by non-int of type 'float'");
    throw err('TypeError', `unsupported operand type(s) for *=: '${typeName(v)}' and 'float'`);
  }
  function go(T, distance, kind = 'side') {
    const d = num(distance);
    gotoXY(T, T.x + T.ox * d, T.y + T.oy * d, false, false, kind);
  }
  function coord(v, other) {   // a coordinate given to goto/setx/sety → [number, isInt]
    if (isNum(v)) return [num(v), isInt(v)];
    throw err('TypeError', `unsupported operand type(s) for -: '${typeName(v)}' and '${other}'`);
  }
  const posType = (T, axis) => ((axis ? T.yi : T.xi) ? 'int' : 'float');
  function vecOf(x) {   // Vec2D(*x)
    if (x instanceof Vec2D) return [x.vx, x.vy];
    if (seq(x)) {
      x = seq(x);
      if (x.length !== 2) throw err('TypeError', `Vec2D.__new__() ${x.length < 2 ? `missing ${2 - x.length} required positional argument${x.length === 1 ? '' : 's'}: ${x.length === 1 ? "'y'" : "'x' and 'y'"}` : `takes 3 positional arguments but ${x.length + 1} were given`}`);
      return x;
    }
    if (typeof x === 'string') return vecOf([...x]);
    throw err('TypeError', `turtle.Vec2D() argument after * must be an iterable, not ${typeName(x)}`);
  }
  function goto(T, x, y) {
    let px, py;
    if (y === null || y === undefined) [px, py] = vecOf(x); else { px = x; py = y; }
    const [ex, exi] = coord(px, posType(T, 0)), [ey, eyi] = coord(py, posType(T, 1));
    gotoXY(T, ex, ey, exi, eyi, 'side');
  }
  function setheading(T, to) {
    if (!isNum(to)) throw err('TypeError', `unsupported operand type(s) for -: '${typeName(to)}' and 'float'`);
    let angle = (num(to) - heading(T)) * T.angleOrient;
    const full = T.full;
    angle = pymod(angle + full / 2, full) - full / 2;
    rotate(T, angle, true, true);
  }
  function posOf(T, x, y) {   // distance / towards argument
    let pos;
    if (y !== null && y !== undefined) pos = [x, y];
    if (x instanceof Vec2D) pos = [x.x, x.y];
    else if (isTup(x)) pos = vecOf(x);
    else if (x && x[S]) pos = [x[S].x, x[S].y];
    if (!pos) throw err('UnboundLocalError', "cannot access local variable 'pos' where it is not associated with a value");
    for (const v of pos) if (!isNum(v)) throw err('TypeError', `unsupported operand type(s) for -: '${typeName(v)}' and 'float'`);
    return [num(pos[0]) - T.x, num(pos[1]) - T.y];
  }
  function circle(T, radius, extent, steps) {
    if (!isNum(radius)) throw err('TypeError', `bad operand type for abs(): '${typeName(radius)}'`);
    const r = num(radius);
    const speed = T.speed;
    if (extent === null || extent === undefined) extent = T.full;
    else if (!isNum(extent)) throw err('TypeError', `bad operand type for abs(): '${typeName(extent)}'`);
    const ext = num(extent);
    if (steps === null || steps === undefined) {
      const frac = Math.abs(ext) / T.full;
      steps = 1 + Math.trunc(Math.min(11 + Math.abs(r) / 6.0, 59.0) * frac);
    } else {
      if (!isNum(steps)) throw err('TypeError', `unsupported operand type(s) for /: 'float' and '${typeName(steps)}'`);
      if (num(steps) === 0) throw err('ZeroDivisionError', 'float division by zero');
      if (!isInt(steps)) {
        // turtle.py turns by half a step and sets speed 0 before range(steps) fails
        const w0 = 1.0 * ext / num(steps);
        if (speed === 0) { W.tracing = 0; W.delay = 0; } else T.speed = 0;
        rotate(T, r < 0 ? -0.5 * w0 : 0.5 * w0, false, false, true);
        throw err('TypeError', "'float' object cannot be interpreted as an integer");
      }
      steps = num(steps);
    }
    if (steps > 20000) throw err('RuntimeError', `circle() with ${steps} steps is too much for this simulation (at most 20000)`);
    let w = 1.0 * ext / steps;
    let w2 = 0.5 * w;
    let l = 2.0 * r * sin(w2 * DEG2RAD * T.degPerAU);
    if (r < 0) { l = -l; w = -w; w2 = -w2; }
    const tracing = W.tracing;
    push({ k: 'circ', id: T.id, deg: steps > 0 ? w * steps * T.degPerAU : 0 });
    if (speed === 0) W.tracing = 0;
    rotate(T, w2, false, false, true);
    for (let i = 0; i < steps; i++) {
      const sx = T.x, sy = T.y;
      const ex = sx + T.ox * l, ey = sy + T.oy * l;
      let dur;
      if (speed === 0) dur = 0;
      else if (tracing === 1) dur = upd(3 + 1 + Math.trunc(Math.abs(l) / (3 * Math.pow(1.1, speed) * speed)));
      else dur = tracing ? upd(1) : 0;
      gotoXY(T, ex, ey, false, false, 'arc', dur);
      rotate(T, w, false, false, true);
    }
    rotate(T, -w2, false, false, true);
    if (speed === 0) { W.tracing = tracing; if (tracing) tl[tl.length - 1].dur = upd(1); }
  }

  // ---------------------------------------------------------------- pen & colour (TPen)
  // TurtleScreen._colorstr(args): `args` is the *args tuple of pencolor() etc. ({ __tuple: [...] }) or one value
  function colorstr(args) {
    let color = args;
    if (seq(color) && seq(color).length === 1) color = seq(color)[0];
    if (typeof color === 'string') {
      if (color === '' || isColorString(color)) return color;
      throw tgErr(`bad color string: ${color}`);
    }
    const rgb = seq(color);
    if (!rgb || rgb.length !== 3) throw tgErr(`bad color arguments: ${pyStr(color)}`);
    let [r, g, b] = rgb;
    if (W.colormode === 1.0) {
      [r, g, b] = [r, g, b].map((v) => { mulCheck(v); return roundEven(255.0 * num(v)); });
    } else {
      for (const v of [r, g, b]) if (!isNum(v)) throw err('TypeError', `'<=' not supported between instances of 'int' and '${typeName(v)}'`);
      [r, g, b] = [r, g, b].map(num);
    }
    if (!(r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255)) throw tgErr(`bad color sequence: ${pyStr(color)}`);
    if (W.colormode !== 1.0) for (const v of rgb) if (!isInt(v)) throw err('TypeError', '%x format: an integer is required, not float');
    return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
  }
  function colorOut(c) {   // TurtleScreen._color
    if (!c.startsWith('#')) return c;
    let cl;
    if (c.length === 7) cl = [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
    else if (c.length === 4) cl = [1, 2, 3].map((i) => 16 * parseInt(c[i], 16));
    else throw tgErr(`bad colorstring: ${c}`);
    return { __tuple: cl.map((v) => ({ __float: v * W.colormode / 255 })) };
  }
  function setSpeed(T, s) {
    const speeds = { fastest: 0, fast: 10, normal: 6, slow: 3, slowest: 1 };
    if (typeof s === 'string' && Object.prototype.hasOwnProperty.call(speeds, s)) s = speeds[s];
    else if (!isNum(s) && (Array.isArray(s) || (s && typeof s === 'object' && !isTup(s) && !(s instanceof Vec2D) && !s[S]))) throw err('TypeError', `unhashable type: '${Array.isArray(s) ? 'list' : 'dict'}'`);
    else if (!isNum(s)) throw err('TypeError', `'<' not supported between instances of 'float' and '${typeName(s)}'`);
    else { const v = num(s); s = 0.5 < v && v < 10.5 ? roundEven(v) : 0; }
    T.speed = s;
  }

  // ---------------------------------------------------------------- shapes
  const SHAPES = {
    arrow: [[-10, 0], [10, 0], [0, 10]],
    turtle: [[0, 16], [-2, 14], [-1, 10], [-4, 7], [-7, 9], [-9, 8], [-6, 5], [-7, 1], [-5, -3], [-8, -6], [-6, -8], [-4, -5], [0, -7], [4, -5], [6, -8], [8, -6], [5, -3], [7, 1], [6, 5], [9, 8], [7, 9], [4, 7], [1, 10], [2, 14]],
    circle: [[10, 0], [9.51, 3.09], [8.09, 5.88], [5.88, 8.09], [3.09, 9.51], [0, 10], [-3.09, 9.51], [-5.88, 8.09], [-8.09, 5.88], [-9.51, 3.09], [-10, 0], [-9.51, -3.09], [-8.09, -5.88], [-5.88, -8.09], [-3.09, -9.51], [-0.00, -10.00], [3.09, -9.51], [5.88, -8.09], [8.09, -5.88], [9.51, -3.09]],
    square: [[10, -10], [10, 10], [-10, 10], [-10, -10]],
    triangle: [[10, -5.77], [0, 11.55], [-10, -5.77]],
    classic: [[0, 0], [-5, -9], [0, -7], [5, -9]],
    blank: null,
  };
  // turtle polygon in world coordinates (RawTurtle._getshapepoly + _polytrafo)
  function shapePoly(st, scale = 1) {
    const poly = SHAPES[st.shape];
    if (!poly) return null;
    let p = poly;
    if (st.rm === 'user') p = poly.map(([x, y]) => [st.sf[0] * x, st.sf[1] * y]);
    else if (st.rm === 'auto') { const l = Math.max(1, st.ps / 5.0); p = poly.map(([x, y]) => [l * x, l * y]); }
    const n = Math.hypot(st.ox, st.oy) || 1, e0 = st.ox / n, e1 = st.oy / n;
    return p.map(([x, y]) => [st.x + (e1 * x + e0 * y) * scale, st.y + (-e0 * x + e1 * y) * scale]);
  }

  // ---------------------------------------------------------------- items
  function deleteItems(list) {
    if (!list.length) return;
    const at = push({ k: 'del', items: list.slice() });
    for (const i of list) items[i].d = at;
  }
  function clearTurtle(T) {
    T.fillItem = null; T.fillpath = null;
    deleteItems(T.own);
    T.own = []; T.stamps = [];
  }
  function beginFill(T) {
    if (!T.fillpath) {
      T.fillItem = items.length;
      items.push({ t: 'fill', o: T.id, b: tl.length, pts: null, c: '' });
      T.own.push(T.fillItem);
      push({ k: 'item', i: T.fillItem });
    }
    T.fillpath = [[T.x, T.y]];
  }
  function endFill(T) {
    if (!T.fillpath) return;
    if (T.fillpath.length > 2) {
      const it = items[T.fillItem];
      it.pts = T.fillpath; it.c = hexOf(T.fillcolor);
      it.f = push({ k: 'fill', i: T.fillItem, dur: upd(1) });
    }
    T.fillItem = null; T.fillpath = null;
  }

  // ---------------------------------------------------------------- the Turtle class
  const getScreen = () => W.screen || (W.screen = new Screen());
  function makeMethods(target, defs, method) {
    for (const [names, qual, params, fn, varargs] of defs) {
      for (const nm of names.split(' ')) {
        const q = method ? qual : (qual.includes('.') ? nm : qual);
        Object.defineProperty(target, nm, {
          value: method
            ? function (...args) { const v = bind(q, params, args, true, varargs); return fn(this[S], ...v); }
            : function (...args) { const v = bind(q, params, args, false, varargs); return fn(null, ...v); },
          writable: true, configurable: true, enumerable: !method,
        });
      }
    }
  }
  const N = (v) => (v === undefined || v === null);
  const fl = (v) => ({ __float: v });
  const pos = (T) => new Vec2D(T.xi ? T.x : fl(T.x), T.yi ? T.y : fl(T.y));
  const TURTLE_DEFS = [
    ['forward fd', 'TNavigator.forward', [['distance']], (T, d) => { mulCheck(d); go(T, d); }],
    ['back bk backward', 'TNavigator.back', [['distance']], (T, d) => { negCheck(d); go(T, -num(d)); }],
    ['left lt', 'TNavigator.left', [['angle']], (T, a) => { rotCheck(a); rotate(T, num(a), true, true); }],
    ['right rt', 'TNavigator.right', [['angle']], (T, a) => { negCheck(a); rotate(T, -num(a), true, true); }],
    ['goto setpos setposition', 'TNavigator.goto', [['x'], ['y', null]], (T, x, y) => goto(T, x, y)],
    ['setx', 'TNavigator.setx', [['x']], (T, x) => { const [v, i] = coord(x, posType(T, 0)); gotoXY(T, v, T.y, i, T.yi, 'side'); }],
    ['sety', 'TNavigator.sety', [['y']], (T, y) => { const [v, i] = coord(y, posType(T, 1)); gotoXY(T, T.x, v, T.xi, i, 'side'); }],
    ['home', 'TNavigator.home', [], (T) => { gotoXY(T, 0, 0, true, true, 'side'); setheading(T, 0); }],
    ['teleport', 'RawTurtle.teleport', [['x', null], ['y', null], ['fill_gap', false]], (T, x, y, gap) => {
      const filling = !!T.fillpath;
      if (filling && !gap) endFill(T);
      const [nx, nxi] = N(x) ? [T.x, T.xi] : coord(x, posType(T, 0));
      const [ny, nyi] = N(y) ? [T.y, T.yi] : coord(y, posType(T, 1));
      const was = T.drawing, fp = T.fillpath; T.drawing = false; T.fillpath = null;
      gotoXY(T, nx, ny, nxi, nyi, 'jump', 0);
      T.drawing = was; T.fillpath = fp;
      if (filling && !gap) beginFill(T);
    }],
    ['setheading seth', 'TNavigator.setheading', [['to_angle']], (T, a) => setheading(T, a)],
    ['circle', 'TNavigator.circle', [['radius'], ['extent', null], ['steps', null]], (T, r, e, s) => circle(T, r, e, s)],
    ['position pos', 'TNavigator.pos', [], (T) => pos(T)],
    ['xcor', 'TNavigator.xcor', [], (T) => (T.xi ? T.x : fl(T.x))],
    ['ycor', 'TNavigator.ycor', [], (T) => (T.yi ? T.y : fl(T.y))],
    ['heading', 'TNavigator.heading', [], (T) => fl(heading(T))],
    ['distance', 'TNavigator.distance', [['x'], ['y', null]], (T, x, y) => { const [dx, dy] = posOf(T, x, y); return fl(hypot(dx, dy)); }],
    ['towards', 'TNavigator.towards', [['x'], ['y', null]], (T, x, y) => {
      const [dx, dy] = posOf(T, x, y);
      let result = pymod(pyRound(atan2(dy, dx) * RAD2DEG, 10), 360.0);
      result /= T.degPerAU;
      return fl(pymod(T.angleOffset + T.angleOrient * result, T.full));
    }],
    ['degrees', 'TNavigator.degrees', [['fullcircle', 360.0]], (T, f) => {
      if (!isNum(f)) throw err('TypeError', `unsupported operand type(s) for /: 'int' and '${typeName(f)}'`);
      if (num(f) === 0) throw err('ZeroDivisionError', 'division by zero');
      T.full = num(f); T.degPerAU = 360 / T.full; T.angleOffset = T.mode === 'standard' ? 0 : T.full / 4;
    }],
    ['radians', 'TNavigator.radians', [], (T) => { T.full = 2 * Math.PI; T.degPerAU = 360 / T.full; T.angleOffset = T.mode === 'standard' ? 0 : T.full / 4; }],
    ['speed', 'TPen.speed', [['speed', null]], (T, s) => { if (N(s)) return T.speed; setSpeed(T, s); }],
    ['penup pu up', 'TPen.penup', [], (T) => { if (T.drawing) { T.drawing = false; stPush(T, ['down']); } }],
    ['pendown pd down', 'TPen.pendown', [], (T) => { if (!T.drawing) { T.drawing = true; stPush(T, ['down']); } }],
    ['isdown', 'TPen.isdown', [], (T) => T.drawing],
    ['pensize width', 'TPen.pensize', [['width', null]], (T, w) => {
      if (N(w)) return T.pensize;
      if (!isNum(w) && !(typeof w === 'string' && w.trim() && Number.isFinite(Number(w)))) throw tgErr(`bad screen distance "${pyStr(w)}"`);
      T.pensize = typeof w === 'string' ? Number(w) : w; stPush(T, ['ps']);
    }],
    ['color', 'TPen.color', [], (T, args) => {
      if (!args.length) return { __tuple: [colorOut(T.pencolor), colorOut(T.fillcolor)] };
      let pc, fc;
      if (args.length === 1) pc = fc = args[0];
      else if (args.length === 2) [pc, fc] = args;
      else if (args.length === 3) pc = fc = { __tuple: args };
      else throw err('UnboundLocalError', "cannot access local variable 'pcolor' where it is not associated with a value");
      pc = colorstr(pc); fc = colorstr(fc);
      T.pencolor = pc; T.fillcolor = fc; stPush(T, ['pc', 'fc', 'pcName']);
    }, true],
    ['pencolor', 'TPen.pencolor', [], (T, args) => {
      if (!args.length) return colorOut(T.pencolor);
      const c = colorstr({ __tuple: args });
      if (c === T.pencolor) return;
      T.pencolor = c; stPush(T, ['pc', 'pcName']);
    }, true],
    ['fillcolor', 'TPen.fillcolor', [], (T, args) => {
      if (!args.length) return colorOut(T.fillcolor);
      const c = colorstr({ __tuple: args });
      if (c === T.fillcolor) return;
      T.fillcolor = c; stPush(T, ['fc']);
    }, true],
    ['showturtle st', 'TPen.showturtle', [], (T) => { T.shown = true; stPush(T, ['shown']); }],
    ['hideturtle ht', 'TPen.hideturtle', [], (T) => { T.shown = false; stPush(T, ['shown']); }],
    ['isvisible', 'TPen.isvisible', [], (T) => T.shown],
    ['pen', 'TPen.pen', [['pen', null]], (T, p) => {
      if (N(p)) return { shown: T.shown, pendown: T.drawing, pencolor: T.pencolor, fillcolor: T.fillcolor, pensize: T.pensize, speed: T.speed,
        resizemode: T.resizemode, stretchfactor: { __tuple: T.stretchV }, shearfactor: fl(0), outline: T.outline, tilt: fl(0) };
      note('pen', 'pen(dict) is only partly simulated here: shown, pendown, pencolor, fillcolor, pensize and speed.');
      if ('pendown' in p) T.drawing = !!p.pendown;
      if ('pencolor' in p) T.pencolor = colorstr({ __tuple: [p.pencolor] });
      if ('fillcolor' in p) T.fillcolor = colorstr({ __tuple: [p.fillcolor] });
      if ('pensize' in p) T.pensize = p.pensize;
      if ('shown' in p) T.shown = !!p.shown;
      if ('speed' in p) T.speed = p.speed;
      stPush(T, ['down', 'pc', 'pcName', 'fc', 'ps', 'shown']);
    }],
    ['shape', 'RawTurtle.shape', [['name', null]], (T, name) => {
      if (N(name)) return T.shape;
      if (typeof name !== 'string' || !Object.prototype.hasOwnProperty.call(SHAPES, name)) throw tgErr(`There is no shape named ${pyStr(name)}`);
      T.shape = name; stPush(T, ['shape']);
    }],
    ['shapesize turtlesize', 'RawTurtle.shapesize', [['stretch_wid', null], ['stretch_len', null], ['outline', null]], (T, sw, sl, ol) => {
      if (N(sw) && N(sl) && N(ol)) return { __tuple: [T.stretchV[0], T.stretchV[1], T.outline] };
      if (sw === 0 || sl === 0) throw tgErr('stretch_wid/stretch_len must not be zero');
      for (const v of [sw, sl, ol]) if (!N(v) && !isNum(v)) throw tgErr(`bad screen distance "${pyStr(v)}"`);
      if (!N(sw)) { const l = N(sl) ? sw : sl; T.stretch = [num(sw), num(l)]; T.stretchV = [sw, l]; }
      else if (!N(sl)) { T.stretch = [T.stretch[0], num(sl)]; T.stretchV = [T.stretchV[0], sl]; }
      if (!N(ol)) T.outline = ol;
      T.resizemode = 'user';
      stPush(T, ['sf', 'ol', 'rm']);
    }],
    ['resizemode', 'TPen.resizemode', [['rmode', null]], (T, m) => {
      if (N(m)) return T.resizemode;
      const v = String(m).toLowerCase();
      if (['auto', 'user', 'noresize'].includes(v)) { T.resizemode = v; stPush(T, ['rm']); }
    }],
    ['begin_fill', 'RawTurtle.begin_fill', [], (T) => beginFill(T)],
    ['end_fill', 'RawTurtle.end_fill', [], (T) => endFill(T)],
    ['filling', 'RawTurtle.filling', [], (T) => !!T.fillpath],
    ['dot', 'RawTurtle.dot', [['size', null]], (T, size, color) => {
      let c;
      if (!color.length) {
        if (typeof size === 'string' || isTup(size)) { c = colorstr(size); size = num(T.pensize) + Math.max(num(T.pensize), 4); }
        else { c = T.pencolor; if (!size) size = num(T.pensize) + Math.max(num(T.pensize), 4); }
      } else {
        if (N(size)) size = num(T.pensize) + Math.max(num(T.pensize), 4);
        c = colorstr({ __tuple: color });
      }
      if (!isNum(size)) throw tgErr(`bad screen distance "${pyStr(size)}"`);
      const was = [T.drawing, T.pensize, T.pencolor];
      T.drawing = true; T.pensize = num(size); T.pencolor = c;
      gotoXY(T, T.x + T.ox * 0, T.y + T.oy * 0, false, false, 'dot', W.tracing ? upd(4) : 0);
      [T.drawing, T.pensize, T.pencolor] = was;
    }, true],
    ['write', 'RawTurtle.write', [['arg'], ['move', false], ['align', 'left'], ['font', ['Arial', 8, 'normal']]], (T, arg, move, align, font) => {
      const txt = pyStr(arg);
      if (typeof align !== 'string') throw err('AttributeError', `'${typeName(align)}' object has no attribute 'lower'`);
      const anchor = { left: 'sw', center: 's', right: 'se' }[align.toLowerCase()];
      if (!anchor) throw err('KeyError', align.toLowerCase());
      const f = seq(font) || [String(font)];
      const size = Math.abs(num(f[1] ?? 8)) || 8;
      const it = items.length;
      const x = T.x - 1;
      items.push({ t: 'text', o: T.id, b: tl.length, x, y: T.y, s: txt, a: anchor, c: hexOf(T.pencolor), font: [String(f[0] ?? 'Arial'), size, String(f[2] ?? 'normal')] });
      T.own.push(it);
      push({ k: 'item', i: it, dur: upd(1) });
      if (move) {
        const wpx = measure(txt, size * 4 / 3, f);
        const left = anchor === 'sw' ? x : anchor === 's' ? x - wpx / 2 : x - wpx;
        const end = Math.round(left + wpx) - 1;
        gotoXY(T, end, T.y, true, T.yi, 'side');
      }
    }],
    ['stamp', 'RawTurtle.stamp', [], (T) => {
      const id = W.stampId++;
      const st = vis(T);
      const it = items.length;
      items.push({ t: 'stamp', o: T.id, b: tl.length, id, pts: shapePoly(st) || [], fc: st.fc, oc: st.pc, w: st.rm === 'auto' ? st.ps : st.rm === 'user' ? st.ol : 1 });
      T.own.push(it); T.stamps.push([id, it]);
      push({ k: 'item', i: it, dur: upd(1) });
      return id;
    }],
    ['clearstamp', 'RawTurtle.clearstamp', [['stampid']], (T, id) => {
      const j = isNum(id) ? T.stamps.findIndex((s) => s[0] === num(id)) : -1;
      if (j >= 0) { deleteItems([T.stamps[j][1]]); T.stamps.splice(j, 1); }
    }],
    ['clearstamps', 'RawTurtle.clearstamps', [['n', null]], (T, n) => {
      const list = N(n) ? T.stamps.slice() : num(n) >= 0 ? T.stamps.slice(0, num(n)) : T.stamps.slice(num(n));
      deleteItems(list.map((s) => s[1]));
      T.stamps = T.stamps.filter((s) => !list.includes(s));
    }],
    ['clear', 'RawTurtle.clear', [], (T) => clearTurtle(T)],
    ['reset', 'RawTurtle.reset', [], (T) => {
      clearTurtle(T); resetTurtle(T);
      push({ k: 'st', id: T.id, s: vis(T) });
    }],
    ['getscreen', 'RawTurtle.getscreen', [], () => getScreen()],
    ['getturtle getpen', 'RawTurtle.getturtle', [], (T) => T.obj],
    ['clone', 'RawTurtle.clone', [], (T) => {
      const t = new Turtle(T.shape, T.shown);
      const C = t[S];
      for (const k of ['x', 'y', 'xi', 'yi', 'ox', 'oy', 'pensize', 'pencolor', 'fillcolor', 'drawing', 'speed', 'stretch', 'stretchV', 'outline', 'resizemode', 'full', 'degPerAU', 'angleOffset', 'angleOrient', 'mode']) C[k] = Array.isArray(T[k]) ? T[k].slice() : T[k];
      push({ k: 'st', id: C.id, s: vis(C) });
      return t;
    }],
    ['undo', 'RawTurtle.undo', [], () => { throw err('NotImplementedError', 'undo() is not available in this simulation'); }],
    ['onclick onrelease ondrag', 'RawTurtle.onclick', [['fun'], ['btn', 1], ['add', null]], () => note('events', 'Mouse and keyboard events (onclick, onkey, ontimer, listen) are not simulated here: the program draws, then stops.')],
    ['begin_poly end_poly', 'RawTurtle.begin_poly', [], () => note('poly', 'begin_poly() / end_poly() are not simulated here.')],
    ['get_poly', 'RawTurtle.get_poly', [], () => null],
    ['setundobuffer', 'RawTurtle.setundobuffer', [['size']], () => {}],
    ['undobufferentries', 'RawTurtle.undobufferentries', [], () => 0],
    ['tilt tiltangle shearfactor shapetransform get_shapepoly', 'RawTurtle.tilt', [], (T, rest) => { throw err('NotImplementedError', 'tilting and shearing the turtle shape are not available in this simulation'); }, true],
  ];
  class Turtle {
    constructor(...args) {
      const [shape, , visible] = bind('Turtle.__init__', [['shape', 'classic'], ['undobuffersize', 1000], ['visible', true]], args, true);
      if (typeof shape !== 'string' || !Object.prototype.hasOwnProperty.call(SHAPES, shape)) throw err('KeyError', pyStr(shape));
      getScreen();
      if (W.turtles.length >= 50) throw err('RuntimeError', 'more than 50 turtles: too many for this simulation');
      const T = newTurtleState(shape, !!visible);
      T.obj = this;
      Object.defineProperty(this, S, { value: T });
      W.turtles.push(T);
      push({ k: 'new', id: T.id, s: vis(T) });
    }
  }
  Turtle.prototype.__pyname = 'turtle.Turtle';
  makeMethods(Turtle.prototype, TURTLE_DEFS, true);

  // ---------------------------------------------------------------- the screen
  const scr = (s) => push({ k: 'scr', s });
  const SCREEN_DEFS = [
    ['bgcolor', 'TurtleScreen.bgcolor', [], (_, args) => {
      if (!args.length) return colorOut(W.bg);
      W.bg = colorstr({ __tuple: args }); scr({ bg: hexOf(W.bg) || '#ffffff' });
    }, true],
    ['title', '_Screen.title', [['titlestring']], (_, t) => { W.title = pyStr(t); scr({ title: W.title }); }],
    ['setup', '_Screen.setup', [['width', 0.5], ['height', 0.75], ['startx', null], ['starty', null]], (_, w, h) => {
      const sw = 1280, sh = 800;
      const pick = (v, full) => (isFloat(v) && num(v) >= 0 && num(v) <= 1 ? num(v) * full : num(v));
      for (const v of [w, h]) if (!isNum(v)) throw err('TypeError', `'<=' not supported between instances of 'int' and '${typeName(v)}'`);
      W.winW = Math.max(50, Math.min(4000, pick(w, sw))); W.winH = Math.max(50, Math.min(4000, pick(h, sh)));
      scr({ win: [W.winW, W.winH] });
    }],
    ['screensize', 'TurtleScreenBase.screensize', [['canvwidth', null], ['canvheight', null], ['bg', null]], (_, cw, ch, bg) => {
      if (N(cw) && N(ch) && N(bg)) return { __tuple: [400, 300] };
      if (!N(bg)) { W.bg = colorstr({ __tuple: [bg] }); scr({ bg: hexOf(W.bg) || '#ffffff' }); }
    }],
    ['window_width', '_Screen.window_width', [], () => Math.round(W.winW)],
    ['window_height', '_Screen.window_height', [], () => Math.round(W.winH)],
    ['tracer', 'TurtleScreen.tracer', [['n', null], ['delay', null]], (_, n, d) => {
      if (N(n)) return W.tracing;
      W.tracing = Math.max(0, Math.trunc(num(n)));
      if (!N(d)) W.delay = Math.max(0, num(d));
    }],
    ['update', 'TurtleScreen.update', [], () => {}],
    ['delay', 'TurtleScreen.delay', [['delay', null]], (_, d) => { if (N(d)) return W.delay; W.delay = Math.max(0, num(d)); }],
    ['colormode', 'TurtleScreen.colormode', [['cmode', null]], (_, m) => {
      if (N(m)) return W.colormode === 1.0 ? fl(1.0) : 255;
      if (num(m) === 1) W.colormode = 1.0; else if (num(m) === 255) W.colormode = 255;
    }],
    ['mode', 'TurtleScreen.mode', [['mode', null]], (_, m) => {
      if (N(m)) return W.mode;
      const v = String(m).toLowerCase();
      if (v === 'world') { note('world', 'mode("world") / setworldcoordinates() are not simulated here; using "standard".'); return; }
      if (v !== 'standard' && v !== 'logo') throw tgErr(`No turtle-graphics-mode ${v}`);
      W.mode = v;
      for (const T of W.turtles) { setMode(T, v); clearTurtle(T); resetTurtle(T); push({ k: 'st', id: T.id, s: vis(T) }); }
    }],
    ['clear clearscreen', 'TurtleScreen.clear', [], () => {
      for (const T of W.turtles) { clearTurtle(T); T.shown = false; push({ k: 'st', id: T.id, s: { shown: false } }); }
      W.turtles = []; W.pen = null; W.bg = 'white'; W.tracing = 1; W.delay = 10; W.colormode = 1.0;
      scr({ bg: '#ffffff' });
    }],
    ['reset resetscreen', 'TurtleScreen.reset', [], () => {
      for (const T of W.turtles) { clearTurtle(T); resetTurtle(T); push({ k: 'st', id: T.id, s: vis(T) }); }
    }],
    ['turtles', 'TurtleScreen.turtles', [], () => W.turtles.map((T) => T.obj)],
    ['getshapes', 'TurtleScreen.getshapes', [], () => Object.keys(SHAPES).sort()],
    ['mainloop', 'TurtleScreenBase.mainloop', [], () => {}],
    ['exitonclick', '_Screen.exitonclick', [], () => {}],
    ['bye', '_Screen.bye', [], () => {}],
    ['listen', 'TurtleScreen.listen', [['xdummy', null], ['ydummy', null]], () => note('events', 'Mouse and keyboard events (onclick, onkey, ontimer, listen) are not simulated here: the program draws, then stops.')],
    ['onkey onkeyrelease onkeypress', 'TurtleScreen.onkey', [['fun'], ['key', null]], () => note('events', 'Mouse and keyboard events (onclick, onkey, ontimer, listen) are not simulated here: the program draws, then stops.')],
    ['onclick onscreenclick', 'TurtleScreen.onclick', [['fun'], ['btn', 1], ['add', null]], () => note('events', 'Mouse and keyboard events (onclick, onkey, ontimer, listen) are not simulated here: the program draws, then stops.')],
    ['ontimer', 'TurtleScreen.ontimer', [['fun'], ['t', 0]], () => note('events', 'Mouse and keyboard events (onclick, onkey, ontimer, listen) are not simulated here: the program draws, then stops.')],
    ['textinput', 'TurtleScreen.textinput', [['title'], ['prompt']], () => { throw err('NotImplementedError', 'textinput() opens a dialog box, which this simulation does not have: use input() instead'); }],
    ['numinput', 'TurtleScreen.numinput', [['title'], ['prompt'], ['default', null], ['minval', null], ['maxval', null]], () => { throw err('NotImplementedError', 'numinput() opens a dialog box, which this simulation does not have: use int(input()) instead'); }],
    ['bgpic', 'TurtleScreen.bgpic', [['picname', null]], (_, p) => { if (N(p)) return 'nopic'; throw err('NotImplementedError', 'bgpic() needs an image file, which this simulation cannot load'); }],
    ['getcanvas', 'TurtleScreen.getcanvas', [], () => { throw err('NotImplementedError', 'getcanvas() is not available in this simulation'); }],
    ['register_shape addshape', 'TurtleScreen.register_shape', [['name'], ['shape', null]], () => { throw err('NotImplementedError', 'register_shape() is not available in this simulation'); }],
    ['setworldcoordinates', 'TurtleScreen.setworldcoordinates', [['llx'], ['lly'], ['urx'], ['ury']], () => { throw err('NotImplementedError', 'setworldcoordinates() is not available in this simulation'); }],
  ];
  class Screen { constructor() { if (W.screen) return W.screen; W.screen = this; } }
  Screen.prototype.__pyname = 'turtle._Screen';
  makeMethods(Screen.prototype, SCREEN_DEFS, true);

  // ---------------------------------------------------------------- the module
  const getPen = () => {
    if (!W.pen) { const t = new Turtle(); W.pen = t[S]; W.pen.label = 'turtle'; }
    return W.pen;
  };
  const module = {};
  for (const [names, qual, params, fn, varargs] of TURTLE_DEFS) {
    for (const nm of names.split(' ')) {
      module[nm] = { [nm](...args) { const v = bind(nm, params, args, false, varargs); return fn(getPen(), ...v); } }[nm];
    }
  }
  // module-level screen functions (turtle._tg_screen_functions + done); clear, reset, onclick are turtle functions there
  const SCREEN_FUNCS = new Set(('addshape bgcolor bgpic bye clearscreen colormode delay exitonclick getcanvas getshapes listen mainloop mode '
    + 'numinput onkey onkeypress onkeyrelease onscreenclick ontimer register_shape resetscreen screensize setup setworldcoordinates '
    + 'textinput title tracer turtles update window_height window_width').split(' '));
  for (const [names, qual, params, fn, varargs] of SCREEN_DEFS) {
    for (const nm of names.split(' ')) {
      if (!SCREEN_FUNCS.has(nm)) continue;
      module[nm] = { [nm](...args) { const v = bind(nm, params, args, false, varargs); getScreen(); return fn(null, ...v); } }[nm];
    }
  }
  module.done = { done(...args) { bind('mainloop', [], args, false); getScreen(); } }.done;
  module.Turtle = Turtle;
  module.Pen = Turtle;
  module.RawTurtle = Turtle;
  module.Screen = function Screen_() { if (arguments.length) throw err('TypeError', `Screen() takes 0 positional arguments but ${arguments.length} ${arguments.length === 1 ? 'was' : 'were'} given`); return getScreen(); };
  Object.defineProperty(module.Screen, 'name', { value: 'Screen' });
  module.Vec2D = Vec2D;
  module.TurtleGraphicsError = TurtleGraphicsError;


  // ---------------------------------------------------------------- error text like python3
  // CPython's "Did you mean" for AttributeErrors on turtle objects and the turtle module: minipy suggests from the names
  // the JS objects have, while dir() of python3's Turtle, _Screen and turtle module has more (undobuffer, screen, ...),
  // so the suggestion is worked out again from those lists.
  const DIR_TURTLE = ('DEFAULT_ANGLEOFFSET DEFAULT_ANGLEORIENT DEFAULT_MODE START_ORIENTATION back backward begin_fill begin_poly bk circle clear '
    + 'clearstamp clearstamps clone color currentLine currentLineItem degrees distance dot down drawingLineItem end_fill end_poly fd fillcolor '
    + 'filling forward get_poly get_shapepoly getpen getscreen getturtle goto heading hideturtle home ht isdown isvisible items left lt onclick '
    + 'ondrag onrelease pd pen pencolor pendown pensize penup pos position pu radians reset resizemode right rt screen screens seth setheading '
    + 'setpos setposition setundobuffer setx sety shape shapesize shapetransform shearfactor showturtle speed st stamp stampItems teleport tilt '
    + 'tiltangle towards turtle turtlesize undo undobuffer undobufferentries up width write xcor ycor').split(' ');
  const DIR_SCREEN = ('addshape bgcolor bgpic bye canvheight canvwidth clear clearscreen colormode cv delay exitonclick getcanvas getshapes '
    + 'listen mainloop mode numinput onclick onkey onkeypress onkeyrelease onscreenclick ontimer register_shape reset resetscreen screensize '
    + 'setup setworldcoordinates textinput title tracer turtles update window_height window_width xscale yscale').split(' ');
  const DIR_MODULE = ('Canvas Pen RawPen RawTurtle Screen ScrolledCanvas Shape TK TNavigator TPen Tbuffer Terminator Turtle TurtleGraphicsError '
    + 'TurtleScreen TurtleScreenBase Vec2D config_dict deepcopy done getmethparlist inspect isfile join math read_docstrings readconfig '
    + 'simpledialog split sys time types write_docstringdict').split(' ');
  function lev(a, b, maxCost) {   // Lib/traceback.py _levenshtein_distance (move cost 2, case cost 1)
    if (a === b) return 0;
    let pre = 0;
    while (pre < a.length && pre < b.length && a[pre] === b[pre]) pre++;
    a = a.slice(pre); b = b.slice(pre);
    let post = 0;
    while (post < a.length && post < b.length && a[a.length - 1 - post] === b[b.length - 1 - post]) post++;
    a = a.slice(0, a.length - post); b = b.slice(0, b.length - post);
    if (!a.length || !b.length) return 2 * (a.length + b.length);
    if (a.length > 40 || b.length > 40) return maxCost + 1;
    if (b.length < a.length) [a, b] = [b, a];
    if ((b.length - a.length) * 2 > maxCost) return maxCost + 1;
    const row = []; for (let i = 1; i <= a.length; i++) row.push(i * 2);
    let result = 0;
    for (let bi = 0; bi < b.length; bi++) {
      const bc = b[bi];
      let distance = result = bi * 2;
      let minimum = Infinity;
      for (let i = 0; i < a.length; i++) {
        const sub = distance + (bc === a[i] ? 0 : bc.toLowerCase() === a[i].toLowerCase() ? 1 : 2);
        distance = row[i];
        result = Math.min(Math.min(result, distance) + 2, sub);
        row[i] = result;
        if (result < minimum) minimum = result;
      }
      if (minimum > maxCost) return maxCost + 1;
    }
    return result;
  }
  function suggest(names, wrong) {
    if (wrong.length > 40) return null;
    const d = names.filter((x) => wrong[0] === '_' || x[0] !== '_').sort();
    let best = wrong.length, sug = null;
    for (const nm of d) {
      if (nm === wrong) continue;
      let maxD = Math.floor((nm.length + wrong.length + 3) * 2 / 6);
      maxD = Math.min(maxD, best - 1);
      const dist = lev(wrong, nm, maxD);
      if (dist > maxD) continue;
      if (!sug || dist < best) { sug = nm; best = dist; }
    }
    return sug;
  }
  function fixError(e) {
    if (!e) return e;
    const type = e.type;
    let msg = e.message;
    if (type === 'AttributeError') {
      const base = msg.replace(/\. Did you mean: '[^']*'\?$/, '');
      let m, names = null;
      if ((m = /^'Turtle' object has no attribute '([^']+)'$/.exec(base))) names = DIR_TURTLE;
      else if ((m = /^'_Screen' object has no attribute '([^']+)'$/.exec(base))) names = DIR_SCREEN;
      else if ((m = /^'Vec2D' object has no attribute '([^']+)'$/.exec(base))) names = ['count', 'index', 'rotate'];
      else if ((m = /^module 'turtle' has no attribute '([^']+)'$/.exec(base))) names = Object.keys(module).concat(DIR_MODULE);
      if (names) { const sug = suggest(names, m[1]); msg = sug ? `${base}. Did you mean: '${sug}'?` : base; }
    }
    if (msg === e.message) return e;
    const tb = String(e.traceback || '');
    const last = `${e.type}: ${e.message}`;
    const i = tb.lastIndexOf(last);
    const traceback = i >= 0 ? tb.slice(0, i) + `${type}: ${msg}` + tb.slice(i + last.length) : tb;
    return { ...e, message: msg, traceback };
  }
  return {
    module, tl, items, world: W, notes, fixError,
    shapePoly, hexOf, pyFixed, pyFloatRepr,
  };
}
// Steps a minipy run, adding 'L' (line), 'out', 'in' (waiting for input), 'err' and 'done' entries to the host's
// timeline; returns 'done' | 'error' | 'input' | 'busy' (budget used up: call again to continue).
function driveTurtleRun(run, host, budget = 20000) {
  const tl = host.tl;
  for (let n = 0; n < budget; n++) {
    let ev;
    try { ev = run.step(); } catch (e) {
      tl.push({ k: 'err', error: { type: 'RuntimeError', message: String(e && e.message || e), line: 0, traceback: 'RuntimeError: ' + String(e && e.message || e) } });
      return 'error';
    }
    switch (ev.kind) {
      case 'line': tl.push({ k: 'L', line: ev.line }); break;
      case 'output': tl.push({ k: 'out', text: ev.text, echo: !!ev.echo, err: !!ev.stderr }); break;
      case 'input': if (ev.wait) { tl.push({ k: 'in', prompt: ev.prompt }); return 'input'; } break;
      case 'exception': tl.push({ k: 'err', error: host.fixError(ev.error) }); return 'error';
      case 'done': tl.push({ k: 'done' }); return 'done';
      default: break;
    }
  }
  return 'busy';
}
// TURTLE-CORE-END

const MAX_STEPS = 100000;                         // statements per run (then minipy stops with StepLimit)
const SPEEDS = [0.25, 0.5, 1, 2, 4, 8, 16, 64, Infinity];   // × real Python turtle speed
const DEFAULT_SPEED = 2;                          // ×1
const DEFAULT_PRESET = 'square';
const WIN_DEFAULT = [600, 500];                   // world size of the turtle window shown by default
const MONO = '"SFMono-Regular", ui-monospace, Menlo, Consolas, "Liberation Mono", monospace';
const SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const FONT_FAMILY = {
  arial: 'Arial, "Liberation Sans", Helvetica, sans-serif', helvetica: 'Helvetica, Arial, "Liberation Sans", sans-serif',
  courier: '"Courier New", "Liberation Mono", Courier, monospace', 'courier new': '"Courier New", "Liberation Mono", Courier, monospace',
  times: '"Times New Roman", "Liberation Serif", Times, serif', 'times new roman': '"Times New Roman", "Liberation Serif", Times, serif',
  'comic sans ms': '"Comic Sans MS", "Comic Neue", cursive, sans-serif', verdana: 'Verdana, "DejaVu Sans", sans-serif',
};
const fontCss = (font, px) => {
  const st = String(font[2] || 'normal').toLowerCase();
  const fam = FONT_FAMILY[String(font[0]).toLowerCase()] || `"${String(font[0]).replace(/"/g, '')}", Arial, sans-serif`;
  return `${st.includes('italic') ? 'italic ' : ''}${st.includes('bold') ? '700 ' : '400 '}${px}px ${fam}`;
};

const CSS = `
.tg { padding: 12px; min-width: 0; }
.tg *, .tg *::before, .tg *::after, .tg-ctl * { box-sizing: border-box; }
.tg [hidden], .tg-ctl [hidden] { display: none !important; }
/* one grid, no display: contents wrappers: phones stack picture, buttons, code, console; wide screens put the code and
   console on the left and the picture on the right (it spans the rows, the last 1fr row takes its extra height) */
.tg-grid { display: grid; grid-template-columns: minmax(0, 1fr); grid-template-areas: "view" "bar" "code" "con"; gap: 12px; min-width: 0; }
.tg-bar { grid-area: bar; }
.tg-view { grid-area: view; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
.tg-code { grid-area: code; min-width: 0; }
.tg-con { grid-area: con; min-width: 0; }
.tg.is-wide .tg-grid { grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr); grid-template-rows: auto auto auto 1fr;
  grid-template-areas: "bar bar" "code view" "con view" ". view"; align-items: start; }
.tg-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
.tg-btns { display: flex; flex-wrap: wrap; gap: 6px; }
.tg-btns .btn { padding: 7px 10px; min-height: 38px; white-space: nowrap; }
.tg-btns .btn:disabled { opacity: .45; cursor: not-allowed; filter: none; }
.tg-btns .btn--primary:hover { background: var(--accent, var(--color-accent)); }
.tg-scrub { display: flex; align-items: center; gap: 8px; flex: 1 1 160px; min-width: 0; }
.tg-scrub input { flex: 1 1 auto; min-width: 60px; accent-color: var(--accent, var(--color-accent)); }
.tg-count { font: 600 13px/1.2 var(--font-mono, monospace); white-space: nowrap; color: var(--color-fg); }
.tg-status { flex: 1 1 100%; margin: 0; font-size: 13px; line-height: 1.45; color: var(--color-muted); min-height: 2.9em; overflow-wrap: anywhere; }
.tg-status b { color: var(--color-fg); }
.tg-status code { font: 12.5px/1.3 var(--font-mono, monospace); color: var(--color-fg); }
.tg-status.is-err b { color: var(--color-danger); }
.tg-status .hint { display: block; margin-top: 2px; }
.tg-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.tg-win { background: #0b1220; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden; color-scheme: dark; }
.tg-win-h { display: flex; align-items: center; gap: 8px; min-height: 30px; padding: 4px 10px; background: #0f182c; border-bottom: 1px solid #1e2a44;
  font: 600 12px/1.3 var(--font-sans, sans-serif); color: #b6c2d6; }
.tg-win-h .dots { display: inline-flex; gap: 4px; flex: none; }
.tg-win-h .dots i { width: 9px; height: 9px; border-radius: 50%; background: #334155; display: block; }
.tg-win-h .t { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tg-win-h .xy { font: 500 12px/1.3 var(--font-mono, monospace); color: #fde68a; white-space: nowrap; flex: none; }
.tg-cw { position: relative; outline: none; touch-action: manipulation; }
.tg-cw:focus-visible { box-shadow: inset 0 0 0 3px #60a5fa; }
.sim-stage .tg-cw canvas { background: #ffffff; cursor: crosshair; }
.tg-hud { display: flex; flex-wrap: wrap; gap: 3px 14px; padding: 7px 10px; border-top: 1px solid #1e2a44; background: #0b1220;
  font: 12.5px/1.45 var(--font-sans, sans-serif); color: #b6c2d6; }
.tg-hud span { white-space: nowrap; }
.tg-hud b { font: 600 12.5px/1.45 var(--font-mono, monospace); color: #f1f5f9; }
.tg-hud .tot b { color: #fde68a; }
.tg-sw { display: inline-block; width: 11px; height: 11px; margin: 0 3px 0 2px; border-radius: 2px; border: 1px solid #64748b; vertical-align: -1px; }
.tg-key { margin: 0; font-size: 12px; line-height: 1.5; color: var(--color-muted); }
.tg-key b { color: var(--color-fg); font-weight: 600; }
.tg-legend { display: flex; flex-wrap: wrap; gap: 4px 14px; margin-top: 6px; font-size: 12px; line-height: 1.5; color: var(--color-muted); }
.tg-lsw { display: inline-block; width: 18px; height: 12px; margin-right: 5px; border-radius: 3px; vertical-align: -1px; }
.tg-lsw.s-next { background: rgba(251,191,36,.35); box-shadow: inset 3px 0 0 #fbbf24; }
.tg-lsw.s-ran { background: rgba(148,163,184,.25); box-shadow: inset 3px 0 0 #94a3b8; }
.tg-lsw.s-err { background: rgba(248,113,113,.35); box-shadow: inset 3px 0 0 #f87171; }
.tg-tip { margin: 0; padding: 8px 10px; border-left: 3px solid var(--accent, var(--color-accent)); border-radius: 0 6px 6px 0;
  background: color-mix(in srgb, var(--accent, var(--color-accent)) 7%, transparent); font-size: 13px; line-height: 1.5; color: var(--color-fg); }
.tg-tip b { font-weight: 700; }
`;

export function mount(rootEl) {
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const T = (en, id) => (lang === 'id' ? id : en);
  const reduceMotion = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const narrowStart = !!window.matchMedia?.('(max-width: 600px)').matches;
  const uid = Math.random().toString(36).slice(2, 8);
  const nw = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  const fmtNum = (v, nd = 2) => {   // short number for labels: 90, 51.43, -0.5 (decimal comma in Indonesian)
    const r = Math.round(v * 10 ** nd) / 10 ** nd;
    const s = String(Object.is(r, -0) ? 0 : r);
    return lang === 'id' ? s.replace('.', ',') : s;
  };

  const style = document.createElement('style');
  style.textContent = CSS;
  rootEl.appendChild(style);

  // ------------------------------------------------------------------ layout
  const main = document.createElement('div');
  main.className = 'tg';
  const grid = document.createElement('div');
  grid.className = 'tg-grid';
  main.appendChild(grid);
  rootEl.appendChild(main);
  main.classList.toggle('is-wide', main.clientWidth >= 720);   // before the panels are built
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls tg-ctl';
  rootEl.appendChild(ctrlPanel);

  // transport bar
  const bar = document.createElement('div');
  bar.className = 'tg-bar';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', T('Run controls', 'Kontrol jalannya program'));
  const btns = document.createElement('div');
  btns.className = 'tg-btns';
  const mkBtn = (label, aria, onClick, primary = false) => {
    const b = button({ label, primary, onClick });
    b.el.setAttribute('aria-label', aria);
    b.el.title = aria;
    return b.el;
  };
  const bBack = mkBtn(T('◀ Back', '◀ Mundur'), T('Back: undo the last line', 'Mundur: batalkan baris terakhir'), () => stepBack());
  const bStep = mkBtn(T('Step ▶', 'Langkah ▶'), T('Step: run the next line of code and draw what it does', 'Langkah: jalankan satu baris kode berikutnya dan gambar hasilnya'), () => stepForward(), true);
  const bRun = mkBtn(T('▶ Run', '▶ Jalankan'), T('Run: draw with animation', 'Jalankan: menggambar dengan animasi'), () => togglePlay());
  const bEnd = mkBtn(T('⏭ Instant', '⏭ Langsung'), T('Instant: draw everything at once', 'Langsung: gambar semuanya sekaligus'), () => toEnd());
  const bReset = mkBtn(T('⟲ Reset', '⟲ Ulang'), T('Reset: clear the picture and start again', 'Ulang: hapus gambar dan mulai lagi'), () => { restart(); announce(T('Reset: the picture is cleared.', 'Diulang: gambar dihapus.')); });
  btns.append(bBack, bStep, bRun, bEnd, bReset);
  const scrub = document.createElement('div');
  scrub.className = 'tg-scrub';
  const scrubIn = document.createElement('input');
  scrubIn.type = 'range';
  scrubIn.min = '0'; scrubIn.max = '0'; scrubIn.step = '1'; scrubIn.value = '0';
  scrubIn.setAttribute('aria-label', T('Step slider: move through the lines already run', 'Penggeser langkah: telusuri baris yang sudah dijalankan'));
  const count = document.createElement('span');
  count.className = 'tg-count';
  scrub.append(scrubIn, count);
  const status = document.createElement('p');
  status.className = 'tg-status';
  const live = document.createElement('div');
  live.className = 'tg-sr';
  live.setAttribute('aria-live', 'polite');
  bar.append(btns, scrub, status, live);

  // turtle window
  const view = document.createElement('section');
  view.className = 'tg-view';
  view.setAttribute('aria-label', T('Turtle window', 'Jendela turtle'));
  const win = document.createElement('div');
  win.className = 'tg-win';
  const winH = document.createElement('div');
  winH.className = 'tg-win-h';
  winH.innerHTML = '<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>';
  const winTitle = document.createElement('span');
  winTitle.className = 't';
  const winXY = document.createElement('span');
  winXY.className = 'xy';
  winXY.setAttribute('aria-hidden', 'true');
  winH.append(winTitle, winXY);
  const cw = document.createElement('div');
  cw.className = 'tg-cw';
  cw.tabIndex = 0;
  cw.setAttribute('role', 'img');
  const descId = `tg-desc-${uid}`;
  const desc = document.createElement('div');
  desc.id = descId;
  desc.className = 'tg-sr';
  cw.setAttribute('aria-describedby', descId);
  cw.setAttribute('aria-label', T('Turtle drawing. Keys: right arrow runs the next line, left arrow goes back, Space runs or pauses, Home resets, End draws everything.',
    'Gambar turtle. Tombol: panah kanan menjalankan baris berikutnya, panah kiri mundur, Spasi menjalankan atau menjeda, Home mengulang, End menggambar semuanya.'));
  const hud = document.createElement('div');
  hud.className = 'tg-hud';
  hud.setAttribute('aria-hidden', 'true');
  win.append(winH, cw, hud, desc);
  const keyHint = document.createElement('p');
  keyHint.className = 'tg-key';
  keyHint.innerHTML = esc(T('The centre is (0, 0); x grows to the right and y upwards. Blue arcs are left turns, orange arcs right turns.',
    'Pusatnya (0, 0); x bertambah ke kanan dan y ke atas. Busur biru = belok kiri, busur oranye = belok kanan.'))
    + ` <b>${esc(T('Keys on the picture:', 'Tombol pada gambar:'))}</b> → ${esc(T('step', 'langkah'))}, ← ${esc(T('back', 'mundur'))}, ${esc(T('Space run/pause, Home reset, End instant.', 'Spasi jalan/jeda, Home ulang, End langsung.'))}`;
  view.append(win, keyHint);
  const cv = createCanvas(cw);
  cv.canvas.setAttribute('aria-hidden', 'true');

  // code panel
  const codeWrap = document.createElement('div');
  codeWrap.className = 'tg-code';
  const cp = codePanel({
    value: '', language: 'python', editable: true, minLines: 8, maxLines: narrowStart ? 12 : 22, title: 'main.py', locale: lang,
    ariaLabel: T('Python turtle program (editable)', 'Program turtle Python (dapat diedit)'),
    onChange: () => onCodeEdit(),
  });
  const restoreBtn = document.createElement('button');
  restoreBtn.type = 'button';
  restoreBtn.textContent = T('↺ Original code', '↺ Kode awal');
  restoreBtn.title = T('Put back the preset program', 'Kembalikan program contoh');
  restoreBtn.disabled = true;
  restoreBtn.addEventListener('click', () => loadPreset(preset.key));
  cp.actions.appendChild(restoreBtn);
  const legend = document.createElement('div');
  legend.className = 'tg-legend';
  legend.innerHTML = `<span><span class="tg-lsw s-next" aria-hidden="true"></span>${esc(T('amber: line running / runs next', 'kuning: baris yang berjalan / berikutnya'))}</span>`
    + `<span><span class="tg-lsw s-ran" aria-hidden="true"></span>${esc(T('grey: already ran', 'abu-abu: sudah dijalankan'))}</span>`
    + `<span><span class="tg-lsw s-err" aria-hidden="true"></span>${esc(T('red: error', 'merah: error'))}</span>`;
  codeWrap.append(cp.el, legend);

  // console
  const conWrap = document.createElement('div');
  conWrap.className = 'tg-con';
  const out = consolePanel({
    minLines: 3, maxLines: narrowStart ? 7 : 8, title: T('Output (console)', 'Keluaran (konsol)'), locale: lang,
    ariaLabel: T('Program output', 'Keluaran program'),
    placeholder: T('print() output and error messages appear here.', 'Keluaran print() dan pesan error muncul di sini.'),
  });
  conWrap.appendChild(out.el);

  grid.append(bar, view, codeWrap, conWrap);

  // ------------------------------------------------------------------ side controls
  let preset = PRESETS.find((p) => p.key === DEFAULT_PRESET) || PRESETS[0];
  const progSel = select({
    label: T('Program', 'Program'), key: 'program', value: preset.key,
    options: PRESETS.map((p, i) => ({ value: p.key, label: `${i + 1}. ${p.name[lang]}` })),
    onChange: (v) => loadPreset(v),
  });
  const tip = document.createElement('p');
  tip.className = 'tg-tip';
  tip.setAttribute('aria-live', 'polite');
  let speedIdx = reduceMotion ? SPEEDS.length - 1 : DEFAULT_SPEED;
  const speedLabel = (i) => (SPEEDS[i] === Infinity ? T('instant', 'langsung')
    : `×${fmtNum(SPEEDS[i])}${SPEEDS[i] === 1 ? T(' (real Python)', ' (Python asli)') : ''}`);
  const speedSl = slider({
    label: T('Animation speed', 'Kecepatan animasi'), key: 'speed', min: 0, max: SPEEDS.length - 1, step: 1, value: speedIdx,
    format: speedLabel,
    onInput: (i) => { speedIdx = i; },
  });
  let showGrid = true, showAngles = true, fitAll = true;
  const gridTg = toggle({ label: T('Grid and axes', 'Kisi dan sumbu'), key: 'grid', value: true, onChange: (on) => { showGrid = on; requestDraw(); } });
  const angTg = toggle({ label: T('Show turn angles', 'Tampilkan sudut belok'), key: 'angles', value: true, onChange: (on) => { showAngles = on; requestDraw(); } });
  const fitTg = toggle({ label: T('Zoom out to show the whole drawing', 'Perkecil agar seluruh gambar terlihat'), key: 'fit', value: true, onChange: (on) => { fitAll = on; updateView(true); } });
  const lab = labPanel({
    title: 'Turtle geometry lab',
    filename: 'turtle-graphics-data.csv',
    columns: [
      { key: 'program', label: 'Program' },
      { key: 'lines', label: 'Straight lines' },
      { key: 'circles', label: 'Circles / arcs' },
      { key: 'turns', label: 'Turn commands' },
      { key: 'angle', label: 'Typical turn (deg)' },
      { key: 'total', label: 'Total turning (deg)' },
      { key: 'full', label: 'Full turns' },
    ],
    procedure: [
      'Program 1 (square): run it to the end and record. Note the turn angle and the total turning.',
      'Program 2 (regular polygon): set n = 3, 5, 6, 8 and 12 in the code; run and record each. What is the rule between n and the turn angle?',
      'Program 3 (find the bug): record the wrong drawing, fix the angle, run and record again. Compare the total turning.',
      'Program 4 (star): record. Why is the total turning -720 degrees (two full turns to the right) and not 360?',
      'Program 6 (turning squares): record, then change it to 18 squares turning 20 degrees and record again.',
      'Make your own: draw a 7-pointed star (turn 3 x 360 / 7 each time) and record it.',
    ],
    predict: 'Before running program 2 with n = 8: how many degrees must the turtle turn at each corner, and what will the total turning be?',
    source: () => labRow(),
  });
  ctrlPanel.append(progSel.el, tip, speedSl.el, gridTg.el, angTg.el, fitTg.el, lab.el);

  // ------------------------------------------------------------------ state
  const measureCtx = document.createElement('canvas').getContext('2d');
  const measure = (s, px, font) => { measureCtx.font = fontCss(font, px); return measureCtx.measureText(s).width; };
  let edited = false;
  let stale = true;          // the code changed since the timeline was made
  let host = null, run = null, runSt = 'none', compileError = null;
  let tl = [], items = [], lIdx = [];
  let playing = false, stepTarget = null, raf = 0, lastTs = 0, destroyed = false;
  let waiting = null;        // the 'in' entry being answered
  let needDraw = true;
  let PB = null;             // playback state
  let outQ = [];             // console text waiting to be shown (see queueOut)
  let cache = null;          // { canvas, ctx, n, key }
  let vbox = null;           // world box shown: [x0, y0, x1, y1]
  let lastDesc = '';
  const announce = (msg) => { live.textContent = ''; requestAnimationFrame(() => { if (!destroyed) live.textContent = msg; }); };
  const speed = () => SPEEDS[speedIdx];

  function freshPB() {
    return {
      p: 0, frac: 0, turtles: new Map(), order: [], bg: '#ffffff', title: 'Python Turtle Graphics', win: WIN_DEFAULT.slice(),
      stats: { lines: 0, circles: 0, turns: 0, turning: 0, hist: new Map() }, segs: [], line: 0, visited: new Set(),
      focus: 0, rot: null, err: null, ended: null, bbox: null, nL: 0,
    };
  }

  // ------------------------------------------------------------------ running the program into a timeline
  function prepare() {
    stopPlay(false);
    if (waiting) { out.cancelPrompt(); waiting = null; }
    host = createTurtleHost({ ...pyMath, measure });
    tl = host.tl; items = host.items; lIdx = [];
    compileError = null; run = null; runSt = 'none';
    const c = compile(cp.value, { filename: 'main.py' });
    if (!c.ok) { compileError = c.error; runSt = 'error'; }
    else {
      run = createRun(c.program, { echoInput: true, maxSteps: MAX_STEPS, modules: { turtle: host.module }, hostArgs: 'typed', locale: lang });
      continueRun();
    }
    stale = false;
    PB = freshPB();
    outQ = [];
    out.clear();
    if (compileError) out.set(compileError.traceback + '\n', { error: compileError.traceback });
    invalidateCache();
    updateView(true);
    renderAll();
  }
  function continueRun() {
    const from = tl.length;
    do { runSt = driveTurtleRun(run, host, 20000); } while (runSt === 'busy');
    for (let i = from; i < tl.length; i++) if (tl[i].k === 'L') lIdx.push(i);
  }

  // ------------------------------------------------------------------ playback
  const animated = (e) => (e.k === 'go' || e.k === 'rot' || e.k === 'fill' || e.k === 'item') && e.dur > 0;
  function grow(b, x, y, r = 0) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return b;
    if (!b) return [x - r, y - r, x + r, y + r];
    if (x - r < b[0]) b[0] = x - r;
    if (y - r < b[1]) b[1] = y - r;
    if (x + r > b[2]) b[2] = x + r;
    if (y + r > b[3]) b[3] = y + r;
    return b;
  }
  function itemBox(b, it) {
    if (it.t === 'seg') { const r = it.w / 2; b = grow(b, it.x0, it.y0, r); b = grow(b, it.x1, it.y1, r); }
    else if (it.t === 'fill' && it.pts) for (const p of it.pts) b = grow(b, p[0], p[1]);
    else if (it.t === 'stamp') for (const p of it.pts) b = grow(b, p[0], p[1]);
    else if (it.t === 'text') {
      const px = it.font[1] * 4 / 3, w = measure(it.s, px, it.font);
      const x0 = it.a === 'sw' ? it.x : it.a === 's' ? it.x - w / 2 : it.x - w;
      b = grow(b, x0, it.y); b = grow(b, x0 + w, it.y + px * 1.2);
    }
    return b;
  }
  function apply(e, i, liveOut) {
    const S = PB.stats;
    switch (e.k) {
      case 'L': PB.line = e.line; PB.visited.add(e.line); PB.nL++; break;
      case 'new': PB.turtles.set(e.id, { ...e.s }); PB.order.push(e.id); PB.focus = e.id; break;
      case 'st': { const t = PB.turtles.get(e.id); if (t) Object.assign(t, e.s); PB.focus = e.id; break; }
      case 'go': {
        const t = PB.turtles.get(e.id);
        if (t) { t.x = e.x1; t.y = e.y1; }
        if (e.side) S.lines++;
        if (e.item !== undefined) PB.bbox = itemBox(PB.bbox, items[e.item]);
        PB.focus = e.id;
        if (PB.rot && PB.rot.id === e.id && !PB.rot.moved && (e.x1 !== e.x0 || e.y1 !== e.y0)) PB.rot.moved = liveOut ? performance.now() : 1;
        break;
      }
      case 'rot': {
        const t = PB.turtles.get(e.id);
        if (t) { t.ox = Math.cos(e.a1); t.oy = Math.sin(e.a1); t.h = e.h; }
        if (e.turn !== undefined) {
          S.turns++; S.turning += e.turn;
          const k = Math.round(Math.abs(e.turn) * 1e6) / 1e6;
          S.hist.set(k, (S.hist.get(k) || 0) + 1);
        }
        if (e.show && t) PB.rot = { i, id: e.id, moved: 0 };
        PB.focus = e.id;
        break;
      }
      case 'circ': S.circles++; S.turning += e.deg; break;
      case 'item': PB.bbox = itemBox(PB.bbox, items[e.i]); break;
      case 'fill': PB.bbox = itemBox(PB.bbox, items[e.i]); break;
      case 'scr':
        if (e.s.bg) PB.bg = e.s.bg;
        if (e.s.title !== undefined) PB.title = e.s.title;
        if (e.s.win) PB.win = e.s.win.slice();
        break;
      case 'out': { const seg = { text: e.text, kind: e.echo ? 'in' : e.err ? 'err' : 'out' }; PB.segs.push(seg); if (liveOut) queueOut(seg); break; }
      case 'note': { const seg = { text: '[' + T('simulation note', 'catatan simulasi') + '] ' + e.text + '\n', kind: 'info' }; PB.segs.push(seg); if (liveOut) queueOut(seg); break; }
      case 'err': {
        PB.err = e.error; PB.ended = 'error';
        // a traceback follows the output straight away, as in python3; the simulator's step-limit note gets a line
        const prevSeg = PB.segs[PB.segs.length - 1];
        const nl = e.error.simulatorLimit && prevSeg && !prevSeg.text.endsWith('\n') ? '\n' : '';
        const tb = nl + String(e.error.traceback || '').replace(/\n?$/, '\n');
        PB.segs.push({ text: tb, kind: 'err' });
        if (liveOut) queueOut({ text: tb, kind: 'err' });
        break;
      }
      case 'done': PB.ended = 'done'; break;
      default: break;
    }
  }
  // console text produced while playing: shown with one console update per frame (a print() in a long or endless loop
  // would otherwise rewrite the console thousands of times per frame and freeze the page)
  function queueOut(seg) {
    const last = outQ[outQ.length - 1];
    if (last && last.kind === seg.kind) last.text += seg.text; else outQ.push({ text: seg.text, kind: seg.kind });
  }
  function flushOut() {
    if (!outQ.length) return;
    const q = outQ;
    outQ = [];
    for (const sg of q) out.append(sg.text, sg.kind);
  }
  function showAllOut() {   // replace the console with everything printed up to the play head
    outQ = [];
    if (!PB.segs.length) { out.set(''); return; }
    for (const sg of PB.segs) queueOut(sg);
    const merged = outQ;
    outQ = [];
    out.set(merged);
  }
  // move the play head to entry p (no animation)
  function seekTo(p) {
    p = Math.max(0, Math.min(p, tl.length));
    if (p < PB.p || (p === PB.p && PB.frac > 0)) {
      PB = freshPB();
      for (let i = 0; i < p; i++) apply(tl[i], i, false);
      PB.p = p;
      showAllOut();
      invalidateCache();
    } else {
      const outStart = PB.segs.length;
      for (let i = PB.p; i < p; i++) apply(tl[i], i, false);
      PB.p = p;
      for (let k = outStart; k < PB.segs.length; k++) queueOut(PB.segs[k]);
      flushOut();
    }
    PB.frac = 0;
  }
  // advance by `ms` of animation time; returns true when something changed
  function advance(ms) {
    let budget = ms, n = 0, changed = false;
    const sp = speed();
    while (PB.p < tl.length) {
      if (stepTarget !== null && PB.p >= stepTarget) { finishStep(); return true; }
      const e = tl[PB.p];
      if (e.k === 'in' && !e.answered) { askInput(e); return true; }
      const d = animated(e) && sp !== Infinity ? e.dur / sp : 0;
      if (d > 0) {
        const rem = (1 - PB.frac) * d;
        if (budget < rem) { PB.frac += budget / d; return true; }
        budget -= rem;
      }
      apply(e, PB.p, true);
      PB.p++; PB.frac = 0; changed = true;
      if (++n > 4000) return true;   // keep frames short; continue next frame
    }
    if (stepTarget !== null) finishStep();
    else if (playing) { stopPlay(true); announceEnd(); }
    return changed;
  }
  function nextLineIdx(from) {   // index of the first 'L' entry after `from`
    let lo = 0, hi = lIdx.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (lIdx[m] <= from) lo = m + 1; else hi = m; }
    return lo < lIdx.length ? lIdx[lo] : tl.length;
  }
  function prevLineIdx(before) {   // index of the last 'L' entry before `before`
    let lo = 0, hi = lIdx.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (lIdx[m] < before) lo = m + 1; else hi = m; }
    return lo > 0 ? lIdx[lo - 1] : 0;
  }
  const atEnd = () => PB.p >= tl.length && runSt !== 'input';
  function ensureFresh() {
    if (stale || !host) { prepare(); return true; }
    return false;
  }
  function stepForward() {
    if (waiting) { focusPrompt(); return; }
    ensureFresh();
    if (compileError) { renderAll(); return; }
    if (atEnd()) restart();
    stepTarget = nextLineIdx(PB.p);
    startLoop(true);
  }
  function finishStep() {
    stepTarget = null;
    playing = false;
    renderAll();
    const e = tl[PB.p];
    if (PB.ended || PB.p >= tl.length) announceEnd();
    else if (e && e.k === 'L') announce(T(`Line ${e.line} runs next.`, `Baris ${e.line} dijalankan berikutnya.`));
  }
  function stepBack() {
    if (waiting) { out.cancelPrompt(); waiting = null; }
    if (stale || !host || PB.p === 0) return;
    stopPlay(false);
    const target = prevLineIdx(PB.frac > 0 ? PB.p + 1 : PB.p);
    seekTo(target);
    updateView(true);
    renderAll();
    const e = tl[PB.p];
    announce(e && e.k === 'L' ? T(`Back: line ${e.line} runs next.`, `Mundur: baris ${e.line} dijalankan berikutnya.`) : T('Back at the start.', 'Kembali ke awal.'));
  }
  function togglePlay() {
    if (playing && stepTarget === null) { stopPlay(true); announce(T('Paused.', 'Dijeda.')); return; }
    if (waiting) { focusPrompt(); return; }
    const fresh = ensureFresh();
    if (compileError) { renderAll(); return; }
    if (!fresh && atEnd()) restart();
    stepTarget = null;
    playing = true;
    startLoop(false);
    renderButtons();
  }
  function toEnd() {
    if (waiting) { focusPrompt(); return; }
    ensureFresh();
    if (compileError) { renderAll(); return; }
    stopPlay(false);
    let guard = 0;
    while (PB.p < tl.length && guard++ < 1e7) {
      const e = tl[PB.p];
      if (e.k === 'in' && !e.answered) break;
      apply(e, PB.p, false);
      PB.p++;
    }
    PB.frac = 0;
    showAllOut();
    const e = tl[PB.p];
    if (e && e.k === 'in' && !e.answered) askInput(e);
    updateView(true);
    renderAll();
    if (!waiting) announceEnd();
  }
  function restart() {   // run the program again from the start (new random numbers when there is no seed)
    stopPlay(false);
    if (waiting) { out.cancelPrompt(); waiting = null; }
    prepare();
  }
  function stopPlay(render = true) {
    playing = false;
    stepTarget = null;
    if (render) renderAll();
  }
  function startLoop(isStep) {
    playing = true;
    if (isStep) renderButtons();
    lastTs = 0;
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function requestDraw() { needDraw = true; if (!raf) raf = requestAnimationFrame(frame); }
  function frame(ts) {
    raf = 0;
    if (destroyed) return;
    const dt = lastTs ? Math.min(100, ts - lastTs) : 16;
    lastTs = ts;
    let keep = false;
    if (playing) {
      const before = PB.p;
      advance(dt);
      flushOut();
      if (PB.p !== before) { renderCode(); renderScrub(); renderStatus(); renderDesc(); if (bBack.disabled === (PB.p > 0)) renderButtons(); }
      if (playing) updateView(false);
      keep = playing;
      needDraw = true;
    }
    if (needDraw) { draw(); renderHud(); needDraw = false; }
    // a turn arc fades out after the turtle moves on
    if (PB && PB.rot && PB.rot.moved > 1 && performance.now() - PB.rot.moved < 900) keep = true;
    if (keep) { if (!raf) raf = requestAnimationFrame((t) => { needDraw = true; frame(t); }); }
    else lastTs = 0;
  }
  function announceEnd() {
    if (PB.err) announce(T(`Error on line ${PB.err.line}: ${PB.err.type}.`, `Error pada baris ${PB.err.line}: ${PB.err.type}.`));
    else if (PB.ended === 'done') announce(T(`Finished. ${nw(PB.stats.lines, 'straight line', 'straight lines')}, total turning ${fmtNum(PB.stats.turning)} degrees.`,
      `Selesai. ${PB.stats.lines} garis lurus, total belokan ${fmtNum(PB.stats.turning)} derajat.`));
  }

  // ------------------------------------------------------------------ input()
  function askInput(e) {
    flushOut();
    playing = false;
    const wasStep = stepTarget;
    waiting = e;
    renderAll();
    announce(T('The program is waiting for input: type it in the console and press Enter.', 'Program menunggu input: ketik di konsol lalu tekan Enter.'));
    out.prompt({ placeholder: T('type, then Enter', 'ketik, lalu Enter'), echo: false, focus: true }).then((text) => {
      if (destroyed || waiting !== e) return;
      waiting = null;
      if (text === null) { renderAll(); return; }
      e.answered = true;
      run.provideInput(text);
      continueRun();
      stepTarget = wasStep !== null ? nextLineIdx(PB.p) : null;
      startLoop(wasStep !== null);
    });
  }
  function focusPrompt() { const inp = out.el.querySelector('input'); if (inp) inp.focus(); }

  // ------------------------------------------------------------------ editing and presets
  function onCodeEdit() {
    edited = cp.value !== preset.code[lang];
    restoreBtn.disabled = !edited;
    if (!stale) {
      stale = true;
      stopPlay(false);
      if (waiting) { out.cancelPrompt(); waiting = null; }
    }
    renderAll();
  }
  function loadPreset(key) {
    preset = PRESETS.find((p) => p.key === key) || PRESETS[0];
    progSel.value = preset.key;
    cp.value = preset.code[lang];
    cp.clearMarks();
    edited = false;
    restoreBtn.disabled = true;
    tip.innerHTML = `<b>${esc(T('Look for:', 'Perhatikan:'))}</b> ${esc(preset.tip[lang])}`;
    prepare();
  }

  // ------------------------------------------------------------------ view (world box shown on the canvas)
  function aliveBox() {   // bounding box of what is visible at the play head (after deletions)
    let b = null;
    for (const it of items) {
      if (it.b >= PB.p) break;
      if (it.d !== undefined && it.d < PB.p) continue;
      if (it.t === 'fill' && !(it.f < PB.p)) continue;
      b = itemBox(b, it);
    }
    return b;
  }
  function wantedBox(exact) {
    const [w, h] = PB ? PB.win : WIN_DEFAULT;
    let b = [-w / 2, -h / 2, w / 2, h / 2];
    if (fitAll && PB) {
      let d = exact ? aliveBox() : PB.bbox;
      for (const id of PB.order) { const t = PB.turtles.get(id); if (t && t.shown) d = grow(d, t.x, t.y, 12); }
      if (d) {
        const pad = Math.max(10, 0.04 * Math.max(d[2] - d[0], d[3] - d[1]));
        b = [Math.min(b[0], d[0] - pad), Math.min(b[1], d[1] - pad), Math.max(b[2], d[2] + pad), Math.max(b[3], d[3] + pad)];
        // room for the turn arc (30 px on screen) around the turtles, so the last turn is not cut off at the edge
        const sc = Math.min((cv.width || 400) / Math.max(1e-9, b[2] - b[0]), (cv.height || 300) / Math.max(1e-9, b[3] - b[1]));
        const m = 36 / Math.max(1e-9, sc);
        for (const id of PB.order) {
          const t = PB.turtles.get(id);
          if (!t || !(t.shown || (PB.rot && PB.rot.id === id))) continue;
          b = [Math.min(b[0], t.x - m), Math.min(b[1], t.y - m), Math.max(b[2], t.x + m), Math.max(b[3], t.y + m)];
        }
        const lim = 1e5;
        b = b.map((v) => Math.max(-lim, Math.min(lim, v)));
      }
    }
    return b;
  }
  // exact: recompute (may shrink); otherwise only grow when the drawing leaves the box (with headroom)
  function updateView(exact) {
    const want = wantedBox(exact);
    if (!vbox || exact) { if (!vbox || want.some((v, i) => v !== vbox[i])) { vbox = want; invalidateCache(); } }
    else if (want[0] < vbox[0] || want[1] < vbox[1] || want[2] > vbox[2] || want[3] > vbox[3]) {
      const cx = (want[0] + want[2]) / 2, cy = (want[1] + want[3]) / 2;
      const hw = (want[2] - want[0]) * 0.6, hh = (want[3] - want[1]) * 0.6;
      vbox = [Math.min(want[0], cx - hw), Math.min(want[1], cy - hh), Math.max(want[2], cx + hw), Math.max(want[3], cy + hh)];
      invalidateCache();
    }
    sizeCanvas();
    requestDraw();
  }
  let lastSize = '';
  function sizeCanvas() {
    const w = cw.clientWidth || 400;
    const [ww, wh] = PB ? PB.win : WIN_DEFAULT;
    const aspect = Math.max(0.8, Math.min(1.7, ww / wh));
    const h = Math.round(Math.min(w / aspect, Math.max(260, window.innerHeight * 0.72)));
    const key = `${w}x${h}`;
    if (key !== lastSize) { lastSize = key; cw.style.height = h + 'px'; invalidateCache(); }
  }
  function xform() {
    const W = cv.width, H = cv.height;
    const [x0, y0, x1, y1] = vbox || [-300, -250, 300, 250];
    const s = Math.min(W / Math.max(1e-9, x1 - x0), H / Math.max(1e-9, y1 - y0));
    return { s, ox: W / 2 - ((x0 + x1) / 2) * s, oy: H / 2 + ((y0 + y1) / 2) * s, W, H };
  }
  const CL = 1e6;
  const sxOf = (X, x) => Math.max(-CL, Math.min(CL, X.ox + x * X.s));
  const syOf = (X, y) => Math.max(-CL, Math.min(CL, X.oy - y * X.s));

  // ------------------------------------------------------------------ drawing
  function invalidateCache() { if (cache) cache.n = -1; needDraw = true; }
  function ensureCache(X) {
    const dpr = window.devicePixelRatio || 1;
    const pw = cv.canvas.width, ph = cv.canvas.height;
    if (!cache) { const c = document.createElement('canvas'); cache = { canvas: c, ctx: c.getContext('2d'), n: -1, p: 0 }; }
    if (cache.canvas.width !== pw || cache.canvas.height !== ph) { cache.canvas.width = pw; cache.canvas.height = ph; cache.n = -1; }
    // a completed fill or a deletion between the cached play head and now needs a full repaint
    if (cache.n >= 0 && PB.p < cache.p) cache.n = -1;
    if (cache.n >= 0) for (let i = cache.p; i < PB.p; i++) { const k = tl[i].k; if (k === 'fill' || k === 'del') { cache.n = -1; break; } }
    const ctx = cache.ctx;
    if (cache.n < 0) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, pw, ph);
      cache.n = 0;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    let i = cache.n;
    const end = items.length;
    while (i < end && items[i].b < PB.p) {
      i = paintRun(ctx, X, i, PB.p);
    }
    cache.n = i; cache.p = PB.p;
  }
  // paint items from index i (a run of segments with the same colour and width in one path); returns the next index
  function paintRun(ctx, X, i, p) {
    const it = items[i];
    const dead = it.d !== undefined && it.d < p;
    if (it.t === 'seg') {
      let j = i;
      const c = it.c, w = it.w;
      const lw = Math.max(0.8, w * X.s);
      ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath();
      let any = false;
      const dots = [];
      while (j < items.length) {
        const s = items[j];
        if (s.t !== 'seg' || s.b >= p || s.c !== c || s.w !== w) break;
        if (!(s.d !== undefined && s.d < p) && c !== '') {
          const ax = sxOf(X, s.x0), ay = syOf(X, s.y0), bx = sxOf(X, s.x1), by = syOf(X, s.y1);
          if (ax === bx && ay === by) dots.push(ax, ay);
          else { ctx.moveTo(ax, ay); ctx.lineTo(bx, by); any = true; }
        }
        j++;
      }
      if (any) ctx.stroke();
      if (dots.length) { ctx.beginPath(); for (let k = 0; k < dots.length; k += 2) { ctx.moveTo(dots[k] + lw / 2, dots[k + 1]); ctx.arc(dots[k], dots[k + 1], lw / 2, 0, Math.PI * 2); } ctx.fill(); }
      return j;
    }
    if (!dead) paintItem(ctx, X, it, p);
    return i + 1;
  }
  function paintItem(ctx, X, it, p) {
    if (it.t === 'fill') {
      if (!it.pts || !(it.f < p) || !it.c) return;
      ctx.beginPath();
      it.pts.forEach((q, k) => (k ? ctx.lineTo(sxOf(X, q[0]), syOf(X, q[1])) : ctx.moveTo(sxOf(X, q[0]), syOf(X, q[1]))));
      ctx.closePath();
      ctx.fillStyle = it.c;
      ctx.fill('evenodd');
    } else if (it.t === 'text') {
      if (!it.c) return;
      const px = Math.max(9, it.font[1] * 4 / 3 * X.s);   // real size, but never below 9 px on screen
      ctx.font = fontCss(it.font, px);
      ctx.fillStyle = it.c;
      ctx.textAlign = it.a === 'sw' ? 'left' : it.a === 's' ? 'center' : 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(it.s, sxOf(X, it.x), syOf(X, it.y));
    } else if (it.t === 'stamp') {
      if (!it.pts.length) return;
      ctx.beginPath();
      it.pts.forEach((q, k) => (k ? ctx.lineTo(sxOf(X, q[0]), syOf(X, q[1])) : ctx.moveTo(sxOf(X, q[0]), syOf(X, q[1]))));
      ctx.closePath();
      if (it.fc) { ctx.fillStyle = it.fc; ctx.fill(); }
      if (it.oc) { ctx.strokeStyle = it.oc; ctx.lineWidth = Math.max(0.8, it.w * X.s); ctx.lineJoin = 'round'; ctx.stroke(); }
    }
  }
  function luminance(hex) {
    const n = parseInt(String(hex).slice(1, 7), 16);
    if (!Number.isFinite(n)) return 1;
    return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  }
  function drawGrid(ctx, X, dark) {
    const [x0, y0, x1, y1] = [(-X.ox) / X.s, (X.oy - X.H) / X.s, (X.W - X.ox) / X.s, X.oy / X.s];
    const steps = [10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000, 10000];
    const step = steps.find((v) => v * X.s >= 34) || 10000;
    const ink = dark ? '255,255,255' : '15,23,42';
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${ink},${dark ? 0.09 : 0.075})`;
    ctx.beginPath();
    for (let x = Math.ceil(x0 / step) * step; x <= x1; x += step) { if (x === 0) continue; const sx = Math.round(sxOf(X, x)) + 0.5; ctx.moveTo(sx, 0); ctx.lineTo(sx, X.H); }
    for (let y = Math.ceil(y0 / step) * step; y <= y1; y += step) { if (y === 0) continue; const sy = Math.round(syOf(X, y)) + 0.5; ctx.moveTo(0, sy); ctx.lineTo(X.W, sy); }
    ctx.stroke();
    ctx.strokeStyle = `rgba(${ink},${dark ? 0.32 : 0.3})`;
    ctx.beginPath();
    const ax = Math.round(sxOf(X, 0)) + 0.5, ay = Math.round(syOf(X, 0)) + 0.5;
    ctx.moveTo(ax, 0); ctx.lineTo(ax, X.H); ctx.moveTo(0, ay); ctx.lineTo(X.W, ay);
    ctx.stroke();
    ctx.fillStyle = `rgba(${ink},${dark ? 0.6 : 0.55})`;
    ctx.font = `10.5px ${SANS}`;
    const lblStep = step * (step * X.s < 46 ? 2 : 1);
    const lx = Math.max(2, Math.min(X.W - 30, ax + 3)), ly = Math.max(12, Math.min(X.H - 3, ay - 3));
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    for (let x = Math.ceil(x0 / lblStep) * lblStep; x <= x1; x += lblStep) { if (x === 0) continue; const sx = sxOf(X, x); if (sx < 14 || sx > X.W - 14) continue; ctx.fillText(fmtNum(x), sx, ly); }
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    for (let y = Math.ceil(y0 / lblStep) * lblStep; y <= y1; y += lblStep) { if (y === 0) continue; const sy = syOf(X, y); if (sy < 10 || sy > X.H - 10) continue; ctx.fillText(fmtNum(y), lx, sy); }
    ctx.textBaseline = 'top';
    ctx.fillText('(0, 0)', Math.min(X.W - 34, ax + 3), Math.min(X.H - 13, ay + 3));
    ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
    ctx.fillText('x', X.W - 4, ay - 2);
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('y', ax + 4, 3);
  }
  // a turtle's visual state at the play head, with the animation in progress
  function turtleNow(id) {
    const t = PB.turtles.get(id);
    if (!t) return null;
    const e = tl[PB.p];
    if (!e || PB.frac <= 0 || e.id !== id) return t;
    if (e.k === 'go') return { ...t, x: e.x0 + (e.x1 - e.x0) * PB.frac, y: e.y0 + (e.y1 - e.y0) * PB.frac };
    if (e.k === 'rot') { const a = e.a0 + e.d * Math.PI / 180 * PB.frac; return { ...t, ox: Math.cos(a), oy: Math.sin(a) }; }
    return t;
  }
  function drawTurtle(ctx, X, st) {
    if (!st.shown || st.shape === 'blank') return;
    const k = Math.max(1, 1 / X.s);
    const poly = host.shapePoly(st, k);
    if (!poly) return;
    ctx.beginPath();
    poly.forEach((q, i) => (i ? ctx.lineTo(sxOf(X, q[0]), syOf(X, q[1])) : ctx.moveTo(sxOf(X, q[0]), syOf(X, q[1]))));
    ctx.closePath();
    if (st.fc) { ctx.fillStyle = st.fc; ctx.fill(); }
    if (st.pc) { ctx.strokeStyle = st.pc; ctx.lineWidth = 1; ctx.lineJoin = 'round'; ctx.stroke(); }
  }
  function drawArc(ctx, X, dark) {
    const r = PB.rot;
    let e = null, frac = 1, alpha = 1;
    const cur = tl[PB.p];
    if (cur && cur.k === 'rot' && cur.show && PB.frac > 0) { e = cur; frac = PB.frac; }
    else if (r) {
      e = tl[r.i];
      if (r.moved) { alpha = 1 - (performance.now() - r.moved) / 900; if (alpha <= 0) return; }
    }
    if (!e || !e.d) return;
    const cx = sxOf(X, e.x), cy = syOf(X, e.y);
    const R = 30;
    const left = e.d > 0;
    const col = left ? (dark ? '#60a5fa' : '#2563eb') : (dark ? '#fb923c' : '#ea580c');
    const a0 = -e.a0, a1 = -(e.a0 + e.d * Math.PI / 180 * frac);
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = col; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a0) * (R + 12), cy + Math.sin(a0) * (R + 12)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = col; ctx.globalAlpha *= 0.16;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, a0, a1, left); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1, left); ctx.stroke();
    const tipA = a1;
    const hx = cx + Math.cos(tipA) * R, hy = cy + Math.sin(tipA) * R;
    const dir = tipA + (left ? -Math.PI / 2 : Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(hx + Math.cos(dir) * 7, hy + Math.sin(dir) * 7);
    ctx.lineTo(hx + Math.cos(dir + 2.5) * 6, hy + Math.sin(dir + 2.5) * 6);
    ctx.lineTo(hx + Math.cos(dir - 2.5) * 6, hy + Math.sin(dir - 2.5) * 6);
    ctx.closePath(); ctx.fill();
    const mid = (a0 + a1) / 2;
    const label = `${left ? T('left', 'kiri') : T('right', 'kanan')} ${fmtNum(Math.abs(e.d) * frac)}°`;
    ctx.font = `600 12px ${SANS}`;
    const tw = ctx.measureText(label).width;
    let lx = cx + Math.cos(mid) * (R + 22), ly = cy + Math.sin(mid) * (R + 18);
    lx = Math.max(tw / 2 + 4, Math.min(X.W - tw / 2 - 4, lx)); ly = Math.max(12, Math.min(X.H - 12, ly));
    ctx.fillStyle = dark ? 'rgba(15,23,42,.85)' : 'rgba(255,255,255,.9)';
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(lx - tw / 2 - 5, ly - 10, tw + 10, 20, 6) : ctx.rect(lx - tw / 2 - 5, ly - 10, tw + 10, 20); ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(label, lx, ly + 0.5);
    ctx.restore();
  }
  function draw() {
    const ctx = cv.ctx;
    const X = xform();
    const bg = PB ? PB.bg : '#ffffff';
    const dark = luminance(bg) < 0.45;
    ctx.save();
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, X.W, X.H);
    if (showGrid) drawGrid(ctx, X, dark);
    // the turtle window's own edge when the view is zoomed out beyond it
    const [ww, wh] = PB ? PB.win : WIN_DEFAULT;
    const wx0 = sxOf(X, -ww / 2), wy0 = syOf(X, wh / 2), wx1 = sxOf(X, ww / 2), wy1 = syOf(X, -wh / 2);
    if (wx0 > 2 || wy0 > 2 || wx1 < X.W - 2 || wy1 < X.H - 2) {
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = dark ? 'rgba(255,255,255,.35)' : 'rgba(15,23,42,.35)';
      ctx.lineWidth = 1;
      ctx.strokeRect(Math.round(wx0) + 0.5, Math.round(wy0) + 0.5, Math.round(wx1 - wx0), Math.round(wy1 - wy0));
      ctx.setLineDash([]);
    }
    if (PB && host) {
      ensureCache(X);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(cache.canvas, 0, 0);
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // the segment being drawn right now
      const e = tl[PB.p];
      if (e && e.k === 'go' && PB.frac > 0 && e.item !== undefined) {
        const it = items[e.item];
        if (it.c) {
          const x = e.x0 + (e.x1 - e.x0) * PB.frac, y = e.y0 + (e.y1 - e.y0) * PB.frac;
          ctx.strokeStyle = it.c; ctx.lineWidth = Math.max(0.8, it.w * X.s); ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(sxOf(X, e.x0), syOf(X, e.y0)); ctx.lineTo(sxOf(X, x), syOf(X, y)); ctx.stroke();
        }
      }
      if (showAngles) drawArc(ctx, X, dark);
      for (const id of PB.order) { const st = turtleNow(id); if (st) drawTurtle(ctx, X, st); }
    }
    ctx.restore();
  }

  // ------------------------------------------------------------------ text panels
  function typicalTurn() {
    let best = null, bestN = 0;
    for (const [k, n] of PB.stats.hist) if (n > bestN) { best = k; bestN = n; }
    return best;
  }
  function renderHud() {
    if (!PB) return;
    const id = PB.focus || PB.order[0];
    const t = id ? turtleNow(id) : null;
    const S = PB.stats;
    const turn = typicalTurn();
    const fullTurns = S.turning / 360;
    const parts = [];
    if (t) {
      const h = t.h;
      parts.push(`<span>x <b>${esc(host.pyFixed(t.x, 2))}</b></span>`, `<span>y <b>${esc(host.pyFixed(t.y, 2))}</b></span>`,
        `<span>${esc(T('heading', 'arah'))} <b>${esc(fmtNum(h, 2))}°</b></span>`,
        `<span>${esc(T('pen', 'pena'))} <b>${esc(t.down ? T('down', 'turun') : T('up', 'naik'))}</b></span>`,
        `<span>${esc(T('colour', 'warna'))}<span class="tg-sw" style="background:${t.pc || 'transparent'}"></span><b>${esc(t.pcName === '' ? '""' : t.pcName)}</b></span>`);
    } else parts.push(`<span>${esc(T('No turtle yet: turtle.Turtle() creates one.', 'Belum ada kura-kura: turtle.Turtle() membuatnya.'))}</span>`);
    parts.push(`<span>${esc(T('lines', 'garis'))} <b>${S.lines}</b></span>`, `<span>${esc(T('circles', 'lingkaran'))} <b>${S.circles}</b></span>`,
      `<span>${esc(T('turns', 'belokan'))} <b>${S.turns}</b>${turn !== null ? ` (${esc(T('mostly', 'umumnya'))} <b>${esc(fmtNum(turn))}°</b>)` : ''}</span>`,
      `<span class="tot">${esc(T('total turning', 'total belokan'))} <b>${esc((S.turning > 0 ? '+' : '') + fmtNum(S.turning))}°</b> = <b>${esc(fmtNum(fullTurns, 3))}</b> ${esc(T(Math.abs(fullTurns) === 1 ? 'full turn' : 'full turns', 'putaran penuh'))}</span>`);
    const html = parts.join('');
    if (hud.innerHTML !== html) hud.innerHTML = html;
    winTitle.textContent = PB.title;
  }
  function errHint(e) {
    const m = `${e.type}: ${e.message}`;
    if (/can't multiply sequence by non-int of type 'float'/.test(m)) return T('A number was expected, but the value is text (str) or a list. input() always gives text: convert it with int() or float() first.', 'Diharapkan bilangan, tetapi nilainya teks (str) atau list. input() selalu menghasilkan teks: ubah dulu dengan int() atau float().');
    if (/^NameError: name 't' is not defined/.test(m)) return T('Create the turtle before using it: t = turtle.Turtle()', 'Buat kura-kuranya sebelum dipakai: t = turtle.Turtle()');
    if (/^NameError: name 'turtle' is not defined/.test(m)) return T('The first line must be import turtle.', 'Baris pertama harus import turtle.');
    // t = turtle.Turtle (no brackets) makes t the class, so t.forward(100) calls the method without a turtle
    if (/^TypeError: (descriptor '\w+' for 'Turtle' objects doesn't apply to|unbound method Turtle\.\w+\(\) needs an argument)/.test(m)) return T('Brackets missing? t = turtle.Turtle without () does not create a turtle: write t = turtle.Turtle(). (python3 words this TypeError differently: it says an argument of the method is missing.)', 'Kurung terlupa? t = turtle.Turtle tanpa () tidak membuat kura-kura: tulis t = turtle.Turtle(). (python3 menulis TypeError ini dengan kata-kata lain: katanya ada argumen metode yang kurang.)');
    if (/^AttributeError: .*Did you mean/.test(m)) return T('That turtle command does not exist. Python suggests the closest name after "Did you mean".', 'Perintah turtle itu tidak ada. Python menyarankan nama terdekat setelah "Did you mean".');
    if (/^AttributeError/.test(m)) return T('That command does not exist for this object: check the spelling.', 'Perintah itu tidak ada untuk objek ini: periksa ejaannya.');
    if (/TurtleGraphicsError: bad color/.test(m)) return T('Use an English colour name such as "red" or "dark green", a code such as "#ff8800", or three numbers (r, g, b) from 0 to 1.', 'Gunakan nama warna bahasa Inggris seperti "red" atau "dark green", kode seperti "#ff8800", atau tiga bilangan (r, g, b) dari 0 sampai 1.');
    if (/missing \d required positional argument/.test(m)) return T('This command needs a value in its brackets, for example forward(100) or left(90).', 'Perintah ini memerlukan nilai di dalam kurungnya, misalnya forward(100) atau left(90).');
    if (/takes .* positional argument/.test(m)) return T('Too many values in the brackets for this command.', 'Terlalu banyak nilai di dalam kurung untuk perintah ini.');
    if (/^StepLimit/.test(m)) return T('The program ran for too long: is there an endless loop (a while loop whose condition never becomes False)?', 'Program berjalan terlalu lama: adakah perulangan tanpa akhir (while yang syaratnya tidak pernah False)?');
    if (/^(Syntax|Indentation|Tab)Error/.test(m)) return T('Python could not read the program, so nothing was drawn. Look at the red line and the ^ marks in the console.', 'Python tidak dapat membaca programnya, jadi tidak ada yang digambar. Lihat baris merah dan tanda ^ di konsol.');
    if (/^NotImplementedError/.test(m)) return T('This turtle feature is not part of the simulation.', 'Fitur turtle ini tidak tersedia dalam simulasi.');
    return '';
  }
  function statusHTML() {
    if (compileError) {
      const e = compileError;
      return `<b>${esc(T(`Line ${e.line}: ${e.type}`, `Baris ${e.line}: ${e.type}`))}</b> – <code>${esc(e.message)}</code><span class="hint">${esc(errHint(e))}</span>`;
    }
    if (stale && host && PB.p > 0) return `<b>${esc(T('Code changed.', 'Kode berubah.'))}</b> ${esc(T('Press Run or Step to draw the new version.', 'Tekan Jalankan atau Langkah untuk menggambar versi baru.'))}`;
    if (stale) return esc(T('Press Run to draw, or Step to run one line at a time.', 'Tekan Jalankan untuk menggambar, atau Langkah untuk menjalankan baris demi baris.'));
    if (waiting) return `<b>${esc(T('Waiting for input:', 'Menunggu input:'))}</b> ${esc(T('type a value in the console and press Enter.', 'ketik nilai di konsol lalu tekan Enter.'))}`;
    const e = tl[PB.p];
    if (PB.err && (PB.p >= tl.length || !e)) {
      const er = PB.err;
      return `<b>${esc(T(`Line ${er.line}: ${er.type}`, `Baris ${er.line}: ${er.type}`))}</b> – <code>${esc(er.message)}</code><span class="hint">${esc(errHint(er))}</span>`;
    }
    if (PB.ended === 'done' && PB.p >= tl.length) {
      const S = PB.stats;
      const full = S.turning / 360;
      return `<b>${esc(T('Finished.', 'Selesai.'))}</b> ${esc(T(`${nw(S.lines, 'straight line', 'straight lines')}, ${nw(S.circles, 'circle', 'circles')}, ${nw(S.turns, 'turn', 'turns')}; total turning ${fmtNum(S.turning)}° = ${fmtNum(full, 3)} ${Math.abs(full) === 1 ? 'full turn' : 'full turns'}.`,
        `${S.lines} garis lurus, ${S.circles} lingkaran, ${S.turns} belokan; total belokan ${fmtNum(S.turning)}° = ${fmtNum(S.turning / 360, 3)} putaran penuh.`))}`;
    }
    if (PB.p === 0) return `${esc(T('Predict first: what will the turtle draw? Then press Run, or Step to run one line at a time.', 'Tebak dulu: apa yang akan digambar kura-kura? Lalu tekan Jalankan, atau Langkah untuk menjalankan baris demi baris.'))}`;
    const line = PB.line;
    const src = (cp.value.split('\n')[(e && e.k === 'L' ? e.line : line) - 1] || '').trim();
    if (e && e.k === 'L' && !playing) return `<b>${esc(T(`Line ${e.line} runs next:`, `Baris ${e.line} berikutnya:`))}</b> <code>${esc(src)}</code>`;
    return `<b>${esc(T(`Running line ${line}:`, `Menjalankan baris ${line}:`))}</b> <code>${esc(src)}</code>`;
  }
  let statusKey = '';
  function renderStatus() {
    const html = statusHTML();
    if (html !== statusKey) { statusKey = html; status.innerHTML = html; }
    status.classList.toggle('is-err', !!compileError || (!!PB && !!PB.err && PB.p >= tl.length));
  }
  function renderButtons() {
    const ready = !stale && host && !compileError;
    bBack.disabled = !ready || PB.p === 0;
    bStep.disabled = false;
    bRun.textContent = playing && stepTarget === null ? T('❚❚ Pause', '❚❚ Jeda') : T('▶ Run', '▶ Jalankan');
    bRun.setAttribute('aria-label', playing && stepTarget === null ? T('Pause', 'Jeda') : T('Run: draw with animation', 'Jalankan: menggambar dengan animasi'));
    bEnd.disabled = !!compileError && !stale;
    scrubIn.disabled = !ready || lIdx.length === 0;
  }
  function renderScrub() {
    if (!PB) return;
    const total = lIdx.length;
    let k = 0;
    { let lo = 0, hi = lIdx.length; while (lo < hi) { const m = (lo + hi) >> 1; if (lIdx[m] < PB.p) lo = m + 1; else hi = m; } k = lo; }
    if (PB.p >= tl.length && tl.length) k = total;
    scrubIn.max = String(total);
    scrubIn.value = String(k);
    scrubIn.setAttribute('aria-valuetext', T(`${k} of ${total} lines run`, `${k} dari ${total} baris dijalankan`));
    count.textContent = `${T('Step', 'Langkah')} ${k}/${total}${runSt === 'input' ? '+' : ''}`;
  }
  let marksKey = '';
  function renderCode() {
    if (!PB) return;
    let active = null;
    if (!stale && host && !compileError) {
      const e = tl[PB.p];
      if (e && e.k === 'L' && PB.frac === 0) active = e.line;
      else if (PB.line && !(PB.ended && PB.p >= tl.length)) active = PB.line;
    }
    const marks = [];
    if (compileError) {
      const er = compileError, m = { line: er.line, kind: 'error', note: er.type };
      if (er.col) { m.col = Math.max(0, er.col - 1); if (Number.isFinite(er.endCol) && (er.endLine == null || er.endLine === er.line) && er.endCol > er.col) m.endCol = er.endCol - 1; }
      marks.push(m);
    }
    else if (!stale && PB) {
      for (const l of PB.visited) marks.push({ line: l, kind: 'visited' });
      if (PB.err && PB.p >= tl.length && PB.err.line) marks.push({ line: PB.err.line, kind: 'error', note: PB.err.type.replace(/^turtle\./, '') });
    }
    const key = JSON.stringify(marks);
    if (key !== marksKey) { marksKey = key; cp.setMarks(marks); }
    if (cp.activeLine !== active) cp.setActiveLine(active, { scroll: true });
  }
  function renderDesc() {
    if (!PB) return;
    const S = PB.stats;
    const id = PB.focus || PB.order[0];
    const t = id ? PB.turtles.get(id) : null;
    const text = T(`Turtle window "${PB.title}". Drawn so far: ${S.lines} straight lines, ${S.circles} circles, ${S.turns} turns, total turning ${fmtNum(S.turning)} degrees.`
      + (t ? ` Turtle at x ${host.pyFixed(t.x, 2)}, y ${host.pyFixed(t.y, 2)}, heading ${fmtNum(t.h)} degrees, pen ${t.down ? 'down' : 'up'}, colour ${t.pcName || 'none'}.` : ''),
    `Jendela turtle "${PB.title}". Sudah digambar: ${S.lines} garis lurus, ${S.circles} lingkaran, ${S.turns} belokan, total belokan ${fmtNum(S.turning)} derajat.`
      + (t ? ` Kura-kura di x ${host.pyFixed(t.x, 2)}, y ${host.pyFixed(t.y, 2)}, arah ${fmtNum(t.h)} derajat, pena ${t.down ? 'turun' : 'naik'}, warna ${t.pcName || 'tidak ada'}.` : ''));
    if (text !== lastDesc) { lastDesc = text; desc.textContent = text; }
  }
  function renderAll() {
    if (!PB) return;
    renderStatus(); renderButtons(); renderScrub(); renderCode(); renderDesc(); renderHud();
    requestDraw();
  }

  // ------------------------------------------------------------------ lab
  function labRow() {
    if (!PB || stale || !host || compileError || PB.p === 0) return null;
    const S = PB.stats;
    if (!PB.ended && S.lines + S.circles + S.turns === 0) return null;   // nothing drawn or turned yet
    const turn = typicalTurn();
    return {
      program: `${PRESETS.indexOf(preset) + 1} ${preset.key}${edited ? ' (edited)' : ''}`,
      lines: S.lines,
      circles: S.circles,
      turns: S.turns,
      angle: turn === null ? '-' : Math.round(turn * 100) / 100,
      total: Math.round(S.turning * 100) / 100,
      full: Math.round(S.turning / 360 * 1000) / 1000,
    };
  }

  // ------------------------------------------------------------------ events
  scrubIn.addEventListener('input', () => {
    if (stale || !host) return;
    stopPlay(false);
    if (waiting) { out.cancelPrompt(); waiting = null; }
    const k = Number(scrubIn.value);
    seekTo(k >= lIdx.length ? tl.length : lIdx[k]);
    updateView(true);
    renderAll();
  });
  cw.addEventListener('keydown', (ev) => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    const k = ev.key;
    if (k === 'ArrowRight') stepForward();
    else if (k === 'ArrowLeft') stepBack();
    else if (k === ' ' || k === 'Enter') togglePlay();
    else if (k === 'Home') restart();
    else if (k === 'End') toEnd();
    else return;
    ev.preventDefault();
  });
  cv.canvas.style.touchAction = 'manipulation';
  cv.canvas.addEventListener('pointermove', (ev) => {
    const r = cv.canvas.getBoundingClientRect();
    const X = xform();
    const wx = ((ev.clientX - r.left) - X.ox) / X.s, wy = (X.oy - (ev.clientY - r.top)) / X.s;
    winXY.textContent = `(${Math.round(wx)}, ${Math.round(wy)})`;
  });
  cv.canvas.addEventListener('pointerleave', () => { winXY.textContent = ''; });
  const ro = new ResizeObserver(() => {
    const wide = main.clientWidth >= 720;
    if (wide !== main.classList.contains('is-wide')) main.classList.toggle('is-wide', wide);
    sizeCanvas();
    requestDraw();
  });
  ro.observe(main);
  ro.observe(cw);

  // ------------------------------------------------------------------ start
  main.classList.toggle('is-wide', main.clientWidth >= 720);
  loadPreset(preset.key);

  return () => {
    destroyed = true;
    if (raf) cancelAnimationFrame(raf);
    ro.disconnect();
    out.cancelPrompt();
    cp.destroy(); out.destroy(); cv.destroy();
    main.remove(); ctrlPanel.remove(); style.remove();
  };
}
