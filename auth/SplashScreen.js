import React, {useState} from 'react'
import { StyleSheet, Button, Text, View, StatusBar, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'



const LoginScreen = ({ navigation }) => {

    return (
      <ImageBackground source={require('../assets/cover.jpg')} resizeMode="cover" style={styles.image_b}>
      <ScrollView style={styles.container} >
        
        <View style={styles.view_up} >
          <Animatable.View 
            animation="bounceIn"
            style={styles.text_view}>
            <Text style={styles.text} >Welcome to Greens</Text>

          </Animatable.View>
        </View>
        
        
        <Animatable.View
          animation="fadeInUpBig"
          style={styles.view_but} 
        >
          <Animatable.View 
            animation="rotate"
            style={styles.view_lock} >
            <Image
              source={require('../assets/mini_logo.png')}
              style={styles.mini_logo}
              resizeMode= "stretch"
              />
          </Animatable.View>
            <Image
            source={require('../assets/leaf_logo.png')}
            style={styles.leaf_logo}
            resizeMode= "stretch"
            />

            <TouchableOpacity 
              style={styles.btn}
              onPress={()=>navigation.navigate('Login')}
            >
              <Text style={styles.btn_txt} >Dive Into Our World</Text>
                <Animatable.View
                    animation="fadeInLeft"
                    duration={2000}
                >
                    
                    <FontAwesome 
                         
                        name="arrow-right"
                        size={25}
                        style={styles.arrow}
                        color={'#757D75'}
                    />
                </Animatable.View>
            </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
      </ImageBackground>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    // backgroundColor: '#FFFFFF',
  },
  view_up: {
    flex: 1,
    width: "100%",
    // borderWidth: 1,
    // backgroundColor: '#FFFFFF',
  },
  text_view: {
    // borderWidth: 1,
    marginTop: "20%",
    marginLeft: 20,
    width: 150,
  },
  text :{
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  view_but: {
    // flex: 3,
    borderWidth: 1.5,
    borderColor: '#6EAD90',
    marginTop: "53%",
    backgroundColor: 'rgba(223, 228, 234, 0.75)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // color: '#556AD7'
    zIndex: -1,
  },
  form_view: {
    // borderWidth: 1,
    marginTop: 80,
    marginLeft: 20,
    marginRight: 20,
   
  },
  login_text: {
    fontSize: 22,
    marginLeft: 5,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#757D75',
    fontSize: 15,
    height: 40,
    padding: 10,
    marginTop: 20,
  },
  btn: {
    borderWidth:1,
    borderColor: '#757D75',
    marginHorizontal: 20,
    marginTop: "20%",
    marginBottom: "15%",
    borderRadius: 30,
    height: 40,
    alignItems: 'center',
    flexDirection:'row'
    
  },
  btn_txt: {
    fontSize: 20,
    marginLeft: 40,
    fontWeight: 'bold',
    color: '#555A55'
  },
  view_lock: {
    // position: 'absolute',
    borderColor: '#6EAD90',  
    backgroundColor: 'rgba(223, 228, 234, 0.95)',
    borderWidth: 2,
    width: 55,
    height: 55,
    borderRadius: 30,
    marginTop: "-8%",
    marginLeft: 20,
    // paddingTop: 3.5,
    paddingLeft: 1.5,
    zIndex: 999,
     
  },
  mini_logo: {
    height: 50,
    width: 50,
  },
  leaf_logo: {
    width: windowWidth * 0.5,
    height:windowHeight * 0.3,
    alignSelf: 'center',
  },
  arrow: {
    marginLeft:20,

  },
  image_b: {
    flex: 1,
    justifyContent: "center",
    zIndex:-9,
  },
});

export default LoginScreen;
