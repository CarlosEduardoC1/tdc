import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { View, Image, StatusBar, ScrollView, TouchableHighlight, Platform, Modal } from 'react-native';
import { Button, TextInput, HelperText, Avatar } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { _verificaEmail } from '../../services';
import schema from './schema';
import { validationNome, validationDate, validationCEP, validationCPF, validationPhone } from '../../config/index.config';
import * as ImagePicker from 'expo-image-picker';
import AlertModal from '../../components/AlertModal';
import ModalUpDown from '../../components/Modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'native-base';


import styles from '../../styles/cadastro-style';
import global from '../../styles/global-style';
import mainStyles from '../../styles/main-styles';

export default function Cadastro() {
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [fone, setFone] = useState('');
    const [cpf, setCPF] = useState('');
    const [cep, setCEP] = useState('');
    const [endereco, setEndereco] = useState('');
    const [erroNome, setErroNome] = useState('');
    const [erroMail, setErroMail] = useState('');
    const [erroPass, setErroPass] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [modal, setModal] = useState(false);
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [close, setClose] = useState(false);
    const toast = useToast();

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [8, 8],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setImageBase64(result.base64);
        }
    };
    const modalClose = () => { setModal(false); setClose(true); }

    const validationMail = (text) => schema.isValid({ mail: text }).then(function (valid) { valid ? setErroMail('') : setErroMail('O e-mail informado é inválido') });
    const validationPassWord = (text) => schema.isValid({ password: text }).then(function (valid) { valid ? setErroPass('') : setErroPass('A senha deve conter no mínimo 8 caracteres') });

    const hasErrorsMail = () => { return erroMail }
    const hasErrorsPass = () => { return erroPass }
    const hasErrorsNome = () => { return erroNome }

    const verifiaExistencia = async () => {
        await _verificaEmail({ email: mail })
            .then(response => {
                if (response.data.possui === true) setErroMail('Este e-mail já está cadastrado');
            });
    }


    return (
        <View style={global.container}>
            <StatusBar {...global.statusbar} />
            <View style={global.navbar}>
                <Image style={mainStyles.image} source={require('../../assets/img/logo_branca.png')} resizeMode='contain' />
            </View>
            <ScrollView style={{ width: "100%", height: "100%", padding: 5 }}>
                <View style={styles.profilePic}>
                    <TouchableHighlight underlayColor="transparent" onPress={pickImage} >
                        {image ? <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 100 }} /> : <Avatar.Icon size={150} icon="account" />}
                    </TouchableHighlight>

                </View>
                <TextInput
                    label="Nome"
                    style={styles.input}
                    {...styles.inputProps}
                    value={nome}
                    error={erroNome}
                    onChangeText={text => setNome(text)}
                    onBlur={() => setErroNome(validationNome(nome))}
                    right={<TextInput.Icon name="account" color='purple' />}

                />
                <HelperText style={styles.helperText} {...styles.helperProps} visible={() => hasErrorsNome()}>
                    {erroNome}
                </HelperText>
                <TextInput
                    label="CPF"
                    style={styles.input}
                    {...styles.inputProps}
                    value={cpf}
                    maxLength={14}
                    onChangeText={text => { setCPF(text) }}
                    onBlur={() => setCPF(validationCPF(cpf))}
                    right={<TextInput.Icon name="card-account-details" color='purple' />}
                    keyboardType="number-pad"
                />
                <HelperText style={styles.helperText} {...styles.helperProps}>
                    {/* {erroNome} */}
                </HelperText>
                <TextInput
                    label="Data Nascimento"
                    style={styles.input}
                    {...styles.inputProps}
                    value={nascimento}
                    maxLength={10}
                    onChangeText={text => { setNascimento(text) }}
                    onBlur={() => setNascimento(validationDate(nascimento))}
                    right={<TextInput.Icon name="calendar" color='purple' />}
                    keyboardType="number-pad"
                />
                <HelperText style={styles.helperText} {...styles.helperProps} >
                    {/* {erroNome} */}
                </HelperText>
                <TextInput
                    label="Telefone"
                    style={styles.input}
                    {...styles.inputProps}
                    value={fone}
                    maxLength={15}
                    onChangeText={text => { setFone(text) }}
                    onBlur={() => setFone(validationPhone(fone))}
                    right={<TextInput.Icon name="phone" color='purple' />}
                    keyboardType="number-pad"
                />
                <HelperText style={styles.helperText} {...styles.helperProps} >
                    {/* {erroNome} */}
                </HelperText>
                <TextInput
                    label="CEP"
                    style={styles.input}
                    {...styles.inputProps}
                    value={cep}
                    maxLength={15}
                    onChangeText={text => { setCEP(text); }}
                    onBlur={() => { setCEP(validationCEP(cep)); }}
                    right={<TextInput.Icon name="map-marker" color='purple' />}
                    keyboardType="number-pad"
                />
                <HelperText style={styles.helperText} {...styles.helperProps} >
                    {/* {erroNome} */}
                </HelperText>
                <TextInput
                    label="Endereço"
                    style={styles.input}
                    {...styles.inputProps}
                    value={endereco}
                    disabled={disabled}
                    onChangeText={text => { setEndereco(text) }}
                    right={<TextInput.Icon name="mailbox-up" color='purple' />}
                />
                <HelperText style={styles.helperText} {...styles.helperProps}>
                    {/* {erroNome} */}
                </HelperText>
                <TextInput
                    label="Email"
                    style={styles.input}
                    {...styles.inputProps}
                    value={mail}
                    error={erroMail}
                    onChangeText={text => { validationMail(text); setMail(text) }}
                    onBlur={() => verifiaExistencia()}
                    right={<TextInput.Icon name="at" color='purple' />}
                    keyboardType="email-address"
                />
                <HelperText style={styles.helperText} {...styles.helperProps} visible={hasErrorsMail()}>
                    {erroMail}
                </HelperText>

                <TextInput
                    label="Senha"
                    style={styles.password}
                    {...styles.inputProps}
                    value={password}
                    onChangeText={text => { validationPassWord(text); setPassword(text) }}
                    secureTextEntry
                    error={erroPass}
                    right={<TextInput.Icon name="key" color='purple' />}
                />
                <HelperText style={styles.helperPass} {...styles.helperPassProps} visible={hasErrorsPass()}>
                    {erroPass}
                </HelperText>
            </ScrollView>
            <View style={styles.buttonView}>
                <Button style={global.sendButton} {...global.sendButtonProps} onPress={async () => {
                    // if (erroMail || erroNome || erroPass || !!cpf === false || !!nascimento === false || !!fone === false || !!cep === false || !!endereco === false) {

                    //     toast.show({
                    //         title: "Ops...",
                    //         status: "error",
                    //         description: "Você precisa informar todos os dados",
                    //         placement: "top-right",
                    //     })
                    // } else {
                    const json = {
                        name: nome, email: mail, password: password, nascimento: nascimento, lo_pago: 'N', fone: fone, cpf: cpf, cep: cep
                        , endereco: endereco, type: 'US', appID: await AsyncStorage.getItem('appId'), profile: imageBase64
                    };
                    Actions.sendDocs({ dadosCadastro: json })
                    // }
                }} loading={loading} disabled={loading}>Próximo</Button>
            </View>
            <Modal style={global.modal} onDismiss={modalClose} visible={modal}>
                <ModalUpDown component={<AlertModal closeModal={modalClose} text={"Você precisa informar todos os dados!"} buttonText={"Ok"} buttonColor={"red"} icon={"alert-circle"} />}
                    open={modal} close={close} height={250}>
                </ModalUpDown>
            </Modal>
        </View >
    )
}