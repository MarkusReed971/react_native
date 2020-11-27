import React from 'react';
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

export const ApiContext = React.createContext({});

export class ApiContextProvider extends React.Component {
    state = {
        URL: 'http://studentapi.myknitu.ru/',
        token: null,
        user: {
            id_user: null,
            img: null,
            family: null,
            vk: null,
            birthday: null,
            phonenumber: null,
            user: null,
            skype: null,
            login: null,
        },
    };

    selectImage = async () => {
        return await DocumentPicker.getDocumentAsync({
            type: 'image/jpeg'
        }).then(res => {
            return ({
                name: res.name,
                size: res.size,
                type: 'image/jpeg',
                uri: res.uri,
            })
        }).catch(err => alert(err));
    };

    toBase64Async = (imageURI) => FileSystem.readAsStringAsync(imageURI, {encoding: FileSystem.EncodingType.Base64})
        .then(data => JSON.stringify(data))
        .then(data => `data:image/jpeg;base64,${data.substring(1, data.length-1)}`);

    uploadImage = async (image, isBase64 = false) => {
        if (image) {
            const data = new FormData();
            const base64file = await this.toBase64Async(image.uri);
            data.append('image', isBase64 ? base64file : image, image.name);

            fetch(isBase64 ? this.state.URL + 'send2/' : this.state.URL + 'send/', {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data; ',
                },
            })
                .then((res) => JSON.stringify(res))
                .then((resJson) => {
                    // console.log('res: ' + resJson);
                    alert(JSON.parse(resJson).status === 200 ? 'Файл отправлен успешно': 'Сервер не отвечает, попробуйте позже');
                })
                .catch((err) => alert(err));
        } else {
            alert('Выберите файл');
        }
    };

    getImageListAsync = async () => {
        return await fetch(this.state.URL)
            .then(res => res.json())
            .then(resJson => resJson.images.reverse())
    };

    registration = async (login, password) => {
        return await fetch(this.state.URL + 'register/', {
            method: 'post',
            body: JSON.stringify({
                login,
                password,
            }),
        }).then(res => res.json())
            .then(({token}) => {
                alert('Регистрация прошла успешно, теперь вы можете войти в систему');
                this.setState({token});
                return true
            })
            .catch(() => {
                alert('Пользователь с такими данными уже существует');
                return false
            })
    };

    authorizationAsync = async (login, password) => {
        return await fetch(this.state.URL + 'auth/', {
            method: 'post',
            body: JSON.stringify({
                login,
                password,
            }),
        }).then(res => res.json())
            .then(async ({token}) => {
                // alert('Авторизация прошла успешно');
                this.setState({token: token});
                this.setState({user: await this.getUserAsync()});
                return true
            }).catch(() => {
                alert('Пользователя с такими данными не существует');
                return false
            })
    };

    getUserAsync = async () => {
        return await fetch(this.state.URL + 'getuser/', {
            method: 'post',
            body: JSON.stringify({token: this.state.token}),
        }).then(res => res.json())
        // .then(data => alert(JSON.stringify(data)))
    };


    updateUser = async ({nameuser, family, birthday, phonenumber, vk, skype,}) => {
        return await fetch(this.state.URL + 'userupdate/', {
            method: 'post',
            body: JSON.stringify({
                token: this.state.token,
                nameuser,
                family,
                birthday,
                phonenumber,
                vk,
                skype,
            }),
        }).then(async () => {
            this.setState({user: await this.getUserAsync()});
            return true

        }).catch((err) => {
            alert(err);
            return false
        })
    };

    updateUserImage = async (imageURI) => {
        const base64 = await this.toBase64Async(imageURI);
        return await fetch(this.state.URL + 'updateuserimage/', {
            method: 'post',
            body: JSON.stringify({
                token: this.state.token,
                'img': base64,
            }),
        }).then(async () => {
            this.setState({user: await this.getUserAsync()});
            return true
        }).catch((err) => {
            alert(err);
            return false
        })
    };

    getAllUserAsync = async () => {
        return await fetch(this.state.URL + 'listusers/', {
            method: 'post',
            body: JSON.stringify({token: this.state.token}),
        }).then(res => res.json())
            .then(json => json.users)
            // .then(data => alert(JSON.stringify(data)))
    };

    getUserByIdAsync = async (userid) => {
        return await fetch(this.state.URL + 'getuserwithid/', {
            method: 'post',
            body: JSON.stringify({
                token: this.state.token,
                userid,
            }),
        }).then(res => res.json())
            // .then(data => alert(JSON.stringify(data)))
    };

    sendMessage = async (userto, message) => {
        return await fetch(this.state.URL + 'sendmessage/', {
            method: 'post',
            body: JSON.stringify({
                token: this.state.token,
                userto,
                message,
            }),
        }).then(res => JSON.stringify(res))
            // .then(json => alert(json))
    };

    getDialog = async (userto) => {
        return await fetch(this.state.URL + 'getdialog/', {
            method: 'post',
            body: JSON.stringify({
                token: this.state.token,
                userto,
            }),
        }).then(res => res.json())
            .then(json => json.messages)
            // .then(data => alert(JSON.stringify(data)))
    };

    render() {
        return (
            <ApiContext.Provider value={{
                ...this.state,
                authorizationAsync: this.authorizationAsync,
                updateUser: this.updateUser,
                updateUserImage: this.updateUserImage,
                registration: this.registration,
                uploadImage: this.uploadImage,
                getImageListAsync: this.getImageListAsync,
                selectImage: this.selectImage,
                getAllUserAsync: this.getAllUserAsync,
                getUserByIdAsync: this.getUserByIdAsync,
                sendMessage: this.sendMessage,
                getDialog: this.getDialog,
            }}>
                {this.props.children}
            </ApiContext.Provider>
        );
    }
}

export const withContext = (ChildComponent) => props => (
    <ApiContext.Consumer>
        {context => <ChildComponent {...props} context={context} />}
    </ApiContext.Consumer>
);

