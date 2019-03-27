import React from 'react'
import {
  StyleSheet, View, TouchableWithoutFeedback
} from 'react-native'
import PropTypes from 'prop-types'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ImagePicker from 'react-native-image-crop-picker'
import Style from '../Style'
import ShowText from './ShowText'
import Util from './Util'

export default class InputText extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any
  }

  static defaultProps = {
    value: null
  }

  renderShowText = () => {
    const {value, input} = this.props
    const params = value ? {text: '已选择'} : {
      text: Util.getPlaceholder('请选择', input, '（必选）'),
      color: Style.formPlaceholderColor
    }
    return (
      <ShowText
        {...params}
        icon={input.readonly ? null : () => (<AntDesign name="caretdown" style={styles.icon} />)}
      />
    )
  }

  selectFile = () => {
    ImagePicker.openPicker({}).then(({path}) => {
      this.props.onChange({
        uri: path,
        type: 'multipart/form-data',
        name: path.substr(path.lastIndexOf('/') + 1)
      })
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.selectFile}>
        <View style={styles.container}>
          {this.renderShowText()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: Style.formTextHeight + Style.formTextPaddingVertical * 2
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
  picker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    backgroundColor: 'transparent' // to hide native icon
  }
})
