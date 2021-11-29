import React, { useState, useEffect } from 'react';
import styles from './Styles.js';
import { FlatList, Text, View, Image, ImageBackground } from 'react-native';


export default function Frontpage() {

  const [recipes, setRecipes] = useState('');

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then(response => response.json())
      .then(responseJson => setRecipes(responseJson.categories))
      .catch((e) => console.log(e))
  }, []);


  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'lightgrey',
        width: "80%",
        marginLeft: "90%"
      }}
    />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Welcome to RecipeApp!</Text>
      <Text style={styles.textContainerSmall}>We currently have different recipes within these categories:</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View>
            <ImageBackground source={{ uri: item.strCategoryThumb }} style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'stretch',
              width: '100%', height: 150
            }} blurRadius={3}>
              <View style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                justifyContent: 'center', 
                alignItems: 'center' }}>
                <Text style={styles.headerContainer}>{item.strCategory}</Text>
              </View>
            </ImageBackground>
          </View>}
        data={recipes}
        ItemSeparatorComponent={renderSeparator} />
    </View>
  );
}

