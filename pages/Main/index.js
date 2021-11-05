import React, { useState, useRef, useEffect } from 'react';
import { View, Image, StatusBar, ImageBackground, Dimensions, Text, ScrollView, TouchableHighlight } from 'react-native';
import Slider from '../Slider';
import { Actions } from 'react-native-router-flux';
import global from '../../styles/global-style';
import mainStyles from '../../styles/main-styles';
import { Card, IconButton, Paragraph, Menu, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { _getFiles } from '../../services';


export default function MainScreen(props) {
    const [files, setFiles] = useState([]);

    const getFiles = async () => {
        await _getFiles().then(response => { console.log(response.data); setFiles(response.data) });
    }

    useEffect(() => {
        getFiles();
    }, [])

    return (
        <>
            <View style={mainStyles.container}>
                <StatusBar  {...global.statusbar} barStyle="light-content" />
                <View style={global.navbar}>
                    <Image style={mainStyles.image} source={require('../../assets/img/logo_branca.png')} resizeMode='contain' />
                </View>
                {/* <ImageBackground style={mainStyles.backImage} source={require('../../assets/img/splash.png')}> */}
                {/* <Image style={mainStyles.image} source={require('../../assets/img/logo_preta.png')} resizeMode='contain' /> */}
                {/* </ImageBackground> */}
                {/* 
                    
                    <WebView source={{ uri: 'https://drive.google.com/file/d/1o1AZzfrWInROCowu0_GA844EWxRkrLTE/view' }} />
                </View> */}
                {/* <View style={{ width: "100%", height: 240, padding: 10 }}> */}
                <Slider />
                {/* </View> */}
                <View style={{ height: "70%", width: "100%", padding: 15, justifyContent: "center", marginTop: 20 }}>
                    <ScrollView style={{ height: "30%", width: "100%", paddingRight: 15 }}>
                        <Card mode="outlined" style={{ width: "100%", margin: 5, height: 40 }}>
                            <View style={{ width: "100%", height: "100%", alignItems: "flex-start", justifyContent: "center" }}>
                                <Card.Content style={{ alignItems: "center", flexDirection: "row" }}>
                                    <Icon name="document-outline" size={18} color="#7D2476" />
                                    <TouchableHighlight underlayColor="transparent" onPress={() => Actions.viewPdf({ file: files[0].file })} >
                                        <Paragraph style={{ textAlign: 'center', fontWeight: 'bold' }}>Lei Maria da Penha</Paragraph>
                                    </TouchableHighlight>
                                </Card.Content>
                            </View>
                        </Card>
                        <Card mode="outlined" style={{ width: "100%", margin: 5, height: 40 }}>
                            <View style={{ width: "100%", height: "100%", alignItems: "flex-start", justifyContent: "center" }}>
                                <Card.Content style={{ alignItems: "center", flexDirection: "row" }}>
                                    <Icon name="document-outline" size={18} color="#7D2476" />
                                    <TouchableHighlight underlayColor="transparent" onPress={() => Actions.viewPdf({ file: files[1].file })} >
                                        <Paragraph style={{ textAlign: 'center', fontWeight: 'bold' }}>Estatuto da pessoa com deficiência</Paragraph>
                                    </TouchableHighlight>
                                </Card.Content>
                            </View>
                        </Card>
                        <Card mode="outlined" style={{ width: "100%", margin: 5, height: 40 }}>
                            <View style={{ width: "100%", height: "100%", alignItems: "flex-start", justifyContent: "center" }}>
                                <Card.Content style={{ alignItems: "center", flexDirection: "row" }}>
                                    <Icon name="document-outline" size={18} color="#7D2476" />
                                    <TouchableHighlight underlayColor="transparent" onPress={() => Actions.viewPdf({ file: files[2].file })} >
                                        <Paragraph style={{ textAlign: 'center', fontWeight: 'bold' }}>Código de defesa do consumidor</Paragraph>
                                    </TouchableHighlight>
                                </Card.Content>
                            </View>
                        </Card>
                        <Card mode="outlined" style={{ width: "100%", margin: 5, height: 40 }}>
                            <View style={{ width: "100%", height: "100%", alignItems: "flex-start", justifyContent: "center" }}>
                                <Card.Content style={{ alignItems: "center", flexDirection: "row" }}>
                                    <Icon name="document-outline" size={18} color="#7D2476" />
                                    <TouchableHighlight underlayColor="transparent" onPress={() => Actions.viewPdf({ file: files[3].file })} >
                                        <Paragraph style={{ textAlign: 'center', fontWeight: 'bold' }}>Estatuto do idoso</Paragraph>
                                    </TouchableHighlight>
                                </Card.Content>
                            </View>
                        </Card>
                        <Card mode="outlined" style={{ width: "100%", margin: 5, height: 40 }}>
                            <View style={{ width: "100%", height: "100%", alignItems: "flex-start", justifyContent: "center" }}>
                                <Card.Content style={{ alignItems: "center", flexDirection: "row" }}>
                                    <Icon name="document-outline" size={18} color="#7D2476" />
                                    <TouchableHighlight underlayColor="transparent" onPress={() => Actions.viewPdf({ file: files[4].file })} >
                                        <Paragraph style={{ textAlign: 'center', fontWeight: 'bold' }}>Juizados especiais</Paragraph>
                                    </TouchableHighlight>
                                </Card.Content>
                            </View>
                        </Card>
                        <Card mode="outlined" style={{ width: "100%", margin: 5, height: 40 }}>
                            <View style={{ width: "100%", height: "100%", alignItems: "flex-start", justifyContent: "center" }}>
                                <Card.Content style={{ alignItems: "center", flexDirection: "row" }}>
                                    <Icon name="document-outline" size={18} color="#7D2476" />
                                    <TouchableHighlight underlayColor="transparent" onPress={() => Actions.viewPdf({ file: files[5].file })} >
                                        <Paragraph style={{ textAlign: 'center', fontWeight: 'bold' }}>Lei Nº 9.656</Paragraph>
                                    </TouchableHighlight>
                                </Card.Content>
                            </View>
                        </Card>
                    </ScrollView>
                </View>
            </View>
        </>
    )
}
