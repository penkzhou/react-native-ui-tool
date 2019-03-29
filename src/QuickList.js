import React from 'react'
import {
  SwipeableFlatList, View
} from 'react-native'
import {PropTypes} from 'prop-types'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import QuickActions from './QuickActions'
import Empty from './Empty'
import Style from './Style'

export default class QuickList extends React.Component {
  static propTypes = {
    data: PropTypes.any,
    renderItem: PropTypes.func.isRequired,
    header: PropTypes.func,
    btns: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.any,
      iconName: PropTypes.string,
      onPress: PropTypes.func.isRequired,
      backgroundColor: PropTypes.string,
      color: PropTypes.string
    })),
    onDelete: PropTypes.func,
    renderDetail: PropTypes.func
  }

  static defaultProps = {
    data: null,
    btns: [],
    onDelete: null,
    header: null,
    renderDetail: () => (<View />)
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

  renderDetail = (item) => {
    if (item._show) {
      return this.props.renderDetail(item)
    }
    return null
  }

  render() {
    this.i = -1
    const {
      data, renderItem, header
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
          ItemSeparatorComponent={({leadingItem}) => this.renderDetail(leadingItem)}
          ListFooterComponent={() => this.renderDetail(data[data.length - 1])}
          maxSwipeDistance={Style.listQuickWidth * btns.length}
          bounceFirstRowOnMount={false}
          disableVirtualization={false}
          keyExtractor={(it, idx) => `${idx}`}
          ListEmptyComponent={() => (<Empty />)}
          ListHeaderComponent={() => (header && header())}
        />
      )
    }
    return null
  }
}
