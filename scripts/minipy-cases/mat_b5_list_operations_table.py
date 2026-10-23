playlist = ["A", "B", "C"]
print(playlist, playlist[0])
playlist[1] = "X"
print(playlist)
playlist = ["A", "B", "C"]
playlist.append("D"); print(playlist)
playlist = ["A", "B", "C"]
playlist.insert(1, "D"); print(playlist)
playlist = ["A", "B", "C"]
playlist.remove("B"); print(playlist)
playlist = ["A", "B", "C"]
x = playlist.pop(); print(x, playlist)
playlist = ["A", "B", "C"]
print(len(playlist), "B" in playlist, playlist.index("C"), playlist[0:2])
playlist.sort(); print(playlist)
playlist.reverse(); print(playlist)
