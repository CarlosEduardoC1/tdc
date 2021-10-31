import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const server = 'http://192.168.1.2:3000';

export const getCEP = async (cep) => {
    return await axios.post(server + "cep", { cep: cep })
        .then(response => { return response })
        .catch(error => { return error });
}

export const _makeCad = async (json) => {
    return await axios.post(server + "/users", json)
        .then(response => { return response })
        .catch(error => { return error });
}

export const _authentication = async (json) => {
    return await axios.post(`${server}/auth`, json)
}

export const _sendDocs = async (json) => {
    const token = await AsyncStorage.getItem('token');
    return await axios.post(`${server}/processos/create/process`, json, {
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + token
        }
    })
}

export const _verificaEmail = async (json) => {
    return await axios.post(`${server}/users/verificaemail`, json);
}

export const _getUserData = async (id) => {
    const token = await AsyncStorage.getItem('token');
    return await axios.get(`${server}/users/get-my/data/${id}`, {
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + token
        }
    });
}

export const _updateUserData = async (id, json) => {
    const token = await AsyncStorage.getItem('token');

    const response = await axios.post(`${server}/users/update-data/${id}`, json, {
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + token
        }
    });
    return response;
}

export const _deleteAccount = async (id) => {
    const token = await AsyncStorage.getItem('token');

    const response = await axios.delete(`${server}/users/${id}`, {
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + token
        }
    });
    return response;
}

export const _getMyProcess = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');

    const response = await axios.get(`${server}/processos/get/${id}`, {
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + token
        }
    });
    return response;
}

export const _getChat = async (user, processo) => {
    const token = await AsyncStorage.getItem('token');

    const response = await axios.get(`${server}/chat/get-messages/${user}/${processo}`, {
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + token
        }
    });
    return response;
}

export const _saveFaq = async (json) => {
    const token = await AsyncStorage.getItem('token');

    const response = await axios.post(`${server}/chat/set-message`, json, {
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + token
        }
    });
    return response;
}