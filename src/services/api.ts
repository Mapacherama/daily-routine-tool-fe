import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Replace with your Flask server URL

// Define types for the API responses
export interface WeatherResponse {
  weather: string;
}

export interface NewsResponse {
  news: string[];
}

export interface TodoResponse {
  todo: string[];
}

export interface HydrationResponse {
  date: string;
  intake_ml: number;
}

export interface MorningBriefResponse {
  message: string;
  brief: string;
}

// Fetch weather data
export const fetchWeather = async (): Promise<string> => {
  const response = await axios.get<WeatherResponse>(`${API_BASE_URL}/weather`);
  return response.data.weather;
};

// Fetch news data
export const fetchNews = async (): Promise<string[]> => {
  const response = await axios.get<NewsResponse>(`${API_BASE_URL}/news`);
  return response.data.news;
};

// Fetch to-do items
export const fetchTodo = async (): Promise<string[]> => {
  const response = await axios.get<TodoResponse>(`${API_BASE_URL}/todo`);
  return response.data.todo;
};

// Fetch hydration data
export const fetchHydration = async (): Promise<HydrationResponse> => {
  const response = await axios.get<HydrationResponse>(`${API_BASE_URL}/hydration`);
  return response.data;
};

// Send morning brief
export const sendMorningBrief = async (): Promise<MorningBriefResponse> => {
  const response = await axios.post<MorningBriefResponse>(`${API_BASE_URL}/send-brief`);
  return response.data;
};
