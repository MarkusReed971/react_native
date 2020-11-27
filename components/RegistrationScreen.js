import React from 'react';
import {StyleSheet, TextInput, ScrollView, Text} from "react-native";
import StyledButton from "./StyledButton";
import {withContext} from "./Context";
import ImageView from "./ImageView";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";


class RegistrationScreen extends React.Component {
    state = {
        login: '',
        pass: '',
        image: null,
        user: {
            nameuser: 'Name',
            family: 'Lastname',
            birthday: '01.01.2001',
            phonenumber: '98765432198',
            vk: 'vk.com/id',
            skype: 'SkypeLogin',
        },
    };

    render() {
        const {login, pass, user, image} = this.state;
        const {context, navigation} = this.props;

        return(
            <ScrollView>

                <Text style={styles.textInputLabel}>Логин</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Логин'}
                    onChangeText={text => this.setState({login: text})}
                />
                <Text style={styles.textInputLabel}>Пароль</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    placeholder={'Пароль'}
                    onChangeText={text => this.setState({pass: text})}
                />
                <Text style={styles.textInputLabel}>Фото</Text>
                <ImageView image={image} />
                <StyledButton
                    style={styles.button}
                    title={'Выбрать фото'}
                    onPress={async () => this.setState({image: await context.selectImage()})}
                />
                <Text style={styles.textInputLabel}>Имя</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Имя (необязательно)'}
                    onChangeText={text => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            nameuser: text
                        }
                    }))}
                />
                <Text style={styles.textInputLabel}>Фамилия</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Фамилия (необязательно)'}
                    onChangeText={text => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            family: text
                        }
                    }))}
                />
                <Text style={styles.textInputLabel}>Дата рождения</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Дата рождения (необязательно)'}
                    onChangeText={text => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            birthday: text
                        }
                    }))}
                />
                <Text style={styles.textInputLabel}>Телефон</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Телефон (необязательно)'}
                    onChangeText={text => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            phonenumber: text
                        }
                    }))}
                />
                <Text style={styles.textInputLabel}>vk</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Vk (необязательно)'}
                    onChangeText={text => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            vk: text
                        }
                    }))}
                />
                <Text style={styles.textInputLabel}>Skype</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Skype (необязательно)'}
                    onChangeText={text => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            skype: text
                        }
                    }))}
                />

                <StyledButton
                    title={'Зарегистрироваться'}
                    style={[styles.button, {marginTop: 20}]}
                    onPress={() => context.registration(login, pass)
                        .then(isFinished => isFinished ? context.updateUser(user) : false)
                        .then(isFinished => isFinished && image ? context.updateUserImage(image.uri) : isFinished)
                        .then(isFinished => isFinished ? navigation.navigate('Authorization') : null) } />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        padding: 10,
        paddingLeft: 20,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: Colors.light,
    },
    textInputLabel: {
        marginLeft: 30,
        marginTop: 10,
        marginBottom: -5,
    },
    button: {
        margin: 20,
        marginBottom: 10,
        marginTop: 0,
        borderRadius: 10,
    },
});

export default withContext(RegistrationScreen);
