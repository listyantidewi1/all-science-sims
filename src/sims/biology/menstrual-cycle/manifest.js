export default {
  id: 'menstrual-cycle',
  subject: 'biology',
  title: { en: 'Hormones of the Menstrual Cycle', id: 'Hormon Siklus Menstruasi' },
  description: {
    en: 'Slide through a 28-day cycle and watch four hormone curves (FSH, LH, oestrogen, progesterone) drive what happens in the ovary and the uterus: a follicle grows, the LH surge triggers ovulation on day 14, the corpus luteum pumps out progesterone and the endometrium thickens to about 12 mm before it is shed. Toggle fertilisation to see how an embryo keeps progesterone high and stops menstruation.',
    id: 'Geser sepanjang siklus 28 hari dan amati empat kurva hormon (FSH, LH, estrogen, progesteron) menggerakkan apa yang terjadi di ovarium dan uterus: folikel tumbuh, lonjakan LH memicu ovulasi pada hari ke-14, korpus luteum memompa progesteron dan endometrium menebal sampai sekitar 12 mm sebelum luruh. Nyalakan fertilisasi untuk melihat bagaimana embrio menjaga progesteron tetap tinggi dan menghentikan menstruasi.',
  },
  topics: ['reproductive system', 'hormones', 'feedback', 'endocrine system'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
