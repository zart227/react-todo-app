import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext'; // Подключаем контекст для получения диспетчера

// Компонент формы для добавления задач
const TaskForm = () => {
  const { dispatch } = useContext(TaskContext); // Достаем функцию dispatch из контекста
  const [title, setTitle] = useState(''); // Локальное состояние для заголовка задачи
  const [description, setDescription] = useState(''); // Локальное состояние для описания задачи
  const [error, setError] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверка: заголовок не должен быть пустым
    if (title.trim() === '') {
        setError('Title is required.');
        return;
    }

    // Проверка: описание не должно быть короче 5 символов
    if (description.trim().length < 5) {
        setError('Description must be at least 5 characters long.');
        return;
    }  

    const newTask = {
      id: Date.now(), // Уникальный ID для новой задачи
      title,
      description,
      completed: false // Новая задача по умолчанию не выполнена
    };

    dispatch({ type: 'ADD_TASK', payload: newTask }); // Отправляем действие для добавления новой задачи

    setTitle(''); // Очищаем поле ввода заголовка после добавления
    setDescription(''); // Очищаем поле ввода описания
    setError(''); // Сбрасываем сообщение об ошибке
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title" // Поле ввода заголовка задачи
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Обновляем состояние заголовка при вводе
        required
      />
      <textarea
        placeholder="Task Description" // Поле ввода описания задачи
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Обновляем состояние описания при вводе
      ></textarea>
      
      {/* Сообщение об ошибке */}
      {error && <p style={{ color: 'red' }}>{error}</p>}      
      
      <button type="submit">Add Task</button> {/* Кнопка для добавления задачи */}
    </form>
  );
};

export default TaskForm;
