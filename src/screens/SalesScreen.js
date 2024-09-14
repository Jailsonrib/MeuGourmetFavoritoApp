// src/screens/SalesScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { insertSale, fetchSales } from '../services/database';

export default function SalesScreen({ navigation }) {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sales, setSales] = useState([]);

  const saveSale = () => {
    if (!product || !quantity) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    insertSale(product, parseInt(quantity), () => {
      Alert.alert('Sucesso', 'Venda registrada!');
      setProduct('');
      setQuantity('');
      loadSales();
    });
  };

  const loadSales = () => {
    fetchSales(setSales);
  };

  useEffect(() => {
    loadSales();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrar Venda</Text>
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
      <Button title="Salvar Venda" onPress={saveSale} />
      
      <FlatList
        data={sales}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>
            {item.product} - {item.quantity}
          </Text>
        )}
      />

      <Button title="Ir para Estoque" onPress={() => navigation.navigate('Stock')} />
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
