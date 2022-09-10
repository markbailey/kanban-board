import { DragEventHandler, MouseEventHandler } from 'react';
import css from '../assets/stylesheets/card.module.css';

export interface CardProps extends Omit<TicketState, 'status'> {
  onDragStart: DragEventHandler;
  onDragEnd: DragEventHandler;
}

interface AddCardProps {
  onClick: MouseEventHandler<HTMLDivElement>;
}

interface DropCardProps {
  onDrop: DragEventHandler;
}

const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={16}
    viewBox="0 0 24 24"
    width={16}
    fill="currentColor"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" />
  </svg>
);

function Card(props: CardProps): JSX.Element {
  const { id, tag, title, description, link, ...otherProps } = props;
  return (
    <div {...otherProps} className={css.card} draggable>
      <div>
        <span className={css.tag} data-tag={tag}>
          {tag}
        </span>

        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link} target="_blank">
          <span>Document Link</span>
          <LinkIcon />
        </a>
      </div>
      <span>{id}</span>
    </div>
  );
}

export const AddCard = (props: AddCardProps) => (
  <div {...props} role="button" tabIndex={-1} className={css.card} data-card="add">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={48}
      height={48}
      fill="currentColor"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  </div>
);

export const DropCard = (props: DropCardProps) => (
  <div {...props} className={css.card} data-card="drop" onDragOver={(e) => e.preventDefault()}>
    <strong>Drag and drop here</strong>
  </div>
);

export default Card;
