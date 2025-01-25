import React, { useEffect, useState } from 'react';
import {
  fetchWeather,
  fetchNews,
  fetchTodo,
  fetchHydration,
  sendMorningBrief,
} from '../services/api';

import './Dashboard.css';

// Define types for state variables
interface HydrationData {
  date: string;
  intake_ml: number;
}

const Dashboard: React.FC = () => {
  const [weather, setWeather] = useState<string>(''); // Weather is a string
  const [news, setNews] = useState<string[]>([]); // News is an array of strings
  const [todo, setTodo] = useState<string[]>([]); // To-Do items are strings
  const [hydration, setHydration] = useState<HydrationData | null>(null); // Hydration can be null or an object

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
    <div className="dashboard">
      <h1 className="dashboard__title">Daily Routine Dashboard</h1>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">🌤️ Weather</h2>
        <p className="dashboard__section-content">{weather}</p>
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">📰 News</h2>
        <ul className="dashboard__list">
          {news.map((headline, idx) => (
            <li key={idx} className="dashboard__list-item">
              {headline}
            </li>
          ))}
        </ul>
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">✅ To-Do List</h2>
        <ul className="dashboard__list">
          {todo.map((task, idx) => (
            <li key={idx} className="dashboard__list-item">
              {task}
            </li>
          ))}
        </ul>
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">💧 Hydration</h2>
        {hydration ? (
          <p className="dashboard__section-content">Total Intake: {hydration.intake_ml} ml</p>
        ) : (
          <p className="dashboard__section-content">Loading hydration data...</p>
        )}
      </section>

      <button onClick={handleSendBrief} className="dashboard__button">
        Send Morning Brief
      </button>
    </div>
  );
};

export default Dashboard;
