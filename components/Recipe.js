import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

export default function Recipe({ route, navigation }) {

  const { meal } = route.params;
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
      .then(response => response.json())
      .then(data => {
        setName(meal.strMeal)
        setCategory(meal.strCategory)
        setRecipe(meal.strInstructions)
      })
      .catch((e) => console.error(e))
  }, []);

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Image
        style={styles.imageContainer}
        source={{ uri: meal.strMealThumb }}
        resizeMode='contain'
      />
      <Text>{category}</Text>
      <Text>{recipe}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    margin: 12,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
  },
});