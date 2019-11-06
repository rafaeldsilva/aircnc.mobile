import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import api from '../services/Api';
import style from './SpotList.Style';

function SpotList({ tech, navigation }) {

    const [spots, setSpots] = useState();

    useEffect(()=> {

        async function LoadSpot() {
            const response = await api.get('/spots', {
                params : { tech }
            })
            console.log(response.data);
            setSpots(response.data);
        }

        LoadSpot();

    }, []);

    function handleNavigate(id) {
        navigation.navigate('Book', { id });
    }

    return (
        <View style={style.container}>
            <Text style={style.title}>
                Empresas que usam <Text style={style.bold}>{tech}</Text>
            </Text>
            <FlatList 
                style={style.list}
                data={spots} 
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                   <View style={style.listItem}>
                       <Image style={style.thumbnail} source={{ uri: item.thumbnail_url }}/>
                       <Text style={style.company}>{item.company}</Text>
                       <Text style={style.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                       <TouchableOpacity onPress={() => handleNavigate(item._id)} style={style.button}>
                            <Text style={style.buttonText}>Solicitar reserva</Text>
                       </TouchableOpacity>
                   </View>  
                )}  
            />
        </View>
    );
}

export default withNavigation(SpotList);