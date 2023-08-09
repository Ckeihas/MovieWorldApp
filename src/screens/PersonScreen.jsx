import {View, Text, Dimensions, Platform, Image, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity,} from "react-native";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid";
import { fontstyles, theme } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from "../api/Moviedb";


var {width, height} = Dimensions.get('window')
var ios = Platform.OS == 'ios';

export default function PersonScreen(){
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [personDetails, setPersonDetails] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id)
        getPersonMovies(item.id)
    },[item])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        if(data) setPersonDetails(data);
        setLoading(false);
    }

    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id)
        if(data && data.cast) setPersonMovies(data.cast);
    }
    return(
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 20}}>

            <SafeAreaView style={styles.safeAreaCont}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.iconCont, fontstyles.background]}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color='white'/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size={35} color={isFavourite ? theme.background : 'white'} style={styles.iconCont}/>
                </TouchableOpacity>
            </SafeAreaView>

            {/* Person Details */}
            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <View style={styles.personDetailsCont}>
                            <View style={styles.imgCont}>
                                <Image 
                                source={{uri: image342(personDetails?.profile_path) || fallbackPersonImage}}
                                style={{height: height*0.43, width: width*0.74}}
                                />
                            </View>
                        </View>

                        <View style={styles.nameLocationCont}>
                            <Text style={styles.name}>
                                {
                                    personDetails?.name
                                }
                            </Text>
                            <Text style={styles.location}>
                                {
                                    personDetails?.place_of_birth
                                }
                            </Text>
                        </View>
                        {/* General info */}
                        <View style={styles.generalInfoCont}>
                            <View style={styles.generalInfoContChild}>
                                <Text style={styles.upperPlaceHolder}>
                                    Gender
                                </Text>
                                <Text style={styles.generalInfo}>
                                    {
                                        personDetails?.gender == 1 ? 'Female' : 'Male'
                                    }
                                </Text>
                            </View>
                            <View style={styles.generalInfoContChild}>
                                <Text style={styles.upperPlaceHolder}>Birthday</Text>
                                <Text style={styles.generalInfo}>
                                    {
                                        personDetails?.birthday
                                    }
                                </Text>
                            </View>
                            <View style={styles.generalInfoContChild}>
                                <Text style={styles.upperPlaceHolder}>Known for</Text>
                                <Text style={styles.generalInfo}>
                                    {
                                        personDetails?.known_for_department
                                    }
                                </Text>
                            </View>
                            <View style={{alignItems: 'center', paddingHorizontal: 12,}}>
                                <Text style={styles.upperPlaceHolder}>Popularity</Text>
                                <Text style={styles.generalInfo}>
                                    {/* .toFixed(2) popularity perään ei toimi? */}
                                    {
                                        personDetails?.popularity
                                    } %
                                </Text>
                            </View>
                        </View>

                        {/* Biography */}
                        <View style={styles.bioGraphyCont}>
                            <Text style={styles.bioHeader}>Biography</Text>
                            <Text style={styles.bioText}>
                                {
                                    personDetails?.biography || 'N/A'
                                }
                            </Text>
                        </View>

                        {/* Persons movies */}
                        <MovieList title={'Movies'} hideSeeAll={true} data={personMovies}/>
                    </View>
                )
            }
            
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c1c1c',
        flex: 1,
    },
    safeAreaCont: {
        zIndex: 20,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconCont: {
        borderRadius: 14,
        padding: 8,
        marginHorizontal: 24,
    },
    personDetailsCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: 'gray',
        shadowRadius: 40,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1
    },
    imgCont: {
        alignItems: 'center',
        borderRadius: 1000,
        overflow: 'hidden',
        height: 288,
        width: 288,   
    },
    nameLocationCont: {
        marginTop: 48
    },
    name: {
        fontSize: 30,
        lineHeight: 36,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    location: {
        fontSize: 16,
        lineHeight: 30,
        color: 'gray',
        textAlign: 'center'
    },
    generalInfoCont: {
        marginHorizontal: 16,
        marginTop: 36,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#545454',
        borderRadius: 50
    },
    generalInfoContChild: {
        borderRightWidth: 2,
        borderColor: 'lightgray',
        paddingHorizontal: 7,
        alignItems: 'center'
    },
    upperPlaceHolder: {
        color: 'white',
        fontWeight: '600'
    },
    generalInfo: {
        color: 'lightgray',
        fontSize: 14,
        lineHeight: 20
    },
    bioGraphyCont: {
        marginVertical: 48,
        marginHorizontal: 24,
        marginTop: 12
    },
    bioHeader: {
        color: 'white',
        fontSize: 18,
        lineHeight: 28,
        marginBottom: 8
    },
    bioText: {
        color: 'lightgray',
        letterSpacing: 0.4
    }
});