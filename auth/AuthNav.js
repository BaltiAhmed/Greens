import * as React from 'react';

import { createStackNavigator  } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import SplashScreen from './SplashScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />
      
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
      />
    </Stack.Navigator>
  );
};

export default AuthStack;