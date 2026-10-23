# float.hex() always prints 13 hex digits of mantissa; float.fromhex() parses it back
for x in [3.75, 1.0, 0.1, -2.5, 0.0, -0.0, 5e-324, 1.7976931348623157e308, 1e-310, 255.0]:
    print(repr(x), x.hex())
print(float("inf").hex(), float("nan").hex())
print(float.fromhex("0x1.8p1"), float.fromhex("0x1.e000000000000p+1"), float.fromhex("-0x1p-1074"), float.fromhex(" 0XA.8P0 "))
