import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { TextInput, IconButton, Button } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { _authentication, _getFiles, _saveFaq, _getFileName, _deleteProcessFile } from '../../services';
import global from '../../styles/global-style';
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';
import FileProcess from '../Processo/FileToSend';
import FileUpdate from './FileUpdate';

export default function ViewFiles(props) {
    const [message, setMessage] = useState('');
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [files, setFiles] = useState([]);
    const [name, setName] = useState();
    const scrollRef = useRef(null);

    const getFiles = async () => {
        await _getFileName(props.id_user, props.id_processo)
            .then(response => setFiles(response.data));
    }
    const deleteFile = async () => {
        console.log(name);
        setLoading(true);
        await _deleteProcessFile({ name: name }).then(() => {
            setLoading(false);
            alert("Arquivo deletado com sucesso!");
            setUpdate(!update);
            setIsVisible(false);
        }).catch(() => {
            setLoading(false);
            alert("Erro ao arquivo processo. Tente novamente!");
            setUpdate(!update);
            setIsVisible(false);
        })
    }

    const rerender = () => setUpdate(!update);


    useEffect(() => {
        getFiles();
    }, [update]);

    return (
        <View style={global.pagesContainer}>
            <View style={{ width: "100%", alignItems: "center", justifyContent: "space-between", height: 80, backgroundColor: "#01A79C", flexDirection: "row", padding: 5, paddingTop: 30 }}>
                <IconButton icon="arrow-left" color="white" onPress={() => Actions.pop()} />
                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "white" }}>{props.processo}</Text>
            </View>
            <View style={{ height: "40%", width: "100%", padding: 15 }}>
                <Text>ARQUIVOS NO PROCESSO</Text>
                <ScrollView style={{ heigh: "30%", width: "100%", marginTop: 15 }}>
                    {files.map((file, index) => {
                        const name = file.name.replace(".txt", "");
                        const nameUser = name.replace(props.id_user, "");
                        const nameProcess = nameUser.replace(props.id_processo, "");
                        const nameUnder = nameProcess.replace("__", "");



                        return (
                            <View key={index} style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 10, backgroundColor: "#F5F5F5", height: 50, padding: 15 }}>
                                <Text>{nameUnder}</Text>
                                <IconButton icon="delete" size={20} color="red" onPress={() => { setIsVisible(true); setName(file.name); }} />
                                {/* <TouchableHighlight underlayColor="transparent" onPress={() => { setIsVisible(true) }}>
                                    <Text>X</Text>
                                </TouchableHighlight> */}
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <FileUpdate id_user={props.id_user} id_processo={props.id_processo} render={rerender} />
            <BottomSheet
                isVisible={isVisible}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
                <View style={{ width: "100%", backgroundColor: "white", height: 150, padding: 15 }}>
                    <View style={{ height: 80, alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Deseja excluir permanentemente este arquivo ?</Text>
                    </View>
                    <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
                        <Button
                            icon="delete"
                            color="red"
                            style={{ backgroundColor: "#ff5050" }}
                            mode="contained"
                            loading={loading}
                            disabled={loading}
                            onPress={() => deleteFile()}
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
        </View>
    )
}