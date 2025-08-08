import { Category } from '@/type'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const Filter = ({categories}: {categories: Category[]}) => {
  const searchParams = useLocalSearchParams()
  const [active, setActive] = useState(searchParams.category || '')
  const handlePress = (id: string) => {
    setActive(id);
    if (id === 'all') router.setParams({ category: undefined });
    else router.setParams({ category: id });
  };

  const filterData : (Category | { $id: string, name: string})[] = categories ? [{ $id: 'all', name: 'All' }, ...categories] : [{$id: 'all', name: 'All'}];   
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 10}}>
      {filterData.map((item, index) => {
        return (
            <View 
                key={index} 
                className='px-4 py-2 rounded-full border' 
                style={
                    { borderColor: active === item.$id ? '#FF6C44' : '#E2E2E2', 
                      backgroundColor: active === item.$id ? '#FFF0EB' : '#FFFFFF' }}>
                <TouchableOpacity 
                    onPress={() => handlePress(item.$id)}>
                    <Text className='paragraph-semibold'>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
      })}
    </ScrollView>
  )
}

export default Filter