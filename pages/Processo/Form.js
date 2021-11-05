import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { _sendDocs } from '../../services';
import { Actions } from 'react-native-router-flux';
import { formataMoeda } from '../../utils/utils';
import global from '../../styles/global-style';
import { useToast } from 'native-base';

export default function Form(props) {
    const toast = useToast();

    if (props.servico === 'Processo') {
        return (
            <View style={global.pagesContainer}>
                <Formik
                    initialValues={{ reclamacao: '', pedido: '', info_adicionais: '', dano_pretendido: '' }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                        <>
                            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", height: 100, backgroundColor: "#003380" }}>
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
                                    style={{ borderRadius: 10, backgroundColor: '#fff' }}
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
                                    style={{ borderRadius: 10, backgroundColor: '#fff' }}
                                    onChangeText={handleChange('pedido')}
                                    onBlur={handleBlur('pedido')}
                                    value={values.pedido}
                                    label="Pedido"
                                    mode='flat'
                                    multiline={true}
                                    numberOfLines={5}
                                />
                                <TextInput
                                    style={{ borderRadius: 10, backgroundColor: '#fff' }}
                                    onChangeText={handleChange('info_adicionais')}
                                    onBlur={handleBlur('info_adicionais')}
                                    value={values.info_adicionais}
                                    label="Informações Adicionais"
                                    mode='flat'
                                    multiline={true}
                                    numberOfLines={5}
                                />
                                <TextInput
                                    style={{ borderRadius: 10, marginBottom: 20, backgroundColor: '#fff' }}
                                    onChangeText={(event) => setFieldValue('dano_pretendido', formataMoeda(event))}
                                    onBlur={handleBlur('dano_pretendido')}
                                    value={values.dano_pretendido}
                                    label="Dano moral/material pretendido R$"
                                    mode='flat'
                                    name="dano_pretendido"
                                />
                            </ScrollView>
                            <Button icon="send" mode="contained" style={{ width: "90%", borderRadius: 15, margin: 15 }} color="purple" onPress={() => {
                                if (values.dano_pretendido === '') {
                                    toast.show({
                                        title: "Ops...",
                                        status: "error",
                                        description: "Todos os dados precisam ser informados.",
                                        placement: "top-right",
                                    })
                                } else {
                                    Actions.fileProcess({ values: values })
                                }

                            }}>Proximo</Button>
                        </>
                    )}
                </Formik>
            </View >
        );
    }
}