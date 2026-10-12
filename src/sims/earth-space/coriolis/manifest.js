export default {
  id: 'coriolis',
  subject: 'earth-space',
  title: { en: 'Coriolis Effect', id: 'Efek Coriolis' },
  description: {
    en: 'Stand on a spinning carousel and try to throw a ball straight across. From your view it curves; from outside, it travels in a straight line — you and your target moved. The same trick steers hurricanes.',
    id: 'Berdiri di komidi putar dan coba lempar bola lurus melintas. Dari sudut pandang Anda bola membelok; dari luar, ia bergerak lurus — Anda dan targetnyalah yang bergerak. Trik yang sama membelokkan badai.',
  },
  details: () => import('./details.js'),
  topics: ['rotating-frames', 'meteorology'],
  load: () => import('./sim.js'),
};
