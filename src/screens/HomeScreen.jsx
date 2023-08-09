import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { fontstyles } from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import axios from "axios";


import { Container } from "../styles/HomeScreenStyle";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/Moviedb";

const ios = Platform.OS == 'ios'
export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect( () => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    },[])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if(data && data.results) setTrending(data.results);
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if(data && data.results) setUpcoming(data.results);
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if(data && data.results) setTopRated(data.results);
    }

    return(
        <Container>
            <SafeAreaView style={ios ? {marginBottom: -12} : {marginBottom: 16}}>
                <StatusBar />
                <View style={styles.iconCont}>
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color='white'/>
                    <Text style={styles.moviesText}>
                        <Text style={fontstyles.text}>M</Text>ovie<Text style={fontstyles.text}>W</Text>orld
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color='white'/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? (<Loading />) :
                (
                    <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 10}}
                    >
                        {/*Trending movie carousel*/}
                        {trending.length > 0 && <TrendingMovies data={trending}/>}

                        {/*Upcoming movies row*/}
                        <MovieList title="Upcoming" data={upcoming}/>

                        {/*Toprated movies row*/}
                        <MovieList title="Top Rated" data={topRated}/>
                    </ScrollView>
                )
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        marginBottom: 12
    },
    iconCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 24
    },
    moviesText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28
    }
})