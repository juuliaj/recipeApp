import React, { useState } from 'react';
import styles from './Styles.js';
import { ScrollView, Text, View, Image } from 'react-native';

export default function Recipe({ route }) {

  const { meal } = route.params;
  const [name, setName] = useState(meal.strMeal);
  const [category, setCategory] = useState(meal.strCategory);
  const [recipe, setRecipe] = useState(meal.strInstructions);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.recipeContainerBig}>{name}</Text>
          <Image
            style={{
              width: 380,
              height: 380 }}
            source={{ uri: meal.strMealThumb }}
            resizeMode='contain'
          />
        <Text style={styles.textContainer}>Food category: {category}</Text>
        <Text style={styles.recipeContainerText}>{recipe}</Text>
      </ScrollView>
    </View>
  );
}

