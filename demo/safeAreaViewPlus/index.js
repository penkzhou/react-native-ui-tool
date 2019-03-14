import React from 'react'
import {
  StyleSheet, View, Text
} from 'react-native'
import {SafeAreaViewPlus} from '../../index'

export default class Index extends React.Component {
  render() {
    return (
      <SafeAreaViewPlus>
        <View style={styles.container}>
          <Text>SafeAreaViewPlus</Text>
        </View>
      </SafeAreaViewPlus>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
