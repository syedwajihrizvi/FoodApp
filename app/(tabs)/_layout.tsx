import { images } from '@/constants'
import { TabBarIconProps } from '@/type'
import cn from 'clsx'
import { Redirect, Tabs } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { useAuthStore } from '../store/auth.store'

const TabBarIcon = ({focused, icon, title}: TabBarIconProps) => {
  return (
    <View className={`tab-icon ${focused ? 'focused' : ''}`}>
      <Image source={icon} className='size-7' resizeMode='contain' tintColor={focused ? '#FE8C00' : '#5D5F6D'} />
      <Text className={cn('text-sm font-bold', focused ? 'text-primary' : 'text-gray-200')}>
        {title}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Redirect href="/sign-in" />
  return (
    <Tabs screenOptions={{
      headerShown: false, tabBarShowLabel: false, 
      tabBarStyle: {borderTopLeftRadius: 40, 
      borderTopRightRadius: 40, borderBottomLeftRadius: 40, 
      borderBottomRightRadius: 40,
      marginHorizontal: 20, height: 80, position: 'absolute', 
      bottom: 20, backgroundColor: '#fff', shadowColor: '#000', 
      shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, 
      shadowRadius: 3.84, elevation: 5, paddingHorizontal: 20, paddingVertical: 10
      }}}>
      <Tabs.Screen 
        name="index"
        options={{
          tabBarIcon: ({focused}) => <TabBarIcon focused={focused} icon={images.home} title="Home"/>,
          }}/>
      <Tabs.Screen 
        name="search"
        options={{
          tabBarIcon: ({focused}) => <TabBarIcon focused={focused} icon={images.search} title="Search"/>,
          }}/>
        <Tabs.Screen 
        name="cart"
        options={{
          tabBarIcon: ({focused}) => <TabBarIcon focused={focused} icon={images.bag} title="Cart"/>,
          }}/>
        <Tabs.Screen 
        name="profile"
        options={{
          tabBarIcon: ({focused}) => <TabBarIcon focused={focused} icon={images.person} title="Profile"/>,
          }}/>
    </Tabs>
  )
}

export default TabsLayout