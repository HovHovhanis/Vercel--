'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [budgetFrom, setBudgetFrom] = useState('');
  const [budgetTo, setBudgetTo] = useState('');
  const [deadlineDays, setDeadlineDays] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [token, setToken] = useState('');


  localStorage.setItem('token', 'your_token_value');
  

  // Проверка токена при монтировании компонента
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Токен при монтировании:', storedToken);
    setToken(storedToken);  // Сохраняем токен в state
  }, []);
  
  // При отправке формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Токен перед отправкой формы:', token); // Проверяем токен перед отправкой
    if (!token) {
      alert('Токен отсутствует, пользователь не авторизован!');
      return;
    }
  
    // Данные задачи
    const taskData = {
      title: taskTitle,
      description: taskDescription,
      budget_from: budgetFrom,
      budget_to: budgetTo,
      deadline_days: deadlineDays,
    };
  
    try {
      const response = await fetch('/api/submit-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...taskData, token }), // Добавляем токен
      });
  
      if (response.ok) {
        setStatusMessage('Задача успешно опубликована');
      } else {
        const errorResponse = await response.json();
        setStatusMessage('Произошла ошибка: ' + errorResponse.message);
      }
    } catch (error) {
      console.error('Request failed:', error);
      setStatusMessage('Произошла ошибка');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold mb-4">Создать задачу</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Название задачи"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Описание задачи"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Бюджет от"
          value={budgetFrom}
          onChange={(e) => setBudgetFrom(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Бюджет до"
          value={budgetTo}
          onChange={(e) => setBudgetTo(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Срок в днях"
          value={deadlineDays}
          onChange={(e) => setDeadlineDays(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Отправить
        </button>
      </form>
      {statusMessage && (
        <div className="mt-4 text-center">
          <p>{statusMessage}</p>
        </div>
      )}
    </div>
  );
}
