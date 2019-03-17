import React from 'react'
import {PropTypes} from 'prop-types'
import {RefreshControl} from 'react-native'
import Style from './Style'

export default class RefreshControlPlus extends React.Component {
  static propTypes = {
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
  }

  static defaultProps = {
    refreshing: true,
    onRefresh: () => {}
  }

  render() {
    const {refreshing, onRefresh} = this.props
    return (
      <RefreshControl
        title={Style.loadingTitle}
        titleColor={Style.loadingColor}
        colors={[Style.loadingColor]}
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={Style.loadingColor}
      />
    )
  }
}
