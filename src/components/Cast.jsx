
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { fallbackPersonImage, image185 } from "../api/Moviedb";

export default function Cast({cast, navigation}){

    return(
        <View style={styles.container}>
            <Text style={styles.castText}>Top Cast</Text>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    cast && cast.map((person, index) => {
                        return(
                            <TouchableOpacity
                            key={index}
                            style={styles.castPersons}
                            onPress={() => navigation.navigate("Person", person)}
                            >
                                <View style={styles.castImgCont}>
                                    <Image 
                                    style={styles.castImg}
                                    source={{uri: image185(person?.profile_path) || fallbackPersonImage}}
                                    />
                                </View>
                        
                                <Text style={styles.characterName}>
                                    {
                                        person?.character.length > 10 ? person?.character.slice(0,10)+'...' : person?.character
                                    }
                                </Text>
                                <Text style={styles.personName}>
                                    {
                                        person?.original_name.length > 10 ? person?.original_name.slice(0,10)+'...' : person?.original_name
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 48
    },
    castText: {
        color: 'white',
        marginLeft: 16,
        marginBottom: 22,
        fontSize: 18,
        lineHeight: 28
    },
    castPersons: {
        marginRight: 24,
        alignItems: 'center'
    },
    characterName: {
        color: 'white',
        marginTop: 8,
        fontSize: 12,
        lineHeight: 16
    },
    personName: {
        color: 'gray',
        marginTop: 8,
        fontSize: 12,
        lineHeight: 16
    },
    castImgCont: {
        overflow: 'hidden',
        heigth: 80,
        width: 80,
        borderRadius: 100,
        alignItems: 'center'
    },
    castImg: {
        borderRadius: 100,
        height: 80,
        width: 96
    }

})