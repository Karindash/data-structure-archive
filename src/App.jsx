import { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { TABS, DEFAULT_ROLES } from './constants';
import { Header } from './components/Header';
import { TabNavigation } from './components/TabNavigation';
import { NotesPanel } from './components/panels/NotesPanel';
import { ScenarioPanel } from './components/panels/ScenarioPanel';
import { ConnectionsPanel } from './components/panels/ConnectionsPanel';
import { JsonPanel } from './components/panels/JsonPanel';
import { uniqueSorted, normalize } from './utils/helpers';
import styles from './styles/App.module.css';
import './styles/global.css';

function App() {
  const [data, setData] = useLocalStorage();
  const [, toggleTheme] = useTheme();
  const [activeTab, setActiveTab] = useState(TABS.NOTES);
  const [statusMessage, setStatusMessage] = useState('');

  // Build autocomplete lists from existing data
  const { entities, roles } = useMemo(() => {
    const entitiesSet = new Set();
    const rolesSet = new Set(DEFAULT_ROLES);

    data.scenarios.forEach((scenario) => {
      (scenario.participants || []).forEach((p) => {
        if (p.entity) entitiesSet.add(p.entity);
        if (p.role) rolesSet.add(normalize(p.role));
      });
      (scenario.changes || []).forEach((c) => {
        if (c.entity) entitiesSet.add(c.entity);
      });
    });

    return {
      entities: uniqueSorted(Array.from(entitiesSet)),
      roles: uniqueSorted(Array.from(rolesSet))
    };
  }, [data.scenarios]);

  const showStatus = (message) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(''), 3500);
  };

  const updateScenarios = (scenarios) => {
    setData({ ...data, scenarios });
  };

  const addScenario = (scenario) => {
    const newScenarios = [scenario, ...data.scenarios];
    updateScenarios(newScenarios);
    showStatus('Skenario disimpan.');
  };

  const updateScenario = (scenario) => {
    const newScenarios = data.scenarios.map((s) =>
      s.id === scenario.id ? scenario : s
    );
    updateScenarios(newScenarios);
    showStatus('Skenario diperbarui.');
  };

  const deleteScenario = (id) => {
    const newScenarios = data.scenarios.filter((s) => s.id !== id);
    updateScenarios(newScenarios);
    showStatus('Skenario dihapus.');
  };

  const loadFromJson = (jsonData) => {
    try {
      const parsed = JSON.parse(jsonData);
      const scenarios = Array.isArray(parsed) ? parsed : parsed.scenarios;
      if (!Array.isArray(scenarios)) {
        throw new Error('Invalid format');
      }
      updateScenarios(scenarios);
      showStatus(`Data dimuat: ${scenarios.length} skenario.`);
    } catch (error) {
      showStatus('JSON tidak valid. Periksa tanda kurung dan koma.');
    }
  };

  const wipeAllData = () => {
    updateScenarios([]);
    showStatus('Semua data dihapus.');
  };

  return (
    <div className={styles.wrap}>
      <Header onThemeToggle={toggleTheme} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === TABS.NOTES && (
        <NotesPanel onStartRecording={() => setActiveTab(TABS.SCENARIO)} />
      )}

      {activeTab === TABS.SCENARIO && (
        <ScenarioPanel
          scenarios={data.scenarios}
          onAdd={addScenario}
          onUpdate={updateScenario}
          onDelete={deleteScenario}
          statusMessage={statusMessage}
          showStatus={showStatus}
        />
      )}

      {activeTab === TABS.CONNECTIONS && (
        <ConnectionsPanel scenarios={data.scenarios} />
      )}

      {activeTab === TABS.JSON && (
        <JsonPanel
          scenarios={data.scenarios}
          onLoad={loadFromJson}
          onWipe={wipeAllData}
          onUpdateScenarios={updateScenarios}
          statusMessage={statusMessage}
          showStatus={showStatus}
        />
      )}

      {/* Datalist elements for autocomplete */}
      <datalist id="entity-list">
        {entities.map((entity) => (
          <option key={entity} value={entity} />
        ))}
      </datalist>
      <datalist id="role-list">
        {roles.map((role) => (
          <option key={role} value={role} />
        ))}
      </datalist>
    </div>
  );
}

export default App;
