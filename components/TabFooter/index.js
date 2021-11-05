import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Feather} from 'react-native-vector-icons';

import MainScreen from '../../pages/Main';
import CadProcesso from '../../pages/Processo/Cadastrar';
import Perfil from '../../pages/Perfil';
import ViewProcess from '../../pages/viewProcess';

const initialLayout = { width: Dimensions.get('screen').width };

const getTabBarIcon = props => {
    const { route } = props

    if (route.key === 'novo') {
        return <Feather name='file-plus' size={20} color={'#fff'} />
    }
    if (route.key === 'lista') {
        return <Feather name='copy' size={20} color={'#fff'} />
    }
    if (route.key === 'home') {
        return <Feather name='home' size={20} color={'#fff'} />
    }
    if (route.key === 'config') {
        return <Feather name='settings' size={20} color={'#fff'} />
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
        novo: () => <CadProcesso />,
        lista: () => <ViewProcess />,
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
                    style={{ backgroundColor: "#003380" }}
                    indicatorStyle={{ backgroundColor: '#66a3ff', height: "100%" }}
                    renderIcon={props => getTabBarIcon(props)}
                    onTabPress={handleOpenModal}
                />}
        />
    );
}