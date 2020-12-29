import React from 'react';
import {ScrollView, StyleSheet, Text, View, CheckBox} from 'react-native';
import StyledButton from "./StyledButton";
import {withContext} from "./Context";
import ImageView from "./ImageView";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

const fileInfo = (image) => {
    return (
        <View>
            <Text style={styles.span}>Название: </Text>
            <Text>{image.name}</Text>
            <Text style={styles.span}>{'\n'}Тип: </Text>
            <Text>{image.type}</Text>
            <Text style={styles.span}>{'\n'}Размер: </Text>
            <Text>{image.size} Кб</Text>
            <Text style={styles.span}>{'\n'}Ссылка: </Text>
            <Text>{image.uri}</Text>
        </View>
    )
};


class UploadScreen extends React.Component {
    state = {
        image: null,
        isBase64: false,
    };


    render() {
        const {image, isBase64} = this.state;
        const {selectImage, uploadImage} = this.props.context;

        return (
            <View>
                <ImageView image={image} />
                <View style={styles.buttonBox}>
                    <StyledButton style={[styles.button, styles.buttonLeft]} title={'Выбрать'} onPress={async () => this.setState({image: await selectImage()})}/>
                    <StyledButton style={[styles.button, styles.buttonRight]} title={'Отправить'} onPress={() => uploadImage(image, isBase64)}/>
                </View>
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        value={isBase64}
                        onValueChange={() => this.setState({isBase64: !isBase64})}
                        style={styles.checkBox}
                        tintColors={{ true: 'dodgerblue', false: 'black' }}
                    />
                    <Text style={styles.checkBoxText} >Отправить в Base64</Text>
                </View>
                <ScrollView style={styles.fileInfo}>
                    {image ? fileInfo(image) : fileInfo({name: '-', size: '0', type: '-', uri: '-'})}
                    <View style={{height: 400}} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        minWidth: '49%',
    },
    buttonBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 0,
    },
    buttonLeft: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    buttonRight: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    fileInfo: {
        padding: 20,
        paddingTop: 0,
    },
    span: {
      fontWeight: 'bold',
      color: Colors.primary,
    },
    checkBoxContainer: {
        flexDirection: 'row',
        margin: 20,
        marginTop: -10,
        marginBottom: 10,
        marginLeft: 5,
        padding: 8,
        paddingBottom: 3,
        borderRadius: 10,
    },
    checkBox: {
        marginTop: -5,
    },
    checkBoxText: {
        fontSize: 16,
    },

});

export  default withContext(UploadScreen);
