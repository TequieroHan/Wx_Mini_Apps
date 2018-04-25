// Page/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  process:function(){
    var post_content=[
      {
        post_head_img: '../../image/avatar/1.png',
        post_head_txt:"Sep 20 2016",
        title:"又是蟹肥虾壮时",
        image_content:"../../image/post/bl.png",
        content:"w dasdasldjkas大事都挥洒的话倒萨的打算的吧是的哈健康不到师傅告诉大家发多少不符合的市场价多少不回家都不vhjcxvjc就看着办",
        read:"12345",
        good:"123"
      },
      {
        post_head_img: '../../image/avatar/2.png',
        post_head_txt: "Sep 20 2017",
        title: "又是蟹肥虾壮时1",
        image_content: "../../image/post/cat.png",
        content: "w dasdasldjkas大事都挥洒的话倒萨的打算的吧是的哈健康不到师傅告诉大家发多少不符合的市场价多少不回家都不vhjcxvjc就看着办",
        read: "23",
        good: "3"
      }
    ]
    this.setData({
      post_key:post_content
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
    this.process();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload");
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