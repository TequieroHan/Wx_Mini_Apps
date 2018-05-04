var util = require('../../utils/util.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    weekly: {},
    newMovies: {},
  },

  onSearch: function (even) {
    wx.navigateTo({
      url: '/pages/move/search/search',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //正在上映
    var inTheatersURL = app.globalData.g_api + "/v2/movie/in_theaters";
    var comingSoonURL = app.globalData.g_api + "/v2/movie/coming_soon";
    var top250URL = app.globalData.g_api + "/v2/movie/top250";

    this.movesData(inTheatersURL, "inTheaters", "正在上映");
    this.movesData(comingSoonURL, "comingSoon", "即将上映");
    this.movesData(top250URL, "top250", "Top250");
  },
  /*
  *豆瓣网络请求
  */
  movesData: function (moveulr, inTheaters, title) {
    var that = this;
    wx.request({
      url: moveulr + "?start=0&count=3",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.processDoubanData(res.data, inTheaters, title);
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    });
  },
  /**
   * 豆瓣网络数据接受
   */
  processDoubanData: function (data, settedKey, titleName) {
    var movies = [];

    for (var index in data.subjects) {
      var subject = data.subjects[index];
      var title = subject.title
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        stars: util.startCount(subject.rating.stars),
        average: subject.rating.average,
        image: subject.images.large,
        title: title,
        id: subject.id,
      }
      movies.push(temp);
    };
    var readyData = {};
    readyData[settedKey] = { movies, nameTitle: titleName, };
    this.setData(readyData);
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