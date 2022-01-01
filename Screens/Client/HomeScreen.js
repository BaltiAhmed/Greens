import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, StatusBar, Text, View, TouchableOpacity, Image, ScrollView, Picker, Alert, Button, ImageBackground } from 'react-native'
import moment from 'moment';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import mime from "mime";
import { Authcontext } from '../../Context/Authcontext';



function HomeScreen() {
    
    const auth = useContext(Authcontext);

    const [time, setTime] = useState(moment().format('h:mm a'));
    const [couleur, setCouleur] = useState("أصفر");
    const [feuille, setFeuille] = useState("جزئيا");
    const [maladie, setMaladie] = useState("الورقة كاملة");
    const [couvert, setCouvert] = useState("فارغة تماما");
    const [blee, setBlee] = useState("نعم");
    const [sympthome, setSympthome] = useState("على الأزهار و القورون");
    const [image, setImage] = useState({});
    const [big_container, setBig_contaner] = useState(null);
    const [type, setType] = useState(null);

    

    useEffect(() => {
        setInterval(() => {
            setTime(moment().format('h:mm a'))
        }, 60000)
    }, []);
            
    var date = moment().format('YYYY/MM/DD');

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(
        //   Permissions.CAMERA_ROLL,
          Permissions.CAMERA
        );
        if (result.status !== "granted") {
          Alert.alert(
            "Insufficient permissions!",
            "You need to grant camera permissions to use this app.",
            [{ text: "Okay" }]
          );
          return false;
        }
        return true;
    };

    const takeImage = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
          return;
        }
        const img = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        // console.loge(img);
        if (!img.cancelled) {
            setImage(img);
            // console.log(image);
        }
      };
    
      const takeImageCamera = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
          return;
        }
        let img = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(img);
        if (!img.cancelled) {
            setImage(img);
            console.log(image);
        }
    

    };

    const types = async (data) => {

        // console.log(big_container);
        setBig_contaner(data);
        switch (data) {
            case 1:
                // return("القمح");    
                setType("القمح");    
                break;
            case 2:
                setType("الشعير");    
                // return("الشعير");    
                break;
            case 3:
                setType("الفول");    
                // return("الفول");    
                break;
            case 4:
                setType("القصيبة");    
                // return("القصيبة");    
                break;
                    
            default:
                setType("القمح"); 
                break;
        }
                            
        console.log(type);
    }

    const submit = async () => {
        // console.log(big_container);
        
        // switch (big_container) {
        //     case 1:
        //         setType("القمح");    
        //         break;
        //     case 2:
        //         setType("الشعير");    
        //         break;
        //     case 3:
        //         setType("الفول");    
        //         break;
        //     case 4:
        //         setType("القصيبة");    
        //         break;
                    
        //     default:
        //         setType("القمح"); 
        //         break;
        // }
                            
        // console.log(type);

        // types();
    //   const url = "http://192.168.1.100:5000/api/demande/ajout";
        const url = `${path}/api/demande/ajout`;
        const fileUri = image.uri;
        const newImageUri = "file:///" + fileUri.split("file:/").join("");
        const formData = new FormData();
        formData.append("image", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
        });
        formData.append("type", type);
        formData.append("couleur", couleur);
        formData.append("feuille", feuille);
        formData.append("maladie", maladie);
        formData.append("couvert", couvert);
        formData.append("agriculteurID", auth.user._id);
        // formData.append("agriculteurID", auth.userId);
        const options = {
        method: "POST",
        body: formData,
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
        },
        };
        // console.log(formData);

        let response = await fetch(url, options);

        if (!response.ok) {
        let responsedata = await response.json();
        Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
        throw new Error(responsedata.message);
        }
        Alert.alert("Message", "Votre demande est enregistré", [
        { text: "fermer" },
        ]);
        setBig_contaner(null);
        setType(null);
        setImage({});
    };

    const back = () => {
        setBig_contaner(null);
        setImage({});

    };

    return (
        <View style={styles.container}>
            {/* <StatusBar
                animated={true}
                showHideTransition="slide"
                // hidden={true} 
            /> */}
            <ImageBackground source={require('../../assets/cover.jpg')} resizeMode="cover" style={styles.image_b}>
        { big_container == null ? (
            <View style={[styles.container,{backgroundColor: 'rgba(223, 228, 234, 0.7)'}]}>
            
           
            <ScrollView>
                <View style={styles.title}> 
                    <Text style={styles.titre_t}>Greens</Text>    
                </View>
                <View style={styles.all}> 
                    <View style={[styles.card, {marginRight: 20}]}> 
                        <Fontisto
                            name="date"
                            size={20}
                            color={'#787878'}
                        /> 
                        <Text style={styles.text} > {date} </Text>  
                    </View>
                    <View style={styles.card}>  
                        <MaterialIcons
                            name="access-time"
                            size={20}
                            color={'#787878'}
                        />
                        <Text style={styles.text} > {time} </Text> 
                    </View>

                </View>
                <View style={styles.title}> 
                    <Text style={styles.titre_st}>Type</Text>    
                </View>
                
                <View style={styles.b_card}>
                    <TouchableOpacity style={[styles.card_g, {marginRight: "8%"}]}
                    onPress={() => types(1)}>
                        <Image
                            style={styles.img}
                            source={require('../../assets/grains/grain.png')}
                        />
                        <Text style={styles.txt_c}>القمح</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.card_g]}
                        onPress={() => types(2)}
                    >
                        <Image
                            style={styles.img}
                            source={require('../../assets/grains/chr.png')}
                        />
                        <Text style={styles.txt_c}>الشعير</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.b_card}>
                    <TouchableOpacity style={[styles.card_g, {marginRight: "8%"}]}
                    onPress={() => types(4)}>
                        <Image
                            style={styles.img}
                            source={require('../../assets/grains/gsb.png')}
                        />
                        <Text style={styles.txt_c}>القصيبة </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.card_g]} 
                    onPress={() => types(3)}>
                        <Image
                            style={styles.img}
                            source={require('../../assets/grains/beans.png')}
                        />
                        <Text style={styles.txt_c}>الفول</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
            
        </View>

    ):
        <ScrollView>
            
        <View style={{flex: 1, backgroundColor: 'rgba(223, 228, 234, 0.7)', paddingTop: 15}}>
            <TouchableOpacity style={{paddingLeft: 5, width: 70, marginTop: "8%"}} 
                    onPress={() => back()}
            >
                <Icon name="arrow-back" color='#3e2465' size={35}
                ></Icon>
            </TouchableOpacity>
            {/* <View style={{flexDirection: 'row'}}></View> */}
            <Text style={{alignSelf: 'center', fontSize: 25, marginBottom: 15, color:'#056458'}} >تشخيص النبات </Text>
            
            <Text style={{marginRight: 45, fontSize: 20, marginBottom: 15}} >تحميل الصورة : </Text>
            { Object.keys(image).length == 0 ? (
                <View
                    style={{ flexDirection: "row", justifyContent: "space-evenly"}}
                >
                    <TouchableOpacity
                        onPress={takeImage}
                        style={{borderWidth: 0.5, borderRadius: 15, paddingBottom: 5}}
                    >
                        <Image
                            style={styles.img}
                            source={require('../../assets/gallery.png')}
                        />
                        
                        <Text style={{alignSelf: 'center'}}> الصورة القديمة</Text>
                    </TouchableOpacity>
                    <Text style={{marginTop: "15%", marginRight: 5}} >OR</Text>
                    <TouchableOpacity 
                        onPress={takeImageCamera}
                        style={{borderWidth: 0.5, borderRadius: 15, paddingBottom: 5}}
                    >
                        <Image
                        style={styles.img}
                        source={require('../../assets/camera_phone.png')}
                        />             
                        <Text style={{alignSelf: 'center'}}> الة تصوير</Text>
                    </TouchableOpacity>
                
                
                </View>
            ):
            <View style={{ alignItems: 'center', padding: 0}}>
                <Image source={{ uri: image.uri }} style={styles.image} />
            </View>
            }
        <View style={{ marginRight: 20 }}>
            { big_container == 1 ? (
                <View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, marginTop: 10 }}>
                        ماهو لون الورقة أو السنبلة:
                        </Text>
                        <View style={{  marginLeft: "20%", borderWidth: 1, borderRadius: 15, marginTop: "5%"}}>
                            <Picker
                                selectedValue={couleur}
                                style={{ fontWeight: 'bold'}}
                                onValueChange={(itemValue, itemIndex) => setCouleur(itemValue)}
                            >
                                <Picker.Item label="أصفر" value="أصفر" />
                                <Picker.Item label="أسود" value="أسود" />
                                <Picker.Item label="أبيض" value="أبيض" />
                                <Picker.Item label="رمادي" value="رمادي" />
                            </Picker>
                        </View>
                        
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, marginTop: 10 }}>
                        هل لاحظت أن كامل الورقة أو السنبلة مغطاة:
                        </Text>
                        <View style={{  marginLeft: "20%", borderWidth: 1, borderRadius: 15, marginTop: "5%"}}>
                            <Picker
                            selectedValue={feuille}
                        
                            onValueChange={(itemValue, itemIndex) => setFeuille(itemValue)}
                            >
                            <Picker.Item label="جزئيا" value="جزئيا" />
                            <Picker.Item label=" مغطاة تماما" value=" مغطاة تماما" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, marginTop: 10 }}>
                        هل لاحظت أن كامل الورقة أو السنبلة فارغة تماما:
                        </Text>
                        <View style={{  marginLeft: "20%", borderWidth: 1, borderRadius: 15, marginTop: "5%"}}>
                            <Picker
                            selectedValue={couvert}
                            
                            onValueChange={(itemValue, itemIndex) => setCouvert(itemValue)}
                            >
                            <Picker.Item label="فارغة تماما " value="فارغة تماما " />
                            <Picker.Item label="بقع سوداء" value="بقع سوداء" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, marginTop: 10 }}>
                        هل لاحظت أن المرض على الورقة أو على السنبلة:
                        </Text>
                        <View style={{  marginLeft: "20%", borderWidth: 1, borderRadius: 15, marginTop: "5%"}}>
                            <Picker
                            selectedValue={maladie}
                            
                            onValueChange={(itemValue, itemIndex) => setMaladie(itemValue)}
                            >
                            <Picker.Item label="الورقة كاملة" value="الورقة كاملة" />
                            <Picker.Item label=" أنسجة الساق" value=" أنسجة الساق" />
                            </Picker>
                        </View>
                    </View>
                </View>
            ): big_container == 2 || big_container == 4 ? (
                <View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "10%" }}>
                        ماهو لون الورقة أو السنبلة:
                        </Text>
                        <View style={{  marginLeft: "20%", borderWidth: 1, borderRadius: 15, marginTop: "5%"}}>
                            <Picker
                            selectedValue={couleur}
                            
                            onValueChange={(itemValue, itemIndex) => setCouleur(itemValue)}
                            >
                            <Picker.Item label="أصفر" value="أصفر" />
                            <Picker.Item label="أسود" value="أسود" />
                            <Picker.Item label="أبيض" value="أبيض" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "10%" }}>
                        هل لاحظت أن كامل الورقة أو السنبلة مغطاة:
                        </Text>
                        <View style={{  marginLeft: "20%", borderWidth: 1, borderRadius: 15, marginTop: "5%"}}>
                            <Picker
                            selectedValue={feuille}
                            
                            onValueChange={(itemValue, itemIndex) => setFeuille(itemValue)}
                            >
                            <Picker.Item
                                label="جزئيا + بقع سوداء" value="جزئيا + بقع سوداء"
                            />
                            <Picker.Item label=" مغطاة تماما" value=" مغطاة تماما" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "10%" }}>
                        هل لاحظت أن السنبلة بها حبوب:
                        </Text>
                        <View style={{  marginLeft: "20%", borderWidth: 1, borderRadius: 15, marginTop: "5%"}}>
                            <Picker
                            selectedValue={blee}
                            
                            onValueChange={(itemValue, itemIndex) => setBlee(itemValue)}
                            >
                            <Picker.Item label="نعم" value="نعم" />
                            <Picker.Item label=" لا" value=" لا" />
                            </Picker>
                        </View>
                    </View>
                </View>
            ): 
                <View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "10%" }}>
                        ماهو لون الورقة أو السنبلة:
                        </Text>
                        <View style={{  marginLeft: "20%", borderWidth: 1, borderRadius: 15, marginTop: "5%"}}>
                            <Picker
                            selectedValue={couleur}
                            
                            onValueChange={(itemValue, itemIndex) => setCouleur(itemValue)}
                            >
                            <Picker.Item label="أصفر" value="أصفر" />
                            <Picker.Item label="حمراء" value="حمراء" />
                            <Picker.Item label="بنية" value="بنية" />
                            <Picker.Item label="بيضاء إلي بني" value="بيضاء إلي بني" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "10%" }}>
                        كيف تكون الأعراض على الورقة :
                        </Text>
                        <View style={{  marginLeft: "20%", borderWidth: 1, borderRadius: 15, marginTop: "5%"}}>
                            <Picker
                            selectedValue={sympthome}
                            
                            onValueChange={(itemValue, itemIndex) => setSympthome(itemValue)}
                            >
                            <Picker.Item
                                label="على الأزهار و القورون"
                                value="على الأزهار و القورون"
                            />
                            <Picker.Item
                                label=" على ساق  الورقة "
                                value=" على ساق  الورقة "
                            />
                            <Picker.Item
                                label=" على سطحى الورقة "
                                value=" على سطحى الورقة "
                            />
                            <Picker.Item
                                label="  ذبول شديد للورقة "
                                value="  ذبول شديد للورقة "
                            />
                            </Picker>
                        </View>
                    </View>
                </View>
            }
            
            <TouchableOpacity 
                style={{width: 100,marginTop:20, marginBottom: 50, marginLeft: "60%", backgroundColor:'#00BFA6', borderRadius: 10, padding: 5, alignContent:'center', alignItems: 'center' }}
                onPress={()=> submit()}    
            >
                <Text style={{ fontSize: 20}}
                >إرسال</Text>
                    
            </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    }   
        </ImageBackground>
    </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image_b: {
        flex: 1,
        justifyContent: "center"
    },
    all: {
        // borderWidth: 1,
        marginTop: 25,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    card: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 25,
        borderColor: '#A9A9A9',
        paddingHorizontal: 15,
        padding: 5,
    },
    text :{
        marginTop: 1,
        marginLeft: 5,
        color: '#707070',
    },
    title: {
        marginTop:20,
        marginLeft: 25,
    },
    titre_t: {
        fontSize: 25,
        color:'#1a7d46',
        fontWeight: 'bold', 
    }, 
    titre_st: {
        fontSize: 25,
        color:'#5D5D5D',
        fontWeight: 'bold', 
    }, 
    b_card: {
        flexDirection: 'row',
        marginTop:20,
        marginHorizontal: "10%",
        borderRadius: 15,
        // borderWidth: 1,
    },
    card_g: {
        // marginTop:20,
        // marginHorizontal: 25,

        borderRadius: 15,
        borderWidth: 1,
    },
    img: {
        alignSelf: 'center',
        width: 150,
        height: 150

    },
    image: {
        width: "80%",
        height: 200,
        borderRadius:5
    },
    txt_c: {
        fontSize:20,
        alignSelf:'center',
        height: 35
    }
    
});

export default HomeScreen;
