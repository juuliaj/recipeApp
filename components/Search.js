import React, { useState, useEffect } from 'react';
import styles from './Styles.js';
import { AntDesign } from '@expo/vector-icons';
import { Alert, Button, FlatList, Text, TextInput, View, Image, TouchableNativeFeedback } from 'react-native';

export default function Search({ navigation }) {

  const [recipes, setRecipes] = useState('');
  const [name, setName] = useState('');
  const [text, setText] = useState('Your random recipe of the day!');

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then(response => response.json())
      .then(responseJson => setRecipes(responseJson.meals))
      .catch((e) => console.log(e))
  }, []);


  const fetchRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      .then(response => response.json())
      .then(responseJson => { setRecipes(responseJson.meals), setText('')})
      .catch((error) => {
        Alert.alert('Error', error);
      });
  }


  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
      <TouchableNativeFeedback style={{ flex: 0.5, borderColor: "black", borderWidth: 1 }} onPress={() => navigation.navigate('Recipe', { meal: item })}>
        <Text style={styles.listContainer}>{item.strMeal}</Text>
      </TouchableNativeFeedback>
      <View>
        <TouchableNativeFeedback style={{ flex: 0.5, borderColor: "black", borderWidth: 1 }} onPress={() => navigation.navigate('Recipe', { meal: item })}>
          <Image
            style={{ width: 80, height: 80, borderRadius: 10, }}
            source={{ uri: item.strMealThumb }}>
          </Image>
        </TouchableNativeFeedback>
      </View>
    </View>
  )

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'lightgrey',
        height: 0.5,
        width: "80%",
        marginLeft: "10%"
      }}
    />
  )

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', padding: 15, marginTop: 20}}>
      <TextInput style={{ fontSize: 18, width: 200 }} placeholder='Search for recipes'
        onChangeText={name => setName(name)}></TextInput>
       <AntDesign name="search1" size={30} color="black" onPress={fetchRecipes}/>
       </View>
       <Text style={{ fontSize: 20, padding: 20 }}>{text}</Text>
      <FlatList
        style={styles.listContainer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        data={recipes}
        ItemSeparatorComponent={renderSeparator} />
    </View>

  );
}
