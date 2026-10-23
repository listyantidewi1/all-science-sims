# Third-party notices

All-Science Sims is original work licensed under the PolyForm Noncommercial License 1.0.0 (see [LICENSE](LICENSE)),
with one exception: the Python interpreter used by the programming sims, and two of those sims, contain code adapted
from the open-source projects listed below. Those parts stay under their own licenses, which are reproduced or linked
here. All of these licenses allow use, modification and redistribution, including in commercial products, as long as
their notices are kept. They apply to the files named below in addition to LICENSE, and LICENSE does not restrict
any right that they grant for those parts.

| Component | Used in | License |
|---|---|---|
| [CPython 3.13](#1-cpython-313) | `src/lib/minipy.js`, `src/lib/minipy/`, `src/sims/computer-science/dictionary-lookup/sim.js` | Python Software Foundation License Version 2 |
| [Mersenne Twister (MT19937)](#2-mersenne-twister-mt19937) | `src/lib/minipy/random_mt.js` | BSD 3-Clause |
| [GNU C Library 2.39 (libm)](#3-gnu-c-library-239-libm) | `src/lib/minipy/libm.js`, `src/lib/minipy/libm-tables.js`, `src/lib/minipy/crmath.js` | LGPL-2.1-or-later |
| [Unicode Character Database 15.1.0](#4-unicode-character-database-1510) | `src/lib/minipy/unidata.js`, `src/lib/minipy/uninames.js` | Unicode License V3 |
| [turtle.py](#5-turtlepy) | `src/sims/computer-science/turtle-graphics/sim.js` | zlib-style license (Gregor Lingl) |
| [matplotlib](#6-matplotlib) | `src/sims/computer-science/class-data-charts/sim.js` | Matplotlib License (PSF-based) |

---

## 1. CPython 3.13

minipy (`src/lib/minipy.js` and `src/lib/minipy/`) is a JavaScript reimplementation of part of the Python 3.13
language and standard library. To print exactly what `python3` prints, it reproduces CPython's error messages and
several of its algorithms. The following are ports of CPython source:

- list sorting (`sort.js`, from Objects/listobject.c);
- "Did you mean" suggestions (`suggest.js`, from Python/suggestions.c);
- syntax-error rendering (`synerr.js`, from Lib/traceback.py);
- `%` formatting and `str.format` (`numfmt.js` and `builtins.js`, from Objects/unicodeobject.c and Objects/stringlib/unicode_format.h);
- the `random` module algorithms (`random_mt.js`, from Lib/random.py and Modules/_randommodule.c);
- `statistics` and `strptime` (`modules.js`, from Lib/statistics.py and Lib/_strptime.py);
- `math.gamma` and `math.lgamma` (`crmath.js`, from Modules/mathmodule.c).

`pydocs.js`, `methoddocs.js` and `pydata.js` are generated from CPython 3.13: docstrings, signatures and public
names. The Dictionaries sim (`dictionary-lookup/sim.js`) models the slot probing of CPython's dict
(Objects/dictobject.c).

**Summary of changes (PSF License, clause 3):** the code was rewritten in JavaScript as a step-by-step interpreter
for the subset of Python taught in school. Classes, `with`, generators, decorators, async, bytes and complex numbers
are left out. Execution was changed to run one statement at a time, with snapshots of frames and variables, and a
step limit was added. Only the parts listed above were ported.

Copyright (c) 2001-2024 Python Software Foundation; All Rights Reserved.

The full CPython 3.13 license file, including the PSF License Agreement and the history of the software, is in
[licenses/CPython-3.13-LICENSE.txt](licenses/CPython-3.13-LICENSE.txt).

## 2. Mersenne Twister (MT19937)

`src/lib/minipy/random_mt.js` contains a JavaScript port of the MT19937 generator as used by CPython's `_random`
module. The original notice:

```
A C-program for MT19937, with initialization improved 2002/1/26.
Coded by Takuji Nishimura and Makoto Matsumoto.

Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

 1. Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

 3. The names of its contributors may not be used to endorse or promote
    products derived from this software without specific prior written
    permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

## 3. GNU C Library 2.39 (libm)

CPython's `math` module and `**` call the C library. To match `python3` on Linux bit for bit, minipy contains
JavaScript ports of glibc 2.39's double-precision functions and their data tables:

- `src/lib/minipy/libm.js` and `src/lib/minipy/libm-tables.js`: exp, exp2, log, log2, pow, sin, cos, tan, asin, acos,
  atan, atan2, expm1 and log1p, plus the argument reduction they use.
- `src/lib/minipy/crmath.js`: the glibc-derived functions log10, sinh, cosh, tanh, asinh, acosh, atanh, cbrt, erf
  and erfc. The same file also holds CPython-derived code (section 1).

These three files are free software: you can redistribute them and/or modify them under the terms of the GNU Lesser
General Public License as published by the Free Software Foundation, either version 2.1 of the License or (at your
option) any later version. They are distributed in the hope that they will be useful, but WITHOUT ANY WARRANTY,
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
Public License for more details. A copy is in [licenses/LGPL-2.1.txt](licenses/LGPL-2.1.txt).

The rest of All-Science Sims only calls these files through their exported functions. Their complete source is in
this repository, and you may modify or replace them, rebuild the site with `npm run build`, and debug the result.
The rest of the project remains under LICENSE.

Notices carried by the original sources:

- Copyright (C) 1991-2024 Free Software Foundation, Inc. (GNU C Library).
- sin, cos, tan, asin, acos, atan, atan2 and the argument reduction come from the IBM Accurate Mathematical Library,
  written by International Business Machines Corp.
- exp, exp2, log, log2 and pow come from Arm's Optimized Routines, Copyright (c) Arm Limited, contributed to glibc.
  Upstream, that code is also available under MIT OR Apache-2.0 WITH LLVM-exception.
- Several functions are based on fdlibm:

  ```
  Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.

  Developed at SunPro, a Sun Microsystems, Inc. business.
  Permission to use, copy, modify, and distribute this
  software is freely granted, provided that this notice
  is preserved.
  ```

## 4. Unicode Character Database 15.1.0

`src/lib/minipy/unidata.js` (character properties and case mappings) and `src/lib/minipy/uninames.js` (character
names for `\N{...}` escapes) are generated from the Unicode Character Database 15.1.0, as shipped in CPython 3.13's
`unicodedata`, and from NameAliases.txt, by `scripts/gen-minipy-unicode.py`.

```
UNICODE LICENSE V3

COPYRIGHT AND PERMISSION NOTICE

Copyright © 1991-2023 Unicode, Inc.

NOTICE TO USER: Carefully read the following legal agreement. BY
DOWNLOADING, INSTALLING, COPYING OR OTHERWISE USING DATA FILES, AND/OR
SOFTWARE, YOU UNEQUIVOCALLY ACCEPT, AND AGREE TO BE BOUND BY, ALL OF THE
TERMS AND CONDITIONS OF THIS AGREEMENT. IF YOU DO NOT AGREE, DO NOT
DOWNLOAD, INSTALL, COPY, DISTRIBUTE OR USE THE DATA FILES OR SOFTWARE.

Permission is hereby granted, free of charge, to any person obtaining a
copy of data files and any associated documentation (the "Data Files") or
software and any associated documentation (the "Software") to deal in the
Data Files or Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, and/or sell
copies of the Data Files or Software, and to permit persons to whom the
Data Files or Software are furnished to do so, provided that either (a)
this copyright and permission notice appear with all copies of the Data
Files or Software, or (b) this copyright and permission notice appear in
associated Documentation.

THE DATA FILES AND SOFTWARE ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF
THIRD PARTY RIGHTS.

IN NO EVENT SHALL THE COPYRIGHT HOLDER OR HOLDERS INCLUDED IN THIS NOTICE
BE LIABLE FOR ANY CLAIM, OR ANY SPECIAL INDIRECT OR CONSEQUENTIAL DAMAGES,
OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THE DATA
FILES OR SOFTWARE.

Except as contained in this notice, the name of a copyright holder shall
not be used in advertising or otherwise to promote the sale, use or other
dealings in these Data Files or Software without prior written
authorization of the copyright holder.
```

## 5. turtle.py

The `turtle` module of the Turtle Graphics sim (`src/sims/computer-science/turtle-graphics/sim.js`) is an altered
version: a JavaScript port of CPython 3.13's Lib/turtle.py. It covers the turtle's position, heading, pen, circle,
colour and error behaviour, and draws on a canvas instead of Tkinter. It is not the original software. The original
notice:

```
turtle.py: a Tkinter based turtle graphics module for Python
Version 1.1b - 4. 5. 2009

Copyright (C) 2006 - 2010  Gregor Lingl
email: glingl@aon.at

This software is provided 'as-is', without any express or implied
warranty.  In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
3. This notice may not be removed or altered from any source distribution.
```

## 6. matplotlib

The Charts from Class Data sim (`src/sims/computer-science/class-data-charts/sim.js`) contains a small JavaScript
version of `matplotlib.pyplot`, so that the charts match what matplotlib 3.11 draws. It follows matplotlib's
behaviour for:

- the tab10 colour cycle and named colours;
- automatic axis limits and margins;
- MaxNLocator tick placement and ScalarFormatter tick labels;
- `legend(loc="best")` placement;
- argument checks and error messages.

**Summary of changes (Matplotlib License, clause 3):** only that subset was reimplemented in JavaScript, and it draws
on an HTML canvas instead of using matplotlib's backends. Copyright (c) 2012- Matplotlib Development Team; All Rights
Reserved. The Matplotlib License Agreement is in [licenses/matplotlib-LICENSE.txt](licenses/matplotlib-LICENSE.txt).
