import React, { useState } from 'react';
import styles from './Styles.js';
import { Alert, Button, FlatList, Text, TextInput, View, Image, TouchableNativeFeedback } from 'react-native';

export default function Search({ navigation }) {

  const [recipes, setRecipes] = useState('');
  const [name, setName] = useState('');

  const fetchRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      .then(response => response.json())
      .then(responseJson => setRecipes(responseJson.meals))
      .catch((error) => {
        Alert.alert('Error', error);
      });
  }


  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
      <View>
        <Image
          style={{ width: 80, height: 80 }}
          source={{ uri: item.strMealThumb }}>
        </Image>
        <TouchableNativeFeedback style={{ flex: 0.5, borderColor: "black", borderWidth: 1 }} onPress={() => navigation.navigate('Recipe', { meal: item })}>
          <Text style={styles.listContainer}>{item.strMeal}</Text>
        </TouchableNativeFeedback>
      </View>
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
      <Text style={styles.textContainerSmall}>Search for different recipes</Text>
      <TextInput style={{ fontSize: 18, width: 200 }} placeholder='Search with ingredient'
        onChangeText={name => setName(name)}></TextInput>
      <Button style={styles.buttonContainer1} title="Search" onPress={fetchRecipes}></Button>
      <FlatList
        style={styles.listContainer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        data={recipes}
        ItemSeparatorComponent={renderSeparator} />
    </View>

  );
}
