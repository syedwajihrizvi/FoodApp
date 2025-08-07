import { signIn } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { AppwriteException } from 'react-native-appwrite'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    setIsSubmitting(true)
    console.log('Submitting form:', form);
    try {
        await signIn({ email, password })
        router.push('/(tabs)')
    } catch (error) {
      console.error('Sign in error:', error);
      if (error instanceof AppwriteException) {
        throw new Error(`Appwrite error: ${error.message}`);
      }
      throw new Error("Failed to sign in: " + JSON.stringify(error));
    } finally {
      setIsSubmitting(false);
    }
}

  return (
    <View className='gap-10 bg-white p-4 mt-5'>
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        label="Email"
        secureTextEntry={false}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton title="Sign In" onPress={submit} isLoading={isSubmitting} />
        <View className='w-full flex-col items-center justify-between mt-2'>
            <Text className="base-regular text-gray-100">
                Don&apos;t have an account?
            </Text>
            <Link href="/(auth)/sign-up" className="text-primary base-semibold">
                Sign Up
            </Link>
        </View>
    </View>
  )
}

export default SignIn