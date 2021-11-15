import React from 'react';
import Search from './components/Search';
import Frontpage from './components/Frontpage';
import Shoppinglist from './components/Shoppinglist';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export default function App() {
  return (
   <NavigationContainer>
     <Tab.Navigator>
       <Tab.Screen 
        name="Frontpage" 
        component={Frontpage} 
        options= {{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-variant" size={24} color="black" />
          )}} 
      />
       <Tab.Screen 
        name="Search" 
        component={Search}
        options= {{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={24} color="black" />
          )}} 
      />
      <Tab.Screen 
        name="Shoppinglist" 
        component={Shoppinglist}
        options= {{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={24} color="black" />
          )}} 
      />
     </Tab.Navigator>
   </NavigationContainer>
  );
}



