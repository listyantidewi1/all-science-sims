export default {
  id: 'motion-graphs',
  subject: 'physics',
  title: { en: 'Motion Graphs', id: 'Grafik Gerak' },
  description: {
    en: 'Drive a car along a straight road with a velocity slider, or pick a preset: constant speed, speeding up, slowing down or stop-and-go. Position–time and velocity–time graphs draw themselves as you go, with the area under the v–t graph shaded to show the distance covered. Mark two points to measure the slope of the x–t graph, and take the "match the graph" challenge against three target graphs.',
    id: 'Kemudikan mobil di jalan lurus dengan slider kecepatan, atau pilih pola: kelajuan tetap, makin cepat, melambat atau jalan–berhenti. Grafik posisi–waktu dan kecepatan–waktu tergambar sendiri sambil kamu berjalan, dengan luas di bawah grafik v–t diarsir untuk menunjukkan jarak yang ditempuh. Tandai dua titik untuk mengukur kemiringan grafik x–t, dan coba tantangan "cocokkan grafik" dengan tiga grafik target.',
  },
  topics: ['kinematics', 'graphs', 'velocity', 'GLB', 'GLBB'],
  grade: [7, 8, 9, 10],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
