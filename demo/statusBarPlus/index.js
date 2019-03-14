import React from 'react'
import {
  StyleSheet, View
} from 'react-native'
import {StatusBarPlus} from '../../index'

export default class Index extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBarPlus backgroundColor="green" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
