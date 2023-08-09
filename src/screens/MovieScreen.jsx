import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Platform, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { fontstyles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "../api/Moviedb";

var { width, height } = Dimensions.get('window');

export default function MovieScreen(){
    const {params: item} = useRoute();
    const navigation = useNavigation();

    const [isFavourite, toggleFavourite] = useState(false);
    const [cast, setCast] = useState([])
    const [similar, setSimilar] = useState([])
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});

    const movieName = "Cristopher Nolan's: Oppenheimer"
    useEffect(() => {
        setLoading(true)
        getMoviesDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    },[item])

    const getMoviesDetails = async id => {
        const data = await fetchMovieDetails(id)
        if(data) setMovie(data)
        setLoading(false)
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id)
        if(data && data.cast) setCast(data.cast)
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id)
        if(data && data.results) setSimilar(data.results)
    }
    return(
        <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        style={styles.scrollViewCont}
        >
            <View>
                <SafeAreaView style={styles.safeAreaCont}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.iconCont, fontstyles.background]}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color='white'/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size={35} color={isFavourite ? theme.background : 'white'}/>
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ) :
                    (
                        <View>
                            <Image 
                            source={{uri: image500(movie?.poster_path) || fallbackMoviePoster}}
                            style={{width, height: height*0.55}}
                            />
                            {/* rgba väreiksi 23 23 23 */}
                            <LinearGradient 
                            colors={['transparent', 'rgba(28, 28, 28, 0.8)', 'rgba(28, 28, 28, 1)']}
                            style={[{width, height: height*0.40}, styles.linGradient]}
                            start={{x: 0.5, y: 0}}
                            end={{x: 0.5, y: 1}}
                            />
                        </View>
                    )
                }
                
            </View>

            {/* Movie details */}
            <View style={styles.movieDetailCont}>
                <Text style={styles.movieHeader}>
                    {
                        movie?.title
                    }
                </Text>
                
                {/* Status, realease, time */}
                {
                    movie?.id ? (
                        <Text style={styles.movieGeneralText}>
                            {movie?.status} • {movie?.release_date.split('-')[0]} • {movie?.runtime} min
                        </Text>
                    ) : null
                }
                

                {/* Genres */}
                <View style={styles.genresCont}>
                    {                      
                        movie?.genres?.map((genre, index) => {
                            let showDot = index+1 != movie.genres.length
                            return(
                                <Text style={styles.genresText} key={index}>
                                    {genre?.name} {showDot ? '• ' : null}
                                </Text>
                            )                  
                        })
                    }
                </View>

                {/* Description */}
                <Text style={styles.descriptionText}>
                    {
                        movie?.overview
                    }
                </Text>

                {/* Cast */}
                <Cast navigation={navigation} cast={cast}/>

                {/* Similar movies */}
                <MovieList title='Similar Movies' hideSeeAll={true} data={similar}/>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    scrollViewCont: {
        flex: 1,
        backgroundColor: '#1c1c1c'
    },
    safeAreaCont: {
        position: 'absolute',
        zIndex: 20,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    iconCont: {
        borderRadius: 14,
        padding: 8
    },
    linGradient: {
        position: 'absolute',
        bottom: 0
    },
    movieDetailCont: {
        marginTop: 12,
        marginTop: -(height*0.09)
    }, 
    movieHeader: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        letterSpacing: 0.8
    },
    movieGeneralText: {
        color: 'gray',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 12
    },
    genresCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 24,
        marginTop: 8
    },
    genresText: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        fontWeight: '500',
        color: 'gray'
    },
    descriptionText: {
        marginLeft: 16,
        marginRight: 16,
        color: 'gray',
        letterSpacing: 0.4,
        marginTop: 8
    }

})