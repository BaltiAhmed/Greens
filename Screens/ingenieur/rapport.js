import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, SafeAreaView, ScrollView, Dimensions, TextInput, ImageBackground, Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Authcontext } from '../../Context/Authcontext';

export default function rapport() {

    const [detail, setDetail] = useState(null);
    const [rapports, setRapports] = useState({});
    const [reply, setReply] = useState(null);
    const [med, setMed] = useState(1);
    const [data, setData] = useState({
        nom_maladie: '',
        detail_maladie: '',
        cause: '',
        med1: '',
        prix1: '',
        med2: '',
        prix2: '',
        med3: '',
        prix3: '',
    });

    const fresh = async () => {
        let response = await axios.get(
            `${path}/api/demande/`,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            );
            setMed(1);
            setDetail(null);
            setData({
                nom_maladie: '',
                detail_maladie: '',
                cause: '',
                med1: '',
                prix1: '',
                med2: '',
                prix2: '',
                med3: '',
                prix3: '',
            })
            
        if (response) {
            setRapports(response.data.demande);
            console.log(response.data.demande);
        } else {
            Alert.alert(
                'Message',
                'respose failed',
                [{ text: 'fermer' }]
            );
        }
    }

    useEffect( async () => {
        console.log("useffect");
        fresh();
    }, []);

    const details = (data) => {
        setReply(null);
        setDetail(data);
        
        console.log(detail);
    }

    const check = () => {
        // console.log(med);
        if (med === 3) {
            setMed(1);
        }
    }

    const add = () => {
        setMed( med +1);
        // console.log(data.nom_maladie);
        check();
    }

    const submit = async () => {
        console.log("in fn");
        let response = await fetch(
            `${path}/api/demande/updateDemande`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nom_maladie: data.nom_maladie,
                    detail_maladie: data.detail_maladie,
                    cause: data.cause,
                    med1: data.med1,
                    prix1: data.prix1,
                    med2: data.med2,
                    prix2: data.prix2,
                    med3: data.med3,
                    prix3: data.prix3,
                    //   IdAgriculteur:auth.userId
                    id_demande:reply._id,
                }),
            }
            );
            console.log("fetch sent");
            // console.log(response);
            if (response) {
                // let responsedata = await response.json();
                // Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);

                // console.log(response);
                fresh();
                setReply(null);
                // console.log(response);
                // let responsedata = await response.json();
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
    
    return (
        <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../assets/cover.jpg')} resizeMode="cover" style={styles.image}>
    
        { detail == null ?(
            <View style={{flex: 1, backgroundColor: 'rgba(223, 228, 234,0.3)'}}>
                <Text style={{ fontSize: 28, marginTop: 30, color: '#0C9191',fontWeight: 'bold', alignSelf: 'center'}}>Demande de Diagnostics </Text>
                <View style={{marginTop:20}}>
                    {/* {Object.keys(rapports) == 0 ?(
                        <Text style={{fontSize: 35, alignSelf: 'center', marginTop: 100, color: '#707070'}}>لا يوجد تشخيصات </Text>
                    ): */}

                    
                        <FlatList style={{marginBottom: "18%"}}
                            data={rapports}
                            keyExtractor={item => item._id.toString()}

                            renderItem={({item}) =>
                                <TouchableOpacity
                                    onPress={() =>details(item)}
                                >
                                    <View style={styles.liste}>
                                        <View style={{width: "20%"}}>
                                            {item.finished !==  false ?(
                                                <View style={{padding:5}}>
                                                    <AntDesign name="checkcircleo" color='green' size={26} />
                                                </View>
                                            ):
                                                <Text style={{color: 'red'}}>لا يوجد تقرير  بعد</Text>
                                            }
                                        </View>
                                        <View style={{width: "10%"}}></View>
                                        <View style={{width: "70%", flexDirection: 'row', justifyContent: 'flex-end' }}> 
                                            
                                            
                                            <Text style={{ fontSize: 20, height: 30, alignSelf: 'center' }}>{item.type}</Text>
                                            <Image
                                                style={styles.img}
                                                source={{ uri: `${path}/${item.image}` }}
                                            />
                                        </View>         
                                    </View>     
                                </TouchableOpacity>    
                            }
                        />
                    {/* } */}
                    </View>
            </View>

        ):
        <ScrollView style={{ backgroundColor: 'rgba(223, 228, 234,0.6)'}}>
            <TouchableOpacity style={{paddingLeft: 5, width: 70, marginTop: "10%", marginLeft: "5%"}} 
                    onPress={() => setDetail(null)}
                >
                <Ionicons name="arrow-back" color='#3e2465' size={35}/>
            </TouchableOpacity>
            { reply == null ?(
                <View>
            <View style={{marginHorizontal: "8%",justifyContent: 'flex-end', alignSelf: 'center', marginTop: "5%", borderWidth: 1, width: "96%", borderRadius: 10,backgroundColor: 'rgba(223, 228, 234,0.7)', paddingHorizontal: "2%" }}>
            <Text style={{fontSize: 25, alignSelf: 'center', color: '#013220', height: 40, marginVertical: 15 }}>{detail.type}</Text>
            { detail.image?(
                <Image
                    style={styles.img_d}
                    source={{ uri: `${path}/${detail.image}` }}
                />
            ):
                <View></View>
            }
            
                {/* <View style={{ justifyContent: 'flex-end'}}> */}
                { detail.type === "القمح"?(
                    <View>
                        <Text style={{fontSize: 20, color: '#3e2465' }}> لون الورقة أو السنبلة :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.couleur}</Text>
                        <Text style={{fontSize: 20, color: '#3e2465' }}>هل لاحظت أن كامل الورقة أو السنبلة مغطاة :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.feuille}</Text>
                        <Text style={{fontSize: 20, color: '#3e2465',  }}>هل لاحظت أن كامل الورقة أو السنبلة فارغة تماما :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.couvert}</Text>
                        <Text style={{fontSize: 20, color: '#3e2465',  }}>هل لاحظت أن المرض على الورقة أو   على السنبلة :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.maladie}</Text>
                    </View>
                ): detail.type === "الشعير" || detail.type === "القصيبة" ?(
                    <View>
                        <Text style={{fontSize: 20, color: '#3e2465',  }}> لون الورقة أو السنبلة :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.couleur}</Text>
                        <Text style={{fontSize: 20, color: '#3e2465' }}>هل لاحظت أن كامل الورقة أو السنبلة مغطاة :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.feuille}</Text>
                        <Text style={{fontSize: 20, color: '#3e2465',  }}>هل لاحظت أن السنبلة بها حبوب :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.blee}</Text>
                    </View>
                ):
                    <View>
                        <Text style={{fontSize: 20, color: '#3e2465',  }}> لون الورقة أو السنبلة :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.couleur}</Text>
                        <Text style={{fontSize: 20, color: '#3e2465',  }}> الأعراض على الورقة :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.sympthome}</Text>
                    </View>
                }
                {/* </View> */}

            </View>
            
            <TouchableOpacity 
                style={{width: "40%",marginTop:20, marginBottom: 50, marginLeft: "10%", backgroundColor:'#059E9E', borderRadius: 10, padding: 5, alignContent:'center', alignItems: 'center' }}
                onPress={()=> setReply(detail)}    
            >
                {detail.finished === false ?(
                    <Text style={{ fontSize: 20}}>Donner Rpport</Text>
                ):
                    <Text style={{ fontSize: 20}}>Voire Rpport</Text>
                }
            </TouchableOpacity>
            </View>
            ):
            <View style={styles.container}>
                {detail.finished === false ?(

                    // ajout de rapport :: //////////////////////////////////////////////////
                    <View style={styles.container}>
                        <Text style={{ fontSize: 20}}>Voire Rpport</Text>
                        <View style={{marginHorizontal: "8%",justifyContent: 'flex-end', alignSelf: 'center', marginTop: "5%", borderWidth: 1, width: "96%", borderRadius: 10,backgroundColor: 'rgba(223, 228, 234,0.7)', paddingHorizontal: "2%", paddingVertical: "10%" }}>
                            <Text style={styles.label}> التقرير :</Text>
                            <TextInput
                                placeholder="سبب  المرض"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val)=>  setData({
                                    ...data,
                                    nom_maladie:val
                                })}
                                keyboardType="default"
                            />

                            <Text style={styles.label}>تعريف المرض :</Text>
                            <TextInput
                                placeholder="تعريف المرض"
                                style={styles.textInput}
                                autoCapitalize="none"
                                multiline
                                maxLength={600}
                                numberOfLines={8}
                                onChangeText={(val)=>  setData({
                                    ...data,
                                    detail_maladie:val
                                })}
                                keyboardType="default"
                            />

                            <Text style={styles.label}>السبب :</Text>
                            <TextInput
                                placeholder="السبب"
                                style={styles.textInput}
                                autoCapitalize="none"
                                multiline
                                maxLength={600}
                                numberOfLines={4}
                                onChangeText={(val)=>  setData({
                                    ...data,
                                    cause:val
                                })}
                                keyboardType="default"
                            />
                            <View style={{flexDirection: 'row', width: "100%"}}>
                                <View style={{width: "30%"}} >
                                    <TouchableOpacity 
                                        style={{marginTop:"80%", marginLeft: "20%"}}
                                        onPress={() => add()}
                                    >
                                        <AntDesign name="pluscircleo" color='#3e2465' size={45}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width: "70%"}} >
                                    <Text style={styles.label}>الأدوية :</Text>
                                    <TextInput
                                        placeholder="الأدوية"
                                        style={[styles.textInput,{width: "100%"}]}
                                        autoCapitalize="none"
                                        onChangeText={(val)=>  setData({
                                            ...data,
                                            med1:val
                                        })}
                                        keyboardType="default"
                                    />
                            
                                    <Text style={styles.label}>الثمن :</Text>
                                    <TextInput
                                        placeholder="الثمن"
                                        style={[styles.textInput,{width: "57%", alignSelf: 'flex-end'} ]}
                                        autoCapitalize="none"
                                        onChangeText={(val)=>  setData({
                                            ...data,
                                            prix1:val
                                        })}
                                        keyboardType="number-pad"
                                    />
                                </View>
                                
                            </View>
                            {med == 2  ?(
                                <View>
                                    <Text style={styles.label}>الدواء الثاني :</Text>
                                    <TextInput
                                        placeholder="الأدوية"
                                        style={[styles.textInput,{width: "70%", alignSelf: 'flex-end'}]}
                                        autoCapitalize="none"
                                        onChangeText={(val)=>  setData({
                                            ...data,
                                            med2:val
                                        })}
                                        keyboardType="default"
                                    />

                                    <Text style={styles.label}>الثمن  :</Text>
                                    <TextInput
                                        placeholder="الثمن"
                                        style={[styles.textInput,{width: "40%", alignSelf: 'flex-end'} ]}
                                        autoCapitalize="none"
                                        onChangeText={(val)=>  setData({
                                            ...data,
                                            prix2:val
                                        })}
                                        keyboardType="numeric"
                                    />    
                                </View> 
                            ): med === 3 ?(
                            <View>
                                <Text style={styles.label}>الدواء الثاني :</Text>
                                    <TextInput
                                        placeholder="الأدوية"
                                        style={[styles.textInput,{width: "70%",alignSelf: 'flex-end'}]}
                                        autoCapitalize="none"
                                        onChangeText={(val)=>  setData({
                                            ...data,
                                            med2:val
                                        })}
                                        keyboardType="default"
                                    />

                                    <Text style={styles.label}>الثمن  :</Text>
                                    <TextInput
                                        placeholder="الثمن"
                                        style={[styles.textInput,{width: "40%", alignSelf: 'flex-end'} ]}
                                        autoCapitalize="none"
                                        onChangeText={(val)=>  setData({
                                            ...data,
                                            prix2:val
                                        })}
                                        keyboardType="numeric"
                                    />    

                                <Text style={styles.label}>الدواء الثالث :</Text>
                                <TextInput
                                    placeholder="الأدوية"
                                    style={[styles.textInput,{width: "70%", alignSelf: 'flex-end'}]}
                                    autoCapitalize="none"
                                    onChangeText={(val)=>  setData({
                                        ...data,
                                        med3:val
                                    })}
                                    keyboardType="default"
                                />

                                <Text style={styles.label}>الثمن  :</Text>
                                <TextInput
                                    placeholder="الثمن"
                                    style={[styles.textInput,{width: "40%", alignSelf: 'flex-end'} ]}
                                    autoCapitalize="none"
                                    onChangeText={(val)=>  setData({
                                        ...data,
                                        prix3:val
                                    })}
                                    keyboardType="numeric"
                                />    
                            </View> 
                            ):
                                <View></View>
                            }
                            <TouchableOpacity 
                                style={{width: "40%",marginTop:25, marginRight: "7%", backgroundColor:'#059E9E', borderRadius: 10, padding: 5, alignContent:'center', alignItems: 'center', alignSelf: 'flex-end' }}
                                onPress={()=> submit()}    
                            >

                                <Text style={{ fontSize: 20}}>Rapporter</Text>
                            </TouchableOpacity>
                            <View style={{height: "2%"}}></View>
                        </View>
                    </View>
                ):
                // detail rapport existant :: ////////////////////////////
                    <View style={styles.container}>
                        <View style={{marginHorizontal: "8%",justifyContent: 'flex-end', alignSelf: 'center', marginTop: "5%", borderWidth: 1, width: "96%", borderRadius: 10,backgroundColor: 'rgba(223, 228, 234,0.7)', paddingHorizontal: "2%" }}>
                            <Text style={{fontSize: 25, alignSelf: 'center', color: '#3e2465', height: 40, marginVertical: 15 }}>التقرير : {reply.nom_maladie}</Text>
                            
                            <Image
                                style={styles.img_d}
                                source={{ uri: `${path}/${reply.image}` }}
                            />

                        
                        <Text style={{fontSize: 20, color: '#3e2465', marginRight: "3%"  }}>تعريف المرض :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{reply.detail_maladie}</Text>
                        <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>السبب :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{reply.cause}</Text>
                        <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>الأدوية :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{reply.med1}</Text>
                        <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>الثمن  :</Text>
                        <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10, alignSelf: 'flex-end' }}>{reply.prix1} Dt</Text>
                        {reply.med2 !== '' ?(
                            <View>
                                <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>الدواء الثاني :</Text>
                                <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{reply.med2}</Text>
                                <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>الثمن  :</Text>
                                <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10, alignSelf: 'flex-end' }}>{reply.prix2} Dt</Text>
                            </View>
                        ):
                        <View></View>
                        }
                        {reply.med3 !== '' ?(
                            <View>
                                <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>الدواء الثالث :</Text>
                                <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{reply.med3}</Text>
                                <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>الثمن  :</Text>
                                <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10, alignSelf: 'flex-end' }}>{reply.prix3} Dt</Text>
                            </View>
                        ):
                        <View></View>
                        }
                        </View>
                    </View>
                }
                    <TouchableOpacity 
                        style={{width: "40%",marginTop:50, marginBottom: 50, marginLeft: "10%", backgroundColor:'#059E9E', borderRadius: 10, padding: 5, alignContent:'center', alignItems: 'center' }}
                        onPress={()=> setReply(null)}    
                    >
                        <Text style={{ fontSize: 20}}>Voire Q/A</Text>
                        
                    </TouchableOpacity>
                </View>
            }
        </ScrollView>
        }
        
        </ImageBackground>
        </SafeAreaView>

    )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
    label: {
        marginLeft: 15,
        marginTop: 10,
        fontSize: 20,

    },
    textInput: {
       padding: 5,
    
        marginTop: 8,
        paddingLeft: 10,
        color: '#05375a',
        borderWidth:1,
        borderRadius:5,
        fontSize: 17,
        
    },
    img: {
        alignSelf: 'flex-end',
        width: windowWidth* 0.13,
        height: windowWidth* 0.13,
        borderRadius: 5,
        marginLeft: 13,

    },
    img_d: {
        alignSelf: 'center',
        width: windowWidth * 0.8,
        height: windowHeight * 0.4,
        borderRadius: 5,
        marginBottom: 25,
    },
    
})
