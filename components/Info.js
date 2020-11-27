import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text, View, StyleSheet} from 'react-native';
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

const Info = ({text, icon, label}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.infoLabel}>{label}</Text>
            <View style={styles.info}>
                <Icon style={styles.icon} name={icon} size={30} color="#000" />
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        marginTop: 10,
    },
    info: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#c9c9c9',
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: Colors.lighter,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    infoLabel: {
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        color: Colors.primary,
        fontSize: 16,
        backgroundColor: Colors.light,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomColor: Colors.white,
        borderBottomWidth: 2,
    },
    icon: {
        padding: 2,
        paddingBottom: -1,
        paddingRight: 15,
    },
    text: {
        fontSize: 16,
    },
});


export default Info;
