import { useEffect, useState } from 'react';
import css from '../assets/stylesheets/form.module.css';

interface FilterProps {
  tags: string[];
  onChange: (state: FilterState) => void;
}

function Filters(props: FilterProps) {
  const [search, setSearch] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const { tags, onChange } = props;
  const hasValues = search !== '' || tag !== '';

  const onReset = () => {
    setSearch('');
    setTag('');
  };

  useEffect(() => {
    if (typeof onChange === 'function') onChange({ search, tag });
  }, [search, tag]);

  return (
    <form className={css.filter} onSubmit={(e) => e.preventDefault()}>
      <input
        type="search"
        placeholder="search this board"
        value={search}
        className={css.formControl}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={tag} className={css.formControl} onChange={(e) => setTag(e.target.value)}>
        <option label="Tag" value="" disabled />
        {tags.map((value) => (
          <option key={value} label={value} value={value} />
        ))}
      </select>

      {hasValues && (
        <button type="button" className={css.button} title="Clear filters" onClick={onReset}>
          <span>Clear</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="currentColor"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        </button>
      )}
    </form>
  );
}

export default Filters;
