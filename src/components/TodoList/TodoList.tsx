import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onTodoSelect: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ onTodoSelect, todos }) => {
  const [visited, setVisited] = useState<number[]>([]);

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => {
          return (
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td
                className="is-vcentered"
                data-cy={todo.completed === true ? 'iconCompleted' : ''}
              >
                {todo.completed && <i className="fas fa-check" />}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed === true
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    onTodoSelect(todo);
                    if (!visited.includes(todo.id)) {
                      setVisited([...visited, todo.id]);
                    }
                  }}
                >
                  <span className="icon">
                    {visited.includes(todo.id) ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
