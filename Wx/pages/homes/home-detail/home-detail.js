var postsData = require('../../../data/posts-data.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: true,
    isCollent: false
  },
  /**
   * 分享
   */
  onCatchtap: function (even) {
    wx.showActionSheet({
      itemList: ["QQ空间", "微信朋友圈", "腾讯微博", "QQ好友", "微信好友"],
      itemColor: "#3CC51F",
      success: function (res) {

      },
      fail: function (res) {

      }
    })

  },

  /**
   * 点击音乐按钮
   */
  onTouchMusic: function (even) {
    var isPlayingMusic = this.data.isPlayingMusic;

    if (isPlayingMusic) {
      var musicURL = this.data.homedata.music.url;
      wx.playBackgroundAudio({
        dataUrl: musicURL,
        title: this.data.homedata.music.title,
        coverImgUrl: this.data.homedata.music.coverImg,
      });
      this.setData({
        isPlayingMusic: false
      });
    } else {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: true
      });
    }
  },
  /**
   * 处理收藏按钮
   */
  collectContent: function (even) {
    var currentcollent = wx.getStorageSync("post_collent")
    if (currentcollent) {
      var currentcollent = currentcollent[this.data.postcurrentid];
      if (currentcollent) {
        this.setData({
          isCollent: currentcollent
        })
      }

    } else {
      var currentcollent = {};
      currentcollent[this.data.postcurrentid] = false;
      wx.setStorageSync("post_collent", currentcollent);
    }
  },
  /**
   * 收藏点击事件
   */
  onCollent: function (even) {
    var currentcollent = wx.getStorageSync("post_collent")
    var iscollent = currentcollent[this.data.postcurrentid];
    iscollent = !iscollent;
    currentcollent[this.data.postcurrentid] = iscollent;
    wx.setStorageSync("post_collent", currentcollent);
    this.setData({
      isCollent: iscollent
    });
    wx.showToast({
      title: iscollent ? "收藏成功" : "取消收藏",
      duration: 1000,
      icon: "success"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var postid = options.postid;
    var homeData = postsData.postList[postid];
    wx.setNavigationBarTitle({
      title: homeData.music.title,
    });
    this.setData({
      homedata: homeData,
      postcurrentid: postid
    });
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postid) {
      this.setData({
        isPlayingMusic: true
      })
    }
    wx.onBackgroundAudioPause(function () {
      var cPages = getCurrentPages();
      var currentPage = cPages[cPages.length - 1];
      if (currentPage.data.postcurrentid === that.data.postcurrentid) {
        if (app.globalData.g_currentMusicPostId == that.data.postcurrentid) {
          that.setData({
            isPlayingMusic: false
          })
        }
      }
      app.globalData.g_isPlayingMusic = false;
    });

    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
    });

    wx.onBackgroundAudioPlay(function () {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.postcurrentid === that.data.postcurrentid) {
        // 打开多个post-detail页面后，每个页面不会关闭，只会隐藏。通过页面栈拿到到
        // 当前页面的postid，只处理当前页面的音乐播放。
        if (app.globalData.g_currentMusicPostId == that.data.postcurrentid) {
          // 播放当前页面音乐才改变图标
          that.setData({
            isPlayingMusic: true
          })
        }
      }
      app.globalData.g_isPlayingMusic = true;
    });
    //处理收藏按钮
    this.collectContent();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})