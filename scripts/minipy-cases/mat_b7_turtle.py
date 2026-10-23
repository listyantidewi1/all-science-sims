# minipy: skip turtle needs a host module (tested in scripts/test-minipy-api.mjs)
import turtle
t = turtle.Turtle()
t.color("green")
for i in range(4):          # empat sisi persegi
    t.forward(120)
    t.left(90)
for i in range(36):         # pola bunga dari 36 lingkaran
    t.circle(60)
    t.right(10)
turtle.done()
