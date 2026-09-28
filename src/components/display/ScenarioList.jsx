import { useState, useMemo } from 'react';
import { normalize, uniqueSorted } from '../../utils/helpers';
import { ScenarioCard } from './ScenarioCard';
import styles from '../../styles/App.module.css';

export const ScenarioList = ({ scenarios, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterTag, setFilterTag] = useState('');

  // Extract unique roles and tags for filters
  const { allRoles, allTags } = useMemo(() => {
    const roles = scenarios.flatMap((s) =>
      (s.participants || []).map((p) => normalize(p.role))
    );
    const tags = scenarios.flatMap((s) => s.tags || []);
    
    return {
      allRoles: uniqueSorted(roles),
      allTags: uniqueSorted(tags)
    };
  }, [scenarios]);

  // Filter scenarios
  const filteredScenarios = useMemo(() => {
    return scenarios.filter((scenario) => {
      // Filter by tag
      if (filterTag && !(scenario.tags || []).includes(filterTag)) {
        return false;
      }

      // Filter by role
      if (filterRole) {
        const hasRole = (scenario.participants || []).some(
          (p) => normalize(p.role) === filterRole
        );
        if (!hasRole) return false;
      }

      // Filter by search query
      if (searchQuery) {
        const normalizedQuery = normalize(searchQuery);
        const searchableText = normalize(JSON.stringify(scenario));
        if (!searchableText.includes(normalizedQuery)) {
          return false;
        }
      }

      return true;
    });
  }, [scenarios, searchQuery, filterRole, filterTag]);

  const countText = filteredScenarios.length !== scenarios.length
    ? `${filteredScenarios.length} dari ${scenarios.length}`
    : `${scenarios.length}`;

  if (scenarios.length === 0) {
    return (
      <div className={styles.empty}>
        Belum ada skenario. Isi form di samping, atau buka tab Keluaran JSON lalu tekan Isi contoh data.
      </div>
    );
  }

  return (
    <>
      <div style={{
        display: 'grid',
        gap: '8px',
        gridTemplateColumns: '1fr',
        marginBottom: '12px'
      }}>
        <input
          type="search"
          placeholder="Cari teks"
          aria-label="Cari teks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ gridColumn: '1 / -1' }}
        />
        <div style={{
          display: 'grid',
          gap: '8px',
          gridTemplateColumns: '1fr 1fr'
        }}>
          <select
            aria-label="Filter peran"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">Semua peran</option>
            {allRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter tag"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="">Semua tag</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredScenarios.length === 0 ? (
        <div className={styles.empty}>
          Tidak ada skenario yang cocok dengan filter.
        </div>
      ) : (
        <div>
          {filteredScenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onEdit={() => onEdit(scenario)}
              onDelete={() => onDelete(scenario.id)}
            />
          ))}
        </div>
      )}

      <div style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: '999px',
        background: 'var(--tint)',
        border: '1px solid var(--line)',
        fontSize: '0.85rem',
        marginTop: '12px'
      }}>
        {countText}
      </div>
    </>
  );
};
