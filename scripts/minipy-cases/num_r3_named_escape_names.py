# \N{name} accepts any Unicode character name (case-insensitive), incl. the algorithmic CJK / Hangul names
# and name aliases; science text often needs Greek letters, sub/superscripts and unit symbols
print("H\N{SUBSCRIPT TWO}O", "CO\N{SUBSCRIPT TWO}", "x\N{SUPERSCRIPT MINUS}\N{SUPERSCRIPT ONE}", "10\N{SUPERSCRIPT THREE}")
print("\N{GREEK CAPITAL LETTER DELTA}t", "\N{GREEK SMALL LETTER LAMDA}", "\N{GREEK SMALL LETTER THETA}", "\N{GREEK SMALL LETTER RHO}", "\N{GREEK SMALL LETTER SIGMA}", "\N{GREEK SMALL LETTER OMEGA}", "\N{GREEK CAPITAL LETTER SIGMA}")
print("5 \N{MICRO SIGN}m", "\N{ANGSTROM SIGN}", "\N{DEGREE CELSIUS}", "\N{OHM SIGN}", "\N{ALMOST EQUAL TO}", "\N{VULGAR FRACTION ONE HALF}", "\N{MIDDLE DOT}", "\N{PER MILLE SIGN}")
print("\N{RIGHTWARDS HARPOON OVER LEFTWARDS HARPOON}", "\N{BOX DRAWINGS LIGHT HORIZONTAL}" * 5, "\N{FULL BLOCK}\N{LIGHT SHADE}", "\N{CROSS MARK}", "\N{WARNING SIGN}", "\N{THUMBS UP SIGN}")
print("\N{latin small letter a with grave}", "\N{Hangul Syllable Ga}", "\N{CJK UNIFIED IDEOGRAPH-4E00}", repr("\N{LINE FEED}\N{NULL}\N{NBSP}\N{ZERO WIDTH SPACE}"), len("\N{NO-BREAK SPACE}"))
