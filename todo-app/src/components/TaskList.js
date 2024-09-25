import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext'; // Подключаем контекст для доступа к задачам
import TaskItem from './TaskItem'; // Подключаем компонент для отображения отдельной задачи

// Компонент списка задач
const TaskList = () => {
  const { tasks } = useContext(TaskContext); // Достаем список задач из контекста

  return (
    <div>
      {tasks.length ? (
        <ul>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} /> // Отображаем каждую задачу через компонент TaskItem
          ))}
        </ul>
      ) : (
        <p>No tasks available. Please add one!</p> // Сообщение, если задач нет
      )}
    </div>
  );
};

export default TaskList;
