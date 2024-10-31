import todosReducer, { addTodo, toggleTodo, clearCompleted } from '../store/todosSlice';
import { describe, expect, it } from 'vitest';

describe('todosSlice', () => {
  it('должен добавить новую задачу', () => {
    const initialState = { items: [] };
    const action = addTodo('New Task');
    const state = todosReducer(initialState, action);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].text).toBe('New Task');
    expect(state.items[0].completed).toBe(false);
  });


  it('должен переключать состояние задачи (completed)', () => {
    const initialState = { items: [{ id: 1, text: 'Existing Task', completed: false }] };
    const action = toggleTodo(1);
    const state = todosReducer(initialState, action);
    expect(state.items[0].completed).toBe(true);
  });

//   it('должен удалять задачу', () => {
//     const initialState = { items: [{ id: 1, text: 'Task to Delete', completed: false }] };
//     const action = removeTodo(1);
//     const state = todosReducer(initialState, action);
//     expect(state.items).toHaveLength(0);
//   });

  it('должен очистить завершенные задачи', () => {
    const initialState = { items: [{ id: 1, text: 'Completed Task', completed: true }] };
    const action = clearCompleted();
    const state = todosReducer(initialState, action);
    expect(state.items).toHaveLength(0);
  });
});
