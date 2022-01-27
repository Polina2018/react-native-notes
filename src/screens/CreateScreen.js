import React, {useState, useRef, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, Button, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'
import { addPost } from '../store/actions/post'
import { THEME } from '../theme'
import { PhotoPicker } from '../components/PhotoPicker'

export const CreateScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [imgRef, setImgRef] = useState(null)
  
  const photoPickHandler = uri => {
    let img = {
      setImgRef: uri
    }
    setImgRef(img.setImgRef)
  }
  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: imgRef,
      booked: false
    }
   
    dispatch(addPost(post))
    navigation.navigate('MainScreen')
    setText(null)
    setImgRef(null)

  }

    return (
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.wrapper}>
              <Text style={styles.title}>Создай новую заметку</Text>
              <TextInput 
                style={styles.textarea}
                placeholder='Введите текст заметки'
                value={text}
                onChangeText={setText}
                multiline
              />
              <PhotoPicker onPick={photoPickHandler}/>
              <Pressable 
                onPress={saveHandler} 
                disabled={!text}
                style={styles.button}
              >
                  <Text style={styles.textButton}>Создать пост</Text>
              </Pressable>
          </View> 
       </TouchableWithoutFeedback>
      </ScrollView>
    )
}



const styles = StyleSheet.create({
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      padding: 15,
    },
    title: {
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 10,
      fontFamily: 'open-bold',
      color: '#333333'
    },
    button : {
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: THEME.MAIN_COLOR,
      width: 200,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    textButton: {
      color: '#fff',
    },
    textarea: {
      padding: 10,
      marginBottom: 10,
      borderBottomColor: THEME.MAIN_COLOR,
      borderBottomWidth: 1
    }
})
  