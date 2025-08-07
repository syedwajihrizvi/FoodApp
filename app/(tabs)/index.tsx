import { images, offers } from "@/constants";
import cn from "clsx";
import { Fragment } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartButton from "../components/CartButton";
import "../global.css";
 
export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList 
      className="w-full p-2" data={offers}
      ListHeaderComponent={() => {
        return (
          <View className="flex-row flex-between items-center justify-between py-3">
            <View className="flex-start">
              <Text className="small-bold text-primary">Deliver To</Text>
              <TouchableOpacity className="flex-row items-center flex-center gap-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">Croatia</Text>
                <Image source={images.arrowDown} className="size-3" resizeMode="contain"/>
              </TouchableOpacity>
            </View>
            <CartButton/>
          </View>
        )
      }}
      renderItem={({item, index}) => {
        const isEven = index % 2 === 0;
        return (
          <View>
            <Pressable 
              className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')} 
              style={{backgroundColor: item.color}} android_ripple={{color: "#fffff22"}}>
              {({pressed}) => (
                <Fragment>
                  <View className="h-full w-1/2">
                    <Image source={item.image} className="size-full" resizeMode="contain"/>
                  </View>
                  <View className={cn("offer-card__info", isEven ? 'pl-10' : 'pr-10')}>
                    <Text className="h1-bold text-white">{item.title}</Text>
                    <Image source={images.arrowRight} className="size-10" resizeMode="contain" tintColor="#fff"/>
                  </View>
                </Fragment>
              )}
            </Pressable>
          </View>
        )
      }}
      contentContainerClassName="pb-28 px-5"/>
    </SafeAreaView>
  );
}