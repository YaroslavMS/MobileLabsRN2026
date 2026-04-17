import React, { createContext, useState } from 'react';
import { Vibration } from 'react-native';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // Загальні очки
  const [score, setScore] = useState(0);

  // Статистика для досягнень
  const [stats, setStats] = useState({
    clicks: 0,
    doubleClicks: 0,
    longPresses: 0,
    swipes: 0,
    pinches: 0,
  });

  // Налаштування
  const [settings, setSettings] = useState({
    vibration: true,
    darkTheme: false,
  });

  // Функція додавання очок та оновлення статистики
  const addPoints = (amount, actionType) => {
    setScore(prev => prev + amount);
    
    if (actionType) {
      setStats(prev => ({
        ...prev,
        [actionType]: prev[actionType] + 1
      }));
    }

    if (settings.vibration) {
      Vibration.vibrate(50); // Легка вібрація, якщо увімкнена
    }
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetGame = () => {
    setScore(0);
    setStats({ clicks: 0, doubleClicks: 0, longPresses: 0, swipes: 0, pinches: 0 });
  };

  return (
    <GameContext.Provider value={{ score, stats, settings, addPoints, toggleSetting, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};