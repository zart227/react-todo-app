import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext'; // Подключаем контекст для работы с задачами

// Компонент для отображения отдельной задачи
const TaskItem = ({ task }) => {
  const { dispatch } = useContext(TaskContext); // Получаем функцию dispatch для действий над задачами

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id }); // Удаляем задачу по ID
  };

  const handleToggleComplete = () => {
    dispatch({ type: 'TOGGLE_TASK_COMPLETION', payload: task.id }); // Переключаем статус выполнения задачи
  };

  return (
    <li>
      <div>
        <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title} {/* Название задачи с перечеркиванием, если выполнена */}
        </h3>
        <p>{task.description}</p> {/* Описание задачи */}
        <button className="toggle-btn" onClick={handleToggleComplete}>
          {task.completed ? 'Mark as Uncompleted' : 'Mark as Completed'}
          {/* Кнопка для переключения статуса задачи */}
        </button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button> {/* Кнопка для удаления задачи */}
      </div>
    </li>
  );
};

export default TaskItem;
