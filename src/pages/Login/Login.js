import React, { useState, useEffect } from  'react';
import { View, AsyncStorage, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity  }  from 'react-native';
import api from '../../services/Api';
import logo  from '../../assets/logo.png'
import style from './Login.Style';

export default function Login({ navigation }) {

    const [email, setEmail] = useState();
    const [techs, setTechs] = useState();
    
    useEffect(() => {

        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('List');
            }            
        })

    }, []);

    async function handleSubmit() {

        const response = await api.post('/sessions', { email });
        const { _id } = response.data;
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);
        navigation.navigate('List');
        
    }

    return  (
        <KeyboardAvoidingView behavior="padding" style={style.container}>
            <Image source={logo} />
            <View style={style.form}>
                <Text style={style.labelEmail}>SEU E-MAIL *</Text>
                <TextInput 
                    style={style.input} 
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={style.labelTech}>TECNOLOGIAS *</Text>
                <TextInput 
                    style={style.input} 
                    placeholder="Ex. NodeJS, React, ReactNative"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={style.button}>
                    <Text style={style.buttonText}>Encontrar Spots</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}

