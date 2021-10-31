import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Image } from 'react-native-paper';
import { View } from 'react-native';

const CardButtons = () => (
    <View style={{ width: "95%", height: "50%", padding: 5, flexDirection: 'row', flexWrap: 'wrap', justifyContent:"space-between" }}>
        <Card style={{ height: "30%", width: "45%", marginTop: 15, backgroundColor: '#f1f1f1' }}>
            <Card.Content style={{ alignItems: "center" }}>
                <Card.Cover source={require('../../assets/img/novo_processo.png')} style={{ height: 50, width: 50, backgroundColor: '#fff' }} />
                <Title>Novo Processo</Title>
            </Card.Content>
        </Card>
        <Card style={{ height: "30%", width: "45%", marginTop: 15, backgroundColor: '#f1f1f1' }}>
            <Card.Content style={{ alignItems: "center", justifyContent:"center" }}>
                <Card.Cover source={require('../../assets/img/acompanhar_processo.png')} style={{ height: 50, width: 50, backgroundColor: '#fff' }} />
                <Title>Meus Processos</Title>
            </Card.Content>
        </Card>
        <Card style={{ height: "30%", width: "45%", marginTop: 15, backgroundColor: '#f1f1f1' }}>
            <Card.Content style={{ alignItems: "center" }}>
                <Card.Cover source={require('../../assets/img/question.png')} style={{ height: 50, width: 50, backgroundColor: '#fff' }} />
                <Title>Dúvidas</Title>
            </Card.Content>
        </Card>
    </View>
);

export default CardButtons;