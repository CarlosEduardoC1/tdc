import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button, Menu, Divider, Provider, List } from 'react-native-paper';

export default function ContentModal(props) {

    const [expanded, setExpanded] = React.useState(false);

    const handlePress = () => setExpanded(!expanded);

    return (
        <List.Accordion
            title="Selecione o serviço desejado"
            right={props => expanded ?
                <List.Icon {...props} icon="chevron-up" color="white" style={{ height: 15 }} />
                : <List.Icon {...props} icon="chevron-down" color="white" style={{ height: 15 }} />}
            titleStyle={{ color: "white" }}
            expanded={expanded}
            onPress={handlePress}
            style={{ backgroundColor: "blue", borderRadius: 10 }}>
            <List.Item title="Consultoria" value="consultoria" onPress={() => props.changeService('Consultoria')} left={props => <List.Icon {...props} icon='account-convert' />} />
            <List.Item title="Processo" onPress={() => props.changeService('Processo')} left={props => <List.Icon {...props} icon='folder' />} />
            <List.Item title="Outros " onPress={() => props.changeService('Outros')} left={props => <List.Icon {...props} icon='animation-outline' />} />
        </List.Accordion>

    );
}