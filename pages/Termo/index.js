import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Button } from 'react-native-paper';
import text from './text';
import { Actions } from 'react-native-router-flux';
import global from '../../styles/global-style';


export default function Termo() {
    const [checked, setChecked] = useState(false);

    return (
        <View style={global.container}>
        <View style={global.navbar}>
        </View>
            <ScrollView style={{ marginTop: 10, padding: 15 }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'justify' }}>{text}</Text>
            </ScrollView>
            <View style={{ width: "100%", height: 120, backgroundColor: "#fff", alignItems: "center", padding: 10 }}>
                <CheckBox
                    checked={checked}
                    checkedColor="#0F0"
                    checkedTitle="Li e aceito os termos de uso"
                    containerStyle={{ width: "100%" }}
                    onIconPress={() => setChecked(!checked)}
                    size={15}
                    textStyle={{}}
                    title="Confirmar leitura dos termos de uso"
                    uncheckedColor="#F00"
                />
                <Button icon="send" mode="contained" style={{ width: "100%", borderRadius: 15, marginTop: 10, marginBottom: 10 }}
                    color="purple" disabled={!checked} onPress={() => Actions.cadastro()}>Prosseguir</Button>
            </View>
        </View>
    );
}