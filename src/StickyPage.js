import React from 'react'
import {PropTypes} from 'prop-types'
import {
  SectionList, StyleSheet, View, FlatList, Text, TouchableWithoutFeedback, ViewPropTypes
} from 'react-native'
import Style from './Style'

export default class StickyPage extends React.Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      key: PropTypes.string,
      screen: PropTypes.func
    })).isRequired,
    initIndex: PropTypes.number,
    header: PropTypes.func,
    styleTabContainer: ViewPropTypes.style,
    styleTab: ViewPropTypes.style,
    styleTabText: ViewPropTypes.style,
    tabActiveColor: PropTypes.string,
    indicatorStyle: ViewPropTypes.style,
    indicatorColor: PropTypes.string,
    renderTabItem: PropTypes.func,
    backgroundColor: PropTypes.string,
    backgroundHeight: PropTypes.number
  }

  static defaultProps = {
    initIndex: 0,
    header: null,
    styleTabContainer: {},
    styleTab: {},
    styleTabText: {},
    renderTabItem: null,
    tabActiveColor: Style.stickyTabActiveColor,
    backgroundColor: Style.stickyBackgroundColor,
    backgroundHeight: 10,
    indicatorStyle: {},
    indicatorColor: Style.stickyIndicatorBackgroundColor
  }

  constructor(props) {
    super(props)
    const {tabs, initIndex} = this.props
    this.state = {
      active: tabs[initIndex].key,
      data: {}
    }
  }

  componentDidUpdate(pr, state) {
    const current = this.state.active
    if (current !== state.active) {
      const {dataInit} = this.screen
      if (dataInit instanceof Function) dataInit()
    }
  }

  toggleTab = ({key}) => {
    if (this.state.action !== key) {
      this.setState({
        active: key
      })
    }
  }

  renderHeader = () => {
    const {backgroundHeight} = this.props
    return (
      <View style={{paddingBottom: backgroundHeight}}>
        <View style={styles.bgWhite}>
          {this.props.header()}
        </View>
      </View>
    )
  }

  renderSectionHeader = () => {
    const {
      tabs, styleTabContainer, renderTabItem, styleTab, styleTabText, tabActiveColor, indicatorStyle, indicatorColor
    } = this.props
    const {active} = this.state
    return (
      <FlatList
        style={[styles.bgWhite, styleTabContainer]}
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          if (renderTabItem) return renderTabItem({item})
          const textStyle = {...styleTabText}
          const indiStyle = {...indicatorStyle}
          if (item.key === active) {
            textStyle.color = tabActiveColor
            indiStyle.backgroundColor = indicatorColor
          }
          return (
            <View style={[styles.stickyTab, styleTab]}>
              <TouchableWithoutFeedback onPress={() => this.toggleTab(item)}>
                <Text style={[styles.stickyTabText, textStyle]}>{item.text}</Text>
              </TouchableWithoutFeedback>
              <View style={[styles.indicatorStyle, indiStyle]} />
            </View>
          )
        }}
      />
    )
  }

  renderItem = () => {
    const {tabs, backgroundHeight} = this.props
    const {active, data} = this.state
    const tab = tabs.find(it => it.key === active)
    const Screen = tab.screen
    return (
      <View style={{paddingVertical: backgroundHeight}}>
        <View style={styles.bgWhite}>
          <Screen
            tab={tab}
            ref={(screen) => { this.screen = screen }}
            data={data[active]}
            setData={(newData) => {
              this.setState({
                data: {...this.state.data, [active]: newData}
              })
            }}
          />
        </View>
      </View>
    )
  }

  render() {
    const {backgroundColor} = this.props
    const sections = [{key: 'key', data: ['item']}]
    return (
      <SectionList
        style={[styles.container, {backgroundColor}]}
        ListHeaderComponent={this.renderHeader}
        renderSectionHeader={this.renderSectionHeader}
        stickySectionHeadersEnabled
        keyExtractor={(item, index) => index}
        renderItem={this.renderItem}
        sections={sections}
      />
    )
  }
}

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: 'white'
  },
  stickyTab: {
    paddingHorizontal: 20
  },
  stickyTabText: {
    height: Style.stickyTabHeight,
    lineHeight: Style.stickyTabHeight,
    color: Style.stickyTabTextColor
  },
  indicatorStyle: {
    height: 2
  }
})
