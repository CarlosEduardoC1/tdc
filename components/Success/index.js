import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';


export default function Success(props) {
    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: "#38c172" }} >
            <View style={{ width: "100%", height: "80%", alignItems: "center" }}>
                <LottieView source={require('../../assets/animation/success.json')} autoPlay loop />
            </View>
            <View style={{ width: "100%", height: "20%", alignItems: "center" }}>
                <Text style={{ color: props.buttonColor, fontWeight: 'bold', fontSize: 20 }}>{props.text}</Text>
                <Button style={{ marginTop: 20, width:"80%" }} mode="contained" color={props.buttonColor} onPress={props.press}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{props.buttonText}</Text>
                </Button>
            </View>
        </View >
    );
}