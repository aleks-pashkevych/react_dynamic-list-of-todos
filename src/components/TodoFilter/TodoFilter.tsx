import { useState } from 'react';
type Props = {
  input?: string;
  toFiler: (str: string, status?: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ input, toFiler }) => {
  const [status, setStatus] = useState('all');
  const [element, setElement] = useState('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => {
              setStatus(event.target.value);
              toFiler(element, status);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={String(input)}
          onChange={event => {
            setElement(event.target.value);
            toFiler(event.target.value, status);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {String(input).length > 0 ? (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => toFiler(status, '')}
            />
          ) : (
            ''
          )}
        </span>
      </p>
    </form>
  );
};
