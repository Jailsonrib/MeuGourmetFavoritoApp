import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo ao Meu Gourmet Favorito!</Text>
      <Text style={styles.subtitle}>Explore nossas opções deliciosas!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
});
