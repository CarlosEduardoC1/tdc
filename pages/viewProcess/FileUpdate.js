import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { _sendDocs, _updateProcessFile } from '../../services';
import { WebView } from 'react-native-webview';
import { html } from '../Processo/index';
import global from '../../styles/global-style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';



export default function FileUpdate(props) {
    const [loading, setLoading] = useState(false);

    let files = [];
    let names = [];
    const setInFiles = (data) => {
        if (data.indexOf("name") > -1) {
            alert(data.slice(4) + " foi adicionado com sucesso!");
            names.push(data.slice(4));
        } else {
            files.push(data);
        }
    }

    const createProcess = async () => {
        setLoading(true);
        let json = {
            files, id_user: props.id_user, id_processo: props.id_processo, names
        }

        const response = await _updateProcessFile(json)
        if (response.status === 200) {
            setLoading(false);
            props.render();
            alert("Processo atualizado com sucesso");
        }
        else {
            setLoading(false);
            alert("Erro ao atualizar processo. Tente novamente.");
        }
    }



    return (
        <View style={{ flex: 1 }}>
            <WebView
                automaticallyAdjustContentInsets={false}
                // scalesPageToFit={false}
                style={{ height: 700, width: "100%" }}
                source={{ html: html }}
                onMessage={(event) => setInFiles(event.nativeEvent.data)}
            />
            <View style={{ width: "100%", alignItems: "center", justifyContent: "flex-start", height: '70%', backgroundColor: "#fff" }}>
                <Text>Clique no botão acima para selecionar os arquivos do processo</Text>
                {names.map(e => <Text>{e}</Text>)}
                <View style={{ width: "100%", height: "95%", justifyContent: "flex-end", alignItems: "center" }}>
                    <Button loading={loading} disabled={loading} style={global.sendButton} {...global.sendButtonProps} onPress={() => createProcess()}>
                        Enviar dados</Button>
                </View>
            </View>
        </View>
    );
}