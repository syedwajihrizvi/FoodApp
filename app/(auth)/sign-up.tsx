import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''

  })
  
  const submit = async () => {
    const { email, name, password, confirmPassword } = form;
    if (!email || !password || !confirmPassword || !name) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }
    setIsSubmitting(true)
    console.log('Submitting form:', form);
    try {
        await createUser({email, password, name})
        router.replace('/')
    } catch (error) {
        Alert.alert('Error', 'Failed to create account: ')
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <View className='gap-10 bg-white p-4 mt-5'>
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => {setForm({...form, email:text})}}
        label="Email"
        secureTextEntry={false}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => {setForm({...form, name:text})}}
        label="Full Name"
        secureTextEntry={false}
        keyboardType="default"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => {setForm({...form, password:text})}}
        label="Password"
        secureTextEntry={true}
      />
      <CustomInput
        placeholder="Confirm your password"
        value={form.confirmPassword}
        onChangeText={(text) => {setForm({...form, confirmPassword:text})}}
        label="Confirm Password"
        secureTextEntry={true}
      />
      <CustomButton title="Sign Up" onPress={submit} isLoading={isSubmitting}/>
        <View className='w-full flex-col items-center justify-between mt-2'>
            <Text className="base-regular text-gray-100">
                Already have an account?
            </Text>
            <Link href="/(auth)/sign-in" className="text-primary base-semibold">
                Sign In
            </Link>
        </View>
    </View>
  )
}

export default SignUp