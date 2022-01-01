import React, { useState, useEffect, useContext } from 'react'
import { Text, StyleSheet, View, FlatList, ScrollView, Alert, Image, TouchableOpacity,SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Authcontext } from '../Context/Authcontext';

function Diagnostic () {

    const auth = useContext(Authcontext);

    const [reclam, setReclam] = useState({});
    const [detail, setDetail] = useState(null);
    const [rapports, setRapports] = useState({});
    const [change, setChange] = useState(1);
    const [dt, setDt] = useState(null);
    
    const fetch_rapp = async () => {
        
        console.log('rapport  ::');
        let response = await fetch(
            `${path}/api/demande/getDemandeById`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        
                        id: auth.user._id,
                        
                    }),
                }
            );
        let responsedata = await response.json();   
        if (responsedata) {
            setRapports(responsedata.demande);
            console.log("data here :"+responsedata.demande);
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
        fetch_rapp();
    }, []);

    const Reclamations = async () => {
        console.log("starts");
        let response = await fetch(
        `${path}/api/reclamation/getreclamationById`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    
                    id: auth.user._id,
                    
                }),
            }
            );
            // console.log(response);
            // setReclam(response.data);
            
            let responsedata = await response.json();
        if (responsedata) {
            setReclam(responsedata.reclamation);
            // console.log(auth.user._id);
            // console.log(responsedata.reclamation);
            setChange(2);
            // console.log('reclam ::');
            // console.log(reclam);

        } else {
            Alert.alert(
                'Message',
                'respose failed',
                [{ text: 'fermer' }]
            );
        }
    }

    const details = (data) => {
        setDetail(data);
    }
    
    const rap = () => {
        fetch_rapp();
        setChange(1)
    }
    
    return (
        <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/cover.jpg')} resizeMode="cover" style={styles.image_b}>
        { detail == null ?(
            <View style={{ flex:1, backgroundColor: 'rgba(223, 228, 234, 0.4)'}}>
            <View style={{flexDirection: 'row', justifyContent: "space-evenly", marginTop: 30, width:"100%"}}>
                <TouchableOpacity 
                    style={{ backgroundColor:change == 1 ? '#fff':'#8bcbc4', borderWidth: 1, borderColor: '#8bcbc4',borderRadius: 5, padding: 10, alignSelf: 'flex-start' }}
                    onPress={()=> rap() }    
                >
                    <Text style={{ fontSize: 20}}>التشخيصات المرسلة</Text>
                    
                        
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ backgroundColor:change == 2 ?'#fff':'#8bcbc4',borderWidth: 1, borderColor: '#8bcbc4', borderRadius: 5, padding: 10, alignSelf: 'flex-end'  }}
                    onPress={() => Reclamations()   }    
                >
                    <Text style={{ fontSize: 20}}>الشكاوي المرسلة </Text>
                    
                        
                </TouchableOpacity>
            </View>

            {change === 2 ?(
/////////////////////flatlist:::::reclamtion/////////////////////////////////////////////////////////////////////////
                <View style={{marginTop:20}}>
                {Object.keys(reclam) == 0 ?(
                    <Text style={{fontSize: 35, alignSelf: 'center', marginTop: 100, color: '#707070'}}>لا يوجد شكاوي </Text>
                ):

                   
                    <FlatList style={{marginBottom: "23%"}}
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
            ):
/////////////////////flatlist:::::rapport/////////////////////////////////////////////////////////////////////////

            <View>
                
                {Object.keys(rapports) == 0 ?(
                    <Text style={{fontSize: 35, alignSelf: 'center', marginTop: 100, color: '#707070'}}>لا يوجد تشخيصات </Text>
                ):
                <FlatList style={{marginBottom: "23%"}}
                    data={rapports}
                    keyExtractor={item => item._id.toString()}

                    renderItem={({item}) =>
                        <TouchableOpacity
                            onPress={() =>setDetail(item)}
                        >
                            <View style={styles.liste}>
                                <View style={{width: "20%"}}>
                                    {item.finished !==  false ?(
                                        <View style={{padding:5}}>
                                            <AntDesign name="checkcircleo" color='green' size={26} />
                                        </View>
                                    ):
                                        <Text style={{color: 'red'}}>لا يوجد تقرير بعد</Text>
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
                }
            </View>
            }

        </View> 
        ):
            <View style={styles.container}>
            {change === 2 ?(
                 // detail de reclamation :: ///////////////////////////// */}
                
                <ScrollView style={{ flex: 1}} >
                    <TouchableOpacity style={{paddingLeft: 5, width: 70, margin: 18, marginTop: "8%"}} 
                        onPress={() => setDetail(null)}
                    >
                        <Ionicons name="arrow-back" color='#3e2465' size={35}/>
                    </TouchableOpacity>
                    
                        <View style={{marginHorizontal: "8%",justifyContent: 'flex-end', alignSelf: 'center', borderWidth: 1, width: "96%", borderRadius: 10,backgroundColor: 'rgba(223, 228, 234,0.7)', paddingHorizontal: "2%", paddingBottom: "10%", paddingTop: "7%", marginBottom: "10%" }}>
                            <Text style={{fontSize: 25, alignSelf: 'center', color: '#090050', height: 40 }}>{detail.sujet}</Text>
                            <Text style={{margin: 20, fontSize: 15}}>{detail.date}</Text>
                            <View style={{width: "90%", alignSelf: 'center'}}>
                            {detail.reponse === "empty" ?(
                                <Text style={{fontSize: 35, alignSelf: 'center', marginTop: "20%", color: '#707070', marginBottom: 50}}>لا يوجد إجابة بعد </Text>
                            ):
                                <Text style={{ fontSize:18, }}>{detail.reponse}</Text>
                            }
                            </View>
                        
                    </View>
                </ScrollView>
            ):
                <View>
                {detail.finished === true ?(
                // le rapport d'ingenieur :://////////////////////////////////////////////
                    <ScrollView >
                        <TouchableOpacity style={{paddingLeft: 5, width: 70, margin: 18, marginTop: "8%"}} 
                            onPress={() => setDetail(null)}
                        >
                            <Ionicons name="arrow-back" color='#3e2465' size={35}/>
                        </TouchableOpacity>
                        <View style={{marginHorizontal: "8%",justifyContent: 'flex-end', alignSelf: 'center', marginTop: "5%", borderWidth: 1, width: "96%", borderRadius: 10,backgroundColor: 'rgba(223, 228, 234,0.7)', paddingHorizontal: "2%", marginBottom: "8%"  }}>
                            <Text style={{fontSize: 25, alignSelf: 'center', color: '#3e2465', height: 40, marginVertical: 15 }}>التقرير : {detail.nom_maladie}</Text>
                            
                            <Image
                                style={styles.img_d}
                                source={{ uri: `${path}/${detail.image}` }}
                            />

                        
                            <Text style={{fontSize: 20, color: '#3e2465', marginRight: "3%"  }}>تعريف المرض :</Text>
                            <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.detail_maladie}</Text>
                            <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>السبب :</Text>
                            <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.cause}</Text>
                            <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>الأدوية :</Text>
                            <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.med1}</Text>
                            <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>الثمن  :</Text>
                            <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10, alignSelf: 'flex-end' }}>{detail.prix1} Dt</Text>
                            {detail.med2 !== '' ?(
                                <View>
                                    <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>الدواء الثاني :</Text>
                                    <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.med2}</Text>
                                    <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>الثمن  :</Text>
                                    <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10, alignSelf: 'flex-end' }}>{detail.prix2} Dt</Text>
                                </View>
                            ):
                            <View></View>
                            }
                            {detail.med3 !== '' ?(
                                <View>
                                    <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>الدواء الثالث :</Text>
                                    <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10 }}>{detail.med3}</Text>
                                    <Text style={{fontSize: 20, color: '#3e2465', marginLeft: "3%"  }}>الثمن  :</Text>
                                    <Text style={{fontSize: 20, marginRight: "8%", marginVertical: 10, alignSelf: 'flex-end' }}>{detail.prix3} Dt</Text>
                                </View>
                            ):
                            <View></View>
                            }
                        </View>
                    </ScrollView>

                ):
                    //  demande envoyer par l'agriculteur :: //////////////////////////////////
                    <ScrollView  >
                        <TouchableOpacity style={{paddingLeft: 5, width: 70, margin: 18, marginTop: "8%"}} 
                            onPress={() => setDetail(null)}
                        >
                            <Ionicons name="arrow-back" color='#3e2465' size={35}/>
                        </TouchableOpacity>
                        <View style={{marginHorizontal: "8%",justifyContent: 'flex-end', alignSelf: 'center', marginTop: "5%", borderWidth: 1, width: "96%", borderRadius: 10,backgroundColor: 'rgba(223, 228, 234,0.7)', paddingHorizontal: "2%", paddingBottom: "5%", marginBottom: "5%" }}>
                            
                            <Text style={{fontSize: 25, alignSelf: 'center', color: '#013220', height: 40, marginVertical: 15 }}>{detail.type}</Text>
                            { detail.image?(
                                <Image
                                    style={styles.img_d}
                                    source={{ uri: `${path}/${detail.image}` }}
                                />
                            ):
                                <View></View>
                            }
                        
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
                        </View>
                    </ScrollView>
                }
                </View>
            } 
            </View>
        }  
        </ImageBackground>
        </SafeAreaView>
    )

}
export default Diagnostic;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    liste: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        flexDirection:'row',
        backgroundColor: '#bfcece',
        width: "90%"
        
    },
    image_b: {
        flex: 1,
        justifyContent: "center"
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
