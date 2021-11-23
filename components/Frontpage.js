import React, { useState, useEffect } from 'react';
import styles from './Styles.js';
import { FlatList, Text, View, Image } from 'react-native';


export default function Frontpage() {

  const [recipes, setRecipes] = useState('');

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then(response => response.json())
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
          marginLeft: "90%"
        }}
      ></View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Welcome to RecipeApp!</Text>
      <Text style={styles.textContainerSmall}>We currently have different recipes within these categories:</Text>
      <FlatList
        style={styles.listContainer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View>
            <Text style={styles.listContainer}>{item.strCategory}</Text>
            <Image
              style={{ width: 80, height: 80 }}
              source={{ uri: item.strCategoryThumb }}>
            </Image>
          </View>}
        data={recipes}
        ItemSeparatorComponent={listSeparator} />
    </View>
  );
}

