import * as React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AntIcons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainScreen from '../../pages/Main';
import CadProcesso from '../../pages/Processo/Cadastrar';
import Perfil from '../../pages/Perfil';
import ViewProcess from '../../pages/viewProcess';
import Chat from '../../pages/chat';

const initialLayout = { width: Dimensions.get('screen').width };

const getTabBarIcon = props => {
    const { route } = props

    if (route.key === 'novo') {
        return <AntIcons name='addfile' size={20} color={'grey'} />
    }
    if (route.key === 'lista') {
        return <MaterialIcons name='dashboard' size={20} color={'grey'} />
    }
    if (route.key === 'faq') {
        return <MaterialIcons name='question-answer' size={20} color={'grey'} />
    }
    if (route.key === 'home') {
        return <AntIcons name='home' size={20} color={'grey'} />
    }
    if (route.key === 'config') {
        return <AwesomeIcon name='gear' size={20} color={'grey'} />
    }
}

export default function TabFooter() {
    const [index, setIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [routes] = React.useState([
        { key: 'home' },
        { key: 'novo' },
        { key: 'lista' },
        // { key: 'faq' },
        { key: 'config' },
    ]);

    const handleOpenModal = () => setOpen(true);

    const renderScene = SceneMap({
        home: () => <MainScreen foo={"dido"} />,
        novo: () => <CadProcesso modal={open} />,
        lista: () => <ViewProcess />,
        // faq: () => <Chat />,
        config: () => <Perfil />,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            tabBarPosition="bottom"
            swipeEnabled={false}
            renderTabBar={props =>
                <TabBar
                    {...props}
                    style={{ backgroundColor: '#f2f2f2' }}
                    indicatorStyle={{ backgroundColor: 'red' }}
                    renderIcon={props => getTabBarIcon(props)}
                    tabStyle={styles.bubble}
                    labelStyle={styles.noLabel}
                    onTabPress={handleOpenModal}
                />}
        />
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});