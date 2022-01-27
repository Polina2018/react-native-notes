import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar } from 'react-native'

export const AboutScreen = ({}) => {
    return (
      <SafeAreaView style={styles.container}>
       <ScrollView >
         <View style={styles.wrapper}>
           <Text>Приложение для хранения собственных заметок в виде постов.</Text>
           <Text>Вы можете добавить изображение, текст и управлять заметкой с этим приложением.</Text>
           <Text>Максимально простой функционал поможет быстро и удобно фиксировать нужные события.</Text>
           <Text>Откройте приложение, сделайте фото и добавьте текст - минимум действий для нужного результата.</Text>
           <Text>Заметки датированы и могут быть добавлены в избранные.</Text>
           <Text style={styles.version}>Ускорьте ваши записи убрав ненужные функции!</Text>
          </View>
       </ScrollView> 
      </SafeAreaView>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
    wrapper: {
      padding: 15,
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      textAlign: 'left',
      width: '100%',
    },
    version: {
      fontFamily: 'open-bold'
    }
  });
  