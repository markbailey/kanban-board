import { FormEvent, useState } from 'react';
import css from '../assets/stylesheets/form.module.css';

interface FormProps {
  onSubmit: (event: FormEvent, state: TicketState) => void;
}

function CreateTicketForm(props: FormProps) {
  const [tag, setTag] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [link, setLink] = useState<string>('');

  const { onSubmit } = props;
  const isValid = tag !== '' && title !== '' && description !== '' && link !== '';

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!isValid) return;

    const id = Math.random().toString(36).substring(2, 5);
    const state: TicketState = {
      id,
      tag,
      title,
      description,
      link,
      status: 'backlog'
    };

    onSubmit(event, state);
  };

  return (
    <form className={css.createTicket} onSubmit={onSubmitHandler}>
      <div>
        <label className={css.formLabel}>Tag</label>
        <div tabIndex={-1} className={css.select}>
          {tag !== '' && (
            <button className={css.select_value} title="Clear selected" onClick={() => setTag('')}>
              {tag}
            </button>
          )}
          <select
            value={tag}
            className={css.formControl}
            disabled={tag !== ''}
            onChange={(e) => setTag(e.target.value)}
          >
            <option label="pick a tag" value="" disabled />
            <option label="Android" value="Android" />
            <option label="iOS" value="iOS" />
          </select>
        </div>
      </div>

      <div>
        <label className={css.formLabel}>Title</label>
        <input
          type="text"
          value={title}
          placeholder="enter card title"
          className={css.formControl}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className={css.formLabel}>Description</label>
        <textarea
          placeholder="enter card description"
          value={description}
          className={css.formControl}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label className={css.formLabel}>Link</label>
        <input
          type="url"
          value={link}
          placeholder="past link url"
          className={css.formControl}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <button className={css.button} disabled={!isValid}>
        Save
      </button>
    </form>
  );
}

export default CreateTicketForm;
