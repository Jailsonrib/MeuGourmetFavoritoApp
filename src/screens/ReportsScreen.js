import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getSales } from '../services/dbService';

export default function ReportsScreen() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSales(setSales);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Relatórios de Vendas</Text>
      <FlatList
        data={sales}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 10 }}>
            Produto ID: {item.produtoId}, Quantidade: {item.quantidade}, Data: {new Date(item.data).toLocaleDateString()}
          </Text>
        )}
      />
    </View>
  );
}
