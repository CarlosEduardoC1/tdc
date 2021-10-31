import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import global from '../../styles/global-style';

export default function AlertModal(props) {

    return (
        <View style={global.container}>
            <Avatar.Icon icon={props.icon} color={props.buttonColor} size={100} style={{ backgroundColor: '#fff' }} />
            <Text>{props.text}</Text>
            <Button color={props.buttonColor} onPress={props.closeModal}>{props.buttonText}</Button>
        </View >
    );
}