import styles from '../../styles/App.module.css';

export const ScenarioCard = ({ scenario, onEdit, onDelete }) => {
  const participants = (scenario.participants || [])
    .map((p) => `${p.entity} (${p.role})`)
    .join(', ');

  const changes = (scenario.changes || []).map((c, index) => (
    <li key={index}>
      {c.entity ? `${c.entity}.` : ''}{c.key}:{' '}
      <span style={{ color: 'var(--muted)' }}>{c.from || '?'}</span> menjadi{' '}
      <b>{c.to}</b>
    </li>
  ));

  const requirements = (scenario.requires || []).map((r, index) => (
    <li key={index}>
      {r.key} = <b>{r.val}</b>
    </li>
  ));

  return (
    <article className={styles.card} style={{ marginBottom: '12px' }}>
      <h3>{scenario.summary}</h3>

      {scenario.outcome && (
        <p style={{ color: 'var(--muted)', margin: '0 0 8px' }}>
          Hasil: {scenario.outcome}
        </p>
      )}

      {scenario.tags && scenario.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
          {scenario.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                padding: '2px 10px',
                borderRadius: '999px',
                background: 'var(--tint)',
                border: '1px solid var(--line)',
                fontSize: '0.85rem'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {participants && (
        <p style={{ margin: '8px 0 0', fontSize: '0.92rem' }}>{participants}</p>
      )}

      {changes.length > 0 && (
        <>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0', fontSize: '0.85rem' }}>
            Perubahan
          </p>
          <ul style={{ margin: '6px 0', paddingLeft: '18px', fontSize: '0.92rem' }}>
            {changes}
          </ul>
        </>
      )}

      {requirements.length > 0 && (
        <>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0', fontSize: '0.85rem' }}>
            Syarat awal
          </p>
          <ul style={{ margin: '6px 0', paddingLeft: '18px', fontSize: '0.92rem' }}>
            {requirements}
          </ul>
        </>
      )}

      <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
        <button
          type="button"
          onClick={onEdit}
          style={{ minHeight: '32px', padding: '4px 10px', fontSize: '0.88rem' }}
        >
          Ubah
        </button>
        <button
          type="button"
          className="danger"
          onClick={onDelete}
          style={{ minHeight: '32px', padding: '4px 10px', fontSize: '0.88rem' }}
        >
          Hapus
        </button>
      </div>
    </article>
  );
};
