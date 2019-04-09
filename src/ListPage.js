import React from 'react'
import {PropTypes} from 'prop-types'
import {
  StyleSheet, ActivityIndicator, Text, View, FlatList, RefreshControl
} from 'react-native'
import Empty from './Empty'
import Style from './Style'

export default class ListPage extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    getParams: PropTypes.func,
    renderItem: PropTypes.func.isRequired,
    getDataFunc: PropTypes.func.isRequired,
    idKey: PropTypes.string
  }

  static defaultProps = {
    getParams: () => {},
    params: {},
    idKey: null
  }

  constructor(props) {
    super(props)
    this.state = {
      pageIndex: 1,
      pageTotal: 0,
      dataList: [],
      refreshing: false,
      loadingMore: false
    }
  }

  componentDidMount() {
    this.onRefresh()
  }

  componentWillUnmount() {
  }

  // 刷新事件
  onRefresh = () => {
    this.setState({
      refreshing: true,
      pageTotal: 0,
      pageIndex: 1
    })
    this.getDataList(1)
  }

  // 加载更多事件
  loadMoreEvent = () => {
    const {pageIndex, pageTotal} = this.state
    if (pageTotal && pageIndex < pageTotal) {
      this.setState({
        loadingMore: true,
        pageIndex: pageIndex + 1
      })
      this.getDataList(pageIndex + 1)
    }
  }

  // 获取数据
  getDataList = (pageIndex) => {
    const {getDataFunc, params, getParams} = this.props
    const extParams = getParams()
    getDataFunc({pageIndex}, {...params, ...extParams}).then(({dataList, pageTotal}) => {
      const prev = pageIndex <= 1 ? [] : this.state.dataList
      this.setState({
        pageTotal,
        loadingMore: false,
        refreshing: false,
        dataList: prev.concat(dataList)
      })
    })
  }

  // 渲染加载更多
  genIndicator = () => (this.state.loadingMore ? (
    <View style={styles.footer}>
      <ActivityIndicator
        style={styles.indicator}
      />
      <Text>正在加载更多</Text>
    </View>
  ) : <View style={styles.footer} />)

  // 开始滚动回调
  onMomentumScrollBegin = () => {
    this.canLoadMore = true
  }

  // 滚动到底部回调
  // fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
  onEndReached = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      if (this.canLoadMore) {
        this.loadMoreEvent()
        this.canLoadMore = false
      }
    }, 100)
  }

  render() {
    const {idKey, renderItem} = this.props
    const {dataList, refreshing} = this.state
    return (
      <FlatList
        data={dataList}
        renderItem={renderItem}
        keyExtractor={data => data[idKey]}
        refreshControl={(
          <RefreshControl
            title={Style.loadingTitle}
            titleColor={Style.loadingColor}
            colors={[Style.loadingColor]}
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            tintColor={Style.loadingColor}
          />
        )}
        ListFooterComponent={this.genIndicator}
        ListEmptyComponent={() => (refreshing ? null : <Empty />)}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={this.onMomentumScrollBegin}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabStyle: {
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30
  },
  indicator: {
    color: Style.mainColor,
    margin: 10
  }
})
