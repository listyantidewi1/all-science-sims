export default {
  id: 'pid-controller',
  subject: 'engineering',
  title: { en: 'PID Controller', id: 'Pengendali PID' },
  description: {
    en: 'A first-order plant being driven to a setpoint by a PID controller. Tune Kp, Ki, Kd and watch the response settle, oscillate, or run away. Hit the disturbance button to kick the system mid-flight and see how the controller recovers.',
    id: 'Sebuah plant orde pertama digerakkan menuju setpoint oleh pengendali PID. Atur Kp, Ki, Kd dan amati responnya stabil, berosilasi, atau lepas kendali. Tekan tombol gangguan untuk mengganggu sistem dan lihat bagaimana pengendali pulih.',
  },
  objectives: {
    en: [
      'Feel the role of each gain: P pulls toward, I eliminates steady-state error, D damps overshoot.',
      'Recognize the classic failure modes: oscillation, slow rise, steady-state offset.',
      'Find a stable balance — the Ziegler-Nichols intuition lives here.',
    ],
    id: [
      'Merasakan peran tiap penguat: P menarik ke sasaran, I menghilangkan kesalahan tunak, D meredam overshoot.',
      'Mengenali mode kegagalan klasik: osilasi, naik lambat, offset tunak.',
      'Menemukan keseimbangan stabil — intuisi Ziegler-Nichols ada di sini.',
    ],
  },
  tryThis: {
    en: [
      'Kp only — system reaches near setpoint but with steady-state offset.',
      'Add Ki — offset disappears but overshoot grows.',
      'Add Kd — overshoot tames; response speeds up.',
      'Crank Kp very high — oscillation appears at the natural frequency.',
    ],
    id: [
      'Kp saja — sistem mendekati setpoint tetapi dengan offset tunak.',
      'Tambah Ki — offset hilang tetapi overshoot membesar.',
      'Tambah Kd — overshoot teredam; respon lebih cepat.',
      'Naikkan Kp sangat tinggi — muncul osilasi pada frekuensi alami.',
    ],
  },
  topics: ['control-systems'],
  load: () => import('./sim.js'),
};
