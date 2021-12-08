import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, ImageBackground, TouchableNativeFeedback } from 'react-native';
import styles from './Styles';

export default function Frontpage({ navigation }) {

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

  const renderItem = ({ item }) => (
    <View >
      <View>
        <TouchableNativeFeedback onPress={() => navigation.navigate('Categories', { meal: item })}>
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
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/backround.png')} resizeMode="cover" style={styles.image}>
                  <View style={styles.appView}>
      <Text style={styles.textContainer}>Hello ! Welcome to the RecipeApp!</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        data={recipes}
        ItemSeparatorComponent={renderSeparator} />
        </View>
        </ImageBackground>
    </View>
  );
}

