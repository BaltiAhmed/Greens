import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import Homeing from './ingenieur/Homeing';
import ProfileScreen from './ProfileScreen';
import reclam from './ingenieur/reclam';
import rapport from './ingenieur/rapport';
import contact from './contact';

const HomeStack = createStackNavigator();
const ReclamStack = createStackNavigator();
const RapportStack = createStackNavigator();
const ProfilStack = createStackNavigator();
const ContactStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

export default function Ingnav() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#056458',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-home" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name="Diagnostics"
                component={RapportStackScreen}
                options={{
                    tabBarLabel: 'Diagnostics',
                    tabBarColor: '#8bcbc4',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="history" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name="Reclamation"
                component={ReclamStackScreen}
                options={{
                    tabBarLabel: 'شكوى',
                    tabBarColor: '#0B9191',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="report" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: '#0E7490',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="user" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name="Contact"
                component={ContactStackScreen}
                options={{
                    tabBarLabel: 'Contact',
                    tabBarColor: '#0E7490',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="contacts" color={color} size={26} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }} >
        <HomeStack.Screen name ="Home" component={Homeing} 
        />
        
    </HomeStack.Navigator>
)

const ProfileStackScreen = ({navigation}) => (
    <ProfilStack.Navigator screenOptions={{
        // headerStyle:{
        //     backgroundColor: '#0E7490',
        // },
        // headerTintColor:'#fff',
        // headerTintStyle:{
        //     fontWeight: 'bold'
        // }
        headerShown: false
    }}>
        <ProfilStack.Screen name="Profile" component={ProfileScreen} options={{
            title:'Profile'
            
            }}
        />
        
    </ProfilStack.Navigator>
)
const ContactStackScreen = ({navigation}) => (
    <ContactStack.Navigator screenOptions={{
        // headerStyle:{
        //     backgroundColor: '#0E7490',
        // },
        // headerTintColor:'#fff',
        // headerTintStyle:{
        //     fontWeight: 'bold'
        // }
        headerShown: false
    }}>
        <ContactStack.Screen name="Profile" component={contact} options={{
            title:'Contact'
            
            }}
        />
        
    </ContactStack.Navigator>
)

const RapportStackScreen = ({navigation}) => (
    <RapportStack.Navigator screenOptions={{
        // headerStyle:{
        //     backgroundColor: '#0E7490',
        // },
        // headerTintColor:'#fff',
        // headerTintStyle:{
        //     fontWeight: 'bold'
        // }
        headerShown: false
    }}>
        <RapportStack.Screen name="Rapport" component={rapport} options={{
            title:'Rapport'
            
            }}
        />
        
    </RapportStack.Navigator>
)

const ReclamStackScreen = ({navigation}) => (
    <ReclamStack.Navigator screenOptions={{
        // headerStyle:{
        //     backgroundColor: '#0E7490',
        // },
        // headerTintColor:'#fff',
        // headerTintStyle:{
        //     fontWeight: 'bold'
        // }
        headerShown: false
    }}>
        <ReclamStack.Screen name="Reclamation" component={reclam} options={{
            title:'Reclamation'
            
            }}
        />
        
    </ReclamStack.Navigator>
)
