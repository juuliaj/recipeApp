import React, { useState, useEffect } from 'react';
import styles from './Styles.js';
import { ScrollView, Text, View, Image, } from 'react-native';

export default function FrontPageRecipe({ route }) {

    //gets the selected recipes name 
    const { meal } = route.params;
    const [name, setName] = useState(meal.strMeal);
    const [category, setCategory] = useState();
    const [instructions, setInstructions] = useState();
    const [ingredients, setIngredients] = useState([
        {
            ingredient: '',
            amount: '',
        },
    ]);

    //fetches the selected recipe and sets the informations
    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
            .then(response => response.json())
            .then(responseJson => {
                setCategory(responseJson.meals[0].strCategory),
                    setInstructions(responseJson.meals[0].strInstructions),
                    setIngredients([
                        {
                            ingredient: responseJson.meals[0].strIngredient1,
                            amount: responseJson.meals[0].strMeasure1,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient2,
                            amount: responseJson.meals[0].strMeasure2,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient3,
                            amount: responseJson.meals[0].strMeasure3,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient4,
                            amount: responseJson.meals[0].strMeasure4,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient5,
                            amount: responseJson.meals[0].strMeasure5,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient6,
                            amount: responseJson.meals[0].strMeasure6,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient7,
                            amount: responseJson.meals[0].strMeasure7,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient8,
                            amount: responseJson.meals[0].strMeasure8,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient9,
                            amount: responseJson.meals[0].strMeasure9,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient10,
                            amount: responseJson.meals[0].strMeasure10,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient11,
                            amount: responseJson.meals[0].strMeasure11,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient12,
                            amount: responseJson.meals[0].strMeasure12,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient13,
                            amount: responseJson.meals[0].strMeasure13,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient14,
                            amount: responseJson.meals[0].strMeasure14,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient15,
                            amount: responseJson.meals[0].strMeasure15,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient16,
                            amount: responseJson.meals[0].strMeasure16,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient17,
                            amount: responseJson.meals[0].strMeasure17,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient18,
                            amount: responseJson.meals[0].strMeasure18,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient19,
                            amount: responseJson.meals[0].strMeasure19,
                        },
                        {
                            ingredient: responseJson.meals[0].strIngredient20,
                            amount: responseJson.meals[0].strMeasure20,
                        },
                    ])
            })
            .catch((e) => console.log(e))
    }, []);

    //renders the list with its components
    ingredientList = () => {
        return ingredients.map((item, index) => {
            if (item.ingredient != "" && item.amount != "") {
                return (
                    <View style={styles.ingredientContainer} key={index}>
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
                        height: 380,
                        borderRadius: 15,
                        marginLeft: 20,
                    }}
                    source={{ uri: meal.strMealThumb }}
                    resizeMode='contain'
                />
                <Text style={styles.textContainer}>Food category: {category}</Text>
                <View>{ingredientList()}</View>
                <Text style={styles.recipeContainerText}>{instructions}</Text>
            </ScrollView>
        </View>
    );
}