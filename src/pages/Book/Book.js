import React, { useState } from  'react';
import { SafeAreaView, Alert, AsyncStorage, Text, TextInput, TouchableOpacity }  from 'react-native';
import style from './Book.Style';
import api from '../../services/Api';

export default function Book({ navigation }) {
    const [ date, setDate ] = useState('');
    const id = navigation.getParam('id');

    async  function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
        console.log(user_id);

        await api.post(`/spot/${id}/bookings`, { date }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.labelDate}>DATA DE INTERESSE *</Text>
                <TextInput 
                    style={style.input} 
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />

                <TouchableOpacity onPress={handleSubmit} style={style.button}>
                    <Text style={style.buttonText}>Solicitar Reserva</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancel} style={[style.button, style.cancelButton]}>
                    <Text style={style.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
} 