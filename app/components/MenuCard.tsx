import { MenuItem } from '@/type';
import React from 'react';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';

const MenuCard = ({ item: {image_url, name, price} }: { item: MenuItem }) => {
  const imageUrl = `${image_url}`;// Assuming image_url is a string URL
  return (
      <TouchableOpacity className='menu-card' style={Platform.OS === 'android' ? { elevation: 3 } : { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
        <Image source={{ uri: imageUrl }} className='size-32 absolute -top-10' resizeMode='contain' />
        <Text className='text-center base-bold mb-2 text-dark-100' numberOfLines={1}>{name}</Text>
        <Text className='body-regular text-gray-200 mb-4'>From ${price}</Text>
        <TouchableOpacity>
            <Text className='text-primary paragraph-bold'>Add to Cart +</Text>
        </TouchableOpacity>
      </TouchableOpacity>
  )
}

export default MenuCard