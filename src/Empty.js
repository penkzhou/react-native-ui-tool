import React from 'react'
import {
  StyleSheet, Text, View, Image
} from 'react-native'
import {PropTypes} from 'prop-types'
import Style from './Style'
import {Button} from "react-native-ui-tool";

export default class Empty extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    text: PropTypes.string,
    bottom: PropTypes.func,
    onAdd: PropTypes.func,
    addText: PropTypes.string
  }

  static defaultProps = {
    show: true,
    text: Style.emptyText,
    bottom: null,
    onAdd: null,
    addText: Style.emptyAddText
  }

  render() {
    const {show, text, bottom, onAdd, addText} = this.props
    if (show) {
      return (
        <View style={styles.container}>
          <Image style={styles.image} source={Style.emptySource} />
          {text ? <Text style={styles.text}>{text}</Text> : null}
          {bottom && bottom()}
          {onAdd ? <Button style={styles.btn} textStyle={styles.btnText} onPress={onAdd} title={addText} /> : null }
        </View>
      )
    }
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Style.emptyPadding
  },
  image: {
    resizeMode: 'contain',
    width: Style.emptyWidth,
    height: Style.emptyHeight
  },
  text: {
    color: Style.emptyTextColor,
    fontSize: Style.emptyTextSize,
    marginTop: Style.emptyPadding
  },
  btn: {
    marginTop: Style.emptyPadding,
    backgroundColor: Style.emptyAddBackgroundColor,
    borderColor: Style.emptyAddBackgroundColor,
    height: Style.emptyAddTextHeight
  },
  btnText: {
    color: Style.emptyAddTextColor,
    fontSize: Style.emptyAddTextSize,
    height: Style.emptyAddTextHeight,
    lineHeight: Style.emptyAddTextHeight,
    paddingHorizontal: Style.emptyAddTextPadding
  }
})
