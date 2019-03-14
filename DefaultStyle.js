import {PixelRatio, DeviceInfo, Platform} from 'react-native'

export default class DefaultStyle {
  static blueWhite = '#EBF1FF'

  static blueLight = '#8aa8f4'

  static blue = '#4275f4'

  static blueDark = '#2f63e6'

  static aquamarine = '#46d9be'

  static cyanDark = '#6dbccd'

  static mainColor = DefaultStyle.blue

  static mainColorFocus = DefaultStyle.blueDark

  static borderColor = '#e3e3e3'

  static textColor = '#333'

  static labelColor = '#aaa'

  static placeholderColor = '#666666'

  static primary = DefaultStyle.mainColor

  static success = '#5cb85c'

  static warning = '#f0ad4e'

  static danger = '#d9534f'

  // Button
  static btnBorderRadius = 2

  static btnHeight = 35

  static btnFontSize = 12

  // SafeAreaViewPlus
  static safeAreaTopHeight = 44

  static safeAreaBottomHeight = 34

  // NavigationBar
  static barBackIconSize = 26

  static barBackIconColor = 'white'

  // Form
  static formTextPaddingVertical = 5

  static formTextHeight = 20

  static formWarningHeight = 22

  static formWarningFontSize = 10

  static formWarningLineHeight = 20

  static formWarningColor = DefaultStyle.warning

  static formBorderColorWarning = DefaultStyle.warning

  static formBorderColorFocus = DefaultStyle.blue

  static formBorderColor = DefaultStyle.borderColor

  static formTextColor = '#000000'

  static formPlaceholderColor = '#cdd3e3'

  // 导航栏在iOS中的高度
  static navBarHeightIos = 44

  // 导航栏在Android中的高度
  static navBarHeightAndroid = 50

  // 导航栏的高度
  static navBarHeight = Platform.OS === 'ios' ? DefaultStyle.navBarHeightIos : DefaultStyle.navBarHeightAndroid

  // 状态栏在iOS中的高度
  static statusBarHeightIos = DeviceInfo.isIPhoneX_deprecated ? 0 : 20

  // 状态栏的高度
  static statusBarHeight = Platform.OS === 'ios' ? DefaultStyle.statusBarHeightIos : 0

  // 圆角
  static radius = 2

  // 1像素
  static px = 1 / PixelRatio.get()

  // 阴影
  static shadow = {
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  }

  // 横向居中
  static flexRow = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }

  // lineBottom
  static lineBottom = {
    borderBottomWidth: DefaultStyle.px,
    borderBottomColor: DefaultStyle.borderColor
  }
}
