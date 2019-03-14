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
      pageParams: {
        PageIndex: 1,
        PageSize: 20
      },
      dataList: [],
      total: 0,
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
    const {PageSize} = this.state.pageParams
    const pageParams = {
      PageIndex: 1,
      PageSize
    }
    this.setState({
      refreshing: true,
      total: 0,
      pageParams
    })
    this.getDataList(pageParams)
  }

  // 加载更多事件
  loadMoreEvent = () => {
    const {pageParams, total, dataList} = this.state
    pageParams.PageIndex += 1
    if (total && dataList.length < total) {
      this.setState({
        loadingMore: true,
        pageParams
      })
      this.getDataList(pageParams)
    }
  }

  // 获取数据
  getDataList = (pageParams) => {
    const {params, getDataFunc} = this.props
    getDataFunc({...params, ...pageParams}).then(({dataList, total}) => {
      const prev = pageParams.PageIndex <= 1 ? [] : this.state.dataList
      this.setState({
        total,
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
