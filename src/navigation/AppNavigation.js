import React, {useState} from 'react'
import AppLoading from 'expo-app-loading'
import { StyleSheet, Text, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer' 
import { Ionicons } from '@expo/vector-icons'
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { Platform } from 'react-native'
import { THEME } from '../theme'
import { bootstrap } from '../bootstrap'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { BookedScreen } from '../screens/BookedScreen'

const navigatorOptions = { 
  headerStyle: { backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR  : '#fff' },
  headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
  
}

const Stack = createStackNavigator()
const MyStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="MainScreen">
          <Stack.Group
            screenOptions={navigatorOptions}
          >
          <Stack.Screen 
            name="MainScreen" 
            component={MainScreen} 
            options={{ 
              headerTitle: 'Все',
            }}
          />
          <Stack.Screen 
            name="Post" 
            component={PostScreen} 
          
          />
          </Stack.Group>
        </Stack.Navigator>
      )
}

const BookedNavigator = createStackNavigator ()
function MyBookedNavigator() {
  return (
  <BookedNavigator.Navigator>
    <BookedNavigator.Group
      screenOptions={navigatorOptions}
    >
    <BookedNavigator.Screen 
      name="BookedScreen" 
      component={BookedScreen} 
      options={{ 
        headerTitle: 'Избранное',
      }}
    />
    <BookedNavigator.Screen 
      name="Post" 
      component={PostScreen} 
    />
    </BookedNavigator.Group>
  </BookedNavigator.Navigator>
  )
}

const MyNav = (props) => {
  return (
    <BottomNavigator.Navigator
        
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName

              if (route.name === 'Posts') {
                iconName = focused
                  ? 'ios-albums'
                  : 'ios-star'
              } else if (route.name === 'Booked') {
                iconName = focused ? 'ios-albums' : 'ios-star'
              }
              return <Ionicons name={iconName} size={25} color={color} />
            },
            tabBarActiveTintColor: THEME.MAIN_COLOR,
            tabBarInactiveTintColor: THEME.GREY_COLOR,
          })}
          barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
          shifting={true}
        >
          
          <BottomNavigator.Screen 
            name="Posts" 
            component={MyStack} 
            options={{
              tabBarLabel: 'Все'
            }}
          />
          <BottomNavigator.Screen 
            name="Booked" 
            component={MyBookedNavigator} 
            options={{
              tabBarLabel: 'Избранное'
            }}
          />

        </BottomNavigator.Navigator>
  )
}
const BottomNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {
        Object.entries(props.descriptors).map(([key, descriptor], index) => {
          const focused = index === props.state.index
          return (
            <DrawerItem
              key={key}
              label={() => (
                <Text style={focused ? styles.drawerLabelFocused : styles.drawerLabel}>
                  {descriptor.options.title}
                </Text>
              )}
              onPress={() => descriptor.navigation.navigate(descriptor.route.name)}
              style={[styles.drawerItem, focused ? styles.drawerItemFocused : null]}
            />
          )
        })
      }
    </DrawerContentScrollView>
  )
}
export const AppNavigation = () => {
  const [isReady, setIsReady] = useState(false)
  if(!isReady){
    return (
      <AppLoading 
        startAsync={bootstrap} 
        onFinish={() => setIsReady(true)} 
        onError={console.warn}/>
        )
  }
    return (
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="MyNav"
          
          screenOptions={({ navigation, route }) => ({
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Take photo' iconName='ios-camera' onPress={ () => navigation.jumpTo('CreateScreen')}/>
              </HeaderButtons>
            ),
                
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item 
                  title='Toggle Drawer' 
                  iconName='ios-menu' 
                  onPress={ () => navigation.toggleDrawer()}/>
              </HeaderButtons>
            )
          })}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
        <Drawer.Screen name="MyNav" style={styles.headerTitle} component={MyNav} 
          options={{
            title: 'Твои заметки',
          }}
        />
        <Drawer.Screen name="AboutScreen" style={styles.headerTitle} component={AboutScreen} options={{
          title: 'О приложении',
          headerTitle: 'О нас',
        }}
       
        />
        <Drawer.Screen name="CreateScreen" style={styles.headerTitle} component={CreateScreen} options={{
          title: 'Создать пост',
          headerTitle: 'Создать',
        }}/>
        </Drawer.Navigator>
      </NavigationContainer>
    )
}

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 15,
  },
  headerTitle: {
    color: THEME.MAIN_COLOR,
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    marginRight: 15,
  },
  drawerLabel: {
    fontSize: 14,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center',
  },
  drawerItemFocused: {
    backgroundColor: THEME.MAIN_COLOR,
  },
})