import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, TextInput, Alert, ScrollView,ImageBackground } from 'react-native'
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function reclam() {

    const [reclam, setReclam] = useState({});
    const [detail, setDetail] = useState(null);
    const [change, setChange] = useState(1);
    const [data, setData] = useState({
        Idreclam: '',
        reponse: ''
    });
    
    useEffect( async () => {
        console.log("useeffect");
        
        fresh();
    }, []);

    const details = (data) => {
        setDetail(data);
        console.log(detail);
    }
    
    const textInputChange = (val) =>{
        setData({
            ...data,
            reponse:val
        });
        // console.log(data.reponse);
        // console.log(detail._id);
    }

    const submit = async () => {
        console.log("in fn");
        let response = await fetch(
            `${path}/api/reclamation/updateclamation`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reponse: data.reponse,
                    //   IdAgriculteur:auth.userId
                    Idreclam:detail._id,
                    
                }),
            }
            );
            console.log("fetch sent");
            // console.log(response);
            if (!response.data) {
                // let responsedata = await response.json();
                // Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);

                // console.log(response);
                let responsedata = await response.json();
                console.log(responsedata);
                Alert.alert(
                    "Message",
                    "votre reponse est enregistrer.",
                    [{ text: "fermer" }]
                    );
                    // throw new Error(responsedata.message);
                    
                    fresh();
                    console.log("second fn");

                
            } else {
                Alert.alert(
                "Message",
                "something went wrong!",
                [{ text: "fermer" }]
                );
            }
    };

    const fresh = async () => {
        let response = await axios.get(
            `${path}/api/reclamation/`,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            );
            
            
        if (response) {
            setReclam(response.data.reclamation);
            // console.log(reclam);
            setChange(2)
        } else {
            Alert.alert(
                'Message',
                'respose failed',
                [{ text: 'fermer' }]
            );
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/cover.jpg')} resizeMode="cover" style={styles.image}>
        { detail == null ?(
            <View style={{flex: 1, backgroundColor: 'rgba(223, 228, 234, 0.4)'}}>
                <Text style={{ fontSize: 28, marginTop: 30, color: '#0C9191',fontWeight: 'bold', alignSelf: 'center'}}>Reclammations </Text>
                <View style={{marginTop:20}}>
                    {Object.keys(reclam) == 0 ?(
                        <Text style={{fontSize: 35, alignSelf: 'center', marginTop: 100, color: '#707070'}}>لا يوجد شكاوي </Text>
                    ):

                    
                        <FlatList style={{marginBottom: "18%"}}
                            data={reclam}
                            keyExtractor={item => item._id.toString()}

                            renderItem={({item}) =>
                                <TouchableOpacity
                                    onPress={() =>details(item)}
                                >
                                    <View style={styles.liste}>
                                        <View style={{width: "20%"}}>
                                            {item.reponse !== "empty" ?(
                                                <View style={{padding:5}}>
                                                    <AntDesign name="checkcircleo" color='green' size={26} />
                                                </View>
                                            ):
                                                <Text style={{color: 'red'}}>لا يوجد إجابة بعد</Text>
                                            }
                                        </View>
                                        <View style={{width: "10%"}}></View>
                                        <View style={{width: "70%"}}> 
                                            <Text style={{ fontSize: 20}}>{item.sujet}</Text>
                                        </View>         
                                    </View>     
                                </TouchableOpacity>    
                            }
                        />
                    }
                    </View>
            </View>
            ):
            
            <ScrollView style={{flex: 1, backgroundColor: 'rgba(223, 228, 234,0.6)', paddingTop: 20}}>
                <TouchableOpacity style={{paddingLeft: 5, width: 70, margin: 18}} 
                    onPress={() => setDetail(null)}
                >
                <Ionicons name="arrow-back" color='#3e2465' size={35}/>
                </TouchableOpacity>
                <Text style={{fontSize: 25, alignSelf: 'center', color: '#0C9191', height: 40 }}>{detail.sujet}</Text>
                <Text style={{margin: 20, fontSize: 15}}>{detail.date}</Text>
                <View style={{width: "90%", alignSelf: 'center'}}>
                {/* {detail.reponse === "empty" ?(
                    <Text style={{fontSize: 35, alignSelf: 'center', marginTop: 100, color: '#707070'}}>لا يوجد إجابة بعد </Text>
                ):
                    <Text style={{ fontSize:18, }}>{detail.reponse}</Text>
                } */}
                {detail.reponse === "empty"?(
                    <TextInput
                    placeholder="Repondre a la reclamation"
                    style={styles.textInput}
                    autoCapitalize="none"
                    multiline
                    editable
                    maxLength={400}
                    numberOfLines={6}
                    onChangeText={(val)=>textInputChange(val)}
                    keyboardType="default"
                />
                 ):
                    <TextInput
                        placeholder={detail.reponse}
                        // value={detail.reponse}
                        style={styles.textInput}
                        autoCapitalize="none"
                        multiline
                        maxLength={600}
                        numberOfLines={8}
                        onChangeText={(val)=>textInputChange(val)}
                        keyboardType="default"
                    />
                }

                <TouchableOpacity 
                    style={{width: 100,marginTop:20, marginBottom: 50, marginLeft: "10%", backgroundColor:'#059E9E', borderRadius: 10, padding: 5, alignContent:'center', alignItems: 'center' }}
                    onPress={()=> submit()}    
                >
                {/* <TouchableOpacity 
                    style={{width: 100,marginTop:20, marginBottom: 50, marginLeft: "60%", backgroundColor:'#059E9E', borderRadius: 10, padding: 5, alignContent:'center', alignItems: 'center' }}
                    // onPress={()=> submit()}    
                > */}
                    <Text style={{ fontSize: 20}}
                    >repondre</Text>
                        
                </TouchableOpacity>
            </View>
            
            </ScrollView>
        }
        </ImageBackground>  
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    liste: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        flexDirection:'row',
        backgroundColor: '#bfcece',
        width: "90%",
        
    },
    textInput: {
        // marginTop: 40,
        // marginRight: 35,
        // marginBottom: 10,
        padding: 5,
        fontSize:20,
        color: '#05375a',
        alignSelf: 'flex-end',
        borderWidth:1,
        borderRadius:5,
        width: "100%",
        backgroundColor: 'white',
    },
    
})
