import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './auth/AuthNav';
import ScreensNav from './Screens/ScreensNav';
import Ingnav from './Screens/Ingnav';
import { Authcontext } from './Context/Authcontext';
import { UserAuth } from './Hooks/auth';

export default function App() {

  global.path = 'http://192.168.1.185:5000';

  const { user, token, login, logout } = UserAuth();

  let routes;
  if (user) {
    if (token === "agriculteur") {
      routes = <ScreensNav />;
    } else {
      routes =  <Ingnav />;
    }
  } else {
    routes = <AuthStack />;
  }

  return (
    <Authcontext.Provider
      value={{ user: user, token: token, login: login, logout: logout }}
    >
      <NavigationContainer>
  
        {routes}
       
      </NavigationContainer>
    </Authcontext.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
