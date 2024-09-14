// App.js

import React, { useEffect } from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { setupDatabase } from './src/services/database';

export default function App() {
  useEffect(() => {
    setupDatabase();
  }, []);

  return <StackNavigator />;
}
