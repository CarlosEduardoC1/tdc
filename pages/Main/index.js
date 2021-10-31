import React from 'react';
import { View, Image, StatusBar, ImageBackground, TouchableHighlight, Text, ScrollView } from 'react-native';
import Slider from '../Slider';
import { Actions } from 'react-native-router-flux';
import global from '../../styles/global-style';
import mainStyles from '../../styles/main-styles';
import { Card, IconButton, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
// import {  } from 'react-native-gesture-handler';

export default function MainScreen(props) {

    return (
        <View style={mainStyles.container}>
            <StatusBar  {...global.statusbar} barStyle="dark-content" />
            <ImageBackground style={mainStyles.backImage} source={require('../../assets/img/splash.png')}>
                <Image style={mainStyles.image} source={require('../../assets/img/logo_preta.png')} resizeMode='contain' />
            </ImageBackground>
            <ScrollView style={{ height: "30%" }}>
                <View style={{ width: "100%", height: '30%', padding: 10 }}>
                    <Slider />
                </View>

                <View style={{ height: "70%", width: "100%", flexDirection: "row", flexWrap: "wrap", padding: 15, justifyContent: "center" }}>
                    <Card style={{ width: "25%", margin: 5, height: 130 }}>
                        <View style={{ width: "100%", alignItems: "flex-end", height: 30 }}>
                            <IconButton icon="dots-vertical" size={20} />
                        </View>
                        <View style={{ width: "100%", height: "90%", alignItems: "center" }}>
                            <Card.Content>
                                <Icon name="folder-open-outline" size={50} color="#01A79C" />
                            </Card.Content>
                            <Paragraph style={{ textAlign: 'center' }}>File Name</Paragraph>
                        </View>
                    </Card>
                    <Card style={{ width: "25%", margin: 5, height: 130 }}>
                        <View style={{ width: "100%", alignItems: "flex-end", height: 30 }}>
                            <IconButton icon="dots-vertical" size={20} />
                        </View>
                        <View style={{ width: "100%", height: "90%", alignItems: "center" }}>
                            <Card.Content>
                                <Icon name="folder-open-outline" size={50} color="#01A79C" />
                            </Card.Content>
                            <Paragraph style={{ textAlign: 'center' }}>File Name</Paragraph>
                        </View>
                    </Card>
                    <Card style={{ width: "25%", margin: 5, height: 130 }}>
                        <View style={{ width: "100%", alignItems: "flex-end", height: 30 }}>
                            <IconButton icon="dots-vertical" size={20} />
                        </View>
                        <View style={{ width: "100%", height: "90%", alignItems: "center" }}>
                            <Card.Content>
                                <Icon name="folder-open-outline" size={50} color="#01A79C" />
                            </Card.Content>
                            <Paragraph style={{ textAlign: 'center' }}>File Name</Paragraph>
                        </View>
                    </Card>
                    <Card style={{ width: "25%", margin: 5, height: 130 }}>
                        <View style={{ width: "100%", alignItems: "flex-end", height: 30 }}>
                            <IconButton icon="dots-vertical" size={20} />
                        </View>
                        <View style={{ width: "100%", height: "90%", alignItems: "center" }}>
                            <Card.Content>
                                <Icon name="folder-open-outline" size={50} color="#01A79C" />
                            </Card.Content>
                            <Paragraph style={{ textAlign: 'center' }}>File Name</Paragraph>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        </View>
    )
}