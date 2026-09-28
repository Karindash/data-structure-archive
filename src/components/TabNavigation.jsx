import { TABS } from '../constants';
import styles from '../styles/App.module.css';

const TAB_LABELS = {
  [TABS.NOTES]: 'Catatan',
  [TABS.SCENARIO]: 'Skenario',
  [TABS.CONNECTIONS]: 'Sambungan',
  [TABS.JSON]: 'Keluaran JSON'
};

export const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Bagian aplikasi">
      {Object.values(TABS).map((tabId) => (
        <button
          key={tabId}
          className={styles.tab}
          role="tab"
          id={`t-${tabId}`}
          aria-controls={`p-${tabId}`}
          aria-selected={activeTab === tabId}
          onClick={() => onTabChange(tabId)}
        >
          {TAB_LABELS[tabId]}
        </button>
      ))}
    </div>
  );
};
