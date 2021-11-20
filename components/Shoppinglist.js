import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, FlatList, Alert } from 'react-native';
import styles from './Styles.js';
import { initializeApp } from 'firebase/app';
import{ getDatabase, push, ref, onValue, remove }  from"firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCHFs78d783QPfBucBcjYg7wjaOMVZtlTc",
  authDomain: "recipeapp-bb33d.firebaseapp.com",
  databadeURL: "https://recipeapp-bb33d-default-rtdb.firebaseio.com/",
  projectId: "recipeapp-bb33d",
  storageBucket: "recipeapp-bb33d.appspot.com",
  messagingSenderId: "353684009294",
  appId: "1:353684009294:web:7db1624232ba427cfeee1f"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



export default function Shoppinglist() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() =>  {
    const itemsRef = ref(database, 'items/')
      onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        if (data === null) {
        } else {
          setItems(Object.values(data));
        }
      })
  }, []);

  const saveItem = () => {
    push(ref(database, 'items/'), {
      'product': product, 'amount': amount
    });
    setProduct('');
    setAmount('');
  }

  const deleteItem = () => {
    remove(ref(database, 'items/'), {
      'product': product, 'amount': amount
    });
    setItems([]);
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Product" style={styles.textInput} onChangeText={product => setProduct(product)} value={product} />
      <TextInput placeholder="Amount" style={styles.textInput} onChangeText={amount => setAmount(amount)} value={amount}  />
      <Button style={styles.buttonContainer1} onPress={saveItem} title="Add to shopping list" />
      <Button style={styles.buttonContainer1} onPress={deleteItem} title="Delete items" />
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <Text style={styles.listContainer} >{item.product}, {item.amount} kpl</Text>
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

