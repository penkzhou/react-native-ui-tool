import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  ViewPropTypes,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import FormItem from './form/FormItem'
import Validate from './form/Validate'
import Style from './Style'

export default class Form extends React.Component {
  static propTypes = {
    behavior: PropTypes.oneOf(['none', 'height', 'position', 'padding']),
    keyboardVerticalOffset: PropTypes.number,
    formStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
    inputs: PropTypes.array,
    original: PropTypes.object,
    onChange: PropTypes.func,
    header: PropTypes.func,
    bottom: PropTypes.func,
    loading: PropTypes.bool,
    label: PropTypes.bool
  }

  static defaultProps = {
    behavior: 'none',
    keyboardVerticalOffset: 0,
    formStyle: null,
    style: {},
    inputs: [],
    original: {},
    onChange: () => {},
    header: null,
    bottom: null,
    loading: false,
    label: false
  }

  constructor(props) {
    super(props)
    this.state = {
      formData: {}
    }
  }

  // 表单验证 -> callback
  check = (callback, errorHandler) => {
    this.validate().then(({formData}) => {
      if (callback instanceof Function) {
        const {original} = this.props
        callback({
          formData,
          original,
          params: {...original, ...formData}
        })
      }
    }).catch((fields) => {
      if (errorHandler instanceof Function) errorHandler(fields)
    })
  }

  // 表单验证 -> Promise
  validate = () => {
    const {inputs} = this.props
    const {formData} = this.state
    return new Promise((resolve, reject) => {
      Validate.validate(inputs, formData).then(() => {
        resolve({formData})
      }).catch((fields) => {
        Object.values(fields).forEach(([{field, message}]) => {
          if (this.refs[field]) this.refs[field].warning({message})
        })
        reject(fields)
      })
    })
  }

  // FormItem 组件回调
  itemChangeEvent = (name, value) => {
    const {onChange} = this.props
    const {formData} = this.state
    formData[name] = value
    this.setState({formData})
    onChange(name, value)
  }

  // Loading
  renderLoading = () => (
    <ActivityIndicator
      animating
      color={Style.mainColor}
      size="large"
    />
  )

  render() {
    const {
      behavior, keyboardVerticalOffset, style, formStyle, inputs, header, bottom, loading, label
    } = this.props
    const Content = behavior === 'none' ? View : KeyboardAvoidingView
    return (
      <Content
        style={formStyle || styles.container}
        behavior={behavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
        enabled
      >
        {header && header()}
        {loading && this.renderLoading()}
        <View style={style}>
          {inputs.map(input => (
            <FormItem
              ref={input.name}
              key={input.name}
              input={input}
              showLabel={label}
              onChange={this.itemChangeEvent}
            />
          ))}
        </View>
        {bottom && bottom()}
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Style.formPadding
  }
})
