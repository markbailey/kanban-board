import { PropsWithChildren } from 'react';
import css from '../assets/stylesheets/column.module.css';

type ColumnProps = PropsWithChildren<{ name: string }>;

function Column(props: ColumnProps) {
  const { children, name } = props;

  return (
    <div className={css.column} data-column={name}>
      <span className={css.column_heading}>{name.replace(/-/g, ' ')}</span>
      {children}
    </div>
  );
}

export default Column;
