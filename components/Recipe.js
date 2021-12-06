import React, { useState } from 'react';
import styles from './Styles.js';
import { ScrollView, Text, View, Image } from 'react-native';

export default function Recipe({ route }) {

  const { meal } = route.params;
  const [name, setName] = useState(meal.strMeal);
  const [category, setCategory] = useState(meal.strCategory);
  const [recipe, setRecipe] = useState(meal.strInstructions);
  const [ingredients, setIngredients] = useState([
    {
      ingredient: meal.strIngredient1,
      amount: meal.strMeasure1,
    },
    {
      ingredient: meal.strIngredient2,
      amount: meal.strMeasure2,
    },
    {
      ingredient: meal.strIngredient3,
      amount: meal.strMeasure3,
    },
    {
      ingredient: meal.strIngredient4,
      amount: meal.strMeasure4,
    },
    {
      ingredient: meal.strIngredient5,
      amount: meal.strMeasure5,
    },
    {
      ingredient: meal.strIngredient6,
      amount: meal.strMeasure6,
    },
    {
      ingredient: meal.strIngredient7,
      amount: meal.strMeasure7,
    },
    {
      ingredient: meal.strIngredient8,
      amount: meal.strMeasure8,
    },
    {
      ingredient: meal.strIngredient9,
      amount: meal.strMeasure9,
    },
    {
      ingredient: meal.strIngredient10,
      amount: meal.strMeasure10,
    },
    {
      ingredient: meal.strIngredient11,
      amount: meal.strMeasure11,
    },
    {
      ingredient: meal.strIngredient12,
      amount: meal.strMeasure12,
    },
    {
      ingredient: meal.strIngredient13,
      amount: meal.strMeasure13,
    },
    {
      ingredient: meal.strIngredient14,
      amount: meal.strMeasure12,
    },
    {
      ingredient: meal.strIngredient15,
      amount: meal.strMeasure15,
    },
    {
      ingredient: meal.strIngredient16,
      amount: meal.strMeasure16,
    },
    {
      ingredient: meal.strIngredient17,
      amount: meal.strMeasure17,
    },
    {
      ingredient: meal.strIngredient18,
      amount: meal.strMeasure18,
    },
    {
      ingredient: meal.strIngredient19,
      amount: meal.strMeasure19,
    },
    {
      ingredient: meal.strIngredient20,
      amount: meal.strMeasure20,
    },
  ]);

  ingredientList = () => {
    return ingredients?.map((item) => {
      if (item.ingredient != "" && item.amount != "") {
        return (
          <View style={styles.ingredientContainer}>
            <Text>{item.ingredient}</Text>
            <Text>{item.amount}</Text>
          </View>
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.recipeContainerBig}>{name}</Text>
        <Image
          style={{
            width: 380,
            height: 380
          }}
          source={{ uri: meal.strMealThumb }}
          resizeMode='contain'
        />
        <Text style={styles.textContainer}>Food category: {category}</Text>
        <View>{ingredientList()}</View>
        <Text style={styles.recipeContainerText}>{recipe}</Text>
      </ScrollView>
    </View>
  );
}

