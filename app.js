//app.js

App({
  globalData: {
    credential: null,
    userInfo: null,
    epoch: null
  },

  onLaunch: function (ops) {
    // Local logs
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 带 shareTicket 的小程序消息卡片
    if (ops.scene == 1044) {
      console.log(ops.shareTicket)

      wx.showToast({
        title: ops.shareTicket,
        icon: 'success',
        duration: 1000
      })
    }

    // 1. 登录
    wx.login({
      success: res => {
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session',
        //   data: {
        //     appid: 'wx2304442956213c93',
        //     secret: 'ef4a8ebcee367a94a15f1c56b3bd8530',
        //     js_code: res.code,
        //     grant_type: 'authorization_code'
        //   },
        //   success: res => {
        //     this.globalData.credential = res.data
        //   }
        // })
      }
    })

    // 2. 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.getUserInfo()
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success: res => {
              console.log(res.errMsg)
              this.getUserInfo()
            }
          })
        }
      }
    })
  },

  onShow: function () {
    wx.showToast({
      title: 'Love',
      icon: 'sucess',
      duration: 1000
    })
  },

  onHide: function () {
    wx.showToast({
      title: 'Wait',
      icon: 'sucess',
      duration: 1000
    })
  },

  getUserInfo: function () {
    wx.getUserInfo({
      success: res => {
        this.globalData.userInfo = res.userInfo

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回, 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  }
})
