import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, FlatList, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './Styles.js';
import { initializeApp } from 'firebase/app';
import firebaseConfig from "./Firebase";
import { getDatabase, push, ref, onValue, remove } from "firebase/database";
import { userStore } from './UserReducer';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Shoppinglist() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);
  const [userid, setUserid] = useState('');

  //gets the users id from user storage for users own database
  useEffect(() => {
    setUserid(userStore.getState());
  });

  //gets users database
  useEffect(() => {
    const itemsRef = ref(database, userid + 'items/')
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
      } else {
        setItems(Object.values(data));
      }
    })
  }, [userid]);

  //saves item to the database
  const saveItem = () => {
    push(ref(database, userid + 'items/'), {
      'product': product, 'amount': amount
    });
    setProduct('');
    setAmount('');
  }

  //deletes all items from users database
  const deleteAll = () => {
    Alert.alert(
      'Shoppinglist',
      'Delete all products from shoppinglist?',
      [
        { text: 'NO', onPress: () => Alert.alert('Shoppinglist', 'Nothing deleted'), style: 'cancel' },
        {
          text: 'YES', onPress: () => {
            remove(ref(database, userid + 'items/'), {
              'product': product, 'amount': amount
            })
            setItems([]);
          }
        },
      ]
    )
  }

  //deletes only selected item from the database
  const deleteItem = (product) => {
    const itemsRef = ref(database, userid + 'items/');
    onValue(itemsRef, (snapshot) => {
      snapshot.forEach((childSnap) => {
        if (childSnap.val().product === product) {
          const deleteRef = ref(database, userid + 'items/' + childSnap.key);
          remove(deleteRef)
            .then(function () {
              console.log("Remove succeeded.")
            })
            .catch(function (error) {
              console.log("Remove failed: " + error.message)
            });
        }
      })
    })
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/backround.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.appView}>
          <TextInput placeholder="Product" style={styles.textInput} onChangeText={product => setProduct(product)} value={product} />
          <TextInput placeholder="Amount" style={styles.textInput} onChangeText={amount => setAmount(amount)} value={amount} />
          <TouchableOpacity onPress={saveItem} style={styles.button}>
            <Text>Add to shoppinglist</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteAll} style={styles.button}>
            <Text>Delete items</Text>
          </TouchableOpacity>
          <FlatList
            data={items}
            style={styles.listContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, }}>
                <Text style={styles.listContainer}>{item.product}, {item.amount} kpl</Text>
                <TouchableOpacity onPress={() => deleteItem(item.product)} style={styles.button}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
}

