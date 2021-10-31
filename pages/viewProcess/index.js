import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableHighlight, ScrollView, Modal } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as DocumentPicker from 'expo-document-picker';
import { server, _getMyProcess, _sendDocs } from '../../services';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
import AlertModal from '../../components/AlertModal';
import ModalUpDown from '../../components/Modalize';
import { formataMoeda } from '../../utils/utils';
import global from '../../styles/global-style';
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';

export default function ViewProcess(props) {
    const [data, setData] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const getProcess = async () => {
        await _getMyProcess()
            .then(response => {
                // console.log(response.data);
                setData(response.data);
            });
    }

    const deleteProcess = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        getProcess();
    }, []);


    return (
        <View style={global.pagesContainer}>
            <View style={global.navbar}>
                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "white", marginTop: 15 }}>Meus Processos</Text>
            </View>
            <ScrollView style={{ height: "100%", width: "100%", padding: 15, marginBottom: 20 }}>
                {data.map((data, index) => {
                    return (
                        <Card key={index} style={{ borderRadius: 10, backgroundColor: "#f2f2f2", margin: 5, height: 100 }} mode="elevated">
                            <Card.Title title={data.face_reclamacao} left={() => <Avatar.Icon icon="clipboard-list" size={30} style={{ backgroundColor: "#01A79C" }} />} />
                            <Card.Content style={{ justifyContent: "space-between", flexDirection: "row", height: 20 }}>
                                <Button icon="delete"
                                    color='red'
                                    mode="outlined"
                                    style={{ alignItems: "center", justifyContent: "center", width: "33%", borderColor: "red" }}
                                    onPress={() => { setIsVisible(true); }}>
                                    DELETAR
                                </Button>
                                <Button icon="file-pdf-box"
                                    mode="outlined"
                                    style={{ alignItems: "center", justifyContent: "center", width: "33%", borderColor: "purple" }}
                                    color='purple'
                                // onPress={() => { setVisible(true); setCarData(item); setDespesas(true); setVenda(false); }}>
                                >ARQUIVOS
                                </Button>
                                <Button icon="chat"
                                    color='blue'
                                    mode="outlined"
                                    style={{ alignItems: "center", justifyContent: "center", width: "33%", borderColor: "blue" }}
                                    onPress={() => { Actions.chat({ processo: data.face_reclamacao, id_user: data.PrcUsr[0].id, id_processo: data.id }) }}>
                                    CHAT
                                </Button>
                            </Card.Content>
                            <Card.Actions >


                            </Card.Actions>
                        </Card>
                    )
                })}
            </ScrollView>
            <BottomSheet
                isVisible={isVisible}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
                <View style={{ width: "100%", backgroundColor: "white", height: 150, padding: 15 }}>
                    <View style={{ height: 80, alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Deseja excluir permanentemente este processo ?</Text>
                    </View>
                    <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
                        <Button
                            icon="delete"
                            color="red"
                            style={{ backgroundColor: "#ff5050" }}
                            mode="contained"
                            loading={loading}
                            disabled={loading}
                            onPress={() => deleteProcess()}
                        >DELETAR</Button>
                        <Button
                            icon="close"
                            color="red"
                            style={{ backgroundColor: "#9966ff" }}
                            mode="contained"
                            loading={loading}
                            disabled={loading}
                            onPress={() => setIsVisible(false)}
                        >Cancelar</Button>
                    </View>
                </View>
            </BottomSheet>
        </View >
    );
}
