import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  showModal: (todo: Todo) => Todo;
};

export const TodoList: React.FC<Props> = ({ showModal, todos }) => (
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
              className={`is-vcentered ${todo.completed === true ? 'fas fa-check' : ''}`}
            />
            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => showModal(todo)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
