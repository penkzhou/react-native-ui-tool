import React from 'react'
import {
  StyleSheet, View
} from 'react-native'
import {VerticalView} from '../../index'

export default class Index extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VerticalView
          data={[
            [
              {
                label: 'label1',
                text: 'text1'
              },
              {
                label: 'label2',
                text: 'text2'
              },
              {
                label: 'label3',
                text: 'text3',
                onPress: () => {}
              },
              {
                label: 'label4',
                text: 'text4',
                onPress: () => {}
              }
            ],
            [
              {
                label: 'label5',
                text: 'text5'
              },
              {
                label: 'label6',
                text: 'text6'
              },
              {
                label: 'label7',
                text: 'text7',
                onPress: () => {}
              },
              {
                label: 'label8',
                text: 'text8',
                onPress: () => {}
              }
            ]
          ]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
