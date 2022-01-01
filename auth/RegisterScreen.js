import React, {useState, useEffect} from 'react'
import { StyleSheet, Button, Text, View, Dimensions, TextInput, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { RadioButton } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    // const [datenaissa, setDatenaissa] = useState();
    // const [password, setPassword] = useState();
    const [telephone, setTelephone] = useState();
    const [adresse, setAdresse] = useState();
    const [date, setDate] = useState(new Date());
    // const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState('agriculteur');

    // affiche data picker :: //////////////////////////////////////////////
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      console.log(moment(date).format('DD/MM/YYYY'));
    };

    

    const showDatepicker = () => {
      setShow(true);
    };

    useEffect(() => {
      // console.log(moment(date).format('DD/MM/YYYY'));
      // console.log(date.toString().substring(0, 10));
    }, []);

    const submit = async () => {
      // setLoading(true);
      // setDate("05-04-1 998");
      let response = await fetch(
        `${path}/api/agriculteur/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            email:email,
            // password:password,
            date:moment(date).format('DD/MM/YYYY'),
            telephone:telephone,
            adresse:adresse,
            role: checked
          }),
        }
      );
      let responsedata = await response.json();
      if (!response.ok) {
        Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
        throw new Error(responsedata.message);
      }
      Alert.alert("Message", "Votre compte est crée votre mot de passe etait envoyer, Verfier votre email", [{ text: "fermer" }]);
      navigation.navigate('Login')
    };

    return (
        <ImageBackground source={require('../assets/cover.jpg')} resizeMode="cover" style={styles.image_b}>
      <ScrollView style={styles.container} >
        <View style={styles.view_up} >
          <Animatable.View 
            animation="bounceIn"
            style={styles.text_view}>
            <Text style={styles.text} >التسجيل</Text>

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

            {/* <Text style={styles.login_text}> Register </Text> */}
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: "5%",  marginTop: "5%"}}>
              <TouchableOpacity style={{flexDirection: 'row', height: "130%",  }} 
              onPress={() => setChecked('agriculteur')}>
                <RadioButton
                  value="first"
                  status={ checked === 'agriculteur' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('agriculteur')}
                  color="black"
                />
                <Text style={{fontSize: 18,marginTop: "1.5%"}}>   الفلاح  </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', height: "110%" }}
                onPress={() => setChecked('ingenieur')}>
                <RadioButton
                  value="second"
                  status={ checked === 'ingenieur' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('ingenieur')}
                  color="black"
                />
                <Text style={{fontSize: 18,marginTop: "1.5%"}}> المهندس </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={[styles.input,{marginTop: 0}]}
              onChangeText={(val) => setNom(val)}
              autoCapitalize="none"
              placeholder="اسمك"
            />
            <TextInput
              style={styles.input}
              onChangeText={(val) => setPrenom(val)}
              autoCapitalize="none"
              placeholder="اللقب "
            />

            <TextInput
              style={styles.input}
              onChangeText={(val) => setEmail(val)}
              autoCapitalize="none"
              placeholder="بريدك الالكتروني"
            />

            <TextInput
              style={styles.input}
              onChangeText={(val) => setTelephone(val)}
              autoCapitalize="none"
              placeholder="الهاتف "
            />

            <TextInput
              style={styles.input}
              onChangeText={(val) => setAdresse(val)}
              autoCapitalize="none"
              placeholder="العنوان "
            />

            <TouchableOpacity style={{width :"100%", flexDirection: 'row', alignItems: 'flex-end'}}
              onPress={showDatepicker}
              >
              <View style={{paddingTop:"7%",  marginLeft: "51.5%", marginRight: "2%"}}>
                <Fontisto
                  name="date"
                  size={40}
                  color={'#696b69'}
                />
              </View>
              <Text style={[styles.input,{width: "35%"}]} >{moment(date).format('DD/MM/YYYY')}</Text>
            </TouchableOpacity>
            {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
            {show && (
            <DateTimePicker
              // testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
            )}
            <TouchableOpacity 
              style={[styles.btn,{backgroundColor: '#26A65B'}]}
              onPress={()=> submit()}
            >
              <Text style={[styles.btn_txt,{color: '#ffffff'}]} >التسجيل</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.btn,{borderWidth: 2, borderColor: '#696b69',marginBottom: "15%"}]}
              onPress={()=> navigation.navigate('Login')}
            >
              <Text style={styles.btn_txt} >الدخول</Text>
            </TouchableOpacity>

          </View>
        </Animatable.View>
        
      </ScrollView>
      </ImageBackground>  
    )
}
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    // backgroundColor: '#FFFFFF',

  },
  image_b: {
    flex: 1,
    justifyContent: "center",
    zIndex:-9,
  },
  view_up: {
    flex: 1,
    // borderWidth: 1,
    // backgroundColor: '#FFFFFF',
  },
  text_view: {
    // borderWidth: 1,
    marginTop: "5%",
    marginRight: "10%",
    // width: 150,
    
  },
  text :{
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  view_but: {
    // flex: 3,
    marginTop: "20%",
    // height: "110%",
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#6EAD90',
    backgroundColor: 'rgba(223, 228, 234, 0.75)',
    // marginBottom: "5%",
    // color: '#556AD7'
    zIndex: -1,
  },
  form_view: {
    // borderWidth: 1,
    // marginTop: 20,
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
    
    marginTop: "8%",
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
    backgroundColor: 'rgba(223, 228, 234, 0.9)',
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

export default RegisterScreen;
