import React from 'react'
import {
  StyleSheet, View
} from 'react-native'
import {PropTypes} from 'prop-types'
import {Buttons} from '../../index'

export default class Index extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    const items = [
      'Button',
      'Buttons',
      'SafeAreaViewPlus',
      'StatusBarPlus',
      'NavigationBar',
      'VerticalView',
      'TopBarPage'
    ]
    const data = items.map(title => ({
      title,
      theme: 'default',
      onPress: () => {
        this.props.navigation.navigate(title)
      }
    }))
    return (
      <View style={styles.container}>
        <Buttons
          data={data}
          layoutStyle={styles.buttons}
          style={styles.button}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  button: {
    marginBottom: 20
  }
})
