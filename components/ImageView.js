import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";


const ImageView = ({image}) => {
    return (
        <View>
            {image ? <Image style={styles.image} source={{uri: image.uri}} />
            : <Icon style={styles.icon} name={'addfile'} size={200} color="#000" /> }
        </View>
    )
};

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: '90%',
        resizeMode: 'cover',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        borderRadius: 10,
    },
    icon: {
        padding: 50,
        paddingLeft: 80,
        paddingRight: 80,
        backgroundColor: Colors.light,
        borderRadius: 10,
        margin: 20,
    },
});

export default ImageView;
