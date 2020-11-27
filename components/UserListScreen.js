import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {withContext} from "./Context";
import UserItem from "./UserItem";

let asyncTask;

class UserListScreen extends React.Component {
    state = {
        userList: null,
    };

    componentDidMount() {
        asyncTask = () => {
            const {context} = this.props;
            if(context.token) context.getAllUserAsync().then(users => this.setState({userList: users}))
        };
        asyncTask();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        asyncTask = () => {
            const {context} = this.props;
            if(prevProps.context.token !== context.token) context.getAllUserAsync().then(users => this.setState({userList: users}))
        };
        asyncTask();
    }

    componentWillUnmount() {
        asyncTask = () => {};
        asyncTask();
    }

    UserList(userList) {
        return userList.map(user => user.user
                ? <UserItem
                    onPress={() => this.props.navigation.navigate('Dialog', {headerTitle: `${user.family} ${user.user}`, id: user.id})}
                    user={user} key={user.id} /> : null);
    }

    render() {
        const {userList} = this.state;
        return(
            <ScrollView>
                <Text style={{margin: 10, textAlign: 'center', color: 'red'}}>*Для демонстрации работы приложения выводятся только те пользователи, которые указали имя*</Text>
                { !this.props.context.token ? <Text style={styles.loading}>Войдите в систему</Text> : !userList ? <Text style={styles.loading}>Загрузка...</Text> : this.UserList(userList)}
                {/*{ userList ? this.UserList(userList) : <Text style={styles.loading}>Загрузка...</Text>}*/}
            </ScrollView>
        )
    }


}

const styles = StyleSheet.create({
    loading: {
        textAlign: 'center',
    },
});

export default withContext(UserListScreen);
