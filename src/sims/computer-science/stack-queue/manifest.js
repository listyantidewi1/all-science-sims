export default {
  id: 'stack-queue',
  subject: 'computer-science',
  title: { en: 'Stack vs Queue', id: 'Stack vs Queue' },
  description: {
    en: 'Push items into a stack (LIFO — last in, first out) or a queue (FIFO — first in, first out). The same operations, but the discipline of order is everything: stacks for nested function calls, queues for printers and buffers.',
    id: 'Dorong item ke dalam stack (LIFO — terakhir masuk, pertama keluar) atau queue (FIFO — pertama masuk, pertama keluar). Operasi sama, tapi disiplin urutan menentukan segalanya: stack untuk panggilan fungsi bersarang, queue untuk printer dan buffer.',
  },
  objectives: {
    en: [
      'Distinguish push/pop (stack) from enqueue/dequeue (queue).',
      'See LIFO vs FIFO in real time.',
      'Match each to common applications.',
    ],
    id: [
      'Membedakan push/pop (stack) dari enqueue/dequeue (queue).',
      'Melihat LIFO vs FIFO secara langsung.',
      'Mencocokkan keduanya dengan aplikasi nyata.',
    ],
  },
  tryThis: {
    en: [
      'Push 1, 2, 3 to stack — pop them. What order?',
      'Enqueue 1, 2, 3 to queue — dequeue them. What order?',
      'Use a stack to reverse a string.',
    ],
    id: [
      'Push 1, 2, 3 ke stack — pop semuanya. Urutan apa?',
      'Enqueue 1, 2, 3 ke queue — dequeue semuanya. Urutan apa?',
      'Gunakan stack untuk membalik string.',
    ],
  },
  topics: ['data-structures'],
  load: () => import('./sim.js'),
};
