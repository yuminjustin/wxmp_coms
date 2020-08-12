//app.js
import {
  compareVersion
} from './utils/util'
App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });

    wx.getSystemInfo({
      success: (result) => {
        this.globalData.screen = result;
      }
    });

  },
  updateApp() {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        wx.showLoading({
          title: '更新下载中...',
        })
      }
    })
    updateManager.onUpdateReady(function () {
      wx.hideLoading();
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.hideLoading();
      wx.showToast({
        title: '下载失败，请检查网络后重试',
        icon: "none"
      });
    })
  },
  checkVersion() {
    const version = wx.getSystemInfoSync().SDKVersion;
    if (compareVersion(version, '2.11.3') >= 0) {
      return;
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    userInfo: {},
    screen: {}
  }
})