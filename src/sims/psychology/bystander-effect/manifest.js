export default {
  id: 'bystander-effect',
  subject: 'psychology',
  title: { en: 'Bystander Effect', id: 'Efek Pengamat' },
  description: {
    en: 'Someone collapses in front of N bystanders. Each person is willing to help, but the more people present, the more each one assumes someone else will act — diffusion of responsibility. Run hundreds of simulated emergencies and plot the chance that anyone helps against group size, next to the naive "more people, more help" expectation and the Darley & Latané (1968) data: 85% alone, 62% with one other, 31% with four others.',
    id: 'Seseorang pingsan di depan N pengamat. Setiap orang bersedia menolong, tetapi semakin banyak orang hadir, semakin tiap orang menganggap orang lain yang akan bertindak — difusi tanggung jawab. Jalankan ratusan keadaan darurat simulasi dan plot peluang ada yang menolong terhadap ukuran kelompok, berdampingan dengan dugaan naif "lebih banyak orang, lebih banyak pertolongan" dan data Darley & Latané (1968): 85% sendirian, 62% dengan satu orang lain, 31% dengan empat orang lain.',
  },
  details: () => import('./details.js'),
  topics: ['social-psychology', 'prosocial-behavior'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
