import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import StyledButton from "./StyledButton";
import {withContext} from "./Context";

class GalleryScreen extends React.Component {
    state = {
        imageList: null,
    };

    ImageList = (imageList) => imageList.map(image => <Image key={image.img} style={styles.image} source={{uri: image.img}} />);

    setImageList = () => {this.props.context.getImageListAsync().then(res => this.setState({imageList: res}))};

    componentDidMount() {
        this.setImageList()
    }

    render() {
        const {imageList} = this.state;
        return(
            <View>
                <View style={styles.buttonBox}>
                    <StyledButton style={[styles.button, styles.buttonLeft]} title={'Обновить'} onPress={this.setImageList}/>
                    <StyledButton style={[styles.button, styles.buttonRight]} title="Загрузить" onPress={() => this.props.navigation.navigate('Upload')}/>
                </View>
                <ScrollView>
                    { imageList ? this.ImageList(imageList) : <Text style={styles.loading}>Загрузка...</Text>}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: '90%',
        resizeMode: 'cover',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        borderRadius: 10,
    },
    loading: {
        textAlign: 'center',
    },
    button: {
        minWidth: '49%',
    },
    buttonBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
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

export default withContext(GalleryScreen);
