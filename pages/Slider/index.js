import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'

import Swiper from 'react-native-swiper'

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        height: "100%", width: "100%",
    }
})

export default class SwiperComponent extends Component {
    render() {
        return (
            <View style={{ width: "60%", height: "30%", padding: 5 }}>
                <Swiper style={styles.wrapper} loop={true} autoplay={true} dotColor="#7D2476" activeDotColor="white" >
                    <View style={styles.slide1}>
                        <Image source={require('../../assets/img/card/1.png')} resizeMode="stretch" style={{ height: "100%", width: "100%", borderRadius: 10 }} />
                    </View>
                    <View style={styles.slide1}>
                        <Image source={require('../../assets/img/card/2.png')} resizeMode="stretch" style={{ height: "100%", width: "100%", borderRadius: 10 }} />
                    </View>
                    <View style={styles.slide1}>
                        <Image source={require('../../assets/img/card/3.png')} resizeMode="stretch" style={{ height: "100%", width: "100%", borderRadius: 10 }} />
                    </View>
                    <View style={styles.slide1}>
                        <Image source={require('../../assets/img/card/4.png')} resizeMode="stretch" style={{ height: "100%", width: "100%", borderRadius: 10 }} />
                    </View>
                </Swiper>
            </View>
        )
    }
}