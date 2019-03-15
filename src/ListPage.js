import React from 'react'
import {PropTypes} from 'prop-types'
import {
  StyleSheet, ActivityIndicator, Text, View, FlatList, RefreshControl
} from 'react-native'
import Style from './Style'

export default class ListPage extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    renderItem: PropTypes.any.isRequired,
    getDataFunc: PropTypes.func.isRequired,
    idKey: PropTypes.string
  }

  static defaultProps = {
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
    this.refreshEvent()
  }

  componentWillUnmount() {
  }

  // 刷新事件
  refreshEvent = () => {
    this.setState({
      refreshing: true,
      total: 0,
      pageIndex: 1
    })
    this.getDataList(1)
  }

  // 加载更多事件
  loadMoreEvent = () => {
    const {pageIndex, pageTotal, dataList} = this.state
    if (pageTotal && dataList.length < pageTotal) {
      this.setState({
        loadingMore: true,
        pageIndex: pageIndex + 1
      })
      this.getDataList(pageIndex + 1)
    }
  }

  // 获取数据
  getDataList = (pageIndex) => {
    const {getDataFunc} = this.props
    getDataFunc({pageIndex}).then(({dataList, pageTotal}) => {
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
    setTimeout(() => {
      if (this.canLoadMore) {
        this.loadMoreEvent()
        this.canLoadMore = false
      }
    }, 100)
  }

  render() {
    const {idKey, renderItem} = this.props
    const RenderItem = renderItem
    const {dataList, refreshing} = this.state
    return (
      <View style={styles.container}>
        <FlatList
          data={dataList}
          renderItem={data => (<RenderItem {...data} />)}
          keyExtractor={data => data[idKey]}
          refreshControl={(
            <RefreshControl
              title="Loading"
              titleColor={Style.mainColor}
              colors={[Style.mainColor]}
              refreshing={refreshing}
              onRefresh={this.refreshEvent}
              tintColor={Style.mainColor}
            />
          )}
          ListFooterComponent={this.genIndicator}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
        />
      </View>
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
