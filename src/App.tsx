/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [todoItem, setTodoItem] = useState({
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  });
  const [isTodosLoading, setTodosIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
      })
      .finally(() => setTodosIsLoading(false));
  }, []);

  const showTheModal = (todo: Todo) => {
    setShowModal(true);
    setTodoItem(todo);
  };

  const hideTheModal = () => {
    setShowModal(false);
  };

  const toFiler = (val: string, status: string = 'all') => {
    setInputValue(val);

    const initialFilter = todos.filter(el =>
      el.title.includes(val.toLowerCase()),
    );

    if (status === 'all') {
      setFilteredTodos(initialFilter);
    }

    if (status === 'completed') {
      setFilteredTodos(initialFilter.filter(el => el.completed === true));
    }

    if (status === 'active') {
      setFilteredTodos(initialFilter.filter(el => el.completed === false));
    }
  };

  const clearSearch = (status = 'all') => {
    setInputValue('');
    toFiler('', status);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                toFiler={toFiler}
                input={inputValue}
                clearSearch={clearSearch}
              />
            </div>

            <div className="block">
              <Loader isLoading={isTodosLoading} />
              <TodoList onTodoSelect={showTheModal} todos={filteredTodos} />
            </div>
          </div>
        </div>
      </div>
      {showModal === true && (
        <TodoModal hideModal={hideTheModal} todo={todoItem} />
      )}
    </>
  );
};
