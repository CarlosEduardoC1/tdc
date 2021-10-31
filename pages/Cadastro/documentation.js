import { Camera } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Image, StatusBar, Text, TouchableHighlight, Plataform, SafeAreaView } from 'react-native';
import { Button, TextInput, HelperText, Avatar } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { _makeCad } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';

import global from '../../styles/global-style';
import styles from '../../styles/cadastro-style';

export default function Documentation(props) {
    // console.log(props);
    const camRef = useRef(null);
    const [imageId, setImageID] = useState(null);
    const [imageSelfie, setImageSelfie] = useState(null);
    const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back);
    const [permissionCamera, setPermissionCamera] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageOrder, setOrderImage] = useState('id');

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setPermissionCamera(status === 'granted');
        })();
    }, []);

    const takeIdPicture = async () => {
        setLoading(true);
        if (camRef) {
            if (imageOrder === 'id') {
                const data = await camRef.current.takePictureAsync({ base64: true });
                setImageID(data.base64);
                setOrderImage('selfie');
                setLoading(false);
                setTypeCamera(Camera.Constants.Type.front);
            } else {
                const data = await camRef.current.takePictureAsync({ base64: true });
                setImageSelfie(data.base64);
                setLoading(false);
                console.log("SELFIEEEEEE", imageSelfie);
                console.log("IDDDDDDDDDDDDDD ", imageId);
                jump(data.base64);
            }
        }
    }

    const jump = async (selfie) => {
        setLoading(true);
        const json = {
            dados: props.dadosCadastro,
            img: { id: imageId, selfie: selfie },
        };
        await _makeCad(json)
            .then(async response => {
                console.log(response.data);
                await AsyncStorage.setItem('appId', props.dadosCadastro.appID.toString());
                await AsyncStorage.setItem('cep', props.dadosCadastro.cep.toString());
                await AsyncStorage.setItem('cpf', props.dadosCadastro.cpf.toString());
                await AsyncStorage.setItem('email', props.dadosCadastro.email.toString());
                await AsyncStorage.setItem('password', props.dadosCadastro.password.toString());
                await AsyncStorage.setItem('endereco', props.dadosCadastro.endereco.toString());
                await AsyncStorage.setItem('fone', props.dadosCadastro.fone.toString());
                await AsyncStorage.setItem('id', props.dadosCadastro.id.toString());
                await AsyncStorage.setItem('lo_pago', props.dadosCadastro.lo_pago.toString());
                await AsyncStorage.setItem('name', props.dadosCadastro.name.toString());
                await AsyncStorage.setItem('nascimento', props.dadosCadastro.nascimento.toString());

                setLoading(false);
                Actions.success({ buttonColor: "#fff", text: "Cadastro realizado com sucesso", buttonText: "Acessar o APP", press: () => { Actions.tabs() } });
            })
            .catch(error => console.log(error));
    }

    if (permissionCamera === null) {
        return <View />
    }
    if (permissionCamera === false) {
        return <View />
    }

    return (
        <SafeAreaView style={global.container}>
            <StatusBar {...global.statusbar} />
            <Image style={global.imageNavBar} source={require('../../assets/img/splash.png')} />
            <Camera
                ref={camRef}
                style={styles.camStyle}
                type={typeCamera}
            >
                <Text style={styles.infoCam}>Para dar continuidade ao seu cadastro, você precisa realizar o envio de uma foto do seu documento de identificação com Foto e uma selfie segurando o mesmo documento</Text>
                {imageOrder === 'id' ? <Image style={styles.imgIdCam} resizeMode="center" source={require('../../assets/icons/id.png')} />
                    : <Image style={styles.imgSelfieCam} resizeMode="center" source={require('../../assets/icons/selfie.png')} />}
                <TouchableHighlight style={styles.takePhoto}
                    underlayColor="transparent" onPress={takeIdPicture}>
                    {loading ? <ActivityIndicator size="large" color="white" /> : <Avatar.Icon icon="camera" size={60} style={{ backgroundColor: '#fff' }} />}
                </TouchableHighlight>
            </Camera>
        </SafeAreaView >
    );
}

