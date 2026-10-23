# string.Template: $name / ${name} substitution, $$ escape, safe_substitute leaves unknown placeholders
from string import Template
t = Template("Halo $nama, nilai ${mapel}mu $nilai. Diskon 10$$!")
print(t.substitute(nama="Budi", mapel="IPA", nilai=90))
print(t.substitute({"nama": "Citra", "mapel": "Fisika", "nilai": 87.5}))
print(t.safe_substitute(nama="Dewi"), t.template)
print(Template("$a$b-${a}c").substitute(a=1, b=[2]), Template("$x").substitute({"x": "dict"}, x="kw"))
print(t.get_identifiers(), t.is_valid(), Template("$").is_valid())
for tpl, kw in [("$nama", {}), ("${nama", {"nama": 1}), ("$ x", {}), ("$1", {})]:
    try:
        print(Template(tpl).substitute(**kw))
    except (KeyError, ValueError) as e:
        print(type(e).__name__, e)
print(Template("${nama").safe_substitute(nama=1), Template("$ x").safe_substitute())
