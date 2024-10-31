import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from '../page/App';

describe('App Component', () => {
  it('должен добавлять новую задачу при вводе текста и нажатии Enter', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  it('должен переключать состояние задачи при клике на checkbox', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    // Ждем, пока состояние задачи обновится
    await waitFor(() => expect(checkboxes[0]).toBeChecked());
  });

  it('должен очищать завершенные задачи при клике на кнопку "Clear completed"', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(input, { target: { value: 'Task to Complete' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // Проверка, что задача добавлена
    await waitFor(() => {
      expect(screen.getByText('Task to Complete')).toBeInTheDocument();
    });

    // Отмечаем задачу как завершенную
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[checkboxes.length - 1]); // Последний добавленный чекбокс

    // Проверка, что задача отмечена как завершенная
    await waitFor(() => {
      expect(checkboxes[checkboxes.length - 1]).toBeChecked();
    });

    // Нажимаем на кнопку очистки завершенных задач
    const clearCompletedButton = screen.getByText(/Clear completed/i);
    fireEvent.click(clearCompletedButton);

    // Проверка, что завершенная задача была удалена из DOM
    await waitFor(() => {
      expect(screen.queryByText('Task to Complete')).not.toBeInTheDocument();
    });
  });
});
