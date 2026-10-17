export default {
  id: 'immune-response',
  subject: 'biology',
  title: { en: 'Immune Response and Vaccines', id: 'Respons Imun dan Vaksin' },
  description: {
    en: 'Infect a body with a pathogen and watch the innate response (phagocytes) buy time while the adaptive response builds: helper T cells activate B cells, which clone into plasma cells that pour out antibodies and leave memory cells behind. Follow the antibody concentration day by day, then expose the body a second time and see the memory response strike faster and higher. Vaccinate first to get the memory without the illness.',
    id: 'Infeksi tubuh dengan patogen dan lihat respons bawaan (fagosit) menahan waktu sementara respons adaptif terbentuk: sel T penolong mengaktifkan sel B, yang mengkloning diri menjadi sel plasma yang mencurahkan antibodi dan meninggalkan sel memori. Ikuti konsentrasi antibodi hari demi hari, lalu paparkan tubuh untuk kedua kali dan lihat respons memori menyerang lebih cepat dan lebih tinggi. Vaksinasi dulu untuk mendapat memori tanpa sakit.',
  },
  topics: ['immune system', 'antibodies', 'vaccination', 'memory cells'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
