import React from 'react';
import Search from './components/Search';
import Frontpage from './components/Frontpage';
import Shoppinglist from './components/Shoppinglist';
import Recipe from './components/Recipe';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}}  name="Back to search" component={Search} />
      <Stack.Screen name="Recipe" component={Recipe} />
    </Stack.Navigator>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Frontpage" 
        component={Frontpage} 
        options= {{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-variant" size={24} color="black" />
          ),
          headerStyle: {
            backgroundColor: 'rgb(104,168,102)',
          }}} 
      />
       <Tab.Screen 
        name="Search" 
        component={MainStackNavigator}
        options= {{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={24} color="black" />
          ),
          headerStyle: {
            backgroundColor: 'rgb(104,168,102)',
          }}} 
      />
      <Tab.Screen 
        name="Shoppinglist" 
        component={Shoppinglist}
        options= {{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={24} color="black" />
          ),
          headerStyle: {
            backgroundColor: 'rgb(104,168,102)',
          }}} 
      />
    </Tab.Navigator>
  );
};


export default function App() {
  return (
   <NavigationContainer>
     <BottomTabNavigator/>
   </NavigationContainer>
  );
}




