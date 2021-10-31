import React, { Component } from 'react'
import { Text, View, Image, StatusBar } from 'react-native'

import Swiper from 'react-native-swiper'
import global from '../../styles/global-style'
import loginStyle from '../../styles/login-style'
import FormLogin from './Form'


export default class Login extends Component {
    render() {
        return (
            <View style={global.pagesContainer}>
                <StatusBar {...loginStyle.statusBar} />
                <Swiper style={loginStyle.wrapper} dotColor="red" activeDotColor="black">
                    <View style={global.pagesContainer}>
                        <Image style={loginStyle.topImages} source={require('../../assets/img/splash_horizontal.png')} />
                        <View style={loginStyle.content}>
                            <View style={loginStyle.body}>
                                <Text style={loginStyle.title}>Bem vindo(a)!</Text>
                                <Text style={loginStyle.textBody}>
                                    O TDC - Favelas surgiu com a ideia de proporcionar aos cidadãos de todas as comunidades do Brasil, uma oportunidade de se defenderem judicialmente à baixo custo.
                                </Text>
                            </View>
                            <View style={loginStyle.footerImage}>
                                <Image style={loginStyle.footerImageStyle} source={require('../../assets/img/logo_branca.png')} />
                            </View>
                        </View>
                    </View>
                    <View style={global.pagesContainer}>
                        <Image style={loginStyle.topImages} source={require('../../assets/img/bgLogin.jpg')} />

                        <View style={loginStyle.content}>
                            <View style={loginStyle.body}>
                                <Text style={loginStyle.title}>Nossa Missão</Text>
                                <Text style={loginStyle.textBody}>
                                    Mediar e conciliar conflitos de forma extrajudicial e judicial, nos casos relacionados ao direito do consumidor, direitos previdenciarios, direito da saúde e consultorias a microempreendedores
                                </Text>
                            </View>
                            <View style={loginStyle.footerImage}>
                                <Image style={loginStyle.footerImageStyle} source={require('../../assets/img/logo_branca.png')} />
                            </View>
                        </View>
                    </View>
                    <View style={loginStyle.slide1}>
                        <FormLogin />
                    </View>
                </Swiper>
            </View>
        )
    }
}