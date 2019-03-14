import React from 'react'
import {PropTypes} from 'prop-types'
import {
  StyleSheet, View
} from 'react-native'
import {NavigationBar} from '../../index'

export default class Index extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          backEvent={() => {
            this.props.navigation.goBack()
          }}
          backgroundColor="#529B4C"
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
