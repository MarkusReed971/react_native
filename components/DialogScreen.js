import React from 'react';
import {ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text} from 'react-native';
import {withContext} from "./Context";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import Message from "./Message";

let asyncTask;

class DialogScreen extends React.Component {
    state = {
        messageList: null,
        message: null,
    };


    componentDidMount() {
        asyncTask = () => {
            const {context, route} = this.props;
            context.getDialog(route.params.id).then(messages => this.setState({messageList: messages}))
        };
        asyncTask()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        asyncTask = () => {
            const {context, route} = this.props;
            if(prevState.messageList !== context.getDialog(route.params.id)) context.getDialog(route.params.id).then(messages => this.setState({messageList: messages}))
        };
        asyncTask();
    }

    componentWillUnmount() {
        asyncTask = () => {};
        asyncTask();
    }

    MessageList(messageList) {
        return messageList.map(message => <Message key={Math.random()} message={message} thisId={this.props.context.user.id_user} />);
    }

    render() {
        const {context, route} = this.props;
        const {messageList, message} = this.state;
        return(
            <View>
                <ScrollView style={styles.messages}>
                    {messageList ? this.MessageList(messageList) : null}
                </ScrollView>
                <View style={styles.inputBlock}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Введите сообщение'}
                        onChangeText={text => this.setState({message: text})}
                        value={message}
                    />
                    <TouchableOpacity onPress={() => {context.sendMessage(route.params.id, message).then(() => this.setState({message: ''}))}}>
                        <Icon style={styles.icon} name={'send'} size={26} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    loading: {
        textAlign: 'center',
    },
    messages: {
        height: '85%',
        backgroundColor: Colors.white,
    },
    inputBlock: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    textInput: {
        height: 40,
        padding: 10,
        paddingLeft: 20,
        borderRadius: 10,
        borderColor: Colors.black,
        borderWidth: 1,
        backgroundColor: Colors.light,
        width: '88%',
    },
    icon: {
        marginLeft: 10,
        marginTop: 5,
    },
});


export default withContext(DialogScreen);
