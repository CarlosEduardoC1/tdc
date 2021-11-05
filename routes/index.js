import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Success from '../components/Success';
import TabFooter from '../components/TabFooter';
import global from '../styles/global-style';
import Cadastro from '../pages/Cadastro';
import Documentation from '../pages/Cadastro/documentation';
import Loading from '../pages/Loading';
import Login from '../pages/Login';
import MainScreen from '../pages/Main';
import FileProcess from '../pages/Processo/FileToSend';
import Termo from '../pages/Termo';
import Chat from '../pages/chat';
import ViewFiles from '../pages/viewProcess/ViewFiles';
import ViewPDF from '../pages/ViewPdf';


export default class Routes extends Component {
    render() {
        return (
            <Router navigationBarStyle={global.navigation}>
                <Scene key='login' component={Login} hideNavBar={true} title="Login" />
                <Scene key='load' component={Loading} hideNavBar={true} title="Loading" initial />
                <Scene key='success' component={Success} hideNavBar={true} title="" />
                <Scene key='cadastro' component={Cadastro} hideNavBar={false} title="" titleStyle={global.titleStyle} leftButtonIconStyle={global.leftWhiteButton} />
                <Scene key='sendDocs' component={Documentation} hideNavBar={false} title='' titleStyle={global.titleStyle} leftButtonIconStyle={global.leftWhiteButton} />
                <Scene key='tabs' component={TabFooter} hideNavBar={true} title='tabs' />
                <Scene key='fileProcess' component={FileProcess} hideNavBar={false} title='Documentação' titleStyle={global.titleWhite} leftButtonIconStyle={global.leftWhiteButton} />
                <Scene key='termo' component={Termo} hideNavBar={false} title="Termos de uso" titleStyle={global.titleWhite} leftButtonIconStyle={global.leftWhiteButton} direction="vertical" />
                <Scene key="chat" component={Chat} hideNavBar={true} title="Chat" titleStyle={global.titleWhite} leftButtonIconStyle={global.leftBlackButton} direction="vertical" />
                <Scene key="viewFiles" component={ViewFiles} hideNavBar={true} title="Arquivos" titleStyle={global.titleWhite} leftButtonIconStyle={global.leftBlackButton} direction="vertical" />
                <Scene key="viewPdf" component={ViewPDF} hideNavBar={true} title="PDF" titleStyle={global.titleWhite} leftButtonIconStyle={global.leftBlackButton} direction="vertical" />
            </Router>
        )
    }
}