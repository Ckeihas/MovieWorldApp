import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/Moviedb";

var { width, height } = Dimensions.get('window');

export default function TrendingMovies({data}){
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie', item)
    }
    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Trending</Text>
            <Carousel 
            data={data}
            renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
            firstItem={1}
            inactiveSlideOpacity={0.6}
            sliderWidth={width}
            itemWidth={width*0.62}
            slideStyle={{display: 'flex', alignItems: 'center'}}
            />
        </View>
    )
}

const MovieCard = ({item, handleClick}) => {
    return(
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image 
            source={{uri: image500(item.poster_path)}}
            style={[{
                width: width*0.6,
                height: height*0.4
            }, styles.trendingMovieImg]}
            
            />
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24
    },
    headerText: {
        color: 'white',
        marginHorizontal: 24,
        fontSize: 20,

        marginBottom: 32
    },
    trendingMovieImg: {
        borderRadius: 20
    },
})