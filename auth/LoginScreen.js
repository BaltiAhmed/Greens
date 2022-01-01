import React, {useState, useContext} from 'react'
import { StyleSheet, Button, Text, View, StatusBar, TextInput, TouchableOpacity, Alert, ImageBackground, ScrollView } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import * as Animatable from 'react-native-animatable';
import { Authcontext } from '../Context/Authcontext';


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const auth = useContext(Authcontext);

  const submit = async () => {


    let response = await fetch(
      `${path}/api/agriculteur/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert(
        'Message',
        responsedata.message,
        [{ text: 'fermer' }]
      );
      
      throw new Error(responsedata.message);
    }
    Alert.alert(
      'Message',
      'You are logged in',
      [{ text: 'fermer' }]
    );
    let responsedata = await response.json();
    // console.log(responsedata);
    auth.login(responsedata.user, responsedata.token);
  };


    return (
      <ImageBackground source={require('../assets/cover.jpg')} resizeMode="cover" style={styles.image_b}> 
      <ScrollView style={styles.container} >
        
        <View style={styles.view_up} >
          <Animatable.View 
            animation="bounceIn"
            style={styles.text_view}>
            <Text style={styles.text} >الدخول </Text>

          </Animatable.View>
        </View>
        
        
        <Animatable.View
          animation="fadeInUpBig"
          style={styles.view_but} 
        >
          <Animatable.View 
            animation="rotate"
            style={styles.view_lock} >
            <EvilIcons
              name="lock"
              size={50}
              color={'#6EAD90'}
            />
          </Animatable.View>

          <View style={styles.form_view}>

            {/* <Text style={styles.login_text}> Login </Text> */}

            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                setEmail(text);
              }}
              placeholder="بريدك الالكتروني"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                setPassword(text);  
              }}
              placeholder="كلمة السر"
              autoCapitalize="none"
              // secureTextEntry
            />

            <TouchableOpacity 
              style={[styles.btn,{backgroundColor: '#26A65B'}]}
              onPress={()=>submit()}
            >
              <Text style={[styles.btn_txt,{color: '#ffffff'}]} >الدخول </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.btn,{borderWidth: 2, borderColor: '#757D75', marginBottom: "15%"}]}
              onPress={()=>navigation.navigate('Register')}
            >
              <Text style={styles.btn_txt} >التسجيل </Text>
            </TouchableOpacity>

          </View>
        </Animatable.View>

      </ScrollView>
      </ImageBackground>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(223, 228, 234, 0.4)'
  },
  image_b: {
    flex: 1,
    justifyContent: "center",
    // position: 'absolute',
    zIndex: -9,
  },
  view_up: {
    flex: 1,
    // borderWidth: 1,
    // backgroundColor: '#FFFFFF',
  },
  text_view: {
    // borderWidth: 1,
    marginTop: "40%",
    paddingRight: "15%",
    // width: 150,
    alignSelf: 'flex-end',
  },
  text :{
    color: '#000',
    fontSize: 35,
    fontWeight: 'bold',
  },
  view_but: {
    // flex: 3,
    marginTop: "53%",
    borderWidth: 1.5,
    borderColor: '#6EAD90',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(223, 228, 234, 0.75)',
    // color: '#556AD7'
    zIndex: -1,
  },
  form_view: {
    // borderWidth: 1,
    marginTop: "5%",
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
    // borderWidth:1,
    
    marginTop: 40,
    borderRadius: 30,
    height: 40,
    alignItems: 'center',
    
  },
  btn_txt: {
    fontSize: 20,
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
    paddingTop: 3.5,
    paddingLeft: 1,
     
  },
});

export default LoginScreen;
