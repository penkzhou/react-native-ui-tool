import React from 'react'
import {
  View,
  ActivityIndicator,
  Modal,
  StyleSheet
} from 'react-native'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  // 显示Loading
  show = () => {
    this.setState({visible: true})
  }

  // 隐藏Loading
  close = () => {
    this.setState({visible: false})
  }

  render() {
    if (!this.state.visible) {
      return null
    }
    return (
      <Modal
        animationType="none"
        transparent
        visible={this.state.visible}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <View style={styles.box}>
            <ActivityIndicator
              style={styles.indicator}
              animating
              color="white"
              size="large"
            />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 100,
    height: 100,
    alignItems: 'center'
  },
  indicator: {
    marginTop: 20,
    width: 60,
    height: 60
  }
})
