import { useState, useEffect } from 'react';
import { computeChains } from '../../utils/chainComputation';
import { downloadJson, downloadCsv } from '../../utils/export';
import { generateSampleData } from '../../data/sampleData';
import { uid } from '../../utils/helpers';
import styles from '../../styles/App.module.css';

export const JsonPanel = ({
  scenarios,
  onLoad,
  onWipe,
  onUpdateScenarios,
  statusMessage,
  showStatus
}) => {
  const [jsonText, setJsonText] = useState('');
  const [wipeArmed, setWipeArmed] = useState(false);

  useEffect(() => {
    const buildExport = () => {
      const entities = {};
      scenarios.forEach((scenario) => {
        (scenario.participants || []).forEach((p) => {
          if (!p.entity) return;
          const e = entities[p.entity] || (entities[p.entity] = {
            name: p.entity,
            roles: [],
            scenarios: 0
          });
          const normalizedRole = (p.role || '').trim().toLowerCase();
          if (normalizedRole && !e.roles.includes(normalizedRole)) {
            e.roles.push(normalizedRole);
          }
          e.scenarios++;
        });
      });

      const chains = computeChains(scenarios).map((c) => ({
        dari: c.from.id,
        ke: c.to.id,
        lewat: c.label
      }));

      return {
        entities: Object.values(entities),
        scenarios,
        chains
      };
    };

    setJsonText(JSON.stringify(buildExport(), null, 2));
  }, [scenarios]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText).then(
      () => showStatus('JSON disalin.'),
      () => showStatus('Salin manual dari kotak.')
    );
  };

  const handleLoad = () => {
    onLoad(jsonText);
  };

  const handleSeedData = () => {
    const sampleScenarios = generateSampleData();
    const updatedScenarios = [...sampleScenarios, ...scenarios].map((s) => ({
      ...s,
      id: s.id || uid()
    }));
    onUpdateScenarios(updatedScenarios);
    showStatus('Contoh ditambahkan. Lihat tab Sambungan.');
  };

  const handleWipe = () => {
    if (!wipeArmed) {
      setWipeArmed(true);
      setTimeout(() => setWipeArmed(false), 3000);
    } else {
      setWipeArmed(false);
      onWipe();
    }
  };

  const handleDownloadJson = () => {
    if (scenarios.length === 0) {
      showStatus('Belum ada data untuk diunduh.');
      return;
    }
    const exportData = JSON.parse(jsonText);
    downloadJson(exportData);
    showStatus('File JSON siap disimpan.');
  };

  const handleDownloadCsv = () => {
    if (scenarios.length === 0) {
      showStatus('Belum ada data untuk diunduh.');
      return;
    }
    downloadCsv(scenarios);
    showStatus('File CSV siap disimpan.');
  };

  return (
    <section className={styles.panel} role="tabpanel" aria-labelledby="t-json">
      <div className={styles.card}>
        <h2>Keluaran JSON</h2>
        <p className={styles.sub} style={{ marginBottom: '12px' }}>
          Ini isi database sekarang. Tempel JSON lain di sini lalu tekan Muat dari kotak untuk mengganti data.
        </p>
        <textarea
          style={{
            font: '400 0.82rem/1.5 var(--mono)',
            minHeight: '340px',
            width: '100%'
          }}
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          spellCheck="false"
          aria-label="Isi JSON"
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
          <button type="button" className="primary" onClick={handleDownloadJson}>
            Unduh JSON
          </button>
          <button type="button" className="primary" onClick={handleDownloadCsv}>
            Unduh CSV
          </button>
          <button type="button" onClick={handleCopy}>
            Salin JSON
          </button>
          <button type="button" onClick={handleLoad}>
            Muat dari kotak
          </button>
          <button type="button" onClick={handleSeedData}>
            Isi contoh data
          </button>
          <button type="button" className="danger" onClick={handleWipe}>
            {wipeArmed ? 'Klik lagi untuk hapus semua' : 'Hapus semua'}
          </button>
        </div>
        {statusMessage && (
          <p className={styles.status} role="status" aria-live="polite">
            {statusMessage}
          </p>
        )}
      </div>
    </section>
  );
};
