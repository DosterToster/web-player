import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { UploadCloud } from 'lucide-react';
import style from './style.module.css';

export default function Download() {
  const { onUploadSongs } = useOutletContext();
  const inputRef = useRef(null);

  const handleUpload = (event) => {
    const files = event.target.files;
    if (files?.length) {
      onUploadSongs(files);
      event.target.value = '';
    }
  };

  return (
    <div className={style.download}>
      <div className={style.header}>
        <div>
          <h2>Download</h2>
          <p>Завантажте аудіофайли для додавання їх до вашої бібліотеки.</p>
        </div>
        <button
          type='button'
          className={style.upload_btn}
          onClick={() => inputRef.current?.click()}
        >
          <UploadCloud size={18} />
          Завантажити музику
        </button>
      </div>

      <input
        ref={inputRef}
        type='file'
        accept='audio/*'
        multiple
        onChange={handleUpload}
        className={style.upload_input}
      />

      <div className={style.info_box}>
        <p>
          Виберіть один або кілька аудіофайлів для додавання. Ім'я файлу буде
          використане як назва треку та виконавець, якщо воно має формат
          <strong>Artist - Title</strong>.
        </p>
      </div>
    </div>
  );
}
