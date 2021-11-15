import React, { useState, useEffect } from 'react';
import styles from './Styles.js';
import { FlatList, Text, View, Image } from 'react-native';


export default function Frontpage() {

  const [recipes, setRecipes] = useState('');

  useEffect(() => {
    fetch(`https://https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then(response=> response.json())
    .then(responseJson => setRecipes(responseJson.categories))
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
                    <Text style={{fontSize: 18}}>{item.strCategory}</Text>
                   
                </View>}
                data={recipes}
                ItemSeparatorComponent={listSeparator} />
    </View>
  );
}

