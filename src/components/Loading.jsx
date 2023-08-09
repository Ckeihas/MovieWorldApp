import { View, Dimensions, StyleSheet } from "react-native";
import * as Progress from "react-native-progress"
import { theme, fontstyles } from "../theme";

const {width, height} = Dimensions.get('window');
export default function Loading() {
    return(
        <View style={styles.container}>
            <Progress.CircleSnail thickness={10} size={160} color={theme.background}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        position: 'absolute',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    }
})