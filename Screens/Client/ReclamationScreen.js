import React, { useState, useContext } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, StatusBar, Image, Alert, ScrollView,ImageBackground } from 'react-native'
import moment from 'moment';
import axios from 'axios';
import { Authcontext } from '../../Context/Authcontext';


export default function ReclamationScreen () {

    const auth = useContext(Authcontext);

    const [data, setData] = React.useState({
        sujet: '',
        date: '',
        reponse: ''
    });
    const textInputChange = (val) =>{
        setData({
            ...data,
            sujet:val,
            date: moment().format('YYYY/MM/DD')
        });
        console.log(data.sujet);
    }

    const submit = async () => {
        console.log("in fn");
        let response = await fetch(
            `${path}/api/reclamation/ajoutreclamation`,
            // "http://192.168.1.101:5000/api/reclamation/ajoutreclamation",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sujet: data.sujet,
                    //   IdAgriculteur:auth.userId
                    IdAgriculteur: auth.user._id,
                    
                }),
            }
            );
            console.log("fetch sent");
            // console.log(response);
            if (!response.data) {
                // let responsedata = await response.json();
                // Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);

                let responsedata = await response.json();
                console.log(responsedata);
                Alert.alert(
                    "Message",
                    "votre demande est enregistrer, vous recevez une réponce bientot",
                    [{ text: "fermer" }]
                    );
                    // navigation.navigate('Home');
                // console.log("axios sent");
                // throw new Error(responsedata.message);
            } else {
                Alert.alert(
                "Message",
                "votre demande est enregistrer, vous recevez une réponce bientot",
                [{ text: "fermer" }]
                );
            }
    };


    return (
        <ImageBackground source={require('../../assets/cover.jpg')} resizeMode="cover" style={styles.image_b}>
        <ScrollView style={styles.all}>
        <Image
            style={styles.img}
            source={require('../../assets/reclam.png')}
        />
            <Text style={styles.demande}> شكوى : </Text>
            <TextInput
                    placeholder="اكتب شكواك هنا "
                    style={styles.textInput}
                    autoCapitalize="none"
                    multiline
                    editable
                    maxLength={400}
                    numberOfLines={4}
                    onChangeText={(val)=>textInputChange(val)}
                    keyboardType="default"
                />
                <TouchableOpacity 
                style={{width: 100,marginTop:20, marginBottom: 50, marginLeft: "60%", backgroundColor:'#F86D70', borderRadius: 10, padding: 5, alignContent:'center', alignItems: 'center' }}
                onPress={()=> submit()}    
            >
                <Text style={{ fontSize: 20}}
                >إرسال</Text>
                    
            </TouchableOpacity>
        </ScrollView>
        </ImageBackground>
    )
    
}

const styles = StyleSheet.create({
    all: {
        paddingTop: 25,
        paddingRight: 5,
        backgroundColor: 'rgba(223, 228, 234, 0.75)',
    },
    image_b: {
        flex: 1,
        justifyContent: "center"
    },
    demande: {
        fontSize:24,
    },
    
    textInput: {
        marginTop: 40,
        marginRight: 35,
        marginBottom: 10,
        padding: 5,
        fontSize:20,
        color: '#05375a',
        alignSelf: 'flex-end',
        borderWidth:1,
        borderRadius:5,
        width:270,
    },
    img: {
        alignSelf: 'center',
        width: 142,
        height: 142,

    },
    
})
