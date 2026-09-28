import styles from '../../styles/App.module.css';

export const ChainView = ({ chains }) => {
  if (!chains || chains.length === 0) {
    return (
      <div className={styles.empty}>
        Belum ada sambungan. Isi Perubahan kondisi di satu skenario dan Syarat awal di skenario lain dengan atribut dan nilai yang sama.
      </div>
    );
  }

  return (
    <div>
      {chains.map((chain, index) => (
        <div
          key={index}
          style={{
            display: 'grid',
            gap: '8px',
            alignItems: 'stretch',
            gridTemplateColumns: '1fr',
            marginBottom: '14px'
          }}
          className="chain-responsive"
        >
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '12px'
            }}
          >
            <small style={{ color: 'var(--muted)', display: 'block' }}>Lebih dulu</small>
            {chain.from.summary}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              textAlign: 'center',
              fontSize: '0.85rem',
              color: 'var(--muted)',
              minWidth: '150px'
            }}
          >
            <i style={{ display: 'block', width: '2px', height: '16px', background: 'var(--mark)' }} />
            <span
              style={{
                background: 'var(--mark)',
                color: '#222',
                padding: '2px 10px',
                borderRadius: '6px',
                fontWeight: '600'
              }}
            >
              {chain.label}
            </span>
            <i style={{ display: 'block', width: '2px', height: '16px', background: 'var(--mark)' }} />
          </div>

          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '12px'
            }}
          >
            <small style={{ color: 'var(--muted)', display: 'block' }}>Menyusul</small>
            {chain.to.summary}
          </div>
        </div>
      ))}

      <style>{`
        @media (min-width: 700px) {
          .chain-responsive {
            grid-template-columns: 1fr auto 1fr !important;
          }
          .chain-responsive > div:nth-child(2) i:first-child {
            width: 100% !important;
            height: 2px !important;
          }
          .chain-responsive > div:nth-child(2) i:last-child {
            width: 100% !important;
            height: 2px !important;
          }
        }
      `}</style>
    </div>
  );
};
