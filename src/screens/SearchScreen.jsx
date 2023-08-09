import { View, Text, Dimensions, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import React, {useState, useCallback} from "react";
import Loading from "../components/Loading";
import { debounce } from "lodash"
import { fallbackMoviePoster, image185, searchMovies } from "../api/Moviedb";

const { width, height } = Dimensions.get('window');
export default function SearcScreen(){
    const navigation = useNavigation();
    const movieName = "Oppenheimer"
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleSearch = value => {
        if(value && value.length > 2){
            setLoading(true);
            searchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false)
                if(data && data.results) setResults(data.results)
            })
        }else{
            setLoading(false);
            setResults([]);
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.textInputCont}>
                <TextInput 
                onChangeText = {handleTextDebounce}
                placeholder="Search Movie"
                placeholderTextColor={'lightgray'}
                style={styles.textInputStyle}
                />

                <TouchableOpacity style={styles.xMarkStyle} onPress={() => navigation.navigate("Home")}>
                    <XMarkIcon size={25} color={'white'}/>
                </TouchableOpacity>
            </View>
            {/* Results */}
            {
                loading ? (
                    <Loading />
                ) : 
                results.length > 0 ? 
                (
                    <ScrollView 
                    style={{marginTop: 12}}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 15}}
                    >
                        <Text style={styles.resultText}>Results ({results.length})</Text>
                        <View style={styles.foundMovies}>
                            {
                                results.map((item, index) => {
                                    return(
                                        <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => navigation.push("Movie", item)}
                                        >
                                            <View style={styles.imageCont}>
                                                <Image 
                                                source={{uri: image185(item?.poster_path) || fallbackMoviePoster}}
                                                style={{width: width*0.44, height: height*0.3, borderRadius: 15}}
                                                />
                                                <Text style={styles.movieName}>
                                                    {
                                                        item?.title.length > 22 ? item?.title.slice(0,22) + "..." : item?.title
                                                    }
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                ) : 
                (
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 120}}>
                        <Image
                        style={{height: 220, width: 220}}
                        source={require('../../assets/watching-a-movie.png')}
                        />
                    </View>
                )

            }
            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c1c1c',
        flex: 1
    },
    textInputCont: {
        marginHorizontal: 24,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'darkgray',
        borderWidth: 0.7,
        borderRadius: 1000
    },
    textInputStyle: {
        paddingBottom: 8,
        paddingLeft: 48,
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '500',
        color: 'white'
    },
    xMarkStyle: {
        borderRadius: 1000,
        padding: 10,
        margin: 6,
        backgroundColor: 'gray'
    },
    resultText: {
        color: 'white',
        fontWeight: '500',
        marginLeft: 8
    },
    foundMovies: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    imageCont: {
        marginTop: 8,
        marginBottom: 16
    },
    movieName: {
        marginLeft: 8,
        color: 'gray',
        marginTop: 8
    }
})