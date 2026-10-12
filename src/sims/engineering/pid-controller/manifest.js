export default {
  id: 'pid-controller',
  subject: 'engineering',
  title: { en: 'PID Controller', id: 'Pengendali PID' },
  description: {
    en: 'A first-order plant being driven to a setpoint by a PID controller. Tune Kp, Ki, Kd and watch the response settle, oscillate, or run away. Hit the disturbance button to kick the system mid-flight and see how the controller recovers.',
    id: 'Sebuah plant orde pertama digerakkan menuju setpoint oleh pengendali PID. Atur Kp, Ki, Kd dan amati responnya stabil, berosilasi, atau lepas kendali. Tekan tombol gangguan untuk mengganggu sistem dan lihat bagaimana pengendali pulih.',
  },
  details: () => import('./details.js'),
  topics: ['control-systems'],
  grade: [12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
