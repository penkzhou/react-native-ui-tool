import React from 'react'
import {
  StyleSheet, View
} from 'react-native'
import {PropTypes} from 'prop-types'
import {TabPage} from '../../index'

export default class Index extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    return (
      <View style={styles.container}>
        <TabPage
          title="TabPage"
          onBackEvent={() => {
            this.props.navigation.goBack()
          }}
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
