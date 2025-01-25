import React, { useEffect, useState } from 'react';
import { fetchWeather, fetchNews, fetchTodo, fetchHydration, sendMorningBrief } from '../services/api';

const Dashboard = () => {
  const [weather, setWeather] = useState('');
  const [news, setNews] = useState([]);
  const [todo, setTodo] = useState([]);
  const [hydration, setHydration] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeather();
        setWeather(weatherData);

        const newsData = await fetchNews();
        setNews(newsData);

        const todoData = await fetchTodo();
        setTodo(todoData);

        const hydrationData = await fetchHydration();
        setHydration(hydrationData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSendBrief = async () => {
    try {
      const response = await sendMorningBrief();
      alert(response.message);
    } catch (error) {
      console.error('Error sending morning brief:', error);
      alert('Failed to send morning brief.');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Daily Routine Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🌤️ Weather</h2>
        <p>{weather}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📰 News</h2>
        <ul className="list-disc ml-6">
          {news.map((headline, idx) => (
            <li key={idx}>{headline}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">✅ To-Do List</h2>
        <ul className="list-disc ml-6">
          {todo.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">💧 Hydration</h2>
        {hydration ? <p>Total Intake: {hydration.intake_ml} ml</p> : <p>Loading hydration data...</p>}
      </section>

      <button
        onClick={handleSendBrief}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send Morning Brief
      </button>
    </div>
  );
};

export default Dashboard;
