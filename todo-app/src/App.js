import React from 'react';
import { TaskProvider } from './context/TaskContext'; // Подключаем провайдер задач
import Header from './components/Header'; // Компонент заголовка
import TaskList from './components/TaskList'; // Компонент списка задач
import TaskForm from './components/TaskForm'; // Компонент формы для добавления задач
import './reset.css'; // Подключаем сброс стилей
import './styles.css'; // Подключаем стили приложения

// Главный компонент приложения
function App() {
  return (
    <TaskProvider>
      {/* Оборачиваем всё приложение в провайдер, чтобы все компоненты имели доступ к состоянию */}
      <div className="App">
        <Header /> {/* Заголовок приложения */}
        <div className="container">
          <TaskForm /> {/* Форма для добавления новой задачи */}
          <TaskList /> {/* Список всех задач */}
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
