import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from "react-native";
import { fontstyles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/Moviedb";

var { width, height } = Dimensions.get('window');

export default function MovieList({title, data, hideSeeAll}){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <View style={styles.headerText}>
                <Text style={styles.upcomingText}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={[fontstyles.text, styles.seeAllText]}>See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            {/* Movie row */}
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
            >
                {data.map((item, index) => {
                    return(
                        <TouchableWithoutFeedback
                        key={index}
                        onPress={() => navigation.push("Movie", item)}
                        >

                            <View style={styles.movieCont}>
                                <Image 
                                source={{uri: image185(item.poster_path) || fallbackMoviePoster}}
                                style={[{
                                    width: width*0.33,
                                    height: height*0.22
                                }, styles.movieImg]}
                                />
                                <Text style={styles.movieNameText}>
                                    {
                                        item.title.length > 14 ? item.title.slice(0,14)+'...' : item.title
                                    }
                                </Text>
                            </View>

                        </TouchableWithoutFeedback>
                    )
                })}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        marginVertical: 6
    },
    headerText: {
        marginHorizontal: 24,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    upcomingText: {
        color: 'white',
        fontSize: 18
    },
    seeAllText: {
        fontSize: 18
    },
    movieNameText: {
        color: 'white',
        marginLeft: 8,
        marginTop: 6
    },
    movieCont: {
        marginRight: 24,
        marginTop: 10
    },
    movieImg: {
        borderRadius: 20
    }
});