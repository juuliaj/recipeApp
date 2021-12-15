import React, { useState } from 'react';
import Search from './components/Search';
import Frontpage from './components/Frontpage';
import Shoppinglist from './components/Shoppinglist';
import Recipe from './components/Recipe';
import Login from './components/Login';
import Register from './components/Register';
import Categories from './components/Categories';
import FrontPageRecipe from './components/FrontPageRecipe'
import { NavigationContainer } from '@react-navigation/native';
import { signIn, store } from './components/SigninReducer';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// Initialize Firebase
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//authorisation stack 
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(104,168,102)',
          },
          headerTitle: ""
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(104,168,102)',
          }
        }}
      />
    </Stack.Navigator>
  );
};

//the main stack component
const MainStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerTransparent: true, headerTitle:""}} name="Search" component={Frontpage} />
      <Stack.Screen options={{headerTransparent: true, headerTitle:""}} name="Categories" component={Categories} />
      <Stack.Screen options={{headerTitle:""}} name="FrontPageRecipe" component={FrontPageRecipe} />
    </Stack.Navigator>
  );
}

//stack for serach page and recipe
const SearchStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false, headerTitle:""}} name="Back to search" component={Search} />
      <Stack.Screen options={{headerTitle:""}} name="Recipe" component={Recipe} />
    </Stack.Navigator>
  );
}

//bottom stack navigator to navigate different pages
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Frontpage" 
        component={MainStackNavigator} 
        options= {{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="food-variant" size={24} color="black" />
          ),
          headerStyle: {
            backgroundColor: 'rgb(104,168,102)',
          },
          headerRight: () => (
            <AntDesign.Button
              onPress={() => store.dispatch(signIn(false))}
              color="black"
              backgroundColor="rgb(104,168,102)"
              name="logout"
              size={28}
            />
          ),
        }} 
      />
       <Tab.Screen 
        name="Search" 
        component={SearchStackNavigator}
        options= {{
          tabBarIcon: () => (
            <AntDesign name="search1" size={24} color="black" />
          ),
          headerStyle: {
            backgroundColor: 'rgb(104,168,102)',
          },
          headerRight: () => (
            <AntDesign.Button
              onPress={() => store.dispatch(signIn(false))}
              color="black"
              backgroundColor="rgb(104,168,102)"
              name="logout"
              size={28}
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Shoppinglist" 
        component={Shoppinglist}
        options= {{
          tabBarIcon: () => (
            <AntDesign name="shoppingcart" size={24} color="black" />
          ),
          headerStyle: {
            backgroundColor: 'rgb(104,168,102)',
          },
          headerRight: () => (
            <AntDesign.Button
              onPress={() => store.dispatch(signIn(false))}
              color="black"
              backgroundColor="rgb(104,168,102)"
              name="logout"
              size={28}
            />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};


export default function App() {

  const [isSigned, setIsSigned] = useState(false);

  //updates state from redux
  store.subscribe(() => {
    setIsSigned(store.getState());
  })

  return (
    //checks if isSigned is true and then changes the path from login to frontpage   
    <NavigationContainer>
      {isSigned ? <BottomTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );

}




