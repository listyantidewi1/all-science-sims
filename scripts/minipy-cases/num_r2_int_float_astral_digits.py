# Unicode decimal digits outside the BMP (mathematical digits) are accepted by int() and float()
print(int("𝟏𝟐"), int("𝟗", 16), float("𝟏.𝟓"), float("-𝟐e𝟑"), int("𝟎𝟎𝟕"))
print("𝟏".isdigit(), "𝟏".isdecimal(), "𝟏".isnumeric(), "𝟏𝟐".isdigit())
try:
    int("𝐀")
except ValueError as e:
    print("ValueError:", e)
