import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Text, Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { THEME } from '../theme'


export const PhotoPicker = ({ onPick }) => {
    const [image, setImage] = useState(null)
    const [status, requestPermission] = ImagePicker.useCameraPermissions()

    const takePhoto = async () => {
        const hasPermission = requestPermission()

        if(!hasPermission) {
            return
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
            })
        
        console.log(result)
    
        if (!result.cancelled) {
            setImage(result.uri)
            onPick(result.uri)
       
        }
        
    }
    return (
        <View style={styles.wrapper}>
            <Pressable style={styles.button} onPress={takePhoto}>
                <Text style={styles.textButton}>Сделать фото</Text>
            </Pressable>
            {image && <Image style={styles.image} source={{ uri: image }}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10
    },
    button: {
        fontSize: 16,
        fontStyle: 'italic',
        fontFamily: 'open-regular',
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 4,
        borderColor: THEME.MAIN_COLOR,
        borderWidth: 1,
        width: 200,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    textButton: {

    }
})