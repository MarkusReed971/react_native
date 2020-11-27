import React from 'react';
import * as FileSystem from "expo-file-system";


class API {
    constructor() {
        this._URL = 'http://studentapi.myknitu.ru/';
        this._token = null;
        this._user = {
            id_user: null,
                img: null,
                family: null,
                vk: null,
                birthday: null,
                phonenumber: null,
                user: null,
                skype: null,
                login: null,
        };

        this.uploadImage = this.uploadImage.bind(this);
        this.getUserAsync = this.getUserAsync.bind(this);
        this.authorizationAsync = this.authorizationAsync.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.registration = this.registration.bind(this);
    }


    get URL() {
        return this._URL;
    }

    // set URL(value) {
    //     this._URL = value;
    // }

    get token() {
        return this._token;
    }

    set token(value) {
        this._token = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    toBase64Async = (imageURI) => FileSystem.readAsStringAsync(imageURI, {encoding: FileSystem.EncodingType.Base64})
        .then(data => JSON.stringify(data))
        .then(data => `data:image/jpeg;base64,${data.substring(1, data.length-1)}`);

    uploadImage = async (image, isBase64 = false) => {
        if (image) {
            const data = new FormData();
            const base64file = await this.toBase64Async(image.uri);
            data.append('image', isBase64 ? base64file : image, image.name);

            fetch(isBase64 ? this.URL + 'send2/' : this.URL + 'send/', {
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
        return await fetch(this.URL)
            .then(res => res.json())
            .then(resJson => resJson.images.reverse())
    };

    authorizationAsync = async (login, password) => {
        return await fetch(this.URL + 'auth/', {
            method: 'post',
            body: JSON.stringify({
                login,
                password,
            }),
        }).then(res => res.json())
            .then(async ({token}) => {
                // alert('Авторизация прошла успешно');
                this.token = token;
                this.user = await this.getUserAsync();
                return true
            }).catch(() => {
                alert('Пользователя с такими данными не существует');
                return false
            })
    };

    registration = async (login, password) => {
        return await fetch(this.URL + 'register/', {
            method: 'post',
            body: JSON.stringify({
                login,
                password,
            }),
        }).then(res => res.json())
            .then(({token}) => {
                alert('Регистрация прошла успешно, теперь вы можете войти в систему');
                return token
            })
            .catch(() => {
                alert('Пользователь с такими данными уже существует');
                return null
            })
    };

    updateUser = async (token, {nameuser, family, birthday, phonenumber, vk, skype,}) => {
        return await fetch(this.URL + 'userupdate/', {
            method: 'post',
            body: JSON.stringify({
                token,
                nameuser,
                family,
                birthday,
                phonenumber,
                vk,
                skype,
            }),
        }).then(res => JSON.stringify(res))
            // .then(json => alert(json))
    };

    getUserAsync = async () => {
        return await fetch(this.URL + 'getuser/', {
            method: 'post',
            body: JSON.stringify({token: this.token}),
        }).then(res => res.json())
            // .then(data => alert(JSON.stringify(data)))
    };
}

export default API;


// const URL = 'http://studentapi.myknitu.ru/';

// const toBase64Async = (imageURI) => FileSystem.readAsStringAsync(imageURI, {encoding: FileSystem.EncodingType.Base64})
//     .then(data => JSON.stringify(data))
//     .then(data => `data:image/jpeg;base64,${data.substring(1, data.length-1)}`);

// export const uploadImage = async (image = null, isBase64 = false) => {
//     if (image) {
//         const data = new FormData();
//         const base64file = await toBase64Async(image.uri);
//         // console.log(base64file);
//         data.append('image', isBase64 ? base64file : image, image.name);
//         // fetch(URL + 'send/', {
//         fetch(isBase64 ? URL + 'send2/' : URL + 'send/', {
//             method: 'post',
//             body: data,
//             headers: {
//                 'Content-Type': 'multipart/form-data; ',
//             },
//         })
//             .then((res) => JSON.stringify(res))
//             .then((resJson) => {
//                 // console.log('res: ' + resJson);
//                 alert(JSON.parse(resJson).status === 200 ? 'Файл отправлен успешно': 'Сервер не отвечает, попробуйте позже');
//             })
//             .catch((err) => alert(err));
//     } else {
//         alert('Выберите файл');
//     }
// };

// export const uploadBase64 = async (imageURI) => {
//     const base64 = await toBase64Async(imageURI);
//     return await fetch(URL + 'send/', {
//         method: 'post',
//         body: JSON.stringify({'img': base64}),
//     }).then(res => JSON.stringify(res))
//         .then(json => alert(json))
// };


// export const getImageListAsync = async () => {
//     return await fetch(URL)
//         .then(res => res.json())
//         .then(resJson => resJson.images.reverse())
// };

// export const authorizationAsync = async (login, password) => {
//     return await fetch(URL + 'auth/', {
//         method: 'post',
//         body: JSON.stringify({
//             login,
//             password,
//         }),
//     }).then(res => res.json())
//         .then(data => {
//             alert('Авторизация прошла успешно');
//             return data.token
//         }).catch(() => alert('Пользователя с такими данными не существует'))
// };

// export const registration = async (login, password) => {
//     return await fetch(URL + 'register/', {
//         method: 'post',
//         body: JSON.stringify({
//             login,
//             password,
//         }),
//     }).then(res => res.json())
//         .then(() => alert('Регистрация прошла успешно'))
//         .catch(() => alert('Пользователь с такими данными уже существует'))
// };

// export const getUserAsync = async (token) => {
//     return await fetch(URL + 'getuser/', {
//         method: 'post',
//         body: JSON.stringify({token}),
//     }).then(res => res.json())
//         .then(data => alert(JSON.stringify(data)))
// };

// export const getUserByIdAsync = async (token, userid) => {
//     return await fetch(URL + 'getuserwithid/', {
//         method: 'post',
//         body: JSON.stringify({
//             token,
//             userid,
//         }),
//     }).then(res => res.json())
//         .then(data => alert(JSON.stringify(data)))
// };

// export const getAllUserAsync = async (token) => {
//     return await fetch(URL + 'listusers/', {
//         method: 'post',
//         body: JSON.stringify({token}),
//     }).then(res => res.json())
//         .then(data => alert(JSON.stringify(data)))
// };

// export const updateUser = async (token, {nameuser, family, birthday, phonenumber, vk, skype,}) => {
//     return await fetch(URL + 'userupdate/', {
//         method: 'post',
//         body: JSON.stringify({
//             token,
//             nameuser,
//             family,
//             birthday,
//             phonenumber,
//             vk,
//             skype,
//         }),
//     }).then(res => JSON.stringify(res))
//         .then(json => alert(json))
// };

// export const updateUserImage = async (token, imageURI) => {
//     const base64 = await toBase64Async(imageURI);
//     return await fetch(URL + 'updateuserimage/', {
//         method: 'post',
//         body: JSON.stringify({
//             token,
//             'img': base64,
//         }),
//     }).then(res => JSON.stringify(res))
//         .then(json => alert(json))
// };

// export const sendMessage = async (token, userto, message) => {
//     return await fetch(URL + 'sendmessage/', {
//         method: 'post',
//         body: JSON.stringify({
//             token,
//             userto,
//             message,
//         }),
//     }).then(res => JSON.stringify(res))
//         .then(json => alert(json))
// };
//
// export const getDialog = async (token, userto) => {
//     return await fetch(URL + 'getdialog/', {
//         method: 'post',
//         body: JSON.stringify({
//             token,
//             userto,
//         }),
//     }).then(res => res.json())
//         .then(data => alert(JSON.stringify(data)))
// };
