import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";


const UserItem = ({user, onPress = null}) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.userItem}>
                <Image style={styles.image} source={{uri: user.img}} />
                <View style={styles.userInfo}>
                    <Text style={styles.fio}>{`${user.family} ${user.user}`}</Text>
                    <Text style={styles.birthday}>{user.birthday}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    userItem: {
        flexDirection: 'row',
        margin: 10,
        marginBottom: 0,
        marginTop: 10,
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 15,
    },
    userInfo: {
        padding: 10,
        paddingLeft: 20,
        paddingTop: 8,
    },
    fio: {
        fontSize: 16,
    },
    birthday: {
        color: Colors.primary,
    },
    image: {
        height: 60,
        width: 60,
        resizeMode: 'cover',
        borderRadius: 150,
    },
});

export default UserItem;
