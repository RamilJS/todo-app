import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, clearCompleted } from './store/todosSlice';
import { RootState } from './store/store';
import './App.css';

type Filter = 'all' | 'active' | 'completed';

function App(): JSX.Element {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <h1>todos</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
        placeholder="What needs to be done?"
      />
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
              className="checkbox"
            />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
      <div className="footer">
        <span>{todos.filter(todo => !todo.completed).length} items left</span>
        <div className="filters">
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'active' : ''}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'active' : ''}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'active' : ''}
          >
            Completed
          </button>
        </div>
        <button onClick={() => dispatch(clearCompleted())}>Clear completed</button>
      </div>
    </div>
  );
}

export default App;
