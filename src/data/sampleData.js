import { uid } from '../utils/helpers';

const createParticipant = (entity, role, state = '') => ({
  entity,
  role,
  state
});

/**
 * Generate sample scenarios for demonstration
 */
export const generateSampleData = () => {
  return [
    {
      id: uid(),
      summary: 'Mobil S mogok di jalan ke kampus',
      outcome: 'S terlambat masuk kelas',
      tags: ['kendala', 'transportasi'],
      participants: [
        createParticipant('S', 'subjek', 'usia=20'),
        createParticipant('Kampus', 'latar'),
        createParticipant('Mobil', 'objek', 'kondisi=lama')
      ],
      changes: [
        { entity: 'Mobil', key: 'kondisi', from: 'lama', to: 'rusak' }
      ],
      requires: []
    },
    {
      id: uid(),
      summary: 'S kebut-kebutan di area kampus dan menabrak pagar',
      outcome: 'Mobil penyok, S harus ganti rugi',
      tags: ['aksi-risiko', 'konsekuensi'],
      participants: [
        createParticipant('S', 'subjek', 'emosi=impulsif'),
        createParticipant('Kampus', 'latar'),
        createParticipant('Mobil', 'objek', 'kondisi=bagus')
      ],
      changes: [
        { entity: 'Mobil', key: 'kondisi', from: 'bagus', to: 'rusak' },
        { entity: 'S', key: 'uang', from: 'cukup', to: 'kurang' }
      ],
      requires: []
    },
    {
      id: uid(),
      summary: 'S naik angkot ke kampus karena mobil di bengkel',
      outcome: 'S sampai kampus tanpa mobil',
      tags: ['transportasi', 'adaptasi'],
      participants: [
        createParticipant('S', 'subjek'),
        createParticipant('Kampus', 'latar'),
        createParticipant('Mobil', 'objek', 'kondisi=rusak')
      ],
      changes: [
        { entity: 'S', key: 'transportasi', from: 'mobil', to: 'angkot' }
      ],
      requires: [
        { key: 'kondisi', val: 'rusak' }
      ]
    },
    {
      id: uid(),
      summary: 'S cari kerja sampingan untuk menutup biaya',
      outcome: 'Uang S kembali cukup',
      tags: ['uang', 'adaptasi'],
      participants: [
        createParticipant('S', 'subjek', 'uang=kurang'),
        createParticipant('Kampus', 'latar')
      ],
      changes: [
        { entity: 'S', key: 'uang', from: 'kurang', to: 'cukup' }
      ],
      requires: [
        { key: 'uang', val: 'kurang' }
      ]
    },
    {
      id: uid(),
      summary: 'S pamer mobil baru ke teman nongkrong',
      outcome: 'Status sosial S naik',
      tags: ['sosial', 'status'],
      participants: [
        createParticipant('S', 'subjek'),
        createParticipant('Teman', 'pihak-lain'),
        createParticipant('Kampus', 'latar'),
        createParticipant('Mobil', 'objek', 'kondisi=baru')
      ],
      changes: [
        { entity: 'Mobil', key: 'kondisi', from: '', to: 'baru' },
        { entity: 'S', key: 'status sosial', from: 'biasa', to: 'naik' }
      ],
      requires: []
    },
    {
      id: uid(),
      summary: 'Mobil baru S parkir di area dosen',
      outcome: 'S ditegur satpam',
      tags: ['sosial', 'aturan'],
      participants: [
        createParticipant('S', 'subjek'),
        createParticipant('Satpam', 'pihak-lain'),
        createParticipant('Kampus', 'latar'),
        createParticipant('Mobil', 'objek', 'kondisi=baru')
      ],
      changes: [
        { entity: 'S', key: 'teguran', from: 'tidak', to: 'ya' }
      ],
      requires: [
        { key: 'kondisi', val: 'baru' }
      ]
    }
  ];
};
