import React, { useState, useEffect } from 'react';
import styles from './Styles.js';
import { ScrollView, Text, View, Image, FlatList } from 'react-native';

export default function FrontPageRecipe({ route }) {

    const { meal } = route.params;
    const [name, setName] = useState(meal.strMeal);
    const [recipes, setRecipes] = useState();

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
            .then(response => response.json())
            .then(responseJson =>
                setRecipes(responseJson.meals))
            .catch((e) => console.log(e))
    }, []);

    const renderItem = ({ item }) => (
        <View>
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
                <Text style={styles.textContainer}>Food category: {item.strCategory}</Text>
                <Text style={styles.recipeContainerText}>{item.strInstructions}</Text>
            </ScrollView>
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
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                data={recipes}
                ItemSeparatorComponent={renderSeparator} />
        </View>
    );
}