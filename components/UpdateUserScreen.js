import React from 'react';
import {Image, ScrollView, StyleSheet, TextInput, Text} from "react-native";
import StyledButton from "./StyledButton";
import {withContext} from "./Context";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";


class UpdateUserScreen extends React.Component {
    state = {
        image: {
            uri: null,
            size: null,
            type: null,
            name: null,
        },
        user: {
            nameuser: null,
            family: null,
            birthday: null,
            phonenumber: null,
            vk: null,
            skype: null,
        },
    };

    componentDidMount() {
        const {user} = this.props.context;
        this.setState({
            user: {
                nameuser: user.user,
                family: user.family,
                birthday: this.parseDate(user.birthday),
                phonenumber: user.phonenumber,
                vk: user.vk,
                skype: user.skype,
            },
            image: {
                ...this.state.image,
                uri: user.img,
            }
        });
    }


    parseDate = (stringDate) => {
        const str = stringDate.split(' ');
        const month = new Map();
        month.set('января', '01')
            .set('февраля', '02')
            .set('марта', '03')
            .set('апреля', '04')
            .set('мая', '05')
            .set('июня', '06')
            .set('июля', '07')
            .set('августа', '08')
            .set('сентября', '09')
            .set('октября', '10')
            .set('ноября', '11')
            .set('декабря', '12');
        return (str[0] > 10 ? str[0] : `0${str[0]}`)
            + `.${month.get(str[1])}.${str[2]}`
    };


    render() {
        const {user, image} = this.state;
        const {context, navigation} = this.props;


        return(
            <ScrollView>
                <Text style={styles.textInputLabel}>Фото</Text>
                <Image style={styles.image} source={{uri: image.uri}} />
                <StyledButton
                    style={styles.button}
                    title={'Изменить фото'}
                    onPress={async () => this.setState({image: await context.selectImage()})}
                />
                <Text style={styles.textInputLabel}>Имя</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Имя'}
                    onChangeText={text => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            nameuser: text
                        }
                    }))}
                    defaultValue={context.user.user}
                />
                <Text style={styles.textInputLabel}>Фамилия</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Фамилия'}
                    onChangeText={text => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            family: text
                        }
                    }))}
                    defaultValue={context.user.family}
                />
                <Text style={styles.textInputLabel}>Дата рождения</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Дата рождения'}
                    onChangeText={text => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            birthday: text
                        }
                    }))}
                    defaultValue={this.parseDate(context.user.birthday)}
                />
                <Text style={styles.textInputLabel}>Телефон</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Телефон'}
                    onChangeText={text => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            phonenumber: text
                        }
                    }))}
                    defaultValue={context.user.phonenumber}
                />
                <Text style={styles.textInputLabel}>vk</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Vk'}
                    onChangeText={text => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            vk: text
                        }
                    }))}
                    defaultValue={context.user.vk}
                />
                <Text style={styles.textInputLabel}>Skype</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Skype'}
                    onChangeText={text => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            skype: text
                        }
                    }))}
                    defaultValue={context.user.skype}
                />
                <StyledButton
                    title={'Применить'}
                    style={[styles.button, {marginTop: 20}]}
                    onPress={() => context.updateUser(user)
                        .then(() => image.size ? context.updateUserImage(image.uri) : null)
                        .then(() => navigation.navigate('Profile')) }
                />
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
    image: {
        height: 300,
        width: '90%',
        resizeMode: 'cover',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        borderRadius: 10,
    },
});

export default withContext(UpdateUserScreen);
