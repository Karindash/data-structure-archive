export const FormRow = ({ type, values, onChange, onRemove, entityList, roleList }) => {
  const handleInputChange = (key, value) => {
    onChange({ ...values, [key]: value });
  };

  const rowClass = `row row-${type}`;

  if (type === 'part') {
    return (
      <div className={rowClass} style={{
        display: 'grid',
        gap: '6px',
        marginBottom: '8px',
        padding: '8px',
        border: '1px dashed var(--line)',
        borderRadius: '8px',
        gridTemplateColumns: '1fr 1fr'
      }}>
        <input
          placeholder="Entitas (mis. S, Mobil)"
          value={values.entity || ''}
          onChange={(e) => handleInputChange('entity', e.target.value)}
          list="entity-list"
          aria-label="Entitas"
        />
        <input
          placeholder="Peran"
          value={values.role || ''}
          onChange={(e) => handleInputChange('role', e.target.value)}
          list="role-list"
          aria-label="Peran"
        />
        <input
          placeholder="Kondisi awal (kunci=nilai, ...)"
          value={values.state || ''}
          onChange={(e) => handleInputChange('state', e.target.value)}
          style={{ gridColumn: '1 / -1' }}
          aria-label="Kondisi awal"
        />
        <button
          type="button"
          className="ghost"
          onClick={onRemove}
          style={{ gridColumn: '1 / -1', justifySelf: 'end', minHeight: '32px', padding: '4px 10px', fontSize: '0.88rem' }}
        >
          Hapus baris
        </button>
      </div>
    );
  }

  if (type === 'chg') {
    return (
      <div className={rowClass} style={{
        display: 'grid',
        gap: '6px',
        marginBottom: '8px',
        padding: '8px',
        border: '1px dashed var(--line)',
        borderRadius: '8px',
        gridTemplateColumns: '1fr 1fr'
      }}>
        <input
          placeholder="Entitas"
          value={values.entity || ''}
          onChange={(e) => handleInputChange('entity', e.target.value)}
          list="entity-list"
          aria-label="Entitas"
        />
        <input
          placeholder="Atribut"
          value={values.key || ''}
          onChange={(e) => handleInputChange('key', e.target.value)}
          aria-label="Atribut"
        />
        <input
          placeholder="Dari"
          value={values.from || ''}
          onChange={(e) => handleInputChange('from', e.target.value)}
          aria-label="Dari"
        />
        <input
          placeholder="Menjadi"
          value={values.to || ''}
          onChange={(e) => handleInputChange('to', e.target.value)}
          aria-label="Menjadi"
        />
        <button
          type="button"
          className="ghost"
          onClick={onRemove}
          style={{ gridColumn: '1 / -1', justifySelf: 'end', minHeight: '32px', padding: '4px 10px', fontSize: '0.88rem' }}
        >
          Hapus baris
        </button>
      </div>
    );
  }

  if (type === 'req') {
    return (
      <div className={rowClass} style={{
        display: 'grid',
        gap: '6px',
        marginBottom: '8px',
        padding: '8px',
        border: '1px dashed var(--line)',
        borderRadius: '8px',
        gridTemplateColumns: '1fr 1fr'
      }}>
        <input
          placeholder="Atribut"
          value={values.key || ''}
          onChange={(e) => handleInputChange('key', e.target.value)}
          aria-label="Atribut"
        />
        <input
          placeholder="Harus bernilai"
          value={values.val || ''}
          onChange={(e) => handleInputChange('val', e.target.value)}
          aria-label="Harus bernilai"
        />
        <button
          type="button"
          className="ghost"
          onClick={onRemove}
          style={{ gridColumn: '1 / -1', justifySelf: 'end', minHeight: '32px', padding: '4px 10px', fontSize: '0.88rem' }}
        >
          Hapus baris
        </button>
      </div>
    );
  }

  return null;
};
