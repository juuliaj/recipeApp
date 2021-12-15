import React, { useState, useEffect } from 'react';
import styles from './Styles.js';
import { Text, View, Image, FlatList, TouchableNativeFeedback, ImageBackground } from 'react-native';

export default function Categories({ route, navigation }) {

  const { meal } = route.params;
  const [name, setName] = useState(meal.strCategory);
  const [recipes, setRecipes] = useState();

  //fetces recipes from selected category
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
      .then(response => response.json())
      .then(responseJson => setRecipes(responseJson.meals))
      .catch((e) => console.log(e))
  }, []);

  //renders the recipes into a list and makes title and picture into buttons
  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
      <TouchableNativeFeedback onPress={() => navigation.navigate('FrontPageRecipe', { meal: item })}>
        <Text style={styles.listContainer}>{item.strMeal}</Text>
      </TouchableNativeFeedback>
      <View>
        <TouchableNativeFeedback onPress={() => navigation.navigate('FrontPageRecipe', { meal: item })}>
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
          <Text style={styles.textContainer}>Foods from {name} category</Text>
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