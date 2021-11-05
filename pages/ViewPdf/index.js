import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { _authentication, _getFiles, _saveFaq, _getFileName, _deleteProcessFile } from '../../services';
import global from '../../styles/global-style';
import Constants from 'expo-constants'

import PDFReader from 'rn-pdf-reader-js'
// import PDFView from 'react-native-view-pdf/lib/index';

export default function ViewPDF(props) {

    const base64PDF = "data:application/pdf;base64," + props.file;
    console.log(base64PDF);

    return (
        <View style={{ flex: 1 }}>
            <View style={global.navbar}>
            </View>
            <View>
                <PDFReader
                    style={{ height: 500, width: '100%' }}
                    withPinchZoom={true}
                    maximumPinchZoomScale={3}
                    webviewProps={{
                        startInLoadingState: true
                    }}
                    source={{
                        base64: base64PDF
                        // uri: 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
                    }}
                />
            </View>
            {/* <WebView
                javaScriptEnabled={true}
                // scalesPageToFit={false}
                style={{ height: "100%", width: "100%" }}
                source={{
                    html: `
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <div>
                <iframe srcdoc="data:application/pdf;base64,${props.file}"></iframe>
                </div>`
                }}
                // source={{ uri: '' }}
            /> */}
            {/* <PDFView
                fadeInDuration={250.0}
                style={{ flex: 1 }}
                resource={props.file}
                resourceType={resourceType}
                onLoad={() => console.log(`PDF rendered from base64`)}
                onError={(error) => console.log('Cannot render PDF', error)}
            /> */}
        </View>
    )
}
