import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  ViewPropTypes
} from 'react-native'
import PropTypes from 'prop-types'
import FormItem from './form/FormItem'
import Validate from './form/Validate'

export default class Form extends React.Component {
  static propTypes = {
    behavior: PropTypes.oneOf(['height', 'position', 'padding']),
    formStyle: ViewPropTypes.style,
    inputs: PropTypes.array,
    onChange: PropTypes.func
  }

  static defaultProps = {
    behavior: 'padding',
    formStyle: null,
    inputs: [],
    onChange: () => {}
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
      if (callback instanceof Function) callback({formData})
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

  render() {
    const {formStyle, behavior, inputs} = this.props
    return (
      <KeyboardAvoidingView
        style={[styles.container, formStyle]}
        behavior={behavior}
      >
        {inputs.map(input => (
          <FormItem
            ref={input.name}
            key={input.name}
            input={input}
            onChange={this.itemChangeEvent}
          />
        ))}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  }
})
