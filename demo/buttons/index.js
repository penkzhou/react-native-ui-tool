import React from 'react'
import {
  StyleSheet, View
} from 'react-native'
import {Buttons} from '../../index'

export default class Index extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Buttons
          data={[
            {
              title: 'Button1',
              theme: 'default',
              onPress: () => {}
            },
            {
              title: 'Button2',
              theme: 'default',
              onPress: () => {}
            }
          ]}
          layoutStyle={styles.buttons}
          style={styles.button}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    flex: 1
  }
})
