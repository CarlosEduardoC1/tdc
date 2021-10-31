import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { _authentication, _getChat, _saveFaq } from '../../services';
import global from '../../styles/global-style';

export default function Chat(props) {
    const [message, setMessage] = useState('');
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([]);
    const scrollRef = useRef(null);

    const getChat = async () => {
        await _getChat(props.id_user, props.id_processo)
            .then(response => {
                // console.log(response.data);
                setConversation(response.data.duvida)
            })
            .catch(error => console.log(error));
    }

    const saveConversation = async () => {
        setLoading(true);
        conversation.push({ message: message, type: "send" });

        await _saveFaq({ id_user: props.id_user, id_processo: props.id_processo, duvida: conversation })
            .then(() => { setUpdate(!update); setLoading(false); setMessage(''); })
            .catch(() => { setUpdate(!update); setLoading(false); setMessage(''); });
    }


    useEffect(() => {
        getChat();
    }, [update]);

    return (
        <View style={global.pagesContainer}>
            <View style={{ width: "100%", alignItems: "center", justifyContent: "space-between", height: 80, backgroundColor: "#01A79C", flexDirection: "row", padding: 5, paddingTop: 30 }}>
                <IconButton icon="arrow-left" color="white" onPress={() => Actions.pop()} />
                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "white" }}>{props.processo}</Text>
            </View>
            <View style={{ height: "80%", width: "100%", padding: 15 }}>
                <ScrollView ref={scrollRef}
                    onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: true })}>
                    {conversation.map(message => {
                        if (message.type === 'send') {
                            return (
                                <View style={{ width: "100%", alignItems: "flex-end", marginRight: 15, marginTop: 5 }}>
                                    <Text style={{ textAlign: 'right', backgroundColor: "#93EDE9", borderRadius: 10, width: '80%', height: 40, padding: 10 }}>{message.message}</Text>
                                </View>
                            )
                        } else {
                            return (
                                <View style={{ width: "100%", alignItems: "flex-start", margin: 5 }}>
                                    <Text style={{ textAlign: 'left', backgroundColor: "#EDF7F7", borderRadius: 10, width: '80%', height: 40, padding: 10 }}>{message.message}</Text>
                                </View>
                            )
                        }
                    })}
                </ScrollView>
            </View>
            <View style={{ height: "15%", width: "100%", backgroundColor: "#f2f2f2", alignItems: "flex-start", justifyContent: "space-between", flexDirection: "row", padding: 10 }}>
                <TextInput style={{ width: "90%", height: 50 }}
                    mode="outlined"
                    placeholder="Mensagem"
                    onChangeText={text => setMessage(text)}
                    disabled={loading}
                    value={message}
                />
                <IconButton disabled={loading} icon="send" color="#01A79C" onPress={() => saveConversation()} />
            </View>

        </View>
    )
}