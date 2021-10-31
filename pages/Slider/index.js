import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'

import Swiper from 'react-native-swiper'

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        height: "50%", width: "100%",
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#9DD6EB',
        borderRadius: 15
    },
    slide2: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#97CAE5',
        borderRadius: 15
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
        borderRadius: 15
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default class SwiperComponent extends Component {
    render() {
        return (
            <View style={{ width: "100%", height: "25%", padding: 5 }}>
                <Swiper style={styles.wrapper} loop={true} autoplay={true} dotColor="red" activeDotColor="black" >
                    <View style={styles.slide1}>
                        <Image source={require('../../assets/img/logo_colorida.png')} resizeMode="contain" style={{ height: "50%", width: "100%" }} />
                    </View>
                    <ImageBackground source={require('../../assets/img/processo.jpg')} resizeMode="contain" imageStyle={{ borderRadius: 15 }}
                        style={{ height: "50%", width: "100%", alignItems: 'flex-end', justifyContent: "flex-end" }}>
                        <View style={{ height: "100%", width: "40%", padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: "white" }}>Regularize sua situação com nosso time de advogados especializados.</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground source={require('../../assets/img/consumidor.jpg')} resizeMode="contain" imageStyle={{ borderRadius: 15 }}
                        style={{ height: "50%", width: "100%", alignItems: 'flex-start', justifyContent: "flex-start" }}>
                        <View style={{ height: "100%", width: "40%", padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Acompanhe as atualizações do seu processo quando e onde quiser.</Text>
                        </View>
                    </ImageBackground>
                </Swiper>
            </View>
        )
    }
}