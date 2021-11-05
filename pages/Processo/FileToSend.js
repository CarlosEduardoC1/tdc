import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { _sendDocs } from '../../services';
import { WebView } from 'react-native-webview';
import { html } from './index';
import global from '../../styles/global-style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import { useToast } from 'native-base';



export default function FileProcess(props) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  let files = [];
  let names = [];
  const setInFiles = (data) => {
    if (data.indexOf("name") > -1) {
      toast.show({
        title: "Sucesso!",
        status: "success",
        description: "O arquivo " + data.slice(4) + " foi adicionado com sucesso!",
        placement: "top-right",
      })
      names.push(data.slice(4));
    } else {
      files.push(data);
    }
  }

  const createProcess = async () => {
    setLoading(true);
    let id_user = await AsyncStorage.getItem('id');
    props.values.files = files;
    props.values.id_user = id_user;
    props.values.lo_status = "A";
    props.values.names = names;

    const response = await _sendDocs(props.values)
    if (response.status === 200) {
      setLoading(false);
      Actions.success({ buttonColor: "#fff", text: "Processo cadastrado com sucesso", buttonText: "Ir para tela inicial", press: () => { Actions.tabs() } });
    }
    else {
      setLoading(false);
      toast.show({
        title: "Ops...",
        status: "error",
        description: "Erro ao cadastrar. Tente novamente!",
        placement: "top-right",
      })
    }
  }



  return (
    <View style={{ flex: 1 }}>
      <View style={global.navbar}>
      </View>
      <WebView
        source={{ html: html }}
        onMessage={(event) => setInFiles(event.nativeEvent.data)}
      />
      <View style={{ width: "100%", alignItems: "center", justifyContent: "flex-start", height: '80%', backgroundColor: "#fff" }}>
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