// src/services/database.js

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('meu_gourmet_favorito.db');

export const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product TEXT,
        quantity INTEGER
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS stock (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product TEXT,
        quantity INTEGER
      );`
    );
  });
};

export const insertSale = (product, quantity, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO sales (product, quantity) VALUES (?, ?);',
      [product, quantity],
      (_, result) => callback(result),
      (_, error) => console.log(error)
    );
  });
};

export const fetchSales = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM sales;',
      [],
      (_, { rows: { _array } }) => callback(_array),
      (_, error) => console.log(error)
    );
  });
};

export const insertStock = (product, quantity, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO stock (product, quantity) VALUES (?, ?);',
      [product, quantity],
      (_, result) => callback(result),
      (_, error) => console.log(error)
    );
  });
};

export const fetchStock = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM stock;',
      [],
      (_, { rows: { _array } }) => callback(_array),
      (_, error) => console.log(error)
    );
  });
};
