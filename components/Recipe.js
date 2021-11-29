import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

export default function Recipe({ route, navigation }) {

  const { meal } = route.params;
  const [name, setName] = useState(meal.strMeal);
  const [category, setCategory] = useState(meal.strCategory);
  const [recipe, setRecipe] = useState(meal.strInstructions);

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