// src/screens/StockScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { insertStock, fetchStock } from '../services/database';

export default function StockScreen({ navigation }) {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [stock, setStock] = useState([]);

  const addProduct = () => {
    if (!product || !quantity) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    insertStock(product, parseInt(quantity), () => {
      Alert.alert('Sucesso', 'Produto adicionado ao estoque!');
      setProduct('');
      setQuantity('');
      loadStock();
    });
  };

  const loadStock = () => {
    fetchStock(setStock);
  };

  useEffect(() => {
    loadStock();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gerenciar Estoque</Text>
      <TextInput
        placeholder="Produto"
        value={product}
        onChangeText={setProduct}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Adicionar ao Estoque" onPress={addProduct} />
      
      <FlatList
        data={stock}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>
            {item.product} - {item.quantity}
          </Text>
        )}
      />

      <Button title="Ir para Relatórios" onPress={() => navigation.navigate('Reports')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    borderRadius: 5,
  },
});
