import React, { useState } from 'react';
import { View, Image, StatusBar } from 'react-native';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { _authentication } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../../styles/global-style';
import loginStyle from '../../styles/login-style';

export default function FormLogin() {
    const [loading, setLoading] = useState(false);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [snack, setSnack] = useState(false);
    const [color, setColor] = useState('');
    const [message, setMessage] = useState('');

    const onDismissSnackBar = () => setSnack(false);

    const authenticationUser = async () => {
        setLoading(true);
        await _authentication({ email: mail, password })
            .then(async response => {
                setLoading(false);
                await AsyncStorage.setItem('id', response.data.id.toString());
                await AsyncStorage.setItem('nome', response.data.nome);
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('email', mail);
                await AsyncStorage.setItem('password', password);
                setColor('green');
                setMessage('Autenticado com sucesso!');
                setSnack(true);
                Actions.tabs();
            })
            .catch(() => {
                setLoading(false);
                setColor('red');
                setMessage('Erro ao efetuar login. Verifique os dados fornecidos!');
                setSnack(true);
                setMail('');
                setPassword('');
            });
    }


    return (
        <View style={loginStyle.container}>
            <StatusBar  {...global.statusbar} />
            <View style={{ width: "100%", height: "35%" }}>
                <Image source={require('../../assets/img/splash_horizontal.png')} style={{ width: "100%", height: "100%" }} />
            </View>
            <View style={loginStyle.containerLogo}>
                <Image source={require('../../assets/img/logo_colorida.png')} resizeMode="center" style={{ height: 150, width: 200 }} />
            </View>
            <View style={loginStyle.formContainer}>
                <TextInput
                    label="Email"
                    style={loginStyle.inputMail}
                    value={mail}
                    onChangeText={text => { setMail(text) }}
                    right={<TextInput.Icon name="mail" />}
                    keyboardType="email-address"
                    {...loginStyle.inputProps}
                />

                <TextInput
                    label="Senha"
                    style={loginStyle.inputPass}
                    value={password}
                    onChangeText={text => { setPassword(text) }}
                    secureTextEntry
                    right={<TextInput.Icon name="key" />}
                    {...loginStyle.inputProps}
                />
                <Button style={loginStyle.sendButton} {...loginStyle.sendButtonProps} onPress={() => authenticationUser()} loading={loading} disabled={loading}>Acessar</Button>
                <Button style={loginStyle.cadButton} {...loginStyle.cadButtonProps} onPress={() => Actions.termo()} >Cadastrar</Button>
                <Snackbar
                    visible={snack}
                    onDismiss={onDismissSnackBar}
                    style={{ backgroundColor: color }}>
                    {message}
                </Snackbar>
            </View>
        </View>
    )
}