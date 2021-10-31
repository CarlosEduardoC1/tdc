import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import { _getUserData } from '../../services';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import AtualizaPerfil from './AtualizaPerfil';
import perfilStyle from '../../styles/perfil-style';

export default function ContentPlans(props) {
    if (props.interface === 'planos') {
        return (
            <>
                <TouchableHighlight underlayColor="transparent" onPress={() => props.close()}>
                    <Text style={perfilStyle.plansTextClose}>X FECHAR</Text>
                </TouchableHighlight>
                <View style={perfilStyle.plansContainer}>
                    <View style={perfilStyle.plansContent}>
                        <View style={perfilStyle.plansViews}>
                            <Avatar.Icon icon="airplane-takeoff" size={50} style={perfilStyle.plansAvatarBg} color="blue" />
                            <View style={perfilStyle.plansContentView}>
                                <Text>Contratado</Text>
                                <Text style={perfilStyle.plansContentText}>{props.modificador.nome_plano}</Text>
                            </View>
                        </View>
                        <View style={perfilStyle.plansViews}>
                            <Avatar.Icon icon="update" size={50} style={perfilStyle.plansAvatarBg} color="red" />
                            <View style={perfilStyle.plansContentView}>
                                <Text>Vencimento</Text>
                                <Text style={perfilStyle.plansContentText}>{props.modificador.data_vencimento === 'vitalicio' ? 'Vitalício' : moment(props.modificador.data_vencimento).format("DD/MM/YYYY")}</Text>
                            </View>
                        </View>
                        <View style={perfilStyle.plansViews}>
                            <Avatar.Icon icon="cash" size={50} style={perfilStyle.plansAvatarBg} color="yellow" />
                            <View style={perfilStyle.plansContentView}>
                                <Text>Valor Pago</Text>
                                <Text style={perfilStyle.plansContentText}>R${props.modificador.valor}</Text>
                            </View>
                        </View>
                        <View style={perfilStyle.plansViews}>
                            <Avatar.Icon icon="calendar" size={50} style={perfilStyle.plansAvatarBg} color="green" />
                            <View style={perfilStyle.plansContentView}>
                                <Text>Data de Contratação</Text>
                                <Text style={perfilStyle.plansContentText}>{moment(props.modificador.createdAt).format("DD/MM/YYYY")}</Text>
                            </View>
                        </View>
                    </View>
                    <Button style={perfilStyle.plansButton} {...perfilStyle.plansButtonProps}
                        onPress={() => { Actions.planos(); props.close(); }}>Mudar de plano</Button>
                </View >
            </>
        )
    } else {
        return <AtualizaPerfil data={props.update} close={props.close} updateProfilePage={props.updateProfilePage} />
    }
}