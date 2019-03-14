import React from 'react'
import {
  TouchableOpacity, StyleSheet, View, Text, FlatList
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class Ui {
  /**
   * 获取TABS列表
   * @param tabs Array [{text: '业务概况', key: '1'}]
   * @returns {XML}
   */
  static getStickyTabs(tabs) {
    return (
      <FlatList
        data={tabs}
        horizontal
        renderItem={({item}) => (
          <TouchableOpacity>
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    )
  }
  /**
   * 获取左侧返回按钮
   * @param onPress
   * @returns {XML}
   */
  static getLeftBackButton(onPress) {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={onPress}
      >
        <Ionicons
          name="ios-arrow-back"
          size={26}
          style={{color: 'white'}}
        />
      </TouchableOpacity>
    )
  }
}
