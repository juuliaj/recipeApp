import React, { useState, useEffect } from 'react';
import styles from './Styles.js';
import { ScrollView, Text, View, Image, FlatList, TouchableNativeFeedback } from 'react-native';

export default function Categories({ route, navigation }) {

  const { meal } = route.params;
  const [name, setName] = useState(meal.strCategory);
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
      .then(response => response.json())
      .then(responseJson => setRecipes(responseJson.meals))
      .catch((e) => console.log(e))
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
        <TouchableNativeFeedback style={{ flex: 0.5, borderColor: "black", borderWidth: 1 }} onPress={() => navigation.navigate('FrontPageRecipe', { meal: item })}>
        <Text style={styles.listContainer}>{item.strMeal}</Text>
      </TouchableNativeFeedback>
      <View>
      <TouchableNativeFeedback style={{ flex: 0.5, borderColor: "black", borderWidth: 1 }} onPress={() => navigation.navigate('FrontPageRecipe', { meal: item })}>
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
      <Text style={styles.textContainer}>Foods from {name} category</Text>
      <FlatList
        style={styles.listContainer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        data={recipes}
        ItemSeparatorComponent={renderSeparator} />
    </View>
  );
}