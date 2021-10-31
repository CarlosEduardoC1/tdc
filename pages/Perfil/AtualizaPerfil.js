import React, { useState } from 'react';
import { View, ImageBackground, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Button, IconButton, TextInput, HelperText } from 'react-native-paper';
import { _deleteAccount, _getUserData, _updateUserData } from '../../services';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import * as ImagePicker from 'expo-image-picker';
import schema from '../Cadastro/schema';
import { validationCEP, validationCPF, validationPhone } from '../../config/index.config';
import perfilStyle from '../../styles/perfil-style';


export default function AtualizaPerfil(props) {

    const [perfil, setPerfil] = useState(props.data.profile);
    const [cpf, setCPF] = useState(props.data.cpf);
    const [nome, setNome] = useState(props.data.name);
    const [email, setEmail] = useState(props.data.email);
    const [fone, setFone] = useState(props.data.fone);
    const [cep, setCEP] = useState(props.data.cep);
    const [endereco, setEndereco] = useState(props.data.endereco);
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [loading, setLoading] = useState(false);
    const [erroMail, setErroMail] = useState('');
    const [erroPass, setErroPass] = useState('');



    const validationMail = (text) => schema.isValid({ email: text }).then(function (valid) { valid ? setErroMail('') : setErroMail('O e-mail informado é inválido') });
    const validationPassWord = (text) => schema.isValid({ password: text }).then(function (valid) { valid ? setErroPass('') : setErroPass('A senha deve conter no mínimo 8 caracteres') });
    const hasErrorsMail = () => { return erroMail }
    const hasErrorsPass = () => { return erroPass }

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

    const alertDeleteModal = () => {
        Alert.alert(
            "",
            "Essa ação irá excluir permanentemente sua conta. Deseja prosseguir ?",
            [{ text: "Sim", onPress: () => deleteAccount(), style: "cancel" },
            { text: "Não", onPress: () => console.log("Não") }]
        );
    }


    const deleteAccount = async () => {
        setLoading(true);
        await _deleteAccount(props.data.id)
            .then(() => {
                setLoading(false);
                logout();
            })
            .catch(() => {
                setLoading(false);
                Alert.alert(
                    "Error!",
                    "Ocorreu um erro na solicitação de exclusão de conta. Tente novamente.",
                    [{ text: "OK", onPress: () => Actions.tabs() }]
                );
            })
    }


    const logout = async () => {
        await AsyncStorage.removeItem('appId');
        await AsyncStorage.removeItem('cep');
        await AsyncStorage.removeItem('cpf');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('endereco');
        await AsyncStorage.removeItem('fone');
        await AsyncStorage.removeItem('id');
        await AsyncStorage.removeItem('lo_pago');
        await AsyncStorage.removeItem('name');
        await AsyncStorage.removeItem('nascimento');
        Actions.load();
    };

    const atualizaUser = async () => {
        setLoading(true);
        const json = {
            name: nome, email, password, nascimento: props.data.nascimento, lo_pago: props.data.lo_pago, fone, cpf, cep, endereco, type: 'US', appID: props.data.appID, alteraSenha: checked,
            profile: imageBase64 ? imageBase64 : perfil
        };

        await _updateUserData(props.data.id, json)
            .then(response => {
                setLoading(false);
                Alert.alert(
                    "Sucesso!",
                    response.data.msg,
                    [{ text: "OK", onPress: props.updateProfilePage }]
                );
                console.log(response.data);
            })
            .catch(error => {
                setLoading(false);
                console.log(error)
            });
    }


    if (loading) {
        return (
            <View style={{ width: "100%", height: "100%", justifyContent: 'center', backgroundColor: '#fff', alignItems: "center" }}>
                <ActivityIndicator size="large" color="green" />
            </View>
        )
    }
    else {
        return (
            <View style={{ width: "100%", height: "100%" }}>
                <View style={{ width: "100%", flexDirection: 'row', justifyContent: "space-between" }}>
                    <Button style={{ marginBottom: 35 }} color='red' onPress={props.close}>FECHAR</Button>
                    <Button style={{ marginBottom: 35 }} color='green' onPress={() => atualizaUser()}>SALVAR</Button>
                </View>
                <View>
                    <View style={{ width: "100%", height: 120, alignItems: "center", justifyContent: "center" }}>
                        <ImageBackground style={{ height: 150, width: 150 }} imageStyle={{ borderRadius: 100, opacity: 0.5, borderColor: "#fff", borderWidth: 3 }}
                            source={{ uri: image ? image : "data:image/png;base64," + perfil }}>
                            <IconButton icon="camera-plus" color="black" size={40} style={{
                                position: 'relative',
                                right: '15%',
                                bottom: '10%',
                                opacity: 5
                            }} onPress={pickImage} />
                        </ImageBackground>
                    </View>
                    <ScrollView style={{ width: "100%", height: 500, marginTop: 30 }}>
                        <View style={{ width: "100%", height: '100%' }}>
                            <TextInput
                                label="Nome Completo"
                                style={{ height: 50, width: "100%", borderRadius: 10, backgroundColor: "#fff" }}
                                value={nome}
                                onChangeText={text => { setNome(text) }}
                                right={<TextInput.Icon name="account" color='purple' />}
                            />
                            <TextInput
                                label="E-mail"
                                style={{ height: 50, width: "100%", borderRadius: 10, backgroundColor: "#fff" }}
                                value={email}
                                onChangeText={text => { validationMail(text); setEmail(text) }}
                                onBlur={() => verifiaExistencia()}
                                right={<TextInput.Icon name="at" color='purple' />}
                                keyboardType="email-address"
                                error={erroMail}
                            />
                            <HelperText style={perfilStyle.helperText} {...perfilStyle.helperProps} visible={hasErrorsMail()}>
                                {erroMail}
                            </HelperText>
                            <TextInput
                                label="CPF"
                                style={{ height: 50, width: "100%", borderRadius: 10, backgroundColor: "#fff" }}
                                value={cpf}
                                onChangeText={text => { setCPF(text) }}
                                disabled={true}
                                onBlur={() => setCPF(validationCPF(cpf))}
                                right={<TextInput.Icon name="card-account-details" color='purple' />}
                                keyboardType="number-pad"
                            />
                            <TextInput
                                label="Telefone"
                                style={{ height: 50, width: "100%", borderRadius: 10, backgroundColor: "#fff" }}
                                value={fone}
                                onChangeText={text => { setFone(text) }}
                                onBlur={() => setFone(validationPhone(fone))}
                                right={<TextInput.Icon name="phone" color='purple' />}
                                keyboardType="number-pad"
                            />
                            <TextInput
                                label="CEP"
                                style={{ height: 50, width: "100%", borderRadius: 10, backgroundColor: "#fff" }}
                                value={cep}
                                onChangeText={text => { setCEP(text) }}
                                onBlur={() => setCPF(validationCEP(cep))}
                                right={<TextInput.Icon name="map-marker" color='purple' />}
                                keyboardType="number-pad"
                            />
                            <TextInput
                                label="Endereço"
                                style={{ height: 50, width: "100%", borderRadius: 10, backgroundColor: "#fff" }}
                                value={endereco}
                                onChangeText={text => { setEndereco(text) }}
                                // onBlur={() => setCPF(validationCPF(cpf))}
                                right={<TextInput.Icon name="mailbox-up" color='purple' />}
                            />
                            <CheckBox
                                checked={checked}
                                checkedColor="#0F0"
                                checkedTitle="Alterar Senha"
                                containerStyle={{ width: "100%" }}
                                onIconPress={() => setChecked(!checked)}
                                size={15}
                                title="Alterar Senha"
                                uncheckedColor="#F00"
                            />
                            <TextInput
                                label="Nova Senha"
                                style={{ height: 50, width: "100%", borderRadius: 10, backgroundColor: "#fff" }}
                                value={password}
                                disabled={!checked}
                                secureTextEntry
                                onChangeText={text => { validationPassWord(text); setPassword(text) }}
                                error={erroPass}
                                helperText={erroPass}
                                right={<TextInput.Icon name="key" color='purple' />}
                            />
                            <HelperText style={perfilStyle.helperPass} {...perfilStyle.helperPassProps} visible={hasErrorsPass()}>
                                {erroPass}
                            </HelperText>
                            <View style={{ width: "100%", marginTop: 25 }}>
                                <Button color="red" onPress={() => alertDeleteModal()}>Deletar Conta</Button>
                                <Button color="red" onPress={() => logout()} >Sair</Button>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View >
        );
    }
}