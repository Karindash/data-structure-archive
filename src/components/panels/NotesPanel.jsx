import styles from '../../styles/App.module.css';

export const NotesPanel = ({ onStartRecording }) => {
  return (
    <section className={styles.panel} role="tabpanel" aria-labelledby="t-catatan">
      <div className={styles.grid2}>
        <div className={styles.card}>
          <h2>Tiga ide inti</h2>
          <ol style={{ margin: '0 0 16px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '6px' }}>
              <b>Peran, bukan kolom.</b> Subjek, latar, dan objek adalah peran yang dipakai entitas. 
              "Mobil" bisa diganti "Laptop" tanpa mengubah struktur.
            </li>
            <li style={{ marginBottom: '6px' }}>
              <b>Sambungan berbasis kondisi.</b> Setiap kejadian punya syarat awal dan efek akhir. 
              Kejadian B menyusul A kalau efek A cocok dengan syarat B.
            </li>
            <li style={{ marginBottom: '6px' }}>
              <b>Kategori berupa tag.</b> Label seperti kendala, sosial, atau aksi ditambah bebas, 
              karena pola baru dicari dari data.
            </li>
          </ol>
          <h3 style={{ marginTop: '16px' }}>Pisahkan lima hal ini</h3>
          <p className={styles.sub} style={{ margin: 0 }}>
            Motivasi, pemicu, aksi, hasil, konsekuensi. Jangan digabung dalam satu kolom "canon event".
          </p>
        </div>

        <div className={styles.card}>
          <h2>Bentuk data</h2>
          <pre style={{
            margin: 0,
            padding: '12px',
            borderRadius: '8px',
            background: 'var(--bg)',
            border: '1px solid var(--line)',
            overflowX: 'auto',
            font: '400 0.85rem/1.5 var(--mono)'
          }}>
{`entity       id, nama, atribut
scenario     id, ringkasan, hasil
participant  scenario, entity, peran, kondisi awal
state_change scenario, entity, atribut, dari, jadi
requirement  scenario, atribut, nilai yang dibutuhkan
tag          nama (bebas)`}
          </pre>
          <p className={styles.sub}>
            Di aplikasi ini semuanya disimpan sebagai satu daftar JSON di browser. 
            Cukup untuk uji coba, tanpa SQL.
          </p>
        </div>
      </div>

      <div className={styles.card} style={{ marginTop: '16px' }}>
        <h2>Tahapan</h2>
        <ol style={{ margin: '0 0 14px', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '6px' }}>
            <b>Kumpulkan data.</b> Isi ratusan skenario dari satu objek sederhana. 
            Kolom perubahan dan syarat boleh kosong dulu.
          </li>
          <li style={{ marginBottom: '6px' }}>
            <b>Tambah kondisi.</b> Isi perubahan dan syarat, lalu lihat tab Sambungan.
          </li>
          <li style={{ marginBottom: '6px' }}>
            <b>Cari pola.</b> Ganti objek, lalu bandingkan tag dan peran yang berulang.
          </li>
        </ol>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
          <button type="button" className="primary" onClick={onStartRecording}>
            Mulai mencatat
          </button>
        </div>
      </div>
    </section>
  );
};
