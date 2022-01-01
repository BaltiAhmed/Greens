import React, { useState, useContext, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, View, Image, TextInput, TouchableOpacity, ImageBackground, Dimensions, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Authcontext } from '../Context/Authcontext';
function ProfileScreen () {
    
    const auth = useContext(Authcontext);

    const [user, setUser] = useState(auth.user);
    
    const [email, setEmail] = useState(auth.user.email);
    const [nom, setNom] = useState(auth.user.nom);
    const [prenom, setPrenom] = useState(auth.user.prenom);
    const [datenaissa, setDatenaissa] = useState(auth.user.datenaissa);
    const [password, setPassword] = useState(null);
    const [telephone, setTelephone] = useState(auth.user.telephone);
    const [adresse, setAdresse] = useState(auth.user.adresse);
    // const [date, setDate] = useState();

    // useEffect(() => {
    //     console.log(auth);
    //   }, []);
    const submit = async () => {
        
        console.log('updating  ::');
        let response = await fetch(
            `${path}/api/agriculteur/updateProfile`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        
                        nom: nom,
                        prenom: prenom,
                        email:email,
                        password:password,
                        datenaissa:datenaissa,
                        telephone:telephone,
                        adresse:adresse,
                        id:auth.user._id
                        
                    }),
                }
            );
        let responsedata = await response.json();   
        if (responsedata) {
            // console.log(responsedata.agriculteur);
            Alert.alert(
                'Message',
                'Profile updated succesfully ',
                [{ text: 'fermer' }]
            );
            setUser(responsedata.agriculteur);
            auth.login(responsedata.agriculteur, responsedata.token);
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
        <ScrollView style={{flex:1, backgroundColor: 'rgba(223, 228, 234,0.7)'}}>
            <View style={{flexDirection: 'row', marginTop:"5%", justifyContent: 'space-evenly'}}>
                <TouchableOpacity
                    style={{ height: "35%", marginTop: "18%" , backgroundColor: 'rgba(223, 228, 234, 0.6)', borderRadius: 10, borderColor: '#be0000', paddingTop: "2.5%"}}
                    onPress={()=> auth.logout()}
                >
                    <View style={{ alignSelf: 'center',flexDirection: 'row'}}>
                        <AntDesign
                            name="logout"
                            size={30}
                            color={'#be0000'}
                        />
                        <Text style={{fontSize: 18, marginTop: "1%", marginLeft:"4%", color: '#be0000'}}>LOGOUT</Text>
                    </View>
                </TouchableOpacity>
                <Image
                    style={styles.img}
                    source={require('../assets/default_avatar.png')}
                />
            </View>
            <View style={styles.input_view}>
                <Text style={styles.label}>الإسم :</Text>
                <TextInput
                    placeholder={user.nom}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>setNom(val)}
                    keyboardType="default"
                />

                <Text style={styles.label}>اللقب :</Text>
                <TextInput
                    placeholder={user.prenom}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>setPrenom(val)}
                    keyboardType="default"
                />

                <Text style={styles.label}>تاريخ الميلاد  :</Text>
                <TextInput
                    placeholder={user.datenaissa}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>setDatenaissa(val)}
                    keyboardType="default"
                />

                <Text style={styles.label}>العنوان :</Text>
                <TextInput
                    placeholder={user.adresse}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>setAdresse(val)}
                    keyboardType="default"
                />

                <Text style={styles.label}>البريد الإلكتروني :</Text>
                <TextInput
                    placeholder={user.email}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>setEmail(val)}
                    keyboardType="default"
                />

                <Text style={styles.label}>رقم الهاتف :</Text>
                <TextInput
                    placeholder={user.telephone}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>setTelephone(val)}
                    keyboardType="default"
                />

                <Text style={styles.label}>كلمة السر :</Text>
                <TextInput
                    placeholder="اكتب كلمة السر هنا"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>setPassword(val)}
                    // keyboardType="visible-password"
                    secureTextEntry
                />
                <TouchableOpacity 
                    style={{width: 100,marginTop:30, marginBottom: 50, marginLeft: "60%", backgroundColor:'#00BFA6', borderRadius: 10, padding: 5, alignContent:'center', alignItems: 'center' }}
                    onPress={()=> submit()}    
                >
                    <Text style={{ fontSize: 20}}
                    >تحديث</Text>
                        
                </TouchableOpacity>
            </View>
        </ScrollView>
        </ImageBackground>
    )
    
}

export default ProfileScreen;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    img: {
        // alignSelf: 'center',
        width: windowWidth * 0.2,
        height: windowHeight * 0.2,

    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    input_view: {
        marginHorizontal: 40,
        marginBottom: 30,
    },
    label: {
        marginLeft: 15,
        marginTop: 10,
        fontSize: 20,

    },
    textInput: {
       paddingVertical: 5,
        marginTop: 8,
        paddingLeft: 10,
        color: '#05375a',
        borderWidth:1,
        borderRadius:5,
        fontSize: 17,
        
    },
})
