import React from 'react'
import {Modal, ScrollView} from 'react-native'
import {PropTypes} from 'prop-types'
import TabPage from './TabPage'
import KeyboardScrollView from './KeyboardScrollView'

export default class ModalTabPage extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    onRightEvent: PropTypes.func.isRequired,
    onShow: PropTypes.func,
    onHide: PropTypes.func
  }

  static defaultProps = {
    onShow: () => {},
    onHide: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  show = () => {
    this.toggleModal(true)
    this.props.onShow()
  }

  hide = () => {
    this.toggleModal(false)
    this.props.onHide()
  }

  toggleModal = (visible) => {
    this.setState({visible})
  }

  render() {
    const {
      title, onRightEvent, children
    } = this.props
    return (
      <Modal
        transparent={false}
        animationType="slide"
        onRequestClose={this.hide}
        visible={this.state.visible}
      >
        <TabPage
          title={title}
          onBackEvent={this.hide}
          rightButton="保存"
          onRightEvent={onRightEvent}
          backHandler={false}
        >
          <KeyboardScrollView style={{flex: 1}}>
            {children}
          </KeyboardScrollView>
        </TabPage>
      </Modal>
    )
  }
}
