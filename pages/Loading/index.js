import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import LottieView from 'lottie-react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { _authentication } from '../../services';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Loading() {
    const [status, setStatus] = useState({});
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "You've got mail! 📬",
                body: 'Here is the notification body',
                data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        await AsyncStorage.setItem('appId', token);
        return token;
    }

    const getid = async () => {
        // await AsyncStorage.setItem('password', '1234567890');
        const dataID = await AsyncStorage.getItem('id');
        if (dataID !== null) {
            const email = await AsyncStorage.getItem('email');
            const password = await AsyncStorage.getItem('password');

            await _authentication({ email, password })
                .then(async response => {
                    await AsyncStorage.setItem('token', response.data.token);
                    // Actions.tabs();
                    Actions.login();
                })
                .catch(() => {
                    // Actions.tabs();
                    Actions.login();
                })
            // Actions.tabs(); 
            // Actions.login();
        } else {
            await AsyncStorage.setItem('token', 'undefined');
            Actions.login()
        }

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }


    useEffect(() => { getid(); }, [])
    return (
        <View style={styles.container}>
            <LottieView source={require('../../assets/animation/loading.json')} autoPlay loop />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
