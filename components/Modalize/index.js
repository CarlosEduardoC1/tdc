import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';

export default function ModalUpDown(props) {
    const modalRef = useRef(null);
    
    useEffect(() => {
        if (props.close) {
            modalRef.current?.close();
        } else {
            props.open ? modalRef.current?.open() : null;
        }
    }, [props.close]);

    return (
        <Modalize
            ref={modalRef}
            snapPoint={props.height}
            modalHeight={props.height}
            handlePosition="outside"
            modalStyle={{ padding: 15 }}>
            <View>
                {props.component}
            </View>
        </Modalize>
    );
}