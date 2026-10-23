nama = "Andi"
nilai = 85.678
print(f"Halo {nama}, nilaimu {nilai}")
print(f"{nilai:.2f} {nilai:.0f} {nilai:.1f} {2.5:.0f} {3.5:.0f} {0.125:.2f} {2.675:.2f}")
print(f"{1234567:,} {1234567.891:,.2f} {-9876543.21:,.1f} {1000:_}")
print(f"[{nama:>8}] [{nama:<8}] [{nama:^8}] [{nama:*^9}] [{42:>5}] [{42:<5}|]")
print(f"{7:05d} {-7:05d} {3.14159:08.3f} {42:+d} {42: d}")
print(f"{0.256:.1%} {1/3:.2%} {2:%}")
print(f"{nama!r} {nama=} {nilai = :.1f} {1+2=}")
print(f"{{kurung}} {'kutip'} {[1, 2]} {None} {True}")
lebar = 10
print(f"{nama:>{lebar}}|{nilai:.{2}f}")
print(f"{255:x} {255:X} {255:#x} {5:b} {8:o} {65:c}")
print(f"{12345.6789:e} {0.000123:.2e} {123456789:g} {0.0001:g} {1e20:g}")
