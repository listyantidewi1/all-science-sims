# glibc's asin/acos are correctly rounded here; arguments close to +-1 (steep angles)
import math
xs = [0.9737110066257741, -0.9735934066728267, 0.9966689557620634, -0.9964502755949307, 0.9747012699172286,
      0.9736752977090126, 0.999408117329835, -0.9776213506330755]
for x in xs:
    print(x, math.asin(x), math.acos(x), math.degrees(math.asin(x)))
