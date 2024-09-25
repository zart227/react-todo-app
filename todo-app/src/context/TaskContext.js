import React, { createContext, useReducer, useEffect } from 'react';

// Создаем контекст для задач, чтобы передавать его в компоненты
export const TaskContext = createContext();

// Инициализируем состояние с пустым массивом задач или задачами из localStorage
const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || []
};

// Редьюсер — функция для обработки различных действий (action), таких как добавление, редактирование, удаление задач
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK': // Добавление новой задачи
      return {
        ...state,
        tasks: [...state.tasks, action.payload] // Добавляем новую задачу в список
      };
    case 'EDIT_TASK': // Редактирование существующей задачи
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ) // Обновляем задачу, если её id совпадает
      };
    case 'DELETE_TASK': // Удаление задачи
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload) // Удаляем задачу по id
      };
    case 'TOGGLE_TASK_COMPLETION': // Переключение статуса задачи (выполнена/невыполнена)
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed } // Меняем статус задачи на противоположный
            : task
        )
      };
    default:
      return state; // Если действие не распознано, возвращаем текущее состояние
  }
};

// Провайдер — компонент, который оборачивает все дочерние компоненты и предоставляет им доступ к состоянию задач
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Сохраняем задачи в localStorage каждый раз, когда они изменяются
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, dispatch }}>
      {children} {/* Дочерние компоненты получат доступ к задачам и dispatch */}
    </TaskContext.Provider>
  );
};
