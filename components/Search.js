import React, { useState, useEffect } from 'react';
import styles from './Styles.js';
import { AntDesign } from '@expo/vector-icons';
import { Alert, FlatList, Text, TextInput, View, Image, TouchableNativeFeedback, ImageBackground } from 'react-native';

export default function Search({ navigation }) {

  const [recipes, setRecipes] = useState('');
  const [name, setName] = useState('');
  const [text, setText] = useState('Your random recipe of the day!');

  //fetches the random recipe
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then(response => response.json())
      .then(responseJson => setRecipes(responseJson.meals))
      .catch((e) => console.log(e))
  }, []);


  //fetches the wanted recipes with typed keyword
  const fetchRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      .then(response => response.json())
      .then(responseJson => { setRecipes(responseJson.meals), setText('') })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  }


  //renders the items into a list and makes title and picture into buttons
  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
      <TouchableNativeFeedback onPress={() => navigation.navigate('Recipe', { meal: item })}>
        <Text style={styles.listContainer}>{item.strMeal}</Text>
      </TouchableNativeFeedback>
      <View>
        <TouchableNativeFeedback onPress={() => navigation.navigate('Recipe', { meal: item })}>
          <Image
            style={{ width: 80, height: 80, borderRadius: 10, marginLeft: 5 }}
            source={{ uri: item.strMealThumb }}>
          </Image>
        </TouchableNativeFeedback>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/backround.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.appView}>
          <View style={{ flexDirection: 'row', padding: 15, marginTop: 20 }}>
            <TextInput style={{ fontSize: 18, width: 200 }} placeholder='Search for recipes'
              onChangeText={name => setName(name)}></TextInput>
            <AntDesign name="search1" size={30} color="black" onPress={fetchRecipes} />
          </View>
          <Text style={{ fontSize: 20, padding: 20 }}>{text}</Text>
          <FlatList
            style={styles.listContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            data={recipes} />
        </View>
      </ImageBackground>
    </View>
  );
}
