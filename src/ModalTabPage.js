import React from 'react'
import {Modal} from 'react-native'
import {PropTypes} from 'prop-types'
import TabPage from './TabPage'

export default class SysAccountModify extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    onRightEvent: PropTypes.func.isRequired,
    onShow: PropTypes.func
  }

  static defaultProps = {
    onShow: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  onModalShow = () => {
    if (!this.first) {
      this.first = true
      this.props.onShow()
    }
  }

  show = () => {
    this.toggleModal(true)
  }

  hide = () => {
    this.toggleModal(false)
  }

  toggleModal = (visible) => {
    this.setState({visible})
  }

  render() {
    const {visible} = this.state
    const {
      title, onRightEvent, children
    } = this.props
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={this.hide}
        onShow={this.onModalShow}
      >
        <TabPage
          title={title}
          onBackEvent={this.hide}
          rightButton="保存"
          onRightEvent={onRightEvent}
          backHandler={false}
        >
          {children}
        </TabPage>
      </Modal>
    )
  }
}
