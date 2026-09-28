import { useState } from 'react';
import { ScenarioForm } from '../forms/ScenarioForm';
import { ScenarioList } from '../display/ScenarioList';
import styles from '../../styles/App.module.css';

export const ScenarioPanel = ({
  scenarios,
  onAdd,
  onUpdate,
  onDelete,
  statusMessage,
  showStatus
}) => {
  const [editingScenario, setEditingScenario] = useState(null);

  const handleSave = (scenario) => {
    if (editingScenario) {
      onUpdate(scenario);
    } else {
      onAdd(scenario);
    }
    setEditingScenario(null);
  };

  const handleEdit = (scenario) => {
    setEditingScenario(scenario);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (editingScenario && editingScenario.id === id) {
      setEditingScenario(null);
    }
    onDelete(id);
  };

  return (
    <section className={styles.panel} role="tabpanel" aria-labelledby="t-skenario">
      <div className={styles.grid2}>
        <ScenarioForm
          scenario={editingScenario}
          onSave={handleSave}
          statusMessage={statusMessage}
        />

        <div>
          <div className={styles.card} style={{ marginBottom: '12px' }}>
            <h2>Daftar skenario</h2>
            <ScenarioList
              scenarios={scenarios}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
