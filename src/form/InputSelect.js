import React from 'react'
import {
  StyleSheet, View, TouchableWithoutFeedback, Modal
} from 'react-native'
import PropTypes from 'prop-types'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Picker from 'react-native-picker'
import Style from '../Style'
import ShowText from './ShowText'
import Util from './Util'

export default class InputText extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    style: PropTypes.any
  }

  static defaultProps = {
    value: null,
    style: null
  }

  constructor(props) {
    super(props)
    this.state = {
      option: [],
      show: false
    }
  }

  componentWillMount() {
    // 如果option为Function，获取数据
    Util.getDataByFunc(this.props.input.option, (option) => this.setState({option}))
  }

  // 获取Placeholder once
  getPlaceholder = () => {
    if (!this.placeholder) {
      const Text = Util.getPlaceholder('请选择', this.props.input, '（必选）')
      this.placeholder = {Text, Value: null, color: Style.formPlaceholderColor}
    }
    return this.placeholder
  }

  // 获取Options
  getOptions = () => {
    const {option} = this.props.input
    return option instanceof Array ? option : this.state.option
  }

  // 获取所有Options
  getFullOptions = () => [this.getPlaceholder()].concat(this.getOptions())

  // 渲染文本
  renderShowText = () => {
    const {value, input} = this.props
    const {Text, color = Style.formTextColor} = Util.findOption(value, this.getFullOptions())
    return (
      <ShowText
        text={Text}
        color={color}
        readonly={!!input.readonly}
        icon={input.readonly ? null : () => (<AntDesign name="caretdown" style={styles.icon} />)}
      />
    )
  }

  // 显示选择器
  showModal = () => {
    if (!this.props.input.readonly) {
      this.setState({show: true})
      this.props.onFocus()
      setTimeout(() => {
        this.showPicker()
      }, 20)
    }
  }

  // 关闭选择器
  closeModal = () => {
    this.setState({show: false})
    if (Picker.isPickerShow) Picker.hide()
    this.props.onBlur()
  }

  // 选择器参数
  getPickerConfig = () => {
    if (!this.pickerConfig) {
      this.pickerConfig = {
        pickerConfirmBtnText: '确认',
        pickerCancelBtnText: '取消',
        pickerTextEllipsisLen: 20,
        pickerConfirmBtnColor: [66, 117, 244, 1],
        pickerCancelBtnColor: [66, 117, 244, 1],
        pickerTitleColor: [102, 102, 102, 1],
        pickerTitleText: this.getPlaceholder().Text,
        onPickerCancel: this.closeModal,
        onPickerConfirm: (v, [idx]) => {
          const {onChange, input} = this.props
          onChange(input.name, this.getOptions()[idx].Value)
          this.closeModal()
        }
      }
    }
    return this.pickerConfig
  }

  // 渲染选择器
  showPicker = () => {
    const options = this.getOptions()
    if (!options.length) {
      options.push({Text: ' '})
    }
    const current = Util.findOption(this.props.value, options)
    Picker.init({
      ...this.getPickerConfig(),
      pickerData: options.map((it) => it.Text),
      selectedValue: [current.Text]
    })
    Picker.show()
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.showModal}>
        <View style={[styles.container, this.props.style]}>
          {this.renderShowText()}
          <Modal
            transparent
            animationType="fade"
            visible={this.state.show}
            onRequestClose={this.closeModal}
          >
            <TouchableWithoutFeedback onPress={this.closeModal}>
              <View style={styles.modalStyle} />
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: Style.formTextHeight + Style.formTextPaddingVertical * 2,
    position: 'relative'
  },
  input: {
    padding: 0,
    height: Style.formTextHeight + Style.formTextPaddingVertical * 2,
    lineHeight: Style.formTextHeight,
    paddingVertical: Style.formTextPaddingVertical
  },
  icon: {
    fontSize: 14,
    paddingHorizontal: 10,
    color: Style.formPlaceholderColor
  },
  modalStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
})
