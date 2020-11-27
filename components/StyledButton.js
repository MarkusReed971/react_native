import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native'

const StyledButton = ({onPress, style, title}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.button, style]} >{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        padding: 8,
        backgroundColor: 'dodgerblue',
        textAlign: 'center',
        textTransform: 'uppercase'
    }
});

export default StyledButton;
