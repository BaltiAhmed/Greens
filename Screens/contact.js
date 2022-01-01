import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, ImageBackground, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Authcontext } from '../Context/Authcontext';

export default function contact() {

    const auth = useContext(Authcontext);

    const [data, setData] = useState({
        nom:'',
        email:'',
        message:'',
    })

    const namefn = (val) => {
        setData({
            ...data,
            nom: val
        })
    }

    const emailfn = (val) => {
        setData({
            ...data,
            email: val
        })
    }
    
    const msgfn = (val) => {
        setData({
            ...data,
            message: val
        })
    }

    const submit = async () =>{

        console.log('submitt  ::');
        let response = await fetch(
            `${path}/api/contact/ajoutcontact`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        
                        nom: data.nom,
                        email: data.email,
                        message: data.message,
                        id: auth.user._id,
                                    
                    }),
                }
            );

            let responsedata = await response.json();   
            if (responsedata) {
                // console.log(responsedata.agriculteur);
                Alert.alert(
                    'Message',
                    'Mesaaage was sent succefully ',
                    [{ text: 'fermer' }]
                );
            } else {
                Alert.alert(
                    'Message',
                    'respose failed',
                    [{ text: 'fermer' }]
                );
            }

    }

    return (
        <ImageBackground source={require('../assets/cover.jpg')} resizeMode="cover" style={styles.image}>
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.title} >Contact us</Text>
                    <View style={styles.inputs} >
                    <View style={{paddding: 20,paddingTop: "5%", height: "78%", width: "90%", marginHorizontal: "5%", backgroundColor: 'rgba(223, 228, 234,0.5)', borderRadius: 5}}>
                            {/* <FontAwesome
                                name="user-o"
                                style={{marginLeft: "20%"}}
                                // color={colors.text}
                                size={20}
                            /> */}
                        <TextInput
                            placeholder="Name"
                            placeholderTextColor= "#ced6e0"
                            autoCapitalize="none"
                            keyboardType="default"
                            onChangeText={(val)=>namefn(val)}
                            style={styles.textInput}
                        />
                        
                        
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor= "#ced6e0"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={(val)=>emailfn(val)}
                            style={styles.textInput}
                        />
                        
                        <TextInput
                            placeholder="Message"
                            placeholderTextColor= "#ced6e0"
                            multiline
                            editable
                            maxLength={600}
                            numberOfLines={6}
                            keyboardType="default"
                            onChangeText={(val)=>msgfn(val)}
                            style={styles.textInput}
                        />
                        <View style={styles.btn} >
                            <Button 
                                title="Submit"
                                color="#4ab5ab"
                                onPress={()=> submit()}
                            />
                        </View>
                    </View>
                    </View>    
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        // backgroundColor: '#696969',
    },
    title: {
        fontSize: 35,
        alignSelf: 'center',
        marginTop: 45,
        marginBottom: 25,
        color: '#dfe4ea'
    },
    inputs: {
        // paddingLeft: 15,
        alignItems: 'center',
        // borderWidth: 1,
        width: "100%"
    },
    textInput: {
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        alignSelf: 'center',
        marginTop: 5,
        // marginRight: 35,
        marginBottom: 10,
        paddingLeft: 10,
        borderWidth: 1.5,
        borderRadius: 5,
        width: "85%",
        fontSize: 20,
    },
    btn: {
        marginTop:20,
        alignSelf: 'flex-end',
        marginRight: "7.5%",
        color: '#05375a',
        width: 100,
        fontSize: 20,
    },
    image: {
        flex: 1,
        justifyContent: "center"
      },
})
