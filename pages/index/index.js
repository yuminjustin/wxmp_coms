//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    /* canvas */
    w: app.globalData.screen.windowWidth * 2,
    /* 手机屏幕等宽 */
    h: 0,
    src:''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onGotUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  uploadSucc(){

  },
  uploadTmp(params) {
    let context = wx.createCanvasContext('micro'),
      w = this.data.w;
    wx.getImageInfo({
      src: params[0], // 插件传来的图片
      success: (res2) => {
        let h = Math.floor(w * res2.height / res2.width);
        this.h = h * 2;
        context.drawImage(params[0], 0, 0, w, h);
        context.draw(true);
        setTimeout(() => {
          wx.canvasToTempFilePath({
            quality: 1, //高质量
            canvasId: 'micro',
            destWidth: w,
            destHeight: h,
            success(res) {
              params[1](res.tempFilePath); // 回传给插件
              context.clearRect(0, 0, w, h); // 清空canvas
              // _self.w = 0;
              // _self.hh = 0;
            },
            fail(err) {
              console.log(err)
            }
          }, this);
        }, 5e2);
      }
    });
  }
})