import React, { useEffect, Component } from "react";
import { SafeAreaView, Text, SectionList } from "react-native";
import sty from "../../styles";
import { useToast } from "react-native-styled-toast";
import { Card, ListItem, Button, Icon } from 'react-native-elements'

//Error on importing the styles better change the navigation
import Styles from "../../styles";
import global from "../login/Global";
import OrderItem from "./orderitem"; //file 
import { ScrollView } from "react-native";

const BookSample = [
  {
    OrderID: "OrderID1",
    UserID: "UserID2",
    OrderStatus: "1",
    OrderCreated: "1627927476",
    data:[{
      book_title: "Harry Potter and the Sorcerers Stone", 
      book_author: "J.K Rowling", 
      book_image: "https://i.insider.com/5c0ac5d19d860a228b0e84cd?width=750&format=jpeg&auto=webp"
  
    },
    {
      book_title: "Bad Guy", 
      book_author: "Aaron Blabey", 
      book_image: "https://www.readings.com.au/system/uploads/assets/0003/9960/533578a7ae4e5ca372c35ab959b9d920.jpg"
    }]    
    },
  {
    OrderID: "Education",
    data:[{
        book_title: "Where to Begin", 
        book_author: "Cleo Wade", 
      book_image: "https://images-na.ssl-images-amazon.com/images/I/71WwyeFvzvL.jpg"
    },
    {
        book_title: "Rich Dad Poor Dad", 
        book_author: "Robert T. Kiyosaki",
      book_image:"https://www.pidas81.org/wp-content/uploads/2021/03/cover_rich.jpg"
    }]
  },
  {
    OrderID: 'Horror',
    data: [
      {
        book_title: "Dracula",
        book_author: "Bram Stoker",
        book_image: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/4864/9780486411095.jpg"
      },
      {
        book_title: "IT",
        book_author: "Stephen King",
        book_image: "https://m.media-amazon.com/images/I/41nngxCNKxL.jpg"
      },]
  },
  {
    OrderID: 'Fiction',
    data: [{
      book_title: "Nineteen Eighty-Four",
      book_author: "George Orwell",
      book_image: "https://images-na.ssl-images-amazon.com/images/I/91SZSW8qSsL.jpg"
    },
    {
      book_title: "Where the Crawdads Sing",
      book_author: "Delia Owens",
      book_image: "https://images-na.ssl-images-amazon.com/images/I/81-349iYbfL.jpg"
    }]
  },
  {
    OrderID: 'Biography',
    data: [{
      book_title: "Steve Jobs",
      book_author: "Walter Isaacson",
      book_image: "https://m.media-amazon.com/images/I/41b+TUx+W9L.jpg"
    }]
  },
];


const _renderItem = ({ item }) => {
  return (
    <OrderItem coverURL={item.book_image} title={item.book_title} author={item.book_author}
    />
  );
};

const  _addKeysToBooks = orders => {
  return orders.map(orders => {
    return Object.assign(orders, { key: orders.title });
  });
};

const KitchenCurrentOrderTab = ({navigation}) => {
  const { toast } = useToast();
  const userObj = navigation.getParam("userObj");
  const user = global.user;
  const data = _addKeysToBooks(BookSample)

  KitchenCurrentOrderTabNavigation = navigation;

  useEffect(() => {
    toast({ message: "Login successfully" });
  }, []);

  return (
    <SafeAreaView style={sty.container}>
      <SectionList style={sty.kitchenOrderContainer} sections={BookSample}
      renderItem={_renderItem} 
      renderSectionHeader={({ section }) =>
      <Text style={sty.kitchenOrderSectionHeader}>{section.OrderID}</Text>
      }
      keyExtractor={(item, index) => index}
    />
    </SafeAreaView>
  );
};


export let KitchenCurrentOrderTabNavigation = {};
export default KitchenCurrentOrderTab;
