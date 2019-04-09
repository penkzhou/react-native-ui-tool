import React from 'react'
import {
  SwipeableFlatList, View
} from 'react-native'
import {PropTypes} from 'prop-types'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ItemLine from './ItemLine'
import SlideAnimation from './SlideAnimation'
import QuickActions from './QuickActions'
import VerticalView from './VerticalView'
import Empty from './Empty'
import Style from './Style'

export default class QuickList extends React.Component {
  static propTypes = {
    data: PropTypes.any,
    header: PropTypes.func,
    itemLineProps: PropTypes.func.isRequired,
    renderDetail: PropTypes.func,
    getDetailData: PropTypes.func,
    onDelete: PropTypes.func,
    actions: PropTypes.array,
    idKey: PropTypes.string,
    onLoadMore: PropTypes.func
  }

  static defaultProps = {
    data: null,
    header: null,
    renderDetail: null,
    getDetailData: null,
    onDelete: null,
    actions: [],
    idKey: null,
    onLoadMore: null
  }

  constructor(props) {
    super(props)
    this.state = {
      index: -1
    }
  }

  close = () => {
    /* eslint-disable no-underscore-dangle */
    this.list._onClose()
  }

  // 切换展开
  toggleDetail = (idx) => {
    const index = this.state.index === idx ? -1 : idx
    this.setState({index})
    this.close()
  }

  // 操作按钮
  getBtns = () => {
    const {actions, onDelete} = this.props
    const data = [].concat(actions)
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

  // 渲染行
  renderItem = ({item, index}) => {
    const {itemLineProps} = this.props
    if (!item.isSkipQuickAction) {
      return (
        <ItemLine
          onPress={() => { this.toggleDetail(index + 1) }}
          {...itemLineProps(item)}
        />
      )
    }
    if (index === this.state.index) {
      return this.renderDetail(item)
    }
    return null
  }

  // 渲染详情
  renderDetail = (item) => {
    const {getDetailData, renderDetail} = this.props
    if (renderDetail) {
      return renderDetail(item)
    }
    if (getDetailData) {
      return (
        <SlideAnimation padding={10}>
          <View style={{backgroundColor: 'white'}}>
            <VerticalView data={getDetailData(item)} />
          </View>
        </SlideAnimation>
      )
    }
    return null
  }

  // 渲染按钮
  renderQuickActions = (btns, item) => {
    if (btns.length && !item.isSkipQuickAction) {
      return (
        <QuickActions
          target={item}
          data={btns}
        />
      )
    }
    return null
  }

  // 滚动到底部回调
  onEndReached = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      if (this.props.onLoadMore) {
        this.props.onLoadMore()
      }
    }, 100)
  }


  render() {
    const {data, idKey, header} = this.props
    if (data instanceof Array) {
      const btns = this.getBtns()
      return (
        <SwipeableFlatList
          ref={(ref) => { this.list = ref }}
          data={data}
          renderItem={this.renderItem}
          renderQuickActions={({item}) => this.renderQuickActions(btns, item)}
          maxSwipeDistance={Style.listQuickWidth * btns.length}
          bounceFirstRowOnMount={false}
          disableVirtualization={false}
          keyExtractor={(item, idx) => (idKey ? item[idKey] : `${idx}`)}
          ListEmptyComponent={() => (<Empty />)}
          ListHeaderComponent={() => (header && header())}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
        />
      )
    }
    return null
  }
}
