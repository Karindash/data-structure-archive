import styles from '../styles/App.module.css';

export const Header = ({ onThemeToggle }) => {
  return (
    <header className={styles.header}>
      <div>
        <h1>Pencatat Skenario</h1>
        <p className={styles.sub}>
          Catat kejadian sebagai peran dan perubahan kondisi, bukan cerita. Sambungannya muncul sendiri.
        </p>
      </div>
      <button type="button" className="ghost" onClick={onThemeToggle}>
        Ganti tema
      </button>
    </header>
  );
};
