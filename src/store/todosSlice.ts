import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface  Todo {
  id: number;
  text: string;
  completed: boolean;
};

interface  TodosState {
  items: Todo[];
};

const initialState: TodosState = {
  items: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((todo) => !todo.completed);
    },
  },
});

export const { addTodo, toggleTodo, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
