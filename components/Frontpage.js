import React, { useState, useEffect } from 'react';
import styles from './Styles.js';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';


export default function Frontpage() {

  const [recipes, setRecipes] = useState('');

  useEffect(() =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=a`)
    .then(response=> response.json())
    .then(responseJson => setRecipes(responseJson.meals))
    .catch((e) => console.log(e))
    }, []);

   const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      ></View>
    )
   }

  return (
    <View style={styles.container}>
        <Text style={styles.textContainer}>Welcome to RecipeApp!</Text>
            <FlatList
                style={styles.listContainer}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) =>
                <View>
                    <Text style={{fontSize: 18}}>{item.strMeal}</Text>
                    <Image
                    style={{width: 66, height: 58}}
                    source={{uri:item.strMealThumb}}>
                    </Image>
                </View>}
                data={recipes}
                ItemSeparatorComponent={listSeparator} />
    </View>
  );
}

