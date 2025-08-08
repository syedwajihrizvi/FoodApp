import { images } from '@/constants'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, TextInput, TouchableOpacity, View } from 'react-native'

const SearchBar = () => {
  const params = useLocalSearchParams<{query?: string}>()
  const [searchText, setSearchText] = useState(params.query || '')

  const handleSearch = (text: string) => {
    setSearchText(text)
    if (!text.trim()) {
        setSearchText('')
        return
    }
  }

  const handleSubmit = () => {
    router.push(`/search?query=${searchText.trim() || ''}`)
  }

  return (
    <View className='searchbar'> 
      <TextInput 
        placeholder='Search for pizzas, burgers...' 
        className='flex-1 p-5' 
        value={searchText} 
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        placeholderTextColor={'#A0A0A0'}
        returnKeyType='search'
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Image source={images.search} className='size-6 mr-8' resizeMode='contain' tintColor={'#5D5D5D'}/>
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar

