import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StatusBar, ScrollView, TouchableHighlight, Platform, Modal, Text, ImageBackground, Dimensions } from 'react-native';
import { Button, TextInput, HelperText, Avatar, Provider, IconButton, } from 'react-native-paper';
import { _getUserData } from '../../services';
import LottieView from 'lottie-react-native';
import { Divider } from 'react-native-elements';
import moment from 'moment';
import ModalUpDown from '../../components/Modalize';
import ContentPlans from './ContentPlans';
import global from '../../styles/global-style';
import perfilStyle from '../../styles/perfil-style';

export default function Perfil() {
    const [userData, setUserData] = useState([]);
    const [planos, setPlanos] = useState([]);
    const [processo, setProcesso] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [close, setClose] = useState(false);
    const [type, setType] = useState('');
    const [height, setHeight] = useState(0);
    const [modalUpdate, setModalUpdate] = useState(false);

    const myProfile = useCallback(async function () {
        setLoading(true);
        let id = await AsyncStorage.getItem('id');
        await _getUserData(id)
            .then(response => {
                setUserData(response.data.result);
                setPlanos(response.data.planos);
                setProcesso(response.data.processo);
                setLoading(false);
            })
            .catch(error => { console.log(error) });
    }, []);


    const modalClose = () => { setModal(false); setClose(true); }

    useEffect(() => {
        myProfile();
    }, [modalUpdate])


    const updateProfilePage = () => {
        modalClose();
        setModalUpdate(!modalUpdate);
    }

    return (
        <View style={global.container}>
            {loading ? <LottieView source={require('../../assets/animation/loading.json')} autoPlay loop />
                : <>
                    <View style={perfilStyle.content}>
                        <View style={perfilStyle.bgView}>
                            <ImageBackground resizeMode="stretch" style={perfilStyle.bgImage} source={require('../../assets/img/profilerocinha.jpg')} imageStyle={{ opacity: 0.3 }}>
                                <View style={perfilStyle.configButton}>
                                    <IconButton icon="cog-outline" size={25} onPress={() => { setModal(true); setClose(false); setType('update'); setHeight(Dimensions.get('screen').height) }} />
                                </View>
                                {userData.profile ? <Image style={perfilStyle.profilePic} source={{ uri: "data:image/png;base64," + userData.profile }} /> : <Avatar.Icon size={100} icon="account" />}
                                <Text style={perfilStyle.userName}>{userData.name}, {moment().diff(userData.nascimento, 'years')}</Text>
                            </ImageBackground>
                        </View>
                        <View style={perfilStyle.contentData}>
                            <TouchableHighlight underlayColor="transparent" onPress={() => { setModal(true); setClose(false); }} style={{ width: "50%" }}>
                                <View style={perfilStyle.contentViewRight}>
                                    <Avatar.Icon size={50} icon='package-up' style={{ backgroundColor: '#8ED9EC' }} />
                                    <Text style={{ fontWeight: 'bold' }}>{processo.count} Processos</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <Divider style={{ width: "80%" }} {...perfilStyle.dividerProps} />
                        <ScrollView style={perfilStyle.scroll}>
                            <View style={perfilStyle.content}>
                                <View style={perfilStyle.viewData}>
                                    <Avatar.Icon icon="phone" {...perfilStyle.avatarProps} style={perfilStyle.avatarStyle} />
                                    <View>
                                        <Text style={perfilStyle.textData}>{userData.fone}</Text>
                                    </View>
                                </View>
                                <Divider style={{ width: "95%" }} {...perfilStyle.dividerDataProps} />
                                <View style={perfilStyle.viewData}>
                                    <Avatar.Icon icon="email" {...perfilStyle.avatarProps} style={perfilStyle.avatarStyle} />
                                    <View>
                                        <Text style={perfilStyle.textData}>{userData.email}</Text>
                                    </View>
                                </View>
                                <Divider style={{ width: "95%" }} {...perfilStyle.dividerDataProps} />
                                <View style={perfilStyle.viewData}>
                                    <Avatar.Icon icon="account" {...perfilStyle.avatarProps} style={perfilStyle.avatarStyle} />
                                    <View >
                                        <Text style={perfilStyle.textData}>{moment(userData.nascimento).format("DD/MM/YYYY")}</Text>
                                    </View>
                                </View>
                                <Divider style={{ width: "95%" }} {...perfilStyle.dividerDataProps} />
                                <View style={perfilStyle.viewData}>
                                    <Avatar.Icon icon="map-marker" {...perfilStyle.avatarProps} style={perfilStyle.avatarStyle} />
                                    <View >
                                        <Text style={perfilStyle.textData}>{userData.cep}, {userData.endereco}</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </>}
            <Modal style={global.modal} onDismiss={modalClose} visible={modal}>
                <ModalUpDown component={<ContentPlans modificador={planos} update={userData} close={modalClose} interface={type} updateProfilePage={updateProfilePage} />}
                    open={modal} close={close} height={height}>
                </ModalUpDown>
            </Modal>
        </View >
    )
}