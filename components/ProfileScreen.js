import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Info from './Info';
import StyledButton from "./StyledButton";
import {withContext} from "./Context";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";


const ProfileScreen = ({navigation, context}) => {
    return (
        <ScrollView>
            <View style={styles.header}>
                <Image style={styles.image} source={{uri: context.user.img}} />
                <View style={styles.headerContent}>
                    <StyledButton title={'Редактировать'} style={styles.link} onPress={ () => navigation.navigate('UpdateUser')} />
                    <Text style={styles.fio}>{context.user.id_user ? `${context.user.family} ${context.user.user}` : null}</Text>
                </View>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.h2}>Подробная информация</Text>
                <Info text={context.user.birthday} icon={'birthday-cake'} label={'Дата рождения'}/>
                <Info text={context.user.phonenumber} icon={'phone'} label={'Телефон'}/>
                <Info text={context.user.vk} icon={'vk'} label={'ВКонтакте'}/>
                <Info text={context.user.skype} icon={'skype'} label={'Skype'}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 60,
        width: 60,
        resizeMode: 'cover',
        borderRadius: 150,
    },
    header: {
        padding: 15,
        flexDirection: 'row',
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 15,
        margin: 20,
        marginTop: 40,
        marginBottom: 0,
    },
    headerContent: {
        padding: 15,
        paddingTop: 0,
    },
    fio: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 18,
        padding: 10,
        backgroundColor: Colors.dark,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        textAlign: 'center',

    },
    infoLabel: {
        marginLeft: 30,
        marginTop: 10,
        color: Colors.primary
    },
    link: {
        backgroundColor: 'transparent',
        color: 'dodgerblue',
        fontSize: 12,
        paddingTop: -10,
        paddingBottom: -10,
        marginLeft: '53%',
        textTransform: 'none',
    },
    userInfo: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        margin: 20,
    },
});

export default withContext(ProfileScreen);
