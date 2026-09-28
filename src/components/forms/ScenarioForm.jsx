import { useState, useEffect } from 'react';
import { uid } from '../../utils/helpers';
import { DEFAULT_ROLES } from '../../constants';
import { FormRow } from './FormRow';
import styles from '../../styles/App.module.css';

export const ScenarioForm = ({ scenario, onSave, statusMessage }) => {
  const [formData, setFormData] = useState({
    summary: '',
    outcome: '',
    tags: '',
    participants: [],
    changes: [],
    requires: []
  });

  useEffect(() => {
    if (scenario) {
      setFormData({
        summary: scenario.summary || '',
        outcome: scenario.outcome || '',
        tags: (scenario.tags || []).join(', '),
        participants: scenario.participants || [],
        changes: scenario.changes || [],
        requires: scenario.requires || []
      });
    } else {
      resetForm();
    }
  }, [scenario]);

  const resetForm = () => {
    setFormData({
      summary: '',
      outcome: '',
      tags: '',
      participants: DEFAULT_ROLES.map(role => ({ entity: '', role, state: '' })),
      changes: [{ entity: '', key: '', from: '', to: '' }],
      requires: [{ key: '', val: '' }]
    });
  };

  const handleSubmit = () => {
    if (!formData.summary.trim()) {
      document.getElementById('f-summary')?.focus();
      return;
    }

    const filterEmpty = (items) => {
      return items.filter((item) =>
        Object.values(item).some((val) => val && val.trim())
      );
    };

    const scenarioData = {
      id: scenario?.id || uid(),
      summary: formData.summary.trim(),
      outcome: formData.outcome.trim(),
      tags: formData.tags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      participants: filterEmpty(formData.participants),
      changes: filterEmpty(formData.changes),
      requires: filterEmpty(formData.requires)
    };

    onSave(scenarioData);
    resetForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addRow = (type) => {
    const emptyRow = type === 'participants'
      ? { entity: '', role: '', state: '' }
      : type === 'changes'
      ? { entity: '', key: '', from: '', to: '' }
      : { key: '', val: '' };

    setFormData({
      ...formData,
      [type]: [...formData[type], emptyRow]
    });
  };

  const updateRow = (type, index, values) => {
    const newRows = [...formData[type]];
    newRows[index] = values;
    setFormData({ ...formData, [type]: newRows });
  };

  const removeRow = (type, index) => {
    const newRows = formData[type].filter((_, i) => i !== index);
    setFormData({ ...formData, [type]: newRows });
  };

  return (
    <div className={styles.card}>
      <h2 id="form-title">{scenario ? 'Ubah skenario' : 'Skenario baru'}</h2>

      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="f-summary">Ringkasan kejadian</label>
        <input
          id="f-summary"
          placeholder="Mobil S mogok di jalan ke kampus"
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="f-outcome">Hasil</label>
        <input
          id="f-outcome"
          placeholder="S terlambat masuk kelas"
          value={formData.outcome}
          onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="f-tags">Tag (pisahkan dengan koma)</label>
        <input
          id="f-tags"
          placeholder="kendala, transportasi"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
      </div>

      <div style={{ margin: '16px 0 8px' }}>
        <h3>Pelaku dan peran</h3>
        <p style={{ margin: '0 0 8px', color: 'var(--muted)', fontSize: '0.9rem' }}>
          Siapa atau apa yang terlibat, dan sebagai apa.
        </p>
        <div>
          {formData.participants.map((participant, index) => (
            <FormRow
              key={index}
              type="part"
              values={participant}
              onChange={(values) => updateRow('participants', index, values)}
              onRemove={() => removeRow('participants', index)}
            />
          ))}
        </div>
        <button type="button" className="ghost" onClick={() => addRow('participants')}>
          Tambah pelaku
        </button>
      </div>

      <div style={{ margin: '16px 0 8px' }}>
        <h3>Perubahan kondisi</h3>
        <p style={{ margin: '0 0 8px', color: 'var(--muted)', fontSize: '0.9rem' }}>
          Apa yang berubah setelah kejadian ini.
        </p>
        <div>
          {formData.changes.map((change, index) => (
            <FormRow
              key={index}
              type="chg"
              values={change}
              onChange={(values) => updateRow('changes', index, values)}
              onRemove={() => removeRow('changes', index)}
            />
          ))}
        </div>
        <button type="button" className="ghost" onClick={() => addRow('changes')}>
          Tambah perubahan
        </button>
      </div>

      <div style={{ margin: '16px 0 8px' }}>
        <h3>Syarat awal</h3>
        <p style={{ margin: '0 0 8px', color: 'var(--muted)', fontSize: '0.9rem' }}>
          Kondisi yang harus sudah ada supaya kejadian ini bisa terjadi.
        </p>
        <div>
          {formData.requires.map((requirement, index) => (
            <FormRow
              key={index}
              type="req"
              values={requirement}
              onChange={(values) => updateRow('requires', index, values)}
              onRemove={() => removeRow('requires', index)}
            />
          ))}
        </div>
        <button type="button" className="ghost" onClick={() => addRow('requires')}>
          Tambah syarat
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
        <button type="button" className="primary" onClick={handleSubmit}>
          {scenario ? 'Simpan perubahan' : 'Simpan skenario'}
        </button>
        <button type="button" onClick={resetForm}>
          Kosongkan form
        </button>
      </div>

      {statusMessage && (
        <p className={styles.status} role="status" aria-live="polite">
          {statusMessage}
        </p>
      )}
    </div>
  );
};
