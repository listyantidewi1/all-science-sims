export default {
  id: 'stack-queue',
  subject: 'computer-science',
  title: { en: 'Stack vs Queue', id: 'Stack vs Queue' },
  description: {
    en: 'Push items into a stack (LIFO — last in, first out) or a queue (FIFO — first in, first out). The same operations, but the discipline of order is everything: stacks for nested function calls, queues for printers and buffers.',
    id: 'Dorong item ke dalam stack (LIFO — terakhir masuk, pertama keluar) atau queue (FIFO — pertama masuk, pertama keluar). Operasi sama, tapi disiplin urutan menentukan segalanya: stack untuk panggilan fungsi bersarang, queue untuk printer dan buffer.',
  },
  details: () => import('./details.js'),
  topics: ['data-structures'],
  grade: [9, 10, 11, 12],
  load: () => import('./sim.js'),
};
