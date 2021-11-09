import React from 'react';
import Search from './components/Search';
import Frontpage from './components/Frontpage';
import Shoppinglist from './components/Shoppinglist';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
   <NavigationContainer>
     <Tab.Navigator>
       <Tab.Screen 
        name="Frontpage" 
        component={Frontpage} 
      />
       <Tab.Screen 
        name="Search" 
        component={Search}
      />
      <Tab.Screen 
        name="Shoppinglist" 
        component={Shoppinglist}
      />
     </Tab.Navigator>
   </NavigationContainer>
  );
}



