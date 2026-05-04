import style from './style.module.css';

export default function Settings({ theme, setTheme }) {
  return (
    <div className={style.settings}>
      <h2>Settings</h2>
      <div className={style.section}>
        <h3 className={style.section_title}>Зовнішній вигляд</h3>
        <div className={style.option}>
          <span>Тема</span>
          <div className={style.toggle_wrap}>
            <button
              className={`${style.toggle_btn} ${theme === 'dark' ? style.active : ''}`}
              onClick={() => setTheme('dark')}
            >
              Темна
            </button>
            <button
              className={`${style.toggle_btn} ${theme === 'light' ? style.active : ''}`}
              onClick={() => setTheme('light')}
            >
              Світла
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
