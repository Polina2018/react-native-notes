import React from 'react'
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity } from 'react-native'

export const Post = ({post, onOpen}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
        <View style={styles.post}>
            <ImageBackground source={{uri: post.img}} style={styles.image}>
                <View style={styles.textWrap}>
                    <Text style={styles.title}>{new Date(post.date).toLocaleDateString()}</Text>
                </View>
            </ImageBackground>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 15,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        backgroundColor: 'rgba(0,0,0, .5)',
        paddingVertical: 5,
        alignItems: 'center',
        width: '100%'
    },
    title: {
        color: '#fff',
        fontFamily: 'open-regular'
    }
})