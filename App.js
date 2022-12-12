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
  Alert,
} from 'react-native';

export const App = () => {
  const [input, setInput] = useState();
  const [data, setData] = useState([]);
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
      Alert.alert(error.message);
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
        }}
        style={style.item}>
        <View style={style.wrapper}>
          <Image source={{uri: `${item.logo}`}} style={style.img} />
          <View style={style.info}>
            <Text style={style.name}>{item.name}</Text>
            <Text style={style.domain}>{item.domain}</Text>
          </View>
        </View>
      </Pressable>
    );
  };
  console.log(data);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={style.safeAreaView}>
        <Text style={style.label}>Компания</Text>
        <TextInput
          placeholder="Введите название компании"
          value={input}
          onChangeText={onChangeText}
          style={style.input}
        />
        {data.length ? (
          <FlatList
            data={data}
            renderItem={renderListItems}
            keyExtractor={item => item.domain}
            showsVerticalScrollIndicator
            style={style.list}
          />
        ) : null}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  label: {
    marginLeft: 13,
    marginVertical: 8,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: '#484848',
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    paddingHorizontal: 10,
  },
  img: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  item: {
    padding: 15,
  },
  list: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
  },
  domain: {
    marginTop: 5,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: '#9F9F9F',
  },
});
