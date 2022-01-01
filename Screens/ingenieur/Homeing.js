import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, ScrollView, Dimensions, ImageBackground } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

export default function Homeing() {

    const [time, setTime] = useState(moment().format('h:mm a'));
    const [nbr_agr, setNbr_agr] = useState(10);
    const [nbr_reclam, setNbr_reclam] = useState(5);
    const [nbr_diag, setNbr_diag] = useState(5);
    const screenWidth = Dimensions.get("window")/ 2;
    const data = {
        labels: ["diagnostic  ", "reclamation", "agriculteurs"], // optional
        data: [0.4, 0.6, 0.8]
      };

    useEffect(() => {
        setInterval(() => {
            setTime(moment().format('h:mm a'))
        }, 60000)
    }, []);
            
    var date = moment().format('YYYY/MM/DD');


    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/cover.jpg')} resizeMode="cover" style={styles.image}>

            <ScrollView style={{ backgroundColor: 'rgba(223, 228, 234, 0.7)'}}>
                <View style={styles.title}> 
                    <Text style={styles.titre_t}>Greens</Text>    
                </View>
                <View style={styles.all}> 
                    <View style={[styles.card, {marginRight: 20}]}> 
                        <Fontisto
                            name="date"
                            size={20}
                            color={'#545353'}
                        /> 
                        <Text style={styles.text} > {date} </Text>  
                    </View>
                    <View style={styles.card}>  
                        <MaterialIcons
                            name="access-time"
                            size={20}
                            color={'#545353'}
                        />
                        <Text style={styles.text} > {time} </Text> 
                    </View>

                </View>
                {/* <View style={styles.title}> 
                    <Text style={styles.titre_st}>Type</Text>    
                </View> */}
                <View style={{width: "100%", marginTop: "10%", alignItems: 'center'}}>
                    
                    <BarChart
                        data={{
                        labels: ['Agriciltures', 'Diagnostics', 'Reclamations'],
                        datasets: [
                            {
                            data: [nbr_diag, nbr_reclam, nbr_agr],
                            },
                        ],
                        }}
                        width={Dimensions.get('window').width - 16}
                        height={300}
                        // yAxisLabel={'Rs'}
                        fromZero = {true}
                        chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        }}
                        style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        }}
                    />
                </View>
                
                
                
            </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        flex: 1,
      },
    image: {
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
        borderColor: '#545353',
        paddingHorizontal: 15,
        padding: 5,
    },
    text :{
        marginTop: 1,
        marginLeft: 5,
        color: '#545353',
    },
    title: {
        marginTop: "10%",
        marginLeft: 25,
    },
    titre_t: {
        marginTop: 10,
        fontSize: 25,
        color:'#1a7d46',
        fontWeight: 'bold', 
    }, 
    titre_st: {
        fontSize: 25,
        color:'#5D5D5D',
        fontWeight: 'bold', 
    }, 
})