# isnumeric() is true for every character with a Unicode numeric value, including CJK ideographs whose value
# comes from Unihan (零 两 亿 拾 ...); isdigit() includes Numeric_Type=Digit characters beyond decimals
for c in "零一二两三十百千万亿兆壱弐拾〇参伍佰仟":
    print(c, c.isnumeric(), c.isdigit(), c.isdecimal(), c.isalpha(), c.isalnum())
print("三百".isnumeric(), "两千".isnumeric(), "Rp一万".isnumeric(), "二〇二四".isnumeric())
for c in ["\U00010e65", "\U00011056", "\U0001f105", "①", "⑴", "²", "٣"]:
    print(repr(c), c.isdigit(), c.isdecimal(), c.isnumeric())
