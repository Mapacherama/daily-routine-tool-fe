import React, { useState } from 'react';
import './Settings.css';

interface SettingsData {
  username: string;
  email: string;
  notifications: boolean;
  apiBaseUrl: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>({
    username: 'John Doe',
    email: 'john.doe@example.com',
    notifications: true,
    apiBaseUrl: 'http://127.0.0.1:5000',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    // Save settings (e.g., to local storage or via an API call)
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings">
      <h1 className="settings__title">Settings</h1>

      {/* User Profile Section */}
      <section className="settings__section">
        <h2 className="settings__section-title">👤 User Profile</h2>
        <div className="settings__field">
          <label htmlFor="username" className="settings__label">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={settings.username}
            onChange={handleInputChange}
            className="settings__input"
          />
        </div>
        <div className="settings__field">
          <label htmlFor="email" className="settings__label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={settings.email}
            onChange={handleInputChange}
            className="settings__input"
          />
        </div>
      </section>

      {/* Notification Preferences Section */}
      <section className="settings__section">
        <h2 className="settings__section-title">🔔 Notifications</h2>
        <div className="settings__field">
          <label className="settings__label">
            <input
              name="notifications"
              type="checkbox"
              checked={settings.notifications}
              onChange={handleInputChange}
              className="settings__checkbox"
            />
            Enable Notifications
          </label>
        </div>
      </section>

      {/* API Settings Section */}
      <section className="settings__section">
        <h2 className="settings__section-title">⚙️ API Settings</h2>
        <div className="settings__field">
          <label htmlFor="apiBaseUrl" className="settings__label">API Base URL</label>
          <input
            id="apiBaseUrl"
            name="apiBaseUrl"
            type="text"
            value={settings.apiBaseUrl}
            onChange={handleInputChange}
            className="settings__input"
          />
        </div>
      </section>

      {/* Save Button */}
      <button onClick={handleSave} className="settings__button">
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
