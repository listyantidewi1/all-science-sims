export default {
  id: 'text-classifier',
  subject: 'data-science',
  title: { en: 'Spam or Not? Naive Bayes', id: 'Spam atau Bukan? Naive Bayes' },
  description: {
    en: 'Build a spam filter from twenty short messages. The classifier counts how often each word appears in spam and in normal mail, smooths the counts so unseen words do not break it, and multiplies the word probabilities together with Bayes\' rule. Type any message to see each word push the verdict towards spam or ham, then add your own training messages and watch the filter change its mind.',
    id: 'Bangun penyaring spam dari dua puluh pesan pendek. Pengklasifikasi menghitung seberapa sering tiap kata muncul di spam dan di pesan biasa, menghaluskan hitungannya agar kata yang belum pernah dilihat tidak merusaknya, lalu mengalikan peluang kata-kata dengan aturan Bayes. Ketik pesan apa pun untuk melihat tiap kata mendorong putusan ke arah spam atau bukan, lalu tambahkan pesan latihanmu sendiri dan lihat penyaringnya berubah pikiran.',
  },
  topics: ['machine learning', 'natural language processing', 'naive bayes', 'bag of words', 'probability'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
