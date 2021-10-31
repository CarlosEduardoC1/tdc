import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableHighlight, ScrollView, Modal } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as DocumentPicker from 'expo-document-picker';
import { server, _sendDocs } from '../../services';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
import AlertModal from '../../components/AlertModal';
import ModalUpDown from '../../components/Modalize';
import { formataMoeda } from '../../utils/utils';
import global from '../../styles/global-style';

export default function Form(props) {
    const [image, setImage] = useState(null);
    const [docName, setDocName] = useState('');
    const [doc, setDoc] = useState('');
    const [file, setFile] = useState(null);
    const [modal, setModal] = useState(false);
    const [close, setClose] = useState(false);
    const [loading, setLoading] = useState(false);

    const modalClose = () => { setModal(false); setClose(true); }

    if (props.servico === 'Processo') {
        return (
            <View style={global.pagesContainer}>
                <Formik
                    initialValues={{ reclamacao: '', pedido: '', info_adicionais: '', dano_pretendido: '' }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                        <>
                            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", height: 100, backgroundColor: "#01A79C" }}>
                                <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>Formulário para envio de processo</Text>
                            </View>
                            <ScrollView style={{ marginTop: 20, width: "100%", height: "100%", padding: 10, marginBottom: 15 }}>
                                {/* <TextInput
                                    style={{ borderRadius: 10, backgroundColor:'#fff' }}
                                    onChangeText={handleChange('face_reclamacao')}
                                    onBlur={handleBlur('face_reclamacao')}
                                    value={values.email}
                                    label="Responsável pelo ato lesivo"
                                    mode='flat'
                                /> */}
                                <TextInput
                                    style={{ borderRadius: 10, backgroundColor:'#fff' }}
                                    onChangeText={handleChange('reclamacao')}
                                    onBlur={handleBlur('reclamacao')}
                                    value={values.reclamacao}
                                    label="Reclamação"
                                    mode='flat'
                                />
                                {/* <TextInput
                                    style={{ borderRadius: 10, backgroundColor:'#fff' }}
                                    onChangeText={handleChange('circunstancia')}
                                    onBlur={handleBlur('circunstancia')}
                                    value={values.email}
                                    label="Circunstância reclamada"
                                    mode='flat'
                                /> */}
                                <TextInput
                                    style={{ borderRadius: 10, backgroundColor:'#fff' }}
                                    onChangeText={handleChange('pedido')}
                                    onBlur={handleBlur('pedido')}
                                    value={values.pedido}
                                    label="Pedido"
                                    mode='flat'
                                    multiline={true}
                                    numberOfLines={5}
                                />
                                <TextInput
                                    style={{ borderRadius: 10, backgroundColor:'#fff' }}
                                    onChangeText={handleChange('info_adicionais')}
                                    onBlur={handleBlur('info_adicionais')}
                                    value={values.info_adicionais}
                                    label="Informações Adicionais"
                                    mode='flat'
                                    multiline={true}
                                    numberOfLines={5}
                                />
                                <TextInput
                                    style={{ borderRadius: 10, marginBottom: 20, backgroundColor:'#fff' }}
                                    onChangeText={(event) => setFieldValue('dano_pretendido', formataMoeda(event))}
                                    onBlur={handleBlur('dano_pretendido')}
                                    value={values.dano_pretendido}
                                    label="Dano moral/material pretendido R$"
                                    mode='flat'
                                    name="dano_pretendido"
                                />
                            </ScrollView>
                            <Button icon="send" mode="contained" style={{ marginTop: 20, width: "100%", borderRadius: 15 }} loading={loading} color="purple" onPress={() => {
                                if (values.dano_pretendido === '') {
                                    setModal(true); setClose(false);
                                } else { 
                                    Actions.fileProcess({ values: values }) 
                                }

                            }}>Proximo</Button>
                        </>
                    )}
                </Formik>
                <Modal style={global.modal} onDismiss={modalClose} visible={modal}>
                    <ModalUpDown component={<AlertModal closeModal={modalClose} text={"Você precisa informar todos os dados!"} buttonText={"Ok"} buttonColor={"red"} icon={"alert-circle"} />}
                        open={modal} close={close} height={250}>
                    </ModalUpDown>
                </Modal>
            </View >
        );
    }
}