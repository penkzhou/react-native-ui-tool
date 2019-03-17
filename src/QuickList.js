import React from 'react'
import {
  SwipeableFlatList
} from 'react-native'
import {PropTypes} from 'prop-types'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Style from './Style'
import QuickActions from './QuickActions'
import Empty from './Empty'

export default class QuickList extends React.Component {
  static propTypes = {
    data: PropTypes.any,
    renderItem: PropTypes.func.isRequired,
    btns: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.any,
      iconName: PropTypes.string,
      onPress: PropTypes.func.isRequired,
      backgroundColor: PropTypes.string,
      color: PropTypes.string
    })),
    onDelete: PropTypes.func,
    onAdd: PropTypes.func,
    addText: PropTypes.string
  }

  static defaultProps = {
    data: null,
    btns: [],
    onDelete: null,
    onAdd: null,
    addText: Style.emptyAddText
  }

  close = () => {
    /* eslint-disable no-underscore-dangle */
    this.list._onClose()
  }

  getBtns = () => {
    const {btns, onDelete} = this.props
    const data = [].concat(btns)
    if (onDelete instanceof Function) {
      data.push({
        icon: MaterialIcons,
        iconName: 'delete',
        onPress: onDelete,
        backgroundColor: Style.danger,
        color: Style.white
      })
    }
    return data
  }

  render() {
    const {
      data, renderItem, onAdd, addText
    } = this.props
    if (data instanceof Array) {
      const btns = this.getBtns()
      return (
        <SwipeableFlatList
          ref={(ref) => { this.list = ref }}
          data={data}
          renderItem={({item, index}) => renderItem(item, index, !(data.length - index - 1))}
          renderQuickActions={(target) => (
            <QuickActions
              target={target}
              data={btns}
            />
          )}
          maxSwipeDistance={Style.listQuickWidth * btns.length}
          bounceFirstRowOnMount={false}
          disableVirtualization={false}
          keyExtractor={(it, idx) => `${idx}`}
          ListEmptyComponent={() => (<Empty onAdd={onAdd} addText={addText} />)}
        />
      )
    }
    return null
  }
}
