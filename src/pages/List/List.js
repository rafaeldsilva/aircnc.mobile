import React, { useState, useEffect } from  'react';
import { SafeAreaView, ScrollView, Image, AsyncStorage }  from 'react-native';
import logo from '../../assets/logo.png';
import style from './List.Style';
import SpotList from '../../components/SpotList';

export default function List() {
        
    const [ techs, setTechs] = useState([]);

    useEffect(() => {

        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim()); 
            
          //  AsyncStorage.removeItem('user');
           //AsyncStorage.removeItem('techs');
            setTechs(techsArray);  
        })
        
    }, [])
 
    return (
        <SafeAreaView style={style.container}>
            <Image style={style.logo} source={logo}></Image>
            <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    );
}