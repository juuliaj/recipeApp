import React, { useState, useEffect } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View, Image  } from 'react-native';

export default function App() {

  const [recipes, setRecipes] = useState('');
  const [ingredients, setIngredients] = useState('');

  const fetchRecipes= () =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    .then(response=> response.json())
    .then(responseJson => setRecipes(responseJson.meals))
    .catch((error) => {
      Alert.alert('Error', error);
    });
   }

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
            <TextInput style={{fontSize: 18, width: 200}} placeholder='ingredient'
        onChangeText={ingredients => setIngredients(ingredients)}></TextInput>
      <Button style={styles.buttonContainer1} title="Search" onPress={fetchRecipes}></Button>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  listContainer: {
    flex: 1, 
    backgroundColor: '#fff',
    marginLeft : "5%"
},
buttonContainer1: {
    flex: 4,
    width: 200,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    color: 'rgb(136, 136, 250)',
},
});



