import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import StyledButton from "./StyledButton";
import {withContext} from "./Context";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

const AuthorizationScreen = ({navigation, context}) => {
    const [login, setLogin] = useState('Test12');
    const [pass, setPass] = useState('1234ewq');

    return(
        <View style={styles.container}>
            <View style={styles.authOuter}>
                <Text style={styles.textInputLabel}>Логин</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Логин'}
                    onChangeText={text => setLogin(text)}
                    value={login}
                />
                <Text style={styles.textInputLabel}>Пароль</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    placeholder={'Пароль'}
                    onChangeText={pass => setPass(pass)}
                    value={pass}
                />
                <View style={styles.buttonBox}>
                    <StyledButton title={'Войти'} style={[styles.button, styles.buttonLeft]} onPress={ async () => {
                        if(await context.authorizationAsync(login, pass)) navigation.navigate('Profile');
                        setLogin('');
                        setPass('');
                    }} />
                    <StyledButton title={'Регистрация'} style={[styles.button, styles.buttonRight]} onPress={ () => navigation.navigate('Registration')} />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      paddingTop: '50%'
    },
    authOuter: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginLeft: 20,
        marginRight: 20,
    },
    textInput: {
        height: 40,
        padding: 10,
        paddingLeft: 20,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        borderColor: Colors.black,
        borderWidth: 1,
        backgroundColor: Colors.light,
    },
    textInputLabel: {
        marginLeft: 30,
        marginTop: 10,
        marginBottom: -5,
    },
    button: {
        minWidth: '49%',
    },
    buttonBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 30,
    },
    buttonLeft: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    buttonRight: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
});

export default withContext(AuthorizationScreen);
