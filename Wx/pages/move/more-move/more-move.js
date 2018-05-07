var app = getApp();
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount: 0,
    movies: {},
    isEmpty: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var nametitle = options.nametitle;
    this.setData({ nametitle: nametitle });
    wx.setNavigationBarTitle({
      title: nametitle,
    });
    this.httpURL(this.data.nametitle, this.data.totalCount)
  },
  httpURL: function (title, totalCount) {
    var that = this;
    var url = "";
    switch (title) {
      case "正在上映":
        url = app.globalData.g_api + "/v2/movie/in_theaters?start=" + totalCount + "&count=20";
        console.log("httpUrl")
        break;
      case "即将上映":
        url = app.globalData.g_api + "/v2/movie/coming_soon?start=" + totalCount + "&count=20";
        break;
      case "Top250":
        url = app.globalData.g_api + "/v2/movie/top250?start=" + totalCount + "&count=20";
        break;
    }
    wx.showNavigationBarLoading();
    util.http(url, that.callBack, "GET");
  },
  callBack: function (data) {
    var that = this;
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
    }
    var totalMovies = {}
    if (!that.data.isEmpty) {
      totalMovies = that.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      that.data.isEmpty = false;
    }
    that.setData({ movies: totalMovies });
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
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    this.httpURL(this.data.nametitle, this.data.totalCount)
    wx.hideNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      this.data.totalCount += 20;
      this.httpURL(this.data.nametitle, this.data.totalCount);
      wx.hideNavigationBarLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})