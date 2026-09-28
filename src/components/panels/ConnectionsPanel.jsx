import { computeChains, computePatterns } from '../../utils/chainComputation';
import { ChainView } from '../display/ChainView';
import { PatternView } from '../display/PatternView';
import styles from '../../styles/App.module.css';

export const ConnectionsPanel = ({ scenarios }) => {
  const chains = computeChains(scenarios);
  const patterns = computePatterns(scenarios);

  return (
    <section className={styles.panel} role="tabpanel" aria-labelledby="t-sambung">
      <div className={styles.card} style={{ marginBottom: '16px' }}>
        <h2>Kejadian yang bisa disambung</h2>
        <p className={styles.sub} style={{ marginBottom: '14px' }}>
          B menyusul A ketika perubahan di A sama dengan syarat awal di B.
        </p>
        <ChainView chains={chains} />
      </div>

      <div className={styles.card}>
        <h2>Ringkasan pola</h2>
        <PatternView patterns={patterns} />
      </div>
    </section>
  );
};
