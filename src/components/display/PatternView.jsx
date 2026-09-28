const ChipList = ({ items, label }) => {
  if (!items || Object.keys(items).length === 0) {
    return <span style={{ color: 'var(--muted)' }}>Belum ada data.</span>;
  }

  // Sort by count descending
  const sorted = Object.entries(items).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {sorted.map(([key, count]) => (
        <span
          key={key}
          style={{
            display: 'inline-block',
            padding: '2px 10px',
            borderRadius: '999px',
            background: 'var(--tint)',
            border: '1px solid var(--line)',
            fontSize: '0.85rem'
          }}
        >
          {key}
          <b style={{ fontWeight: '600', marginLeft: '4px', color: 'var(--accent)' }}>
            {count}
          </b>
        </span>
      ))}
    </div>
  );
};

export const PatternView = ({ patterns }) => {
  return (
    <div>
      <h3>Tag yang sering muncul</h3>
      <div style={{ marginBottom: '14px' }}>
        <ChipList items={patterns.tags} label="tags" />
      </div>

      <h3>Peran yang sering dipakai</h3>
      <div style={{ marginBottom: '14px' }}>
        <ChipList items={patterns.roles} label="roles" />
      </div>

      <h3>Entitas dan perannya</h3>
      <div>
        <ChipList items={patterns.entityRoles} label="entity roles" />
      </div>
    </div>
  );
};
