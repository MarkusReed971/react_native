import React from 'react';
import {ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text} from 'react-native';
import {withContext} from "./Context";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';


const Message = ({message, thisId}) => {
    return(
        <View style={ thisId !== message.from_id ? styles.message2 : styles.message1}>
            <Text style={styles.text}>{message.message}</Text>
            <Text style={styles.date}>{message.datetime.slice(0, -8)}</Text>
        </View>
    )
};


const styles = StyleSheet.create({
    message1: {
        backgroundColor: Colors.dark,
        padding: 15,
        paddingBottom: 7,
        borderRadius: 15,
        alignSelf: 'flex-end',
        margin: 5,
        marginLeft: 50,
    },
    message2: {
        backgroundColor: Colors.primary,
        padding: 15,
        paddingBottom: 7,
        borderRadius: 15,
        alignSelf: 'flex-start',
        margin: 5,
        marginRight: 50,
    },
    date: {
        textAlign: 'right',
        fontSize: 10,
        marginLeft: 20,
    },
});


export default Message;
