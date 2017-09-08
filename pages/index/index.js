const util = require('../../utils/util.js')

//获取应用实例
const app = getApp()

Page({

  data: {
    userInfo: {},
    epoch: "2017-07-17",
    days: 0
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }

    wx.showShareMenu({
      withShareTicket: true
    })
  },

  onReady: function () {
    wx.showToast({
      title: 'onReady',
      icon: 'success',
      duration: 1000
    })
  },

  onShow: function () {
    wx.showToast({
      title: 'onShow',
      icon: 'success',
      duration: 1000
    })

    this.setData({
      days: util.getDays(this.data.epoch)
    })
  },

  onHide: function () {
    wx.showToast({
      title: 'onHide',
      icon: 'success',
      duration: 1000
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: 'Togother Times',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  bindDateChange: function (e) {
    this.setData({
      epoch: e.detail.value,
      days: util.getDays(e.detail.value)
    })
  }
})
