import React, { useState } from 'react';
import { View } from 'react-native';
import ModalUpDown from '../../components/Modalize';
import Form from './Form';
import ContentModal from './modalContent';
import global from '../../styles/global-style';

export default function CadProcesso(props) {

    const [servico, setServico] = useState('');
    const [close, setClose] = useState(false);

    const changeService = (retorno) => { setServico(retorno); setClose(true); }

    return (
        <View style={global.container}>
            <ModalUpDown component={<ContentModal changeService={changeService} />} height={250} open={props.modal} close={close} />
            {close ? <Form servico={servico} /> : null}
        </View >
    );
}