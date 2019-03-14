import React from 'react'
import {
  StyleSheet, View
} from 'react-native'
import {Button} from '../../index'

export default class Index extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => {}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  }
})
