import React, {useCallback, useState, useContext} from 'react'
import { StyleSheet, Text, View, Image, Pressable, ScrollView, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import { THEME } from '../theme'
import { AppHeaderIcon } from '../components/AppHeaderIcon'

import { removePost, toggleBooked } from '../store/actions/post'
// import { FontAwesome } from '@expo/vector-icons'
// import { AppButton } from '../components/ui/AppButton'
// import { EditModal } from '../components/EditModals'

export const PostScreen = ({navigation, route}) => {
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  
  const postId = route.params?.postId ?? null
  const date = route.params?.date

  
  const post = useSelector(state => state.post.allPosts.find(p => p.id === postId))
 
  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post))
  }, [dispatch, post])
 
  const removeHandler = () => {
    Alert.alert(
      "Удаление поста",
      "Вы уверены?",
      [
        {
          text: "Отменить",
          style: "cancel"
        },
        { text: "Удалить", style: 'destructive', 
        onPress() {
          navigation.navigate('MainScreen')
          dispatch(removePost(postId))
        } }
      ],
      {
        cancelable: false,
      }
    )
  }
  const toggleHandlerItem = route.params?.toggleHandler
  
  const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId))

  React.useLayoutEffect(() => {
    
    const iconName = booked ? 'ios-star' : 'ios-star-outline'
    
    navigation.setOptions({ booked })
    navigation.setOptions({ toggleHandler })

    navigation.setOptions({
      title: 'Заметка от ' + new Date(date).toLocaleDateString(),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item 
            title='Сделать фото' 
            iconName={iconName} 
            onPress={toggleHandler}/>
        </HeaderButtons>
      ),
    });
  }, [navigation, date, toggleHandler, booked])

  if(!post) {
    return null
  }

  // const saveHandler = useCallback(() => {
  //   dispatch(updatePost(post))
  //   console.log(updatePost(post))
  //   // setModal(false)
  // }, [dispatch, post])

    return (
       <ScrollView>
           <Image source={{uri: post.img}} style={styles.image}/>
           <View style={styles.textWrap}>
             <Text style={styles.title}>
               {post.text}
             </Text>
             {/* <View>
              <EditModal 
                visible={modal}
                value={post.text}
                onCancel={() => setModal(false)}
                onSave={saveHandler}
              />
               <AppButton onPress={() => setModal(true)}><FontAwesome name='edit' size={20}/></AppButton>
            </View> */}
             <Pressable 
                onPress={removeHandler} 
                style={styles.button}
              >
                  <Text style={styles.textButton}>Удалить</Text>
              </Pressable>
           </View>
       </ScrollView> 
    )
}



const styles = StyleSheet.create({
    textWrap: {
      padding: 10,
    },
    image: {
      width: '100%',
      height: 200
    },
    title: {
      fontFamily: 'open-regular',
      fontSize: 16
    },
    button : {
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: THEME.RED_COLOR,
      width: 200,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 20
    },
    textButton: {
      color: '#fff',
    },
})
  