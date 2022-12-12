import React, {useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  Pressable,
  Image,
} from 'react-native';

export const TabTwoScreen = () => {
  const [input, setInput] = useState();
  const [data, setData] = useState();
  const onChangeText = async text => {
    setInput(text);
    if (text.length === 0) {
      setData([]);
    }
    if (text.length > 2) {
      getData(text);
    }
  };

  const getData = async name => {
    try {
      const response = await axios.get(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`,
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderListItems = (elem, index) => {
    const {item} = elem;
    console.log(item);
    return (
      <Pressable
        onPress={() => {
          setInput(item.name);
          setData([]);
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image source={{uri: `${item.logo}`}} width={20} height={20} />
          <Text>{item.name}</Text>
        </View>
      </Pressable>
    );
  };
  console.log(data);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1}}>
        <Text style={{marginLeft: 12, marginVertical: 5, fontSize: 12}}>
          Компания
        </Text>
        <TextInput
          placeholder="Введите название компании"
          value={input}
          onChangeText={onChangeText}
          style={style.input}
        />
        <FlatList
          data={data}
          renderItem={renderListItems}
          keyExtractor={item => item.domain}
          showsVerticalScrollIndicator
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
